define([], function() {

    class Round {

        constructor(number, score) {
            this.number = number;
            this.score = score || 0;
        }

        incrementScore(amt) {
            this.score += parseInt(amt) || 1;
        }
    
        decrementScore(amt) {
            this.score -= parseInt(amt) || 1;
        }
    }

    return Round;
});