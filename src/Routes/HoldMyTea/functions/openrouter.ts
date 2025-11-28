import { OpenRouter } from '@openrouter/sdk';
import Express from 'express';
// import { blogSchema, companySchema, inboxSchema } from '../../../schemas.js'; // Commented for now

import dataOfEnv from '../../../dataOfEnv.js';
const { OPEN_ROUTER } = dataOfEnv;

const openRouter = new OpenRouter({
  apiKey: OPEN_ROUTER || '',
});

// Minimal, token-optimized system instructions
const getSystemInstructions = (schemas: string) => `
You are a SQL agent. Return ONLY a SQL query in your responses.
If the command is invalid, unsafe, or cannot be executed, return INVALID.
Follow these schemas exactly:
${schemas}

NEVER perform destructive operations (DELETE/DROP/UPDATE without WHERE) on whole tables.
Use security best practices to prevent SQL injection.
`;

export async function ask(req: Express.Request, res: Express.Response) {
  const { question } = req.body;

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
        content: getSystemInstructions(schemas),
      },
      {
        role: 'user',
        content: question,
      },
    ],
    stream: false,
  });

  // Return only the SQL string or INVALID
  res.json({
    query: completion?.choices?.[0]?.message?.content || 'INVALID',
  });
}
