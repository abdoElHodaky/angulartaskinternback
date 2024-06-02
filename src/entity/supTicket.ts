import { Entity ,Column,PrimaryGeneratedColumn, ManyToOne,
       CreateDateColumn,UpdateDateColumn} from "typeorm"
import { User } from "./User"

@Entity()
export class supTicket {
    
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    type: string

    @Column()
    subject: string

    @Column()
    description: string
    
    @CreateDateColumn({type:"date"})
    createdAt: Date;

    @UpdateDateColumn({type:"date"})
    updatedAt: Date;
    @ManyToOne(()=>User,user=>user.tickets) user:User

}
