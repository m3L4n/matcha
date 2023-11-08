
    age,
    city,
    tag,
  ];
  return generateUser(params);
}

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
  ["gastronomy", "cinephile", "travel", "piercing"],
];

generateSetOfUsers()
  .then(() => {
    generateUser(adminParams)
      .then(() => {
        console.log(`Fake admin generated! 🍺`);
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
