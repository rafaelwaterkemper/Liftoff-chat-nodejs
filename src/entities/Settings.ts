import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity("settings")
class Settings {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn({default: () => "datetime('now', 'localtime')"})
    updated_at: Date;

    @CreateDateColumn({default: () => "datetime('now', 'localtime')"})
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Settings }