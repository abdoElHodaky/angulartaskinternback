import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, TableInheritance ,ChildEntity,CreateDateColumn, UpdateDateColumn,AfterLoad  } from "typeorm"
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

    @Column({type: "varchar",nullable:true})
    username: string;

    @Column({type: "varchar",nullable:true,select:true})
    passwordHash: string

    @Column(()=>Email)
    email:Email
    
    @Column(()=>Address)
    address:Address
    
    @CreateDateColumn({type:"date"})
    created_at: Date;

    @UpdateDateColumn({type:"date"})
    updated_at: Date;
    
    @OneToMany(()=>supTicket,ticket=>ticket.user) tickets:supTicket[]
    @OneToMany(()=>Verification,verification=>verification.user) verifications:Verification[];
    @OneToMany(()=>Attachment,media=>media.uploader) media:Attachment[]
    @OneToMany(()=>Payment,payment=>payment.user) payments:Payment[]
   
  /*  @AfterLoad()
    updatalogininfo(){
        const {username,passwordHash,id}=this
        if(username==null || username=="") this.username=`test_279346__${id}`
        if(passwordHash==null || passwordHash=="") this.passwordHash=`test_297438__${id}`
    }*/

}


@ChildEntity()
export class Author extends User {
    
    @Column({default:"author"})
    type:string

    @OneToMany(()=>Article,article=>article.author) articles:Article[];

}
