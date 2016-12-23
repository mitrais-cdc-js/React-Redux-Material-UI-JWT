var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.set('origins', 'http://localhost:7770'); //Your Application URL

app.get('/', function(req,res) {
    res.send("Hello world!");
});

io.on('connection', function(socket){
    console.log('user connected');

    socket.on('disconnect', function(){
        console.log('disconnected');
    });
    
    
    socket.on('DELETE_EMPLOYEE', function(obj){
        console.log('DELETE_EMPLOYEE : ' + obj);
        socket.broadcast.emit('DELETE_EMPLOYEE_BROADCAST', obj);        
    })

    socket.on('ADD_EMPLOYEE', function(obj){
        console.log('ADD_EMPLOYEE : ' + obj);
        socket.broadcast.emit('ADD_EMPLOYEE_BROADCAST', obj);        
    })

    socket.on('EDIT_EMPLOYEE', function(obj){
        console.log('EDIT_EMPLOYEE : ' + obj);
        socket.broadcast.emit('EDIT_EMPLOYEE_BROADCAST', obj);        
    })

});

http.listen(3000, function(){
    console.log('Listening on port 3000');
});