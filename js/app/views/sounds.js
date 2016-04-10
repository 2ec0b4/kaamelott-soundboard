define(
    'views/sounds',
    [
        'marionette',
        'backbone.radio',
        'underscore',
        'collections/sounds',
        'hbs!templates/sounds'
    ],
    function (Marionette, Radio, _, SoundsCollection, SoundListTemplate) {
        "use strict";

        var SoundListView = Marionette.LayoutView.extend({
            collection: new SoundsCollection(),
            template: SoundListTemplate,
            ui: {
                soundItem: 'li a'
            },
            events: {
                'click @ui.soundItem': 'playSound'
            },
            initialize: function() {
                var that    = this;

                this.data = {};

                this.channel    = Radio.channel('Sounds');
                this.channel.request('getSounds')
                    .then(function(sounds) {
                        that.collection     = new SoundsCollection(sounds);
                        that.data.sounds    = that.collection.toJSON();

                        that.render();
                    });
            },
            playSound: function(e) {
                var index = $(e.currentTarget).attr('data-sound'),
                    sound = this.collection.at(index);

                e.preventDefault();

                this.stopCurrentPlay();

                if( sound ) {
                    this.currentPlay   = sound.play();
                }
            },
            stopCurrentPlay: function() {
                if( this.currentPlay && !this.currentPlay.paused ) {
                    this.currentPlay.pause();
                }
            },
            serializeData: function () {
                var viewData = {data: this.data};

                return _.extend(viewData, Marionette.LayoutView.prototype.serializeData.apply(this, arguments));
            }
        });

        return SoundListView;
});
