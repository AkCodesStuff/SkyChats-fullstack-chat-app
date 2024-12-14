import express from 'express'
import { getUsers ,getMessages,sendMessage} from '../controllers/message.js';
import { authenticateToken } from '../middleware/authware.js';
const router = express.Router();

router.get("/users",authenticateToken,getUsers)
router.get("/:id",authenticateToken,getMessages)
router.post("/send/:id",authenticateToken,sendMessage)

export default router