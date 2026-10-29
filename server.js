const express = require('express');

const app = express(); // we are creating a server instance here

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.get('/about', (req, res) => {
    res.send('Hello, About page!');
})



app.listen(3000) // to start the server we using this method 


