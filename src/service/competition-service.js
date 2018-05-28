'use strict';

var _mm = require('util/mm.js');

var _competition = {
    // 获取商品列表
    getCompetitionList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/competition/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getCompetitionDetail : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/competition/detail.do'),
            data    : {
                competitionId : competitionId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _competition;