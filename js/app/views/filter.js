define("views/filter", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        SoundsFilterTemplate    = require("hbs!templates/filter.hbs"),
        SoundsFilterView;

    SoundsFilterView = Marionette.LayoutView.extend({
        template: SoundsFilterTemplate,
        ui: {
            searchForm: "form",
            searchField: "form input[name='s']"
        },
        events: {
            "submit @ui.searchForm": "filterSounds",
            "keyup @ui.searchField": "filterSounds"
        },
        initialize: function() {
            this.channel    = Radio.channel("Sounds");
        },
        filterSounds: function(e) {
            e.preventDefault();

            this.channel.trigger("sounds:filter", $(this.ui.searchField).val());
        }
    });

    return SoundsFilterView;
});
