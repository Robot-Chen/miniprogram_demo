var _config = require("./../config.js");

var _config2 = _interopRequireDefault(_config);

var _utils = require("./index.js");

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

//检测微信授权
var checkWxOnline = function checkWxOnline(cb) {
    if ((0, _utils.getWxJwt)() && (0, _utils.getSgmain)()) {
        wx.checkSession({
            success: function success() {
                //session 未过期，并且在本生命周期一直有效
                //判断wxjwt是否存在
                doWxLogin((0, _utils.hasLogin)(), cb);
            },
            fail: function fail() {
                //登录态过期//重新登录
                doWxLogin(false, cb);
            }
        });
    } else {
        doWxLogin((0, _utils.hasLogin)(), cb);
    }
};

var doWxLogin = function doWxLogin(hasWxLogin, cb) {
    if (hasWxLogin) {
        typeof cb == "function" && cb();
    } else {
        if ((0, _utils.getWxUserInfo)()) {
            wx.login({
                success: function success(res) {
                    if (res.code) {
                        var data = {
                            code: res.code,
                            userInfo: (0, _utils.getWxUserInfo)(),
                            libcode: (0, _utils.getLibcodeChoosed)()
                        };
                        wx.showLoading({
                            title: "登录中",
                            mask: true
                        });
                        _config2.default.onWxLogin(data).then(function(res) {
                            wx.hideLoading();
                            if (res.result == 1) {
                                var sgmain = res.data.sgmain;
                                if (sgmain) {
                                    sgmain.chooseLibcode = (0, _utils.getLibcodeChoosed)();
                                    sgmain.curlibcode = (0, _utils.getLibcodeChoosed)();
                                }
                                (0, _utils.setSgmain)(sgmain);
                                (0, _utils.setUkey)(res.data.ukey);
                                if (res.data.curLibcode != (0, _utils.getLibcodeChoosed)()) {
                                    _config2.default.setLibcodeUserChoosed(sgmain);
                                }
                                if (res.data.wxVirtualSucess) {
                                    (0, _utils.setWxVtJwt)(res.data.wxJwt);
                                    (0, _utils.setWxJwt)(res.data.wxJwt);
                                    (0, _utils.setWxVtUserData)(res.data.wxUserData);
                                    (0, _utils.setWxUserData)(res.data.wxUserData);
                                    _wepy2.default.$instance.globalData.userData = res.data.wxUserData;
                                    (0, _utils.setLibinfo)(res.data.libinfo);
                                }
                                // checkWxOnline(cb);
                                                                if (hasWxLogin) {
                                    typeof cb == "function" && cb();
                                } else {
                                    autoLogin(res.data.sgmain, cb);
                                }
                            }
                        });
                    } else {
                        console.log("获取用户登录态失败！" + res.errMsg);
                    }
                }
            });
        }
    }
};

//自动登录
var autoLogin = function autoLogin(sgmain, cb) {
    var params = sgmain;
    params.isRealUser = true;
    params.libcode = (0, _utils.getLibcodeChoosed)();
    _config2.default.autoLogin(params).then(function(res) {
        if (res.result === 1) {
            if (res.bindSize == 1) {
                (0, _utils.setWxJwt)(res.jwt);
                (0, _utils.setWxUserData)(res.userdata);
            }
        }
        typeof cb == "function" && cb();
    });
};

var logout = function logout() {
    console.log("log out");
    (0, _utils.removeWxUserData)();
    var j = (0, _utils.getWxJwt)();
    if (!j) {
        _wepy2.default.redirectTo({
            url: "/mine/pages/myInfo/readerCard/readerCard"
        });
        return;
    }
    _config2.default.logout(j).then(function(res) {
        (0, _utils.removeWxJwt)();
        _wepy2.default.redirectTo({
            url: "/mine/pages/myInfo/readerCard/readerCard"
        });
    });
};

