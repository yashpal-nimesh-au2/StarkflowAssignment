let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

let mongoClient = require('mongodb').MongoClient;


mongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    app.locals.db = client.db("ToDoApp")
})

var usersApi = require('./routes/api/user');
app.use('/user', usersApi);

var notesApi = require('./routes/api/notes');
app.use('/notes', notesApi);




app.listen(5000);