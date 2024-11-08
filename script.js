
// Get DOM elements
const dealButton = document.querySelector('.btn-deal');
const drawButton = document.querySelector('.btn-draw');
const standButton = document.querySelector('.btn-stand');
const resetButton = document.querySelector('.btn-reset');
const betSelector = document.querySelector('.bet-selector');
const cardSlots = document.querySelectorAll('.card-slot');
const bankDisplay = document.querySelector('#bank-display');


const statusMsg = document.querySelector('.statusBox');



const deckElement = document.querySelector('.deck');

function render() {
    let myDeck;
    let myHand;
    function showDeck() {

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


        myDeck.cards.forEach((card,index) => {
            const image = document.createElement('img');
            image.src = card.cardImg();
            
            // Set a custom property for stacking
            image.style.setProperty('--i', index);
            deckElement.appendChild(image);
        });

    }
    showDeck()



    // Add click event listeners to card slots for selection
    cardSlots.forEach((slot, index) => {
        slot.addEventListener('click', function(){
            // Only allow card selection when draw button is enabled
            if (!drawButton.disabled) {
                slot.classList.toggle('selected');
                if(this.children[0].src.includes('/images/cardback.png')) {
                    this.children[0].src = myHand.cards[index].cardImg();
                } else {
                    this.children[0].src = '/images/cardback.png';
                }
                
                // Enable/disable draw button based on if any cards are selected
                // const selectedCards = document.querySelectorAll('.card-slot.selected');
                // if (selectedCards.length > 0) {
                //     drawButton.disabled = false;
                // } else {
                //     drawButton.disabled = true;
                // }
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
            console.log(myDeck);
            for (let index = 0; index < cardSlots.length; index++) {
               cardSlots[index].innerHTML = `<img src="./images/cardback.png" alt="Card ${index + 1}">`;
            }

            myDeck.cards.forEach((card,index) => {
                const image = document.createElement('img');
                image.src = card.cardImg();
                
                // Set a custom property for stacking
                image.style.setProperty('--i', index);
                deckElement.appendChild(image);
            });

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

        cardSlots.forEach((slot, index) => {
            if(slot.children[0].src.includes('/images/cardback.png')) {
                // NOTE: Replace the card and its image on the table
                myHand.replaceCard(index, myDeck)
                slot.children[0].src = myHand.cards[index].cardImg();
            }
        })
        



        // Disable draw and stand buttons
        drawButton.disabled = true;
        standButton.disabled = true;
        dealButton.disabled = false;
        betSelector.disabled = false;
        // Clear card selections
        cardSlots.forEach(slot => {
            slot.classList.remove('selected');
        });


        myDeck.cards.forEach((card,index) => {
            const image = document.createElement('img');
            image.src = card.cardImg();

            // Set a custom property for stacking
            image.style.setProperty('--i', index);
            deckElement.appendChild(image);
        });


        statusMsg.textContent = myHand.getHandValue();

        // NOTE: Update the bank value
        bankDisplay.value = pokerGame.payBet(statusMsg.textContent).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        
        // Enable reset button
        resetButton.disabled = false;
    });



    // Stand button click handler
    standButton.addEventListener('click', () => {
        // Disable draw and stand buttons
        dealButton.disabled = false;
        betSelector.disabled = false;
        drawButton.disabled = true;
        standButton.disabled = true;
        
        // Enable reset button
        resetButton.disabled = false;

        statusMsg.textContent = myHand.getHandValue();

        // NOTE: Update the bank value
        bankDisplay.value = pokerGame.payBet(statusMsg.textContent).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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





















