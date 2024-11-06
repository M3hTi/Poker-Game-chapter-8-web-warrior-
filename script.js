
// Get DOM elements
const dealButton = document.querySelector('.btn-deal');
const drawButton = document.querySelector('.btn-draw');
const standButton = document.querySelector('.btn-stand');
const resetButton = document.querySelector('.btn-reset');
const betSelector = document.querySelector('.bet-selector');
const cardSlots = document.querySelectorAll('.card-slot');
const bankDisplay = document.querySelector('#bank-display');


const statusMsg = document.querySelector('.statusBox');


const images = ['./images/10 of hearts.png', './images/9 of hearts.png', './images/8 of hearts.png', './images/7 of hearts.png', './images/6 of hearts.png', './images/5 of hearts.png', './images/4 of hearts.png', './images/3 of hearts.png', './images/2 of hearts.png','./images/ace of hearts.png', './images/king of hearts.png', './images/queen of hearts.png', './images/jack of hearts.png']

const deckElement = document.querySelector('.deck');

function render() {
    let myDeck;
    let myHand;
    function showDeck() {
        images.forEach(img => {
            const image = document.createElement('img');
            image.src = img
            deckElement.appendChild(image)
        });

        // NOTE: Set the initial bank and bet values
        pokerGame.currentBank = 500;
        pokerGame.currentBet = 25;

        // NOTE: Update bank display
        bankDisplay.value = `${pokerGame.currentBank.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;


        betSelector.onchange = function() {
            pokerGame.currentBet = parseInt(this.value);
        };

        // NOTE: Create a deck of shuffled cards
        myDeck = new PokerDeck();
        myDeck.shuffle();

        // NOTE: Create an empty poker hand object
        myHand = new PokerHand(5);

    }
    showDeck()



    // Add click event listeners to card slots for selection
    cardSlots.forEach((slot, index) => {
        slot.addEventListener('click', () => {
            // Only allow card selection when draw button is enabled
            if (!drawButton.disabled) {
                slot.classList.toggle('selected');
                
                // Enable/disable draw button based on if any cards are selected
                const selectedCards = document.querySelectorAll('.card-slot.selected');
                if (selectedCards.length > 0) {
                    drawButton.disabled = false;
                } else {
                    drawButton.disabled = true;
                }
            }
        });
    });




    // Deal button click handler
    dealButton.addEventListener('click', () => {
        if(pokerGame.currentBank >= pokerGame.currentBet) {
            bankDisplay.value = pokerGame.placeBet().toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            // NOTE: Get a new deck is there are less than 10 cards left
            if(myDeck.cards.length < 10){
                myDeck = new PokerDeck()
                myDeck.shuffle()
            }

            // NOTE: Deal 5 cards from the deck to the hand
            myDeck.dealTo(myHand)
            console.log(myDeck, myHand);

            // Disable deal button and bet selector
            dealButton.disabled = true;
            betSelector.disabled = true;
            
            // Enable draw and stand buttons
            drawButton.disabled = false;
            standButton.disabled = false;
            
            // Clear any previously selected cards
            cardSlots.forEach(slot => {
                slot.classList.remove('selected');
            });

        } else {
            statusMsg.textContent = "Insufficient Funds";
        }
    });



    // Draw button click handler
    drawButton.addEventListener('click', () => {
        // Disable draw and stand buttons
        drawButton.disabled = true;
        standButton.disabled = true;  
        // Clear card selections
        cardSlots.forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Enable reset button
        resetButton.disabled = false;
    });



    // Stand button click handler
    standButton.addEventListener('click', () => {
        // Disable draw and stand buttons
        drawButton.disabled = true;
        standButton.disabled = true;
        
        // Enable reset button
        resetButton.disabled = false;
    });



    // Reset button click handler
    resetButton.addEventListener('click', () => {
        // Reset all buttons to initial state
        dealButton.disabled = false;
        drawButton.disabled = true;
        standButton.disabled = true;
        resetButton.disabled = false;
        betSelector.disabled = false;

        pokerGame.currentBank = 500;
        bankDisplay.value = pokerGame.currentBank.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        betSelector.value = 25;
        
        // Clear any selected cards
        cardSlots.forEach(slot => {
            slot.classList.remove('selected');
        });
    });


    // Initial button states
    drawButton.disabled = true;
    standButton.disabled = true;

}


window.addEventListener('load', render)





















