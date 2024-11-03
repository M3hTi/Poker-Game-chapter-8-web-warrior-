// NOTE: Object defining the poker game
const pokerGame = {
    currentBank: null,
    currentBet: null,
    placeBet: function(){
        this.currentBank -= this.currentBet;
        return  this.currentBank;
    }
}

