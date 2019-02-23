var express = require('express');
var hbs = require('hbs')
var fs = require('fs')

const port = process.env.PORT || 3000;
var app = express()


hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var info = req.method + " " + req.url + " " + new Date()
    fs.appendFileSync('./requestlog', info + "\n")
    next()
})

// app.use((req,res,next)=>{
// res.render('maintainence.hbs',{
//     text:"site under maitainence"
// })
// next()
// })

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('scremIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        pageName: "Home Page",

        welcomeMessage: "Welcome to the application"
    })
})

app.get('/about', (req, res) => {
    //res.send('about page')
    res.render('about.hbs', {
        pageName: "About Page",

    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: "cannot fulfill request"
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        projectMessage: "projects",
        pageName:"Projects"
    })
})
app.listen(port)