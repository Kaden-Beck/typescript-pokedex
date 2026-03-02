// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";

async function main() {
  try {
    await startREPL();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    } else {
      console.log(err);
    }
  }
}

await main();