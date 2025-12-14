const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('FATAL: MONGO_URI environment variable is not set');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 120000,
      connectTimeoutMS: 60000,
      maxPoolSize: 5,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
      w: 'majority',
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ MongoDB connected successfully!');
    }
  } catch (err) {
    console.error('FATAL: MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
