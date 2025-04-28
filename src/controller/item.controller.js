export class ItemsConstroller {
    constructor(service){
        this.service = service;
    }

    async GETALL(req ,res) {
        try{
            const reqService = await this.service.GETALL()
            
            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }

            res.status(200).json({message: reqService.message})
        } catch(err){
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }

    async GETID(req ,res) {
        try{
            const id = req.params.id

            const reqService = await this.service.GETID(id)
            
            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }

            res.status(200).json({message: reqService.message})
        } catch(err){
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }


    async POST(req ,res) {
        try{
            const body = req.body;

            if(!body) {
                throw new Error('Ошибка в получении тела');
            }

            const userId = req.params.userId;

            if(!userId) {
                throw new Error('Ошибка в получении тела');
            }

            const reqService = await this.service.POST(body , userId);

            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }
            
            res.status(200).json({message: reqService.message})
        } catch(err){
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }

    async PUT(req ,res) {
        try{
            const body = req.body;

            if(!body) {
                throw new Error('Ошибка в получении тела');
            }

            const id = req.params.id

            const reqService = await this.service.PUT(body , id)
            
            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }

            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }
            
            res.status(200).json({message: reqService.message})
        } catch(err){
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }

    async DELETE(req ,res) {
        try{
            const id = req.params.id

            const reqService = await this.service.DELETE(id)
            
            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }

            res.status(200).json({message: reqService.message})
        } catch(err){
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }

    async GETAUTHORID(req ,res){
        try{
            const id = req.params.authotId

            const reqService = await this.service.GETAUTHORID(id)
            
            if(reqService.status === 400){
                throw new Error(JSON.stringify(reqService.message))
            }

            res.status(200).json({message: reqService.message})
        } catch(err){
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }
}