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

// Schemas -------------------------------------------------------------------------------------------------------------

let ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    cost: {
        type: Number,
        required: true,
        min: 0.01
    },
    color: {
        type: String,
        required: true,
        validator: [(hexColor) => (/^#[0-9A-F]{6}$/i).test(hexColor), 'Invalid hex color value']
    }
});

// Models --------------------------------------------------------------------------------------------------------------

let Expense = mongoose.model('Expense', ExpenseSchema);

// Routes --------------------------------------------------------------------------------------------------------------

app.use('/', express.static('public'));
app.use(express.json());

app.get('/hello', (request, response) => {
    response.send('Hello World!');
});

app.get('/budget', (request, response) => {
    response.json(require('./budget.json'));
});

app.get('/expenses', (request, response) => {
    Expense.find({}, (error, expenses) => {
        response.send(error || expenses);
    });
});

app.post('/expenses', (request, response) => {
    Expense.create(request.body, (error, expense) => {
        response.send(error || expense);
    })
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});