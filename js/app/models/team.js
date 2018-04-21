define([
    'app/models/round'
], function(Round) {

    class Team {

        constructor(name) {
            this.name = name;
            this.score = 0;
            this.rounds = [];
            this.id = new Date().getTime() + '' + (Math.random() * 1000);
        }

        addRound(round) {
            this.rounds.push( round || new Round(this.rounds.length + 1) );
        }

        addRounds(count) {
            for(let i = 0; i < count; i++) {
                this.addRound();
            }
        }
        
        getRound(number) {
            for(let i = 0; i < this.rounds.length; i++) {
                if( this.rounds[i].number == number ) {
                    return this.rounds[i];
                }
            }
        }
    
        totalScore() {
            var total = this.rounds.reduce((a, b) => ({score: a.score + b.score }));

            return total.score;
        }
    }

    return Team;
});
