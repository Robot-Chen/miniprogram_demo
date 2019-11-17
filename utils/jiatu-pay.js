Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.callPayInfo = callPayInfo;

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require("./../config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function callPayInfo(param, cb, fcb) {
    _wepy2.default.showLoading({
        title: "正在请求支付信息，请稍后"
    });
    _config2.default.getPayInfo(param).then(function(res) {
        _wepy2.default.hideLoading();
        if (res.result == 1) {
            if (res.data == "free") {
                wx.showModal({
                    title: "提醒",
                    content: "借阅成功！参加了免费活动，您无需支付。",
                    showCancel: false,
                    confirmColor: "#009eff",
                    success: function success(res) {
                        if (res.confirm) {
                            typeof cb == "function" && cb();
                        }
                    }
                });
                return;
            } else {
                topay(res.data, cb, fcb);
            }
        } else {
            var msg = res.error_msg;
            if (msg == "") {
                msg = "支付失败";
            }
            wx.showModal({
                title: "提醒",
                content: msg,
                showCancel: false,
                confirmColor: "#009eff"
            });
        }
    }).catch(function() {
        _wepy2.default.hideLoading();
    });
}

function topay(successData, cb, fcb) {
    wx.requestPayment({
        timeStamp: successData.timeStamp,
        nonceStr: successData.nonceStr,
        package: successData.package,
        signType: successData.signType,
        paySign: successData.paySign,
        success: function success(resPay) {
            if ("requestPayment:ok" == resPay.errMsg) {
                typeof cb == "function" && cb();
            }
        },
        fail: function fail(resPay) {
            var content = resPay.errMsg;
            if ("requestPayment:fail cancel" == resPay.errMsg) {
                content = "您已取消付款";
            }
            wx.showModal({
                title: "提示",
                showCancel: false,
                content: content,
                confirmColor: "#009eff",
                success: function success(showRes) {
                    if (showRes.confirm) {
                        typeof fcb == "function" && fcb();
                    }
                }
            });
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImppYXR1LXBheS5qcyJdLCJuYW1lcyI6WyJjYWxsUGF5SW5mbyIsInBhcmFtIiwiY2IiLCJmY2IiLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImNvbmZpZyIsImdldFBheUluZm8iLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJyZXN1bHQiLCJkYXRhIiwid3giLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNvbmZpcm1Db2xvciIsInN1Y2Nlc3MiLCJjb25maXJtIiwidG9wYXkiLCJtc2ciLCJlcnJvcl9tc2ciLCJjYXRjaCIsInN1Y2Nlc3NEYXRhIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJyZXNQYXkiLCJlcnJNc2ciLCJmYWlsIiwic2hvd1JlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFHZ0JBLFcsR0FBQUEsVzs7QUFIaEI7Ozs7QUFDQTs7Ozs7O0FBRU8sU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBMkJDLEVBQTNCLEVBQThCQyxHQUE5QixFQUFtQztBQUN4Q0MsaUJBQUtDLFdBQUwsQ0FBaUI7QUFDZkMsV0FBTztBQURRLEdBQWpCO0FBR0FDLG1CQUFPQyxVQUFQLENBQWtCUCxLQUFsQixFQUF5QlEsSUFBekIsQ0FBOEIsZUFBTztBQUNuQ0wsbUJBQUtNLFdBQUw7QUFDQSxRQUFJQyxJQUFJQyxNQUFKLElBQWMsQ0FBbEIsRUFBcUI7QUFDbkIsVUFBSUQsSUFBSUUsSUFBSixJQUFZLE1BQWhCLEVBQXdCO0FBQ3RCQyxXQUFHQyxTQUFILENBQWE7QUFDWFQsaUJBQU8sSUFESTtBQUVYVSxtQkFBUyxxQkFGRTtBQUdYQyxzQkFBVyxLQUhBO0FBSVhDLHdCQUFjLFNBSkg7QUFLWEMsbUJBQVMsc0JBQU87QUFDZCxnQkFBSVIsSUFBSVMsT0FBUixFQUFpQjtBQUNmLHFCQUFPbEIsRUFBUCxJQUFhLFVBQWIsSUFBMkJBLElBQTNCO0FBQ0Q7QUFDRjtBQVRVLFNBQWI7QUFXQTtBQUNELE9BYkQsTUFhTztBQUNMbUIsY0FBTVYsSUFBSUUsSUFBVixFQUFlWCxFQUFmLEVBQWtCQyxHQUFsQjtBQUNEO0FBQ0YsS0FqQkQsTUFpQk87QUFDTCxVQUFJbUIsTUFBTVgsSUFBSVksU0FBZDtBQUNBLFVBQUlELE9BQU8sRUFBWCxFQUFlO0FBQ2JBLGNBQU0sTUFBTjtBQUNEO0FBQ0RSLFNBQUdDLFNBQUgsQ0FBYTtBQUNYVCxlQUFPLElBREk7QUFFWFUsaUJBQVNNLEdBRkU7QUFHWEwsb0JBQVcsS0FIQTtBQUlYQyxzQkFBYztBQUpILE9BQWI7QUFNRDtBQUNGLEdBL0JELEVBK0JHTSxLQS9CSCxDQStCUyxZQUFNO0FBQ2JwQixtQkFBS00sV0FBTDtBQUNELEdBakNEO0FBa0NEOztBQUdELFNBQVNXLEtBQVQsQ0FBZUksV0FBZixFQUEyQnZCLEVBQTNCLEVBQThCQyxHQUE5QixFQUFtQztBQUNqQ1csS0FBR1ksY0FBSCxDQUFrQjtBQUNoQkMsZUFBV0YsWUFBWUUsU0FEUDtBQUVoQkMsY0FBVUgsWUFBWUcsUUFGTjtBQUdoQkMsYUFBU0osWUFBWUksT0FITDtBQUloQkMsY0FBVUwsWUFBWUssUUFKTjtBQUtoQkMsYUFBU04sWUFBWU0sT0FMTDtBQU1oQlosYUFBUyx5QkFBVTtBQUNqQixVQUFJLHVCQUF1QmEsT0FBT0MsTUFBbEMsRUFBMEM7QUFDeEMsZUFBTy9CLEVBQVAsSUFBYSxVQUFiLElBQTJCQSxJQUEzQjtBQUNEO0FBQ0YsS0FWZTtBQVdoQmdDLFVBQU0sc0JBQVU7QUFDZCxVQUFJbEIsVUFBVWdCLE9BQU9DLE1BQXJCO0FBQ0EsVUFBSSxnQ0FBZ0NELE9BQU9DLE1BQTNDLEVBQW1EO0FBQ2pEakIsa0JBQVUsUUFBVjtBQUNEO0FBQ0RGLFNBQUdDLFNBQUgsQ0FBYTtBQUNYVCxlQUFPLElBREk7QUFFWFcsb0JBQVksS0FGRDtBQUdYRCxpQkFBU0EsT0FIRTtBQUlYRSxzQkFBYyxTQUpIO0FBS1hDLGlCQUFTLGlCQUFVZ0IsT0FBVixFQUFtQjtBQUMxQixjQUFJQSxRQUFRZixPQUFaLEVBQXFCO0FBQ25CLG1CQUFPakIsR0FBUCxJQUFjLFVBQWQsSUFBNEJBLEtBQTVCO0FBQ0Q7QUFDRjtBQVRVLE9BQWI7QUFXRDtBQTNCZSxHQUFsQjtBQTZCRCIsImZpbGUiOiJqaWF0dS1wYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAL2NvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsUGF5SW5mbyhwYXJhbSxjYixmY2IpIHtcbiAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgdGl0bGU6ICfmraPlnKjor7fmsYLmlK/ku5jkv6Hmga/vvIzor7fnqI3lkI4nXG4gIH0pXG4gIGNvbmZpZy5nZXRQYXlJbmZvKHBhcmFtKS50aGVuKHJlcyA9PiB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpO1xuICAgIGlmIChyZXMucmVzdWx0ID09IDEpIHtcbiAgICAgIGlmIChyZXMuZGF0YSA9PSAnZnJlZScpIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOmGkicsXG4gICAgICAgICAgY29udGVudDogJ+WAn+mYheaIkOWKn++8geWPguWKoOS6huWFjei0uea0u+WKqO+8jOaCqOaXoOmcgOaUr+S7mOOAgicsXG4gICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZSxcbiAgICAgICAgICBjb25maXJtQ29sb3I6ICcjMDA5ZWZmJyxcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nICYmIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvcGF5KHJlcy5kYXRhLGNiLGZjYilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1zZyA9IHJlcy5lcnJvcl9tc2dcbiAgICAgIGlmIChtc2cgPT0gJycpIHtcbiAgICAgICAgbXNnID0gJ+aUr+S7mOWksei0pSdcbiAgICAgIH1cbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q6YaSJyxcbiAgICAgICAgY29udGVudDogbXNnLFxuICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxuICAgICAgICBjb25maXJtQ29sb3I6ICcjMDA5ZWZmJyxcbiAgICAgIH0pXG4gICAgfVxuICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgd2VweS5oaWRlTG9hZGluZygpXG4gIH0pXG59XG5cblxuZnVuY3Rpb24gdG9wYXkoc3VjY2Vzc0RhdGEsY2IsZmNiKSB7XG4gIHd4LnJlcXVlc3RQYXltZW50KHtcbiAgICB0aW1lU3RhbXA6IHN1Y2Nlc3NEYXRhLnRpbWVTdGFtcCxcbiAgICBub25jZVN0cjogc3VjY2Vzc0RhdGEubm9uY2VTdHIsXG4gICAgcGFja2FnZTogc3VjY2Vzc0RhdGEucGFja2FnZSxcbiAgICBzaWduVHlwZTogc3VjY2Vzc0RhdGEuc2lnblR5cGUsXG4gICAgcGF5U2lnbjogc3VjY2Vzc0RhdGEucGF5U2lnbixcbiAgICBzdWNjZXNzOiByZXNQYXkgPT4ge1xuICAgICAgaWYgKCdyZXF1ZXN0UGF5bWVudDpvaycgPT0gcmVzUGF5LmVyck1zZykge1xuICAgICAgICB0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyAmJiBjYigpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZmFpbDogcmVzUGF5ID0+IHtcbiAgICAgIGxldCBjb250ZW50ID0gcmVzUGF5LmVyck1zZ1xuICAgICAgaWYgKCdyZXF1ZXN0UGF5bWVudDpmYWlsIGNhbmNlbCcgPT0gcmVzUGF5LmVyck1zZykge1xuICAgICAgICBjb250ZW50ID0gJ+aCqOW3suWPlua2iOS7mOasvidcbiAgICAgIH1cbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgIGNvbmZpcm1Db2xvcjogJyMwMDllZmYnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoc2hvd1Jlcykge1xuICAgICAgICAgIGlmIChzaG93UmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHR5cGVvZiBmY2IgPT0gJ2Z1bmN0aW9uJyAmJiBmY2IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuIl19