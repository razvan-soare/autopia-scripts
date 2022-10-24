import commandLineArgs from "command-line-args";

const mainDefinitions = [{ name: "name", defaultOption: true }];

export default async function (argv: string[]) {
  const runOptions = commandLineArgs(mainDefinitions, {
    argv,
    stopAtFirstUnknown: true,
  });

  console.log("🚀 ~ file: demo.ts ~ runOptions:", runOptions);
}
