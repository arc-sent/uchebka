import express from "express";
import { UserRouter } from "./router/user.router.js";
import { itemsRouter } from "./router/item.router.js";
import cors from 'cors';

const main = () => {
    const app = express();

    app.use(cors())
    app.use(express.json());

    app.use('/auth' , UserRouter)

    app.use('/items' , itemsRouter)

    app.listen(3001 , () => {
        console.log('Server start in 3001')
    })
} 

main();