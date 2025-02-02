/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-04-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class currencyConverterAppController {
    @AuraEnabled    
    public static String getConversionRate(String fromCurrency, String toCurrency){
        String url = 'https://v6.exchangerate-api.com/v6/' + getKey() + '/pair/' + fromCurrency + '/' + toCurrency;
        String response = getResponse(url);
        return response;
    }
    public static String getResponse(String strUrl){
        Http h  = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint(strUrl);
        req.setTimeout(120000);
        res = h.send(req);
        String responseBody = res.getBody();
        return responseBody;
       }
    public static String getKey(){
        String key = System.Label.Exchange_Rate_API_Key;
        return key;
    }
}