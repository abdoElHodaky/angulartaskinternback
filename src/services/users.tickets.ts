import {_Data} from "./datasource";
//import { CreateArticleDto } from "../dto/create-article.dto"
import { Res, Post, Controller, Get, Body , Params } from '@decorators/express';
import { Response ,Request} from "express"
import { supTicket ,User } from "../entity/";
import { Error , NotFoundError } from "common-errors";
import { isNumeric } from "../helpers";
export class UserTicketService extends _Data {

  constructor(){super()}
  
  async all(userId:string):Promise<supTicket[]|Error>
  {
    if(isNumeric(userId)==true){
     let id=Number(userId)
    try{
     let user=await this.datasource.manager.findOneOrFail(User,{where:{
            id:id
           },
           relations:{
            tickets:true
           },
          cache:true
            })
    let tickets=user.tickets
    return tickets }
    catch (err:any){
      return new NotFoundError("Tickets")
    }

    }
    else return new TypeError("userId should be number")
  }
  
  async create(userId:string):Promise<supTicket|void>{
    
    
    let id=Number(userId)
    let supticket=new supTicket()
    let user:User;
    let ticket:supTicket;
    supticket.type="inquiry"
    supticket.subject="Greet"
    supticket.description="How are you?"
    user=await this.datasource.manager.findOneByOrFail(User,{id:id})
    user.tickets.push(supticket)
    let u=await this.datasource.manager.save(User,user)
    return u.tickets.at(-1)
    
  }
  
}
