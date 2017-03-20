'use strict';

require('should');
var Plugin = require('../index').Plugin;

describe('vtester-core', function() {
    it('build', function() {
        let aa = Plugin.loadPlugin();
        console.log(aa);
    });
});
