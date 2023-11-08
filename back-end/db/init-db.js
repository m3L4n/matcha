const pool = require("../db/db");
require("dotenv").config();

const checkDatabaseConnection = async () => {
  let retries = 5;

  while (retries) {
    try {
      await pool.query("SELECT NOW()");

      createTable();
      console.log("Database ready!");
      return;
    } catch (err) {
      console.error("Error when connection to database:", err);
      retries--;
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
  process.exit(1);
};

checkDatabaseConnection();
async function createType(client) {
  await client.query(` 
  DO $$
 BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
         CREATE TYPE gender_enum AS ENUM (
           'male', 'female', 'other' 
         );
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'beverage_enum') THEN
     CREATE TYPE beverage_enum AS ENUM (
       'coffee', 'matcha'
     );
 END IF;
 IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sexual_preference_enum') THEN
 CREATE TYPE sexual_preference_enum AS ENUM (
   'male', 'female', 'both'
 );
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notif_enum') THEN
     CREATE TYPE notif_enum AS ENUM (
       'view', 'messages', 'like'
     );
 END IF;
 END$$;`);
}
async function validateUserTags(client) {
  await client.query(`CREATE OR REPLACE FUNCTION validate_user_tags()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT (SELECT bool_and(tag_name = ANY(new.tags)) FROM tags) THEN
        RAISE EXCEPTION 'At least one tag in the array does not exist in the "tags" table.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`);
}
async function createTriggerTags(client) {
  await client.query(`
 CREATE TRIGGER users_tags_validation
BEFORE INSERT OR UPDATE
ON users
FOR EACH ROW
EXECUTE FUNCTION validate_user_tags();

 `);
}
async function createTableUsers(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL,
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    gender gender_enum,
    beverage beverage_enum,
    sexual_preference sexual_preference_enum,
    lastName TEXT NOT NULL,
    password TEXT,
    tags VARCHAR(255)[],
    description VARCHAR(255),
    age INT CHECK (age > 17),
    rate_fame INT DEFAULT 1500,
    position POINT,
    city TEXT,
    fake_account INT DEFAULT 0,
    "connected" BOOLEAN DEFAULT false,
    latest_connection TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_picture TEXT,
    pictures TEXT[],
    "valided" BOOLEAN DEFAULT false,
    "discord" BOOLEAN DEFAULT false,
    UNIQUE (username, email),
    PRIMARY KEY (id)  
  );
`);
}
async function createTablePictures(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS pictures (
    id UUID PRIMARY KEY,
    id_user UUID REFERENCES users ON DELETE CASCADE,
    picture BYTEA
     );
     `);
}
async function createTableMatch(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS match (
    id UUID DEFAULT uuid_generate_v4(),
    "like"  boolean DEFAULT true,
    "block"  boolean DEFAULT false,
    id_receiver UUID REFERENCES users ON DELETE CASCADE,
    id_requester UUID REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY (id)
     );
    `);
}
async function createTableTags(client) {
  const resultTag = await client.query(`
  CREATE TABLE IF NOT EXISTS tags (
    id UUID DEFAULT uuid_generate_v4(),
     tag_name VARCHAR(255) UNIQUE NOT NULL,
     PRIMARY KEY (id)
     );
     `);
  if (resultTag.rows) {
    insertTags(client);
  }
}

async function insertTags(client) {
  const arrayTags = [
    "gastronomy",
    "cinephile",
    "travel",
    "cook",
    "piercing",
    "tattoo",
    "sql lover",
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
  for (const tag of arrayTags) {
    await client.query(`INSERT INTO tags (tag_name) VALUES ($1) ON CONFLICT (tag_name) DO NOTHING`, [tag]);
  }
}
async function createTableNotifications(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT uuid_generate_v4(),
    id_user_requester UUID REFERENCES users ON DELETE SET NULL,
    id_user_receiver UUID REFERENCES users ON DELETE CASCADE,
    action TEXT,
    type  notif_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "viewed" BOOLEAN,
     PRIMARY KEY (id)
     );
     `);
}
async function createTableConversations(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT uuid_generate_v4(),
    id_user_1 UUID REFERENCES users(id) ON DELETE SET NULL,
    id_user_2 UUID REFERENCES users(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
     );
     `);
}

async function createTableMessages(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT uuid_generate_v4(),
    id_user_requester UUID REFERENCES users(id) ON DELETE CASCADE,
    id_user_receiver UUID REFERENCES users(id) ON DELETE CASCADE,
    content VARCHAR(255),
    id_conversation UUID REFERENCES conversations(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
     );
     `);
}

async function createTableprofilViewer(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS profilViewer (
     id UUID DEFAULT uuid_generate_v4(),
    id_watcher UUID REFERENCES users ON DELETE SET NULL,
    id_watched UUID REFERENCES users ON DELETE SET NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
     );
     `);
}
async function createTableToken(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS token (
    id UUID REFERENCES users ON DELETE CASCADE,
    token TEXT NOT NULL,
    expire_at TIMESTAMP,
    PRIMARY KEY (id)
     );
     `);
}
async function createTableSocket(client) {
  await client.query(`CREATE TABLE IF NOT EXISTS socket(
    id UUID DEFAULT uuid_generate_v4(),
    id_socket VARCHAR(255),
    id_user UUID REFERENCES users ON DELETE CASCADE ,
    UNIQUE (id_user),
    PRIMARY KEY (id)
  )`);
}
async function createTableAuthDiscord(client) {
  await client.query(`CREATE TABLE IF NOT EXISTS authDiscor(
    id UUID DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL,
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_picture TEXT,
    "valided" BOOLEAN DEFAULT true,
    UNIQUE (username, email),
    PRIMARY KEY (id))`);
}
async function createTableBlock(client) {
  await client.query(`CREATE TABLE IF NOT EXISTS block(
    id UUID DEFAULT uuid_generate_v4(),
    id_receiver UUID REFERENCES users ON DELETE CASCADE,
    id_requester UUID REFERENCES users ON DELETE CASCADE ,
    "blocked" BOOLEAN,
    PRIMARY KEY (id)
  )`);
}
async function createTable() {
  const client = await pool.connect();
  try {
    await createType(client);
    await createTableTags(client);
    await createTableUsers(client);
    // await validateUserTags(client);
    // await createTriggerTags(client);
    await createTablePictures(client);
    await createTableConversations(client);
    await createTableMatch(client);
    await createTableMessages(client);
    await createTableprofilViewer(client);
    await createTableNotifications(client);
    await createTableToken(client);
    await createTableSocket(client);
    await createTableBlock(client);
    await createTableAuthDiscord(client);
    console.log('Table "users" created with success.');
    client.release();
  } catch (error) {
    console.error("Error when creating table:", error);
  }
}