module.exports = {
    checkWxOnline: checkWxOnline,
    logout: logout,
    autoLogin: autoLogin
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNoZWNrV3hPbmxpbmUiLCJjYiIsInd4IiwiY2hlY2tTZXNzaW9uIiwic3VjY2VzcyIsImRvV3hMb2dpbiIsImZhaWwiLCJoYXNXeExvZ2luIiwibG9naW4iLCJyZXMiLCJjb2RlIiwiZGF0YSIsInVzZXJJbmZvIiwibGliY29kZSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiY29uZmlnIiwib25XeExvZ2luIiwidGhlbiIsImhpZGVMb2FkaW5nIiwicmVzdWx0Iiwic2dtYWluIiwiY2hvb3NlTGliY29kZSIsImN1cmxpYmNvZGUiLCJ1a2V5IiwiY3VyTGliY29kZSIsInNldExpYmNvZGVVc2VyQ2hvb3NlZCIsInd4VmlydHVhbFN1Y2VzcyIsInd4Snd0Iiwid3hVc2VyRGF0YSIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidXNlckRhdGEiLCJsaWJpbmZvIiwiYXV0b0xvZ2luIiwiY29uc29sZSIsImxvZyIsImVyck1zZyIsInBhcmFtcyIsImlzUmVhbFVzZXIiLCJiaW5kU2l6ZSIsImp3dCIsInVzZXJkYXRhIiwibG9nb3V0IiwiaiIsInJlZGlyZWN0VG8iLCJ1cmwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxFQUFELEVBQVE7QUFDNUIsTUFBSSwwQkFBYyx1QkFBbEIsRUFBK0I7QUFDN0JDLE9BQUdDLFlBQUgsQ0FBZ0I7QUFDZEMsZUFBUyxtQkFBWTtBQUNuQjtBQUNBO0FBQ0FDLGtCQUFVLHNCQUFWLEVBQXNCSixFQUF0QjtBQUNELE9BTGE7QUFNZEssWUFBTSxnQkFBWTtBQUNoQjtBQUNBRCxrQkFBVSxLQUFWLEVBQWlCSixFQUFqQjtBQUNEO0FBVGEsS0FBaEI7QUFXRCxHQVpELE1BWU87QUFDTEksY0FBVSxzQkFBVixFQUFzQkosRUFBdEI7QUFD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QUNuQlIsVUFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQTtBQUNBLE1BQUlRLElBQUksc0JBQVI7QUFDQSxNQUFJLENBQUNBLENBQUwsRUFBUTtBQUNOZixtQkFBS2dCLFVBQUwsQ0FBZ0I7QUFDZEMsV0FBSztBQURTLEtBQWhCO0FBR0E7QUFDRDs7QUFFRC9CLG1CQUFPNEIsTUFBUCxDQUFjQyxDQUFkLEVBQWlCM0IsSUFBakIsQ0FBc0IsZUFBTztBQUMzQjtBQUNBWSxtQkFBS2dCLFVBQUwsQ0FBZ0I7QUFDZEMsV0FBSztBQURTLEtBQWhCO0FBR0QsR0FMRDtBQU1ELENBakJEOztBQW1CQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmbEQsOEJBRGU7QUFFZjZDLGdCQUZlO0FBR2ZUO0FBSGUsQ0FBakIiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJ0AvY29uZmlnJztcbmltcG9ydCB7Z2V0TGliY29kZUNob29zZWQsIGhhc0xvZ2luLCBnZXRTZ21haW4sIGdldFd4Snd0LGdldFd4VXNlckluZm8sIHNldFNnbWFpbiwgc2V0TGliY29kZUNob29zZWQsIHNldFd4Snd0LHJlbW92ZVd4Snd0LCBzZXRXeFVzZXJEYXRhLHJlbW92ZVd4VXNlckRhdGEsIHNldExpYmluZm8sXG5zZXRVa2V5LCBnZXRVa2V5LCBzZXRXeFZ0Snd0LCBzZXRXeFZ0VXNlckRhdGEsIGNoYW5nZUxpYmNvZGV9IGZyb20gJ0AvdXRpbHMnO1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbi8v5qOA5rWL5b6u5L+h5o6I5p2DXG5jb25zdCBjaGVja1d4T25saW5lID0gKGNiKSA9PiB7XG4gIGlmIChnZXRXeEp3dCgpICYmIGdldFNnbWFpbigpKSB7XG4gICAgd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9zZXNzaW9uIOacqui/h+acn++8jOW5tuS4lOWcqOacrOeUn+WRveWRqOacn+S4gOebtOacieaViFxuICAgICAgICAvL+WIpOaWrXd4and05piv5ZCm5a2Y5ZyoXG4gICAgICAgIGRvV3hMb2dpbihoYXNMb2dpbigpLCBjYilcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v55m75b2V5oCB6L+H5pyfLy/ph43mlrDnmbvlvZVcbiAgICAgICAgZG9XeExvZ2luKGZhbHNlLCBjYilcbiAgICAgIH1cbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGRvV3hMb2dpbihoYXNMb2dpbigpLCBjYilcbiAgfVxufVxuXG5jb25zdCBkb1d4TG9naW4gPSAoaGFzV3hMb2dpbiwgY2IpID0+IHtcbiAgaWYgKGhhc1d4TG9naW4pIHtcbiAgICB0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyAmJiBjYigpXG4gIH0gZWxzZSB7XG4gICAgaWYgKGdldFd4VXNlckluZm8oKSkge1xuICAgICAgd3gubG9naW4oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgICAgIHVzZXJJbmZvOiBnZXRXeFVzZXJJbmZvKCksXG4gICAgICAgICAgICAgIGxpYmNvZGU6IGdldExpYmNvZGVDaG9vc2VkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfnmbvlvZXkuK0nLFxuICAgICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25maWcub25XeExvZ2luKGRhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHQgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBzZ21haW4gPSByZXMuZGF0YS5zZ21haW5cbiAgICAgICAgICAgICAgICBpZiAoc2dtYWluKSB7XG4gICAgICAgICAgICAgICAgICBzZ21haW4uY2hvb3NlTGliY29kZSA9IGdldExpYmNvZGVDaG9vc2VkKClcbiAgICAgICAgICAgICAgICAgIHNnbWFpbi5jdXJsaWJjb2RlID0gZ2V0TGliY29kZUNob29zZWQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRTZ21haW4oc2dtYWluKTtcbiAgICAgICAgICAgICAgICBzZXRVa2V5KHJlcy5kYXRhLnVrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jdXJMaWJjb2RlICE9IGdldExpYmNvZGVDaG9vc2VkKCkpe1xuICAgICAgICAgICAgICAgICAgY29uZmlnLnNldExpYmNvZGVVc2VyQ2hvb3NlZChzZ21haW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEud3hWaXJ0dWFsU3VjZXNzKSB7XG4gICAgICAgICAgICAgICAgICBzZXRXeFZ0Snd0KHJlcy5kYXRhLnd4Snd0KVxuICAgICAgICAgICAgICAgICAgc2V0V3hKd3QocmVzLmRhdGEud3hKd3QpXG4gICAgICAgICAgICAgICAgICBzZXRXeFZ0VXNlckRhdGEocmVzLmRhdGEud3hVc2VyRGF0YSk7XG4gICAgICAgICAgICAgICAgICBzZXRXeFVzZXJEYXRhKHJlcy5kYXRhLnd4VXNlckRhdGEpO1xuICAgICAgICAgICAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHJlcy5kYXRhLnd4VXNlckRhdGE7XG4gICAgICAgICAgICAgICAgICBzZXRMaWJpbmZvKHJlcy5kYXRhLmxpYmluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjaGVja1d4T25saW5lKGNiKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzV3hMb2dpbikge1xuICAgICAgICAgICAgICAgICAgdHlwZW9mIGNiID09IFwiZnVuY3Rpb25cIiAmJiBjYigpXG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgYXV0b0xvZ2luKHJlcy5kYXRhLnNnbWFpbiwgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufTtcblxuXG4vL+iHquWKqOeZu+W9lVxuY29uc3QgYXV0b0xvZ2luID0gKHNnbWFpbiwgY2IpID0+IHtcbiAgbGV0IHBhcmFtcyA9IHNnbWFpbjtcbiAgcGFyYW1zLmlzUmVhbFVzZXIgPSB0cnVlO1xuICBwYXJhbXMubGliY29kZSA9IGdldExpYmNvZGVDaG9vc2VkKCk7XG5cbiAgY29uZmlnLmF1dG9Mb2dpbihwYXJhbXMpLnRoZW4ocmVzID0+IHtcbiAgICBpZiAocmVzLnJlc3VsdCA9PT0gMSkge1xuICAgICAgaWYgKHJlcy5iaW5kU2l6ZSA9PSAxKSB7XG4gICAgICAgIHNldFd4Snd0KHJlcy5qd3QpXG4gICAgICAgIHNldFd4VXNlckRhdGEocmVzLnVzZXJkYXRhKVxuICAgICAgfVxuICAgIH1cbiAgICB0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyAmJiBjYigpXG4gIH0pXG5cbn1cblxuY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZygnbG9nIG91dCcpXG4gIHJlbW92ZVd4VXNlckRhdGEoKVxuICB2YXIgaiA9IGdldFd4Snd0KClcbiAgaWYgKCFqKSB7XG4gICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgIHVybDogJy9taW5lL3BhZ2VzL215SW5mby9yZWFkZXJDYXJkL3JlYWRlckNhcmQnXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbmZpZy5sb2dvdXQoaikudGhlbihyZXMgPT4ge1xuICAgIHJlbW92ZVd4Snd0KClcbiAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgdXJsOiAnL21pbmUvcGFnZXMvbXlJbmZvL3JlYWRlckNhcmQvcmVhZGVyQ2FyZCdcbiAgICB9KVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2hlY2tXeE9ubGluZSxcbiAgbG9nb3V0LFxuICBhdXRvTG9naW5cbn1cbiJdfQ==