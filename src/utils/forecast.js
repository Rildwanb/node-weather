const request = require('request')

const forecast = (lat,long,callback) =>{
    const weath_url = 'https://api.darksky.net/forecast/e5a58d6842cf9703db33692bb69d56b3/'+ lat +','+ long + '?units=si'

    request({uri: weath_url, json:true}, (error,response) =>{
        if(error){
            callback('Could not reach server at the moment',undefined)
        } else if (response.body.error){
            callback('No such fucking place, you suck',undefined)
        } else {
            callback(undefined, {
                Weather_forecast: 'Here: '+ response.body.daily.data[0].summary +' The temperature outside right now is '+ response.body.currently.temperature + ' degrees celcius, there is ' +  response.body.currently.precipProbability * 100+ '% probabbilty of rain.',
                // temperature: response.body.currently.temperature,
                // summary: response.body.daily.data[0].summary,
                // Chance_of_rain: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast