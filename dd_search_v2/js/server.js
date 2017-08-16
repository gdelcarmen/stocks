//Dependencies

var request = require ('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var data = {
	tickers: [],
	topgainers: [],
	insiders: [],
	filings: [],
	earnings: [],
	yahoos: []
};

//Express
app.get('/scrape', function(req, res){

	request('http://finviz.com/', function(err, resp, html){
		if(!err && resp.statusCode == 200){
			var $ = cheerio.load(html);
			$('.insider').filter(function(){
				var insider = $(this);
				data.insiders = insider.contents().text();
			})
		}
	})

	request('https://stocktwits.com/', function(err, resp, html){
		if(!err && resp.statusCode == 200){
			var $ = cheerio.load(html);
			$('a.with-ticker-card', '#trending-wrapper').each(function(){
				var ticker = $(this).attr('data-symbol');
				data.tickers.push(ticker);
			});
		}

	request('https://stocktwits.com/eWhispers', function(err, resp, html){
		if(!err && resp.statusCode == 200){
			var $ = cheerio.load(html);
			$('a.ticker.with-ticker-card', '#content-wrapper').each(function(){
				var earning = $(this).attr('data-symbol');
				data.earnings.push(earning);
			});
		}

		request('https://www.biopharmcatalyst.com/biotech-stocks', function(err, resp, html){
		if(!err && resp.statusCode == 200){
			var $ = cheerio.load(html);
			$('.biotech-table').filter(function(){
				var topgainer = $(this);
				data.topgainers = topgainer.find('tbody').contents().text().replace(/\n/g, '');
			});
		}

		res.send(data);

		});
	});
});



//Cheerio and Request


//Express Extra
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongoose

mongoose.connect('mongodb://localhost/rest_test');


//Routes

app.get('/', function(req, res){
	res.send('Working...');
});

//Start Server
app.listen(3000);
console.log('API is running on port 3000');


