const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const loader = document.getElementById("loader");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");

const quoteList = [];

// Show Loader
const showLoader = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loader
const hideLoader = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Show new quote
const newQuote = () => {
  showLoader();
  const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
  authorText.textContent = quote.author;

  // Check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoader();
};

// Get quote from API
const getQuote = async () => {
  showLoader();
  const apiUrl =
    "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(apiUrl);
    quoteList = await response.json();
    newQuote();
  } catch (error) {
    getQuote();
    console.log("Error occured: ", error);
  }
};

// Tweet Quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet/?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
