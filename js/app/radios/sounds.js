define(
    'radios/sounds',
    [
        'marionette',
        'backbone.radio',
        'collections/sounds'
    ],
    function (Marionette, Radio, SoundsCollection) {
        "use strict";

        var SoundsRadio = Marionette.Object.extend({
            initialize : function () {
                this.channel = Radio.channel('Sounds');

                this.channel.reply('getSounds', this.getSounds.bind(this));
            },
            getSounds: function() {
                var soundsCollection    = new SoundsCollection();

                return soundsCollection.fetch();
            }
        });

        return SoundsRadio;
});
