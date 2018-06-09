'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _application          = require('service/application-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        applicationNumber : _mm.getUrlParam('applicationNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'application-list'
        });
        // 加载detail数据
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.application-cancel', function(){
            if(window.confirm('确实要取消该报名？')){
                _application.cancelApplication(_this.data.applicationNumber, function(res){
                    _mm.successTips('该报名取消成功');
                    _this.loadDetail();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载报名列表
    loadDetail: function(){
        var _this           = this,
            applicationDetailHtml = '',
            $content        = $('.content');
        $content.html('<div class="loading"></div>');
        _application.getApplicationDetail(this.data.applicationNumber, function(res){
            _this.dataFilter(res);
            // 渲染html
            applicationDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(applicationDetailHtml);
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 数据的适配
    dataFilter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
};
$(function(){
    page.init();
});