// Start using script after completed DOM load
document.addEventListener('DOMContentLoaded', () => {

    // Buttons for user's opponent choice
    const opponentTypeButton = document.querySelectorAll('.opponent');
    // Container with opponents buttons
    const btnContainer = document.getElementById('btn-container');
    // Container with game table
    const tableContainer = document.getElementById('table-container');

    // Add event listener for each opponent button
    opponentTypeButton.forEach(element => {

        element.addEventListener('click', (button) => {

            // Make table visible and buttons invisible
            btnContainer.setAttribute('class', 'buttons-container sr-only flex-column');
            // Table defined as visible
            tableContainer.setAttribute('class', 'table open-table');

            // Load an empty table and defines if there is an opponent change
            newGame(false);
            // Defines opponent type
            opponent = button.target.id;
        });
    });

    // ----------------------------------------------------------------------------

    // Add event listener to each square awaiting a move to register
    let squares = document.querySelectorAll('.square');

    squares.forEach(square => {

        square.addEventListener('click', async event => {

            // Register which square's been clicked
            let squareTarget = parseInt(event.target.id);

            // Check if move is valid receiving an object with validation
            await validateMove(squareTarget);
            
            // If response validation is true
            if(response.validation) {
                // Change squares content
                square.innerHTML = response.symbol;
                // If opponent is AI, makes move gotten from API request
                response.ai !== undefined ? squares[response.ai].innerHTML = turn : '';
                
                // Check if there is a winner
                if (isGameOver() === 'X' || isGameOver() === 'O') {
                    // Change modal text content and make it visible
                    modalTitle.innerHTML = `Winner - ${isGameOver()}`;
                    setTimeout(() => modal.setAttribute('class', 'flex-column modal'), 1000);
                }
                // Check if there is a draw
                else if (isGameOver() === '-') {
                    // Change modal text content and make it visible
                    modalTitle.innerHTML = `X - Draw - O`;
                    setTimeout(() => modal.setAttribute('class', 'flex-column modal'), 1000);
                }
            }
        });
    });

    // ----------------------------------------------------------------------------

    // After game-over, let user chooses if restart the game or goes to Home page

    // Modal container
    const modal = document.getElementById('modal');
    // Modal title telling winner
    const modalTitle = document.getElementById('final-game-state');
    // Buttons Restart and Home
    const backHome = document.getElementById('home');
    const restartGame = document.getElementById('restart');

    // Event listener to Home button
    backHome.addEventListener('click', () => {
        
        // Home page buttons container defined as visible
        btnContainer.setAttribute('class', 'buttons-container open-buttons-container flex-column');
        // Table defined as invisble
        tableContainer.setAttribute('class', 'table sr-only');
        // Modal defined as invisible
        modal.setAttribute('class', 'flex-column sr-only');

        // Initialize a clear table
        newGame(true);
        // Make all squares empty for a new game
        clearSquares();
    });

    // Event listener to restart the game 
    restartGame.addEventListener('click', () => {

        // Modal defined as invisible
        modal.setAttribute('class', 'flex-column sr-only');

        // Initialize a clear table
        newGame(false);
        // Make all squares empty for a new game
        clearSquares();
    })
    
    // ----------------------------------------------------------------------------

    // Function to make all squares empty for a new game
    function clearSquares() {

        squares.forEach(square => square.innerText = '');
    }
    
})