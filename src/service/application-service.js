'use strict';
var _mm = require('util/mm.js');

var _application = {
    // 获取比赛列表
    getCompetitionList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/get_application_favourite_competition.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createApplication : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/create.do'),
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getApplicationList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单详情
    getApplicationDetail : function(applicationNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/detail.do'),
            data    : {
                applicationNo : applicationNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelApplication : function(applicationNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/cancel.do'),
            data    : {
                applicationNo : applicationNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _application;