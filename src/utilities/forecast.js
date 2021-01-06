const request = require('request')


// const weatherStackBaseURL = 'http://api.weatherstack.com/'

// const weatherStackApi = 'dcb0b4370ef34ddd3ecc8666ab9ab579'

// const weatherStackURL = 'http://api.weatherstack.com/current?access_key=dcb0b4370ef34ddd3ecc8666ab9ab579&query=37.8267,-122.4233&units=m'

// request({ url: weatherStackURL, json: true }, (error, response) => {
//     if (error) {
//         console.log(chalk.red('Unable to connect to weather service'))
//     } else if (response.body.error) {
//         console.log(chalk.red('Unable to find location'))
//     } else {
//         const currentWeatherAlameda = (response.body.current.weather_descriptions[0] + '. It\'s currently ' + response.body.current.temperature + ' degrees celsius out. There is a ' + response.body.current.precip + ' % chance of rain')
//         console.log(chalk.green(currentWeatherAlameda))
//     }
// })


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dcb0b4370ef34ddd3ecc8666ab9ab579&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Coordinate error.', undefined)
        } else {
            //console.log(body.current)  Check for editing what 
            callback(undefined, body.current.weather_descriptions[0] + '. It\'s currently ' + body.current.temperature + ' degrees celsius out. Feels like ' + body.current.feelslike + '. There is a ' + body.current.precip + ' % chance of rain')

        }
    })
}



module.exports = forecast