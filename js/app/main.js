require.config({
    baseUrl: "js/app",
    paths: {
        backbone: "../../bower_components/backbone/backbone-min",
        "backbone.radio": "../../bower_components/backbone.radio/build/backbone.radio",
        css: "../../bower_components/require-css/css",
        handlebars: "../../bower_components/handlebars/handlebars.min",
        hbs: "../../bower_components/require-handlebars-plugin/hbs",
        jquery: "../../bower_components/jquery/dist/jquery.min",
        marionette: "../../bower_components/backbone.marionette/lib/backbone.marionette.min",
        text: "../../bower_components/requirejs-text/text",
        underscore: "../../bower_components/underscore/underscore-min"
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
