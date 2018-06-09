
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var templateFloor   = require('./floor.string');
var _mm             = require('util/mm.js');
var _category       = require('service/category-service.js');

$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true//圆点
    }); 


    var listHtml    = '',
        $pList      = $('.p-list');

    // 请求接口
    _category.getAllCategory(function(res){
        listHtml = _mm.renderHtml(templateFloor, {
                list_1 : res.categoryList_1,
                list_2 : res.categoryList_2,
                list_3 : res.categoryList_3,
                list_4 : res.categoryList_4,
                list_5 : res.categoryList_5
            });
        $pList.html(listHtml);
    }, function(errMsg){
        _mm.errorTips(errMsg);
    });
});
