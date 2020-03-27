const express = require('express');
const PORT = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})
