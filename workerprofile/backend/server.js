const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./route');
const path = require("path");

const app = express();
const server = require('http').Server(app);

var db = 'mongodb+srv://khayrul1234:khayrul1234@cluster0-q6u9x.mongodb.net/test?retryWrites=true';
var db0 = 'mongodb+srv://khayrul123:khayrul123@cluster0-6kqzz.mongodb.net/test?retryWrites=true';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


mongoose.connect(db, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('', route);
app.use(express.static(path.join(__dirname, '../')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname , '../FrontEnd/navbar/navbar.component.html'));
});
const port = 4444;
server.listen(port, function() {
    console.log('app listening on port ' + port);
});

module.exports = server;