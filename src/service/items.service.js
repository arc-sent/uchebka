import { PrismaClient } from "@prisma/client";

export class ItemsService {
    constructor(){
        this.prisma = new PrismaClient()
    }

    async GETALL() {
        try{
            const get = await this.prisma.items.findMany();
            
            return {message: get , status: 200}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }

    async GETID(id) {
        try{
            const get = await this.prisma.items.findFirst({where: {id: Number(id)}});
            return {message: get , status: 200}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }

    async GETAUTHORID(id){
        try{
            const get = await this.prisma.items.findMany({where: {userId: Number(id)}});
            return {message: get , status: 200}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }


    async POST(body , userId) {
        try{
            console.log('body' , body);
            console.log('userId' , userId);

            const createItems = await this.prisma.items.create({data: {
                title: body.title,
                desc: body.desc,
                category: body.category,
                userId: Number(userId)
            }});

            console.log(createItems)

            if(!createItems){
                throw new Error('Ошибка в создании item')
            }
            
            return {message: createItems , status: 200}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }

    async PUT(body , id) {

        console.log(body)
        console.log(id)
        try{
            const updateItems = await this.prisma.items.update({
                where: {
                id: Number(id)
            } , data: {
                title: body.title,
                desc: body.desc,
                category: body.category,
            }});

            if(!updateItems){
                throw new Error('Ошибка в обновлении item')
            }
            return {message: updateItems , status: 200}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }

    async DELETE(id) {
        try{
            const deleteItem = await this.prisma.items.delete({where: {id: Number(id)}})
            
            if(!deleteItem){
                throw new Error('Ошибка в удалении таска')
            }

            return {message: 'success' , status: 200}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }
}