import express from 'express'
import { createServer } from "http"
import { Server, Socket } from "socket.io"

import path from "path"

import createConnection from "./database"
import { routes } from './routes'

var http, io

function init(): Promise<void> {
    return createConnection().then(connection => {
        const app = express()

        app.use(express.static(path.join(__dirname, "..", "public")))
        app.set("views", path.join(__dirname, "..", "public"))
        app.engine("html", require("ejs").renderFile)
        app.set("view engine", "html")

        app.get("/pages/client", (req, res) => {
            return res.render("html/client.html")
        })

        http = createServer(app)
        io = new Server(http)

        io.on("connection", (socket: Socket) => {
            console.log("Se conectou", socket.id)
        })

        routes.prototype.config()

        app.use(express.json())
        app.use(routes)
    })
}

export { init, http, io }