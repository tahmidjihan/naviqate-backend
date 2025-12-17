import express from 'express';
import {
  getInboxes,
  createInbox,
  getInboxData,
  deleteInboxData,
  deleteInbox,
  // getLatestMessages,
} from './functions/inbox.controller.js';
const router = express.Router();

// Define your inbox routes here
router.get('/', (req, res) => {
  res.send('Inbox routes');
});

router.get('/:email', async (req, res) => {
  const companyId = Number(req.params.email);
  const data = await getInboxes(companyId);
  res.json(data);
});

// router.get('/:email/latest/:limit', async (req, res) => {
//   const email = req.params.email;
//   const limit = req.params.limit ? parseInt(req.params.limit) : 4;
//   console.log(email, limit);
//   const data = await getLatestMessages(email, limit).then((messages) => {
//     // Sort messages by created_at in descending order
//     console.log(messages);
//   });
//   // console.log('Latest messages data:', JSON.stringify(data, null, 2));
//   // res.json(data);
// });

router.get('/data/:id', async (req, res) => {
  const id = Number(req.params.id);
  const data = await getInboxData(id);
  res.json(data);
});

router.post('/', async (req, res) => {
  const inboxData = req.body;
  const data = await createInbox(inboxData);
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const data = await deleteInbox(id);
  res.json(data);
});

router.delete('/data/:id', async (req, res) => {
  const id = Number(req.params.id);
  const data = await deleteInboxData(id);
  res.json(data);
});

export default router;
