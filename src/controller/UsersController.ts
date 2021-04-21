import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersConstroller {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const user = await this.usersService.create(email);
        
        return res.json(user)
    }
}

export { UsersConstroller }