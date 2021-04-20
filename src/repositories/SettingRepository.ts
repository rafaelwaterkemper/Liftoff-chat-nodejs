import { Repository, EntityRepository } from "typeorm"
import { Settings } from "../entities/Settings";

@EntityRepository(Settings)
class SettingRepository extends Repository<Settings> {}

export { SettingRepository }