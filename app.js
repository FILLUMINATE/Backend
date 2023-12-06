require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const router = require('./src/router/index');
const db = require('./src/database/models');
const port = 3001;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  fs.readdirSync('./public/images');
} catch (err) {
  console.error(' 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('./public/images');
}

app.use('/api', router);
app.use('/image', express.static('./public/images'));

db.sequelize
  .sync()
  .then(() => {
    console.log('success');
  })
  .catch(console.error);

app.listen(port);
