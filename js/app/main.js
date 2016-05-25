requirejs.config({
    baseUrl: 'js/app',
    urlArgs:'t=20160525',
    paths: {
        'backbone': '/js/vendor/backbone/backbone-min',
        'backbone.radio': '/js/vendor/backbone/plugins/backbone.radio/backbone.radio.min',
        'hbs': '/js/vendor/require/plugins/require-handlebars-plugin/hbs',
        'jquery': '/js/vendor/jquery/jquery-1.12.2.min',
        'likely': '/js/vendor/likely/likely',
        'marionette': '/js/vendor/marionette/backbone.marionette.min',
        'underscore': '/js/vendor/underscore/underscore-min'
    },
    hbs: {
        "templateExtension": "hbs",
        "hbs/underscore": "underscore"
    },
    shim: {
        'likely' : {
            exports: 'likely'
        },
        'marionette' : {
            deps: ['jquery', 'backbone', 'underscore']
        }
    }
});
