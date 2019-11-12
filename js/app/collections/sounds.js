define("collections/sounds", function(require) {
    "use strict";

    var Backbone    = require("backbone"),
        Sound       = require("models/sound"),
        Sounds;

    Sounds = Backbone.Collection.extend({
        model: Sound,
        url: "sounds/sounds.json",
        comparator: function(a, b) {
            var str1 = a.get("title"),
                str2 = b.get("title");

            return str1.localeCompare(str2);
        },
        filterByCid: function(cid) {
            if(cid == "") {
                return this;
            }

            return new Sounds(this.filter(function(data) {
                return data.cid == cid;
            }));
        },
        filterByTitle: function(search){
            var that    = this,
                pattern;

            if( search == "" ) {
                return this;
            }

            pattern     = new RegExp(this.removeDiacritics(search), "gi");
            return new Sounds(this.filter(function(data) {
                pattern.lastIndex = 0;

                return pattern.test(that.removeDiacritics(data.get("title")))
                    || pattern.test(that.removeDiacritics(data.get("character")))
                    || pattern.test(that.removeDiacritics(data.get("episode")));
            }));
        },
        removeDiacritics: function(str) {
            str = str.replace(/[àâ]/gi,"a");
            str = str.replace(/[ç]/gi,"c");
            str = str.replace(/[éèëê]/gi,"e");
            str = str.replace(/[ïî]/gi,"i");
            str = str.replace(/[ô]/gi,"o");
            str = str.replace(/[ùüû]/gi,"u");

            return str;
        }
    });

    return Sounds;
});
