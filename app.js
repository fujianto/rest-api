const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

const apiRoute = require('./routers/apiRoute');
app.use('/api', apiRoute);

// Client Testing
app.get('/', (req, res) => {
	res.render('login')
})

// TEST ADMIN ONLY
app.get('/allusers', (req, res) => {
	res.render('allUsers')
})

// TEST USER WITH OWN ID and ADMIN
app.get('/profiles/:userId', (req, res) => {
	res.render('profiles');
})

app.listen(3000, (err) => {
	console.log('Listening to 3000');
})