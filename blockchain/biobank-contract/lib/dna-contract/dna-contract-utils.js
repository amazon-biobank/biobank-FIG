'use strict';

const CryptoUtils = require('./../crypto-utils')
const InternalOperationContract = require('./../operation/internal-operation-contract')
const Data = require('../data/data.js');
const _ = require('lodash');
const CONFIG = require('../../config.json')

class DnaContractUtils {
  static handleDnaContractAttributes(dnaContractAttributes) {
    let newDnaContractAttributes = _.pick( 
      JSON.parse(dnaContractAttributes), 
      [ 
        'dna_id', 
        'raw_data_price', 
        'processed_data_price',
        'payment_distribution.collector', 
        'payment_distribution.processor', 
        'payment_distribution.curator', 
        'payment_distribution.validators', 
        'accepted_processed_data.processed_data_id',
        'accepted_processed_data.process_request_id',
        'royalty_payments', 
        'created_at' 
      ])
    newDnaContractAttributes.id = CryptoUtils.getHash(newDnaContractAttributes.dna_id)
    return newDnaContractAttributes;
  }

  static async validateContractCreation(ctx, dnaContractAttributes){
    await this.validateCollector(ctx, dnaContractAttributes)
    validatePaymentDistribution(dnaContractAttributes.payment_distribution)
    // validate royalty_payments
    return true
  }

  static async addOwnersInData(ctx, dna){
    if(dna.owners.includes(ctx.user.address) == false) {
        dna.owners.push(ctx.user.address)
        await ctx.dataList.updateState(dna);
    }
    return dna
  }


  static checkPaymentAndOperation(ctx, payment, operation){
    if(payment == undefined || payment.status != "paid"){
        throw new Error("Operation not paid")
    }
    if (operation.userAddress != ctx.user.address){
        throw new Error("user not allowed")
    }
    return true
  }

  static async createBuyingOperation(ctx, dna, dnaContract, operationId, price){
    const internalOperationContract = new InternalOperationContract()
    const operationAttributes = JSON.stringify({
        type: 'buy',
        userAddress: ctx.user.address,
        created_at: new Date().toDateString(),
        details: {
            data_id: dna.id,
            contractId: dnaContract.id
        },
        input: [{
            address: ctx.user.address,
            value: price
        }],
        output: [{
            address: dna.collector,
            value: price
        }]
    })

    
    return await internalOperationContract.createOperation(ctx, operationId, operationAttributes)
  }

  static async validateCollector(ctx, dnaContractAttributes){
    const dna = await this.getData(ctx, dnaContractAttributes.dna_id)
    if(dna.collector == undefined || ctx.user.address != dna.collector ){
        throw new Error('Unauthorized')
    }
  }

  static async getData(ctx, dataId){
    const dataKey = Data.makeKey([dataId]);
    const data = await ctx.dataList.getData(dataKey); 
    return data
  }
}

function validatePaymentDistribution(paymentDistribution){
  if( 
    paymentDistribution.collector < CONFIG.dnaContract.collector.min ||
    paymentDistribution.collector > CONFIG.dnaContract.collector.max ||
    paymentDistribution.processor < CONFIG.dnaContract.processor.min ||
    paymentDistribution.processor > CONFIG.dnaContract.processor.max ||
    paymentDistribution.validators < CONFIG.dnaContract.validators.min ||
    paymentDistribution.validators > CONFIG.dnaContract.validators.max ||
    paymentDistribution.curator < CONFIG.dnaContract.curator.min ||
    paymentDistribution.curator > CONFIG.dnaContract.curator.max 
  ){
    throw new Error('PaymentDistribution Parameter Error')
  }
  if(
    paymentDistribution.collector + 
    paymentDistribution.processor + 
    paymentDistribution.validators + 
    paymentDistribution.curator != 10000
  ){
    throw new Error('PaymentDistributionParameters does not sum 100%')
  }
}




module.exports = DnaContractUtils;
