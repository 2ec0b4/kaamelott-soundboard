define("views/sounds", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        SoundsCollection        = require("collections/sounds"),
        SoundView               = require("views/sound"),
        SoundShareView          = require("views/share"),
        SoundsCollectionView;

    SoundsCollectionView = Marionette.CollectionView.extend({
        childView: SoundView,
        collection: new SoundsCollection(),
        tagName: "ul",
        childEvents: {
            "sound:play": "manageSounds",
            "sound:share": "shareSoundLink"
        },
        initialize: function(options) {
            var that    = this;

            this.slug = typeof options.slug !== 'undefined' ? options.slug : '';

            this.data = {
                collection: this.collection
            };

            this.channel    = Radio.channel("Sounds");
            this.channel.request("getSounds").then(this.initCollection.bind(this));
            this.channel.on("sounds:filter", this.filterCollection.bind(this));
            this.channel.on("sounds:random", this.randomSound.bind(this));
            this.channel.on("sounds:reset", this.resetCollection.bind(this));
        },
        onBeforeRender: function() {
            var sound;

            if( !!this.slug ) {
                sound   = this.collection.findWhere({file: this.slug+".mp3"});

                if( sound ) {
                    sound.set('selected', true);
                    this.slug   = "";
                }
            }
        },
        initCollection: function(sounds) {
            this.data.collection    = new SoundsCollection(sounds);
            this.collection         = this.data.collection;

            this.render();
        },
        filterCollection: function(search) {
            this.collection     = this.data.collection.filterByTitle(search);

            this.render();
        },
        filterCollectionByCid: function(cid) {
            this.collection = this.data.collection.filterByCid(cid);

            this.render();
        },
        manageSounds: function(args) {
            this.stopPlayingSound();

            Radio.channel("Sounds").trigger("sound:play", args.model.getSlug());
        },
        randomSound: function() {
            this.stopPlayingSound();

            this.filterCollection("");
            var index = Math.floor(Math.random() * Math.floor(this.collection.length));
            var sound = this.collection.models[index];
            this.filterCollectionByCid(sound.cid);

            Radio.channel("Sounds").trigger("sound:play", sound.getSlug());
            sound.play();
        },
        resetCollection: function() {
            this.filterCollection("");

            Radio.channel("Sounds").trigger("sound:stop");
        },
        stopPlayingSound: function() {
            var playingSound    = this.collection.findWhere({playing: true});

            if( playingSound ) {
                playingSound.stop();
            }
        },
        shareSoundLink: function(args) {
            var view = new SoundShareView({model: args.model});

            Radio.channel("App").request("modal:show", { view: view });
        }
    });

    return SoundsCollectionView;
});
