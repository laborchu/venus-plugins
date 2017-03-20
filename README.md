# vtester-plugins

vtester插件，包括path和checker两类插件，分别在相应的目录下面

##path插件
完成一个测试节点的操作路径，比如**测试新增用户**这个测试节点，需要经过【点击新增按钮】->【输入用户名】->【输入密码】->【点击保存】等操作，这些就是path路径，而path插件就是完成这些操作的插件，比如有click插件(点击的插件)，input插件(输入的插件)

##checker插件
用于验证路径是否按照预期执行，比如路径【点击新增按钮】这个path，可以在这个path里面放入一个checker插件来是否导航到正确的页面

##自定义插件
可以在自己的项目中建一个plugins目录，分别再建path和checker目录来存放相应的插件

###插件
自定义插件需要继承PathPlugin和CheckerPlugin，并且实现getTemplate,buildParams和checkConfig三个方法

####getTemplate or getTemplateName
模板语法请参考[lodash.template](https://lodash.com/docs/4.17.4#template)。模板有以下两种方式

- getTemplate 直接返回模板字符串
- getTemplateName 返回模板文件名，在插件目录下需要建【文件名.ms】文本文件存放模板

####buildParams
构建模板的参数

####checkConfig
验证插件的配置

####Path插件例子

```javascript
'use strict';
var PathPlugin = require('vtester-plugins').PathPlugin;
var should = require('should');
var InputPlugin = module.exports = PathPlugin.extend({
	getTemplate:function(config){
		if (config.target == "dismiss") {
            return '.dismissAlert()';
		}else if(config.target == "accept"){
            return '.acceptAlert()';
		}
	},
	buildParams:function(config){
		return {};
	},
    checkConfig : function(config){
        config.should.have.property('target').instanceOf(String).ok();
        ['dismiss', 'accept'].should.containEql(config.target);
        InputPlugin.__super__.checkConfig(config);
    }
});
```