define("views/random", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        RandomTemplate          = require("hbs!templates/random"),
        RandomView;

    RandomView = Marionette.LayoutView.extend({
        template: RandomTemplate,
        ui: {
            randomButton: "button"
        },
        events: {
            "click @ui.randomButton": "random"
        },
        initialize: function() {
            this.channel    = Radio.channel("Sounds");
        },
        random: function() {
            this.channel.trigger("sounds:random");
        }
    });

    return RandomView;
});
