import "reflect-metadata"
import { DataSource } from "typeorm"
import { InjectionToken } from "@decorators/di"
import { User,Author,Article , Attachment,
       Verification,supTicket,Payment,Book} from "./entity/";

export const _AppDataSource = new DataSource({
    type: "better-sqlite3",
    database:"database.sqlite",
    cache: {
        type:"ioredis",
        options: {
       //...(require("redis-url").parse(process.env.REDIS))
         host:"red-cpdq71f109ks73elqfu0",
	  port:6379
        },
        duration: 300000
    },
    synchronize: true,
    logging:"all",
    logger:"advanced-console",
    entities: [/*User,Author,Attachment,Article,
       Verification,supTicket,Payment,Book*/ "entity/index.ts"]
    ,
    migrations: [],
    subscribers: [],
    extra: {
        connectionTimeoutMillis: Number.MAX_SAFE_INTEGER,
        idleTimeoutMillis: Number.MAX_SAFE_INTEGER
    }
})
_AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getDataSource =  (delay = 3000): Promise<DataSource> => {
  if (_AppDataSource.isInitialized) return Promise.resolve(_AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (_AppDataSource.isInitialized) resolve(_AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};

setInterval(function (){
if(_AppDataSource.isConnected==false)
{
  _AppDataSource.connect().then(e=>{
  console.log("connected")
  }).catch(console.log)
}
else{
 console.log(" already connected")
}

},500000)

export const _datasource=new InjectionToken("DataSource")
