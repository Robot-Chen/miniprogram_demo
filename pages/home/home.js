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

var _config = require("./../../config.js");

var _config2 = _interopRequireDefault(_config);

var _utils = require("./../../utils/index.js");

var _tip = require("./../../utils/tip.js");

var _book = require("./../../utils/book.js");

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

var locationCity = null;

var QQMapWX = require("./../../utils/qqmap-wx-jssdk.min.js");

var qqmapsdk;

var Home = function(_wepy$page) {
    _inherits(Home, _wepy$page);
    function Home() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Home);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "嘉图借书",
            usingComponents: {
                "city-list": "/components/wx-city-list/wx-city-list",
                toast: "/components/toast/toast"
            },
            enablePullDownRefresh: true
        }, _this.data = {
            query: null,
            messageCount: 0,
            informFlag: false,
            firstSwiperIndex: 0,
            //重新评估这个参数
            showCityChoose: false,
            cityList: [],
            curCity: "",
            libList: [],
            libs: [],
            showLibChoose: false,
            hasLibcode: false,
            libname: "",
            sliders: {
                hidden: true
            },
            sliders5: {
                hidden: true
            },
            picResource: app.configData.picResource,
            blTypes: null,
            likes: [],
            likesNum: 0,
            //当前猜你喜欢页码
            tempUrl: "https://cdn.jieshu.me/minia/wexin/images/ic_local.png",
            hasLogin: false,
            firstchacha: false,
            showtoastData: {},
            animationData: null,
            libcode: "",
            preIndex: 0,
            showActivityMask: false,
            activity: null,
            scanBorrow: null
        }, _this.watch = {}, _this.methods = {
            firstSwiperChange: function firstSwiperChange(e) {
                this.firstSwiperIndex = e.detail.current;
            },
            handleChooseCity: function handleChooseCity() {
                if (this.query && this.query.libcode && this.query.changeabled == 0) {
                    return;
                }
                this.showLibChoose = false;
                this.showCityChoose = true;
            },
            bookInfo: function bookInfo(item) {
                console.log(item);
                var libcode = item.libcode;
                var bookid = item.bookid;
                var bookrecno = item.bookRecNo;
                var urlStr = "/home/pages/bookInfo/bookInfo?libcode=" + libcode + "&bookid=" + bookid + "&bookrecno=" + bookrecno + "&classno=";
                _wepy2.default.navigateTo({
                    url: urlStr
                });
            },
            libTapFromPage: function libTapFromPage(libcode) {
                console.log(libcode);
                if ("cancel" != libcode) {
                    this.libTap(libcode);
                } else {
                    this.showLibChoose = false;
                }
            },
            sliderClick: function sliderClick(index) {
                var slider = this.sliders.data[index];
                this.formateSlider(slider);
                //埋点
                                app.$wxapp.aldstat.sendEvent("banner", {
                    "标题": slider.title
                });
            },
            // 查看全部
            jump_list: function jump_list(flag, title) {
                //埋点
                app.$wxapp.aldstat.sendEvent(title + "-查看全部");
                var path = "/class/pages/books/books?type=3&flag=" + flag + "&title=" + title + "&";
                _wepy2.default.navigateTo({
                    url: path
                });
            },
            //查看书刊详情
            bookListDetail: function bookListDetail(shelfId, title) {
                //埋点
                app.$wxapp.aldstat.sendEvent("主题书单banner", {
                    "标题": title
                });
                var url = "/home/pages/bookListDetail/bookListDetail?shelfId=" + shelfId;
                _wepy2.default.navigateTo({
                    url: url
                });
            },
            //关闭活动弹窗
            closeActivityMask: function closeActivityMask() {
                this.showActivityMask = false;
            },
            //查看活动详情
            activityClick: function activityClick(activity) {
                var slider = activity;
                this.formateSlider(slider);
                this.showActivityMask = false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret)
        /**
   * 页面配置
   */
        /**
   * 可用于页面模板绑定的数据
   */;
    }
    _createClass(Home, [ {
        key: "onLoad",
        value: function onLoad(query) {
            var _this2 = this;
            qqmapsdk = new QQMapWX({
                key: app.configData.key
            });
            wx.showShareMenu();
            if (query.libcode) {
                this.query = query;
            } else {
                this.query = app.globalData.query;
            }
            this.getLocation();
            if ((0, _utils.getLibcodeChoosed)()) {
                app.getCommonConfig(function(res) {
                    _this2.callBlType();
                    if (app.configData.commonConfig.showMenus && app.configData.commonConfig.showMenus.scanBorrow) {
                        _this2.scanBorrow = 1;
                    } else {
                        _this2.scanBorrow = 2;
                    }
                });
            }
        }
        //定位经纬度
        }, {
        key: "getLocation",
        value: function getLocation() {
            var _this3 = this;
            wx.getLocation({
                type: "wgs84",
                //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                success: function success(res) {
                    var latitude = res.latitude;
                    var longitude = res.longitude;
                    _this3.loadCity(longitude, latitude);
                },
                fail: function fail(res) {
                    _this3.getLibList();
                }
            });
        }
    }, {
        key: "loadCity",
        value: function loadCity(longitude, latitude) {
            var that = this;
            qqmapsdk.reverseGeocoder({
                location: {
                    latitude: latitude,
                    longitude: longitude
                },
                sig: app.configData.sig,
                success: function success(res) {
                    console.log(JSON.stringify(res));
                    locationCity = res.result.ad_info.city;
                    // 获取图书馆列表
                                        that.getLibList();
                },
                fail: function fail(res) {
                    that.getLibList();
                }
            });
        }
    }, {
        key: "onShow",
        value: function onShow() {
            //埋点
            app.$wxapp.aldstat.sendEvent("首页");
            if ((0, _utils.getLibcodeChoosed)()) {
                this.tempUrl = "https://cdn.jieshu.me/minia/lib_logo/" + (0, _utils.getLibcodeChoosed)() + ".png";
                this.libcode = (0, _utils.getLibcodeChoosed)();
            }
            this.hasLogin = (0, _utils.hasLogin)();
        }
    }, {
        key: "onHide",
        value: function onHide() {
            //埋点
            app.$wxapp.aldstat.sendEvent("首页退出");
        }
    }, {
        key: "onPullDownRefresh",
        value: function onPullDownRefresh() {
            this.dataInit();
            wx.stopPullDownRefresh();
        }
    }, {
        key: "dataInit",
        value: function dataInit() {
            var _this4 = this;
            this.firstSwiperIndex = 0;
            this.$apply();
            var times = setInterval(function(res) {
                if (app.configData.commonConfig) {
                    clearInterval(times);
                    if (app.configData.commonConfig.showMenus && app.configData.commonConfig.showMenus.scanBorrow) {
                        _this4.scanBorrow = 1;
                    } else {
                        _this4.scanBorrow = 2;
                    }
                    if (app.configData.commonConfig.openJianshuShelf && app.configData.commonConfig.openJianshuShelf == 1) {
                        _this4.bookList();
                    } else {
                        _this4.sliders5 = {
                            hidden: true,
                            data: []
                        };
                    }
                }
            }, 500);
            this.callSlider([ 1, 25 ]);
            this.callBlType();
        }
        //猜你喜欢，新书，推荐
        }, {
        key: "callBlType",
        value: function callBlType() {
            var _this5 = this;
            if (this.blTypes) {
                return;
            }
            var libcode = (0, _utils.getLibcodeChoosed)();
            var param = {
                libcode: libcode
            };
            _config2.default.getBlType(param).then(function(res) {
                if (res.result == 1 && res.data.length > 0) {
                    var bltypes = res.data;
                    bltypes.forEach(function(items, index) {
                        var list = items.list;
                        list.forEach(function(item) {
                            if (item.title.length > 18) {
                                item.noimgtitle = item.title.substring(0, 17) + "...";
                            }
                        });
                        (0, _utils.dataConvert)(list, function(res) {
                            if (items.label === "猜你喜欢") {
                                res.forEach(function(item, i) {
                                    //循环6个为一份
                                    if (!_this5.likes[parseInt(i / 6)]) {
                                        _this5.likes[parseInt(i / 6)] = [];
                                    }
                                    _this5.likes[parseInt(i / 6)] = _this5.likes[parseInt(i / 6)].concat(item);
                                });
                            }
                            if (index === bltypes.length - 1) {
                                _this5.blTypes = bltypes;
                                _this5.$apply();
                            }
                        });
                    });
                }
            });
        }
        //猜你喜欢换一换
        }, {
        key: "changeLikes",
        value: function changeLikes() {
            if (this.likesNum === this.likes.length - 1) {
                this.likesNum = 0;
            } else {
                this.likesNum++;
            }
        }
        /**
     * 获取图书馆列表
     */    }, {
        key: "getLibList",
        value: function getLibList() {
            var _this6 = this;
            _config2.default.getRegionAndLib().then(function(res) {
                if (res.result === 1) {
                    _this6.cityList = (0, _utils.getCityList)(res.regionList);
                    _this6.libList = res.data;
                    _this6.getChoosedLibName();
                    _this6.checkLib();
                    _this6.hasLibcode = false;
                    if ((0, _utils.getLibcodeChoosed)()) {
                        _this6.hasLibcode = true;
                        _this6.libname = app.globalData.libname;
                        _this6.showCityChoose = false;
                    } else {
                        if (!_this6.query || !_this6.query.libcode) {
                            _this6.showCityChoose = true;
                        }
                    }
                    if (_this6.query && _this6.query.libcode) {
                        _this6.libTap(_this6.query.libcode);
                    } else {
                        _this6.showLogoYidi(res.regionList);
                    }
                    _this6.$apply();
                }
            });
        }
    }, {
        key: "showLogoYidi",
        value: function showLogoYidi(temp) {
            var _this7 = this;
            if (!locationCity) {
                return;
            }
            var hasLibcode = false;
            var tempurl = "";
            //if (getLibcodeChoosed()) {
                        var autoAddress = temp.filter(function(item) {
                return locationCity.indexOf(item.city) >= 0;
            });
            if (autoAddress.length > 0) {
                var res = {
                    city: autoAddress[0].city,
                    adCode: autoAddress[0].adCode
                };
                var libs = this.libList[res.adCode];
                var tempLib = libs.filter(function(item) {
                    return item.libcode === (0, _utils.getLibcodeChoosed)();
                });
                if (tempLib.length > 0) {
                    hasLibcode = true;
                    tempurl = "https://cdn.jieshu.me/minia/lib_logo/" + (0, _utils.getLibcodeChoosed)() + ".png";
                } else {
                    wx.showModal({
                        content: "您是否想切换到当地图书馆?",
                        confirmText: "切换",
                        cancelText: "不切换",
                        confirmColor: "#009eff",
                        success: function success(res) {
                            if (res.confirm) {
                                _this7.chooseLibSonMethod(autoAddress[0], temp);
                                //埋点
                                                                app.$wxapp.aldstat.sendEvent("首页定位");
                            } else {
                                hasLibcode = true;
                                tempurl = "https://cdn.jieshu.me/minia/lib_logo/" + (0, _utils.getLibcodeChoosed)() + ".png";
                                _this7.hasLibcode = hasLibcode;
                                _this7.tempurl = tempurl;
                                _this7.$apply();
                            }
                        }
                    });
                }
            }
            //}
                }
        //切换到当前城市
        }, {
        key: "chooseLibSonMethod",
        value: function chooseLibSonMethod(libcode, temp) {
            var _this8 = this;
            var citycode = libcode.teleCode;
            if (citycode) {
                var autoAddress = temp.filter(function(item) {
                    return item.adCode === citycode;
                });
                if (autoAddress.length == 0) {
                    autoAddress = temp.filter(function(item) {
                        return item.teleCode === citycode;
                    });
                }
                if (autoAddress.length > 0) {
                    var res = {
                        city: autoAddress[0].city,
                        adCode: autoAddress[0].adCode
                    };
                    this.curCity = res.city;
                    this.choose_lib(res);
                } else {
                    wx.showModal({
                        title: "温馨提示",
                        confirmColor: "#009eff",
                        content: "您所在的城市暂未有合作图书馆,请选择其他城市图书馆进行浏览使用",
                        buttonText: "我知道了",
                        success: function success() {
                            _this8.handleChooseCity();
                        }
                    });
                }
            } else {
                wx.showModal({
                    title: "温馨提示",
                    confirmColor: "#009eff",
                    content: "您所在的城市暂未有合作图书馆,请选择其他城市图书馆进行浏览使用",
                    buttonText: "我知道了",
                    success: function success() {
                        _this8.handleChooseCity();
                    }
                });
            }
        }
    }, {
        key: "choose_lib",
        value: function choose_lib(res) {
            console.log("choose lib new begin");
            var libs = this.libList[res.adCode];
            if (!libs) {
                (0, _tip.showToast)("该城市未发现开通的图书馆", this);
                return;
            } else if (libs.length === 1) {
                this.libTap(libs[0].libcode);
            } else {
                console.log("choose lib begin1");
                this.showLibChoose = true;
                this.libs = libs;
                this.$apply();
            }
        }
        //选择城市
        }, {
        key: "binddetail",
        value: function binddetail(e) {
            var adCode = e.detail.adCode;
            this.libs = this.libList[adCode];
            this.curCity = e.detail.city;
            this.showCityChoose = false;
            if (this.libs.length === 1) {
                this.libTap(this.libs[0].libcode);
            } else {
                this.showLibChoose = true;
            }
        }
        //检测是否已选图书馆
        }, {
        key: "checkLib",
        value: function checkLib() {
            if (!(0, _utils.getLibcodeChoosed)() && !this.showLibChoose) {
                this.showCityChoose = false;
            } else if ((0, _utils.getLibcodeChoosed)()) {
                if (this.sliders.hidden || app.globalData.libChanged || !this.bltypes) {
                    this.dataInit();
                }
            }
        }
        //选择图书馆
        }, {
        key: "libTap",
        value: function libTap(libcode) {
            this.libcode = libcode;
            console.log("lib choose:" + libcode);
            if (libcode == (0, _utils.getLibcodeChoosed)()) {
                this.showCityChoose = false;
                this.showLibChoose = false;
            } else {
                (0, _utils.changeLibcode)(libcode, this.curCity);
                this.tempUrl = "https://cdn.jieshu.me/minia/lib_logo/" + libcode + ".png";
                this.getChoosedLibName();
                this.blTypes = null;
                this.likes = [];
                this.dataInit();
                this.showCityChoose = false;
                this.showLibChoose = false;
            }
        }
        //获取图书馆名称
        }, {
        key: "getChoosedLibName",
        value: function getChoosedLibName() {
            var libcode = (0, _utils.getLibcodeChoosed)();
            for (var i in this.libList) {
                var libs = this.libList[i];
                for (var j in libs) {
                    if (libs[j].libcode == libcode) {
                        this.libname = libs[j].libname;
                        app.globalData.libname = libs[j].libname;
                        if (this.query && this.query.libcode) {
                            _wepy2.default.setNavigationBarTitle({
                                title: libs[j].libname
                            });
                        }
                        return;
                    }
                }
            }
        }
        //获取轮播
        }, {
        key: "callSlider",
        value: function callSlider(showspace) {
            var _this9 = this;
            var param = {
                showspaces: showspace
            };
            _config2.default.getSliders(param).then(function(res) {
                var sliders = _this9.sliders;
                var showActivity = null;
                var activity = _this9.activity;
                var currentDate = (0, _book.getNowFormatDate)();
                if (res.result == 1) {
                    if (res.slider1.length > 0) {
                        sliders.data = res.slider1;
                        sliders.hidden = false;
                    } else {
                        sliders.hidden = true;
                    }
                    if ((0, _utils.getCurrentDate)() != currentDate) {
                        if (res.slider25.length > 0) {
                            activity = res.slider25[0];
                            showActivity = 1;
                            (0, _utils.setCurrentDate)(currentDate);
                        }
                    }
                }
                _this9.sliders = sliders;
                _this9.showActivityMask = showActivity;
                _this9.activity = activity;
                _this9.$apply();
            });
        }
        //书单
        }, {
        key: "bookList",
        value: function bookList() {
            var _this10 = this;
            _config2.default.getJianshuShelf("").then(function(res) {
                var sliders = _this10.sliders5;
                if (res.result == 1) {
                    sliders.hidden = false;
                    sliders.data = res.data;
                } else {
                    sliders.hidden = true;
                    sliders.data = [];
                }
                _this10.sliders5 = sliders;
                _this10.$apply();
            });
        }
    }, {
        key: "goBookList",
        value: function goBookList() {
            //埋点
            app.$wxapp.aldstat.sendEvent("主题书单-查看全部");
            _wepy2.default.navigateTo({
                url: "/home/pages/bookList/bookList"
            });
        }
    }, {
        key: "formateSlider",
        value: function formateSlider(slider) {
            switch (slider.slidertype) {
              case "ACT":
                //内部跳转
                var url = this.getActUrl(slider);
                if (url != "#") {}
                break;

              case "DETAIL":
                //详情展示
                var content = encodeURIComponent(slider.description);
                var _urlStr = "/pages/home/slider/slider?type=1&content=" + content;
                _wepy2.default.navigateTo({
                    url: _urlStr
                });
                break;

              case "URL":
                //外部页面.暂时不提供该功能
                if (slider.weburl) {
                    var weburl = slider.weburl;
                    var ucardno1 = "";
                    var userId = "";
                    if (slider && slider.authflag && slider.authflag == 1) {
                        if ((0, _utils.getSgmain)() && (0, _utils.hasLogin)()) {
                            if (app.globalData.userData && app.globalData.userData.base64CardNumber) {
                                ucardno1 = app.globalData.userData.base64CardNumber;
                                userId = app.globalData.userData.userId;
                            }
                            var _urlStr = "";
                            if (weburl.indexOf("goldHome") > -1) {
                                _urlStr = "/pages/webView/webView?url=" + weburl + "&title=" + slider.title + "&libcode=" + (0, 
                                _utils.getLibcodeChoosed)() + "&userId=" + userId;
                                //urlStr = '/home/pages/transit/transit?type=1';
                                                        } else {
                                _urlStr = "/pages/webView/webView?url=" + weburl + "&title=" + slider.title + "&libcode=" + (0, 
                                _utils.getLibcodeChoosed)() + "&ucardno1=" + ucardno1;
                            }
                            _wepy2.default.navigateTo({
                                url: _urlStr
                            });
                        } else {
                            //var urlStr = '/pages/webView/webView?url=' + weburl + '&title=' + slider.title + '&libcode=' + getLibcodeChoosed() + "&ucardno1=" + ucardno1;
                            if (weburl.indexOf("goldHome") > -1) {
                                if (app.globalData.userData && app.globalData.userData.base64CardNumber) {
                                    userId = app.globalData.userData.userId;
                                }
                                _wepy2.default.navigateTo({
                                    url: "/mine/pages/myInfo/readerCard/readerCard?url=" + weburl + "&title=" + slider.title + "&libcode=" + (0, 
                                    _utils.getLibcodeChoosed)() + "&type=weburl"
                                });
                            } else {
                                _wepy2.default.navigateTo({
                                    url: "/mine/pages/myInfo/readerCard/readerCard?url=" + weburl + "&title=" + slider.title + "&libcode=" + (0, 
                                    _utils.getLibcodeChoosed)() + "&type=weburl"
                                });
                            }
                        }
                    } else {
                        var _urlStr = "/pages/webView/webView?url=" + weburl + "&title=" + slider.title + "&libcode=" + (0, 
                        _utils.getLibcodeChoosed)();
                        _wepy2.default.navigateTo({
                            url: _urlStr
                        });
                    }
                }
                break;

              case "SHELF":
                //书单
                var _staticResource = app.configData.picResource;
                if (_staticResource.indexOf("https://") != 0 && _staticResource.indexOf("https://") != 0) {
                    _staticResource = "https://cdn.jieshu.me";
                }
                if (slider.weburl.indexOf("https://") != 0 && slider.weburl.indexOf("https://") != 0) {
                    slider.weburl = _staticResource + slider.weburl;
                }
                if (slider.weburl.indexOf("?") != -1) {
                    slider.weburl = slider.weburl + "&";
                } else {
                    slider.weburl = slider.weburl + "?";
                }
                slider.url = slider.weburl + "libcode=" + _libcodeDefault + "&source=" + _source + "&appEnvironment=" + WebUtil.getAppEnvironment() + "&bindId=" + WebUtil.getWechat().bindId;
                break;
            }
        }
        /**
     * 根据actionid判断
     */    }, {
        key: "getActUrl",
        value: function getActUrl(slider) {
            var action = slider.action;
            var actionid = slider.actionid;
            var url = "#";
            return url;
        }
        //搜索进入分类
        }, {
        key: "toClassify",
        value: function toClassify() {
            _wepy2.default.navigateTo({
                url: "/home/pages/search/search"
            });
        }
        //扫一扫
        }, {
        key: "sao",
        value: function sao() {
            wx.scanCode({
                success: function success(res) {
                    var isbn = res.result;
                    var path = "/class/pages/books/books?type=2&key=" + isbn + "&sao=1&";
                    _wepy2.default.navigateTo({
                        url: path
                    });
                },
                fail: function fail(res) {
                    wx.showModal({
                        title: "提示",
                        content: "扫描失败,重新扫描？",
                        success: function success(res) {
                            if (res.confirm) {
                                this.sao();
                            }
                        }
                    });
                }
            });
        }
    }, {
        key: "scanBorrow",
        value: function scanBorrow() {
            _wepy2.default.navigateTo({
                url: "/home/pages/scanborrow/scanborrow"
            });
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.showLibChoose = false;
            this.showCityChoose = false;
        }
    } ]);
    return Home;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Home, "pages/home/home"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiYXBwIiwid2VweSIsIiRpbnN0YW5jZSIsImxvY2F0aW9uQ2l0eSIsIlFRTWFwV1giLCJyZXF1aXJlIiwicXFtYXBzZGsiLCJIb21lIiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGF0YSIsInF1ZXJ5IiwibWVzc2FnZUNvdW50IiwiaW5mb3JtRmxhZyIsImZpcnN0U3dpcGVySW5kZXgiLCJzaG93Q2l0eUNob29zZSIsImNpdHlMaXN0IiwiY3VyQ2l0eSIsImxpYkxpc3QiLCJsaWJzIiwic2hvd0xpYkNob29zZSIsImhhc0xpYmNvZGUiLCJsaWJuYW1lIiwic2xpZGVycyIsImhpZGRlbiIsInNsaWRlcnM1IiwicGljUmVzb3VyY2UiLCJjb25maWdEYXRhIiwiYmxUeXBlcyIsImxpa2VzIiwibGlrZXNOdW0iLCJ0ZW1wVXJsIiwiaGFzTG9naW4iLCJmaXJzdGNoYWNoYSIsInNob3d0b2FzdERhdGEiLCJhbmltYXRpb25EYXRhIiwibGliY29kZSIsInByZUluZGV4Iiwic2hvd0FjdGl2aXR5TWFzayIsImFjdGl2aXR5Iiwic2NhbkJvcnJvdyIsIndhdGNoIiwibWV0aG9kcyIsImZpcnN0U3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsImN1cnJlbnQiLCJoYW5kbGVDaG9vc2VDaXR5IiwiY2hhbmdlYWJsZWQiLCJib29rSW5mbyIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwiYm9va2lkIiwiYm9va3JlY25vIiwiYm9va1JlY05vIiwidXJsU3RyIiwibmF2aWdhdGVUbyIsInVybCIsImxpYlRhcEZyb21QYWdlIiwibGliVGFwIiwic2xpZGVyQ2xpY2siLCJpbmRleCIsInNsaWRlciIsImZvcm1hdGVTbGlkZXIiLCIkd3hhcHAiLCJhbGRzdGF0Iiwic2VuZEV2ZW50IiwidGl0bGUiLCJqdW1wX2xpc3QiLCJmbGFnIiwicGF0aCIsImJvb2tMaXN0RGV0YWlsIiwic2hlbGZJZCIsImNsb3NlQWN0aXZpdHlNYXNrIiwiYWN0aXZpdHlDbGljayIsImtleSIsInd4Iiwic2hvd1NoYXJlTWVudSIsImdsb2JhbERhdGEiLCJnZXRMb2NhdGlvbiIsImdldENvbW1vbkNvbmZpZyIsImNhbGxCbFR5cGUiLCJjb21tb25Db25maWciLCJzaG93TWVudXMiLCJ0eXBlIiwic3VjY2VzcyIsInJlcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibG9hZENpdHkiLCJmYWlsIiwiZ2V0TGliTGlzdCIsInRoYXQiLCJyZXZlcnNlR2VvY29kZXIiLCJsb2NhdGlvbiIsInNpZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXN1bHQiLCJhZF9pbmZvIiwiY2l0eSIsImRhdGFJbml0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsIiRhcHBseSIsInRpbWVzIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwib3BlbkppYW5zaHVTaGVsZiIsImJvb2tMaXN0IiwiY2FsbFNsaWRlciIsInBhcmFtIiwiZ2V0QmxUeXBlIiwidGhlbiIsImxlbmd0aCIsImJsdHlwZXMiLCJmb3JFYWNoIiwiaXRlbXMiLCJsaXN0Iiwibm9pbWd0aXRsZSIsInN1YnN0cmluZyIsImxhYmVsIiwiaSIsInBhcnNlSW50IiwiY29uY2F0IiwiZ2V0UmVnaW9uQW5kTGliIiwicmVnaW9uTGlzdCIsImdldENob29zZWRMaWJOYW1lIiwiY2hlY2tMaWIiLCJzaG93TG9nb1lpZGkiLCJ0ZW1wIiwidGVtcHVybCIsImF1dG9BZGRyZXNzIiwiZmlsdGVyIiwiaW5kZXhPZiIsImFkQ29kZSIsInRlbXBMaWIiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybVRleHQiLCJjYW5jZWxUZXh0IiwiY29uZmlybUNvbG9yIiwiY29uZmlybSIsImNob29zZUxpYlNvbk1ldGhvZCIsImNpdHljb2RlIiwidGVsZUNvZGUiLCJjaG9vc2VfbGliIiwiYnV0dG9uVGV4dCIsImxpYkNoYW5nZWQiLCJqIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwic2hvd3NwYWNlIiwic2hvd3NwYWNlcyIsImdldFNsaWRlcnMiLCJzaG93QWN0aXZpdHkiLCJjdXJyZW50RGF0ZSIsInNsaWRlcjEiLCJzbGlkZXIyNSIsImdldEppYW5zaHVTaGVsZiIsInNsaWRlcnR5cGUiLCJnZXRBY3RVcmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJkZXNjcmlwdGlvbiIsIndlYnVybCIsInVjYXJkbm8xIiwidXNlcklkIiwiYXV0aGZsYWciLCJ1c2VyRGF0YSIsImJhc2U2NENhcmROdW1iZXIiLCJfc3RhdGljUmVzb3VyY2UiLCJfbGliY29kZURlZmF1bHQiLCJfc291cmNlIiwiV2ViVXRpbCIsImdldEFwcEVudmlyb25tZW50IiwiZ2V0V2VjaGF0IiwiYmluZElkIiwiYWN0aW9uIiwiYWN0aW9uaWQiLCJzY2FuQ29kZSIsImlzYm4iLCJzYW8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNQyxlQUFLQyxTQUFqQjtBQUNBLElBQUlDLGVBQWUsSUFBbkI7QUFDQSxJQUFJQyxVQUFVQyxRQUFRLCtCQUFSLENBQWQ7QUFDQSxJQUFJQyxRQUFKOztJQUVxQkMsSTs7Ozs7Ozs7Ozs7Ozs7a0xBSW5CQyxNLEdBQVM7QUFDUCxnQ0FBMEIsTUFEbkI7QUFFUCx5QkFBbUI7QUFDakIscUJBQWEsdUNBREk7QUFFakIsaUJBQVM7QUFGUSxPQUZaO0FBTVBDLDZCQUF1QjtBQU5oQixLLFFBWVRDLEksR0FBTztBQUNMQyxhQUFPLElBREY7QUFFTEMsb0JBQWMsQ0FGVDtBQUdMQyxrQkFBWSxLQUhQO0FBSUxDLHdCQUFrQixDQUpiLEVBSWU7QUFDcEJDLHNCQUFnQixLQUxYO0FBTUxDLGdCQUFVLEVBTkw7QUFPTEMsZUFBUyxFQVBKO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxZQUFNLEVBVEQ7QUFVTEMscUJBQWUsS0FWVjtBQVdMQyxrQkFBWSxLQVhQO0FBWUxDLGVBQVMsRUFaSjtBQWFMQyxlQUFTLEVBQUVDLFFBQVEsSUFBVixF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QUdHO0FBQ1osa0JBQUlBLElBQUl1RCxPQUFSLEVBQWlCO0FBQ2YscUJBQUtzQyxHQUFMO0FBQ0Q7QUFDRjtBQVBVLFdBQWI7QUFTRDtBQWxCUyxPQUFaO0FBcUJEOzs7aUNBRVc7QUFDVm5MLHFCQUFLd0QsVUFBTCxDQUFnQjtBQUNkQyxhQUFLO0FBRFMsT0FBaEI7QUFHRDs7OzZCQUVPO0FBQ04sV0FBS3RDLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxXQUFLTCxjQUFMLEdBQXNCLEtBQXRCO0FBQ0Q7Ozs7RUE5bkIrQmQsZUFBS29MLEk7O2tCQUFsQjlLLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAL2NvbmZpZyc7XG5pbXBvcnQgeyBnZXRMaWJjb2RlQ2hvb3NlZCxnZXRXeEp3dCwgZ2V0U2dtYWluLCBjaGFuZ2VMaWJjb2RlLCBnZXRDaXR5TGlzdCwgaGFzTG9naW4sIGRhdGFDb252ZXJ0LCBzZXRDdXJyZW50RGF0ZSwgZ2V0Q3VycmVudERhdGUgfSBmcm9tICdAL3V0aWxzJztcbmltcG9ydCB7c2hvd1RvYXN0fSBmcm9tICdAL3V0aWxzL3RpcCc7XG5pbXBvcnQge2dldE5vd0Zvcm1hdERhdGV9IGZyb20gJ0AvdXRpbHMvYm9vayc7XG5cbmNvbnN0IGFwcCA9IHdlcHkuJGluc3RhbmNlO1xubGV0IGxvY2F0aW9uQ2l0eSA9IG51bGw7XG52YXIgUVFNYXBXWCA9IHJlcXVpcmUoJ0AvdXRpbHMvcXFtYXAtd3gtanNzZGsubWluLmpzJyk7XG52YXIgcXFtYXBzZGs7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvKipcbiAgICog6aG16Z2i6YWN572uXG4gICAqL1xuICBjb25maWcgPSB7XG4gICAgJ25hdmlnYXRpb25CYXJUaXRsZVRleHQnOiAn5ZiJ5Zu+5YCf5LmmJyxcbiAgICAndXNpbmdDb21wb25lbnRzJzoge1xuICAgICAgJ2NpdHktbGlzdCc6ICcvY29tcG9uZW50cy93eC1jaXR5LWxpc3Qvd3gtY2l0eS1saXN0JyxcbiAgICAgICd0b2FzdCc6ICcvY29tcG9uZW50cy90b2FzdC90b2FzdCdcbiAgICB9LFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9O1xuXG4gIC8qKlxuICAgKiDlj6/nlKjkuo7pobXpnaLmqKHmnb/nu5HlrprnmoTmlbDmja5cbiAgICovXG4gIGRhdGEgPSB7XG4gICAgcXVlcnk6IG51bGwsXG4gICAgbWVzc2FnZUNvdW50OiAwLFxuICAgIGluZm9ybUZsYWc6IGZhbHNlLFxuICAgIGZpcnN0U3dpcGVySW5kZXg6IDAsLy/ph43mlrDor4TkvLDov5nkuKrlj4LmlbBcbiAgICBzaG93Q2l0eUNob29zZTogZmFsc2UsXG4gICAgY2l0eUxpc3Q6IFtdLFxuICAgIGN1ckNpdHk6ICcnLFxuICAgIGxpYkxpc3Q6IFtdLFxuICAgIGxpYnM6IFtdLFxuICAgIHNob3dMaWJDaG9vc2U6IGZhbHNlLFxuICAgIGhhc0xpYmNvZGU6IGZhbHNlLFxuICAgIGxpYm5hbWU6ICcnLFxuICAgIHNsaWRlcnM6IHsgaGlkZGVuOiB0cnVlIH0sXG4gICAgc2xpZGVyczU6IHsgaGlkZGVuOiB0cnVlIH0sXG4gICAgcGljUmVzb3VyY2U6IGFwcC5jb25maWdEYXRhLnBpY1Jlc291cmNlLFxuICAgIGJsVHlwZXM6IG51bGwsXG4gICAgbGlrZXM6IFtdLFxuICAgIGxpa2VzTnVtOiAwLC8v5b2T5YmN54yc5L2g5Zac5qyi6aG156CBXG4gICAgdGVtcFVybDogJ2h0dHBzOi8vY2RuLmppZXNodS5tZS9taW5pYS93ZXhpbi9pbWFnZXMvaWNfbG9jYWwucG5nJyxcbiAgICBoYXNMb2dpbjogZmFsc2UsXG4gICAgZmlyc3RjaGFjaGE6IGZhbHNlLFxuICAgIHNob3d0b2FzdERhdGE6IHt9LFxuICAgIGFuaW1hdGlvbkRhdGE6IG51bGwsXG4gICAgbGliY29kZTonJyxcbiAgICBwcmVJbmRleDowLFxuICAgIHNob3dBY3Rpdml0eU1hc2s6IGZhbHNlLFxuICAgIGFjdGl2aXR5OiBudWxsLFxuICAgIHNjYW5Cb3Jyb3c6bnVsbFxuICB9O1xuICB3YXRjaCA9IHt9O1xuXG4gIG9uTG9hZChxdWVyeSkge1xuICAgIHFxbWFwc2RrID0gbmV3IFFRTWFwV1goe1xuICAgICAga2V5OiBhcHAuY29uZmlnRGF0YS5rZXkvL+i/memHjOiHquW3seeahGtleeenmOmSpei/m+ihjOWhq+WFhVxuICAgIH0pO1xuICAgIHd4LnNob3dTaGFyZU1lbnUoKVxuICAgIGlmKHF1ZXJ5LmxpYmNvZGUpe1xuICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLnF1ZXJ5ID0gYXBwLmdsb2JhbERhdGEucXVlcnk7XG4gICAgfVxuICAgIHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICBpZiAoZ2V0TGliY29kZUNob29zZWQoKSkge1xuICAgICAgYXBwLmdldENvbW1vbkNvbmZpZyhyZXMgPT4ge1xuICAgICAgICB0aGlzLmNhbGxCbFR5cGUoKTtcbiAgICAgICAgaWYoYXBwLmNvbmZpZ0RhdGEuY29tbW9uQ29uZmlnLnNob3dNZW51cyAmJiBhcHAuY29uZmlnRGF0YS5jb21tb25Db25maWcuc2hvd01lbnVzLnNjYW5Cb3Jyb3cpe1xuICAgICAgICAgIHRoaXMuc2NhbkJvcnJvdyA9IDE7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2NhbkJvcnJvdyA9IDI7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy/lrprkvY3nu4/nuqzluqZcbiAgZ2V0TG9jYXRpb24oKSB7XG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgdHlwZTogJ3dnczg0JywgICAvL+m7mOiupOS4uiB3Z3M4NCDov5Tlm54gZ3BzIOWdkOagh++8jGdjajAyIOi/lOWbnuWPr+eUqOS6jiB3eC5vcGVuTG9jYXRpb24g55qE5Z2Q5qCHXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGxldCBsYXRpdHVkZSA9IHJlcy5sYXRpdHVkZTtcbiAgICAgICAgbGV0IGxvbmdpdHVkZSA9IHJlcy5sb25naXR1ZGU7XG4gICAgICAgIHRoaXMubG9hZENpdHkobG9uZ2l0dWRlLCBsYXRpdHVkZSlcbiAgICAgIH0sXG4gICAgICBmYWlsOiByZXMgPT4ge1xuICAgICAgICB0aGlzLmdldExpYkxpc3QoKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGxvYWRDaXR5KGxvbmdpdHVkZSxsYXRpdHVkZSl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHFxbWFwc2RrLnJldmVyc2VHZW9jb2Rlcih7XG4gICAgICBsb2NhdGlvbjoge1xuICAgICAgICBsYXRpdHVkZTogbGF0aXR1ZGUsXG4gICAgICAgIGxvbmdpdHVkZTogbG9uZ2l0dWRlXG4gICAgICB9LFxuICAgICAgc2lnOmFwcC5jb25maWdEYXRhLnNpZyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG4gICAgICAgIGxvY2F0aW9uQ2l0eSA9cmVzLnJlc3VsdC5hZF9pbmZvLmNpdHk7XG4gICAgICAgIC8vIOiOt+WPluWbvuS5pummhuWIl+ihqFxuICAgICAgICB0aGF0LmdldExpYkxpc3QoKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRoYXQuZ2V0TGliTGlzdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25TaG93KCkge1xuICAgIC8v5Z+L54K5XG4gICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+mmlumhtScgKTtcbiAgICBpZiAoZ2V0TGliY29kZUNob29zZWQoKSkge1xuICAgICAgdGhpcy50ZW1wVXJsID0gJ2h0dHBzOi8vY2RuLmppZXNodS5tZS9taW5pYS9saWJfbG9nby8nICsgZ2V0TGliY29kZUNob29zZWQoKSArICcucG5nJ1xuICAgICAgdGhpcy5saWJjb2RlID0gZ2V0TGliY29kZUNob29zZWQoKTtcbiAgICB9XG4gICAgdGhpcy5oYXNMb2dpbiA9IGhhc0xvZ2luKClcbiAgfVxuXG4gIG9uSGlkZSgpIHtcbiAgICAvL+Wfi+eCuVxuICAgIGFwcC4kd3hhcHAuYWxkc3RhdC5zZW5kRXZlbnQoICfpppbpobXpgIDlh7onICk7XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGZpcnN0U3dpcGVyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuZmlyc3RTd2lwZXJJbmRleCA9IGUuZGV0YWlsLmN1cnJlbnQ7XG4gICAgIH0sXG4gICAgaGFuZGxlQ2hvb3NlQ2l0eSgpIHtcbiAgICAgIGlmICh0aGlzLnF1ZXJ5ICYmIHRoaXMucXVlcnkubGliY29kZSAmJiB0aGlzLnF1ZXJ5LmNoYW5nZWFibGVkID09IDApe1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd0xpYkNob29zZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93Q2l0eUNob29zZSA9IHRydWU7XG4gICAgfSxcbiAgICBib29rSW5mbyhpdGVtKSB7XG4gICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgY29uc3QgbGliY29kZSA9IGl0ZW0ubGliY29kZTtcbiAgICAgIGNvbnN0IGJvb2tpZCA9IGl0ZW0uYm9va2lkO1xuICAgICAgY29uc3QgYm9va3JlY25vID0gaXRlbS5ib29rUmVjTm87XG4gICAgICBjb25zdCB1cmxTdHIgPSAnL2hvbWUvcGFnZXMvYm9va0luZm8vYm9va0luZm8/bGliY29kZT0nICsgbGliY29kZSArIFwiJmJvb2tpZD1cIiArIGJvb2tpZCArIFwiJmJvb2tyZWNubz1cIiArIGJvb2tyZWNubyArIFwiJmNsYXNzbm89XCI7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IHVybFN0clxuICAgICAgfSlcbiAgICB9LFxuICAgIGxpYlRhcEZyb21QYWdlKGxpYmNvZGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGxpYmNvZGUpXG4gICAgICBpZiAoJ2NhbmNlbCcgIT0gbGliY29kZSkge1xuICAgICAgICB0aGlzLmxpYlRhcChsaWJjb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd0xpYkNob29zZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2xpZGVyQ2xpY2soaW5kZXgpIHtcbiAgICAgIGxldCBzbGlkZXIgPSB0aGlzLnNsaWRlcnMuZGF0YVtpbmRleF07XG4gICAgICB0aGlzLmZvcm1hdGVTbGlkZXIoc2xpZGVyKTtcbiAgICAgIC8v5Z+L54K5XG4gICAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAnYmFubmVyJyx7J+agh+mimCc6IHNsaWRlci50aXRsZX0gKTtcbiAgICB9LFxuXG4gICAgLy8g5p+l55yL5YWo6YOoXG4gICAganVtcF9saXN0KGZsYWcsIHRpdGxlKSB7XG4gICAgICAvL+Wfi+eCuVxuICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggdGl0bGUgKyAnLeafpeeci+WFqOmDqCcgKTtcbiAgICAgIGxldCBwYXRoID0gJy9jbGFzcy9wYWdlcy9ib29rcy9ib29rcz90eXBlPTMmZmxhZz0nICsgZmxhZyArICcmdGl0bGU9JyArIHRpdGxlICsgJyYnO1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBwYXRoXG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8v5p+l55yL5Lmm5YiK6K+m5oOFXG4gICAgYm9va0xpc3REZXRhaWwoc2hlbGZJZCwgdGl0bGUpIHtcbiAgICAgIC8v5Z+L54K5XG4gICAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5Li76aKY5Lmm5Y2VYmFubmVyJyx7J+agh+mimCc6IHRpdGxlfSApO1xuICAgICAgY29uc3QgdXJsID0gJy9ob21lL3BhZ2VzL2Jvb2tMaXN0RGV0YWlsL2Jvb2tMaXN0RGV0YWlsP3NoZWxmSWQ9JyArIHNoZWxmSWQ7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy/lhbPpl63mtLvliqjlvLnnqpdcbiAgICBjbG9zZUFjdGl2aXR5TWFzaygpIHtcbiAgICAgIHRoaXMuc2hvd0FjdGl2aXR5TWFzayA9IGZhbHNlO1xuICAgIH0sXG4gICAgLy/mn6XnnIvmtLvliqjor6bmg4VcbiAgICBhY3Rpdml0eUNsaWNrKGFjdGl2aXR5KSB7XG4gICAgICBsZXQgc2xpZGVyID0gYWN0aXZpdHk7XG4gICAgICB0aGlzLmZvcm1hdGVTbGlkZXIoc2xpZGVyKTtcbiAgICAgIHRoaXMuc2hvd0FjdGl2aXR5TWFzayA9IGZhbHNlO1xuICAgIH0sXG4gIH07XG5cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5kYXRhSW5pdCgpO1xuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgfVxuXG4gIGRhdGFJbml0KCkge1xuICAgIHRoaXMuZmlyc3RTd2lwZXJJbmRleCA9IDA7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgICBsZXQgdGltZXMgPSBzZXRJbnRlcnZhbChyZXMgPT4ge1xuICAgICAgaWYgKGFwcC5jb25maWdEYXRhLmNvbW1vbkNvbmZpZykge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVzKVxuICAgICAgICBpZihhcHAuY29uZmlnRGF0YS5jb21tb25Db25maWcuc2hvd01lbnVzICYmIGFwcC5jb25maWdEYXRhLmNvbW1vbkNvbmZpZy5zaG93TWVudXMuc2NhbkJvcnJvdyl7XG4gICAgICAgICAgIHRoaXMuc2NhbkJvcnJvdyA9IDE7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICB0aGlzLnNjYW5Cb3Jyb3cgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcHAuY29uZmlnRGF0YS5jb21tb25Db25maWcub3BlbkppYW5zaHVTaGVsZiAmJiBhcHAuY29uZmlnRGF0YS5jb21tb25Db25maWcub3BlbkppYW5zaHVTaGVsZiA9PSAxKXtcbiAgICAgICAgICB0aGlzLmJvb2tMaXN0KCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICB0aGlzLnNsaWRlcnM1ID0ge1xuICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LDUwMClcbiAgICB0aGlzLmNhbGxTbGlkZXIoWzEsMjVdKTtcbiAgICB0aGlzLmNhbGxCbFR5cGUoKTtcbiAgfVxuXG4gIC8v54yc5L2g5Zac5qyi77yM5paw5Lmm77yM5o6o6I2QXG4gIGNhbGxCbFR5cGUoKSB7XG4gICAgaWYgKHRoaXMuYmxUeXBlcykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBsaWJjb2RlID0gZ2V0TGliY29kZUNob29zZWQoKTtcbiAgICBsZXQgcGFyYW0gPSB7IGxpYmNvZGU6IGxpYmNvZGUgfTtcbiAgICBjb25maWcuZ2V0QmxUeXBlKHBhcmFtKS50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnJlc3VsdCA9PSAxICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGJsdHlwZXMgPSByZXMuZGF0YTtcbiAgICAgICAgYmx0eXBlcy5mb3JFYWNoKChpdGVtcywgaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgbGlzdCA9IGl0ZW1zLmxpc3Q7XG4gICAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udGl0bGUubGVuZ3RoID4gMTgpIHtcbiAgICAgICAgICAgICAgaXRlbS5ub2ltZ3RpdGxlID0gaXRlbS50aXRsZS5zdWJzdHJpbmcoMCwgMTcpICsgJy4uLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGF0YUNvbnZlcnQobGlzdCwgcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtcy5sYWJlbCA9PT0gJ+eMnOS9oOWWnOasoicpIHtcbiAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAvL+W+queOrzbkuKrkuLrkuIDku71cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGlrZXNbcGFyc2VJbnQoaS82KV0pICB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxpa2VzW3BhcnNlSW50KGkvNildID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGlrZXNbcGFyc2VJbnQoaS82KV0gPSB0aGlzLmxpa2VzW3BhcnNlSW50KGkvNildLmNvbmNhdChpdGVtKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYmx0eXBlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuYmxUeXBlcyA9IGJsdHlwZXM7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8v54yc5L2g5Zac5qyi5o2i5LiA5o2iXG4gIGNoYW5nZUxpa2VzKCkge1xuICAgIGlmICh0aGlzLmxpa2VzTnVtID09PSB0aGlzLmxpa2VzLmxlbmd0aCAtIDEpICB7XG4gICAgICB0aGlzLmxpa2VzTnVtID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpa2VzTnVtICsrXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluWbvuS5pummhuWIl+ihqFxuICAgKi9cbiAgZ2V0TGliTGlzdCgpIHtcbiAgICBjb25maWcuZ2V0UmVnaW9uQW5kTGliKCkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5yZXN1bHQgPT09IDEpIHtcbiAgICAgICAgdGhpcy5jaXR5TGlzdCA9IGdldENpdHlMaXN0KHJlcy5yZWdpb25MaXN0KTtcbiAgICAgICAgdGhpcy5saWJMaXN0ID0gcmVzLmRhdGE7XG4gICAgICAgIHRoaXMuZ2V0Q2hvb3NlZExpYk5hbWUoKTtcbiAgICAgICAgdGhpcy5jaGVja0xpYigpO1xuICAgICAgICB0aGlzLmhhc0xpYmNvZGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGdldExpYmNvZGVDaG9vc2VkKCkpIHtcbiAgICAgICAgICB0aGlzLmhhc0xpYmNvZGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMubGlibmFtZSA9IGFwcC5nbG9iYWxEYXRhLmxpYm5hbWU7XG4gICAgICAgICAgdGhpcy5zaG93Q2l0eUNob29zZSA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBpZiAoIXRoaXMucXVlcnkgfHwgIXRoaXMucXVlcnkubGliY29kZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93Q2l0eUNob29zZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5ICYmIHRoaXMucXVlcnkubGliY29kZSkge1xuICAgICAgICAgIHRoaXMubGliVGFwKHRoaXMucXVlcnkubGliY29kZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zaG93TG9nb1lpZGkocmVzLnJlZ2lvbkxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNob3dMb2dvWWlkaSh0ZW1wKSB7XG4gICAgaWYoIWxvY2F0aW9uQ2l0eSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaGFzTGliY29kZSA9IGZhbHNlO1xuICAgIGxldCB0ZW1wdXJsID0gJydcbiAgICAvL2lmIChnZXRMaWJjb2RlQ2hvb3NlZCgpKSB7XG4gICAgICBsZXQgYXV0b0FkZHJlc3MgPSB0ZW1wLmZpbHRlcihpdGVtID0+IGxvY2F0aW9uQ2l0eS5pbmRleE9mKGl0ZW0uY2l0eSkgPj0gMClcbiAgICAgIGlmIChhdXRvQWRkcmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCByZXMgPSB7XG4gICAgICAgICAgY2l0eTogYXV0b0FkZHJlc3NbMF0uY2l0eSxcbiAgICAgICAgICBhZENvZGU6IGF1dG9BZGRyZXNzWzBdLmFkQ29kZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgbGlicyA9IHRoaXMubGliTGlzdFtyZXMuYWRDb2RlXTtcbiAgICAgICAgbGV0IHRlbXBMaWIgPSBsaWJzLmZpbHRlcihpdGVtID0+IGl0ZW0ubGliY29kZSA9PT0gZ2V0TGliY29kZUNob29zZWQoKSlcbiAgICAgICAgaWYgKHRlbXBMaWIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGhhc0xpYmNvZGUgPSB0cnVlO1xuICAgICAgICAgIHRlbXB1cmwgPSAnaHR0cHM6Ly9jZG4uamllc2h1Lm1lL21pbmlhL2xpYl9sb2dvLycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJy5wbmcnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmgqjmmK/lkKbmg7PliIfmjaLliLDlvZPlnLDlm77kuabppoY/JyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5YiH5o2iJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICfkuI3liIfmjaInLFxuICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzAwOWVmZicsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlTGliU29uTWV0aG9kKGF1dG9BZGRyZXNzWzBdLHRlbXApO1xuICAgICAgICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+mmlumhteWumuS9jScgKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYXNMaWJjb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0ZW1wdXJsID0gJ2h0dHBzOi8vY2RuLmppZXNodS5tZS9taW5pYS9saWJfbG9nby8nICsgZ2V0TGliY29kZUNob29zZWQoKSArICcucG5nJ1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzTGliY29kZSA9IGhhc0xpYmNvZGU7XG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wdXJsID0gdGVtcHVybDtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAvL31cbiAgfVxuXG4gIC8v5YiH5o2i5Yiw5b2T5YmN5Z+O5biCXG4gIGNob29zZUxpYlNvbk1ldGhvZChsaWJjb2RlLCB0ZW1wKSB7XG4gICAgbGV0IGNpdHljb2RlID0gbGliY29kZS50ZWxlQ29kZTtcbiAgICBpZiAoY2l0eWNvZGUpIHtcbiAgICAgIGxldCBhdXRvQWRkcmVzcyA9IHRlbXAuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hZENvZGUgPT09IGNpdHljb2RlKVxuICAgICAgaWYgKGF1dG9BZGRyZXNzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGF1dG9BZGRyZXNzID0gdGVtcC5maWx0ZXIoaXRlbSA9PiBpdGVtLnRlbGVDb2RlID09PSBjaXR5Y29kZSlcbiAgICAgIH1cbiAgICAgIGlmIChhdXRvQWRkcmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCByZXMgPSB7XG4gICAgICAgICAgY2l0eTogYXV0b0FkZHJlc3NbMF0uY2l0eSxcbiAgICAgICAgICBhZENvZGU6IGF1dG9BZGRyZXNzWzBdLmFkQ29kZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VyQ2l0eSA9IHJlcy5jaXR5O1xuICAgICAgICB0aGlzLmNob29zZV9saWIocmVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+a4qemmqOaPkOekuicsXG4gICAgICAgICAgY29uZmlybUNvbG9yOiAnIzAwOWVmZicsXG4gICAgICAgICAgY29udGVudDogJ+aCqOaJgOWcqOeahOWfjuW4guaaguacquacieWQiOS9nOWbvuS5pummhizor7fpgInmi6nlhbbku5bln47luILlm77kuabppobov5vooYzmtY/op4jkvb/nlKgnLFxuICAgICAgICAgIGJ1dHRvblRleHQ6ICfmiJHnn6XpgZPkuoYnLFxuICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hvb3NlQ2l0eSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+a4qemmqOaPkOekuicsXG4gICAgICAgIGNvbmZpcm1Db2xvcjogJyMwMDllZmYnLFxuICAgICAgICBjb250ZW50OiAn5oKo5omA5Zyo55qE5Z+O5biC5pqC5pyq5pyJ5ZCI5L2c5Zu+5Lmm6aaGLOivt+mAieaLqeWFtuS7luWfjuW4guWbvuS5pummhui/m+ihjOa1j+iniOS9v+eUqCcsXG4gICAgICAgIGJ1dHRvblRleHQ6ICfmiJHnn6XpgZPkuoYnLFxuICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVDaG9vc2VDaXR5KCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjaG9vc2VfbGliKHJlcykge1xuICAgIGNvbnNvbGUubG9nKCdjaG9vc2UgbGliIG5ldyBiZWdpbicpO1xuICAgIGxldCBsaWJzID0gdGhpcy5saWJMaXN0W3Jlcy5hZENvZGVdO1xuICAgIGlmICghbGlicykge1xuICAgICAgc2hvd1RvYXN0KCfor6Xln47luILmnKrlj5HnjrDlvIDpgJrnmoTlm77kuabppoYnLCB0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGxpYnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLmxpYlRhcChsaWJzWzBdLmxpYmNvZGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjaG9vc2UgbGliIGJlZ2luMScpO1xuICAgICAgdGhpcy5zaG93TGliQ2hvb3NlID0gdHJ1ZTtcbiAgICAgIHRoaXMubGlicyA9IGxpYnM7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgfVxuXG4gIC8v6YCJ5oup5Z+O5biCXG4gIGJpbmRkZXRhaWwoZSkge1xuICAgIGxldCBhZENvZGUgPSBlLmRldGFpbC5hZENvZGU7XG4gICAgdGhpcy5saWJzID0gdGhpcy5saWJMaXN0W2FkQ29kZV07XG4gICAgdGhpcy5jdXJDaXR5ID0gZS5kZXRhaWwuY2l0eTtcbiAgICB0aGlzLnNob3dDaXR5Q2hvb3NlID0gZmFsc2U7XG4gICAgaWYgKHRoaXMubGlicy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMubGliVGFwKHRoaXMubGlic1swXS5saWJjb2RlKVxuICAgIH1lbHNle1xuICAgICAgdGhpcy5zaG93TGliQ2hvb3NlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvL+ajgOa1i+aYr+WQpuW3sumAieWbvuS5pummhlxuICBjaGVja0xpYigpIHtcbiAgICBpZiAoIWdldExpYmNvZGVDaG9vc2VkKCkgJiYgIXRoaXMuc2hvd0xpYkNob29zZSkge1xuICAgICAgdGhpcy5zaG93Q2l0eUNob29zZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZ2V0TGliY29kZUNob29zZWQoKSkge1xuICAgICAgaWYgKHRoaXMuc2xpZGVycy5oaWRkZW4gfHwgYXBwLmdsb2JhbERhdGEubGliQ2hhbmdlZCB8fCAhdGhpcy5ibHR5cGVzKSB7XG4gICAgICAgIHRoaXMuZGF0YUluaXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL+mAieaLqeWbvuS5pummhlxuICBsaWJUYXAobGliY29kZSkge1xuICAgIHRoaXMubGliY29kZSA9IGxpYmNvZGU7XG4gICAgY29uc29sZS5sb2coJ2xpYiBjaG9vc2U6JyArIGxpYmNvZGUpO1xuICAgIGlmIChsaWJjb2RlID09IGdldExpYmNvZGVDaG9vc2VkKCkpIHtcbiAgICAgIHRoaXMuc2hvd0NpdHlDaG9vc2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd0xpYkNob29zZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFuZ2VMaWJjb2RlKGxpYmNvZGUsIHRoaXMuY3VyQ2l0eSk7XG4gICAgICB0aGlzLnRlbXBVcmwgPSAnaHR0cHM6Ly9jZG4uamllc2h1Lm1lL21pbmlhL2xpYl9sb2dvLycgKyBsaWJjb2RlICsgJy5wbmcnXG4gICAgICB0aGlzLmdldENob29zZWRMaWJOYW1lKCk7XG4gICAgICB0aGlzLmJsVHlwZXMgPSBudWxsO1xuICAgICAgdGhpcy5saWtlcyA9IFtdO1xuICAgICAgdGhpcy5kYXRhSW5pdCgpO1xuICAgICAgdGhpcy5zaG93Q2l0eUNob29zZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93TGliQ2hvb3NlID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8v6I635Y+W5Zu+5Lmm6aaG5ZCN56ewXG4gIGdldENob29zZWRMaWJOYW1lKCkge1xuICAgIGxldCBsaWJjb2RlID0gZ2V0TGliY29kZUNob29zZWQoKTtcbiAgICBmb3IgKGxldCBpIGluIHRoaXMubGliTGlzdCkge1xuICAgICAgbGV0IGxpYnMgPSB0aGlzLmxpYkxpc3RbaV07XG4gICAgICBmb3IgKGxldCBqIGluIGxpYnMpIHtcbiAgICAgICAgaWYgKGxpYnNbal0ubGliY29kZSA9PSBsaWJjb2RlKSB7XG4gICAgICAgICAgdGhpcy5saWJuYW1lID0gbGlic1tqXS5saWJuYW1lO1xuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLmxpYm5hbWUgPSBsaWJzW2pdLmxpYm5hbWU7XG4gICAgICAgICAgaWYodGhpcy5xdWVyeSAmJiB0aGlzLnF1ZXJ5LmxpYmNvZGUpIHtcbiAgICAgICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgICAgICAgdGl0bGU6IGxpYnNbal0ubGlibmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy/ojrflj5bova7mkq1cbiAgY2FsbFNsaWRlcihzaG93c3BhY2UpIHtcbiAgICBsZXQgcGFyYW0gPSB7IHNob3dzcGFjZXM6IHNob3dzcGFjZSB9O1xuICAgIGNvbmZpZy5nZXRTbGlkZXJzKHBhcmFtKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgc2xpZGVycyA9IHRoaXMuc2xpZGVycztcbiAgICAgIGxldCBzaG93QWN0aXZpdHkgPSBudWxsO1xuICAgICAgbGV0IGFjdGl2aXR5ID0gdGhpcy5hY3Rpdml0eTtcbiAgICAgIGxldCBjdXJyZW50RGF0ZSA9IGdldE5vd0Zvcm1hdERhdGUoKTtcbiAgICAgIGlmIChyZXMucmVzdWx0ID09IDEpIHtcbiAgICAgICAgaWYgKHJlcy5zbGlkZXIxLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzbGlkZXJzLmRhdGEgPSByZXMuc2xpZGVyMTtcbiAgICAgICAgICBzbGlkZXJzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlcnMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0Q3VycmVudERhdGUoKSAhPSBjdXJyZW50RGF0ZSkge1xuICAgICAgICAgIGlmIChyZXMuc2xpZGVyMjUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYWN0aXZpdHkgPSByZXMuc2xpZGVyMjVbMF07XG4gICAgICAgICAgICBzaG93QWN0aXZpdHkgPSAxO1xuICAgICAgICAgICAgc2V0Q3VycmVudERhdGUoY3VycmVudERhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zbGlkZXJzID0gc2xpZGVycztcbiAgICAgIHRoaXMuc2hvd0FjdGl2aXR5TWFzayA9IHNob3dBY3Rpdml0eTtcbiAgICAgIHRoaXMuYWN0aXZpdHkgPSBhY3Rpdml0eTtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG5cbiAgLy/kuabljZVcbiAgYm9va0xpc3QoKSB7XG4gICAgY29uZmlnLmdldEppYW5zaHVTaGVsZignJykudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHNsaWRlcnMgPSB0aGlzLnNsaWRlcnM1O1xuICAgICAgaWYgKHJlcy5yZXN1bHQgPT0gMSkge1xuICAgICAgICBzbGlkZXJzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBzbGlkZXJzLmRhdGEgPSByZXMuZGF0YTtcbiAgICAgIH1lbHNle1xuICAgICAgICBzbGlkZXJzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHNsaWRlcnMuZGF0YSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5zbGlkZXJzNSA9IHNsaWRlcnM7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0pXG4gIH1cblxuICBnb0Jvb2tMaXN0KCkge1xuICAgIC8v5Z+L54K5XG4gICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+S4u+mimOS5puWNlS3mn6XnnIvlhajpg6gnICk7XG5cbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL2hvbWUvcGFnZXMvYm9va0xpc3QvYm9va0xpc3QnXG4gICAgfSlcbiAgfVxuXG4gIGZvcm1hdGVTbGlkZXIoc2xpZGVyKSB7XG4gICAgc3dpdGNoIChzbGlkZXIuc2xpZGVydHlwZSkge1xuICAgICAgY2FzZSBcIkFDVFwiOi8v5YaF6YOo6Lez6L2sXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldEFjdFVybChzbGlkZXIpO1xuICAgICAgICBpZiAodXJsICE9ICcjJykge1xuXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiREVUQUlMXCI6Ly/or6bmg4XlsZXnpLpcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBlbmNvZGVVUklDb21wb25lbnQoc2xpZGVyLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgbGV0IHVybFN0ciA9ICcvcGFnZXMvaG9tZS9zbGlkZXIvc2xpZGVyP3R5cGU9MSZjb250ZW50PScgKyBjb250ZW50O1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogdXJsU3RyXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlVSTFwiOi8v5aSW6YOo6aG16Z2iLuaaguaXtuS4jeaPkOS+m+ivpeWKn+iDvVxuICAgICAgICBpZiAoc2xpZGVyLndlYnVybCkge1xuICAgICAgICAgIGxldCB3ZWJ1cmwgPSBzbGlkZXIud2VidXJsO1xuICAgICAgICAgIGxldCB1Y2FyZG5vMSA9IFwiXCI7XG4gICAgICAgICAgbGV0IHVzZXJJZCA9IFwiXCI7XG4gICAgICAgICAgaWYoc2xpZGVyICYmIHNsaWRlci5hdXRoZmxhZyAmJiBzbGlkZXIuYXV0aGZsYWcgPT0gMSl7XG4gICAgICAgICAgICBpZihnZXRTZ21haW4oKSAmJiBoYXNMb2dpbigpKXtcbiAgICAgICAgICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJEYXRhICYmIGFwcC5nbG9iYWxEYXRhLnVzZXJEYXRhLmJhc2U2NENhcmROdW1iZXIpIHtcbiAgICAgICAgICAgICAgICB1Y2FyZG5vMSA9IGFwcC5nbG9iYWxEYXRhLnVzZXJEYXRhLmJhc2U2NENhcmROdW1iZXI7XG4gICAgICAgICAgICAgICAgdXNlcklkID0gYXBwLmdsb2JhbERhdGEudXNlckRhdGEudXNlcklkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciB1cmxTdHIgPSAnJztcbiAgICAgICAgICAgICAgaWYgKHdlYnVybC5pbmRleE9mKFwiZ29sZEhvbWVcIik+LTEpe1xuICAgICAgICAgICAgICAgIHVybFN0ciA9ICcvcGFnZXMvd2ViVmlldy93ZWJWaWV3P3VybD0nICsgd2VidXJsICsgJyZ0aXRsZT0nICsgc2xpZGVyLnRpdGxlICsnJmxpYmNvZGU9JyArIGdldExpYmNvZGVDaG9vc2VkKCkgKyBcIiZ1c2VySWQ9XCIgKyB1c2VySWQ7XG4gICAgICAgICAgICAgICAgLy91cmxTdHIgPSAnL2hvbWUvcGFnZXMvdHJhbnNpdC90cmFuc2l0P3R5cGU9MSc7XG4gICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB1cmxTdHIgPSAnL3BhZ2VzL3dlYlZpZXcvd2ViVmlldz91cmw9JyArIHdlYnVybCArICcmdGl0bGU9JyArIHNsaWRlci50aXRsZSArICcmbGliY29kZT0nICsgZ2V0TGliY29kZUNob29zZWQoKSArIFwiJnVjYXJkbm8xPVwiICsgdWNhcmRubzE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybFN0clxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIC8vdmFyIHVybFN0ciA9ICcvcGFnZXMvd2ViVmlldy93ZWJWaWV3P3VybD0nICsgd2VidXJsICsgJyZ0aXRsZT0nICsgc2xpZGVyLnRpdGxlICsgJyZsaWJjb2RlPScgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgXCImdWNhcmRubzE9XCIgKyB1Y2FyZG5vMTtcbiAgICAgICAgICAgICAgaWYgKHdlYnVybC5pbmRleE9mKFwiZ29sZEhvbWVcIik+LTEpe1xuICAgICAgICAgICAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VyRGF0YSAmJiBhcHAuZ2xvYmFsRGF0YS51c2VyRGF0YS5iYXNlNjRDYXJkTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICB1c2VySWQgPSBhcHAuZ2xvYmFsRGF0YS51c2VyRGF0YS51c2VySWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcvbWluZS9wYWdlcy9teUluZm8vcmVhZGVyQ2FyZC9yZWFkZXJDYXJkP3VybD0nK3dlYnVybCsnJnRpdGxlPScrc2xpZGVyLnRpdGxlKycmbGliY29kZT0nKyBnZXRMaWJjb2RlQ2hvb3NlZCgpKycmdHlwZT13ZWJ1cmwnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcvbWluZS9wYWdlcy9teUluZm8vcmVhZGVyQ2FyZC9yZWFkZXJDYXJkP3VybD0nK3dlYnVybCsnJnRpdGxlPScrc2xpZGVyLnRpdGxlKycmbGliY29kZT0nKyBnZXRMaWJjb2RlQ2hvb3NlZCgpKycmdHlwZT13ZWJ1cmwnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgdXJsU3RyID0gJy9wYWdlcy93ZWJWaWV3L3dlYlZpZXc/dXJsPScgKyB3ZWJ1cmwgKyAnJnRpdGxlPScgKyBzbGlkZXIudGl0bGUgKyAnJmxpYmNvZGU9JyArIGdldExpYmNvZGVDaG9vc2VkKCk7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IHVybFN0clxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiU0hFTEZcIjogLy/kuabljZVcbiAgICAgICAgbGV0IF9zdGF0aWNSZXNvdXJjZSA9IGFwcC5jb25maWdEYXRhLnBpY1Jlc291cmNlO1xuICAgICAgICBpZiAoX3N0YXRpY1Jlc291cmNlLmluZGV4T2YoJ2h0dHBzOi8vJykgIT0gMCAmJiBfc3RhdGljUmVzb3VyY2UuaW5kZXhPZignaHR0cHM6Ly8nKSAhPSAwKSB7XG4gICAgICAgICAgX3N0YXRpY1Jlc291cmNlID0gXCJodHRwczovL2Nkbi5qaWVzaHUubWVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xpZGVyLndlYnVybC5pbmRleE9mKCdodHRwczovLycpICE9IDAgJiYgc2xpZGVyLndlYnVybC5pbmRleE9mKCdodHRwczovLycpICE9IDApIHtcbiAgICAgICAgICBzbGlkZXIud2VidXJsID0gX3N0YXRpY1Jlc291cmNlICsgc2xpZGVyLndlYnVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xpZGVyLndlYnVybC5pbmRleE9mKCc/JykgIT0gLTEpIHtcbiAgICAgICAgICBzbGlkZXIud2VidXJsID0gc2xpZGVyLndlYnVybCArICcmJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIud2VidXJsID0gc2xpZGVyLndlYnVybCArICc/JztcbiAgICAgICAgfVxuICAgICAgICBzbGlkZXIudXJsID0gc2xpZGVyLndlYnVybCArICdsaWJjb2RlPScgKyBfbGliY29kZURlZmF1bHQgKyAnJnNvdXJjZT0nICsgX3NvdXJjZSArICcmYXBwRW52aXJvbm1lbnQ9JyArIFdlYlV0aWwuZ2V0QXBwRW52aXJvbm1lbnQoKSArICcmYmluZElkPScgKyBXZWJVdGlsLmdldFdlY2hhdCgpLmJpbmRJZDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICog5qC55o2uYWN0aW9uaWTliKTmlq1cbiAgICovXG4gIGdldEFjdFVybChzbGlkZXIpIHtcbiAgICBsZXQgYWN0aW9uID0gc2xpZGVyLmFjdGlvbjtcbiAgICBsZXQgYWN0aW9uaWQgPSBzbGlkZXIuYWN0aW9uaWQ7XG4gICAgbGV0IHVybCA9IFwiI1wiO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuXG4gIC8v5pCc57Si6L+b5YWl5YiG57G7XG4gIHRvQ2xhc3NpZnkoKSB7XG4gICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9ob21lL3BhZ2VzL3NlYXJjaC9zZWFyY2gnXG4gICAgfSk7XG4gIH1cblxuICAvL+aJq+S4gOaJq1xuICBzYW8oKSB7XG4gICAgd3guc2NhbkNvZGUoe1xuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIGxldCBpc2JuID0gcmVzLnJlc3VsdDtcbiAgICAgICAgbGV0IHBhdGggPSAnL2NsYXNzL3BhZ2VzL2Jvb2tzL2Jvb2tzP3R5cGU9MiZrZXk9JyArIGlzYm4gKyAnJnNhbz0xJic7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBwYXRoXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGZhaWwocmVzKXtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aJq+aPj+Wksei0pSzph43mlrDmiavmj4/vvJ8nLFxuICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2FvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgfSlcbiAgfVxuXG4gIHNjYW5Cb3Jyb3coKXtcbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL2hvbWUvcGFnZXMvc2NhbmJvcnJvdy9zY2FuYm9ycm93J1xuICAgIH0pXG4gIH1cblxuICBnb0JhY2soKXtcbiAgICB0aGlzLnNob3dMaWJDaG9vc2UgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dDaXR5Q2hvb3NlID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==