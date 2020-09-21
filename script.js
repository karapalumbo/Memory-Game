const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("hide");
    newDiv.setAttribute("data-color", color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let openCards = [];
let counter = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  event.target.classList.toggle("hide"); // hides color. Turns card to white
  event.target.classList.add("clicked"); // adds class of 'clicked' to cards
  openCards.push(event.target); // push cards to array
  if (openCards.length === 2) {
    // if array = 2 cards
    if (
      // if both cards in array are the same color
      openCards[0].getAttribute("data-color") ===
      openCards[1].getAttribute("data-color")
    ) {
      counter++; // add click to counter if both cards are the same color
      setTimeout(function () {
        if (counter === 5) {
          // counter = 5 clicks (all same cards are clicked)
          alert("You won the game!"); // module alert saying you won
        }
      }, 500); // do the above after .5 seconds so all code executes

      openCards[0].style.pointerEvents = "none"; //disable click on each open card
      openCards[1].style.pointerEvents = "none"; // since they match
    } else {
      //disable click
      let firstUnmatched = openCards[0]; // 1st card in array if they dont match
      let secondUnmatched = openCards[1]; // 2nd card in array if they dont match
      firstUnmatched.classList.remove("clicked"); // remove class on 1st card
      secondUnmatched.classList.remove("clicked"); // remove class on 2nd card
      gameContainer.style.pointerEvents = "none"; // disable click
      setTimeout(function () {
        // unmatched = white
        firstUnmatched.classList.toggle("hide"); // hide toggle between color/white
        secondUnmatched.classList.toggle("hide"); // hide toggle between color/white
        gameContainer.style.pointerEvents = "auto"; //enable click...
      }, 1000); // ...after 1 second so player can click again
    }
    openCards = []; // reset array to take in new cards
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
