import express from 'express'
import { login,logout,signup,updateProfile,checkAuth } from '../controllers/auth.js'
import { authenticateToken } from '../middleware/authware.js'
const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update",authenticateToken,updateProfile)
router.get("/check", authenticateToken, checkAuth)

export default router

