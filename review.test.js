const test = require("node:test");
const assert = require("node:assert/strict");
const { review, sample } = require("./logic.js");

test("groups recent failures by account", () => {
  assert.deepEqual(review(sample, 3).findings, ["morgan · 09:04 · 3 failures before success"]);
  assert.equal(review(sample, 4).findings.length, 0);
});
test("closes the sequence at success and excludes old failures", () => {
  assert.equal(review("10:00,a,fail\n10:05,a,fail\n10:05,a,success\n10:06,a,success\n11:01,a,fail\n11:02,a,fail\n11:10,a,success", 2).findings.length, 1);
});
test("identifies malformed rows", () => assert.throws(() => review("26:00,a,fail", 2), /line 1/));
