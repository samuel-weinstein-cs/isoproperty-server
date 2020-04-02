const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket;

const sign = (req,res) => {
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', s3Params, (e, data) => {
    if (e){
      console.error(e);
      res.json({success: false, error: e})
      return
    }

    const returnData = {
      signedRequest: data,
      url: `http://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }
    res.json({success:true, data:{returnData}})
  })
}

module.exports = {
  sign
}
