define("views/filter", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        SoundsFilterTemplate    = require("hbs!templates/filter"),
        SoundsFilterView;

    SoundsFilterView = Marionette.LayoutView.extend({
        template: SoundsFilterTemplate,
        ui: {
            searchForm: "form",
            searchField: "form input[name='s']",
            btnReset: ".btn-reset"
        },
        events: {
            "submit @ui.searchForm": "filterSounds",
            "keyup @ui.searchField": "filterSounds",
            "click @ui.btnReset": "resetFilter"
        },
        initialize: function() {
            this.channel    = Radio.channel("Sounds");
            this.channel.on("sounds:reset", this.resetFilter.bind(this));
        },
        filterSounds: function(e) {
            var value   = this.$el.find(this.ui.searchField).val();

            e.preventDefault();

            if( value !== "" ) {
                this.$el.find(this.ui.btnReset).removeClass('invisible');
            } else {
                this.$el.find(this.ui.btnReset).addClass('invisible');
            }

            this.channel.trigger("sounds:filter", value);
        },
        resetFilter: function(e) {
            if (e) {
                e.preventDefault();
            }

            this.$el.find(this.ui.searchField).val('');
            this.$el.find(this.ui.searchForm).submit();
        },
        onShow: function() {
            this.$el.find(this.ui.searchField).focus();
        }
    });

    return SoundsFilterView;
});
