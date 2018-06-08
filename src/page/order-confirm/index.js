'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm                 = require('util/mm.js');
var _order              = require('service/order-service.js');
var templateCompetition     = require('./competition-list.string');

var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCompetitionList();
    },
    bindEvent : function(){
        var _this = this;
        // 订单的提交
        $(document).on('click', '.order-submit', function(){
            _order.createOrder(
            function(res){
                window.location.href = './payment.html?orderNumber=' + res.orderNo;
            }, function(errMsg){
                _mm.errorTips(errMsg)
            });
        });
        
    },
    // 加载比赛清单
    loadCompetitionList : function(){
        var _this       = this;
        $('.competition-con').html('<div class="loading"></div>');
        // 获取比赛列表
        _order.getCompetitionList(function(res){
            var competitionListHtml = _mm.renderHtml(templateCompetition, res);
            $('.competition-con').html(competitionListHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg+",请删去后重新提交");
            $('.competition-con').html('<p class="err-tip">比赛信息加载失败，请刷新后重试</p>');
        })
    },
};
$(function(){
    page.init();
})