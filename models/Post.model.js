const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const { User } = require('../models/user.models');

const houseSchema = new mongoose.Schema({
  HouseNumber: {
    type: Number,
    require: true,
  },
  HouseName: {
    type: String,
    require: true,
  },
  Short_description: {
    type: String,
    require: true,
  },
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: 'user' },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: 'user',
  },
  photo: {
    type: String,
    require: true,
    defult: 'no photo',
  },

  dateUpload: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const house = mongoose.model('House', houseSchema);
module.exports = { house };
