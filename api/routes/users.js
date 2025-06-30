import express from 'express';
import { getUser, updateUser, getFriends, getFollowing, getFollowed, getUsersList, getSearchUsers } from '../controllers/users.js';

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/:userId/friends", getFriends);
router.get("/:userId/following", getFollowing);
router.get("/:userId/followed", getFollowed);
router.get("/", getUsersList);
router.get("/searchUsers", getSearchUsers);

export default router;