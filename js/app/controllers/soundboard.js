define('controllers/soundboard', function(require) {
    "use strict";

    var Marionette              = require('marionette'),
        Radio                   = require('backbone.radio'),
        SoundsRadio             = require('radios/sounds'),
        SoundboardView          = require('views/soundboard'),
        SoundboardController;

    SoundboardController = Marionette.Object.extend({
        initialize: function() {
            var soundsRadio = new SoundsRadio();
        },
        index: function() {
            var view = new SoundboardView();

            Radio.channel('app').request('region:show', { view: view });
        }
    });

    return SoundboardController;
});
