const paytabs =require("paytabs_pt2");
import { Payment , User} from "../entity/";
export class PayTabService{
  async values(obj:any){
      let arr=[]
      for(var i in obj){
        arr.push(obj[i])
      }
    return arr;
   }
   async config(profile:string,serverk:string,region:string):Promise<any>
    {
      await paytabs.setConfig(profile,serverk,region)
    }
   async createPage(payment:Payment,urls:{callback:string,return:string}):Promise<any>{
    let res;
    let client=payment.user
    const {firstName,lastName,email,address}=client
    const {id,currency,amount,shipping}=payment
    const {title,...resship}=shipping
    let shippinginfo=resship
    let clientinfo=[firstName+" "+lastName,email,"phone"]
    let paymentinfo=[id,currency,amount,""]
    let _urls=[urls.callback,urls.return]
    await paytabs.createPaymentPage(['all'],['sale','ecom'],paymentinfo,
    clientinfo,shippinginfo,
    "AR",_urls,(result:any)=>{
       return  (result!=undefined)? result.redirect_url:"/"
     })
     
     
   }
  async payCallback(result:any):Promise<any> {
    let {respCode,respMessage,transRef,respStatus,cart} =result
    return {
      trans:transRef,
      status:respStatus,
      code:respCode,
      message:respMessage,
      paymentId:cart.cart_id
    }
  }
  async payReturn(result:any):Promise<any>{
    let {respCode,respMessage,transRef,respStatus,cart} =result
    return {
      trans:transRef,
      status:respStatus,
      code:respCode,
      message:respMessage,
      paymentId:cart.cart_id
    }
  }
  async payVerify(transR:string):Promise<any>{
    let valid=false;
    let res:any;
    paytabs.validatePayment(transR,(result:any)=>{
      if (result['response_code:'] === 400)
    {
        valid=false
    }
    else
    {
        valid=true;
    }
         res=result
    });
    return await {transRef:transR,code:res['response_code:'],valid:valid}
  }
 async start(){
    const {PAYTABS_PROFILE,PAYTABS_SERVERK,PAYTABS_REGION}=process.env
    await paytabs.setConfig(
      PAYTABS_PROFILE,PAYTABS_SERVERK,PAYTABS_REGION
    )
  }
  
}
