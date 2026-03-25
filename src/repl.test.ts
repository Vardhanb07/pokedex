import { cleanInput } from "./repl.js";
import { describe, test, expect } from "vitest";

describe.each([
  {
    input: "hello world",
    expected: ["hello", "world"],
  },
  {
    input: "vardhan battula",
    expected: ["vardhan", "battula"],
  },
  {
    input: "test with        spaces",
    expected: ["test", "with", "spaces"],
  },
  {
    input: "VaRDHaN BaTTuLA",
    expected: ["vardhan", "battula"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const result = cleanInput(input);
    expect(result.length).toBe(expected.length);
    for (const i in expected) {
      expect(result[i]).toBe(expected[i]);
    }
  });
});
