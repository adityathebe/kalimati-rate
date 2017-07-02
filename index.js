let request = require('request');
let cheerio = require('cheerio');
let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());

/* === Store Data Here === */
let retail;
let wholesale;

function getData(res, option) {
	let url;
	if(option == 1)
		url = "http://kalimatimarket.gov.np/home/rpricelist";
	else
		url = "http://kalimatimarket.gov.np/home/wpricelist";

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

	    if(option == 1)
	    	retail = data;
	    else
	    	wholesale = data;
	});
}

app.get('/', (req, res) => {
	getData(res, 1);
	getData(res, 0);

	let reply = {
		"retail"	: retail,
		"wholesale"	: wholesale
	}

	res.send(reply);
})

console.log('Server Up and running on PORT 3000!');
app.listen(process.env.PORT || 3000);