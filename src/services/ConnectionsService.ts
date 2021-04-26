import { getCustomRepository } from "typeorm"
import { Connection } from "../entities/Connection";
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

    async findAll() {
        const connections = await this.connectionRepository.find({
            relations: ["user"]
        })
        return connections
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        })
        return connections
    }

    async findBySocketID(socket_id: string) {
        return await this.connectionRepository.findOne({
            socket_id
        })
    }

    async updateAdminID(user_id: string, admin_id: string) {
        await this.connectionRepository.createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where("user_id = :user_id", {
                user_id
            })
            .execute()
    }

}

export { ConnectionsService }