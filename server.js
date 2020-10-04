const express = require('express');
const app = express();
const port = 3000;

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