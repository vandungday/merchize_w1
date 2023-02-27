const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.set('strictQuery', false);

  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('[MONGODB] connected'))
    .catch((err) => console.log('[ERROR MONGODB]', err));
};

module.exports = connectDB;
