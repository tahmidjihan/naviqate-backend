import express from 'express';
import {
  getInboxes,
  createInbox,
  getInboxData,
  deleteInboxData,
  deleteInbox,
  getLatestMessages,
} from './functions/Inbox.ts';
const router = express.Router();

// Define your inbox routes here
router.get('/', (req, res) => {
  res.send('Inbox routes');
});

router.get('/:email', (req, res) => {
  const email = req.params.email;
  const data = getInboxes(email);
  res.json(data);
});

router.get('/:email/latest/:limit?', (req, res) => {
  const email = req.params.email;
  const limit = req.params.limit ? parseInt(req.params.limit) : 4;
  const data = getLatestMessages(email, limit);
  res.json(data);
});

router.get('/data/:id', (req, res) => {
  const id = req.params.id;
  const data = getInboxData(id);
  res.json(data);
});

router.post('/', (req, res) => {
  const inboxData = req.body;
  const data = createInbox(inboxData).then((data) => {
    res.json(data);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const data = deleteInbox(id).then((data) => {
    res.json(data);
  });
});

router.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  const data = deleteInboxData(id).then((data) => {
    res.json(data);
  });
});

export default router;
