import { mkdirSync, writeFileSync } from "node:fs";

// One-line out-of-office reply, written for the make.fun bounty
// "Funniest One-Line Out-of-Office Reply".
//
// The joke is a turn on the usual away message: instead of promising to
// catch up on email on Monday, the writer admits they have already been
// replaced by the auto-reply itself — and that the replacement is better
// at the job. It lands on the first read, needs no setup, and still reads
// like a real away message a person would switch on before going away.

// The reply is built from its two sentences so each half can be read,
// checked and changed on its own; the join keeps exactly one space
// between them and no trailing newline in the entry itself.
const sentences: string[] = [
  "Out of office until Monday.",
  "My replacement is this auto-reply, and honestly it's doing a better job than I did.",
];

const line: string = sentences.join(" ");

// The gate requires UTF-8 text of 1 to 160 characters, a single line.
function assertGateOk(text: string): void {
  if (text.length < 1 || text.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

assertGateOk(line);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
