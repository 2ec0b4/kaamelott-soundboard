define("views/sound", function(require) {
    "use strict";

    var Marionette          = require("marionette"),
        SoundModel          = require("models/sound"),
        SoundTemplate       = require("hbs!templates/sound"),
        SoundDetailTemplate = require("hbs!templates/soundDetail"),
        SoundView;

    SoundView = Marionette.ItemView.extend({
        template: SoundTemplate,
        model: SoundModel,
        tagName: "li",
        ui: {
            btn: ".btn",
            btnPlay: ".btn-play",
            btnShare: ".btn-share"
        },
        events: {
            "mouseenter @ui.btnPlay": "toggleSoundDetail",
            "mouseleave @ui.btnPlay": "toggleSoundDetail",
            "click @ui.btnPlay": "toggleSound"
        },
        triggers: {
            "click @ui.btnShare": {
                event: "sound:share",
                preventDefault: true
            },
        },
        initialize: function() {
            this.listenTo(this.model, "change:playing", this.playingAttributeChanged);
        },
        onShow: function() {
            var that    = this,
                height;

            if( this.model.get('selected') ) {
                height = $('header').outerHeight();
                $('html, body').animate({scrollTop: this.$el.offset().top-height}, 750, 'swing', function() {
                    that.$el.find(that.ui.btn).addClass('flash');
                });

                if( !/iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
                    this.$el.find(this.ui.btnPlay).click();
                }

                this.model.set('selected', false);
            }
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
                $(this.ui.btnPlay).addClass("playing");
            } else {
                $(this.ui.btnPlay).removeClass("playing");
            }
        },
        toggleSoundDetail: function(e) {
            var offset,
                template;

            if (e.type === "mouseleave") {
                $(".tooltip").remove();
                return;
            }

            offset      = $(this.el).offset();
            template    = SoundDetailTemplate({detail: this.model.getSoundDetail()});

            $(template)
                .css({left: (offset.left+25)+"px", top: (offset.top+30)+"px"})
                .appendTo("body")
                .delay(1000)
                .show(0);
        }
    });

    return SoundView;
});
