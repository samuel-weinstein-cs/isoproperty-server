const { Router } = require('express');
const { restrict } = require('../services/auth.js');
const { About } = require('../models.js');


const aboutRouter = Router();

aboutRouter.get('/', async (req, res) => {
  try {
    const about = await About.findByPk(1);// feelsbadman
    res.json({text: about.text});
  } catch(e) {
    console.error(e);
    next(e);
  }
})

aboutRouter.put('/', async (req, res) => {
  try {
    const about = await About.findByPk(1);
    await about.update(req.body);
    res.json({text: about.text});
  } catch(e) {
    console.error(e);
    next(e);
  }
})

module.exports = aboutRouter;
