define(
    'views/soundboard',
    [
        'marionette',
        'views/filter',
        'views/sounds',
        'hbs!templates/soundboard'
    ],
    function (Marionette, SoundsFilterView, SoundsView, SoundboardTemplate) {
        "use strict";

        var SoundboardView = Marionette.LayoutView.extend({
            template: SoundboardTemplate,
            regions: {
                'filter': '#filter',
                'list': '#list'
            },
            onShow: function() {

                this.showChildView('filter', new SoundsFilterView());
                this.showChildView('list', new SoundsView());

            }
        });

        return SoundboardView;
});
