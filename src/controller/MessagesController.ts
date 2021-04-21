import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
    private messageService: MessagesService;

    constructor() {
        this.messageService = new MessagesService()
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { admin_id, text, user_id } = req.body
        
        const message = await this.messageService.create({
            admin_id,
            text,
            user_id
        });

        return res.json(message)
    }


    async showByUser(req: Request, res: Response) {
        const { id } = req.params;
        
        const messages = await this.messageService.listByUser(id)

        return res.json(messages)
    }
}

export { MessagesController }