import { Router } from "express";
import { Request,Response } from "express";
import { AppDataSource } from "../_datasource";
import { Author } from "../entity/Author";
//import { suptickeroute } from "./usersupticketroutes";
import { isNumeric,nationalIdvalid } from "../helpers";
export const authorsroutes=Router();
authorsroutes.get("/authors",function(req:Request, res:Response){
    let resd:Author[]=[];
    AppDataSource.getRepository(Author).find().
    then(d=>{
        let author:Author;
        let resd=d.map((v,i)=>{
            return v
        })
        res.jsonp([...resd]);
          
    }).catch(console.log);
    //console.log(resd)
  
  })

  authorsroutes.post("/authors/create",function(req:Request, res:Response){
    let author:Author=<Author>{...req.body}
    AppDataSource.getRepository(Author).save(author).
    then(d=>{
      res.jsonp({...d});  
    }).catch(console.log);
  })
  
  authorsroutes.get("/authors/:userid",function(req:Request, res:Response){
    let id:any=req.params["userid"]
    if(isNumeric(id)==true){
      console.log(nationalIdvalid(id))
      id=Number(id)
    AppDataSource.getRepository(Author).findOneOrFail({
        where:{
          id:id
        },
        relations:{
          tickets:true,
          verifications:true,
          articles:true
        }
      }).
      then(d=>{
        res.jsonp({...d});  
      }).catch(console.log);
    
    }
    else{
      res.json({message:"user not found or you used invalid paramter"})
    }
  })

  authorsroutes.delete("/authors/:userid",function(req:Request, res:Response){
    let id=Number(req.params["userid"])
    AppDataSource.getRepository(Author).delete({id:id}).
    then(d=>{
        res.jsonp({message:"deleted succefully"})
    }).catch(console.log);
  
  })

//authorsroutes.use("/users/:userid/tickets",suptickeroute)


