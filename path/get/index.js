'use strict';
var Path = require('../path');
var should = require('should');
var GetPlugin = module.exports = Path.extend({
    getTemplateName:function(config){
        if(config.selector == "id") {
            if(config.index!==undefined){
                return "index";
            }else if(config.filter){
                return "filter";
            }else{
                return "no-filter";
            }
        }
    },
	buildParams:function(config){
		if(config.selector == "id"){
            var cacheElement = config.cacheElement||false;
            var cacheDesc = config.cacheDesc||false;
            var mode = config.mode||'first';
            var error = config.error||'';
			 if(config.vtestConfig.platform==="android"||config.vtestConfig.platform==="ios"){
                var result = { 
                    'mode':mode, 
                    'filter':null, 
                    'error':error, 
                    'cacheElement':cacheElement,
                    'cacheDesc':cacheDesc,
                    'cacheTarget':config.cacheTarget,
                    'isExp':false,
                    'index':config.index
                };
                if(config.vtestConfig.platform==="android"){
                    result.id = this.getAndroidResId(config,config.element);
                }else{
                    result.id = config.element;
                }
                if(config.filter){
                    result.filter = config.filter;
                    if (typeof config.filter.value === 'string' || config.filter.value instanceof String){
                        if(config.filter.value.startsWith("${")&&config.filter.value.endsWith("}")){
                            result.isExp = true;
                            result.filter.value = config.filter.value.replace("${","").replace("}","");
                        }
                    }
                }
                return result;
            }else{
                return { 'id': config.element, 'value': config.value};
            }
		}
	},
    checkConfig : function(config){
        config.should.have.property('selector').instanceOf(String).ok();
        config.should.have.property('element').instanceOf(String).ok();
        if (config.selector !== 'id') {
            throw new Error('config.selector should in (id)');
        }
        if (config.cacheElement !== undefined) {
            config.should.have.property('cacheElement').instanceOf(Boolean);
        }
        if (config.cacheDesc !== undefined) {
            config.should.have.property('cacheDesc').instanceOf(Boolean);
            if(config.cacheDesc){
                if(config.vtestConfig.platform==="android"){
                    config.cacheTarget = 'description';
                }else if(config.vtestConfig.platform==="ios"){
                    config.cacheTarget = 'value';
                }
            }
        }
        if(config.filter){
            config.filter.should.have.property('op').instanceOf(String);
            config.filter.should.have.property('value');
            ['==', '>','in','!='].should.containEql(config.filter.op);
            if (config.filter.target) {
                ['description', 'text','value'].should.containEql(config.filter.target);
            }else{
                if(config.vtestConfig.platform==="android"){
                    config.filter.target = 'description';
                }else if(config.vtestConfig.platform==="ios"){
                    config.filter.target = 'value';
                }
            }
        }
        if(config.mode){
            ['first', 'last'].should.containEql(config.mode);
        }
        if(config.index){
            config.index.should.instanceOf(Number);
        }
        GetPlugin.__super__.checkConfig(config);
    }
});