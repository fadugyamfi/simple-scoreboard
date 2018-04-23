define([
    'app/models/team',
    'app/models/round'
], function(Team, Round) {

    class DataStore {

        constructor() {
            this.teams = [];
            this.load();
        }

        load() {
            if( window.localStorage ) {
                try {
                    let data = JSON.parse(localStorage.getItem('ControlBoard.Data'));
    
                    for(let i = 0; i < data.length; i++) {
                        var team = new Team(data[i].name);
                        for(let j = 0; j < data[i].rounds.length; j++) {
                            team.addRound( new Round(data[i].rounds[j].number, data[i].rounds[j].score) );
                        }
    
                        this.teams.push( team );
                    }
                } catch(e) {}
            }
        }

        save(data) {
            if( window.localStorage ) {
                localStorage.setItem('ControlBoard.Data', JSON.stringify(data));
            }
        }
    };

    return DataStore;
});