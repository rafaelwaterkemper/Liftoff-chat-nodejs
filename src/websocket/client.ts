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

                await messagesService.create({user_id: user.id, text})
                
                return;
            }

            const userCreated = await usersService.create(email)
            await createConnection(userCreated, socket_id)
            await messagesService.create({user_id: userCreated.id, text})
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