import { getCustomRepository, Repository } from "typeorm"
import { Settings } from "../entities/Settings"
import { SettingRepository } from "../repositories/SettingRepository"

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Settings>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingRepository);
    }

    async create({ chat, username }: ISettingsCreate) {
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        })

        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        })
        console.log(settings)
        await this.settingsRepository.save(settings)

        return settings
    }
}

export { SettingsService }