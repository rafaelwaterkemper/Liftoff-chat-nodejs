import express from 'express'

import createConnection from "./database"
import { routes } from './routes'

createConnection().then(connection => {
    const app = express()
    routes.prototype.config()

    app.use(express.json())
    app.use(routes)

    app.listen(3333, () => console.log('Listening'))
})

