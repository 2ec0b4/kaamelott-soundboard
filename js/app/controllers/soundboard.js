define("controllers/soundboard", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        SoundsRadio             = require("radios/sounds"),
        SoundboardView          = require("views/soundboard"),
        SoundboardController;

    SoundboardController = Marionette.Object.extend({
        initialize: function() {
            var soundsRadio = new SoundsRadio();
        },
        index: function(slug) {
            var view = new SoundboardView({slug: slug});

            Radio.channel("App").request("region:show", { view: view });
        }
    });

    return SoundboardController;
});
