define([
    'mustache/mustache',
    'app/base',
    'app/models/round',
    'app/models/team',
    'text!./templates/header.jst',
    'text!./templates/scoreboard.jst',
    'text!./templates/team.jst'
], function(Mustache, Base, Round, Team, HeaderTmpl, ScoreboardTmpl, TeamTmpl) {

    class Scoreboard extends Base {

        constructor() {
            let events = {
                'click .js-round': 'onRoundClicked'
            };

            super('#scoreboard', events);

            this.teams = [];
            this.rounds = [];
            this.current_round = 1;
        }

        onRoundClicked(e) {
            let number = $(e.currentTarget).data('number');
            this.setCurrentRound(number);
        }
    
        addTeam(team) {
            this.teams.push(team);
            this.render();
        }

        deleteTeam(team) {
            for(let i = this.teams.length - 1; i > -1; i--) {
                if( this.teams[i].id == team.id ) {
                    this.teams.splice(i,1);
                    break;
                }
            }

            this.render();
        }

        addRound() {
            for(let i = 0; i < this.teams.length; i++) {
                this.teams[i].addRound(); 
            }
            this.render();
        }

        setCurrentRound(round) {
            this.current_round = round;
            this.render();
        }
    
        render() {
            Mustache.parse(HeaderTmpl);
            Mustache.parse(ScoreboardTmpl);

            var active_round_html = "";

            for(let i = 0; i < this.teams.length; i++) {
                active_round_html += this.renderTeam(this.teams[i]);
            }

            var rendered = Mustache.render(ScoreboardTmpl, {
                header: Mustache.render(HeaderTmpl),
                teams: this.teams,
                round_html: active_round_html,
                current_round: this.current_round
            });

            $("#scoreboard").html(rendered);
        }

        renderTeam(team) {
            Mustache.parse(TeamTmpl);
    
            var rendered = Mustache.render(TeamTmpl, {
                name: team.name,
                rounds: team.rounds,
                total_score: team.totalScore()
            });
    
            return rendered;
        }
    }

    return Scoreboard;
});
