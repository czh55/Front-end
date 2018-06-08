'use strict';
var _mm = require('util/mm.js');

var _order = {
    // 获取比赛列表
    getCompetitionList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_favourite_competition.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;