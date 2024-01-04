// Deals the player a random number between 4 and 21 inclusive.

var players = []; //initialize a list of players

// Function to initialize the dealer with a random set of cards
function initializeDealer() {
    let dealer = addPlayer("Dealer");
    starterCard(dealer);
    players.push(dealer);
}

//add player with name, set of cards and play:true
function addPlayer(name){
    return {
        name: name,
        cards: [],
        play: true
    };
}

//calculate random number
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//create a starter set of card
function starterCard(player){
    let firstSet = randomNum(4, 21);
    player.cards.push(firstSet);
}

//ask player for the name, and add it to players list with starter sets of cards
function addNewPlayer(){
    let playerName = prompt("Enter the name of the new player (or 'stop' to finish): ")

    if(playerName.toLowerCase() !== 'stop'){
        let newPlayer = addPlayer(playerName);
        starterCard(newPlayer);
        players.push(newPlayer);
        console.log(playerName + " has been added to the game.");
        addNewPlayer();
    }
}

// Calculate the total value of a player's cards
function calculateTotalCardsValue(player) {
    return player.cards.reduce((sum, card) => sum + card, 0);
}

// GAME turn
function takeTurn(player){
    if (player.name === "Dealer") {
        while (calculateTotalCardsValue(player) < 17) {
            let newCard = randomNum(2, 11);
            player.cards.push(newCard);
        }

        if (calculateTotalCardsValue(player) > 21) {
            console.log(player.name + " busts.");
            player.play = false; // Set play to false for the dealer
        } else {
            console.log(player.name + " stays.");
            player.play = false; // Set play to false for the dealer
        }
    } else { //display the player's cards and ask if would like to play
        let action = prompt(player.name + "'s this are your cards: " + player.cards + ", do you want to play, stay or bust?");
        
        switch(action.toLowerCase()){
            case 'play':
                let newCard = randomNum(2, 11);
                player.cards.push(newCard);
                break;
            case 'stay':
                player.play = false; // Set play to false for the player
                break;
            case 'bust':
                player.play = false; // Set play to false for the player
                break;
            default:
                console.log("Invalid action. Please enter play, stay, or bust.");
                takeTurn(player); // Ask again if the action is invalid
        }
    }
}

//Add players
addNewPlayer();
initializeDealer();

while(players.some(player => player.play)){ // have no idea as it work yet :)
    for(let player of players){
        takeTurn(player);
    }
}

// Calculate total values and determine the winner
let winner = null;
let closestTo21 = 0;

for (let player of players) {
    let totalValue = calculateTotalCardsValue(player);
    console.log(player.name + "'s cards: " + player.cards.join(', ') + " Total is: " + totalValue); // Displaying the cards for each player
    
    if (totalValue === 21) {
        winner = player;
        break; // If someone has 21, they are the winner
    } else if (totalValue < 21 && totalValue > closestTo21) {
        closestTo21 = totalValue;
        winner = player;
    }
}

// Display the winner
if (winner) {
    console.log(winner.name +  " is the winner!");
} else {
    console.log("No one won. It's a tie!");
}
