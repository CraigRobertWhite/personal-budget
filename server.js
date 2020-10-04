const express = require('express');
const app = express();
const port = 3000;

const budget = {
    expenses: [
        {
            type: 'Rent',
            amount: 750
        },
        {
            type: 'Restaurants',
            amount: 200
        },
        {
            type: 'Groceries',
            amount: 200
        },
    ]
};

app.use('/', express.static('public'));

app.get('/hello', (request, response) => {
    response.send('Hello World!');
});

app.get('/budget', (request, response) => {
    response.json(budget);
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});