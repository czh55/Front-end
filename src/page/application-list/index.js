
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _application          = require('service/application-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadApplicationList();
        // 初始化左侧菜单
        navSide.init({
            name: 'application-list'
        });
    },
    // 加载报名列表
    loadApplicationList: function(){
        var _this           = this,
            applicationListHtml   = '',
            $listCon        = $('.application-list-con');
        $listCon.html('<div class="loading"></div>');
        _application.getApplicationList(this.data.listParam, function(res){
            // 渲染html
            applicationListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(applicationListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载报名失败，请刷新后重试</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadApplicationList();
            }
        }));
    }
};
$(function(){
    page.init();
});