var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	express = require('express'),
	axios = require('axios')
	axios.get('https://api.github.com/users/codeheaven-io');

//Express


axios.get('https://api.github.com/users/' + id) 
	.then(function(response){
		console.log(response.data);
		console.log(response.status);
	});

	axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
	.then(function(response){
		console.log('saved succesfully')
	});

$(document).ready(function(){
	$('#searchButton').click(getData);
});

function getData(){

	console.log('Worked');
	var ticker = $('#searchText').val().toUpperCase();

	console.log(ticker);



	var url = 'https://www.sec.gov/cgi-bin/browse-edgar?CIK=' + ticker;
}