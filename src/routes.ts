import { Router } from 'express'
import { SettingsController } from "./controller"

const routes = Router()

routes.post("/settings", SettingsController.create)

export { routes }