import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    const db = await mongoose.connect(process.env.DB);
    console.log("DB connected to: ", db.connection.name);
  } catch (e) {
    console.log(e)
  }
})();