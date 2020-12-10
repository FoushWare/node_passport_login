const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 5000;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//   Routes 

// [Welcome Page]
app.use('/', require('./routes/index'));

// User

app.use('/users', require('./routes/users'));


app.listen(PORT, console.log(`Server started on port ${PORT}`));