define("views/sound", function(require) {
    "use strict";

    var Marionette      = require("marionette"),
        SoundModel      = require("models/sound"),
        SoundTemplate   = require("hbs!templates/sound"),
        SoundView;

    SoundView = Marionette.ItemView.extend({
        template: SoundTemplate,
        model: SoundModel,
        tagName: "li",
        ui: {
            soundItem: "a"
        },
        events: {
            "click @ui.soundItem": "toggleSound",
            "mouseenter @ui.soundItem": "toggleSoundDetail",
            "mouseleave @ui.soundItem": "toggleSoundDetail"
        },
        initialize: function() {
            this.listenTo(this.model, "change:playing", this.playingAttributeChanged);
        },
        toggleSound: function(e) {
            e.preventDefault();

            if( this.model.get("playing") ) {
                this.trigger("sound:stop");

                this.model.stop();
            } else {
                this.trigger("sound:play");

                this.model.play();
            }
        },
        playingAttributeChanged: function() {
            if( this.model.get("playing") ) {
                $(this.ui.soundItem).addClass("playing");
            } else {
                $(this.ui.soundItem).removeClass("playing");
            }
        },
        toggleSoundDetail: function(e) {
            var offset;

            if (e.type === "mouseleave") {
                $(".tooltip").remove();
                return;
            }

            offset = $(this.el).offset();

            $("<div/>")
                .addClass("tooltip")
                .append(
                    $("<p/>").text(this.model.getSoundDetail())
                )
                .css({left: (offset.left+25)+"px", top: (offset.top+30)+"px"})
                .appendTo("body")
                .delay(1000)
                .show(0);
        }
    });

    return SoundView;
});
