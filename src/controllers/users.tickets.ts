//import { CreateArticleDto } from "../dto/create-article.dto"
import { Res, Post, Controller, Get, Body , Params } from '@decorators/express';
import { Response ,Request} from "express"
import { supTicket , User } from "../entity/";
import { services } from "../services/s";
import { Error } from "common-errors";
@Controller('/users')
export class UserTicketController {
 
 
 private userticketS=services.Ticket
  
 
  @Get("/:userid/tickets")
  async all(@Params("userid") id:string, @Res() res:Response):Promise<supTicket[]|Error|void>
  {
    
   /* let id=Number(userid)
    let user=await AppDataSource.manager.findOneOrFail(User,{where:{
            id:id
           },
           relations:{
            tickets:true
           }
            })*/
    let tickets=await this.userticketS.all(id)
    if (tickets instanceof Array) return tickets
    else res.status(404).jsonp({message:tickets?.message+" requested user"})
  }
  
  @Post("/:userid/tickets")
  async create(@Params("userid") userid:string, @Res() res:Response):Promise<supTicket|void> {
    
    
   /* let id=Number(userid)
    let supticket=new supTicket()
    let user:User;
    let ticket:supTicket;
    supticket.type="inquiry"
    supticket.subject="Greet"
    supticket.description="How are you?"
    user=await AppDataSource.manager.findOneByOrFail(User,{id:id})
    user.tickets.push(supticket)
    await AppDataSource.manager.save(User,user)*/
    let ticket=await this.userticketS.create(userid)
    if(ticket) res.json({message:"created success"})
    
  }
  
}
