require.config({
    baseUrl: "/js/app",
    paths: {
        backbone: "../../node_modules/backbone/backbone-min",
        "backbone.radio": "../../node_modules/backbone.radio/build/backbone.radio",
        css: "../../node_modules/require-css/css",
        handlebars: "../../node_modules/handlebars/dist/handlebars.min",
        hbs: "../../node_modules/require-handlebars-plugin/hbs",
        jquery: "../../node_modules/jquery/dist/jquery.min",
        likely: "../../node_modules/ilyabirman-likely/release/likely",
        marionette: "../../node_modules/backbone.marionette/lib/backbone.marionette.min",
        text: "../../node_modules/requirejs-text/text",
        underscore: "../../node_modules/underscore/underscore-min"
    },
    shim: {
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        hbs: {
            deps: ["handlebars", "underscore"],
            templateExtension: "hbs",
            "hbs/handlebars": "handlebars",
            "hbs/underscore": "underscore"
        },
        marionette: {
            deps: ["backbone"]
        }
    }
});

define(function(require) {
    "use strict";

    var App = require("app");

    new App();
});
