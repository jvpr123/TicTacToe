// GLOBAL VARIABLES

// Array to store current game state
let currentTable = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
// Array to store each player symbol
let symbols = ['X', 'O'];
// Variable to control player turn
let turn = 0;
// Variable to define if oppponent is AI or another human
let opponent = undefined;
// Varible to store move validation response
let response = {};

// ----------------------------------------------------------------------------


// Function used to start a new game

function newGame(changeOpponent) {
    
    // After game-over, if user goes to Home page, define opponent as undefined
    if(changeOpponent) {
        opponent = undefined;
    }
    
    // Reset current table states
    currentTable.fill('-');
    // Reset player turn
    turn = 0;
    // Reset response
    response = {};
}

// ----------------------------------------------------------------------------

// Function to validate user move

async function validateMove(id) {

    // If opponent is human -> response stores human-play rules function
    if(opponent === 'human') {
        response = userMove(id);
    }
    // If opponent is AI -> response store AI-play rules function and awaits API response to AI move
    else if(opponent === 'ai') {
        response = userMove(id);
        response.ai = await AIMove();
    }
    
    return response;
}

// ----------------------------------------------------------------------------

// Function to human-play rules 

function userMove(id) {
    
    // If square clicked is empty and it's valid user turn
    if(currentTable[id] === '-') {
        // Register the move as valid
        currentTable[id] = symbols[turn];
        // Defines the response to interface as valid
        response = {validation: true, symbol: symbols[turn]};
        // Change current turn
        turn === 0 ? turn = 1 : turn = 0;
    }
    
    // If square clicked is filled
    else {
        // Defines the response to interface as invalid
        response = {validation: false, symbol: symbols[turn]};
    }
    
    return response;
}

// ----------------------------------------------------------------------------

// Function to AI-play rules

async function AIMove() {

    // Check if is AI turn to play
    if(turn === 1) {
        
        // Register API response with move suggestion
        let AIMove = await fetch(`https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${currentTable.join('')}/O`, {
            "method": "GET",
            "headers": config,
        })
        .then(res => res.json())
        .then(data => data.recommendation)
        .catch(error => {
            console.error(error);
        });

        // Register AI move
        currentTable[AIMove] = symbols[turn];
        // Change current turn
        turn === 0 ? turn = 1 : turn = 0;

        return AIMove
    }
}

// ----------------------------------------------------------------------------

// Function to check possible winner or draw

function isGameOver() {

    // Destructuring array for manipulation
    let [a, b, c, d, e, f, g, h, i] = currentTable; 

    // Horizontal game-over states
    if     (a !== '-' && a === b && a === c) return a;
    else if(d !== '-' && d === e && d === f) return d;
    else if(g !== '-' && g === h && h === i) return g;

    // Vertical game-over states
    else if(a !== '-' && a === d && a === g) return a;
    else if(b !== '-' && b === e && b === h) return b;
    else if(c !== '-' && c === f && c === i) return c;

    // Diagonal game-over states
    else if(a !== '-' && a === e && a === i) return a;
    else if(c !== '-' && c === e && c === g) return c;

    // Draw state
    else if(currentTable.find(element => element === '-') === undefined) return '-';

    // No game-over state yet
    else return undefined;
}

// ----------------------------------------------------------------------------