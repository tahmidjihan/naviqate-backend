import { OpenRouter } from '@openrouter/sdk';
import dataOfEnv from '../../../dataOfEnv.js';
import Express from 'express';

const { OPEN_ROUTER } = dataOfEnv;
const openRouter = new OpenRouter({
  apiKey: OPEN_ROUTER || '',
  //   defaultHeaders: {
  //     'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
  //     'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  //   },
});

// const completion = await openRouter.chat.send({
//   model: 'x-ai/grok-4.1-fast:free',
//   messages: [
//     {
//       role: 'user',
//       content: 'What is the meaning of life?',
//     },
//   ],
//   stream: false,
// });
export function ask(req: Express.Request, res: Express.Response) {
  const { question } = req.body;
  //   const { question } = req.query;
  return openRouter.chat.send({
    model: 'x-ai/grok-4.1-fast:free',
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    stream: false,
  });
}
// @ts-ignore
// console.log(completion?.choices[0].message.content);
