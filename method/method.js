'use strict';
var Plugin = require('../plugin');
var Method = module.exports = Plugin.extend({
});
Method.prototype.checkConfig = function(config){
	Method.__super__.checkConfig(config);
};