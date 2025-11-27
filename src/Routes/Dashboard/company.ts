import express from 'express';
import {
  getCompanyById,
  createCompany,
  updateCompany,
} from './functions/Company.js';
const router = express.Router();

// Define your company routes here
router.get('/', (req, res) => {
  res.send('Company routes');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const data = getCompanyById(id);
  res.json(data);
});

router.post('/', (req, res) => {
  const companyData = req.body;
  const data = createCompany(companyData).then((data) => {
    res.json(data);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const companyData = req.body;
  const data = updateCompany(id, companyData).then((data) => {
    res.json(data);
  });
});

export default router;
