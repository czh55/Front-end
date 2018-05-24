
'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav             = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        // 比赛的选择 / 取消选择
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            // 取消选中
            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        // 比赛的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            // 全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            // 取消全选
            else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        // 删除单个比赛
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该比赛？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中比赛
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的比赛？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                // 循环查找选中的productIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds
                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的比赛');
                }  
            }
        });
        // 提交收藏夹
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                // 判断是否是相同的sponsor
                _cart.judgeSameSponsorId(function(res){
                    window.location.href = './order-confirm.html';
                }, function(errMsg){
                    _mm.errorTips('不是同一个sponsor，请重新选择');
                })
            }else{
                _mm.errorTips('请选择比赛后再提交');
            }


        });
    },
    // 加载收藏夹信息
    loadCart : function(){
        var _this       = this;
        // 获取收藏夹列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        })
    },
    // 渲染收藏夹
    renderCart : function(data){
        this.filter(data);
        // 缓存收藏夹信息
        this.data.cartInfo = data;
        // 生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 通知导航的收藏夹更新数量
        nav.loadCartCount();
    },
    // 删除指定比赛，支持批量，productId用逗号分割
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    // 数据匹配
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
};
$(function(){
    page.init();
})