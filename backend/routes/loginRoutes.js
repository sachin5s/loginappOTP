import  express from "express"
import { signup,login ,verifyOTP, sendOTP} from "../controller/loginControllers.js";

const router = express.Router()

router.post("/login",login)
router.post("/signup",signup)
router.post("/sendOtp",sendOTP)
router.post("/verifyOtp",verifyOTP)

export default router;