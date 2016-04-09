define(
    'controllers/soundboard',
    [
        'marionette',
        'radios/sounds',
        'views/soundboard'
    ],
    function (Marionette, SoundsRadio, SoundboardView) {
        "use strict";

        var SoundboardController = Marionette.Object.extend({
            initialize: function() {
                this.soundsRadio    = new SoundsRadio();
            },
            index: function() {
                var currentView = App.getRegion('app').currentView;

                currentView.showChildView('main', new SoundboardView());
            }
        });

        return SoundboardController;
});
