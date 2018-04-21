requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app'
    }
});

require([
    'jquery', 
    'app/base',
    'app/control/views/control_board', 
    'app/models/team',
    'app/models/round'
], function ($, Base, ControlBoard, Team, Round) {

        var app_channel = new Base();
        var controlBoard = new ControlBoard();
        var teams = [];

        if( window.localStorage ) {
            try {
                let data = JSON.parse(localStorage.getItem('ControlBoard.Data'));

                for(let i = 0; i < data.length; i++) {
                    var team = new Team(data[i].name);
                    for(let j = 0; j < data[i].rounds.length; j++) {
                        team.addRound( new Round(data[i].rounds[j].number, data[i].rounds[j].score) );
                    }

                    teams.push( team );
                }
            } catch(e) {}
        }

        app_channel.on('ControlBoard.DataUpdated', () => {
            if( window.localStorage ) {
                localStorage.setItem('ControlBoard.Data', JSON.stringify(controlBoard.teams));
            }
        });

        $.extend(window, {
            Components: {
                Teams: teams,
                App: app_channel
            }
        });

        // open up the scoreboard ui
        window.open('scoreboard.htm', "scoreboard", "toolbar=no,width=900,height=600,fullscreen=yes");

        // finally render the control board
        controlBoard.teams = teams;
        controlBoard.render();
    }
);