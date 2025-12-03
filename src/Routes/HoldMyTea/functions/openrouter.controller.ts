import express from 'express';
import { OpenRouter } from '@openrouter/sdk';
import supabase from '../../../Supabase.js';
import dataOfEnv from '../../../env.config.js';

const { OPEN_ROUTER } = dataOfEnv;

const openRouter = new OpenRouter({
  apiKey: OPEN_ROUTER || '',
});

// Minimal instructions
const getSystemInstructions = (schemas: string, owner_email: string) => `
You are a SQL agent. Return ONLY a SQL query without markdown.
If invalid or unsafe, return INVALID.

Schemas:
${schemas}

Always filter by created_by='${owner_email}' or owner='${owner_email}' when applicable.
Do not return markdown, explanation, or code fences.
No DELETE/DROP/UPDATE without WHERE.

Specific rules:
- No personal data access.
- No Drop/Delete/Update whole table,
- In new blogs set the image in default to https://picsum.photos/seed/<Title-of-the-blog>/1200/600
`;

export async function ask(req: express.Request, res: express.Response) {
  try {
    const { question, owner_email } = req.body;

    if (!owner_email) {
      res.status(400).json({ error: 'owner_email is required' });
      return;
    }

    // Database table schemas with case-sensitive table names
    const schemas = `
TABLE: blogs
COLUMNS:
  - id: number (primary key)
  - title: string
  - image: string
  - data: string
  - created_by: string

TABLE: inboxes
COLUMNS:
  - id: number (primary key)
  - created_by: string
  - name: string

TABLE: inbox_data
COLUMNS:
  - id: string (primary key)
  - inbox_id: number (foreign key to inboxes.id)
  - created_at: timestamp

TABLE: company_data
COLUMNS:
  - id: string (primary key)
  - name: string
  - owner: string
  - domain: string
  - activity_data: json (array of objects with day, visits)
  - info: json (array of objects with icon, title, data, description)
  - sharing: json (array of objects with name, email, status)

IMPORTANT: Table names are case-sensitive. Use exact casing as shown above.
`;

    // 1. Ask OpenRouter
    const completion = await openRouter.chat.send({
      model: 'x-ai/grok-4.1-fast:free',
      stream: false,
      messages: [
        {
          role: 'system',
          content: getSystemInstructions(schemas, owner_email),
        },
        { role: 'user', content: question },
      ],
    });

    const content = completion?.choices?.[0]?.message?.content;
    let generatedQuery = typeof content === 'string' ? content.trim() : '';

    console.log('AI Raw Output:', generatedQuery);

    // 2. Sanitize AI stupidity (markdown, comments, text)
    generatedQuery = generatedQuery
      .replace(/```sql/gi, '')
      .replace(/```/g, '')
      .replace(/Here is the SQL query[:\s]*/gi, '')
      .replace(/Here\'s the SQL query[:\s]*/gi, '')
      .replace(/Sure.*?:/gi, '')
      .replace(/--.*$/gm, '')
      .trim();

    console.log('Clean Query:', generatedQuery);

    if (!generatedQuery || generatedQuery.toUpperCase() === 'INVALID') {
      res.json({ query: 'INVALID', result: null });
      return;
    }

    // 3. Run query via Supabase RPC
    const { data, error } = await supabase.rpc('exec_sql', {
      query: generatedQuery,
    });

    if (error) {
      console.error('Supabase Error:', error);
      res.status(400).json({ query: generatedQuery, error });
      return;
    }

    console.log('SQL Result:', data);

    // 4. Return clean response
    res.json({
      query: generatedQuery,
      result: data ?? null,
    });
  } catch (err: any) {
    console.error('Server Error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
