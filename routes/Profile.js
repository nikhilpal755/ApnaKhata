import express from 'express';
import { getProfile, createProfile, updateProfile, deleteProfile, getAllProfiles } from '../controllers/profile.js';

const router = express.Router();


router.get('/:id', getProfile);
router.post('/', createProfile);
router.patch('/:id', updateProfile);
router.delete('/:id', deleteProfile);

router.get('/', getAllProfiles);

export default router;
