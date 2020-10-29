const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// DATABASE ------------------------------------------------------------------------------------------------------------

mongoose.connect('mongodb://localhost:27017/quiz_8', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes --------------------------------------------------------------------------------------------------------------

app.use('/', express.static('public'));

app.get('/hello', (request, response) => {
    response.send('Hello World!');
});

app.get('/budget', (request, response) => {
    response.json(require('./budget.json'));
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});