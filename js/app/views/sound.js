define(
    'views/sound',
    [
        'marionette',
        'models/sound',
        'hbs!templates/sound'
    ],
    function (Marionette, SoundModel, SoundBlockTemplate) {
        "use strict";

        var SoundBlockView = Marionette.ItemView.extend({
            template: SoundBlockTemplate,
            model: SoundModel,
            tagName: 'li',
            ui: {
                soundItem: 'a'
            },
            events: {
                'click @ui.soundItem': 'playSound'
            },
            playSound: function(e) {
                e.preventDefault();

                this.trigger('sound:play');

                this.model.play();
            }
        });

        return SoundBlockView;
});
