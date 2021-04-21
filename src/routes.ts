import { Router } from 'express'
import { MessagesController, SettingsController, UsersConstroller } from "./controller"

const routes = Router()

routes.prototype.config = function () {
    const usersController = new UsersConstroller()
    const settingsController = new SettingsController()
    const messagesController = new MessagesController()

    routes.post("/users", usersController.create.bind(usersController))
    routes.post("/settings", settingsController.create.bind(settingsController))
    routes.post("/messages", messagesController.create.bind(messagesController))
    routes.get("/messages/:id", messagesController.showByUser.bind(messagesController))
}

export { routes }