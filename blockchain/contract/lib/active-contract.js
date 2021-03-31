'use strict';

const { Context, Contract } = require('fabric-contract-api');
const CryptoUtils = require('./crypto-utils')
const AccountList = require('./account/account-list.js');

class ActiveContext extends Context {
  constructor() {
      super();
      this.accountList = new AccountList(this);
  }
}

class ActiveContract extends Contract {
  async beforeTransaction(ctx){
    const certificate = CryptoUtils.getUserCertificate(ctx)
    const publicKey = CryptoUtils.getPublicKeyFromCertificate(certificate)
    const userAddress = CryptoUtils.getAddressFromPublicKey(publicKey)
    const user = await ctx.accountList.getAccount(userAddress);
    ctx.user = user
  } 
}



module.exports = { ActiveContract, ActiveContext };
