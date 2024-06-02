import { Router } from "express";
import { attachControllers } from '@decorators/express'
import { controllers } from "./controllers/";
import { supTicket } from "./entity/supTicket";
import { User } from "./entity/User";
import { AppDataSource } from "./_datasource";
import { attachmentsroute } from "./routes/attachmentroutes";
export const apiv1=Router();
apiv1.get("/suptickets",(req,res)=>{
/* 	#swagger.tags = ['suptickets']
        #swagger.description = 'Endpoint to get tickets' 
    */
    const {dateToReadable}=require("./helpers")
    AppDataSource.manager.find(supTicket).
    then(d=>{
        //d.map((el,i)=>console.log(el.user))
        res.json(d.map((ticket:supTicket,inx:number)=>{
        const {createdAt,updatedAt,...rest}=ticket
        return{
        ...rest,
        createdAt:dateToReadable(createdAt),
        updatedAt:dateToReadable(updatedAt),
        }
        }))
    }).catch(console.log)
})
apiv1.post("/suptickets/create",(req,res)=>{
    /* 	#swagger.tags = ['suptickets']
        #swagger.description = 'Endpoint to create tickets for specific user' 
        #swagger.parameters['userid'] = {
            in: 'body',
            description: 'userid',
            schema: { $ref: '#/definitions/userAddTicket' }
    } 
    */
    
    let supticket:supTicket=<supTicket>{...req.body.ticket}
    let userid=req.body.userid
    let user:User;
    AppDataSource.manager.findOneByOrFail(User,{id:userid}).then(d=>{
        user=d;
        return user
    }).then(a=>{
        supticket.user=a;
        a.tickets=[]
        a.tickets.push(supticket)
        return supticket
    }).then(a=>{
        AppDataSource.manager.save(supTicket,a)
        //AppDataSource.manager.save(a.user)
        res.json({message:"created successfully"})
    })
    .catch(console.log);
    /*AppDataSource.manager.save(supTicket,ticket).then(d=>{
        res.json({message:"created successfully"});
    }).catch(console.log);*/
    

})
//console.log(controllers)
attachControllers(apiv1,[...controllers])
//apiv1.use(authroute)
//apiv1.use(usersroute);
//attachControllers(apiv1,[UserController,UserTicketController ])
//attachControllers(apiv1,[])
//attachControllers(apiv1,[AuthorController])
//apiv1.use(authorsroutes)
//attachControllers(apiv1,[ArticleController])
//apiv1.use(articlesroute)
//apiv1.use(attachmentsroute)
