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
 END IF;
 END$$;`);
}
async function createTableUsers(client) {
  await client.query(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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
    description VARCHAR(255),
    age INT CHECK (age > 17),
    rate_fame INT DEFAULT 1500,
    position POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_picture BYTEA,
    "valided" BOOLEAN DEFAULT false,
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
async function createTableNotifications(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY,
    id_user_requester UUID REFERENCES users ON DELETE SET NULL,
    id_user_receiver UUID REFERENCES users ON DELETE CASCADE,
    action TEXT
     );
     `);
}
async function createTableConversations(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT uuid_generate_v4(),
    id_user_1 UUID REFERENCES users(id) ON DELETE SET NULL,
    id_user_2 UUID REFERENCES users(id) ON DELETE SET NULL
     );
     `);
}

async function createTableMessages(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY,
    id_user_requester UUID REFERENCES users(id) ON DELETE CASCADE,
    id_user_receiver UUID REFERENCES users(id) ON DELETE CASCADE,
    content VARCHAR(255),
    id_conversation UUID REFERENCES conversations(id) ON DELETE CASCADE
     );
     `);
}

async function createTableprofilViewer(client) {
  await client.query(`
  CREATE TABLE IF NOT EXISTS profilViewer (
    id UUID PRIMARY KEY,
    id_watcher UUID REFERENCES users ON DELETE SET NULL,
    id_watched UUID REFERENCES users ON DELETE SET NULL
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
async function createTable() {
  const client = await pool.connect();
  try {
    await createType(client);
    await createTableUsers(client);
    await createTablePictures(client);
    await createTableConversations(client);
    await createTableMatch(client);
    await createTableMessages(client);
    await createTableprofilViewer(client);
    await createTableNotifications(client);
    await createTableToken(client);
    console.log('Table "users" created with success.');
  } catch (error) {
    console.error("Error when creating table:", error);
  } finally {
    client.release();
  }
}
