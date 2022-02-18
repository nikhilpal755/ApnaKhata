import express from 'express';
import { allRecordsofUser, getRecord, createRecord, updateRecord, deleteRecord } from '../controllers/record.js';

const router = express.Router();


router.get('/', allRecordsofUser);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.patch('/:id', updateRecord);
router.delete('/:id', deleteRecord);


export default router;