const express = require('express');
const PORT = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

//include routes
const listingRouter=require('./routes/listingRouter.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

app.use("/", listingRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})
