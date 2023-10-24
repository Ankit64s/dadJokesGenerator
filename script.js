const singleJokeButton = document.querySelector(".singleJoke");
const multipleJokesButton = document.querySelector(".multipleJokes");
const popup = document.querySelector(".popup");


const apiKey = "RGyfyloHPchARKLbeEwhtQ==mnb9v9eErPOBWYsY";


const audioFiles = [
  "sound1.mp3",
  "sound2.mp3",
  "sound3.mp3",
  "sound4.mp3",
  "sound5.mp3"
];

const audioElements = audioFiles.map((file) => new Audio(file));

// Function to start playing audio
const startAudio = () => {
  const randomIndex = Math.floor(Math.random() * audioElements.length);
  audioElements[randomIndex].play();
};

const displayLoadingMessage = () => {
    popup.innerHTML = `
      <div class="loading">Loading a dad joke... 😄</div>
    `;
    popup.classList.add("show");
  };
  

// Function to fetch a single joke from the API
const fetchSingleJoke = async () => {
  try {
    displayLoadingMessage();
    const response = await fetch(
      "https://api.api-ninjas.com/v1/jokes?limit=1",
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      startAudio();
      displayJoke(data[0].joke);
    } else {
      displayError("Failed to fetch joke.");
    }
  } catch (error) {
    displayError("An error occurred while fetching the joke.");
  }
};

// Function to fetch multiple jokes from the API
const fetchMultipleJokes = async () => {
  const randomLimit = Math.floor(Math.random() * 10) + 2;
  try {
    displayLoadingMessage();
    const response = await fetch(
      `https://api.api-ninjas.com/v1/jokes?limit=${randomLimit}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const jokes = data.map((jokeData) => jokeData.joke);
      const formattedJokes = formatJokes(jokes);
      startAudio(); 
      displayJoke(formattedJokes);
    } else {
      displayError("Failed to fetch jokes.");
    }
  } catch (error) {
    displayError("An error occurred while fetching jokes.");
  }
};

const formatJokes = (jokes) => {
  return jokes
    .map((joke) => (joke.endsWith('.') ? joke : joke + '<br><br>************<br>'))
    .join('<br>');
};

const displayJoke = (joke) => {
  popup.innerHTML = `
    <div class="joke">${joke}</div>
    <br/>
    <br/>
    <div class="close-button" onclick="closePopup()">Close</div>
  `;
  popup.classList.add("show");
};

const closePopup = () => {
  popup.classList.remove("show");
  pauseAllAudio(); 
};

const displayError = (message) => {
  popup.innerHTML = `<div class="error">${message}</div>
  <br/>
    <br/>
    <div class="close-button" onclick="closePopup()">Close</div>`;
  popup.classList.add("show");
};

const pauseAllAudio = () => {
  audioElements.forEach((audio) => audio.pause());
};

singleJokeButton.addEventListener("click", fetchSingleJoke);
multipleJokesButton.addEventListener("click", fetchMultipleJokes);

popup.addEventListener("click", () => {
  popup.classList.remove("show");
});
