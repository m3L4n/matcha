const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require("uuid");
const db = require('./db/db');
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateUser = async (params) => {
  const query = "INSERT INTO \
  users(id, username, email, firstName, gender, beverage, sexual_preference, lastName, password, description, rate_fame, position, profile_picture, valided, age) \
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
  return db.query(query, params);
}

for (let i = 0; i < 100; i++) {
  const random = Math.floor(Math.random() * 10);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName}.${lastName}@mail.com`;
  const username = faker.internet.userName();
  const gender = random % 2 == 0 ? "male" : "female";
  const beverage = random % 2 == 0 ? "matcha" : "coffee";
  const sexual_preference = random % 2 == 0 ? "male" : "female";
  const password = faker.string.alphanumeric();
  const description = faker.string.alphanumeric(200);
  const rate_fame = 1500 - Math.floor(Math.random() * 200)
  const age = Math.floor(Math.random() * (50 - 18) + 18);
  const profile_picture = faker.internet.avatar();
  const valided = true;
  let position = faker.location.nearbyGPSCoordinate();
  position = `(${position[0]}, ${position[1]})`;
  const params = [uuidv4(), username, email, firstName, gender, beverage, sexual_preference, lastName, password, description, rate_fame, position, profile_picture, valided, age];
  generateUser(params)
    .then(() => console.log(`fake user ${i} inserted ✅`))
    .catch(error => console.error(error))
}

// generate a test account
let position = faker.location.nearbyGPSCoordinate();
position = `(${position[0]}, ${position[1]})`;

const params = [
  uuidv4(),
  "matchadmin",
  "matchamail@gmail.com",
  "matcha",
  "male",
  "matcha",
  "male",
  "admin",
  bcrypt.hashSync("naruto", 10),
  "Hello world!",
  1500,
  position,
  faker.image.avatar(),
  true,
  24
];

generateUser(params)
  .then(() => console.log(`Fake admin generated! 🍺`))
  .catch(error => console.error(error))

