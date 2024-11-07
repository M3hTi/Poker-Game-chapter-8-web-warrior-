// NOTE: Object defining the poker game
const pokerGame = {
    currentBank: null,
    currentBet: null,
    placeBet: function(){
        this.currentBank -= this.currentBet;
        return  this.currentBank;
    }
}


function PokerCard(cardSuit,cardRank){
    this.suit = cardSuit
    this.rank = cardRank
}

// NOTE: Method to reference the image of the poker card
PokerCard.prototype.cardImg = function(){
    return `./images/${this.rank} of ${this.suit}.png`
}

function PokerDeck () {
    const siuts = ['clubs', 'spades', 'hearts', 'diamonds']
    const rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
    this.cards = []
    for (let i = 0; i < siuts.length; i++) {
        for (let j = 0; j < rank.length; j++) {
            this.cards.push(new PokerCard(siuts[i], rank[j]))
        }
    }
    // NOTE: Method to randomly sort the cards in the deck
    this.shuffle = function () {
        this.cards.sort(function () {
            return 0.5 - Math.random()
        })
    }
    // NOTE: Method to deal cards from the deck into a hand
    this.dealTo = function (PokerHand) {
        const cardsDealt = PokerHand.cards.length
        PokerHand.cards = this.cards.splice(0, cardsDealt) 
    }
}


// NOTE:  Constructor function for poker hands
function PokerHand (handLength){
    this.cards = new Array(handLength)
}
// NOTE: Method to replace a card in a hand with a card from a deck
PokerHand.prototype.replaceCard = function(index, PokerDeck){
    this.cards[index] = PokerDeck.cards.shift()
}
