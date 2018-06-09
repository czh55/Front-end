
'use strict';
var _mm = require('util/mm.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo : function(applicationNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/pay.do'),
            data    : {
                applicationNo : applicationNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取订单状态
    getPaymentStatus : function(applicationNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/application/query_application_pay_status.do'),
            data    : {
                applicationNo : applicationNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;