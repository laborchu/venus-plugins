'use strict';

require('should');
var Plugin = require('../index').Plugin;

describe('vtester-core', function() {
    it('build', function() {
        let aa = Plugin.loadPlugin("/Users/laborc/code/gitos/gitosx16/k12/k12-fsc-android-vtester");
        console.log(aa);
    });
});
