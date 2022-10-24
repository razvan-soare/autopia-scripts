import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import path from "path";

import { getClient } from "../../api/client";
// import { format } from "date-fns";

const openSshPath = path.join(__dirname, "../../api/ssh.py");

const definitions = [
  { name: "env" },
  { name: "userId" },
  { name: "number" },
  { name: "email" },
  { name: "startDate" },
  { name: "endDate" },
  { name: "paidUntil" },
];
const sections = [
  {
    header: "Options",
    optionList: [
      {
        name: "env",
        description: "The environment",
        require: true,
      },
      {
        name: "userId",
        description: "User's id",
        require: false,
      },
      {
        name: "number",
        description: "User's number",
        require: false,
      },
      {
        name: "email",
        description: "User's email",
        require: false,
      },
      {
        name: "startDate",
        description: "Date to start subscription, FORMAT: YYYY-MM-DD",
        require: false,
      },
      {
        name: "endDate",
        description: "Date to end subscription, FORMAT: YYYY-MM-DD",
        require: true,
      },
      {
        name: "painUntil",
        description: "Date until subscription is paid, FORMAT: YYYY-MM-DD",
        require: true,
      },
    ],
  },
];

const exitWithError = (message: string) => {
  console.error(message);
  console.error(commandLineUsage(sections));
  process.exit(1);
};

export default async function (argv: string[]) {
  const runOptions = commandLineArgs(definitions, {
    argv,
    stopAtFirstUnknown: true,
  });

  if (!runOptions.env) {
    exitWithError("env must be specified");
  }

  if (!runOptions.user && !runOptions.number && !runOptions.email) {
    exitWithError("Need to provide a user id, number, or email");
  }

  if (!runOptions.endDate && !runOptions.paidUntil) {
    exitWithError("Need to provide an end date and paid until date");
  }

  console.log("~~~ Extending users subscription Start ~~~");
  console.log("");

  const { userId, number, email, startDate } = runOptions;

  // const paidUntil = format(new Date(runOptions.paidUntil), "yyyy-MM-dd");
  // const endDate = format(new Date(runOptions.endDate), "yyyy-MM-dd");

  // prompt.start();
  // prompt.message = `Will change the users subscription to endDate: ${endDate} and paidUntil: ${paidUntil}. \nContinue? (y/n)\n\n`;

  // const { answer } = await prompt.get(["answer"]);
  // console.log("🚀🚀🚀 ~ answer", answer);

  // if (answer === "n") {
  //   console.log("");
  //   console.log("~~~ Extending users subscription - Cancelled ~~~");
  //   process.exit(0);
  // }

  const client = await getClient(runOptions.env);
  if (!client) {
    console.error("No client found");
    return;
  }

  const getUserQuery = `
    SELECT * FROM "user" WHERE "id" = '${userId}' OR "number" = '${number}' OR "email" = '${email}';
  `;

  const dbUser = await client.query(getUserQuery);
  console.log("🚀🚀🚀 ~ dbUser", dbUser);

  const updateGreenlightQuery = `
    UPDATE pickerabo SET "endDate" =  + INTERVAL '1 month' WHERE "userId" = '${userId}';
  `;

  client.end();
  console.log("");
  console.log("~~~ Extending users subscription END ~~~");
}
