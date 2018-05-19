
'use strict';

var _mm = require('util/mm.js');

var _category = {
    // 获取全部的category
    getAllCategory : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/category/get_category_for_index.do'),
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _category;