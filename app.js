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

var _wepy = require("./npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

require("./npm/wepy-async-function/index.js");

var _network = require("./network/index.js");

var _network2 = _interopRequireDefault(_network);

var _interceptor = require("./network/interceptor.js");

var interceptor = _interopRequireWildcard(_interceptor);

var _wepyRedux = require("./npm/wepy-redux/lib/index.js");

var _store = require("./store/index.js");

var _store2 = _interopRequireDefault(_store);

var _config = require("./config.js");

var _config2 = _interopRequireDefault(_config);

require("./utils/ald-stat.js");

var _utils = require("./utils/index.js");

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

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

var store = (0, _store2.default)();

(0, _wepyRedux.setStore)(store);

var _default = function(_wepy$app) {
    _inherits(_default, _wepy$app);
    function _default() {
        _classCallCheck(this, _default);
        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));
        _this.config = {
            navigationBarTitleText: "嘉图借书",
            pages: [ "pages/home/home", "pages/class/class", "pages/bookshelf/bookshelf", "pages/mine/mine", "pages/webView/webView" ],
            subPackages: [ {
                root: "home/",
                name: "home",
                pages: [ "pages/search/search", "pages/slider/slider", "pages/bookList/bookList", "pages/bookInfo/bookInfo", "pages/bookListDetail/bookListDetail", "pages/transit/transit", "pages/scan/scan", "pages/scanborrow/scanborrow", "pages/activity/tellsHome/tellsHome", "pages/activity/tellsUpload/tellsUpload", "pages/activity/tellsWorks/tellsWorks", "pages/activity/myWorks/myWorks", "pages/activity/tellsDetail/tellsDetail", "pages/nightbeat/photoHome/photoHome", "pages/nightbeat/photoList/photoList", "pages/nightbeat/photoWork/photoWork", "pages/borrowbook/borrowbook" ]
            }, {
                root: "class/",
                name: "class",
                pages: [ "pages/editclass/editclass", "pages/books/books", "pages/recommendbook/recommendbook" ]
            }, {
                root: "bookshelf/",
                name: "bookshelf",
                pages: [ "pages/settlement/settlement", "pages/settlementSuccess/settlementSuccess", "pages/success/success", "pages/webviewPay/webviewPay" ]
            }, {
                root: "mine/",
                name: "mine",
                pages: [ "pages/message/message", "pages/eCard/eCard", "pages/currentPackage/currentPackage", "pages/myHisPackage/myHisPackage", "pages/currentBorrow/currentBorrow", "pages/borrowHistory/borrowHistory", "pages/myOrder/myOrder", "pages/logistics/logistics", "pages/myInfo/mobile/mobile", "pages/myInfo/address/address", "pages/myInfo/address/addAddress/addAddress", "pages/myInfo/address/updateAddress/updateAddress", "pages/myInfo/wjAddress/wjAddress", "pages/myInfo/wjAddress/ziTiAddress/ziTiAddress", "pages/myInfo/wjAddress/updateAddress/updateAddress", "pages/myInfo/readerCard/readerCard", "pages/myInfo/readerCard/bindForm/bindForm", "pages/myInfo/readerCard/onlineCard/onlineCard", "pages/myInfo/arrearage/arrearage", "pages/myInfo/setting/setting", "pages/myCoupon/myCoupon", "pages/returnBook/returnBook", "pages/returnBookNew/returnBookNew", "pages/returnBookNew/emsreturnbook/emsreturnbook", "pages/returnBookNew/createOrder/createOrder", "pages/returnBookNew/resvSuccess/resvSuccess", "pages/returnBookNew/returnHistory/returnHistory", "pages/returnBookNew/resvOrderInfo/resvOrderInfo", "pages/recommendList/recommendList" ]
            } ],
            preloadRule: {
                "pages/home/home": {
                    network: "all",
                    packages: [ "home", "class", "bookshelf", "mine" ]
                },
                "pages/class/class": {
                    network: "all",
                    packages: [ "home", "class", "bookshelf", "mine" ]
                },
                "pages/mine/mine": {
                    network: "all",
                    packages: [ "home", "class", "bookshelf", "mine" ]
                },
                "pages/bookshelf/bookshelf": {
                    network: "all",
                    packages: [ "home", "class", "bookshelf", "mine" ]
                }
            },
            permission: {
                "scope.userLocation": {
                    desc: "你的位置信息将用于小程序位置接口的效果展示"
                }
            },
            window: {
                backgroundTextStyle: "dark",
                navigationBarBackgroundColor: "#fff",
                navigationBarTitleText: "嘉图借书",
                navigationBarTextStyle: "black"
            },
            tabBar: {
                color: "#ACB5BB",
                selectedColor: "#009EFF",
                borderStyle: "white",
                backgroundColor: "#ffffff",
                list: [ {
                    pagePath: "pages/home/home",
                    iconPath: "assets/images/icon/index.png",
                    selectedIconPath: "assets/images/icon/index_click.png",
                    text: "首页"
                }, {
                    pagePath: "pages/class/class",
                    iconPath: "assets/images/icon/class.png",
                    selectedIconPath: "assets/images/icon/class_click.png",
                    text: "分类"
                }, {
                    pagePath: "pages/bookshelf/bookshelf",
                    iconPath: "assets/images/icon/bookshelf.png",
                    selectedIconPath: "assets/images/icon/bookshelf_click.png",
                    text: "借书架"
                }, {
                    pagePath: "pages/mine/mine",
                    iconPath: "assets/images/icon/me.png",
                    selectedIconPath: "assets/images/icon/me_click.png",
                    text: "我的"
                } ]
            },
            navigateToMiniProgramAppIdList: [ "wx7727e5866f92133c" ]
        };
        _this.globalData = {
            userData: null,
            authSetting: null,
            area: {
                latitude: null,
                longitude: null,
                district: ""
            },
            boxScanBorrowURL: null,
            returnBookSelect: null
        };
        _this.configData = {
            commonConfig: null,
            picResource: "https://img.jieshu.me/htdocs",
            key: "7JCBZ-R3YWQ-Z2Z5B-G2XEU-2OUBF-OWFN7",
            sig: "bh5bHwdsO1566Oa0lyKSaA9LfVegG0ZY"
        };
        _this.use("requestfix");
        _this.use("promisify");
        return _this;
    }
    _createClass(_default, [ {
        key: "onLaunch",
        value: function onLaunch(option) {
            this.globalData.query = option.query;
            _network2.default.baseUrl().interceptor(interceptor.request, interceptor.response);
            this.getCommonConfig();
            this.getLocation();
            this.getSystemInfo();
        }
    }, {
        key: "onShow",
        value: function onShow(res) {
            //调回我们小程序执行
            if (res && res.query && res.query.q) {
                this.globalData.boxScanBorrowURL = decodeURIComponent(res.query.q);
            }
        }
    }, {
        key: "getCommonConfig",
        value: function getCommonConfig(cb) {
            var _this2 = this;
            if (this.configData.commonConfig) {
                typeof cb == "function" && cb(this.configData.commonConfig);
            } else {
                _config2.default.getCommonConfig().then(function(res) {
                    _this2.configData.commonConfig = res.data;
                    typeof cb == "function" && cb(_this2.configData.commonConfig);
                });
            }
        }
    }, {
        key: "getLocation",
        value: function getLocation() {
            var _this3 = this;
            wx.getLocation({
                type: "wgs84",
                //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                success: function success(res) {
                    _this3.globalData.area.latitude = res.latitude;
                    _this3.globalData.area.longitude = res.longitude;
                    //定位区
                                        _config2.default.loadCity(res.longitude, res.latitude).then(function(res) {
                        var district = res.result.addressComponent.district;
                        _this3.globalData.area.district = district;
                    });
                }
            });
        }
    }, {
        key: "getSystemInfo",
        value: function getSystemInfo() {
            var _this4 = this;
            wx.getSystemInfo({
                success: function success(res) {
                    var ww = res.windowWidth;
                    _this4.globalData.scale = 750 / ww;
                    _this4.globalData.hh = res.windowHeight;
                    _this4.globalData.platform = res.platform;
                }
            });
        }
    } ]);
    return _default;
}(_wepy2.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default, {
    noPromiseAPI: [ "createSelectorQuery" ]
}));

