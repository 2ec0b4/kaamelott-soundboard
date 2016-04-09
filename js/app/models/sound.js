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
            }
        });

        return Sound;
});
