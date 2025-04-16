import { Router } from 'express';
import { createEntry, getEntry, viewBlogs, updateBlog, deleteBlog } from '../controllers/entries.controller.js';
import VerifyUser from '../middleware/verifyUser.js';

const router = Router();

router.route("/").post(VerifyUser, createEntry).get(VerifyUser, viewBlogs);
router.route("/:entryId").get(VerifyUser, getEntry).patch(VerifyUser, updateBlog).delete(VerifyUser, deleteBlog);

export default router;  