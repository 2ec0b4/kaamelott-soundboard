define(
    'controllers/soundboard',
    [
        'marionette',
        'views/soundboard'
    ],
    function (Marionette, SoundboardView) {
        "use strict";

        var SoundboardController = Marionette.Controller.extend({
            index: function() {
                var currentView = App.getRegion('app').currentView;

                currentView.showChildView('main', new SoundboardView());
            }
        });

        return SoundboardController;
});
