import { Injectable , Inject } from "@decorators/di";
import { DataSource } from "typeorm"
import { Article,User,Author } from "../entity/"
import {  AppDataSource } from "../data-source";
import { CreateArticleDto } from "../dto/create-article.dto"
import { isNumeric,nationalIdvalid } from "../helpers";
@Injectable()
export class UserService {
  
  @Inject("datasource") private readonly datasource: DataSource=AppDataSource 
  constructor ( ){}

  async all():Promise<User[]>{
    return  this.datasource.manager.find(User)
  }
  
  async id(userId:string):Promise<User|void> {


    if(isNumeric(userId)==true){
      console.log(nationalIdvalid(userId))
      const _id=Number(userId)
     let user=await this.datasource.getRepository(User).findOneOrFail({
        where:{
          id:_id
        },
        relations:{
          tickets:true,
          verifications:true
        }
      })
      return user
    }
    else return 
  }
  
}
