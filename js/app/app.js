requirejs(['main'], function () {
    "use strict";
    require([
            'backbone',
            'jquery',
            'marionette',
            'underscore',
            'controllers/soundboard',
            'views/main'
        ],
        function(Backbone, $, Marionette, _,
                SoundboardController,
                MainView) {
            "use strict";

            var initialize = function initialize() {
                window.App = (window.App) || new Marionette.Application();

                App.on("start", start);

                App.addRegions({
                    'app': '#app'
                });

                App.controllers = {};
                App.controllers.soundboard = new SoundboardController();

                App.router = new Marionette.AppRouter();

                App.router.processAppRoutes(App.controllers.soundboard, {
                    "": "index"
                });

                App.start();
            };

            var start = function () {
                var mainView = new MainView();
                App.getRegion('app').show(mainView);

                if (Backbone.history) {
                    Backbone.history.start();
                    App.trigger("backbone:history:start");
                }
            };

            initialize();
        });
    }
);
