'use strict';
var Method = require('../method');
var GetContentDescPlugin = module.exports = Method.extend({
	getTemplate:function(config){
        return `function () {
            var select = require('xpath.js')
                , dom = require('xmldom').DOMParser;
            <%if (platform == 'android') {%>
            return this.source()
                .then(res => {
                    var doc = new dom().parseFromString(res);
                    var contentDesc = select(doc, "//node[@resource-id='android:id/content']/@content-desc")[0].value;
                    return JSON.parse(contentDesc);
                });
            <%}else if (platform == 'ios') {%>
                return this.elementById("id_ios-window").getProperty("value").then(desc=>JSON.parse(desc));
            <%}%>
        }`;
	},
	buildParams:function(config){
        return {platform:config.vtestConfig.platform};
	},
    checkConfig : function(config){
        GetContentDescPlugin.__super__.checkConfig(config);
    }
});