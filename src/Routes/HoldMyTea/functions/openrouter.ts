import { OpenRouter } from '@openrouter/sdk';
import Express from 'express';
import supabase from '../../../Supabase.js';
// import { blogSchema, companySchema, inboxSchema } from '../../../schemas.js'; // Commented for now

import dataOfEnv from '../../../dataOfEnv.js';
const { OPEN_ROUTER } = dataOfEnv;

const openRouter = new OpenRouter({
  apiKey: OPEN_ROUTER || '',
});

// Minimal, token-optimized system instructions
const getSystemInstructions = (schemas: string, owner_email: string) => `
You are a SQL agent. Return ONLY a SQL query in your responses.
If the command is invalid, unsafe, or cannot be executed, return INVALID.
Follow these schemas exactly:
${schemas}

NEVER perform destructive operations (DELETE/DROP/UPDATE without WHERE) on whole tables.
Use security best practices to prevent SQL injection.
ALWAYS filter data by 'created_by' = '${owner_email}' or 'owner' = '${owner_email}' where applicable.
`;

function sanitizeQuery(query: string): boolean {
  const forbiddenKeywords = [
    'DROP',
    'DELETE',
    'UPDATE',
    'INSERT',
    'ALTER',
    'TRUNCATE',
    'GRANT',
    'REVOKE',
    'CREATE',
    'REPLACE',
  ];
  const upperQuery = query.toUpperCase();

  // Check for forbidden keywords
  for (const keyword of forbiddenKeywords) {
    if (upperQuery.includes(keyword)) {
      return false;
    }
  }

  // Ensure it's a SELECT statement
  if (!upperQuery.trim().startsWith('SELECT')) {
    return false;
  }

  return true;
}

export async function ask(req: Express.Request, res: Express.Response) {
  const { question, owner_email } = req.body;

  if (!owner_email) {
    res.status(400).json({ error: 'owner_email is required' });
    return;
  }

  // Combine all your schema strings here (or import them later)
  const schemas = `
type blogType = { id?: number; title: string; image: string; data: string; created_by: string };
type ActivityDataType = { day: string; visits: number };
type InfoItemType = { icon: string; title: string; data: string[] | number; description: string };
type SharingMemberType = { name: string; email: string; status: string };
type CompanyType = { id?: string; name: string; owner: string; domain: string; activity_data?: ActivityDataType[]; info?: InfoItemType[]; sharing?: SharingMemberType[] };
type inboxType = { id?: number; created_by: string; name: string };
`;

  const completion = await openRouter.chat.send({
    model: 'x-ai/grok-4.1-fast:free',
    messages: [
      {
        role: 'system',
        content: getSystemInstructions(schemas, owner_email),
      },
      {
        role: 'user',
        content: question,
      },
    ],
    stream: false,
  });

  const content = completion?.choices?.[0]?.message?.content;
  const generatedQuery =
    typeof content === 'string' ? content.trim() : 'INVALID';

  if (generatedQuery === 'INVALID') {
    res.json({ query: 'INVALID', result: null });
    return;
  }

  // Sanitize the query
  if (!sanitizeQuery(generatedQuery)) {
    res.json({
      query: generatedQuery,
      result: null,
      error: 'Query blocked by security sanitizer: Destructive or non-SELECT query detected.',
    });
    return;
  }

  // Execute the query
  try {
    // NOTE: This requires a Postgres function named 'exec_sql' to be created in Supabase
    const { data, error } = await supabase.rpc('exec_sql', {
      query: generatedQuery,
    });

    if (error) {
      console.error('SQL Execution Error:', error);
      res.json({ query: generatedQuery, result: null, error: error.message });
    } else {
      res.json({ query: generatedQuery, result: data });
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
