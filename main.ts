import { mkdirSync, writeFileSync } from "node:fs";

// One-line out-of-office reply, written for the make.fun bounty
// "Funniest One-Line Out-of-Office Reply".
//
// The joke is a turn on the usual away message: instead of promising to
// catch up on email on Monday, the writer admits they have already been
// replaced by the auto-reply itself — and that the replacement is better
// at the job. It lands on the first read, needs no setup, and still reads
// like a real away message a person would switch on before going away.

const firstSentence = "Out of office until Monday.";
const secondSentence =
  "My replacement is this auto-reply, and honestly it's doing a better job than I did.";

const line = `${firstSentence} ${secondSentence}`;

// The gate requires UTF-8 text of 1 to 160 characters, a single line.
if (line.length < 1 || line.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
