const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes/index.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));









app.listen(PORT, () => {
console.log('App server on PORT: ${PORT}')
});

