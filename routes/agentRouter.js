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



agentRouter.post('/' , restrict, async (req, res, next) => {
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

agentRouter.get("/verify", restrict, (req, res) => {
  const agent = res.locals.agent;

  res.json(agent)
})

agentRouter.post('/login', async (req, res) => {
  try {
    const agent = await Agent.findOne({
      where: {
        email: req.body.email
      }
    })
    if(agent && await checkPassword(req.body.password, agent.password_digest)) {
      const respData = buildAuthResponse(agent);
      res.json(respData);
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (e){
    console.error(e);
    next(e);
  }
})


agentRouter.put('/:id', restrict, async (req, res, next) => {
  try {
    const agentId = res.locals.agent.id;
    const id = req.params.id;
    if(id==agentId){
      const {
        name,
        description,
        email,
        phone,
        mobile,
        password
      } = req.body;
      const response = {
        name,
        description,
        email,
        phone,
        mobile
      }
      let data = {
        name,
        description,
        email,
        phone,
        mobile
      };
      if(password){
        console.log("setting password");
        const password_digest = await hashPassword(req.body.password);
        data={...data, password_digest};
      }
      const agent = await Agent.findByPk(id);
      await agent.update(data);
      res.json(response)

    } else {
      res.status(403).send('Unauthorized');
    }
  } catch(e) {
    console.error(e);
    next(e);
  }
})

module.exports = agentRouter;
