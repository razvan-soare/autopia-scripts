#!/usr/bin/env node

import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

import demo from "./demo";
import extendGreenlight from "./extendGreenlight";

const mainDefinitions = [{ name: "name", defaultOption: true }];
const sections = [
  {
    header: "Autopia Commands",
    content: "Various Autopia commands and scripts",
  },
  {
    header: "Command List",
    content: [
      { name: "demo", summary: "Just an example how to subscripts the helper" },
      {
        name: "extend",
        summary: "Extends the duration of a current users subscription",
      },
    ],
  },
];

export default async function (argv: string[]) {
  const subCommand = commandLineArgs(mainDefinitions, {
    argv,
    stopAtFirstUnknown: true,
  });

  const subCommandArgv = subCommand._unknown || [];

  switch (subCommand.name) {
    case "demo":
      await demo(subCommandArgv);
      break;
    case "extend":
      await extendGreenlight(subCommandArgv);
      break;
    default:
      console.error(`Unknown Command: ${subCommand.name}`);
      console.log(commandLineUsage(sections));
  }
}
