import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'
import getConversionRate from '@salesforce/apex/currencyConverterAppController.getConversionRate'
export default class CurrencyConverterApp extends LightningElement {
  currencyImage = currencyConverterAssets +'/currencyConverterAssets/currency.svg'
  countryList = countryCodeList
  countryFrom = "USD"
  countryTo = "AUD"
  amount =''
  result
  error 
  handleChange(event){
    const {name, value} = event.target
    console.log("name", name)
    console.log("value", value)
    this[name] = value
    this.result=''
    this.error =''
  }
  submitHandler(event){
    event.preventDefault()
    this.convert()
  }
  //server side calling
  convert(){
    getConversionRate({fromCurrency:this.countryFrom, toCurrency:this.countryTo}).then(response=>{
      const jsonData = JSON.parse(response)
      this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
    }).catch((error)=>{
      console.log(error)
      this.error="An error occurred. Please try again..."
    })
  }

  //client side calling
  /*
  async convert(){
    const API_KEY = 'e6481c00e171028cfc045a26'
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
    try{
      const data = await fetch(API_URL)
      const jsonData = await data.json()
      this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
      console.log(this.result)
    } catch(error){
      console.log(error)
      this.error="An error occurred. Please try again..."
    }
  }*/
}