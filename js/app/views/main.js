define(
    'views/main',
    [
        'marionette',
        'hbs!templates/main'
    ],
    function (Marionette, MainTemplate) {
        "use strict";

        var MainView = Marionette.LayoutView.extend({
            template: MainTemplate,
            regions: {
                'main': 'main'
            }
        });

        return MainView;
});
