import { Router } from "express";
import { register, login, authenticated } from "../controllers/auth";
import { checkJwt } from "../middleware";

const router: Router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/authenticated', checkJwt, authenticated)

export { router }