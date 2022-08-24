const express = require('express');
const mongo = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/Post.routes');

require('dotenv').config();

const { BASE_URL, DB_URL } = process.env;
const app = express();

let PORT = process.env.PORT || 3007;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.listen(PORT, async () => {
  await mongo(DB_URL);
  console.log(`running on Port  ${BASE_URL}:${PORT}`);
});
