const { v4: uuidv4 } = require('uuid');
const magnet = require('magnet-uri');
const crypto = require('crypto')
const Dinero = require('dinero.js')

class ControllerUtil {
  static formatDate (date) {
    const day  = date.getDate().toString().padStart(2, '0');
    const month  = (date.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
    const year  = date.getFullYear();
    return day+"/"+month+"/"+year;
  }

  static formatCompleteDate (date) {
    const dateString = ControllerUtil.formatDate(date);
    const hours  = date.getHours().toString().padStart(2, '0');
    const minutes  = date.getMinutes().toString().padStart(2, '0');
    return dateString+' '+hours+':'+minutes;
  }

  static formatDataType (type) {
    if (type == "raw_data") return "Raw"
    if (type == "processed_data") return "Processed"
  }

  static formatDataStatus (status) {
    if (status == "unprocessed") return "Not Processed"
    if (status == "processing") return "Processing"
    if (status == "processed") return "Processed"
  }

  static formatOperationType (type) {
    if (type == "buy") return "Buy"
    if (type == "upload") return "Upload"
    if (type == "process") return "Processed"
    if (type == "request_process") return "Process Request"
  }

  static formatProcessRequestStatus (type) {
    if (type == "not_processed") return "Not Processed"
    if (type == "processed") return "Processed"
  }

  static formatMoney(value){
    return Dinero({ amount: value, precision: 9 }).toFormat('0.000000000')
  }


  static generateId(){
    return uuidv4();
  }

  static getHashFromMagneticLink(magnetLink){
    return magnet.decode(magnetLink).infoHash
  }

  static getHash(payload) {
    const hash = crypto.createHash('sha256');
    const data = hash.update(payload, 'utf-8');
    return data.digest('hex') 
  }

  static getMessageFromError(error){
    let message = (error.responses[0].response.message)
    message = message.split(":")    
    console.log(message[message.length-1])
    message = message[message.length-1]
    return message
  }
  
}


module.exports = ControllerUtil;