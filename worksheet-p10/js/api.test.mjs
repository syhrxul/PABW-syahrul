import assert from "node:assert/strict";
import test from "node:test";
import { ambilTugasDari } from "./api.js";

test("status bukan 2xx ditolak sebelum badan dibaca", async () => {
  await assert.rejects(
    ambilTugasDari("https://jsonplaceholder.typicode.com/todos/999999"),
    /status 404/,
  );
});

test("badan non-JSON ditolak dan ditangkap", async () => {
  await assert.rejects(
    ambilTugasDari("https://example.com/"),
    SyntaxError,
  );
});
