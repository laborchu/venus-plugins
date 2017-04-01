'use strict';
var Method = require('../method');
var PopCacheElementPlugin = module.exports = Method.extend({
	getTemplate:function(config){
        return `function () {
            if(driver.cacheElements&&driver.cacheElements.length>0){
                return driver.cacheElements.pop();
            }
        }`;
	},
	buildParams:function(config){
        return {};
	},
    checkConfig : function(config){
        PopCacheElementPlugin.__super__.checkConfig(config);
    }
});