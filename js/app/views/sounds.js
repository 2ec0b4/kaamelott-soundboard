define(
    'views/sounds',
    [
        'marionette',
        'backbone.radio',
        'underscore',
        'collections/sounds',
        'views/sound'
    ],
    function (Marionette, Radio, _, SoundsCollection, SoundView) {
        "use strict";

        var SoundsCollectionView = Marionette.CollectionView.extend({
            childView: SoundView,
            collection: new SoundsCollection(),
            tagName: 'ul',
            childEvents: {
                'sound:play': 'stopPlayingSound'
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

                this.channel.on('sounds:filter', function(search) {
                    that.data.sounds    = that.collection.filterByTitle(search).toJSON();

                    that.render();
                });
            },
            stopPlayingSound: function() {
                var playingSound    = this.collection.findWhere({playing: true});

                if( playingSound ) {
                    playingSound.stop();
                }
            },
            serializeData: function () {
                var viewData = {data: this.data};

                return _.extend(viewData, Marionette.CollectionView.prototype.serializeData.apply(this, arguments));
            }
        });

        return SoundsCollectionView;
});
