define(
    'views/soundboard',
    [
        'marionette',
        'views/search',
        'views/sounds',
        'hbs!templates/soundboard'
    ],
    function (Marionette, SoundSearchView, SoundListView, SoundboardTemplate) {
        "use strict";

        var SoundboardView = Marionette.LayoutView.extend({
            template: SoundboardTemplate,
            regions: {
                'search': '#search',
                'list': '#list'
            },
            onShow: function() {

                this.showChildView('search', new SoundSearchView());
                this.showChildView('list', new SoundListView());

            }
        });

        return SoundboardView;
});
