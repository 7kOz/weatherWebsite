const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utilities/geocode')
const forecast = require('../src/utilities/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Events App',
        name: 'Omar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Omar',

    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'For more help please contact customer service',
        name: 'Omar',
    })
})


// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('<h1> Help </h1>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> About </h1>')
// })



app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'No adress provided please provide an adress'
        })
    }

    geocode(req.query.adress, (error, { latitude, longitude, location }={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error , forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })

    // res.send({
    //     location: 'Istanbul, Turkey',
    //     forecast: 'Currently calm, 5 Degrees  With 0% chane of rain',
    //     adress: req.query.adress,

    // })
})

// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'OOps',
        error: 'Help article doesn\'t exist'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'OOps',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server Initiated on port 3000')
})