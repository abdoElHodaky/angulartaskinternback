import { services } from "../services/enum";
import { Article  } from "../entity/"
//import { AppDataSource } from "../_datasource";
import { CreateArticleDto } from "../dto/create-article.dto"
import { Res, Post, Controller, Get, Body } from '@decorators/express';
import { Response ,Request} from "express"


@Controller('/articles')
export class ArticleController {
  
  
  private articleS=services.Article
  
  constructor( ) {}

  @Get("")
  async all():Promise<Article[]> {
   /* 	#swagger.tags = ['Article']
        #swagger.description = 'Endpoint to get articles' */
    let articles=await this.articleS.all()
    if(articles instanceof Array) return articles.map((article:Article,inx:number)=>{
      const {createdAt,updatedAt,...rest}=article
      return {
        createdAt:dateToReadable(createdAt),
        updatedAt:dateToReadable(updatedAt),
        ...rest
      }
    })
   else  return articles
  }

  @Post("")
  async create(@Res() res:Response ,@Body() createArticleDto:CreateArticleDto):Promise<Article|void>{
   //  #swagger.tags = ['Article']
    /*let {article,userid}=createArticleDto
    article=<Article>{...article}
    let author=await AppDataSource.manager.findOneByOrFail(Author,{id:parseInt(userid)})
    article.author=author
    author.articles.push(article)
    await AppDataSource.manager.save(Article,article)*/
    let article=await this.articleS.create(createArticleDto)
    res.json({message:"created successfully"})
    /*AppDataSource.manager.findOneByOrFail(Author,{id:userid}).then(d=>{
        author=d;
        return author
    }).then(a=>{
        article.author=a;
        a.articles=[]
        a.articles.push(article)
        return article
    }).then(a=>{
        AppDataSource.manager.save(Article,a)
        //AppDataSource.manager.save(a.user)
        res.json({message:"created successfully"})
    })*/
  }
}
