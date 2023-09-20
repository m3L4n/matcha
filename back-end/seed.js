// init-db.js
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require("uuid");
const db = require('./db/db');
require("dotenv").config();

const generateUser = () => {
  const random = Math.floor(Math.random() * 10);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName}.${lastName}@mail.com`;
  const username = firstName + lastName;
  const gender = random % 2 == 0 ? "male" : "female";
  const beverage = random % 2 == 0 ? "matcha" : "coffee";
  const sexual_preference = random % 2 == 0 ? "male" : "female";
  const password = faker.string.alphanumeric();
  const description = faker.string.alphanumeric(200);
  const rate_fame = 1500 - Math.floor(Math.random() * 200)
  const age = Math.floor(Math.random() * 60);
  const profile_picture = faker.image.avatar();
  const valided = true;
  const position = faker.location.nearbyGPSCoordinate();
  const query = "INSERT INTO \
  users(id, username, email, firstName, gender, beverage, sexual_preference, lastName, password, description, rate_fame, position, profile_picture, valided, age) \
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
  const params = [uuidv4(), username, email, firstName, gender, beverage, sexual_preference, lastName, password, description, rate_fame, position, profile_picture, valided, age];
  return db.query(query, params);
}

for (let i = 0; i < 42; i++) {
  generateUser()
    .then(() => console.log(`fake user ${i} inserted ✅`))
    .catch(error => console.error(error))
}
