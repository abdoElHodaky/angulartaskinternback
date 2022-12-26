import { Entity,Column,PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Article {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "varchar", nullable: true})
    content: string;

    @Column({type: "varchar", nullable: true})
    title: string;

    @Column({type: "varchar"})
    imgurl: string;

    @Column({type: "varchar", nullable: true})
    cateogry: string;
}