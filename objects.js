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
// NOTE: Method to determine the value of the pokerHand
PokerHand.prototype.getHandValue = function(){
    return handType(this)


    /* NOTE: Some of the coding techniques in the handType() function are beyond the scope of this tutorial;
    however, you may wish to review the code to understand some of the approaches used to evaluate the
    contents of a poker hand.*/
    function handType(pokerHand) {
        // Determine the rank value of each card in the hand
        for (let i = 0; i < pokerHand.cards.length; i++) {
            const card = pokerHand.cards[i];
            if (card.rank === "ace") {
                card.rankValue = 14;
            } else if (card.rank === "king") {
                card.rankValue = 13;
            } else if (card.rank === "queen") {
                card.rankValue = 12;
            } else if (card.rank === "jack") {
                card.rankValue = 11;
            } else {
                card.rankValue = parseInt(card.rank);
            }
        }
    
        // Sort the cards by rank value in descending order
        pokerHand.cards.sort((a, b) => b.rankValue - a.rankValue);
    
        // Define the helper methods inside the handType function
        const isRoyalFlush = function(pokerHand) {
            // Check if the hand is a royal flush
            const suits = new Set(pokerHand.cards.map(card => card.suit));
            return suits.size === 1 && pokerHand.cards.every(card => [10, 11, 12, 13, 14].includes(card.rankValue));
        };
    
        const isStraightFlush = function(pokerHand) {
            // Check if the hand is a straight flush
            return hasFlush(pokerHand) && hasStraight(pokerHand);
        };
    
        const has4OfAKind = function(pokerHand) {
            // Check if the hand has 4 of a kind
            const ranks = new Map();
            for (const card of pokerHand.cards) {
                if (!ranks.has(card.rankValue)) {
                    ranks.set(card.rankValue, 1);
                } else {
                    ranks.set(card.rankValue, ranks.get(card.rankValue) + 1);
                    if (ranks.get(card.rankValue) === 4) {
                        return true;
                    }
                }
            }
            return false;
        };
    
        const hasFullHouse = function(pokerHand) {
            // Check if the hand has a full house
            const ranks = new Map();
            let hasThree = false;
            let hasTwo = false;
            for (const card of pokerHand.cards) {
                if (!ranks.has(card.rankValue)) {
                    ranks.set(card.rankValue, 1);
                } else {
                    ranks.set(card.rankValue, ranks.get(card.rankValue) + 1);
                    if (ranks.get(card.rankValue) === 3) {
                        hasThree = true;
                    } else if (ranks.get(card.rankValue) === 2) {
                        hasTwo = true;
                    }
                }
            }
            return hasThree && hasTwo;
        };
    
        const hasFlush = function(pokerHand) {
            // Check if the hand has a flush
            const suits = new Set(pokerHand.cards.map(card => card.suit));
            return suits.size === 1;
        };
    
        const hasStraight = function(pokerHand) {
            // Check if the hand has a straight
            const sortedRanks = pokerHand.cards.map(card => card.rankValue).sort((a, b) => b - a);
            for (let i = 0; i < sortedRanks.length - 4; i++) {
                if (sortedRanks[i] - sortedRanks[i + 1] === 1 && sortedRanks[i + 1] - sortedRanks[i + 2] === 1 && sortedRanks[i + 2] - sortedRanks[i + 3] === 1 && sortedRanks[i + 3] - sortedRanks[i + 4] === 1) {
                    return true;
                }
            }
            return false;
        };
    
        const has3OfAKind = function(pokerHand) {
            // Check if the hand has 3 of a kind
            const ranks = new Map();
            for (const card of pokerHand.cards) {
                if (!ranks.has(card.rankValue)) {
                    ranks.set(card.rankValue, 1);
                } else {
                    ranks.set(card.rankValue, ranks.get(card.rankValue) + 1);
                    if (ranks.get(card.rankValue) === 3) {
                        return true;
                    }
                }
            }
            return false;
        };
    
        const hasPair = function(pokerHand) {
            // Check if the hand has a pair
            const ranks = new Map();
            for (const card of pokerHand.cards) {
                if (!ranks.has(card.rankValue)) {
                    ranks.set(card.rankValue, 1);
                } else {
                    ranks.set(card.rankValue, ranks.get(card.rankValue) + 1);
                    if (ranks.get(card.rankValue) === 2) {
                        return true;
                    }
                }
            }
            return false;
        };
    
        // Check for hand types in descending order of strength
        if (isRoyalFlush(pokerHand)) {
            return "Royal Flush";
        } else if (isStraightFlush(pokerHand)) {
            return "Straight Flush";
        } else if (has4OfAKind(pokerHand)) {
            return "4 of a Kind";
        } else if (hasFullHouse(pokerHand)) {
            return "Full House";
        } else if (hasFlush(pokerHand)) {
            return "Flush";
        } else if (hasStraight(pokerHand)) {
            return "Straight";
        } else if (has3OfAKind(pokerHand)) {
            return "3 of a Kind";
        } else {
            return hasPair(pokerHand) ? "Pair" : "No Winner";
        }
    };

}