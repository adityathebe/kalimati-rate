const express = require('express');
const cors = require('cors');
const Kalimati = require('../kalimati');

const port = process.env.PORT || 3000;
let app = express();
app.use(cors());

app.get('/', (req, res) => {
	Kalimati.retail().then((retail) => {
		return Kalimati.wholesale().then((wholesale)=> {
			let reply = {
				"retail"	: retail,
		    	"wholesale"	: wholesale
			}
			res.json(reply);
		});
	}).catch((err) => {
		console.log(err);
	});
});

app.get('/retail', (req, res) => {
	Kalimati.retail().then((retail) => {
		res.json(retail);
	});
});

app.get('/wholesale', (req, res) => {
	Kalimati.wholesale().then((wholesale) => {
		res.json(wholesale);
	});
});

app.listen(port, () => {
	console.log('Server Up and running on PORT', port);
});