const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

var corsOptions = {
    origin: 'http://167.172.53.222',
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type'
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
MongoClient.connect(db.url, {
        useUnifiedTopology: true
    },
    (err, database, bcrypt) => {
        if (err) {
            return console.log(err);
        }
        require('./app/routes')(app, database.db('skaiend'), bcrypt);
        app.listen(port, () => {
            console.log("We are live on " + port);
            
        })
    });