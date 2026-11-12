const records = document.querySelector("#records");
const threshold = document.querySelector("#threshold");
const result = document.querySelector("#result");
function refresh() {
  try {
    const { count, findings } = review(records.value, Number(threshold.value));
    result.textContent = ["Records reviewed: " + count, "Flagged sign-ins: " + findings.length, ...findings].join("\n");
  } catch (error) {
    result.textContent = error.message;
  }
}
function restore() {
  records.value = sample;
  threshold.value = "3";
  refresh();
}
records.addEventListener("input", refresh);
threshold.addEventListener("change", refresh);
document.querySelector("#restore").addEventListener("click", restore);
restore();
