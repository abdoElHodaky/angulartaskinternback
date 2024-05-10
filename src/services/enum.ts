import {AuthService} from "./auth";
import {AttachmentService} from "./attachments";
import {UserService} from "./users";
import {AuthorService} from "./authors";
import {ArticleService} from "./articles";
import {UserTicketService} from "./users.tickets";
import {PaymentService} from "./payments";


export let services:any={
  Auth:new AuthService(),
  Author:new AuthorService(),
  User:new UserService(),
  Article:new ArticleService(),
  Attachment:new AttachmentService(),
  Ticket:new UserTicketService(),
  supTicket:new supTicketService(),
  Payment:new PaymentService(),
  
}


export let _services:object={
  "Auth":new AuthService(),
  "Author":new AuthorService(),
  "User":new UserService(),
  "Article":new ArticleService(),
  "Attachment":new AttachmentService(),
  "Ticket":new UserTicketService(),
  "supTicket":new supTicketService(),
  "Payment":new PaymentService(),
  
}
