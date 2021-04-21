import { Request, Response } from "express"
import { SettingsService } from "../services/SettingsService"

class SettingsController {
    private settingsService: SettingsService;

    constructor() {
        this.settingsService = new SettingsService()
    }

    async create(req: Request, res: Response) {
        try {
            const settings = await this.settingsService.create(req.body)
            return res.json(settings)
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }
}

export { SettingsController }