const mongoose = require('mongoose');

const connectToDB = () => {
  mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/', { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('connected to Database'));
};

module.exports = {
  connectToDB,
};
