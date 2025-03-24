import mongoose from 'mongoose';
import Firearms from '../models/FirearmsModel.js';
import * as dotenv from 'dotenv';
dotenv.config();

import firearmsData from './firearms_data.js';

const insertData = async () => {
  console.log(process.env.JWT_SECRET);
  console.log(process.env.MONGO_URL);
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('MongoDB Connected...');

    // Clear the existing firearms collection
    await Firearms.deleteMany({});
    console.log(
      'Existing firearms collection cleared...'
    );

    // Insert firearms into the database
    const insertedFirearms =
      await Firearms.insertMany(firearmsData);

    console.log(
      `Inserted ${insertedFirearms.length} firearms into the database`
    );
    mongoose.connection.close();
  } catch (error) {
    console.error(
      'Error inserting firearms:',
      error
    );
    mongoose.connection.close();
  }
};

insertData();
