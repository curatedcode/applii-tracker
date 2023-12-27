import motivationalQuotes from "./motivationalQuotes";

export default function getRandomMotivationalQuote() {
  const min = 0;
  const max = motivationalQuotes.length;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return motivationalQuotes[randomNumber];
}
