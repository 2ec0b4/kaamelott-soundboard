define(
    'views/search',
    [
        'marionette',
        'hbs!templates/search'
    ],
    function (Marionette, SoundSearchTemplate) {
        "use strict";

        var SoundSearchView = Marionette.LayoutView.extend({
            template: SoundSearchTemplate
        });

        return SoundSearchView;
});
