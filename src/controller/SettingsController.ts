import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SettingRepository } from "../repositories/SettingRepository"

class SettingsController {

    static async create(req: Request, res: Response) {
        const { chat, username } = req.body

        const settingsRepository = getCustomRepository(SettingRepository)

        const settings = settingsRepository.create({
            chat,
            username
        })
        console.log(settings)
        await settingsRepository.save(settings)

        return res.json(settings)
    }
}

export { SettingsController }