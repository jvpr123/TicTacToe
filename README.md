<h1> <img src='./assets/home/tic-tac-toe.png' alt='Tic tac toe game icon.'> Tic Tac Toe </h1>

<br>

<h2>Introduction</h2>
    
<p>This project is a simple version of <a href='https://www.thesprucecrafts.com/tic-tac-toe-game-rules-412170'>Tic Tac Toe</a> game. It is a two-player game, also known as Noughts and Crosses (X's and O's), which objetive is to get 3 symbols in a row. This game is traditionally played with a paper and by two friends, but here you can choose to play against an AI or against a frind locally.</p>
<p>The following secctions explain the project details.</p>
<p>If you just want to have some fun, access the link below to start playing:</p>
    
<a href='https://jvpr123.github.io/TicTacToe/'>Play Tic Tac Toe</a>

<br>

<h2>Features</h2>

<p>This version of Tic Tac Toe game allows the user to choose the opponent type: AI or another friend.</p>

<h3>Playing with a friend:</h3>
<p>If the user chooses to play against a friend locally, the program will load an empty table and awaits a click on any square. Every time a square is clicked, the program checks whether the square is empty or filled. A filled square will never be replaced, but if empty, receives the current turn symbol (X or O). After registering a valid move, the program changes the turn and awaits another player move to repeat the process.</p>

<h3>Playing with AI:</h3>
<p>If the user chooses to play against AI, the program will load an empty table and awaits user to click on any square. At this time, after validating the move, the program will make a GET request to an API in order to get a move suggestion. The request must contain the required header paramaters described in documentation and a nine-length string with the current table positions (example: "---X--O--"). The API will return a response with an object containing the integer number of suggested position. After this, the program will register the AI move and await another user play.</p>
<p>The API used in this project can be found by accessing this <a href='https://rapidapi.com/stujo/api/tic-tac-toe/'>link</a>.</p>

<br>

<p>After every move, the program will check if there is a winner or a draw. If so, a modal will be shown telling the winner or the draw state. The modal contains two buttons, HOME and RESTART. The first option leads the user to Home page to choose another opponent type, meanwhile the second option loads a new game against the same opponent.</p>

<h3>Hope you enjoy the game!</h3>
