const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const request = require('request')
const path = require('path')
const express = require ('express')
const hbs = require('hbs')

const app = express()

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))


app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App Index',
        name: 'Bambino'
    })
}) 

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help page',
        name: 'Bambino'
    })
}) 

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About the App',
        name: 'Bambino'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'no address provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error: 'Error communicating with server'
            })
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'Nothing to see here'
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            
    })
})
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'no available search'
    })
    }

    console.log(req.query)
    res.send({
        location: 'Ilorin',
        Weather: '27^c'
    })
})


app.get('/help/*', (req,res) =>{
    res.render('error', {
        title: '404',
        errorMssg: 'help not found ',
        name: 'Bambino',
    })
})

app.get('*', (req,res) =>{
    res.render('error', {
        title: '404',
        errorMssg: 'requested page could not be found',
        name: 'Bambino',
    })
})

app.listen(3000, () => {
    console.log('server up at port 3000')
})