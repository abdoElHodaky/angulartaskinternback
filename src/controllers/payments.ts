import { services } from "../services/enum";
import { Article ,User } from "../entity/"
import { AppDataSource } from "../_datasource";
//import { CreateArticleDto } from "../dto/create-article.dto"
import { Res, Post, Controller, Get, Body , Params ,Delete,Req } from '@decorators/express';
import { Response ,Request} from "express"
import { isNumeric,nationalIdvalid } from "../helpers";
import { Error , NotFoundError } from "common-errors";

@Controller('/payments')
export class PaymentController {
  private paymentService=services.Payment
  
  constructor(){}
  
  @Get("/")
  async all():Promise<User[]>{
    //this.userS.datasource=AppDataSource
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to get users' */

    //let resd:User[]=await AppDataSource.getRepository(User).find()
    
  }

  @Post("/:id/Pay")
  async pay(@Params("id") id:string, @Req() req: Request ):Promise<any> 
  {
    
   const url =`${req.baseUrl}`
    return await this.paymentService.Pay(paymentId,{callback:url+"/callback",return:url+"/return"});

  }

  @Post("/callback")
  async callback(@Req() req:Request):Promise<any|void>{
    let res=await this.paymentService.payCallback(req.body)
    let rp=await this.paymentService.verify(res.transR,res.paymentId)
    return rp
    
  }

  @Post("/return")
  async return(@Req() req:Request):Promise<any|void>{
    let res=await this.paymentService.payCallback(req.body)
    let rp=await this.paymentService.verify(res.transR,res.paymentId)
    return rp
  }
  
}
