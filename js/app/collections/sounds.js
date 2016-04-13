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
            comparator: 'title',
            url: 'sounds/sounds.json',
            filterByTitle: function(search){
                if( search == "" ) {
                    return this;
                }

                var pattern = new RegExp(search, 'gi');
                return new Sounds(this.filter(function(data) {
                    return pattern.test(data.get('title'));
                }));
            }
        });

        return Sounds;
});
