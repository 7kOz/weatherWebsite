const request = require('request')



// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib21hcmhha2VlbSIsImEiOiJja2pjNW04N2Y3dDdhMnFxajQwNXpucWhrIn0.R_PPDq07CrscRnHP4Qv45g&limit=1'

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log(chalk.red('Unable to connect to mapbox service.'))
//     } else if (response.body.features.length === 0) {
//         console.log(chalk.red('Unable to find location please try another search.'))
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// })

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoib21hcmhha2VlbSIsImEiOiJja2pjNW04N2Y3dDdhMnFxajQwNXpucWhrIn0.R_PPDq07CrscRnHP4Qv45g&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location please try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode