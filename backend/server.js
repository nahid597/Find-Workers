const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./route');
const path = require("path");
const cors = require('cors');

const app = express();
const server = require('http').Server(app);

//var db = 'mongodb+srv://khayrul1234:khayrul1234@cluster0-q6u9x.mongodb.net/test?retryWrites=true';
var db0 = 'mongodb+srv://Hasan:mongodb31_password@cluster0-n0s4m.mongodb.net/test?retryWrites=true&w=majority';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


mongoose.connect(db0, { useNewUrlParser: true }, ()=>{
    console.log('ok');
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('', route);

app.use(express.static(path.join(__dirname, './routers/uploads')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname , '../FrontEnd/navbar/navbar.component.html'));
});
const port = 4444;
server.listen(port, function() {
    console.log('app listening on port ' + port);
});

module.exports = server;
