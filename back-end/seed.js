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
];

const generateUser = async (params) => {
  const query =
    "INSERT INTO \
  users(id, username, email, firstName, gender, beverage, sexual_preference, lastName, password, description, rate_fame, position, profile_picture, valided, age, city) \
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)";
  return db.query(query, params);
};

let firstUserUuid = uuidv4();
function generateSetOfUsers() {
  for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * 10);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}@mail.com`;
    const username = faker.internet.userName();
    const gender = random % 2 == 0 ? "male" : "female";
    const beverage = random % 2 == 0 ? "matcha" : "coffee";
    const sexual_preference = random % 2 == 0 ? "male" : "female";
    const password = bcrypt.hashSync(faker.string.alphanumeric(), 10);
    const description = faker.string.alphanumeric(200);
    const rate_fame = 1500;
    const age = Math.floor(Math.random() * (50 - 18) + 18);
    const profile_picture = faker.internet.avatar();
    const valided = true;
    let gps_position = gps[Math.floor(Math.random() * gps.length)];
    let position = `(${gps_position.x}, ${gps_position.y})`;
    const city = faker.location.city();
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
    ];
    generateUser(params)
      .then(() => console.log(`fake user ${i} inserted ✅`))
      .catch((error) => console.error(error));
  }
  const random = Math.floor(Math.random() * 10);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName}.${lastName}@mail.com`;
  const username = faker.internet.userName();
  const gender = random % 2 == 0 ? "male" : "female";
  const beverage = random % 2 == 0 ? "matcha" : "coffee";
  const sexual_preference = random % 2 == 0 ? "male" : "female";
  const password = bcrypt.hashSync(faker.string.alphanumeric(), 10);
  const description = faker.string.alphanumeric(200);
  const city = faker.location.city();
  const rate_fame = Math.floor(Math.random() * (1800 - 1000 + 1) + 1000);
  const age = Math.floor(Math.random() * (50 - 18) + 18);
  const profile_picture = faker.internet.avatar();
  const valided = true;
  let gps_position = gps[Math.floor(Math.random() * gps.length)];
  let position = `(${gps_position.x}, ${gps_position.y})`;
  const params = [
    firstUserUuid,
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
  ];
  return generateUser(params);
}
// generate a test account
let gps_position = gps[Math.floor(Math.random() * gps.length)];
let position = `(${gps_position.x}, ${gps_position.y})`;
let adminUuid = uuidv4();
let manonUuid = uuidv4();

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
  24,
  "Paris",
];

const userParams = [
  manonUuid,
  "manouille",
  "manon@gmail.com",
  "Manon",
  "female",
  "matcha",
  "male",
  "fouquet",
  bcrypt.hashSync("sakura", 10),
  "Hello world!",
  1500,
  position,
  faker.internet.avatar(),
  true,
  22,
  "Paris",
];

const generateConversation = async (params) => {
  const query =
    "INSERT INTO \
    conversations(id_user_1, id_user_2) VALUES($1, $2)";
  return db.query(query, params);
};

generateSetOfUsers().then(() => {
  generateUser(adminParams)
    .then(() => {
      generateUser(userParams)
        .then(() => {
          console.log("Fake user Manon added 🍺");
          generateConversation([adminUuid, manonUuid])
            .then(() => {
              console.log("admin Manon conversation created");
              generateConversation([adminUuid, firstUserUuid])
                .then(() => console.log("admin firstUser conversation created"))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.error(`Error: ${error}`));
      console.log(`Fake admin generated! 🍺`);
    })
    .catch((error) => console.error(error));
});
