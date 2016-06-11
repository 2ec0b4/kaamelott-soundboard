define("views/soundboard", function(require) {
    "use strict";

    var Marionette          = require("marionette"),
        SoundsFilterView    = require("views/filter"),
        SoundsView          = require("views/sounds"),
        SoundboardTemplate  = require("hbs!templates/soundboard.hbs"),
        SoundboardView;

    SoundboardView = Marionette.LayoutView.extend({
        template: SoundboardTemplate,
        regions: {
            filter: "#filter",
            list: "#list"
        },
        onShow: function() {
            this.showChildView("filter", new SoundsFilterView());
            this.showChildView("list", new SoundsView());
        }
    });

    return SoundboardView;
});
