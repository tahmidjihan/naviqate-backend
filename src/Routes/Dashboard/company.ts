import express from 'express';
import { getCompanyById, createCompany, updateCompany } from './functions/Company.js';
const router = express.Router();

// Define your company routes here
router.get('/', (req, res) => {
  res.send('Company routes');
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await getCompanyById(id);
  res.json(data);
});

router.post('/', async (req, res) => {
  const companyData = req.body;
  const data = await createCompany(companyData);
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const companyData = req.body;
  const data = await updateCompany(id, companyData);
  res.json(data);
});

export default router;
