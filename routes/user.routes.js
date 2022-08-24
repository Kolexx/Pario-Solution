const router = require('express').Router();
const { User, validate } = require('../models/user.models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({
        message: 'User with given email alreadyt exist',
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: 'user created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
