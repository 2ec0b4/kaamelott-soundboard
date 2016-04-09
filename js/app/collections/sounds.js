define(
    'collections/sounds',
    [
        'backbone',
        'models/sound'
    ],
    function (Backbone, Sound) {
        "use strict";

        var Sounds = Backbone.Collection.extend({
            model: Sound,
            url: 'sounds/sounds.json'
        });

        return Sounds;
});
