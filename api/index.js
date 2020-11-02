const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Loading environment variables using dotenv
// Make sure you an .env file at project root
if(require('dotenv').config({
	path: '../.env'
}).error) {
	console.error("Failed to load .env file");
}

const db = require('./models');
const mainRouter = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json())

app.get('/docs', (req, res) => {
	res.sendFile(path.join(__dirname, 'docs/index.html'));
});
app.use('/', mainRouter);

const port = process.env.PORT || 4000;
let server;

db.sequelize.sync().then(() => {
	server = app.listen(port, () => {
		console.log(`Started server at ${Date.now()}`);
	});
}).catch((_) => {
	console.error('Sequelize sync failed');
	console.error(_);
});