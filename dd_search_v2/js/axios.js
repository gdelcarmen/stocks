$(document).ready(function(){
	$('#searchButton').click(getData);
});

function findTicker(){
	console.log('Function findTicker worked');
	var ticker = $('#searchText').val().toUpperCase();

	console.log(ticker);

	axios.get('localhost:3000' + username)
	.then(function(response) {
		console.log(response);

		var output = '';

		console.log(data);
	})
}
}

axios.get('localhost:3000' + username)
  .then(function(response){
    console.log(response);

    var data = {


    }

// Performing a POST request
axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
  .then(function(response){
    console.log('saved successfully')
  });  
//Outputs

	output += `
	            	<tr>
				      <th scope="row">${ticker}</th>
				      <td>${data.mostRecentDate}</td>
				      <td>${data.volume}</td>
				      <td>${data.volumeTwo}</td>
				      <td>${data.twenty}</td>
				      <td>${data.fifty}</td>
				      <td>${data.macd}</td>
				      <td>${data.macdTwo}</td>
				      <td>${data.macdThree}</td>
				      <td>${data.rsi}</td>
				    </tr>
            	`;
