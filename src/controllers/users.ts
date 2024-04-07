import { UserService } from "../services/users";
import { Article } from "../entity/Article"
import { User } from "../entity/User"
import { AppDataSource } from "../_datasource";
//import { CreateArticleDto } from "../dto/create-article.dto"
import { Res, Post, Controller, Get, Body , Params ,Delete } from '@decorators/express';
import { Response ,Request} from "express"
import { isNumeric,nationalIdvalid } from "../helpers";


@Controller('/users')
export class UserController {
  
  private  userS:UserService
  constructor(){}
  
  @Get("/")
  async all():Promise<User[]>{
    this.userS.datasource=AppDataSource
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to get users' */

    //let resd:User[]=await AppDataSource.getRepository(User).find()
    return await this.userS.all()
  }

  @Get("/:id")
  async user(@Params("id") id:string, @Res() res: Response ):Promise<User|void> 
  {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */

   /* if(isNumeric(id)==true){
      console.log(nationalIdvalid(id))
      const _id=Number(id)
     let user=await AppDataSource.getRepository(User).findOneOrFail({
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
    else{
       res.json({message:"user not found or you used invalid paramter"})
    }*/
    let user=await this.userS.id(id)
    if (!user) res.json({message:"user not found or you used invalid paramter"})
    else return user
  }

  @Delete("/:id")
  async delete(@Params("id") id:string, @Res() res:Response){
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to delete specific user' */

   let u=await AppDataSource.getRepository(User).delete({id:Number(id)})
   if(u) res.jsonp({message:"deleted succefully"})
   
  }

  
}
