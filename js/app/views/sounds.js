define(
    'views/sounds',
    [
        'marionette',
        'backbone.radio',
        'underscore',
        'hbs!templates/sounds'
    ],
    function (Marionette, Radio, _, SoundListTemplate) {
        "use strict";

        var SoundListView = Marionette.LayoutView.extend({
            template: SoundListTemplate,
            initialize: function() {
                var that    = this;

                this.data = {};

                this.channel    = Radio.channel('Sounds');
                this.channel.request('getSounds')
                    .then(function (sounds) {
                        that.data.sounds    = sounds;
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
