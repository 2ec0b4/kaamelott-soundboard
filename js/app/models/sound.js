define(
    'models/sound',
    [
        'backbone'
    ],
    function (Backbone) {
        "use strict";

        var Sound = Backbone.Model.extend({
            defaults: {
                title: "",
                character: "",
                file: ""
            },
            play: function() {
                var audio = new Audio('sounds/'+this.attributes.file);

                audio.play();

                return audio;
            }
        });

        return Sound;
});
