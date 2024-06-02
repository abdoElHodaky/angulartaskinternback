import { services } from "../services/enum";
import { Article ,User } from "../entity/"
import { AppDataSource } from "../_datasource";
import { dateToReadable } from "../helpers"
import { Res, Post, Controller, Get, Body , Params ,Delete } from '@decorators/express';
import { Response ,Request} from "express"
import { isNumeric,nationalIdvalid } from "../helpers";
import { Error , NotFoundError } from "common-errors";

@Controller('/users')
export class UserController {


  
  private  userS:any=services.User
  constructor(){}
  
  @Get("/")
  async all():Promise<User[]>{
    //this.userS.datasource=AppDataSource
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to get users' */

    //let resd:User[]=await AppDataSource.getRepository(User).find()
    let users= await this.userS.all()
    if(users instanceof Array) return users.map((user:User,inx:number)=>{
      const {createdAt,updatedAt,...rest}=user
      return {
        ...rest,
        createdAt:dateToReadable(createdAt),
        updatedAt:dateToReadable(updatedAt),
      }
    })
   else  return users
  }

  @Get("/:id")
  async user(@Params("id") id:string, @Res() res: Response ):Promise<User|Error|void> 
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
    if (user instanceof User){return user}
    else res.status(404).json({message:user?.message})
   
  }

  @Delete("/:id")
  async delete(@Params("id") id:string, @Res() res:Response){
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to delete specific user' */

   let u=await AppDataSource.getRepository(User).delete({id:Number(id)})
   if(u) res.jsonp({message:"deleted succefully"})
   
  }

  
}
