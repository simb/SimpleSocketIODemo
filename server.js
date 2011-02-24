require.paths.unshift(__dirname + '/lib');

var http = require('express'),  
    io = require('socket.io'),
	sys = require('sys');

server = http.createServer(
	http.staticProvider(__dirname + '/public')
);
server.listen(8124);
  
// socket.io 
var socket = io.listen(server); 

	
  	// Add a connect listener
	socket.on('connection', function(client){ 
		
		var interval = setInterval(function() {
		  client.send('This is a message from the server!  ' + new Date().getTime());
		},5000);
	  // Success!  Now listen to messages to be received
	  client.on('message',function(event){ 
	    console.log('Received message from client!',event);
		client.send('Echo: ' + event );
	  });
	  client.on('disconnect',function(){
	    //clearInterval(interval);
	    console.log('Client has disconnected');
	  });
	
	
});