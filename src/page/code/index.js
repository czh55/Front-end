/*
* @Author: Rosen
* @Date:   2017-06-09 17:05:08
* @Last Modified by:   Rosen
* @Last Modified time: 2017-06-09 19:56:02
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _code          = require('service/code-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        productId : _mm.getUrlParam('productId')
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){

        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        this.bindEvent();
    }, 
    bindEvent : function(){
        var _this = this;
        // 注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
    },
    // 提交表单
    submit : function(){
        
        var form = new FormData(document.getElementById("upload-form"));
        _mm.errorTips(form);
        // 验证成功
        _code.upload(form, function(res){
            // window.location.href = './result.html?type=register';
            _mm.errorTips("123");
        }, function(errMsg){
            // formError.show(errMsg);
            _mm.errorTips("321");
        });
    }
};
$(function(){
    page.init();
});