const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const db = require("./db/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const gps = [
  { x: 48.8566, y: 2.3522 },
  { x: 48.8594, y: 2.2945 },
  { x: 45.7485, y: 4.8467 },
  { x: 43.6047, y: 1.4442 },
  { x: 43.7102, y: 7.262 },
  { x: 48.1173, y: -1.6778 },
  { x: 47.2184, y: -1.5536 },
  { x: 49.4427, y: 1.0935 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.6292, y: 3.0573 },
  { x: 48.5896, y: 7.7452 },
  { x: 43.2965, y: 5.3698 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.635, y: 3.0636 },
  { x: 48.8588, y: 2.2945 },
  { x: 47.2235, y: -1.5485 },
  { x: 48.8566, y: 2.3522 },
  { x: 45.7485, y: 4.8467 },
  { x: 43.7102, y: 7.262 },
  { x: 48.856614, y: 2.3522219 },
  { x: 47.2184, y: -1.5536 },
  { x: 49.4427, y: 1.0935 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.6292, y: 3.0573 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.5896, y: 7.7452 },
  { x: 43.2965, y: 5.3698 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.635, y: 3.0636 },
  { x: 48.8588, y: 2.2945 },
  { x: 47.2235, y: -1.5485 },
  { x: 48.8566, y: 2.3522 },
  { x: 45.7485, y: 4.8467 },
  { x: 43.7102, y: 7.262 },
  { x: 48.1173, y: -1.6778 },
  { x: 47.2184, y: -1.5536 },
  { x: 49.4427, y: 1.0935 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.6292, y: 3.0573 },
  { x: 48.5896, y: 7.7452 },
  { x: 43.2965, y: 5.3698 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.635, y: 3.0636 },
  { x: 48.8588, y: 2.2945 },
  { x: 47.2235, y: -1.5485 },
  { x: 48.8566, y: 2.3522 },
  { x: 45.7485, y: 4.8467 },
  { x: 43.7102, y: 7.262 },
  { x: 48.1173, y: -1.6778 },
  { x: 47.2184, y: -1.5536 },
  { x: 49.4427, y: 1.0935 },
  { x: 48.5734, y: 7.7521 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 50.6292, y: 3.0573 },
  { x: 48.5896, y: 7.7452 },
  { x: 43.2965, y: 5.3698 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.635, y: 3.0636 },
  { x: 48.8588, y: 2.2945 },
  { x: 47.2235, y: -1.5485 },
  { x: 48.8566, y: 2.3522 },
  { x: 45.7485, y: 4.8467 },
  { x: 43.7102, y: 7.262 },
  { x: 48.1173, y: -1.6778 },
  { x: 47.2184, y: -1.5536 },
  { x: 49.4427, y: 1.0935 },
  { x: 48.5734, y: 7.7521 },
  { x: 50.6292, y: 3.0573 },
  { x: 48.5896, y: 7.7452 },
  { x: 43.2965, y: 5.3698 },
  { x: 48.5734, y: 7.7521 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 48.856614, y: 2.3522219 },
  { x: 50.635, y: 3.0636 },
  { x: 48.8588, y: 2.2945 },
  { x: 47.2235, y: -1.5485 },
];

const generateUser = async (params) => {
  const query =
    "INSERT INTO \
  users(id, username, email, firstName, gender, beverage, sexual_preference, lastName, password, description, rate_fame, position, profile_picture, valided, age, city, tags) \
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) ON CONFLICT (username, email) DO NOTHING";
  return db.query(query, params);
};

let tagsList = [
  "cook",
  "piercing",
  "tattoo",
  "vegan",
  "wine lover",
  "cat lover",
  "dog lover",
  "chicken lover",
  "romantic feelings",
  "flavors of love",
  "refined meetings",
  "drinks and conversations",
  "in search of authentic love",
  "open to new experiences",
];

function generateSetOfUsers() {
  for (let i = 0; i < 500; i++) {
    const random = Math.floor(Math.random() * 10);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}@mail.com`;
    const username = faker.internet.userName().substring(0, 29);
    const gender = random % 2 == 0 ? "male" : "female";
    const beverage = random % 2 == 0 ? "matcha" : "coffee";
    const sexual_preference = random % 2 == 0 ? "male" : "female";
    const password = bcrypt.hashSync(faker.string.alphanumeric(), 10);
    const description = faker.string.alphanumeric(200);
    const rate_fame = Math.floor(Math.random() * (1800 - 1200 + 1) + 1200);
    const age = Math.floor(Math.random() * (50 - 18) + 18);
    const profile_picture = faker.internet.avatar();
    const valided = true;
    let gps_position = gps[Math.floor(Math.random() * gps.length)];
    let position = `(${gps_position.x}, ${gps_position.y})`;
    const city = faker.location.city();
    const tags = [
      "gastronomy",
      "cinephile",
      "travel",
      tagsList[Math.floor(Math.random() * tagsList.length)],
      "sql lover",
    ];
    const params = [
      uuidv4(),
      username,
      email,
      firstName,
      gender,
      beverage,
      sexual_preference,
      lastName,
      password,
      description,
      rate_fame,
      position,
      profile_picture,
      valided,
      age,
      city,
      tags,
    ];
    generateUser(params)
      .then(() => console.log(`fake user ${i + 1} inserted ✅`))
      .catch((error) => console.error(error));
  }
}
// generate a test account
let gps_position = gps[Math.floor(Math.random() * gps.length)];
let position = `(${gps_position.x}, ${gps_position.y})`;
let adminUuid = uuidv4();

generateSetOfUsers();

const adminParams = [
  adminUuid,
  "matchadmin",
  "matchamail@gmail.com",
  "matcha",
  "male",
  "matcha",
  "female",
  "admin",
  bcrypt.hashSync("naruto", 10),
  "Hello world!",
  1500,
  position,
  faker.internet.avatar(),
  true,
  18,
  "Paris",
  [
    "gastronomy",
    "cinephile",
    "travel",
    tagsList[Math.floor(Math.random() * tagsList.length)],
    "sql lover",
  ],
];

generateUser(adminParams).then(() => console.log("fake admin inserted"));

const manouilleParams = [
  uuidv4(),
  "manouille",
  "manouille@gmail.com",
  "matcha",
  "female",
  "matcha",
  "male",
  "admin",
  bcrypt.hashSync("sakura", 10),
  "Hello world!",
  1500,
  position,
  faker.internet.avatar(),
  true,
  18,
  "Paris",
  [
    "gastronomy",
    "cinephile",
    "travel",
    tagsList[Math.floor(Math.random() * tagsList.length)],
    "sql lover",
  ],
];

generateUser(manouilleParams).then(() => console.log("fake admin inserted"));
