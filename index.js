const express = require('express');
const app = express();
const port = 3000;

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
}, { sequelize, tableName: 'user' });

app.get('/', async function(req, res) {
  await sequelize.sync();

  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });
  console.log(jane.toJSON());

  const x = await User.findAll();
  console.log(x.map(u => u.username));

  res.send('Hello World!');
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
