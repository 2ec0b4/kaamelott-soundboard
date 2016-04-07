define(
    'views/search',
    [
        'marionette',
        'hbs!templates/search'
    ],
    function (Marionette, SoundSearchTemplate) {
        "use strict";

        var SoundSearchView = Marionette.LayoutView.extend({
            template: SoundSearchTemplate,
            ui: {
                searchForm:'form',
                searchField:'form input[name="s"]',
            },
            events: {
                'submit @ui.searchForm':'filterSounds',
                'keyup @ui.searchField':'filterSounds'
            },
            filterSounds: function() {
                var search  = $(this.ui.searchField).val();
            }
        });

        return SoundSearchView;
});