require("./_wepylogs.js");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbnRlcmNlcHRvciIsInN0b3JlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInBhZ2VzIiwicGVybWlzc2lvbiIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJvcmRlclN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwidGV4dCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsImF1dGhTZXR0aW5nIiwiYXJlYSIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZGlzdHJpY3QiLCJib3hTY2FuQm9ycm93VVJMIiwicmV0dXJuQm9va1NlbGVjdCIsImNvbmZpZ0RhdGEiLCJjb21tb25Db25maWciLCJwaWNSZXNvdXJjZSIsImtleSIsInNpZyIsInVzZSIsIm9wdGlvbiIsInF1ZXJ5IiwicmVxIiwiYmFzZVVybCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImdldENvbW1vbkNvbmZpZyIsImdldExvY2F0aW9uIiwiZ2V0U3lzdGVtSW5mbyIsInJlcyIsInEiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjYiIsInRoZW4iLCJkYXRhIiwid3giLCJ0eXBlIiwic3VjY2VzcyIsImxvYWRDaXR5IiwicmVzdWx0IiwiYWRkcmVzc0NvbXBvbmVudCIsInd3Iiwid2luZG93V2lkdGgiLCJzY2FsZSIsImhoIiwid2luZG93SGVpZ2h0IiwicGxhdGZvcm0iLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0lBQVlBLFc7O0FBQ1o7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFN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Y0FBSUksS0FBS1osSUFBSWEsV0FBYjtBQUNBLGlCQUFLckMsVUFBTCxDQUFnQnNDLEtBQWhCLEdBQXdCLE1BQUlGLEVBQTVCO0FBQ0EsaUJBQUtwQyxVQUFMLENBQWdCdUMsRUFBaEIsR0FBcUJmLElBQUlnQixZQUF6QjtBQUNBLGlCQUFLeEMsVUFBTCxDQUFnQnlDLFFBQWhCLEdBQTJCakIsSUFBSWlCLFFBQS9CO0FBQ0Q7QUFOYyxPQUFqQjtBQVFEOzs7O0VBM04wQkMsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG4gIGltcG9ydCByZXEgZnJvbSAnQC9uZXR3b3JrJ1xuICBpbXBvcnQgKiBhcyBpbnRlcmNlcHRvciBmcm9tICdAL25ldHdvcmsvaW50ZXJjZXB0b3InXG4gIGltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCc7XG4gIGltcG9ydCBjb25maWdTdG9yZSBmcm9tICdAL3N0b3JlJztcbiAgaW1wb3J0IGNvbmZpZyBmcm9tICdAL2NvbmZpZyc7XG4gIGltcG9ydCAnLi91dGlscy9hbGQtc3RhdCdcbiAgaW1wb3J0IHtnZXRTZ21haW4sIGdldFd4Snd0LCBzZXRTZ21haW4sIHNldExpYmNvZGVDaG9vc2VkLCBzZXRXeEp3dCwgc2V0V3hVc2VyRGF0YSwgc2V0TGliaW5mb30gZnJvbSAnQC91dGlscydcblxuICBjb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKCk7XG4gIHNldFN0b3JlKHN0b3JlKTtcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5ZiJ5Zu+5YCf5LmmJyxcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdwYWdlcy9ob21lL2hvbWUnLFxuICAgICAgICAncGFnZXMvY2xhc3MvY2xhc3MnLFxuICAgICAgICAncGFnZXMvYm9va3NoZWxmL2Jvb2tzaGVsZicsXG4gICAgICAgICdwYWdlcy9taW5lL21pbmUnLFxuICAgICAgICAncGFnZXMvd2ViVmlldy93ZWJWaWV3J1xuICAgICAgXSxcbiAgICAgIFwic3ViUGFja2FnZXNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJyb290XCI6IFwiaG9tZS9cIixcbiAgICAgICAgICBcIm5hbWVcIjpcImhvbWVcIixcbiAgICAgICAgICBcInBhZ2VzXCI6IFtcbiAgICAgICAgICAgICdwYWdlcy9zZWFyY2gvc2VhcmNoJyxcbiAgICAgICAgICAgICdwYWdlcy9zbGlkZXIvc2xpZGVyJyxcbiAgICAgICAgICAgICdwYWdlcy9ib29rTGlzdC9ib29rTGlzdCcsXG4gICAgICAgICAgICAncGFnZXMvYm9va0luZm8vYm9va0luZm8nLFxuICAgICAgICAgICAgJ3BhZ2VzL2Jvb2tMaXN0RGV0YWlsL2Jvb2tMaXN0RGV0YWlsJyxcbiAgICAgICAgICAgICdwYWdlcy90cmFuc2l0L3RyYW5zaXQnLFxuICAgICAgICAgICAgJ3BhZ2VzL3NjYW4vc2NhbicsXG4gICAgICAgICAgICAncGFnZXMvc2NhbmJvcnJvdy9zY2FuYm9ycm93JyxcbiAgICAgICAgICAgICdwYWdlcy9hY3Rpdml0eS90ZWxsc0hvbWUvdGVsbHNIb21lJyxcbiAgICAgICAgICAgICdwYWdlcy9hY3Rpdml0eS90ZWxsc1VwbG9hZC90ZWxsc1VwbG9hZCcsXG4gICAgICAgICAgICAncGFnZXMvYWN0aXZpdHkvdGVsbHNXb3Jrcy90ZWxsc1dvcmtzJyxcbiAgICAgICAgICAgICdwYWdlcy9hY3Rpdml0eS9teVdvcmtzL215V29ya3MnLFxuICAgICAgICAgICAgJ3BhZ2VzL2FjdGl2aXR5L3RlbGxzRGV0YWlsL3RlbGxzRGV0YWlsJyxcbiAgICAgICAgICAgICdwYWdlcy9uaWdodGJlYXQvcGhvdG9Ib21lL3Bob3RvSG9tZScsXG4gICAgICAgICAgICAncGFnZXMvbmlnaHRiZWF0L3Bob3RvTGlzdC9waG90b0xpc3QnLFxuICAgICAgICAgICAgJ3BhZ2VzL25pZ2h0YmVhdC9waG90b1dvcmsvcGhvdG9Xb3JrJyxcbiAgICAgICAgICAgICdwYWdlcy9ib3Jyb3dib29rL2JvcnJvd2Jvb2snXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJyb290XCI6IFwiY2xhc3MvXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiY2xhc3NcIixcbiAgICAgICAgICBcInBhZ2VzXCI6IFtcInBhZ2VzL2VkaXRjbGFzcy9lZGl0Y2xhc3NcIiwgXCJwYWdlcy9ib29rcy9ib29rc1wiLCBcInBhZ2VzL3JlY29tbWVuZGJvb2svcmVjb21tZW5kYm9va1wiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJyb290XCI6IFwiYm9va3NoZWxmL1wiLFxuICAgICAgICAgIFwibmFtZVwiOiBcImJvb2tzaGVsZlwiLFxuICAgICAgICAgIFwicGFnZXNcIjogW1xuICAgICAgICAgICAgJ3BhZ2VzL3NldHRsZW1lbnQvc2V0dGxlbWVudCcsXG4gICAgICAgICAgICAncGFnZXMvc2V0dGxlbWVudFN1Y2Nlc3Mvc2V0dGxlbWVudFN1Y2Nlc3MnLFxuICAgICAgICAgICAgJ3BhZ2VzL3N1Y2Nlc3Mvc3VjY2VzcycsXG4gICAgICAgICAgICAncGFnZXMvd2Vidmlld1BheS93ZWJ2aWV3UGF5J11cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwicm9vdFwiOiBcIm1pbmUvXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwibWluZVwiLFxuICAgICAgICAgIFwicGFnZXNcIjogW1xuICAgICAgICAgICAgJ3BhZ2VzL21lc3NhZ2UvbWVzc2FnZScsXG4gICAgICAgICAgICAncGFnZXMvZUNhcmQvZUNhcmQnLFxuICAgICAgICAgICAgJ3BhZ2VzL2N1cnJlbnRQYWNrYWdlL2N1cnJlbnRQYWNrYWdlJyxcbiAgICAgICAgICAgICdwYWdlcy9teUhpc1BhY2thZ2UvbXlIaXNQYWNrYWdlJyxcbiAgICAgICAgICAgICdwYWdlcy9jdXJyZW50Qm9ycm93L2N1cnJlbnRCb3Jyb3cnLFxuICAgICAgICAgICAgJ3BhZ2VzL2JvcnJvd0hpc3RvcnkvYm9ycm93SGlzdG9yeScsXG4gICAgICAgICAgICAncGFnZXMvbXlPcmRlci9teU9yZGVyJyxcbiAgICAgICAgICAgICdwYWdlcy9sb2dpc3RpY3MvbG9naXN0aWNzJyxcbiAgICAgICAgICAgICdwYWdlcy9teUluZm8vbW9iaWxlL21vYmlsZScsXG4gICAgICAgICAgICAncGFnZXMvbXlJbmZvL2FkZHJlc3MvYWRkcmVzcycsXG4gICAgICAgICAgICAncGFnZXMvbXlJbmZvL2FkZHJlc3MvYWRkQWRkcmVzcy9hZGRBZGRyZXNzJyxcbiAgICAgICAgICAgICdwYWdlcy9teUluZm8vYWRkcmVzcy91cGRhdGVBZGRyZXNzL3VwZGF0ZUFkZHJlc3MnLFxuICAgICAgICAgICAgJ3BhZ2VzL215SW5mby93akFkZHJlc3Mvd2pBZGRyZXNzJyxcbiAgICAgICAgICAgICdwYWdlcy9teUluZm8vd2pBZGRyZXNzL3ppVGlBZGRyZXNzL3ppVGlBZGRyZXNzJyxcbiAgICAgICAgICAgICdwYWdlcy9teUluZm8vd2pBZGRyZXNzL3VwZGF0ZUFkZHJlc3MvdXBkYXRlQWRkcmVzcycsXG4gICAgICAgICAgICAncGFnZXMvbXlJbmZvL3JlYWRlckNhcmQvcmVhZGVyQ2FyZCcsXG4gICAgICAgICAgICAncGFnZXMvbXlJbmZvL3JlYWRlckNhcmQvYmluZEZvcm0vYmluZEZvcm0nLFxuICAgICAgICAgICAgJ3BhZ2VzL215SW5mby9yZWFkZXJDYXJkL29ubGluZUNhcmQvb25saW5lQ2FyZCcsXG4gICAgICAgICAgICAncGFnZXMvbXlJbmZvL2FycmVhcmFnZS9hcnJlYXJhZ2UnLFxuICAgICAgICAgICAgJ3BhZ2VzL215SW5mby9zZXR0aW5nL3NldHRpbmcnLFxuICAgICAgICAgICAgJ3BhZ2VzL215Q291cG9uL215Q291cG9uJyxcbiAgICAgICAgICAgICdwYWdlcy9yZXR1cm5Cb29rL3JldHVybkJvb2snLFxuICAgICAgICAgICAgJ3BhZ2VzL3JldHVybkJvb2tOZXcvcmV0dXJuQm9va05ldycsXG4gICAgICAgICAgICAncGFnZXMvcmV0dXJuQm9va05ldy9lbXNyZXR1cm5ib29rL2Vtc3JldHVybmJvb2snLFxuICAgICAgICAgICAgJ3BhZ2VzL3JldHVybkJvb2tOZXcvY3JlYXRlT3JkZXIvY3JlYXRlT3JkZXInLFxuICAgICAgICAgICAgJ3BhZ2VzL3JldHVybkJvb2tOZXcvcmVzdlN1Y2Nlc3MvcmVzdlN1Y2Nlc3MnLFxuICAgICAgICAgICAgJ3BhZ2VzL3JldHVybkJvb2tOZXcvcmV0dXJuSGlzdG9yeS9yZXR1cm5IaXN0b3J5JyxcbiAgICAgICAgICAgICdwYWdlcy9yZXR1cm5Cb29rTmV3L3Jlc3ZPcmRlckluZm8vcmVzdk9yZGVySW5mbycsXG4gICAgICAgICAgICAncGFnZXMvcmVjb21tZW5kTGlzdC9yZWNvbW1lbmRMaXN0JyxdXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInByZWxvYWRSdWxlXCI6IHtcbiAgICAgICAgXCJwYWdlcy9ob21lL2hvbWVcIjoge1xuICAgICAgICAgIFwibmV0d29ya1wiOiBcImFsbFwiLFxuICAgICAgICAgIFwicGFja2FnZXNcIjogW1wiaG9tZVwiLFwiY2xhc3NcIixcImJvb2tzaGVsZlwiLFwibWluZVwiXVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VzL2NsYXNzL2NsYXNzXCI6IHtcbiAgICAgICAgICBcIm5ldHdvcmtcIjogXCJhbGxcIixcbiAgICAgICAgICBcInBhY2thZ2VzXCI6IFtcImhvbWVcIixcImNsYXNzXCIsXCJib29rc2hlbGZcIixcIm1pbmVcIl1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlcy9taW5lL21pbmVcIjoge1xuICAgICAgICAgIFwibmV0d29ya1wiOiBcImFsbFwiLFxuICAgICAgICAgIFwicGFja2FnZXNcIjogW1wiaG9tZVwiLFwiY2xhc3NcIixcImJvb2tzaGVsZlwiLFwibWluZVwiXVxuICAgICAgICB9LFxuICAgICAgICBcInBhZ2VzL2Jvb2tzaGVsZi9ib29rc2hlbGZcIjoge1xuICAgICAgICAgIFwibmV0d29ya1wiOiBcImFsbFwiLFxuICAgICAgICAgIFwicGFja2FnZXNcIjogW1wiaG9tZVwiLFwiY2xhc3NcIixcImJvb2tzaGVsZlwiLFwibWluZVwiXVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcm1pc3Npb246IHtcbiAgICAgICAgXCJzY29wZS51c2VyTG9jYXRpb25cIjoge1xuICAgICAgICAgIFwiZGVzY1wiOiBcIuS9oOeahOS9jee9ruS/oeaBr+WwhueUqOS6juWwj+eoi+W6j+S9jee9ruaOpeWPo+eahOaViOaenOWxleekulwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB3aW5kb3c6IHtcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflmInlm77lgJ/kuaYnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXG4gICAgICB9LFxuICAgICAgdGFiQmFyOiB7XG4gICAgICAgIGNvbG9yOiBcIiNBQ0I1QkJcIixcbiAgICAgICAgc2VsZWN0ZWRDb2xvcjogXCIjMDA5RUZGXCIsXG4gICAgICAgIGJvcmRlclN0eWxlOiBcIndoaXRlXCIsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9ob21lL2hvbWVcIixcbiAgICAgICAgICAgIGljb25QYXRoOiBcImFzc2V0cy9pbWFnZXMvaWNvbi9pbmRleC5wbmdcIixcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiYXNzZXRzL2ltYWdlcy9pY29uL2luZGV4X2NsaWNrLnBuZ1wiLFxuICAgICAgICAgICAgdGV4dDogXCLpppbpobVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvY2xhc3MvY2xhc3NcIixcbiAgICAgICAgICAgIGljb25QYXRoOiBcImFzc2V0cy9pbWFnZXMvaWNvbi9jbGFzcy5wbmdcIixcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiYXNzZXRzL2ltYWdlcy9pY29uL2NsYXNzX2NsaWNrLnBuZ1wiLFxuICAgICAgICAgICAgdGV4dDogXCLliIbnsbtcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvYm9va3NoZWxmL2Jvb2tzaGVsZlwiLFxuICAgICAgICAgICAgaWNvblBhdGg6IFwiYXNzZXRzL2ltYWdlcy9pY29uL2Jvb2tzaGVsZi5wbmdcIixcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiYXNzZXRzL2ltYWdlcy9pY29uL2Jvb2tzaGVsZl9jbGljay5wbmdcIixcbiAgICAgICAgICAgIHRleHQ6IFwi5YCf5Lmm5p62XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL21pbmUvbWluZVwiLFxuICAgICAgICAgICAgaWNvblBhdGg6IFwiYXNzZXRzL2ltYWdlcy9pY29uL21lLnBuZ1wiLFxuICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJhc3NldHMvaW1hZ2VzL2ljb24vbWVfY2xpY2sucG5nXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIuaIkeeahFwiXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJuYXZpZ2F0ZVRvTWluaVByb2dyYW1BcHBJZExpc3RcIjogW1wid3g3NzI3ZTU4NjZmOTIxMzNjXCJdXG4gICAgfTtcblxuICAgIGdsb2JhbERhdGEgPSB7XG4gICAgICB1c2VyRGF0YTogbnVsbCxcbiAgICAgIGF1dGhTZXR0aW5nOiBudWxsLFxuICAgICAgYXJlYTp7XG4gICAgICAgIGxhdGl0dWRlOiBudWxsLFxuICAgICAgICBsb25naXR1ZGU6IG51bGwsXG4gICAgICAgIGRpc3RyaWN0OiAnJ1xuICAgICAgfSxcbiAgICAgIGJveFNjYW5Cb3Jyb3dVUkw6bnVsbCxcbiAgICAgIHJldHVybkJvb2tTZWxlY3Q6bnVsbFxuICAgIH07XG4gICAgY29uZmlnRGF0YSA9IHtcbiAgICAgIGNvbW1vbkNvbmZpZzogbnVsbCxcbiAgICAgIHBpY1Jlc291cmNlOiAnaHR0cHM6Ly9pbWcuamllc2h1Lm1lL2h0ZG9jcycsXG4gICAgICBrZXk6JzdKQ0JaLVIzWVdRLVoyWjVCLUcyWEVVLTJPVUJGLU9XRk43JyxcbiAgICAgIHNpZzonYmg1Ykh3ZHNPMTU2Nk9hMGx5S1NhQTlMZlZlZ0cwWlknXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4Jyk7XG4gICAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XG4gICAgfVxuXG4gICAgb25MYXVuY2gob3B0aW9uKSB7XG4gICAgICB0aGlzLmdsb2JhbERhdGEucXVlcnkgPSBvcHRpb24ucXVlcnk7XG4gICAgICByZXEuYmFzZVVybCgpLmludGVyY2VwdG9yKGludGVyY2VwdG9yLnJlcXVlc3QsIGludGVyY2VwdG9yLnJlc3BvbnNlKTtcbiAgICAgIHRoaXMuZ2V0Q29tbW9uQ29uZmlnKCk7XG4gICAgICB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICB0aGlzLmdldFN5c3RlbUluZm8oKTtcbiAgICB9O1xuXG4gICAgb25TaG93KHJlcykge1xuICAgICAgLy/osIPlm57miJHku6zlsI/nqIvluo/miafooYxcbiAgICAgIGlmKHJlcyAmJiByZXMucXVlcnkgJiZyZXMucXVlcnkucSl7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5ib3hTY2FuQm9ycm93VVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KHJlcy5xdWVyeS5xKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb21tb25Db25maWcoY2IpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZ0RhdGEuY29tbW9uQ29uZmlnKSB7XG4gICAgICAgIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nICYmIGNiKHRoaXMuY29uZmlnRGF0YS5jb21tb25Db25maWcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25maWcuZ2V0Q29tbW9uQ29uZmlnKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIHRoaXMuY29uZmlnRGF0YS5jb21tb25Db25maWcgPSByZXMuZGF0YTtcbiAgICAgICAgICB0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyAmJiBjYih0aGlzLmNvbmZpZ0RhdGEuY29tbW9uQ29uZmlnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG4gICAgZ2V0TG9jYXRpb24oKSB7XG4gICAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICAgIHR5cGU6ICd3Z3M4NCcsICAgLy/pu5jorqTkuLogd2dzODQg6L+U5ZueIGdwcyDlnZDmoIfvvIxnY2owMiDov5Tlm57lj6/nlKjkuo4gd3gub3BlbkxvY2F0aW9uIOeahOWdkOagh1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmFyZWEubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGU7XG4gICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmFyZWEubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcbiAgICAgICAgICAvL+WumuS9jeWMulxuICAgICAgICAgIGNvbmZpZy5sb2FkQ2l0eShyZXMubG9uZ2l0dWRlLCByZXMubGF0aXR1ZGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBkaXN0cmljdCA9IHJlcy5yZXN1bHQuYWRkcmVzc0NvbXBvbmVudC5kaXN0cmljdDtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5hcmVhLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0U3lzdGVtSW5mbyAoKSB7XG4gICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBsZXQgd3cgPSByZXMud2luZG93V2lkdGg7XG4gICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnNjYWxlID0gNzUwL3d3O1xuICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5oaCA9IHJlcy53aW5kb3dIZWlnaHQ7XG4gICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnBsYXRmb3JtID0gcmVzLnBsYXRmb3JtO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19