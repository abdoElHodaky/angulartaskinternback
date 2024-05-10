import { Router } from "express";
import { Request,Response } from "express";
import { AppDataSource } from "../_datasource";
import { User } from "../entity/User";
import { supTicket } from "../entity/supTicket";
import * as CircularJSON from "circular-json";
export const suptickeroute=Router({mergeParams:true});
suptickeroute.get("/users/:userid/tickets",(req:Request,res:Response)=>{
    /* 	#swagger.tags = ['User.Ticket']
        #swagger.description = 'Endpoint to get tickets' 
        #swagger.parameters['userid'] = {
            in: 'path',
            description: 'get tickets.',
            
    } 
    */
    
  //  let id=Number(req.params["userid"])
   // let user:User
    /*AppDataSource.manager.findOneByOrFail(User,{id:id}).then(d=>{
        d.tickets=[]
        user=d
    }).catch(console.log)
    AppDataSource.createQueryBuilder()
       .relation(User,"tickets").of(id).loadMany().then(tickets=>{
        user.tickets=tickets
        res.jsonp({...user})
        }).catch(console.log)
      */
      /*  AppDataSource.manager.findOneOrFail(User,{where:{
            id:id
           },
           relations:{
            tickets:true
           }
            }).then(d=>{
                user=d
                return user
            }).then(a=>{
                res.jsonp(a)
            }).catch(console.log)    */
  });


suptickeroute.post("/users/:userid/tickets",(req:Request,res:Response)=>{
    
    /* 	#swagger.tags = ['User.Ticket']
        #swagger.description = 'Endpoint to get tickets' 
        #swagger.parameters['userid'] = {
            in: 'path',
            description: 'add tickets. for specific user'
    } 
        #swagger.requestBody={
          required:true,
          description: 'add tickets. for specific user',
          schema: { $ref: '#/components/schemas/userAddTicket' }
        }
    */
    
    
  /*  let id=Number(req.params["userid"])
    let supticket=new supTicket()
    let user:User;
    let ticket:supTicket;
    supticket.type="inquiry"
    supticket.subject="Greet"
    supticket.description="How are you?"
    AppDataSource.manager.findOneByOrFail(User,{id:id}).then(d=>{
        user=d;
        return user
    }).then(a=>{
        /*AppDataSource
        .createQueryBuilder()
        .relation(User, "tickets")
        .of(a)
        .add(supticket)*/
      /*  supticket.user=a;
        a.tickets=[]
        a.tickets.push(supticket)
        return supticket
    }).then(a=>{
        AppDataSource.manager.save(a)
        //AppDataSource.manager.save(a.user)
        let obj=JSON.parse(CircularJSON.stringify(a))
        res.redirect("..")
    })
    .catch(console.log);
    
    
   /*AppDataSource.manager.findOneOrFail(User,{where:{
    id:id
   },
   relations:{
    tickets:true
   }
    }).then(d=>{
        user=d
        d.tickets=[]
        d.tickets.push(supticket)
    }).then(d=>{
        supticket.user=user
        return supticket
    }).then(a=>{
        var obj;
        console.log(a)
        res.jsonp(JSON.parse(CircularJSON.stringify(a)))



    }).catch(console.log)
    */


});
