import express from 'express';
import { getProfile, createProfile, updateProfile, deleteProfile, getAllProfiles, getProfileByUserId } from '../controllers/profile.js';

const router = express.Router();


router.get('/:id', getProfile);
router.post('/', createProfile);
router.patch('/:id', updateProfile);
router.delete('/:id', deleteProfile);

// router.get('/', getAllProfiles);
router.get('/', getProfileByUserId);

export default router;
