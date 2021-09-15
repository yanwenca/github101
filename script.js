const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let notClicking = false;  // only be able to change at most two cards at a time.
let flippedCard = 0; 

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
  "purple"
];

// function to shuffle an array - returns the same array with values shuffled. pick a random value and swap it with the last
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {   // While there are elements in the array
    let index = Math.floor(Math.random() * counter);    // Pick a random index (index = 0)
    counter--;    // Decrease counter by 1 (counter = 9)
    let temp = array[counter];   // And swap the last element with it (temp = array[9])
    array[counter] = array[index]; //array[9] = array[0];
    array[index] = temp; //array[0] = temp (array[9])
  }
  return array;
}

// returns shuffled color array
let shuffledColors = shuffle(COLORS);  

// create a function to implement colors into the html by creating divs & assigning classes
function createDivsForColors(colorArray) {   
  for (let color of colorArray) {    // loops over the array of colors
    const newDiv = document.createElement("div");   // creates a new div
    newDiv.classList.add(color);    // gives it a class with the value of the color
    newDiv.addEventListener("click", handleCardClick);    // add an event listener for a click for each card
    gameContainer.append(newDiv);       // append the div to the DOM with an id of game
  }
}

// will add new div for each card clicked, with assigned class of color into the DOM
  createDivsForColors(shuffledColors);

// Clicking a card change background to the color of class.
function handleCardClick(event) {
  if (event.target.classList.contains("flipped")) return;    // do nothing if clicking flipped card
  if (notClicking) return;
  
  let currentCard = event.target; //assign event.target to be currentCard
  currentCard.style.backgroundColor = currentCard.classList[0]; // assign card color by calling class name

  if (!card1 || !card2) {   //if card 1 is null or card 2 is null (either card 1 or card 2 are free to pick)
    currentCard.classList.add("flipped"); //use class name "flipped" to define clicked card
    card1 = card1 || currentCard; //If card1 doesn't hold an element, assign current clicked card to it. If card1 is defined, test card2 and assign currentCard there.
    card2 = currentCard === card1 ? null : currentCard; // if the currentCard is equal to card1, set card2 to null; else set card2 to be currentCard.
  }

  if (card1 && card2){
    notClicking = true; //when two cards are clicked, noClicking is true & revent any further clicks until the two cards are compared
    
    //compare 2 cards once they are filled
    let pic1 = card1.className;
    let pic2 = card2.className; 
    if (pic1 === pic2){ //remove event listener for click - can't click paired cards
      flippedCard += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
    //reset two cards after comparison
      card1 = null;
      card2 = null;
      notClicking = false;
    } else {        // remove only class "flipped" and change back color, if cards not the same, reset color & flip after one second
      setTimeout(function(){
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped"); 
        card2.classList.remove("flipped"); 
        card1 = null;
        card2 = null;
        notClicking = false;
      }, 1000);
    }
  }  // (and until the game board is 'ready' to accept two new card clicks). Be sure to analyze the circumstances under which we set noClicking to true/false in the handleCardClick function.

  
  // you can use event.target to see which element was clicked
  // if (notClicking = true){
  // console.log("you just clicked", event.target);
  // }

  if (flippedCard === COLORS.length) alert ("game over!");
}




//We set noClicking to true (line 68) when two cards are clicked, and then we prevent any further clicks until the two cards are compared (and until the game board is 'ready' to accept two new card clicks). Be sure to analyze the circumstances under which we set noClicking to true/false in the handleCardClick function.

// Clicking on two matching cards - stay face up.
// When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. 
