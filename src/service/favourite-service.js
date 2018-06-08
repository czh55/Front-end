
'use strict';

var _mm = require('util/mm.js');

var _favourite = {
    // 获取收藏夹数量
    getFavouriteCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/get_favourite_competition_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到收藏夹
    addToFavourite : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/add.do'),
            data    : {
                competitionId : competitionId
            },
            success : resolve,
            error   : reject
        });
    },
    // 判断是否是相同的sponsor
    judgeSameSponsorId : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/judgeSameSponsorId.do'),
            success : resolve,
            error   : reject
        });
    },
    // 获取收藏夹列表
    getFavouriteList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 选择收藏夹商品
    selectCompetition : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/select.do'),
            data    : {
                competitionId : competitionId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选择收藏夹商品
    unselectCompetition : function(competitionId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/un_select.do'),
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
            url     : _mm.getServerUrl('/favourite/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选中全部商品
    unselectAllCompetition : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新收藏夹商品数量
    updateCompetition : function(competitionInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/update.do'),
            data    : competitionInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除指定商品
    deleteCompetition : function(competitionIds, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/favourite/delete_competition.do'),
            data    : {
                competitionIds : competitionIds
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _favourite;