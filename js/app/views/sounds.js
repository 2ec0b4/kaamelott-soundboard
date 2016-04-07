define(
    'views/sounds',
    [
        'marionette',
        'hbs!templates/sounds'
    ],
    function (Marionette, SoundListTemplate) {
        "use strict";

        var SoundListView = Marionette.LayoutView.extend({
            template: SoundListTemplate
        });

        return SoundListView;
});
