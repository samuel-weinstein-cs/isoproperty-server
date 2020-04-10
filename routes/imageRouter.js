const { Router } = require('express');
const { Image, Listing } = require('../models.js');
const imageRouter = Router();
const { restrict } = require('../services/auth.js');
const { sign } = require('../services/awsS3.js');

imageRouter.get('/', async (req,res) => {
  try {
    const {listingId} = res.locals;
    const images = await Image.findAll({
      where: {
        listingId
      }
    })
    res.json({images})
  } catch(e) {
    console.error(e);
    next(e);
  }
})

imageRouter.post("/", restrict, async (req, res) => {
  try {
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const signedData = await sign(fileName, fileType);
    const image = await Image.create({
      file_name: fileName,
      file_type: fileType,
      url: signedData.url
    })
    const listing = await Listing.findByPk(res.locals.listingId);
    await listing.addImage(image);
    res.json({
      image,
      request: signedData.signedRequest
    })


  } catch(e) {
    console.error(e);
    next(e);
  }
})

module.exports= imageRouter;
// .get(async (req, res, next) => {
//   try {
//     const listing = await Listing.findByPk(req.params.id);
//     res.json(listing);
//   } catch(e) {
//     console.error(e);
//     next(e);
//   }
// })
// .put(restrict, async (req, res, next) => {
//   try {
//     const listing = await Listing.findByPk(req.params.id);
//     await listing.update(req.body)
//     res.json(listing)
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// })
// .delete(restrict, async (req, res, next) => {
//   try {
//     const listing = await Listing.findByPk(req.params.id);
//     listing.destroy();
//     res.json(listing);
//   } catch (e) {
//     console.error(e);
//     next(e)
//   }
