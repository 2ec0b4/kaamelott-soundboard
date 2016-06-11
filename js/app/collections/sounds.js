define("collections/sounds", function(require) {
    "use strict";

    var Backbone    = require("backbone"),
        Sound       = require("models/sound"),
        Sounds;

    Sounds = Backbone.Collection.extend({
        model: Sound,
        url: "/sounds/sounds.json",
        comparator: function(a, b) {
            var str1 = a.get("title"),
                str2 = b.get("title");

            return str1.localeCompare(str2);
        },
        filterByTitle: function(search){
            if( search == "" ) {
                return this;
            }

            var pattern = new RegExp(search, "gi");
            return new Sounds(this.filter(function(data) {
                return pattern.test(data.get("title")) || pattern.test(data.get("character"));
            }));
        }
    });

    return Sounds;
});
