let rating = 0;
let selectedTopics = new Set();
let style = "casual";
let lastReview = "";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const ratingText = {
  1:"Not a good experience",
  2:"Could be better",
  3:"It was okay",
  4:"Really good experience",
  5:"Amazing experience"
};

$$(".star").forEach(btn => btn.addEventListener("click", () => {
  rating = Number(btn.dataset.rating);
  $$(".star").forEach(s => s.classList.toggle("active", Number(s.dataset.rating) <= rating));
  $("#ratingText").textContent = ratingText[rating];
  $("#generateBtn").disabled = false;
}));

$$(".chip").forEach(btn => btn.addEventListener("click", () => {
  const topic = btn.dataset.topic;
  if (selectedTopics.has(topic)) {
    selectedTopics.delete(topic);
    btn.classList.remove("active");
  } else if (selectedTopics.size < 4) {
    selectedTopics.add(topic);
    btn.classList.add("active");
  }
}));

$$(".style-option").forEach(btn => btn.addEventListener("click", () => {
  style = btn.dataset.style;
  $$(".style-option").forEach(x => x.classList.toggle("active", x === btn));
}));

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getTopicLine(topic, lib) {
  return lib[topic] ? pick(lib[topic]) : "";
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").replace(/\s+([,.!?])/g, "$1").trim();
}

function generateReview() {
  const lib = REVIEW_LIBRARY[rating];
  const topics = selectedTopics.size ? shuffle([...selectedTopics]) : shuffle(["music","ambience","service"]).slice(0, 2);
  let sentences = [];

  // Opening
  sentences.push(pick(lib.openings));

  // At least 2 selected topic highlights, with a maximum of 4.
  topics.slice(0, style === "short" ? 2 : 4).forEach(t => {
    const line = getTopicLine(t, lib);
    if (line) sentences.push(line);
  });

  // Rating-specific ending
  if (style !== "short" || Math.random() > .35) sentences.push(pick(lib.endings));

  // Avoid immediate exact duplicate by retrying once.
  let result = cleanText(sentences.join(" "));
  if (result === lastReview) {
    sentences = shuffle(sentences);
    result = cleanText(sentences.join(" "));
  }
  lastReview = result;

  if (style === "short") {
    const shortSentences = sentences.slice(0, Math.min(3, sentences.length));
    result = cleanText(shortSentences.join(" "));
  } else if (style === "polished") {
    result = result.replace(/^Had such a /, "We had such a ").replace(/^Had an /, "We had an ");
  }

  return result;
}

function showResult() {
  const review = generateReview();
  $("#setup").classList.add("hidden");
  $("#result").classList.remove("hidden");
  $("#resultStars").textContent = "★★★★★".slice(0, rating);
  $("#reviewText").textContent = review;
  $("#styleLabel").textContent = style.toUpperCase();
  $("#copied").classList.add("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
}

$("#generateBtn").addEventListener("click", showResult);
$("#anotherBtn").addEventListener("click", () => {
  $("#reviewText").textContent = generateReview();
  $("#copied").classList.add("hidden");
});

$("#copyBtn").addEventListener("click", async () => {
  const text = $("#reviewText").textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  $("#copied").classList.remove("hidden");
  setTimeout(() => $("#copied").classList.add("hidden"), 1800);
});

$("#backBtn").addEventListener("click", () => {
  $("#result").classList.add("hidden");
  $("#setup").classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
});
