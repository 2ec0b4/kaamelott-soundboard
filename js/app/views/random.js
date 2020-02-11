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
            var that = this;
            this.channel    = Radio.channel("Sounds");
            this.channel.on("sounds:filter", function (value) {
                if (value == "") {
                    return;
                }
                that.enableButton();
            });
        },
        random: function() {
            this.enableButton();
            this.channel.trigger("sounds:random");
        },
        reset: function() {
            this.$el.find(this.ui.resetButton).attr('disabled', 'disabled');
            this.channel.trigger("sounds:reset");
        },
        enableButton: function() {
            this.$el.find(this.ui.resetButton).removeAttr('disabled');
        }
    });

    return RandomView;
});
