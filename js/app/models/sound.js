define("models/sound",  function(require) {
    "use strict";

    var Backbone    = require("backbone"),
        Sound;

    Sound = Backbone.Model.extend({
        audio: null,
        defaults: {
            title: "",
            character: "",
            episode: "",
            file: "",
            playing: false,
            selected: false
        },
        play: function() {
            if( !this.audio ) {
                this.audio = new Audio("sounds/"+this.get("file"));
            }

            var that    = this,
                promise = this.audio.play();

            if (promise !== undefined) {
                promise.then(function(_) {
                    that.set("playing", true);
                }).catch(function(error) {
                });
            } else {
                this.set("playing", true);
            }

            this.audio.onended = this.stop.bind(this);
            this.audio.onpause = this.stop.bind(this);
        },
        stop: function() {
            if( this.audio && !this.audio.paused ) {
                this.audio.pause();
                this.audio.load();
            }

            this.set("playing", false);
        },
        getSoundDetail: function() {
            return this.get("character")+", "+this.get("episode");
        },
        getSlug: function() {
            return this.get("file").slice(0, this.get("file").lastIndexOf('.'));
        },
        toJSON: function(){
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);

            json.slug = this.getSlug();

            return json;
        }
    });

    return Sound;
});
