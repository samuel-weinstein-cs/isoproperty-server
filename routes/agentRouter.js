const { Router } = require('express');
const { Agent } = require('../models.js');
const { hashPassword, genToken, checkPassword, restrict } = require("../services/auth");

const agentRouter = Router();

const buildAuthResponse = (agent) => {
  const agentData = {
    name: agent.name,
    id: agent.id,
  };


  const token = genToken(agentData);

  return {
    agent: agentData,
    token
  };
};

agentRouter.get("/", async (req, res) => {
  try {
    const agents = await Agent.findAll(/*{
      attributes: ['name', 'description', 'email', 'phone', 'mobile' ]
    }*/);
    res.json(agents);
  } catch(e) {
    console.error(e);
    next(e);
  }
})

agentRouter.post('/' ,restrict, async (req, res, next) => {
  try {
    const { name, description, email, phone, mobile } = req.body;
    const agents = await Agent.findAll({ where: { name } });
    if (agents.length === 0) {
      const password_digest = await hashPassword(req.body.password);
      const agent = await Agent.create({
        name,
        password_digest,
        description,
        email,
        phone,
        mobile
      })
      const respData = buildAuthResponse(agent);
      res.json(respData);
    } else {
      res.status(403).send('Agent already exists');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
})

module.exports = agentRouter;
