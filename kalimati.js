const request = require('request');
const cheerio = require('cheerio');

const urlR = "http://kalimatimarket.gov.np/home/rpricelist";
const urlW = "http://kalimatimarket.gov.np/home/wpricelist";

const fetch = (url) => {
    return new Promise((resolve, reject) => {
        let data = [];
        request(url, (err, response, body)=> {
            if(err)
                return reject(err);
            let $ = cheerio.load(body);
            $('tr').each(() => {
                let temp = [];
                $(this).find('td').each(function(i) {
                    temp.push($(this).text());
                });
                data.push(temp);
            });
            resolve(data);
        });        
    })
}

let kalimati  = {
    retail : () => fetch(urlR),
    wholesale : () => fetch(urlW)
};

module.exports = kalimati;