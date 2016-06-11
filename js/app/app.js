define("app", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        SoundboardController    = require("controllers/soundboard"),
        app;

    require("css!../../node_modules/ilyabirman-likely/release/likely.css");
    require("likely");

    app = Marionette.Application.extend({
        initialize: function intialize() {
            this.addRegions({
                mainRegion: "#main"
            });

            Radio.channel("app").reply("region:show", this.showRegion.bind(this));

            this.router = new Marionette.AppRouter();

            this.start();
        },

        start: function start() {
            var soundboardController = new SoundboardController();

            this.router.processAppRoutes(soundboardController, {
                "": "index"
            });

            if (Backbone.history) {
                Backbone.history.start();
                this.trigger("backbone:history:start");
            }

            likely.initiate();
        },

        showRegion: function showRegion(params) {
            this.mainRegion.show(params.view);
        }
    });

    return app;
});
