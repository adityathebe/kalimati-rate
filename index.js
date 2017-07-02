let request = require('request');
let cheerio = require('cheerio');
let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());

app.get('/', (req, res) => {
	let reply = {
		"Message" : "No endpoint"
	}
	res.send(reply);
})

app.get('/whole', (req, res) => {
	let url = "http://kalimatimarket.gov.np/home/wpricelist"
	getData(url, res);
})

app.get('/retail', (req, res) => {
	let url = "http://kalimatimarket.gov.np/home/rpricelist";
	getData(url, res);
})

function getData(url, res) {
	request(url, (error, response, body)=> {
	    let data = [];

	    /* ------ Cheerio -------- */
	    let $ = cheerio.load(body);
	    $('tr').each(function() {
	    	let temp = [];
	    	$(this).find('td').each(function(i) {
	      		temp.push($(this).text());
	    	});
	    	data.push(temp);
	    });

	    let reply = {
	    	length	: data.length,
	    	items	: data
	    }

	    res.send(reply);
	});
}

console.log('Server Up and running!');
app.listen(process.env.PORT || 3000);
