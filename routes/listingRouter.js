const { Router } = require('express');
const { Listing } = require('../models.js');
const listingRouter = Router();

listingRouter.get("/", async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch(e) {
    console.error(e);
    next(e);
  }
})

listingRouter.post('/', async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.json(listing);
  } catch (e) {
    next(e)
  }
})

listingRouter.route("/:id")
  .get(async (req, res, next) => {
    try {
      const listing = await Listing.findByPk(req.params.id);
      res.json(listing);
    } catch(e) {
      console.error(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const listing = await Listing.findByPk(req.params.id);
      await listing.update(req.body)
      res.json(listing)
    } catch (e) {
      console.error(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const listing = await Listing.findByPk(req.params.id);
      listing.destroy();
      res.json(listing);
    } catch (e) {
      console.error(e);
      next(e)
    }
  })

module.exports = listingRouter;
