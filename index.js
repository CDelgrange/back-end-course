require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const getDbUrl = () => {
  const pgHost = process.env.POSTGRES_HOST;
  const pgDb = process.env.POSTGRES_DB;
  const pgUser = process.env.POSTGRES_USER;
  const pgPassword = process.env.POSTGRES_PASSWORD;
  const pgPort = process.env.POSTGRES_PORT;

  return `postgres://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${pgDb}`;
}

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(getDbUrl());

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

app.put('/users/:id', (req, res) => {
  console.log(`We want to update the user with id: ${req.params.id}`);
  console.log(`And the data required for the update will be:\n${JSON.stringify(req.body, null, 2)}`);

  res.send('Update will be fine');
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
