import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

export class UserService {
    constructor(){
        this.prisma = new PrismaClient()
    }

    async generateToken(user){
        const secet = 'sercet'
        const payload = {id: user.id , email: user.email};
        const token = jwt.sign(payload , secet , {expiresIn: '1h'});

        return token
    }

    async login(email , password) {
        try{
            const findUser = await this.prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            
            console.log(findUser);

            if(!findUser) {
                throw new Error('Юзер не зареган')
            }

            if(findUser.password !== password){
                throw new Error('Неправильный пароль')
            }

            const token = await this.generateToken(findUser);

            return {message: token , status: 200 , userData: findUser}
        } catch(err){
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }

    async register(body) {
        try{
            const resService = await this.prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password,
                }
            });

            if(!resService){
                throw new Error('Ошибка при регистрации')
            }

            const token = await this.generateToken(resService);

            return {message: token , status: 200 , userData: resService} 
        } catch(err){
            console.error(err);
            if(err instanceof Error){
                return {message: err.message , status: 400}
            } else {
                console.error(err);
                return {message: 'Invalid error in service' , status: 400}
            }
        }
    }

}