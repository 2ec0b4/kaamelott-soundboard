define(
    'collections/sounds',
    [
        'backbone',
        'underscore',
        'models/sound'
    ],
    function (Backbone, _, Sound) {
        "use strict";

        var Sounds = Backbone.Collection.extend({
            model: Sound,
            url: 'sounds/sounds.json',
            search : function(search){
                if( search == "" ) {
                    return this;
                }

                var pattern = new RegExp('^'+search, 'gi');
                return _(this.filter(function(data) {
                    return pattern.test(data.get('title'));
                }));
            }
        });

        return Sounds;
});
