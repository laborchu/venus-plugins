'use strict';
var Path = require('../path');
var should = require('should');
var TapPlugin = module.exports = Path.extend({
    getTemplateName: function(config) {
        let name = null;
        if (config.selector === undefined) {
            name = "element";
        } else if (config.selector == "xpath") {
            name = 'xpath';
        } else if (config.selector == "className") {
            name = 'class-name';
        } else if (config.selector == "name") {
            name = 'name';
        } else if (config.selector == "id") {
            name = 'id';
        }
        if (config.canNull === true) {
            name += "-can-null";
        }
        return name;
    },
    buildParams: function(config) {
        let result = { index: config.index };
        if (config.selector === undefined) {
            return result;
        }
        if (config.selector == "xpath") {
            result.xpath = config.element;
        } else if (config.selector == "className") {
            result.className = config.element;
        } else if (config.selector == "name") {
            result.name = config.element;
        } else if (config.selector == "id") {
            if (config.vtestConfig.platform === "android") {
                result.id = this.getAndroidResId(config, config.element);
            } else {
                result.id = config.element;
            }
        }
        return result;
    },
    checkConfig: function(config) {
        if (config.selector) {
            config.should.have.property('selector').instanceOf(String).ok();
            ['xpath', 'name', 'className', 'id'].should.containEql(config.selector);
        }
        if (config.element) {
            config.should.have.property('element').instanceOf(String).ok();
        }
        if (config.canNull !== undefined) {
            config.canNull.should.instanceOf(Boolean);
        }
        if (config.index !== undefined) {
            config.index.should.instanceOf(Number);
        } else {
            config.index = 1;
        }
        TapPlugin.__super__.checkConfig(config);
    }
});
