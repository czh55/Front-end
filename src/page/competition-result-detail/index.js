
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _result        = require('service/result-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        competitionId : _mm.getUrlParam('competitionId') || '',
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        // 如果没有传competitionId, 自动跳回首页
        if(!this.data.competitionId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    // 加载结果详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _result.getResultDetail(this.data.competitionId, function(res){
            // render
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此比赛太淘气，找不到了</p>');
        });
    }
};
$(function(){
    page.init();
})