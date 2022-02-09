const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variable
dotenv.config({ path: './config/config.env' });

// load models
const Bootcamp = require('./models/Bootcamp');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Imports into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log(
      'Data have been Imported. Please check your database.'.green.inverse.bold
    );

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log(
      'WARNING!!! Data in Database have been Destroyed.'.red.inverse.bold
    );

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-destroy') {
  deleteData();
}
