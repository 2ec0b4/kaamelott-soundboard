define("radios/sounds", function(require) {
    "use strict";

    var Marionette          = require("marionette"),
        Radio               = require("backbone.radio"),
        SoundsCollection    = require("collections/sounds"),
        SoundsRadio;

    SoundsRadio = Marionette.Object.extend({
        initialize : function () {
            this.channel = Radio.channel("Sounds");

            this.channel.reply("getSounds", this.getSounds.bind(this));
        },
        getSounds: function() {
            var soundsCollection    = new SoundsCollection();

            return soundsCollection.fetch();
        }
    });

    return SoundsRadio;
});
