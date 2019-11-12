const express       = require('express');
const cors          = require('cors');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db            = require('./config/db');

const app           = express();

const port = 8000;

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type'
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

MongoClient.connect(db.url, (err, database) => {
    if(err) {
        return console.log(err);
    }
    require('./app/routes')(app, database.db('skaiend'));
    app.listen(port, () => {
        console.log("We are live on " + port);
    })
});

