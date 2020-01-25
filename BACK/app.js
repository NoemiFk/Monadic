var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    bodyParser  = require("body-parser"),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./routers/router_task'));

var router = express.Router();


app.use(router);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://Noemii:Monadic1@ds059804.mlab.com:59804/monadic", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

/**
 * Connection ready event hanlder
 */
mongoose.connection.on('open', () => {
    console.log('\033[36m[MongoDB] connected to \033[39m' + "mongodb://Noemii:Monadic1@ds059804.mlab.com:59804/monadic" + '\033[36m \033[39m')
});

/**
 * Connection error event hanlder
 */
mongoose.connection.on('error', function () {
    console.log('\n\033[31m[ERROR: mongodb] Impossible to connect to \033[39m' + "mongodb://Noemii:Monadic1@ds059804.mlab.com:59804/monadic");
});

server.listen(3000);

server.on('listening', function () {
    
    let server_str = '(\033[39mhttp\033[36m)';

    console.log('\033[36m[express] listening ' + server_str + ' on \033[39m' +server.address().port);
});


