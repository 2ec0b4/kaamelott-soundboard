define(
    'views/sounds',
    [
        'marionette',
        'jquery',
        'hbs!templates/sounds'
    ],
    function (Marionette, $, SoundListTemplate) {
        "use strict";

        var SoundListView = Marionette.LayoutView.extend({
            template: SoundListTemplate,
            initialize: function() {
                var that    = this;

                this.data = {};

                $.get('/sounds/sounds.json', function(json) {
                    that.data.sounds    = json;
                    that.render();
                });
            },
            serializeData: function () {
                var viewData = {data: this.data};

                return _.extend(viewData, Marionette.LayoutView.prototype.serializeData.apply(this, arguments));
            }
        });

        return SoundListView;
});
