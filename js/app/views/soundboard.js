define("views/soundboard", function(require) {
    "use strict";

    var Marionette          = require("marionette"),
        SoundsFilterView    = require("views/filter"),
        SoundsView          = require("views/sounds"),
        SoundboardTemplate  = require("hbs!templates/soundboard"),
        SoundboardView;

    SoundboardView = Marionette.LayoutView.extend({
        template: SoundboardTemplate,
        regions: {
            regFilter: "#filter",
            regList: "#list"
        },
        onShow: function() {
            this.showChildView("regFilter", new SoundsFilterView());
            this.showChildView("regList", new SoundsView());
        }
    });

    return SoundboardView;
});
