const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; // '|| 3000' sets a default. If process.env.PORT doesn't exist, set it to 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log(error);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'My Home Page',
        welcomeMessage: 'Welcome to the website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'My About Page'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: 'My Portfolio Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
       errorMessage: 'Unable to fulfil request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});