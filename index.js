const express = require('express');
const PORT = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

//include routes
const listingRouter=require('./routes/listingRouter.js');
const agentRouter=require('./routes/agentRouter.js');

//include services
const s3 = require('./services/awsS3.js');
const {restrict} = require('./services/auth.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

app.use("/listings", listingRouter);
app.use("/agents", agentRouter);

app.post('/sign_image', restrict, s3.sign);

app.use((err, req, res, next) => { //Error Handling
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})
