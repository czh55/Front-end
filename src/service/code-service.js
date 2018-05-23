/*
* @Author: Rosen
* @Date:   2017-06-06 09:25:41
* @Last Modified by:   Rosen
* @Last Modified time: 2017-06-09 19:49:33
*/

'use strict';
var _mm = require('util/mm.js');

var _code = {
    
    // 创建或更新订单
    saveCode : function(codeInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/code/save.do'),
            data    : codeInfo,
            success : resolve,
            error   : reject
        });
    },
    
    // 获取code详情
    getCodeDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/code/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取code详情
    upload : function(form, resolve, reject){
        // _mm.request({
        //     url     : _mm.getServerUrl('/code/upload.do'),
        //     data    : form,
        //     method  : 'POST',
        //     processData: false, 
        //     contentType : false,
        //     success : resolve,
        //     error   : reject
        // });

        var _this = this;
        $.ajax({
            type        : 'POST',
            url         : _mm.getServerUrl('/code/upload.do'),
            dataType    : 'json',  
            processData : false, 
            contentType : false,
            data        : form,
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof resolve === 'function' && resolve(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof reject === 'function' && reject(res.msg);
                }
            },
            error       : function(err){
                typeof reject === 'function' && reject(err.statusText);
            }
        });
    },
}
module.exports = _code;