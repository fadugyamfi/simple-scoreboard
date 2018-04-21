define([
    'app/base',
    'mustache/mustache',
    'app/models/team',
    'app/models/round',
    'text!./control_board.jst'
], function(Base, Mustache, Team, Round, ControlBoardTmpl) {

    class ControlBoard extends Base {

        constructor() {
            let element = "#control_board";
            let events = {
                'click .js-add-team-btn': 'onAddTeam',
                'click .js-add-round-btn': 'onAddRound',
                'click .js-add-score': 'onAddScore',
                'click .js-delete-team': 'onDeleteTeam'
            };

            super(element, events);

            this.teams = [];
            this.rounds = [];
        }

        getTeam(id) {
            for(let i = 0; i < this.teams.length; i++) {
                if( this.teams[i].id == id ) {
                    return this.teams[i];
                }
            }
        }

        onAddTeam(e) {
            e.preventDefault();

            var team_name = $(".js-team-name-field").val();
            var rounds = $(".js-rounds-field").val();

            if(!team_name) {
                alert('Please enter team name');
                return;
            }

            var team = new Team(team_name);
            team.addRounds(rounds);

            this.teams.push( team );

            this.render();

            window.Components.App.trigger('Scoreboard.addTeam', team);
            
        }

        onAddRound(e) {
            e.preventDefault();

            this.rounds.push( new Round(this.rounds.length + 1));
            this.render();

            window.Components.App.trigger('Scoreboard.addRound');
        }

        onAddScore(e) {
            e.preventDefault();

            var score = $(e.currentTarget).data('score');
            var round = $(e.currentTarget).data('round');
            var team_id = $(e.currentTarget).parents('.team-panel').data('id');
            var team = this.getTeam(team_id);
            
            team.getRound(round).incrementScore(score);
            
            this.render();

            window.Components.App.trigger('Scoreboard.teamUpdated', team);
        }

        onDeleteTeam(e) {
            e.preventDefault();

            if( !confirm('Are you sure you want to delete this team and their scores?') ) {
                return;
            }

            var team_id = $(e.currentTarget).parents('.team-panel').data('id');
            var removed = null;

            for(let i = this.teams.length - 1; i > -1; i--) {
                if( this.teams[i].id == team_id ) {
                    removed = this.teams.splice(i, 1);
                    break;
                }
            }

            this.render();

            window.Components.App.trigger('Scoreboard.deleteTeam', removed[0]);
        }

        render() {
            Mustache.parse(ControlBoardTmpl);

            var rendered = Mustache.render(ControlBoardTmpl, {
                teams: this.teams
            });

            $("#control_board").html(rendered);

            window.Components.App.trigger('ControlBoard.DataUpdated');
        }
    }

    return ControlBoard;
});