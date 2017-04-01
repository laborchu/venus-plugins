'use strict';
var _ = require('lodash');
var should = require('should');
let fs = require('fs');
let path = require('path');
var Plugin = module.exports = function(){

};
Plugin.prototype.init = function(name,pluginFolder){
    this.name = name;
	this.pluginFolder = pluginFolder;
};

Plugin.prototype.getTemplate = function(config){
    return "";
};
Plugin.prototype.getTemplateName = function(config){
    return "";
};
Plugin.prototype.buildParams = function(config){
	throw new Error("please override buildParams function");
};
Plugin.prototype.build = function(config){
    /********load template start********/
    let tempName = this.getTemplateName(config);
    let tempContent = null;
    if(typeof tempName === "string"&&tempName.length>0){
        tempContent = ""+fs.readFileSync(path.join(this.pluginFolder, this.name,tempName+".ms"));
    }else{
        tempContent = this.getTemplate(config);
    }
    if(typeof tempContent !== "string"||tempContent.length===0){
        throw new Error("template must be a string type and not null");
    }
    /********load template start********/
    var compiled = _.template(tempContent);
    if(config.vtestConfig.platform==="android"){
    	config.context = config.context || 'navite';
    }
    return compiled(this.buildParams(config));
};
Plugin.prototype.checkConfig = function(config){
    if (config.hasOwnProperty('context')) {
    	['navite','webview'].should.containEql(config.context);
    }
    if (config.hasOwnProperty('sleep')) {
        should(config.sleep).instanceOf(Number);
    }
};
Plugin.prototype.getAndroidResId = function(config,resId){
	if(resId.indexOf(":id/")!=-1||'webview'==config.context){
		return resId;
	}else{
		return `${config.vtestConfig.package}:id/${resId}`;
	}
    
};

let plugins = {
    "path":{},
    "checker":{},
    "method":{},
};
let _loadPlugin = function(pluginPath){
    for(let cat of Object.keys(plugins)){
        var pluginFolder = path.join(pluginPath, cat);
        var pluginFiles = fs.readdirSync(pluginFolder);
        for(let filename of pluginFiles){
            var filePath = path.join(pluginFolder, filename);
            if (fs.lstatSync(filePath).isDirectory()) {
                var pluginFile = path.join(filePath, "index.js");
                if (fs.existsSync(pluginFile)) {
                    var Plugin = require(pluginFile);
                    var plugin = new Plugin();
                    plugin.init(filename,pluginFolder);
                    plugins[cat][filename] = plugin;
                }
            }
        }
    }
};

Plugin.loadPlugin = function(selfPluginPath){
    _loadPlugin(__dirname);
    if(selfPluginPath){
        _loadPlugin(path.join(selfPluginPath,"plugins"));
    }
    return plugins;
};
Plugin.extend = require('class-extend').extend;