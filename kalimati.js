let request = require('request');
let cheerio = require('cheerio');

let urlR = "http://kalimatimarket.gov.np/home/rpricelist";
let urlW = "http://kalimatimarket.gov.np/home/wpricelist";

const fetch = (url) => {
    let data = [];
    return new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if(err)
                return reject(err);
            let $ = cheerio.load(body);
            $('tr').each(function() {
                let temp = [];
                $(this).find('td').each(function(i) {
                    temp.push($(this).text());
                });
                data.push(temp);
            });
            resolve(data);
        });
    });
}

module.exports = {
    retail : () => fetch(urlR),
    wholesale : () => fetch(urlW)
}