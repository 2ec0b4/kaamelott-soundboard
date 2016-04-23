define(
    'models/sound',
    [
        'backbone'
    ],
    function (Backbone) {
        "use strict";

        var Sound = Backbone.Model.extend({
            audio: null,
            defaults: {
                title: "",
                character: "",
                episode: "",
                file: "",
                playing: false
            },
            play: function() {
                if( !this.audio ) {
                    this.audio = new Audio('sounds/'+this.get('file'));
                }

                this.audio.play();
                this.audio.onended = this.stop.bind(this);
                this.audio.onpause = this.stop.bind(this);

                this.set('playing', true);
            },
            stop: function() {
                if( this.audio && !this.audio.paused ) {
                    this.audio.pause();
                    this.audio.load();
                }

                this.set('playing', false);
            }
        });

        return Sound;
});
