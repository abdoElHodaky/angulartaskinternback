
import "reflect-metadata";
import application from "express"
import { json,urlencoded } from "express";
//import { rateLimit } from 'express-rate-limit'
import cors from "cors";
import { AppDataSource } from "./_datasource";
import { apiv1 } from "./routes";
const app=application();
const port = process.env.PORT||3000
/*setInterval(function (){
if(AppDataSource.isConnected==false)
{
  AppDataSource.connect().then(e=>{
  console.log("connected")
  }).catch(console.log)
}

},500000)
*/
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const theme = new SwaggerTheme();

app.use(urlencoded({extended: true}))
app.use(cors())
app.use(json())
app.use(apiv1)
/*app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	}))*/
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

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
     import("./services/enum").then(servs=>{
      await servs.services.User.default()
     }).catch(console.log)
})

module.exports = app;
