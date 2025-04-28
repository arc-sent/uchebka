export class UserController {
    constructor(service) {
        this.service = service;
    }

    async login(req, res) {
        const body = req.body;

        if (!body) {
            throw new Error('Ошибка в получении тела');
        }

        try {
            const reqService = await this.service.login(body.email, body.password);

            if (reqService.status === 400) {
                throw new Error(JSON.stringify(reqService.message))
            }

            res.status(200).json({ message: reqService.message, userData: reqService.userData })
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message })
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }

    async register(req, res) {
        try {
            const body = req.body;
            if (!body) {
                throw new Error('Ошибка в получении тела');
            }

            const reqService = await this.service.register(body);

            if (reqService.status === 400) {
                throw new Error(JSON.stringify(reqService.message))
            }

            res.status(200).json({ message: reqService.message, userData: reqService.userData })
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message })
            } else {
                console.error(err);
                res.status(400).json('invalid error')
            }
        }
    }

}