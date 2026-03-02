import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://pokeapi.co/api/v2/location-area",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://pokeapi.co/api/v2/location-area?offset=20&limit=20",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

test.each([
  {
    key: "https://pokeapi.co/api/v2/location-area",
    val: "not-expired-yet",
    interval: 300,
  },
  {
    key: "https://pokeapi.co/api/v2/location-area?offset=40&limit=20",
    val: "still-here",
    interval: 400,
  },
])("Test Value Exists Before $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  await new Promise((resolve) => setTimeout(resolve, Math.floor(interval / 2)));

  const cached = cache.get(key);
  expect(cached).toBe(val);

  cache.stopReapLoop();
});

test("Test stopReapLoop prevents future reaping", async () => {
  const interval = 200;
  const cache = new Cache(interval);
  const key = "https://pokeapi.co/api/v2/location-area?offset=60&limit=20";
  const val = "persist-after-stop";

  cache.add(key, val);
  cache.stopReapLoop();

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const cached = cache.get(key);

  expect(cached).toBe(val);
});