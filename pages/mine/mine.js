Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _wepy = require("./../../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require("./../../utils/index.js");

var _login = require("./../../utils/login.js");

var _config = require("./../../config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var app = _wepy2.default.$instance;

var libcodes = [ "sanya", "0000", "002", "baoding", "bjhaidian", "bjmentougou", "changchun", "CQL", "dingzhou", "dongguan", "eerguna", "FNQ", "fujianshaoer", "G12", "guizhou", "GZYX", "hainan", "hbcangzhou", "hengshui", "HT", "JNT", "liaoning", "LJZ", "MAS", "qinhuangdao", "SDLL", "shijiazhuang", "ST", "tianjinkonggang", "tongliao", "UN0001", "WF", "wj", "wuzhishan", "WZT", "xuanhua", "YT", "zhaoqing" ];

var Mine = function(_wepy$page) {
    _inherits(Mine, _wepy$page);
    function Mine() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Mine);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "我的"
        }, _this.data = {
            hasLogin: false,
            canIUse: _wepy2.default.canIUse("button.open-type.getUserInfo"),
            serviceTel: "400-836-7300",
            messageCount: 0,
            configData: {
                showYuYue: false,
                //预约
                showCoupon: false,
                //优惠券
                showOrder: false,
                //我的订单
                showHistory: false,
                //历史借阅
                showDebt: false,
                showHelp: false,
                showRecommendBook: false
            },
            showWxLogin: false,
            userData: null,
            isvip: false,
            openVipModel: false,
            vipData: {}
        }, _this.paramData = {
            sgmain: ""
        }, _temp), _possibleConstructorReturn(_this, _ret)
        /**
   * 页面配置
   */;
    }
    _createClass(Mine, [ {
        key: "onShow",
        value: function onShow() {
            //埋点
            var that = this;
            app.$wxapp.aldstat.sendEvent("我的");
            this.serviceTel = app.configData.commonConfig.serviceTel;
            this.showWxLogin = false;
            this.configData = {
                showYuYue: false,
                //预约
                showCoupon: false,
                //优惠券
                showOrder: false,
                //我的订单
                showHistory: false,
                //历史借阅
                showDebt: false
            };
            if ((0, _utils.getSgmain)() && ((0, _utils.getWxVtJwt)() || (0, _utils.getWxJwt)())) {
                this.hasLogin = (0, _utils.hasLogin)();
                (0, _login.autoLogin)((0, _utils.getSgmain)(), function() {
                    that.userData = (0, _utils.getWxUserData)();
                });
                this.dataInit();
            } else {
                that.getWxUserInfo();
            }
        }
    }, {
        key: "onHide",
        value: function onHide() {
            //埋点
            app.$wxapp.aldstat.sendEvent("我的退出");
        }
    }, {
        key: "getWxUserInfo",
        value: function getWxUserInfo() {
            var that = this;
            wx.getSetting({
                success: function success(res) {
                    if (res.authSetting["scope.userInfo"] === true) {
                        wx.getUserInfo({
                            success: function success(res) {
                                app.globalData.userInfo = res;
                                (0, _utils.setWxUserInfo)(res);
                                (0, _login.checkWxOnline)(function(res) {
                                    that.dataInit();
                                    that.hasLogin = (0, _utils.hasLogin)();
                                    that.userData = (0, _utils.getWxUserData)();
                                });
                            }
                        });
                    } else {
                        that.showWxLogin = true;
                        that.$apply();
                    }
                }
            });
        }
    }, {
        key: "bindGetUserInfo",
        value: function bindGetUserInfo(e) {
            var _this2 = this;
            app.globalData.userInfo = e.detail.userInfo;
            (0, _utils.setWxUserInfo)(e.detail.userInfo);
            this.showWxLogin = false;
            (0, _login.checkWxOnline)(function(res) {
                _this2.dataInit();
                _this2.userData = (0, _utils.getWxUserData)();
                _this2.hasLogin = (0, _utils.hasLogin)();
            });
        }
    }, {
        key: "openjinli",
        value: function openjinli(e) {
            this.openVipModel = true;
        }
    }, {
        key: "closejinli",
        value: function closejinli(e) {
            this.openVipModel = false;
        }
    }, {
        key: "checkVip",
        value: function checkVip(e) {
            var _this3 = this;
            _config2.default.checkVip().then(function(res) {
                if (res.success == 1) {
                    _this3.isvip = true;
                    _this3.vipData.title = res.data.title;
                    _this3.vipData.summary = res.data.summary;
                    _this3.vipData.equity = res.data.equity;
                    _this3.vipData.endTime = _this3.timestamptoData(res.data.endTime);
                    _this3.vipData.bookJpgs = res.data.bookJpgs;
                } else {
                    _this3.isvip = false;
                }
                _this3.$apply();
            });
        }
    }, {
        key: "timestamptoData",
        value: function timestamptoData(number) {
            var n = number;
            var date = new Date(n);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = date.getDate();
            d = d < 10 ? "0" + d : d;
            var h = date.getHours();
            h = h < 10 ? "0" + h : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
            return y + "-" + m + "-" + d;
        }
        //页面跳转
        }, {
        key: "toPage",
        value: function toPage(e) {
            var type = e.currentTarget.dataset.type;
            if (!(0, _utils.hasLogin)() && type != "help" && type != "set") {
                _wepy2.default.navigateTo({
                    url: "/mine/pages/myInfo/readerCard/readerCard"
                });
            } else if (type == "help") {
                var url = "https://cdn.jieshu.me/resource/html/help/" + (0, _utils.getLibcodeChoosed)() + ".html";
                var urlStr = "/pages/webView/webView?url=" + url + "&title=帮助与客服";
                _wepy2.default.navigateTo({
                    url: urlStr
                });
            } else if (type == "set") {
                _wepy2.default.navigateTo({
                    url: "/mine/pages/myInfo/setting/setting"
                });
            } else {
                switch (type) {
                  case "toMyInfo":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("头像");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/myInfo/readerCard/readerCard"
                    });
                    break;

                  case "favorite":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("我的收藏");
                    _wepy2.default.navigateTo({
                        url: "/class/pages/books/books?type=4"
                    });
                    break;

                  case "message":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("我的消息");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/message/message"
                    });
                    break;

                  case "currentBorrow":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("当前借阅");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/currentBorrow/currentBorrow"
                    });
                    break;

                  case "borrowHistory":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("历史借阅");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/borrowHistory/borrowHistory"
                    });
                    break;

                  case "eCard":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("我的电子证");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/eCard/eCard"
                    });
                    break;

                  case "currentPackage":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("我的包裹");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/currentPackage/currentPackage"
                    });
                    break;

                  case "myOrder":
                    //埋点
                    app.$wxapp.aldstat.sendEvent("我的订单");
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/myOrder/myOrder"
                    });
                    break;

                  case "myCoupon":
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/myCoupon/myCoupon"
                    });
                    break;

                  case "returnBook":
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/returnBookNew/returnBookNew"
                    });
                    break;

                  case "address":
                    if ((0, _utils.getLibcodeChoosed)() == "wj") {
                        _wepy2.default.navigateTo({
                            url: "/mine/pages/myInfo/wjAddress/wjAddress?type=0"
                        });
                    } else {
                        _wepy2.default.navigateTo({
                            url: "/mine/pages/myInfo/address/address?type=0"
                        });
                    }
                    break;

                  case "arrearage":
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/myInfo/arrearage/arrearage"
                    });
                    break;

                  case "integral":
                    //https://devb.jieshu.me/jieshu/interalStore/integralHome
                    var url = "https://alipay.jieshu.me/jieshu/interalStore/integralHome";
                    _wepy2.default.navigateTo({
                        url: "/pages/webView/webView?type=2&title=积分商城&url=" + url
                    });
                    break;

                  case "activity":
                    //https://devb.jieshu.me/jieshu/ks/ksActView
                    var url = "https://alipay.jieshu.me/jieshu/ks/ksActView";
                    _wepy2.default.navigateTo({
                        url: "/pages/webView/webView?type=3&title=活动模块&url=" + url
                    });
                    break;

                  case "recommendBook":
                    _wepy2.default.navigateTo({
                        url: "/mine/pages/recommendList/recommendList"
                    });
                    break;

                  default:
                    break;
                }
            }
        }
    }, {
        key: "dataInit",
        value: function dataInit() {
            this.getCollectionMessageTotal();
            var commonConfig = app.configData.commonConfig;
            var showMenus = commonConfig.showMenus;
            if (showMenus.reserveEMS || showMenus.sposter || showMenus.fetchFromHome) {
                this.configData.showYuYue = true;
            }
            if (libcodes.find(function(n) {
                return n == (0, _utils.getLibcodeChoosed)();
            })) {
                this.configData.showHelp = true;
            }
            //我的优惠券
                        if (showMenus.coupon) {
                this.configData.showCoupon = true;
            }
            if (showMenus.sendToHome) {
                this.configData.showOrder = true;
            }
            if (showMenus.historyBorrow) {
                this.configData.showHistory = true;
            }
            if (showMenus.myDebt) {
                this.configData.showDebt = true;
            }
            if (showMenus.integralMall) {
                this.configData.integralMall = true;
            }
            if (showMenus.recommendbook) {
                this.configData.showRecommendBook = true;
            }
            this.checkVip();
        }
        //新消息数量
        }, {
        key: "getCollectionMessageTotal",
        value: function getCollectionMessageTotal() {
            var _this4 = this;
            _config2.default.getSpecialCounts({
                userId: app.globalData.userData.userId
            }).then(function(res) {
                if (res.result == 1) {
                    _this4.collectionCount = res.data.FavoritesCount;
                    _this4.messageCount = res.data.NotificationCount;
                } else {
                    console.log("消息和收藏数量!");
                    _this4.collectionCount = 0;
                    _this4.messageCount = 0;
                }
                _this4.$apply();
            });
        }
        //拨打客服电话
        }, {
        key: "makePhone",
        value: function makePhone() {
            //埋点
            app.$wxapp.aldstat.sendEvent("客服电话");
            _wepy2.default.makePhoneCall({
                phoneNumber: this.serviceTel
            });
        }
    }, {
        key: "cancalGetUserInfo",
        value: function cancalGetUserInfo() {
            _wepy2.default.switchTab({
                url: "/pages/home/home"
            });
        }
    } ]);
    return Mine;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Mine, "pages/mine/mine"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiYXBwIiwid2VweSIsIiRpbnN0YW5jZSIsImxpYmNvZGVzIiwiTWluZSIsImNvbmZpZyIsImRhdGEiLCJoYXNMb2dpbiIsImNhbklVc2UiLCJzZXJ2aWNlVGVsIiwibWVzc2FnZUNvdW50IiwiY29uZmlnRGF0YSIsInNob3dZdVl1ZSIsInNob3dDb3Vwb24iLCJzaG93T3JkZXIiLCJzaG93SGlzdG9yeSIsInNob3dEZWJ0Iiwic2hvd0hlbHAiLCJzaG93UmVjb21tZW5kQm9vayIsInNob3dXeExvZ2luIiwidXNlckRhdGEiLCJpc3ZpcCIsIm9wZW5WaXBNb2RlbCIsInZpcERhdGEiLCJwYXJhbURhdGEiLCJzZ21haW4iLCJ0aGF0IiwiJHd4YXBwIiwiYWxkc3RhdCIsInNlbmRFdmVudCIsImNvbW1vbkNvbmZpZyIsImRhdGFJbml0IiwiZ2V0V3hVc2VySW5mbyIsInd4IiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJyZXMiLCJhdXRoU2V0dGluZyIsImdldFVzZXJJbmZvIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiJGFwcGx5IiwiZSIsImRldGFpbCIsImNoZWNrVmlwIiwidGhlbiIsInRpdGxlIiwic3VtbWFyeSIsImVxdWl0eSIsImVuZFRpbWUiLCJ0aW1lc3RhbXB0b0RhdGEiLCJib29rSnBncyIsIm51bWJlciIsIm4iLCJkYXRlIiwiRGF0ZSIsInkiLCJnZXRGdWxsWWVhciIsIm0iLCJnZXRNb250aCIsImQiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJ0eXBlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidXJsU3RyIiwiZ2V0Q29sbGVjdGlvbk1lc3NhZ2VUb3RhbCIsInNob3dNZW51cyIsInJlc2VydmVFTVMiLCJzcG9zdGVyIiwiZmV0Y2hGcm9tSG9tZSIsImZpbmQiLCJjb3Vwb24iLCJzZW5kVG9Ib21lIiwiaGlzdG9yeUJvcnJvdyIsIm15RGVidCIsImludGVncmFsTWFsbCIsInJlY29tbWVuZGJvb2siLCJnZXRTcGVjaWFsQ291bnRzIiwidXNlcklkIiwicmVzdWx0IiwiY29sbGVjdGlvbkNvdW50IiwiRmF2b3JpdGVzQ291bnQiLCJOb3RpZmljYXRpb25Db3VudCIsImNvbnNvbGUiLCJsb2ciLCJtYWtlUGhvbmVDYWxsIiwicGhvbmVOdW1iZXIiLCJzd2l0Y2hUYWIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNQyxlQUFLQyxTQUFqQjtBQUNBLElBQU1DLFdBQVcsQ0FBQyxPQUFELEVBQVMsTUFBVCxFQUFpQixLQUFqQixFQUF3QixTQUF4QixFQUFtQyxXQUFuQyxFQUFnRCxhQUFoRCxFQUErRCxXQUEvRCxFQUE0RSxLQUE1RSxFQUFtRixVQUFuRixFQUErRixVQUEvRixFQUEyRyxTQUEzRyxFQUFzSCxLQUF0SCxFQUE2SCxjQUE3SCxFQUE2SSxLQUE3SSxFQUFvSixTQUFwSixFQUErSixNQUEvSixFQUF1SyxRQUF2SyxFQUFpTCxZQUFqTCxFQUErTCxVQUEvTCxFQUEyTSxJQUEzTSxFQUFpTixLQUFqTixFQUF3TixVQUF4TixFQUFvTyxLQUFwTyxFQUEyTyxLQUEzTyxFQUFrUCxhQUFsUCxFQUFpUSxNQUFqUSxFQUF5USxjQUF6USxFQUF5UixJQUF6UixFQUErUixpQkFBL1IsRUFBa1QsVUFBbFQsRUFBOFQsUUFBOVQsRUFBd1UsSUFBeFUsRUFBOFUsSUFBOVUsRUFBb1YsV0FBcFYsRUFBaVcsS0FBalcsRUFBd1csU0FBeFcsRUFBbVgsSUFBblgsRUFBeVgsVUFBelgsQ0FBakI7O0lBQ3FCQyxJOzs7Ozs7Ozs7Ozs7OztrTEFJbkJDLE0sR0FBUztBQUNQLGdDQUEwQjtBQURuQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSxLQURMO0FBRUxDLGVBQVNQLGVBQUtPLE9BQUwsQ0FB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RSxZQUFMLEdBQW9CLENBQXBCO0FBQ0Q7QUFDRCxlQUFLK0IsTUFBTDtBQUNELE9BVkQ7QUFXRDtBQUNEOzs7O2dDQUNZO0FBQ1Y7QUFDQXpDLFVBQUkyQixNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLFNBQW5CLENBQThCLE1BQTlCO0FBQ0E1QixxQkFBSzZGLGFBQUwsQ0FBbUI7QUFDakJDLHFCQUFhLEtBQUt0RjtBQURELE9BQW5CO0FBR0Q7Ozt3Q0FDbUI7QUFDbEJSLHFCQUFLK0YsU0FBTCxDQUFlLEVBQUN4QixLQUFLLGtCQUFOLEVBQWY7QUFDRDs7OztFQWhVK0J2RSxlQUFLZ0csSTs7a0JBQWxCN0YsSSIsImZpbGUiOiJtaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQge2hhc0xvZ2luLCBnZXRTZ21haW4sIGdldFd4VnRKd3QsIGdldFd4Snd0LCBzZXRXeFVzZXJJbmZvLGdldFd4VXNlckRhdGEsIGdldExpYmNvZGVDaG9vc2VkfSBmcm9tICdAL3V0aWxzJztcbmltcG9ydCB7Y2hlY2tXeE9ubGluZSwgYXV0b0xvZ2lufSBmcm9tICdAL3V0aWxzL2xvZ2luJztcbmltcG9ydCBjb25maWcgZnJvbSAnQC9jb25maWcnO1xuXG5jb25zdCBhcHAgPSB3ZXB5LiRpbnN0YW5jZTtcbmNvbnN0IGxpYmNvZGVzID0gW1wic2FueWFcIixcIjAwMDBcIiwgXCIwMDJcIiwgXCJiYW9kaW5nXCIsIFwiYmpoYWlkaWFuXCIsIFwiYmptZW50b3Vnb3VcIiwgXCJjaGFuZ2NodW5cIiwgXCJDUUxcIiwgXCJkaW5nemhvdVwiLCBcImRvbmdndWFuXCIsIFwiZWVyZ3VuYVwiLCBcIkZOUVwiLCBcImZ1amlhbnNoYW9lclwiLCBcIkcxMlwiLCBcImd1aXpob3VcIiwgXCJHWllYXCIsIFwiaGFpbmFuXCIsIFwiaGJjYW5nemhvdVwiLCBcImhlbmdzaHVpXCIsIFwiSFRcIiwgXCJKTlRcIiwgXCJsaWFvbmluZ1wiLCBcIkxKWlwiLCBcIk1BU1wiLCBcInFpbmh1YW5nZGFvXCIsIFwiU0RMTFwiLCBcInNoaWppYXpodWFuZ1wiLCBcIlNUXCIsIFwidGlhbmppbmtvbmdnYW5nXCIsIFwidG9uZ2xpYW9cIiwgXCJVTjAwMDFcIiwgXCJXRlwiLCBcIndqXCIsIFwid3V6aGlzaGFuXCIsIFwiV1pUXCIsIFwieHVhbmh1YVwiLCBcIllUXCIsIFwiemhhb3FpbmdcIl1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvKipcbiAgICog6aG16Z2i6YWN572uXG4gICAqL1xuICBjb25maWcgPSB7XG4gICAgJ25hdmlnYXRpb25CYXJUaXRsZVRleHQnOiAn5oiR55qEJ1xuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgaGFzTG9naW46IGZhbHNlLFxuICAgIGNhbklVc2U6IHdlcHkuY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxuICAgIHNlcnZpY2VUZWw6ICc0MDAtODM2LTczMDAnLFxuICAgIG1lc3NhZ2VDb3VudDogMCxcbiAgICBjb25maWdEYXRhOiB7XG4gICAgICBzaG93WXVZdWU6IGZhbHNlLC8v6aKE57qmXG4gICAgICBzaG93Q291cG9uOiBmYWxzZSwvL+S8mOaDoOWIuFxuICAgICAgc2hvd09yZGVyOiBmYWxzZSwvL+aIkeeahOiuouWNlVxuICAgICAgc2hvd0hpc3Rvcnk6IGZhbHNlLC8v5Y6G5Y+y5YCf6ZiFXG4gICAgICBzaG93RGVidDpmYWxzZSxcbiAgICAgIHNob3dIZWxwOmZhbHNlLFxuICAgICAgc2hvd1JlY29tbWVuZEJvb2s6ZmFsc2VcbiAgICB9LFxuICAgIHNob3dXeExvZ2luOiBmYWxzZSxcbiAgICB1c2VyRGF0YTogbnVsbCxcbiAgICBpc3ZpcDpmYWxzZSxcbiAgICBvcGVuVmlwTW9kZWw6ZmFsc2UsXG4gICAgdmlwRGF0YTp7XG5cbiAgICB9XG4gIH07XG5cbiAgcGFyYW1EYXRhID0ge1xuICAgIHNnbWFpbjogJydcbiAgfVxuXG4gIG9uU2hvdygpIHtcbiAgICAvL+Wfi+eCuVxuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIGFwcC4kd3hhcHAuYWxkc3RhdC5zZW5kRXZlbnQoICfmiJHnmoQnICk7XG4gICAgdGhpcy5zZXJ2aWNlVGVsID0gYXBwLmNvbmZpZ0RhdGEuY29tbW9uQ29uZmlnLnNlcnZpY2VUZWw7XG4gICAgdGhpcy5zaG93V3hMb2dpbiA9IGZhbHNlO1xuICAgIHRoaXMuY29uZmlnRGF0YSA9IHtcbiAgICAgIHNob3dZdVl1ZTogZmFsc2UsLy/pooTnuqZcbiAgICAgIHNob3dDb3Vwb246IGZhbHNlLC8v5LyY5oOg5Yi4XG4gICAgICBzaG93T3JkZXI6IGZhbHNlLC8v5oiR55qE6K6i5Y2VXG4gICAgICBzaG93SGlzdG9yeTogZmFsc2UsLy/ljoblj7LlgJ/pmIVcbiAgICAgIHNob3dEZWJ0OmZhbHNlXG4gICAgfVxuICAgIGlmIChnZXRTZ21haW4oKSAmJiAoZ2V0V3hWdEp3dCgpIHx8IGdldFd4Snd0KCkpKSB7XG4gICAgICB0aGlzLmhhc0xvZ2luID0gaGFzTG9naW4oKTtcbiAgICAgIGF1dG9Mb2dpbihnZXRTZ21haW4oKSxmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQudXNlckRhdGEgPSBnZXRXeFVzZXJEYXRhKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZGF0YUluaXQoKTtcbiAgICB9IGVsc2V7XG4gICAgICB0aGF0LmdldFd4VXNlckluZm8oKTtcbiAgICB9XG4gIH1cblxuICBvbkhpZGUoKSB7XG4gICAgLy/ln4vngrlcbiAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5oiR55qE6YCA5Ye6JyApO1xuICB9XG5cbiAgZ2V0V3hVc2VySW5mbygpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddID09PSB0cnVlKSB7XG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXM7XG4gICAgICAgICAgICAgIHNldFd4VXNlckluZm8ocmVzKTtcbiAgICAgICAgICAgICAgY2hlY2tXeE9ubGluZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoYXQuZGF0YUluaXQoKTtcbiAgICAgICAgICAgICAgICB0aGF0Lmhhc0xvZ2luID0gaGFzTG9naW4oKTtcbiAgICAgICAgICAgICAgICB0aGF0LnVzZXJEYXRhID0gZ2V0V3hVc2VyRGF0YSgpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoYXQuc2hvd1d4TG9naW4gPSB0cnVlO1xuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBiaW5kR2V0VXNlckluZm8oZSkge1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm87XG4gICAgc2V0V3hVc2VySW5mbyhlLmRldGFpbC51c2VySW5mbyk7XG4gICAgdGhpcy5zaG93V3hMb2dpbiA9IGZhbHNlO1xuICAgIGNoZWNrV3hPbmxpbmUocmVzID0+IHtcbiAgICAgIHRoaXMuZGF0YUluaXQoKTtcbiAgICAgIHRoaXMudXNlckRhdGEgPSBnZXRXeFVzZXJEYXRhKCk7XG4gICAgICB0aGlzLmhhc0xvZ2luID0gaGFzTG9naW4oKTtcbiAgICB9KVxuICB9XG5cbiAgb3BlbmppbmxpKGUpe1xuICAgIHRoaXMub3BlblZpcE1vZGVsID0gdHJ1ZTtcbiAgfVxuXG4gIGNsb3NlamlubGkoZSl7XG4gICAgdGhpcy5vcGVuVmlwTW9kZWwgPSBmYWxzZTtcbiAgfVxuXG4gIGNoZWNrVmlwKGUpe1xuICAgIGNvbmZpZy5jaGVja1ZpcCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3VjY2VzcyA9PSAxKSB7XG4gICAgICAgIHRoaXMuaXN2aXAgPSB0cnVlO1xuICAgICAgICB0aGlzLnZpcERhdGEudGl0bGUgPSByZXMuZGF0YS50aXRsZTtcbiAgICAgICAgdGhpcy52aXBEYXRhLnN1bW1hcnkgPSByZXMuZGF0YS5zdW1tYXJ5O1xuICAgICAgICB0aGlzLnZpcERhdGEuZXF1aXR5ID0gcmVzLmRhdGEuZXF1aXR5O1xuICAgICAgICB0aGlzLnZpcERhdGEuZW5kVGltZSA9IHRoaXMudGltZXN0YW1wdG9EYXRhKHJlcy5kYXRhLmVuZFRpbWUpO1xuICAgICAgICB0aGlzLnZpcERhdGEuYm9va0pwZ3MgPSByZXMuZGF0YS5ib29rSnBncztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXN2aXAgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG5cbiAgdGltZXN0YW1wdG9EYXRhKG51bWJlcil7XG4gICAgdmFyIG4gPSBudW1iZXI7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShuKTtcbiAgICB2YXIgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgbSA9IG0gPCAxMCA/ICgnMCcgKyBtKSA6IG07XG4gICAgdmFyIGQgPSBkYXRlLmdldERhdGUoKTtcbiAgICBkID0gZCA8IDEwID8gKCcwJyArIGQpIDogZDtcbiAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBoID0gaCA8IDEwID8gKCcwJyArIGgpIDogaDtcbiAgICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgdmFyIHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgIG1pbnV0ZSA9IG1pbnV0ZSA8IDEwID8gKCcwJyArIG1pbnV0ZSkgOiBtaW51dGU7XG4gICAgc2Vjb25kID0gc2Vjb25kIDwgMTAgPyAoJzAnICsgc2Vjb25kKSA6IHNlY29uZDtcbiAgICByZXR1cm4geSsnLScrIG0gKyAnLScgKyBkO1xuICB9XG5cbiAgLy/pobXpnaLot7PovaxcbiAgdG9QYWdlKGUpIHtcbiAgICBsZXQgdHlwZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnR5cGU7XG4gICAgaWYgKCFoYXNMb2dpbigpICYmIHR5cGUgIT0naGVscCcmJiB0eXBlICE9J3NldCcpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9taW5lL3BhZ2VzL215SW5mby9yZWFkZXJDYXJkL3JlYWRlckNhcmQnXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZih0eXBlID09ICdoZWxwJyl7XG4gICAgICB2YXIgdXJsID0gXCJodHRwczovL2Nkbi5qaWVzaHUubWUvcmVzb3VyY2UvaHRtbC9oZWxwL1wiK2dldExpYmNvZGVDaG9vc2VkKCkrXCIuaHRtbFwiO1xuICAgICAgdmFyIHVybFN0ciA9ICcvcGFnZXMvd2ViVmlldy93ZWJWaWV3P3VybD0nICsgdXJsKycmdGl0bGU95biu5Yqp5LiO5a6i5pyNJztcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogdXJsU3RyXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZih0eXBlPT0nc2V0Jyl7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvbWluZS9wYWdlcy9teUluZm8vc2V0dGluZy9zZXR0aW5nJ1xuICAgICAgfSlcbiAgICB9IGVsc2V7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAndG9NeUluZm8nOlxuICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+WktOWDjycgKTtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvbXlJbmZvL3JlYWRlckNhcmQvcmVhZGVyQ2FyZCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmF2b3JpdGUnOlxuICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+aIkeeahOaUtuiXjycgKTtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL2NsYXNzL3BhZ2VzL2Jvb2tzL2Jvb2tzP3R5cGU9NCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgICAgLy/ln4vngrlcbiAgICAgICAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5oiR55qE5raI5oGvJyApO1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6Jy9taW5lL3BhZ2VzL21lc3NhZ2UvbWVzc2FnZSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3VycmVudEJvcnJvdyc6XG4gICAgICAgICAgLy/ln4vngrlcbiAgICAgICAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5b2T5YmN5YCf6ZiFJyApO1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcvbWluZS9wYWdlcy9jdXJyZW50Qm9ycm93L2N1cnJlbnRCb3Jyb3cnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2JvcnJvd0hpc3RvcnknOlxuICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+WOhuWPsuWAn+mYhScgKTtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvYm9ycm93SGlzdG9yeS9ib3Jyb3dIaXN0b3J5J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlQ2FyZCc6XG4gICAgICAgICAgLy/ln4vngrlcbiAgICAgICAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5oiR55qE55S15a2Q6K+BJyApO1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcvbWluZS9wYWdlcy9lQ2FyZC9lQ2FyZCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3VycmVudFBhY2thZ2UnOlxuICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+aIkeeahOWMheijuScgKTtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvY3VycmVudFBhY2thZ2UvY3VycmVudFBhY2thZ2UnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ215T3JkZXInOlxuICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+aIkeeahOiuouWNlScgKTtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvbXlPcmRlci9teU9yZGVyJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdteUNvdXBvbic6XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy9taW5lL3BhZ2VzL215Q291cG9uL215Q291cG9uJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXR1cm5Cb29rJzpcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvcmV0dXJuQm9va05ldy9yZXR1cm5Cb29rTmV3J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGRyZXNzJzpcbiAgICAgICAgICBpZiAoZ2V0TGliY29kZUNob29zZWQoKSA9PSAnd2onKSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcvbWluZS9wYWdlcy9teUluZm8vd2pBZGRyZXNzL3dqQWRkcmVzcz90eXBlPTAnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvbXlJbmZvL2FkZHJlc3MvYWRkcmVzcz90eXBlPTAnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYXJyZWFyYWdlJzpcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnL21pbmUvcGFnZXMvbXlJbmZvL2FycmVhcmFnZS9hcnJlYXJhZ2UnXG4gICAgICAgICAgfSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW50ZWdyYWwnOlxuICAgICAgICAgIC8vaHR0cHM6Ly9kZXZiLmppZXNodS5tZS9qaWVzaHUvaW50ZXJhbFN0b3JlL2ludGVncmFsSG9tZVxuICAgICAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vYWxpcGF5LmppZXNodS5tZS9qaWVzaHUvaW50ZXJhbFN0b3JlL2ludGVncmFsSG9tZVwiO1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvd2ViVmlldy93ZWJWaWV3P3R5cGU9MiZ0aXRsZT3np6/liIbllYbln44mdXJsPScrdXJsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FjdGl2aXR5JzpcbiAgICAgICAgICAvL2h0dHBzOi8vZGV2Yi5qaWVzaHUubWUvamllc2h1L2tzL2tzQWN0Vmlld1xuICAgICAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vYWxpcGF5LmppZXNodS5tZS9qaWVzaHUva3Mva3NBY3RWaWV3XCI7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy93ZWJWaWV3L3dlYlZpZXc/dHlwZT0zJnRpdGxlPea0u+WKqOaooeWdlyZ1cmw9Jyt1cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVjb21tZW5kQm9vayc6XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy9taW5lL3BhZ2VzL3JlY29tbWVuZExpc3QvcmVjb21tZW5kTGlzdCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZGF0YUluaXQoKSB7XG4gICAgdGhpcy5nZXRDb2xsZWN0aW9uTWVzc2FnZVRvdGFsKCk7XG4gICAgbGV0IGNvbW1vbkNvbmZpZyA9IGFwcC5jb25maWdEYXRhLmNvbW1vbkNvbmZpZztcbiAgICBsZXQgc2hvd01lbnVzID0gY29tbW9uQ29uZmlnLnNob3dNZW51cztcbiAgICBpZiAoc2hvd01lbnVzLnJlc2VydmVFTVMgfHwgc2hvd01lbnVzLnNwb3N0ZXIgfHxzaG93TWVudXMuZmV0Y2hGcm9tSG9tZSl7XG4gICAgICB0aGlzLmNvbmZpZ0RhdGEuc2hvd1l1WXVlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGxpYmNvZGVzLmZpbmQoKG4pID0+IG4gPT0gZ2V0TGliY29kZUNob29zZWQoKSkpIHtcbiAgICAgIHRoaXMuY29uZmlnRGF0YS5zaG93SGVscCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy/miJHnmoTkvJjmg6DliLhcbiAgICBpZiAoc2hvd01lbnVzLmNvdXBvbikge1xuICAgICAgdGhpcy5jb25maWdEYXRhLnNob3dDb3Vwb24gPSB0cnVlO1xuICAgIH1cbiAgICBpZihzaG93TWVudXMuc2VuZFRvSG9tZSl7XG4gICAgICB0aGlzLmNvbmZpZ0RhdGEuc2hvd09yZGVyID0gdHJ1ZVxuICAgIH1cbiAgICBpZihzaG93TWVudXMuaGlzdG9yeUJvcnJvdyl7XG4gICAgICB0aGlzLmNvbmZpZ0RhdGEuc2hvd0hpc3RvcnkgPSB0cnVlO1xuICAgIH1cbiAgICBpZihzaG93TWVudXMubXlEZWJ0KXtcbiAgICAgIHRoaXMuY29uZmlnRGF0YS5zaG93RGVidCA9IHRydWVcbiAgICB9XG4gICAgaWYoc2hvd01lbnVzLmludGVncmFsTWFsbCl7XG4gICAgICB0aGlzLmNvbmZpZ0RhdGEuaW50ZWdyYWxNYWxsID0gdHJ1ZVxuICAgIH1cbiAgICBpZiAoc2hvd01lbnVzLnJlY29tbWVuZGJvb2spIHtcbiAgICAgIHRoaXMuY29uZmlnRGF0YS5zaG93UmVjb21tZW5kQm9vayA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5jaGVja1ZpcCgpO1xuICB9XG4gIC8v5paw5raI5oGv5pWw6YePXG4gIGdldENvbGxlY3Rpb25NZXNzYWdlVG90YWwoKSB7XG4gICAgY29uZmlnLmdldFNwZWNpYWxDb3VudHMoe3VzZXJJZDogYXBwLmdsb2JhbERhdGEudXNlckRhdGEudXNlcklkfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5yZXN1bHQgPT0gMSkge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25Db3VudCA9IHJlcy5kYXRhLkZhdm9yaXRlc0NvdW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2VDb3VudCA9IHJlcy5kYXRhLk5vdGlmaWNhdGlvbkNvdW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+a2iOaBr+WSjOaUtuiXj+aVsOmHjyEnKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uQ291bnQgPSAwO1xuICAgICAgICB0aGlzLm1lc3NhZ2VDb3VudCA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICAvL+aLqOaJk+WuouacjeeUteivnVxuICBtYWtlUGhvbmUoKSB7XG4gICAgLy/ln4vngrlcbiAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5a6i5pyN55S16K+dJyApO1xuICAgIHdlcHkubWFrZVBob25lQ2FsbCh7XG4gICAgICBwaG9uZU51bWJlcjogdGhpcy5zZXJ2aWNlVGVsXG4gICAgfSlcbiAgfVxuICBjYW5jYWxHZXRVc2VySW5mbygpIHtcbiAgICB3ZXB5LnN3aXRjaFRhYih7dXJsOiAnL3BhZ2VzL2hvbWUvaG9tZSd9KTtcbiAgfVxufVxuIl19