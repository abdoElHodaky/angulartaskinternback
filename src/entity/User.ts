import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, TableInheritance ,ChildEntity,CreateDateColumn, UpdateDateColumn  } from "typeorm"
import { Email } from "./Email"
import { supTicket,Article,Attachment,Address,Verification,Payment } from "./"

@Entity()
@TableInheritance({column:{type:"varchar",name:"type"}})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column({default:2980865431210,select:true})
    IDcardNumber: number

    @Column({type: "varchar",/*default:"test_279346"*/})
    username: string;

    @Column({type: "varchar", default: "test_297438",select:true})
    passwordHash: string

    @Column(()=>Email)
    email:Email
    
    @Column(()=>Address)
    address:Address
    
    @CreateDateColumn(/*{type:"timestamp"}*/)
    created_at: Date;

    @UpdateDateColumn(/*{type:"timestamp"}*/)
    updated_at: Date;
    
    @OneToMany(()=>supTicket,ticket=>ticket.user) tickets:supTicket[]
    @OneToMany(()=>Verification,verification=>verification.user) verifications:Verification[];
    @OneToMany(()=>Attachment,media=>media.uploader) media:Attachment[]
    @OneToMany(()=>Payment,payment=>payment.user) payments:Payment[]
   
}


@ChildEntity()
export class Author extends User {
    
    @Column({default:"author"})
    type:string

    @OneToMany(()=>Article,article=>article.author) articles:Article[];

}
