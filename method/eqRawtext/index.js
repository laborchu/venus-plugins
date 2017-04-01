'use strict';
var Method = require('../method');
var EqRawtextPlugin = module.exports = Method.extend({
	getTemplate:function(config){
        return `function (id,value) {
            var select = require('xpath.js')
                , dom = require('xmldom').DOMParser;
            return this.source()
                .then(res => {
                    var doc = new dom().parseFromString(res);
                    var contentDesc = select(doc, "//node[@resource-id='"+id+"']/@text")[0].value;
                    value.should.equal(contentDesc);
                });
        }`;
	},
	buildParams:function(config){
        return {};
	},
    checkConfig : function(config){
        EqRawtextPlugin.__super__.checkConfig(config);
    }
});