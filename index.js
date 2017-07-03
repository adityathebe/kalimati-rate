let request = require('request');
let cheerio = require('cheerio');
let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

let urlR = "http://kalimatimarket.gov.np/home/rpricelist";
let urlW = "http://kalimatimarket.gov.np/home/wpricelist";

app.get('/', (req, res) => {
	request(urlR, (error, response, body)=> {
		let retail = [];
	    let $ = cheerio.load(body);
	    $('tr').each(function() {
	    	let temp = [];
	    	$(this).find('td').each(function(i) {
	      		temp.push($(this).text());
	    	});
	    	retail.push(temp);
	    });

	    request(urlW, (error, response, body)=> {
			let wholesale = [];
		    let $ = cheerio.load(body);
		    $('tr').each(function() {
		    	let temp = [];
		    	$(this).find('td').each(function(i) {
		      		temp.push($(this).text());
		    	});
		    	wholesale.push(temp);
		    });

		    let reply = {
		    	"retail"	: retail,
		    	"wholesale"	: wholesale
		    }
		    res.send(reply);
		});
	});
})

console.log('Server Up and running on PORT 3000!');
app.listen(process.env.PORT || 3000);