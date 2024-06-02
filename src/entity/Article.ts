import { Entity,Column,ManyToOne,PrimaryGeneratedColumn,
       CreateDateColumn,UpdateDateColumn} from "typeorm"
import { Author } from "./";

@Entity()
export class Article {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "varchar", nullable: true})
    title: string;

    @Column({type: "varchar"})
    imgurl: string;
    
    @Column({type: "varchar", nullable: true})
    content: string;

    @Column({type: "varchar", nullable: true})
    cateogry: string;
    
    @CreateDateColumn({type:"date"})
    createdAt: Date;

    @UpdateDateColumn({type:"date"})
    updatedAt: Date;
    @ManyToOne(()=>Author,author=>author.articles) author:Author;
}
