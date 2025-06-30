import express from 'express';
import { getComments, addComments, getCountComments } from '../controllers/comments.js';

const router = express.Router();

router.get("/", getComments);
router.post("/", addComments);
router.get("/count", getCountComments);

export default router;