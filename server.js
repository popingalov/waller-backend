const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database tru and we listen port 3001');
    }),
  )
  .catch(error => {
    console.log('Error', error.message);
    process.exit(1);
  });
