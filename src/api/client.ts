const { Client } = require("pg");
require("dotenv").config();

type ClientType = {
  query: (text: string, params?: string[]) => Promise<any>;
  end: () => void;
};

const showSshMessage = () => {
  console.log(
    `
To connect to the database, run the following command in a different terminal:

ssh -L 5432:localhost:5432 ${process.env.SSH_USER}@${process.env.SSH_HOST}

`
  );
};

export const getClient = async (env: string) => {
  // TODO connect to proper DB based on ENV
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: true,
  });

  try {
    await client.connect();
  } catch (err) {
    if (env === "prod") {
      showSshMessage();
    }
    console.log("Oops", err);
    return null;
  }
  return client as ClientType;
};
