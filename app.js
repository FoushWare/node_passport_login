const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

//   Routes 

// [Welcome Page]
app.use('/', require('./routes/index'));

// User

app.use('/user', require('./routes/user'));


app.listen(PORT, console.log(`Server started on port ${PORT}`));