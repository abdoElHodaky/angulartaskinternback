import "reflect-metadata"
import { DataSource } from "typeorm"
import { InjectionToken } from "@decorators/di"
import { Article } from "./entity/Article";
import { Attachment } from "./entity/Attachment";
import { Author } from "./entity/Author";
import { Book } from "./entity/Book";
import { supTicket } from "./entity/supTicket";
import { User } from "./entity/User"
import { Verification } from "./entity/Verification";
import { Payment } from "./entity/Payment";
export const _AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    cache: {
        type:"ioredis",
        duration: 300000
    },
    synchronize: true,
    logging: false,
    entities: [User,supTicket,Article,
      Verification,Author,Attachment,Book,Payment],
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
  console.log("connected",e)
  }).catch(console.log)
}
else{
 console.log(" already connected")
}

},500000)

export const _datasource=new InjectionToken("DataSource")
