
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _competition        = require('service/competition-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        competitionId : _mm.getUrlParam('competitionId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传competitionId, 自动跳回首页
        if(!this.data.competitionId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // 加入收藏夹
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                competitionId   : _this.data.competitionId,
                //数量定义为1
                count       : 1
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载比赛详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _competition.getCompetitionDetail(this.data.competitionId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // render
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此比赛太淘气，找不到了</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})