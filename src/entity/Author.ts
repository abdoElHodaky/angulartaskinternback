import { Entity ,Column,PrimaryGeneratedColumn, OneToMany, ChildEntity} from "typeorm"
import { Article } from "./Article";
import { User } from "./User";

@Entity()
@ChildEntity()
export class Author extends User {
    
    @Column({default:"Author"})
    type:string

    @OneToMany(()=>Article,article=>article.author) articles:Article[];

}
