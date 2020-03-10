define("views/share", function(require) {
    "use strict";

    var Marionette       = require("marionette"),
        ShareTemplate    = require("hbs!templates/share"),
        ShareView;

    ShareView = Marionette.LayoutView.extend({
        template: ShareTemplate,
        templateHelpers: function () {
            return {
                title: this.model.get("title"),
                url: this.getAbsoluteUrl("#son/"+this.model.getSlug())
            };
        },
        ui: {
            background: "#modal-back",
            body: ".share-link",
            field: "textarea"
        },
        events: {
            "click @ui.background": "destroy"
        },
        initialize: function(options) {
            this.model  = options.model;

            $(window).on("resize", this.center.bind(this));
        },
        onDestroy: function() {
            $(this.ui.background).remove();

            $(window).off("resize", this.center.bind(this));
        },
        onBeforeShow: function() {
            this.$el.append($("<div/>").attr("id", "modal-back"));
        },
        onShow: function() {
            var that    = this;

            this.center();

            window.setTimeout(function() {
                that.$el
                    .find(that.ui.field)
                    .focus(function() {
                        $(this).select();
                    })
                    .focus();
            }, 1000);
        },
        center: function() {
            var $body    = this.$el.find(this.ui.body);

            $body.css({
                "top": Math.max(0, (($(window).height() - $body.outerHeight()) / 2) + $(window).scrollTop()) + "px",
                "left": Math.max(0, (($(window).width() - $body.outerWidth()) / 2) + $(window).scrollLeft()) + "px"
            });
        },
        getAbsoluteUrl: function(url) {
            var a = document.createElement('a');
            this.getAbsoluteUrl = function(url) {
                a.href=url;
                return a.href;
            }
            return this.getAbsoluteUrl(url);
        }
    });

    return ShareView;
});
