const sample = "09:00,morgan,fail\n09:01,riley,fail\n09:02,morgan,fail\n09:03,morgan,fail\n09:04,morgan,success\n09:10,riley,success";

function review(input, threshold) {
  const events = [];
  for (const [i, line] of input.split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    const row = /^([01]\d|2[0-3]):([0-5]\d),([^,]+),(fail|success)$/.exec(line.trim());
    if (!row || !row[3].trim()) throw new Error("Invalid record on line " + (i + 1));
    events.push({ minute: Number(row[1]) * 60 + Number(row[2]), time: row[1] + ":" + row[2], account: row[3].trim(), outcome: row[4] });
  }
  const failures = new Map();
  const findings = [];
  for (const event of events.sort((a, b) => a.minute - b.minute)) {
    const recent = (failures.get(event.account) || []).filter(t => event.minute - t <= 5);
    if (event.outcome === "fail") {
      failures.set(event.account, [...recent, event.minute]);
    } else {
      if (recent.length >= threshold) findings.push(event.account + " · " + event.time + " · " + recent.length + " failures before success");
      failures.delete(event.account);
    }
  }
  return { count: events.length, findings };
}

if (typeof module !== "undefined") module.exports = { review, sample };
