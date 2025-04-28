import { Router } from "express";
import { ItemsConstroller } from "../controller/item.controller.js";
import { ItemsService } from "../service/items.service.js";

const router = Router();
const service = new ItemsService();
const controller = new ItemsConstroller(service);

router.get('/' , (req , res) => {
    controller.GETALL(req ,res)
})

router.get('/:id' , (req , res) => {
    controller.GETID(req ,res)
})

router.post('/:userId' , (req , res) => {
    controller.POST(req ,res)
});

router.get('/auth/:authotId' , (req , res) => {
    controller.GETAUTHORID(req ,res)
})

router.put('/:id' , (req , res) => {
    controller.PUT(req ,res)
})

router.delete('/:id' , (req , res) => {
    controller.DELETE(req ,res)
});

export const itemsRouter = router