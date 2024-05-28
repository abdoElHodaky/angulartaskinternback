import "reflect-metadata";
import { slowDown } from 'express-slow-down'
import { RedisStore } from 'rate-limit-redis'
import RedisClient from 'ioredis'
import application from "express"
import { json,urlencoded } from "express";
import cors from "cors";
import { apiv1 } from "./routes";
const app=application();
const port = process.env.PORT||4000
const redisClient=new RedisClient()
const expressPrettier = require('express-prettier')
const limiter = slowDown({
	windowMs: 15 * 60 * 1000, // 15 minutes
	delayAfter: 5, // Allow 5 requests per 15 minutes.
	delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the 5th one.
	store:new RedisStore({
		sendCommand: (command: string, ...args: string[]) => redisClient.send_command(command, ...args)
	  }
	)
})
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const theme = new SwaggerTheme();
app.enable('trust proxy')
app.set('trust proxy', 2)
app.use(urlencoded({extended: true}))
app.use(cors())
app.use(json())
app.use(apiv1)
app.use(limiter)
app.use(
  expressPrettier(
    { alwaysOn: true }
  )
)
app.use((error:any, req:any, res:any, next:any) => {
  console.log(error)
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  next() // (optional) invoking next middleware
})

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.get("/",(req,res)=>{
    res.redirect("endpoints")
})
app.use('/endpoints', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{
   explorer: false,
   customCss:theme.getBuffer(SwaggerThemeNameEnum.MATERIAL),
   customSiteTitle:" Endpoints",
   //customfavIcon: "../assets/favicon-16x16.png"
}));
app.listen(port,  () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
