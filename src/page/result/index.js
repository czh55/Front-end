
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var applicationNumber  = _mm.getUrlParam('applicationNumber'),
            $applicationNumber = $element.find('.application-number');
        $applicationNumber.attr('href', $applicationNumber.attr('href') + applicationNumber);
    }
    // 显示对应的提示元素
    $element.show();
})