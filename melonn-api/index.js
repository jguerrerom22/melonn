const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors());

require('./startup/routes')(app);

const port = process.env.PORT || 8100;
app.listen(port, '0.0.0.0');

module.exports = app;