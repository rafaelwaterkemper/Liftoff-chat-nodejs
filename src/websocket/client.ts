import { User } from "../entities/User"
import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService"
import { UsersService } from "../services/UsersService"

interface IParams {
    text: string;
    email: string;
}

function init() {

    io.on("connect", (socket) => {
        const connectionsService = new ConnectionsService()
        const usersService = new UsersService()
        const messagesService = new MessagesService()

        socket.on("client_first_access", async params => {

            const socket_id = socket.id;
            const { text, email } = params as IParams

            if (!email) return;

            let user = await usersService.findByEmail(email)

            if (user) {
                let connection = await connectionsService.findByUserId(user.id);

                if (connection) {
                    await connectionsService.update(connection.id, socket_id)
                } else {
                    await createConnection(user, socket_id)
                }

                await messagesService.create({ user_id: user.id, text })
                const allMessages = await messagesService.listByUser(user.id)
                socket.emit("client_list_all_messages", allMessages)
                const allUsers = await connectionsService.findAll();
                io.emit("admin_list_all_users", allUsers)

                return;
            }

            const userCreated = await usersService.create(email)
            await createConnection(userCreated, socket_id)
            await messagesService.create({ user_id: userCreated.id, text })

            const allMessages = await messagesService.listByUser(userCreated.id)

            socket.emit("client_list_all_messages", allMessages)

            const allUsers = await connectionsService.findAll();
            io.emit("admin_list_all_users", allUsers)
        })

        socket.on("client_send_to_admin", async params => {
            const socket_id = socket.id
            
            const { text, socket_admin_id } = params

            const {user_id} = await connectionsService.findBySocketID(socket_id)

            console.log(`Este é o text ${text}`)
            const message = await messagesService.create({
                text,
                user_id
            })

            io.to(socket_admin_id).emit("admin_receive_message", {
                message,
                socket_id
            })
        })

        async function createConnection(user: User, socket_id: string) {
            await connectionsService.create({
                socket_id,
                user_id: user.id
            })
        }
    })
}

export { init }