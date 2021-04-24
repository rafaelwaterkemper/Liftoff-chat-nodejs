import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateConexao1619209757047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "connections",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true                     
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "socket_id",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "datetime('now', 'localtime')"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "datetime('now', 'localtime')"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                name: "FK_connections_users",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("connections", new TableForeignKey({
            name: "FK_connections_users",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
        }))

        await queryRunner.dropTable("connections")
    }

}
