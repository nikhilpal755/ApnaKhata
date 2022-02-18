import express from 'express';

import {getClient, getClientsofUser, createClient, updateClient, deleteClient} from '../controllers/client.js';

const router = express.Router();

router.get('/:id', getClient); 
router.post('/', createClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/', getClientsofUser);

export default router;