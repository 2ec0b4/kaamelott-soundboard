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
                'click @ui.soundItem': 'toggleSound'
            },
            initialize: function() {
                this.listenTo(this.model, "change:playing", this.playingAttributeChanged);
            },
            toggleSound: function(e) {
                e.preventDefault();

                if( this.model.get('playing') ) {
                    this.trigger('sound:stop');

                    this.model.stop();
                } else {
                    this.trigger('sound:play');

                    this.model.play();
                }
            },
            playingAttributeChanged: function() {
                if( this.model.get('playing') ) {
                    $(this.ui.soundItem).addClass('playing');
                } else {
                    $(this.ui.soundItem).removeClass('playing');
                }
            }
        });

        return SoundBlockView;
});
