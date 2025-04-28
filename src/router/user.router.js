import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { UserService } from "../service/user.service.js";

const router = Router();
const service = new UserService();
const controller = new UserController(service);

router.post('/login' , (req , res) => {
    controller.login(req , res)
});

router.post('/register' , (req , res) => {
    controller.register(req , res)
});

export const UserRouter = router