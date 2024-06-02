export function isNumeric(value:string) {
    return /^\d+$/.test(value);
  }
export function nationalIdvalid(value:string){
    const message=value
    const pattern=/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/
    return (pattern.test(message));
   }

export function dateToReadable(date:Date|string){
  var moment = require('moment');
  require('moment/locale/ar');
  let m=moment(date)
  //console.log(moment.locale());
  return m.format("dddd, MMMM Do YYYY, h:mm:ss a")
}
