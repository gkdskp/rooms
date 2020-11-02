const db = require('./models');

app.get('/', (req, res) => {
	res.send('OK');
});

const port = process.env.PORT || 4000;
let server;

db.sequelize.sync.then(() => {
	server = app.listen(port, () => {
		console.log(`Started server at ${Date.now()}`);
	});
}).catch((_) => {
	console.error('Sequelize sync failed');
	console.error(_);
});