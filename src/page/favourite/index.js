
'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav             = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _favourite      = require('service/favourite-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadFavourite();
    },
    bindEvent : function(){
        var _this = this;
        // 比赛的选择 / 取消选择
        $(document).on('click', '.favourite-select', function(){
            var $this = $(this),
                competitionId = $this.parents('.favourite-table').data('competition-id');
            // 选中
            if($this.is(':checked')){
                _favourite.selectCompetition(competitionId, function(res){
                    _this.renderFavourite(res);
                }, function(errMsg){
                    _this.showFavouriteError();
                });
            }
            // 取消选中
            else{
                _favourite.unselectCompetition(competitionId, function(res){
                    _this.renderFavourite(res);
                }, function(errMsg){
                    _this.showFavouriteError();
                });
            }
        });
        // 比赛的全选 / 取消全选
        $(document).on('click', '.favourite-select-all', function(){
            var $this = $(this);
            // 全选
            if($this.is(':checked')){
                _favourite.selectAllCompetition(function(res){
                    _this.renderFavourite(res);
                }, function(errMsg){
                    _this.showFavouriteError();
                });
            }
            // 取消全选
            else{
                _favourite.unselectAllCompetition(function(res){
                    _this.renderFavourite(res);
                }, function(errMsg){
                    _this.showFavouriteError();
                });
            }
        });
        // 删除单个比赛
        $(document).on('click', '.favourite-delete', function(){
            if(window.confirm('确认要删除该比赛？')){
                var competitionId = $(this).parents('.favourite-table')
                    .data('competition-id');
                _this.deleteFavouriteCompetition(competitionId);
            }
        });
        // 删除选中比赛
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的比赛？')){
                var arrCompetitionIds = [],
                    $selectedItem = $('.favourite-select:checked');
                // 循环查找选中的competitionIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrCompetitionIds
                        .push($($selectedItem[i]).parents('.favourite-table').data('competition-id'));
                }
                if(arrCompetitionIds.length){
                    _this.deleteFavouriteCompetition(arrCompetitionIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的比赛');
                }  
            }
        });
        // 提交收藏夹
        $(document).on('click', '.btn-submit', function(){
            // 获取收藏夹列表,判断是否在选中的比赛中存在名额不足的情况
            _favourite.getFavouriteList(function(res){
                var flag = 1;
                for(var index in res.favouriteCompetitionVoList){
                    var temp = res.favouriteCompetitionVoList[index];
                    //只判断选中，且名额为0的比赛
                    if(temp.competitionChecked == 1 && temp.competitionStock == 0 ){
                        _mm.errorTips(temp.competitionName+'名额不足，请重新选择');
                        flag = 0;
                        break;
                    }
                }
                //只有在名额都充足的情况下才检查下面
                if(flag == 1){
                    // 总价大于0，进行提交
                    if(_this.data.favouriteInfo && _this.data.favouriteInfo.favouriteTotalPrice > 0){
                        // 判断是否是相同的sponsor
                        _favourite.judgeSameSponsorId(function(res){
                            
                            window.location.href = './application-confirm.html';
                        }, function(errMsg){
                            _mm.errorTips('不是同一个sponsor，请重新选择');
                        })
                    }else{
                        _mm.errorTips('请选择比赛后再提交');
                    }
                }
            }, function(errMsg){
                _this.showFavouriteError();
            })    
        });
    },
    // 加载收藏夹信息
    loadFavourite : function(){
        var _this       = this;
        // 获取收藏夹列表
        _favourite.getFavouriteList(function(res){
            _this.renderFavourite(res);
        }, function(errMsg){
            _this.showFavouriteError();
        })
    },
    // 渲染收藏夹
    renderFavourite : function(data){
        this.filter(data);
        // 缓存收藏夹信息
        this.data.favouriteInfo = data;
        // 生成HTML
        var favouriteHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(favouriteHtml);
        // 通知导航的收藏夹更新数量
        nav.loadFavouriteCount();
    },
    // 删除指定比赛，支持批量，competitionId用逗号分割
    deleteFavouriteCompetition : function(competitionIds){
        var _this = this;
        _favourite.deleteCompetition(competitionIds, function(res){
            _this.renderFavourite(res);
        }, function(errMsg){
            _this.showFavouriteError();
        });
    },
    // 数据匹配
    filter : function(data){
        data.notEmpty = !!data.favouriteCompetitionVoList.length;
    },
    // 显示错误信息
    showFavouriteError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
};
$(function(){
    page.init();
})