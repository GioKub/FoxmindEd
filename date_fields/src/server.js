require('dotenv').config();
const express = require('express');
const { connectToDB } = require('./db/connection');

const app = express();

const usersRouter = require('./routes/users');

connectToDB();

app.use(express.json());

app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('server started');
});
