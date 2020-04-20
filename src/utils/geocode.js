const request = require ('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamFnYWJhbiIsImEiOiJjazUyZ3YwZG4xNDFuM21tczV6Nm1kN3g3In0.almVyVlOjhm-puzhtuNinw'

    request({url: url, json: true}, (error, response) =>{

    if (error){
        callback('could not reach geo server', undefined)
    } else if (response.body.features.length === 0) {
        callback('could not find location', undefined)
    }
    else{
        callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    }
}
)}

module.exports = geocode