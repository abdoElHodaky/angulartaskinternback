import { Entity,Column,ManyToOne,PrimaryGeneratedColumn} from "typeorm"
import { User,Address } from "./";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "varchar", nullable: true})
    title: string;

    @Column({type: "varchar"})
    date: string;
    
    @Column({type: "varchar", nullable: true})
    status: string;

    @Column({type: "varchar", nullable: true})
    amount: string;

    @Column({type: "varchar", nullable: true})
    currency: string;

    @Column(()=>Address)
    shipping: Address;
    
    @ManyToOne(()=>User,user=>user.payments) user:User;
}
