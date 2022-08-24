const router = require('express').Router();
const { house } = require('../models/Post.model');

router.get('/allpost', (req, res) => {
  house
    .find()
    .populate('postedBy', '_id  HouseName HouseNumber')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', async (req, res) => {
  const { HouseNumber, HouseName, Short_description } = req.body;
  if (!HouseNumber || !HouseName || !Short_description) {
    res.status(422).json({ error: 'Please Enter the neccesary details' });
  }

  const post = await new house({
    HouseNumber,
    HouseName,
    Short_description,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
