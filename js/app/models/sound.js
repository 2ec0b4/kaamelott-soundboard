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
                file: ""
            },
            play: function() {
                this.audio = new Audio('sounds/'+this.attributes.file);
                this.audio.play();

                return this;
            },
            stop: function() {
                if( this.audio && !this.audio.paused ) {
                    this.audio.pause();
                }
            }
        });

        return Sound;
});
