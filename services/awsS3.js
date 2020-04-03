const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket;

const sign = async (fileName,fileType) => {
  const s3 = new aws.S3();
  // const fileName = req.body.fileName;
  // const fileType = req.body.fileType;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  }
  const signedRequest = await s3.getSignedUrlPromise('putObject', s3Params);

  const returnData = {
    signedRequest,
    url: `http://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
  }
  return returnData;
}

module.exports = {
  sign
}
