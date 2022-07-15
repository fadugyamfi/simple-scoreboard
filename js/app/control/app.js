requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        lib: 'lib'
    }
});

require([
    'jquery',
    'lib/base',
    'app/data_store',
    'app/control/views/control_board',
], function ($, Base, DataStore, ControlBoard) {

        var app_channel = new Base();
        var datastore = new DataStore();
        var controlBoard = new ControlBoard();

        $.extend(window, {
            Components: {
                Teams: datastore.teams,
                App: app_channel
            }
        });

        // finally render the control board
        controlBoard.teams = datastore.teams;
        controlBoard.render();

        app_channel.on('ControlBoard.DataUpdated', (data) => {
            datastore.save(data);
        });
    }
);
