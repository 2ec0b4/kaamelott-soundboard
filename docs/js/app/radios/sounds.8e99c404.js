define("radios/sounds.8e99c404",function(require){"use strict";var n,e=require("marionette"),t=require("backbone.radio"),i=require("collections/sounds.8bb5d10e");return n=e.Object.extend({initialize:function(){this.channel=t.channel("Sounds"),this.channel.reply("getSounds",this.getSounds.bind(this))},getSounds:function(){var n=new i;return n.fetch()}})});