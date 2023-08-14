let quoteContainer= document.getElementById('quote-container');
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false; // hidden is built into the system already, no need to class swap like I use to do
    quoteContainer.hidden = true; // only see loader while loading, the rest is hidden
}

// Hide loading
function complete() {
    quoteContainer.hidden = false; 
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading(); // added here so if the api takes too long we'll see the loading animation until loaded
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {   
    authorText.textContent = `- ${quote.author} -`;
    }
    // chedk quote length / add style
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, hide loader
    quoteText.textContent = quote.text; 
    complete();
}

// Get Quotes From API
// async and await allow us to wait for the API data instead of running (f) without it
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        //apiQuotes = localQuotes; // fallback to local quotes upon api fail
    }
    //newQuote;
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // open a link in a new tab just like html
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

