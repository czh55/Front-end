
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        applicationNumber : _mm.getUrlParam('applicationNumber')
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 加载detail数据
        this.loadPaymentInfo();
    },
    // 加载订单列表
    loadPaymentInfo: function(){
        var _this           = this,
            paymentHtml     = '',
            $pageWrap       = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.applicationNumber, function(res){
            // 渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenApplicationStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 监听订单状态
    listenApplicationStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.applicationNumber, function(res){
                if(res == true){
                    window.location.href 
                        = './result.html?type=payment&applicationNumber=' + _this.data.applicationNumber;
                }
            });
        }, 5e3);
    }
};
$(function(){
    page.init();
});