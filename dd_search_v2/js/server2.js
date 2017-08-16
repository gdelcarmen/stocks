//Dependencies

var request = require ('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	express = require('express'),
	app = require('express')(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	http = require('http').Server(app),
	io = require('socket.io')(http);
	//socketUsers = require('socket.io.users');
users = [];
connection = [];

var data = {
	tickers: [],
	topgainers: [],
	insiders: [],
	filings: [],
	earnings: [],
	yahoos: []
};

//Start Server
//app.listen(3000);
//console.log('API is running on port 3000');

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
			})
		}
	})

	request('https://seekingalpha.com/earnings/earnings-calendar', function(err, resp, html){
		if(!err && resp.statusCode == 200){
			var $ = cheerio.load(html);
			$('.symbol').each(function(){
				var earning = $(this).text();
				data.earnings.push(earning);
			})
		}
	})


	request('https://www.biopharmcatalyst.com/biotech-stocks', function(err, resp, html){
		if(!err && resp.statusCode == 200){
			var $ = cheerio.load(html);
			$('.biotech-table').filter(function(){
				var topgainer = $(this);
				data.topgainers = topgainer.find('tbody').contents().text().replace(/\n/g, '');
			})
		}
	})

	res.send(data);

});

//Chatroom
	//Username

		
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



   
http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
//Express Extra
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongoose

mongoose.connect('mongodb://localhost/rest_test');


//Routes

app.get('/', function(req, res){
	res.send('Working...');
});



