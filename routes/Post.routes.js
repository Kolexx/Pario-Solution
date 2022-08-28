const router = require('express').Router();
const { house } = require('../models/Post.model');
const requireLogin = require('../Middleware/requiredLogin.middleware');

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

router.put('/comment', requireLogin, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.User._id,
  };
  house
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      },
    )
    .populate('comments.postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
module.exports = router;
