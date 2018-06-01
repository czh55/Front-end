'use strict';

var _mm = require('util/mm.js');

var _result = {
    // 获取比赛详细信息
    getResultDetail : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/result/detail.do'),
            data    : {
                competitionId : competitionId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _result;