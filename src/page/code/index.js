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
        this.loadDetail();
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
        var validateResult = this.formValidate();

        if(validateResult.status){
            var form = new FormData(document.getElementById("upload-form"));
            // _mm.errorTips(form);
            // 验证成功
            _code.upload(form, function(res){
                // window.location.href = './result.html?type=register';
                // _mm.errorTips("");

                var codeInfo = {
                    id              : $.trim($('#id').val()) || '',
                    title           : $.trim($('#title').val()),
                    productId       : _mm.getUrlParam('productId'),
                    src             : res.uri
                };
                _code.saveCode(codeInfo, function(res){
                    //将提交的数据渲染到页面
                    var _this           = this,
                        codeDetailHtml  = '',
                        $content        = $('.code_input');
                    $content.html('<div class="loading"></div>');
                    // 渲染html
                    codeDetailHtml = _mm.renderHtml(templateIndex, codeInfo);
                    $content.html(codeDetailHtml);
                    _mm.successTips("保存成功");
                }, function(errMsg){
                    _mm.errorTips("上传正确，保存数据库错误");
                });
            }, function(errMsg){
                // formError.show(errMsg);
                _mm.errorTips("上传错误");
            });
        }
        else{
            _mm.errorTips(validateResult.msg);
        }
        
    },// 加载数据
    loadDetail: function(){
        var _this           = this,
            codeDetailHtml  = '',
            $content        = $('.code_input');
        $content.html('<div class="loading"></div>');
        // _mm.errorTips(this.data.productId);  
        //这里直传一个productId,userId让服务器端自动获取
        _code.getCodeDetail(this.data.productId, function(res){
            // 渲染html
            codeDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(codeDetailHtml);

            //给from表单也填上值
            // $('#src').val(res.src);
        }, function(errMsg){
            // 渲染html
            codeDetailHtml = _mm.renderHtml(templateIndex);
            $content.html(codeDetailHtml);
            _mm.errorTips("数据为空,请填写");
        });
    },
    // 表单字段的验证
    formValidate : function(){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证title是否为空
        if(!_mm.validate($('#title').val(), 'require')){
            result.msg = 'title不能为空';
            return result;
        }
        // 验证upload是否为空
        if(!_mm.validate($('#upload').val(), 'require')){
            result.msg = 'upload不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});