
'use strict';

var _mm = require('util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_competition_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(competitionInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : competitionInfo,
            success : resolve,
            error   : reject
        });
    },
    // 判断是否是相同的sponsor
    judgeSameSponsorId : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/judgeSameSponsorId.do'),
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    selectCompetition : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                competitionId : competitionId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择购物车商品
    unselectCompetition : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                competitionId : competitionId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选中全部商品
    selectAllCompetition : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllCompetition : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量
    updateCompetition : function(competitionInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : competitionInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteCompetition : function(competitionIds, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_competition.do'),
            data    : {
                competitionIds : competitionIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _cart;