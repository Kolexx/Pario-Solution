const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/config', options);
    console.log(`connected to ${process.env.DB_URL}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
