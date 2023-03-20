const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGO DB CONNECTED: ${conn.connection.host}`.cyan.underline);
  } catch(err) {
    console.log(`MONGO DB CONNECTION FAILED: ${err}`.red.underline);
    process.exit(1)
  }
}

module.exports = connectDB
