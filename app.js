const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const apiRoute = require('./routers/apiRoute');
app.use('/api', apiRoute);

app.get('/', (req, res) => {
	res.send('Hello World!');
})

app.listen(3000, (err) => {
	console.log('Listening to 3000');
})