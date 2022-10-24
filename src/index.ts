#!/usr/bin/env node

import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

import demo from "./commands/demo";
import greenlight from "./commands/greenlight";

const mainDefinitions = [{ name: "name", defaultOption: true }];
const sections = [
  {
    header: "Autopia Commands",
    content: "Various Autopia commands and scripts",
  },
  {
    header: "Command List",
    content: [
      { name: "demo", summary: "Just an example how to generate the helper" },
      { name: "greenlight", summary: "Edit greenlight for users" },
    ],
  },
];

async function go() {
  const mainCommand = commandLineArgs(mainDefinitions, {
    stopAtFirstUnknown: true,
  });

  const argv = mainCommand._unknown || [];

  switch (mainCommand.name) {
    case "demo":
      await demo(argv);
      break;
    case "greenlight":
      await greenlight(argv);
      break;
    default:
      console.error(`Unknown Command: ${mainCommand.name}`);
      console.log(commandLineUsage(sections));
  }
}

function panic(err: any) {
  console.error(err);
  process.exit(1);
}

// https://stackoverflow.com/a/46916601/1478566
go()
  .catch(panic)
  .finally(
    clearInterval.bind(
      null,
      setInterval((a) => a, 1e9)
    )
  );
