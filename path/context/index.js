'use strict';
var Path = require('../path');
var should = require('should');
var ContextPlugin = module.exports = Path.extend({
    getTemplateName: function(config) {
        if (config.target === "native") {
            return 'native';
        } else if (config.target === "webview"){
            if (config.vtestConfig.platform === "ios") {
                return 'webview-ios';
            } else if (config.vtestConfig.platform === "android"){
                return 'webview-android';
            }
        }
    },
    buildParams: function(config) {
        return {};
    },
    checkConfig: function(config) {
        config.should.have.property('target').instanceOf(String);
        ['native', 'webview'].should.containEql(config.target);
        ContextPlugin.__super__.checkConfig(config);
    }
});
