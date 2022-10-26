const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');


// const notesData = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);






app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
