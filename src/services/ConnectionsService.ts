import { getCustomRepository } from "typeorm"
import { User } from "../entities/User";
import { ConnectionRepository } from "../repositories/ConnectionRepository"

interface ICreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {

    private connectionRepository: ConnectionRepository;

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionRepository)
    }

    async create({ socket_id, user_id, admin_id, id }: ICreate) {
        const connection = this.connectionRepository.create({
            socket_id,
            admin_id,
            user_id,
            id
        })

        await this.connectionRepository.save(connection)

        return connection;
    }

    async update(con_id: string, socket_id: string) {
        await this.connectionRepository.update({ id: con_id }, { socket_id })
    }

    async findByUserId(user_id: string) {
        return await this.connectionRepository.findOne({
            user_id
        })
    }
}

export { ConnectionsService }