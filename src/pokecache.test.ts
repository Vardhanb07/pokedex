import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("Test caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  cache.add(key, val);
  const cacheEntry = cache.get<string>(key);
  expect(cacheEntry?.val).toBe(val);
  await new Promise((resolve) => {
    setTimeout(resolve, interval * 2);
  });
  const reaped = cache.get<string>(key);
  expect(reaped?.val).toBe(undefined);
  cache.stopReapLoop();
});
