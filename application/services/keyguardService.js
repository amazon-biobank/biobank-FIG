const path = require('path');
const fs = require('fs')
const https = require('https');
require('dotenv').config()


class KeyguardService {
  static async registerDnaKey(dnaId, secretKey) {
    handleTlsAuthorization()
    const postData = JSON.stringify({ dnaId, secretKey })
    const response = postToKeyguard('/register-dna-key', postData)
    return response
  }

  static async readDnaKey(dnaId, callback) {
    handleTlsAuthorization()
    const response = await getToKeyguard('/read-dna-key', '?dnaId='+ dnaId, callback)
    return response
  }
}

function handleTlsAuthorization(){
  if(process.env.NODE_ENV == 'development'){
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }
}

function getKeyguardRequestOptions(){
  const userIdPath = path.join(process.cwd(), 'fabric-details/wallet/userCertificate.id');
  const caPath = path.join(process.cwd(), 'fabric-details/ca.crt');
  const userId = fs.readFileSync(userIdPath)
  const keyguardRequestOptions = {
    hostname: process.env.KEYGUARD_HOSTNAME,
    port: 9443,
    cert: JSON.parse(userId.toString()).credentials.certificate,
    key: JSON.parse(userId.toString()).credentials.privateKey,
    ca: fs.readFileSync(caPath), 
  }

  return keyguardRequestOptions

}

async function getToKeyguard(path, getQuery, callback){
  let getRequestOptions = getKeyguardRequestOptions()
  getRequestOptions = Object.assign(getRequestOptions, {
    path: path + getQuery,
    method: 'GET'
  })

  const req = https.request(
    getRequestOptions,
    res => {
      res.on('data', function(data) {
        const response = {
          statusCode: req.res.statusCode,
          data: data.toString()
        }
        callback(response)
      })
      
      res.on('error', error => {
        console.error(error)
      })
    }
  )
  req.end();
}

function postToKeyguard(path, postData){
  let postRequestOptions = getKeyguardRequestOptions()
  postRequestOptions = Object.assign( postRequestOptions, {
    method: 'POST',
    path,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  })

  const req = https.request(
    postRequestOptions,
    res => {
      res.on('data', function(data) {
        console.log(data.toString())
        return data.toString
      })

      res.on('error', error => {
        console.error(error)
      })
    }
  );   
  req.write(postData);
  req.end();
}


module.exports = KeyguardService;
