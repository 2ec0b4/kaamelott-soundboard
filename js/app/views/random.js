define("views/random", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        RandomTemplate          = require("hbs!templates/random"),
        RandomView;

    RandomView = Marionette.LayoutView.extend({
        template: RandomTemplate,
        ui: {
            randomButton: "#random",
            resetButton: "#reset"
        },
        events: {
            "click @ui.randomButton": "random",
            "click @ui.resetButton": "reset"
        },
        initialize: function() {
            this.channel    = Radio.channel("Sounds");
        },
        random: function() {
            this.$el.find(this.ui.resetButton).removeClass('hidden');
            this.channel.trigger("sounds:random");
        },
        reset: function() {
            this.$el.find(this.ui.resetButton).addClass('hidden');
            this.channel.trigger("sounds:reset");
        }
    });

    return RandomView;
});
