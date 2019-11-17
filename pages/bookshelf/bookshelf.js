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

var _tip = require("./../../utils/tip.js");

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

var Bookshelf = function(_wepy$page) {
    _inherits(Bookshelf, _wepy$page);
    function Bookshelf() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Bookshelf);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bookshelf.__proto__ || Object.getPrototypeOf(Bookshelf)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "借书架",
            enablePullDownRefresh: true,
            usingComponents: {
                toast: "/components/toast/toast"
            }
        }, _this.data = {
            temp_arr: [],
            canIUse: _wepy2.default.canIUse("button.open-type.getUserInfo"),
            items: [],
            operation: "编辑",
            chooseCount: 0,
            login: false,
            bindCard: false,
            first: true,
            bookCount: 0,
            //书籍总数
            disCount: 0,
            //不可选总数
            allCheckValue: false,
            showtoastData: {},
            animationData: null,
            libcode: "",
            showTingMsg: null,
            tfmsg: null
        }, _this.cartData = {
            borrowCartConfig: null,
            allItemsFull: new Object()
        }, _this.methods = {
            canEdit: function canEdit() {
                var operation = this.operation;
                this.operation = operation === "编辑" ? "完成" : "编辑";
                this.allCheckValue = false;
                this.items.forEach(function(item) {
                    item.checkValue = false;
                });
                this.str = [];
                this.chooseCount = 0;
            },
            //勾选借书架时
            hendleChange: function hendleChange(e) {
                var l = e.detail.value.length;
                var items = this.items;
                if (this.temp_arr.length > l) {
                    var temp = this.arr(this.temp_arr, e.detail.value);
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id == temp[0]) {
                            items[i].checkValue = false;
                            break;
                        }
                    }
                } else {
                    var _temp2 = this.arr(e.detail.value, this.temp_arr);
                    for (var _i = 0; _i < items.length; _i++) {
                        if (items[_i].id == _temp2[0]) {
                            items[_i].checkValue = true;
                            break;
                        }
                    }
                }
                this.items = items;
                this.chooseCount = l;
                this.temp_arr = e.detail.value;
                if (l == this.bookCount) {
                    this.allCheckValue = true;
                } else if (this.data.allCheckValue) {
                    this.allCheckValue = false;
                }
            },
            //全选
            allCheck: function allCheck(str) {
                var _this2 = this;
                var temp_arr = [];
                this.allCheckValue = !this.allCheckValue;
                this.items.forEach(function(item) {
                    item.checkValue = _this2.allCheckValue;
                    if (str === "del") {
                        if (item.checkValue) {
                            temp_arr.push(item.id);
                        }
                    } else {
                        if (item.checkValue && item.available > 0) {
                            temp_arr.push(item.id);
                        }
                    }
                });
                this.temp_arr = temp_arr;
                if (this.allCheckValue) {
                    this.chooseCount = str === "del" ? this.bookCount : this.bookCount - this.disCount;
                } else {
                    this.chooseCount = 0;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret)
        /**
   * 页面配置
   */;
    }
    _createClass(Bookshelf, [ {
        key: "onShow",
        value: function onShow() {
            //埋点
            app.$wxapp.aldstat.sendEvent("借书架");
            if ((0, _utils.getSgmain)() && ((0, _utils.getWxVtJwt)() || (0, _utils.getWxJwt)())) {
                this.bindGetUserInfoSucc();
            } else {
                this.login = false;
                //未授权
                        }
            this.reset();
            this.tingFuSystemConfig();
        }
    }, {
        key: "onHide",
        value: function onHide() {
            //埋点
            app.$wxapp.aldstat.sendEvent("借书架退出");
        }
    }, {
        key: "reset",
        value: function reset() {
            this.items = [];
            this.allCheckValue = false;
            this.chooseCount = 0;
            this.temp_arr = [];
            this.operation = "编辑";
        }
    }, {
        key: "onPullDownRefresh",
        value: function onPullDownRefresh() {
            this.reset();
            this.getList();
        }
        //获取借书架列表
        }, {
        key: "getList",
        value: function getList(type) {
            var _this3 = this;
            if (type != "delete") {
                _wepy2.default.showLoading({
                    title: "加载中...",
                    mask: true
                });
            }
            _config2.default.getBorrowCartList().then(function(res) {
                if (type == "delete") {
                    _this3.allCheckValue = false;
                    _this3.chooseCount = 0;
                    _this3.items = null;
                    _this3.temp_arr = [];
                }
                var BorrowCartList = _this3.cartData;
                if (res.result == 1 && res.data.borrowCartList) {
                    var list = res.data.borrowCartList;
                    if (res.data.readerBorrowInfo) {
                        BorrowCartList.readerBorrowInfo = res.data.readerBorrowInfo;
                    }
                    (0, _utils.dataConvert)(list, function(res) {
                        var libcode = (0, _utils.getLibcodeChoosed)();
                        _this3.libcode = libcode;
                        var disCount = 0;
                        //根据图书馆分类
                                                var classifyObj = _this3.toClassify(res);
                        var listArr = [];
                        listArr = _this3.toSortByAvailable(classifyObj[libcode], listArr);
                        for (var key in classifyObj) {
                            if (key != libcode) {
                                listArr = _this3.toSortByAvailable(classifyObj[key], listArr);
                            }
                        }
                        var isFirstMap = {};
                        listArr.forEach(function(item, index) {
                            if (item.volname) {
                                item.title = item.title + " " + item.volname;
                            }
                            if (item.title.length > 30) {
                                item.title = item.title.substring(0, 29) + "...";
                            }
                            item["checkValue"] = false;
                            if (item.available <= 0) {
                                disCount++;
                            } else {
                                _this3.cartData.allItemsFull[item.id] = item;
                            }
                            // 每个图书馆的第一本书
                                                        if (!isFirstMap[item.libcode]) {
                                item.isfirstBook = true;
                                isFirstMap[item.libcode] = true;
                            } else {
                                item.isfirstBook = false;
                            }
                        });
                        _this3.items = listArr;
                        _this3.disCount = disCount;
                        _this3.bookCount = listArr.length;
                        _this3.$apply();
                        _wepy2.default.hideLoading();
                        wx.stopPullDownRefresh();
                    });
                } else {
                    _wepy2.default.hideLoading();
                }
            });
        }
        //根据可借数量排序
        }, {
        key: "toSortByAvailable",
        value: function toSortByAvailable(arr1, arr2) {
            if (arr1) {
                arr1.forEach(function(item) {
                    if (item.available > 0) {
                        arr2.push(item);
                    }
                });
                arr1.forEach(function(item) {
                    if (item.available <= 0) {
                        arr2.push(item);
                    }
                });
            }
            return arr2;
        }
    }, {
        key: "arr",
        value: function arr(arr1, arr2) {
            var set1 = new Set(arr1);
            var set2 = new Set(arr2);
            var subset = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = set1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;
                    if (!set2.has(item)) {
                        subset.push(item);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return subset;
        }
        //分类
        }, {
        key: "toClassify",
        value: function toClassify(arr) {
            var map = {};
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                if (!map[ai.libcode]) {
                    var dest = [];
                    dest.push(ai);
                    map[ai.libcode] = dest;
                } else {
                    var _dest = map[ai.libcode];
                    _dest.push(ai);
                }
            }
            return map;
        }
        //授权
        }, {
        key: "bindGetUserInfo",
        value: function bindGetUserInfo(e) {
            var _this4 = this;
            app.globalData.userInfo = e.detail.userInfo;
            (0, _utils.setWxUserInfo)(e.detail.userInfo);
            (0, _login.checkWxOnline)(function(res) {
                _this4.bindGetUserInfoSucc();
            });
        }
    }, {
        key: "bindGetUserInfoSucc",
        //授权成功
        value: function bindGetUserInfoSucc() {
            var _this5 = this;
            if (!this.cartData.borrowCartConfig) {
                var request_data = {
                    configKey: "borrowCartConfig",
                    libcode: (0, _utils.getLibcodeChoosed)()
                };
                _config2.default.getSystemConfig(request_data).then(function(res) {
                    if (res.result == 1) {
                        _this5.cartData.borrowCartConfig = res.data;
                        _this5.$apply();
                    }
                });
            }
            this.login = true;
            if ((0, _utils.getWxUserData)().userDisplay) {
                //埋点
                app.$wxapp.aldstat.sendEvent("登录成功", {
                    "来源": "借书架"
                });
                this.getList();
                this.bindCard = true;
                this.$apply();
            } else {
                (0, _login.autoLogin)((0, _utils.getSgmain)(), function(res) {
                    if ((0, _utils.getWxUserData)().userDisplay) {
                        //埋点
                        app.$wxapp.aldstat.sendEvent("登录成功", {
                            "来源": "借书架"
                        });
                        _this5.getList();
                        _this5.bindCard = true;
                        _this5.$apply();
                    } else {
                        if (_this5.first) {
                            wx.showModal({
                                title: "温馨提示",
                                content: "请前去绑定读者卡",
                                confirmColor: "#009eff",
                                success: function success(res) {
                                    if (res.confirm) {
                                        _this5.tapName();
                                    } else {
                                        _this5.login = true;
                                        _this5.$apply();
                                    }
                                }
                            });
                        }
                        _this5.bindCard = false;
                        _this5.first = false;
                    }
                });
            }
        }
        //移除/借阅
        }, {
        key: "deleteOrBorrow",
        value: function deleteOrBorrow() {
            if (this.operation == "编辑") {
                this.toBorrow();
            } else {
                this.delete();
            }
        }
        //删除
        }, {
        key: "delete",
        value: function _delete() {
            var _this6 = this;
            if (this.temp_arr.length == 0) {
                (0, _tip.showToast)("至少选择一本图书哦！", this);
                return;
            }
            //这个方法只是将temp_arr格式化转成json格式的字符串
                        var param = JSON.stringify({
                itemidList: this.temp_arr
            });
            //将json格式的字符串转换成json对象
                        var data = JSON.parse(param);
            _wepy2.default.showLoading({
                title: "加载中...",
                mask: true
            });
            _config2.default.deleteBorrowCart(data).then(function(res) {
                _wepy2.default.hideLoading();
                if (res.result == 1) {
                    (0, _tip.showToast)("操作成功！", _this6);
                    _this6.getList("delete");
                    _this6.$apply();
                    return;
                }
            });
        }
        //借阅
        }, {
        key: "toBorrow",
        value: function toBorrow() {
            if (!this.canPay()) {
                return;
            }
            var BorrowCartList = this.cartData;
            var selectedItemInfo = new Object();
            this.temp_arr.forEach(function(item) {
                if (BorrowCartList.allItemsFull[item]) {
                    selectedItemInfo[item] = BorrowCartList.allItemsFull[item];
                }
            });
            var re = "";
            Object.keys(selectedItemInfo).forEach(function(key, i) {
                var item = selectedItemInfo[key];
                var uniqueLibcode = "|" + item.libcode + "|";
                if (re.indexOf(uniqueLibcode) == -1) {
                    re = re + uniqueLibcode;
                }
            });
            if (re.indexOf("||") > 0) {
                (0, _tip.showToast)("同一个订单中只能有一个馆藏地！", this);
                return;
            }
            app.globalData.selectedBorrowBooks = selectedItemInfo;
            var url = "/bookshelf/pages/settlement/settlement";
            _wepy2.default.navigateTo({
                url: url
            });
        }
    }, {
        key: "canPay",
        value: function canPay() {
            var BorrowCartList = this.cartData;
            var borrowCartConfig = this.cartData.borrowCartConfig;
            if (borrowCartConfig && borrowCartConfig.libBookCount && borrowCartConfig.libBookCount > 0) {
                if (this.chooseCount > borrowCartConfig.libBookCount) {
                    (0, _tip.showToast)("每单不得超过" + borrowCartConfig.libBookCount + "本", this);
                    return false;
                }
            }
            //检查是否可以去结算
            //1.判断是否已选择
                        if (this.temp_arr.length == 0) {
                (0, _tip.showToast)("至少选择一本哦", this);
                return;
            }
            //2.判断是否可借
            //3.判断是否有欠款
            //4.判断是否超过可借数量
                        if (BorrowCartList.readerBorrowInfo != null) {
                if (BorrowCartList.readerBorrowInfo.cannotBorrow) {
                    (0, _tip.showToast)(BorrowCartList.readerBorrowInfo.cannotBorrowReason, this);
                    return false;
                } else {
                    var currentBorrowNum = BorrowCartList.readerBorrowInfo.currentBorrowNum;
                    var libCanLoanTotal = BorrowCartList.readerBorrowInfo.libCanLoanTotal;
                    var canBorrowNum = libCanLoanTotal - currentBorrowNum;
                    if (this.chooseCount > canBorrowNum) {
                        var msg = "您总共可以借阅" + libCanLoanTotal + "本书，当前已借阅" + currentBorrowNum + "本,还可借阅" + canBorrowNum + "本。";
                        wx.showModal({
                            title: "超出了可借数量",
                            content: msg,
                            confirmText: "我知道了",
                            confirmColor: "#009eff"
                        });
                        return false;
                    }
                }
                return true;
            }
            return true;
        }
    }, {
        key: "tapName",
        value: function tapName() {
            //埋点
            app.$wxapp.aldstat.sendEvent("去绑卡", {
                "来源": "借书架"
            });
            _wepy2.default.navigateTo({
                url: "/mine/pages/myInfo/readerCard/readerCard"
            });
        }
        //停服公告
        }, {
        key: "tingFuSystemConfig",
        value: function tingFuSystemConfig() {
            var _this7 = this;
            var showTingMsg = wx.getStorageSync((0, _utils.getLibcodeChoosed)() + "_showTingMsg");
            if (showTingMsg) {
                this.showTingMsg = 2;
            } else {
                var request_data = {
                    configKey: "ServicePauseConfig",
                    libcode: (0, _utils.getLibcodeChoosed)()
                };
                _config2.default.getSystemConfig(request_data).then(function(res) {
                    var result = res;
                    if (result.result == 1) {
                        var curTime = new Date().getTime();
                        if (result.data && result.data.isopen && result.data.isopen && result.data.sendtohome && result.data.sendtohome.isopen && result.data.sendtohome.status && result.data.sendtohome.isopen == 1 && result.data.sendtohome.status == 1 && (result.data.pickaddrBorrow.isopen == 0 || !result.data.pickaddrBorrow.isopen)) {
                            if (result.data.startTime && result.data.endTime) {
                                var strTime = result.data.startTime;
                                var strTimeDate = new Date(Date.parse(strTime.replace("/-/g", "/"))).getTime();
                                var endTime = result.data.endTime;
                                var endTimeDate = new Date(Date.parse(endTime.replace("/-/g", "/"))).getTime();
                                if (strTimeDate <= curTime && endTimeDate >= curTime) {
                                    _this7.showTingMsg = 1;
                                    _this7.tfmsg = result.data.sendtohome.msg;
                                }
                            }
                        }
                        _this7.$apply();
                    }
                });
            }
        }
    }, {
        key: "closeTingfuMsg",
        value: function closeTingfuMsg() {
            wx.setStorageSync((0, _utils.getLibcodeChoosed)() + "_showTingMsg", 1);
            this.showTingMsg = 2;
        }
    } ]);
    return Bookshelf;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Bookshelf, "pages/bookshelf/bookshelf"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tzaGVsZi5qcyJdLCJuYW1lcyI6WyJhcHAiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiQm9va3NoZWxmIiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGF0YSIsInRlbXBfYXJyIiwiY2FuSVVzZSIsIml0ZW1zIiwib3BlcmF0aW9uIiwiY2hvb3NlQ291bnQiLCJsb2dpbiIsImJpbmRDYXJkIiwiZmlyc3QiLCJib29rQ291bnQiLCJkaXNDb3VudCIsImFsbENoZWNrVmFsdWUiLCJzaG93dG9hc3REYXRhIiwiYW5pbWF0aW9uRGF0YSIsImxpYmNvZGUiLCJzaG93VGluZ01zZyIsInRmbXNnIiwiY2FydERhdGEiLCJib3Jyb3dDYXJ0Q29uZmlnIiwiYWxsSXRlbXNGdWxsIiwiT2JqZWN0IiwibWV0aG9kcyIsImNhbkVkaXQiLCJmb3JFYWNoIiwiaXRlbSIsImNoZWNrVmFsdWUiLCJzdHIiLCJoZW5kbGVDaGFuZ2UiLCJlIiwibCIsImRldGFpbCIsInZhbHVlIiwibGVuZ3RoIiwidGVtcCIsImFyciIsImkiLCJpZCIsImFsbENoZWNrIiwicHVzaCIsImF2YWlsYWJsZSIsIiR3eGFwcCIsImFsZHN0YXQiLCJzZW5kRXZlbnQiLCJiaW5kR2V0VXNlckluZm9TdWNjIiwicmVzZXQiLCJ0aW5nRnVTeXN0ZW1Db25maWciLCJnZXRMaXN0IiwidHlwZSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiZ2V0Qm9ycm93Q2FydExpc3QiLCJ0aGVuIiwiQm9ycm93Q2FydExpc3QiLCJyZXMiLCJyZXN1bHQiLCJib3Jyb3dDYXJ0TGlzdCIsImxpc3QiLCJyZWFkZXJCb3Jyb3dJbmZvIiwiY2xhc3NpZnlPYmoiLCJ0b0NsYXNzaWZ5IiwibGlzdEFyciIsInRvU29ydEJ5QXZhaWxhYmxlIiwia2V5IiwiaXNGaXJzdE1hcCIsImluZGV4Iiwidm9sbmFtZSIsInN1YnN0cmluZyIsImlzZmlyc3RCb29rIiwiJGFwcGx5IiwiaGlkZUxvYWRpbmciLCJ3eCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJhcnIxIiwiYXJyMiIsInNldDEiLCJTZXQiLCJzZXQyIiwic3Vic2V0IiwiaGFzIiwibWFwIiwiYWkiLCJkZXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwicmVxdWVzdF9kYXRhIiwiY29uZmlnS2V5IiwiZ2V0U3lzdGVtQ29uZmlnIiwidXNlckRpc3BsYXkiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsImNvbmZpcm0iLCJ0YXBOYW1lIiwidG9Cb3Jyb3ciLCJkZWxldGUiLCJwYXJhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImRlbGV0ZUJvcnJvd0NhcnQiLCJjYW5QYXkiLCJzZWxlY3RlZEl0ZW1JbmZvIiwicmUiLCJrZXlzIiwidW5pcXVlTGliY29kZSIsImluZGV4T2YiLCJzZWxlY3RlZEJvcnJvd0Jvb2tzIiwidXJsIiwibmF2aWdhdGVUbyIsImxpYkJvb2tDb3VudCIsImNhbm5vdEJvcnJvdyIsImNhbm5vdEJvcnJvd1JlYXNvbiIsImN1cnJlbnRCb3Jyb3dOdW0iLCJsaWJDYW5Mb2FuVG90YWwiLCJjYW5Cb3Jyb3dOdW0iLCJtc2ciLCJjb25maXJtVGV4dCIsImdldFN0b3JhZ2VTeW5jIiwiY3VyVGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiaXNvcGVuIiwic2VuZHRvaG9tZSIsInN0YXR1cyIsInBpY2thZGRyQm9ycm93Iiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInN0clRpbWUiLCJzdHJUaW1lRGF0ZSIsInJlcGxhY2UiLCJlbmRUaW1lRGF0ZSIsInNldFN0b3JhZ2VTeW5jIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTUMsZUFBS0MsU0FBakI7O0lBRXFCQyxTOzs7Ozs7Ozs7Ozs7Ozs0TEFJbkJDLE0sR0FBUztBQUNQLGdDQUEwQixLQURuQjtBQUVQQyw2QkFBdUIsSUFGaEI7QUFH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SUFBUCxDQUFZZ0ksT0FBMUI7QUFDQSxvQkFBSUksY0FBYyxJQUFJWCxJQUFKLENBQVNBLEtBQUtyQixLQUFMLENBQVc0QixRQUFRRyxPQUFSLENBQWdCLE1BQWhCLEVBQXdCLEdBQXhCLENBQVgsQ0FBVCxFQUFtRFQsT0FBbkQsRUFBbEI7QUFDQSxvQkFBSVEsZUFBZVYsT0FBZixJQUEwQlksZUFBZVosT0FBN0MsRUFBc0Q7QUFDcEQseUJBQUt6RyxXQUFMLEdBQWtCLENBQWxCO0FBQ0EseUJBQUtDLEtBQUwsR0FBYXVDLE9BQU92RCxJQUFQLENBQVk0SCxVQUFaLENBQXVCUCxHQUFwQztBQUNEO0FBQ0Y7QUFDRjtBQUNELG1CQUFLaEQsTUFBTDtBQUNEO0FBQ0YsU0FyQkQ7QUFzQkQ7QUFDRjs7O3FDQUNnQjtBQUNmRSxTQUFHOEQsY0FBSCxDQUFrQixrQ0FBc0IsY0FBeEMsRUFBd0QsQ0FBeEQ7QUFDQSxXQUFLdEgsV0FBTCxHQUFrQixDQUFsQjtBQUNEOzs7O0VBNWNvQ3BCLGVBQUsySSxJOztrQkFBdkJ6SSxTIiwiZmlsZSI6ImJvb2tzaGVsZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQge2RhdGFDb252ZXJ0LCBnZXRXeFZ0Snd0LCBnZXRXeEp3dCwgZ2V0U2dtYWluLCBnZXRXeFVzZXJEYXRhLCBnZXRMaWJjb2RlQ2hvb3NlZCwgc2V0V3hVc2VySW5mb30gZnJvbSAnQC91dGlscyc7XG5pbXBvcnQge2NoZWNrV3hPbmxpbmUsIGF1dG9Mb2dpbn0gZnJvbSAnQC91dGlscy9sb2dpbic7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0AvY29uZmlnJztcbmltcG9ydCB7c2hvd1RvYXN0fSBmcm9tICdAL3V0aWxzL3RpcCc7XG5cbmNvbnN0IGFwcCA9IHdlcHkuJGluc3RhbmNlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rc2hlbGYgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAvKipcbiAgICog6aG16Z2i6YWN572uXG4gICAqL1xuICBjb25maWcgPSB7XG4gICAgJ25hdmlnYXRpb25CYXJUaXRsZVRleHQnOiAn5YCf5Lmm5p62JyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gICAgJ3VzaW5nQ29tcG9uZW50cyc6IHtcbiAgICAgICd0b2FzdCc6ICcvY29tcG9uZW50cy90b2FzdC90b2FzdCdcbiAgICB9LFxuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdGVtcF9hcnI6IFtdLFxuICAgIGNhbklVc2U6IHdlcHkuY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxuICAgIGl0ZW1zOiBbXSxcbiAgICBvcGVyYXRpb246ICfnvJbovpEnLFxuICAgIGNob29zZUNvdW50OiAwLFxuICAgIGxvZ2luOiBmYWxzZSxcbiAgICBiaW5kQ2FyZDogZmFsc2UsXG4gICAgZmlyc3Q6IHRydWUsXG4gICAgYm9va0NvdW50OiAwLCAvL+S5puexjeaAu+aVsFxuICAgIGRpc0NvdW50OjAsIC8v5LiN5Y+v6YCJ5oC75pWwXG4gICAgYWxsQ2hlY2tWYWx1ZTogZmFsc2UsXG4gICAgc2hvd3RvYXN0RGF0YToge30sXG4gICAgYW5pbWF0aW9uRGF0YTogbnVsbCxcbiAgICBsaWJjb2RlOiAnJyxcbiAgICBzaG93VGluZ01zZzpudWxsLFxuICAgIHRmbXNnOm51bGxcbiAgfTtcblxuICBjYXJ0RGF0YSA9IHtcbiAgICBib3Jyb3dDYXJ0Q29uZmlnOiBudWxsLFxuICAgIGFsbEl0ZW1zRnVsbDogbmV3IE9iamVjdCgpLC8v5YCf5Lmm5p625YWo6YOo5Zu+5Lmm77yI5LuF5Y+v5YCf77yJXG4gIH1cblxuICBvblNob3coKSB7XG4gICAgLy/ln4vngrlcbiAgICBhcHAuJHd4YXBwLmFsZHN0YXQuc2VuZEV2ZW50KCAn5YCf5Lmm5p62JyApO1xuICAgIGlmIChnZXRTZ21haW4oKSAmJiAoZ2V0V3hWdEp3dCgpIHx8IGdldFd4Snd0KCkpKSB7XG4gICAgICB0aGlzLmJpbmRHZXRVc2VySW5mb1N1Y2MoKVxuICAgIH0gZWxzZXtcbiAgICAgIHRoaXMubG9naW4gPSBmYWxzZTsvL+acquaOiOadg1xuICAgIH1cblxuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLnRpbmdGdVN5c3RlbUNvbmZpZygpO1xuICB9XG5cbiAgb25IaWRlKCkge1xuICAgIC8v5Z+L54K5XG4gICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+WAn+S5puaetumAgOWHuicgKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLmFsbENoZWNrVmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLmNob29zZUNvdW50ID0gMDtcbiAgICB0aGlzLnRlbXBfYXJyID0gW107XG4gICAgdGhpcy5vcGVyYXRpb24gPSAn57yW6L6RJztcbiAgfVxuXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLmdldExpc3QoKTtcbiAgfVxuXG5cbiAgLy/ojrflj5blgJ/kuabmnrbliJfooahcbiAgZ2V0TGlzdCh0eXBlKSB7XG4gICAgaWYgKHR5cGUgIT0gJ2RlbGV0ZScpIHtcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJyxtYXNrOiB0cnVlfSk7XG4gICAgfVxuICAgIGNvbmZpZy5nZXRCb3Jyb3dDYXJ0TGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmICh0eXBlID09ICdkZWxldGUnKSB7XG4gICAgICAgIHRoaXMuYWxsQ2hlY2tWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNob29zZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IG51bGw7XG4gICAgICAgIHRoaXMudGVtcF9hcnIgPSBbXTtcbiAgICAgIH1cbiAgICAgIGxldCBCb3Jyb3dDYXJ0TGlzdCA9IHRoaXMuY2FydERhdGFcbiAgICAgIGlmIChyZXMucmVzdWx0ID09IDEgJiYgcmVzLmRhdGEuYm9ycm93Q2FydExpc3QpIHtcbiAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5ib3Jyb3dDYXJ0TGlzdDtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJlYWRlckJvcnJvd0luZm8pIHtcbiAgICAgICAgICBCb3Jyb3dDYXJ0TGlzdC5yZWFkZXJCb3Jyb3dJbmZvID0gcmVzLmRhdGEucmVhZGVyQm9ycm93SW5mb1xuICAgICAgICB9XG4gICAgICAgIGRhdGFDb252ZXJ0KGxpc3QsIHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGxpYmNvZGUgPSBnZXRMaWJjb2RlQ2hvb3NlZCgpO1xuICAgICAgICAgIHRoaXMubGliY29kZSA9IGxpYmNvZGU7XG4gICAgICAgICAgbGV0IGRpc0NvdW50ID0gMDtcblxuICAgICAgICAgIC8v5qC55o2u5Zu+5Lmm6aaG5YiG57G7XG4gICAgICAgICAgbGV0IGNsYXNzaWZ5T2JqPSB0aGlzLnRvQ2xhc3NpZnkocmVzKTtcbiAgICAgICAgICBsZXQgbGlzdEFyciA9IFtdO1xuICAgICAgICAgIGxpc3RBcnIgPSB0aGlzLnRvU29ydEJ5QXZhaWxhYmxlKGNsYXNzaWZ5T2JqW2xpYmNvZGVdLCBsaXN0QXJyKTtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY2xhc3NpZnlPYmopIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT0gbGliY29kZSkge1xuICAgICAgICAgICAgICBsaXN0QXJyID0gdGhpcy50b1NvcnRCeUF2YWlsYWJsZShjbGFzc2lmeU9ialtrZXldLCBsaXN0QXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaXNGaXJzdE1hcCA9IHt9O1xuICAgICAgICAgIGxpc3RBcnIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnZvbG5hbWUpIHtcbiAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IGl0ZW0udGl0bGUgKyAnICcgKyBpdGVtLnZvbG5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLnRpdGxlLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBpdGVtLnRpdGxlLnN1YnN0cmluZygwLCAyOSkgKyAnLi4uJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbVsnY2hlY2tWYWx1ZSddID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoaXRlbS5hdmFpbGFibGUgPD0gMCkge1xuICAgICAgICAgICAgICBkaXNDb3VudCsrXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0RGF0YS5hbGxJdGVtc0Z1bGxbaXRlbS5pZF0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5q+P5Liq5Zu+5Lmm6aaG55qE56ys5LiA5pys5LmmXG4gICAgICAgICAgICBpZiAoIWlzRmlyc3RNYXBbaXRlbS5saWJjb2RlXSkge1xuICAgICAgICAgICAgICBpdGVtLmlzZmlyc3RCb29rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGaXJzdE1hcFtpdGVtLmxpYmNvZGVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGl0ZW0uaXNmaXJzdEJvb2sgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5pdGVtcyA9IGxpc3RBcnI7XG4gICAgICAgICAgdGhpcy5kaXNDb3VudCA9IGRpc0NvdW50O1xuICAgICAgICAgIHRoaXMuYm9va0NvdW50ID0gbGlzdEFyci5sZW5ndGg7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIH0pXG4gICAgICB9ZWxzZXtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvL+agueaNruWPr+WAn+aVsOmHj+aOkuW6j1xuICB0b1NvcnRCeUF2YWlsYWJsZShhcnIxLCBhcnIyKSB7XG4gICAgaWYoYXJyMSkge1xuICAgICAgYXJyMS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5hdmFpbGFibGUgPiAwKSB7XG4gICAgICAgICAgYXJyMi5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBhcnIxLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmF2YWlsYWJsZSA8PSAwKSB7XG4gICAgICAgICAgYXJyMi5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBhcnIyXG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGNhbkVkaXQoKSB7XG4gICAgICBsZXQgb3BlcmF0aW9uID0gdGhpcy5vcGVyYXRpb247XG4gICAgICB0aGlzLm9wZXJhdGlvbiA9IG9wZXJhdGlvbiA9PT0gJ+e8lui+kScgPyAn5a6M5oiQJyA6ICfnvJbovpEnO1xuICAgICAgdGhpcy5hbGxDaGVja1ZhbHVlID0gZmFsc2U7XG4gICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uY2hlY2tWYWx1ZSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIHRoaXMuc3RyID0gW107XG4gICAgICB0aGlzLmNob29zZUNvdW50ID0gMDtcbiAgICB9LFxuICAgIC8v5Yu+6YCJ5YCf5Lmm5p625pe2XG4gICAgaGVuZGxlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IGwgPSBlLmRldGFpbC52YWx1ZS5sZW5ndGg7XG4gICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zXG4gICAgICBpZiAodGhpcy50ZW1wX2Fyci5sZW5ndGggPiBsKSB7XG4gICAgICAgIGxldCB0ZW1wID0gdGhpcy5hcnIodGhpcy50ZW1wX2FyciwgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXRlbXNbaV0uaWQgPT0gdGVtcFswXSkge1xuICAgICAgICAgICAgaXRlbXNbaV0uY2hlY2tWYWx1ZSA9IGZhbHNlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmFycihlLmRldGFpbC52YWx1ZSwgdGhpcy50ZW1wX2FycilcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpdGVtc1tpXS5pZCA9PSB0ZW1wWzBdKSB7XG4gICAgICAgICAgICBpdGVtc1tpXS5jaGVja1ZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgIHRoaXMuY2hvb3NlQ291bnQgPSBsO1xuICAgICAgdGhpcy50ZW1wX2FyciA9IGUuZGV0YWlsLnZhbHVlXG5cbiAgICAgIGlmIChsID09IHRoaXMuYm9va0NvdW50KSB7XG4gICAgICAgIHRoaXMuYWxsQ2hlY2tWYWx1ZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5hbGxDaGVja1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWxsQ2hlY2tWYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy/lhajpgIlcbiAgICBhbGxDaGVjayhzdHIpIHtcbiAgICAgIGxldCB0ZW1wX2FyciA9IFtdO1xuICAgICAgdGhpcy5hbGxDaGVja1ZhbHVlID0gIXRoaXMuYWxsQ2hlY2tWYWx1ZVxuICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY2hlY2tWYWx1ZSA9IHRoaXMuYWxsQ2hlY2tWYWx1ZTtcbiAgICAgICAgaWYgKHN0ciA9PT0gJ2RlbCcpIHtcbiAgICAgICAgICBpZiAoaXRlbS5jaGVja1ZhbHVlKSB7XG4gICAgICAgICAgICB0ZW1wX2Fyci5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgaWYgKGl0ZW0uY2hlY2tWYWx1ZSAmJiBpdGVtLmF2YWlsYWJsZSA+IDApIHtcbiAgICAgICAgICAgIHRlbXBfYXJyLnB1c2goaXRlbS5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgICB0aGlzLnRlbXBfYXJyID0gdGVtcF9hcnI7XG4gICAgICBpZiAodGhpcy5hbGxDaGVja1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hvb3NlQ291bnQgPSBzdHIgPT09ICdkZWwnID8gdGhpcy5ib29rQ291bnQgOiAodGhpcy5ib29rQ291bnQgLSB0aGlzLmRpc0NvdW50KTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmNob29zZUNvdW50ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYXJyKGFycjEsIGFycjIpIHtcbiAgICBsZXQgc2V0MSA9IG5ldyBTZXQoYXJyMSlcbiAgICBsZXQgc2V0MiA9IG5ldyBTZXQoYXJyMilcbiAgICBsZXQgc3Vic2V0ID0gW11cblxuICAgIGZvciAobGV0IGl0ZW0gb2Ygc2V0MSkge1xuICAgICAgaWYgKCFzZXQyLmhhcyhpdGVtKSkge1xuICAgICAgICBzdWJzZXQucHVzaChpdGVtKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic2V0XG4gIH1cblxuICAvL+WIhuexu1xuICB0b0NsYXNzaWZ5KGFycikge1xuICAgIGxldCBtYXAgPSB7fVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYWkgPSBhcnJbaV1cbiAgICAgIGlmICghbWFwW2FpLmxpYmNvZGVdKSB7XG4gICAgICAgIGxldCBkZXN0ID0gW11cbiAgICAgICAgZGVzdC5wdXNoKGFpKVxuICAgICAgICBtYXBbYWkubGliY29kZV0gPSBkZXN0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZGVzdCA9IG1hcFthaS5saWJjb2RlXVxuICAgICAgICBkZXN0LnB1c2goYWkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXBcbiAgfVxuXG4gIC8v5o6I5p2DXG4gIGJpbmRHZXRVc2VySW5mbyhlKSB7XG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mbztcbiAgICBzZXRXeFVzZXJJbmZvKGUuZGV0YWlsLnVzZXJJbmZvKTtcbiAgICBjaGVja1d4T25saW5lKHJlcyA9PiB7XG4gICAgICB0aGlzLmJpbmRHZXRVc2VySW5mb1N1Y2MoKVxuICAgIH0pXG4gIH07XG5cbiAgLy/mjojmnYPmiJDlip9cbiAgYmluZEdldFVzZXJJbmZvU3VjYygpIHtcbiAgICBpZiAoIXRoaXMuY2FydERhdGEuYm9ycm93Q2FydENvbmZpZykge1xuICAgICAgbGV0IHJlcXVlc3RfZGF0YSA9IHsgY29uZmlnS2V5OiAnYm9ycm93Q2FydENvbmZpZycsIGxpYmNvZGU6IGdldExpYmNvZGVDaG9vc2VkKCl9O1xuICAgICAgY29uZmlnLmdldFN5c3RlbUNvbmZpZyhyZXF1ZXN0X2RhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5yZXN1bHQgPT0gMSkge1xuICAgICAgICAgIHRoaXMuY2FydERhdGEuYm9ycm93Q2FydENvbmZpZyA9IHJlcy5kYXRhXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5sb2dpbiA9IHRydWU7XG4gICAgaWYgKGdldFd4VXNlckRhdGEoKS51c2VyRGlzcGxheSkge1xuICAgICAgLy/ln4vngrlcbiAgICAgIGFwcC4kd3hhcHAuYWxkc3RhdC5zZW5kRXZlbnQoICfnmbvlvZXmiJDlip8nLHsn5p2l5rqQJzogJ+WAn+S5puaetid9ICk7XG4gICAgICB0aGlzLmdldExpc3QoKTtcbiAgICAgIHRoaXMuYmluZENhcmQgPSB0cnVlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9ZWxzZXtcbiAgICAgIGF1dG9Mb2dpbihnZXRTZ21haW4oKSwgcmVzID0+IHtcbiAgICAgICAgaWYgKGdldFd4VXNlckRhdGEoKS51c2VyRGlzcGxheSkge1xuICAgICAgICAgIC8v5Z+L54K5XG4gICAgICAgICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+eZu+W9leaIkOWKnycseyfmnaXmupAnOiAn5YCf5Lmm5p62J30gKTtcbiAgICAgICAgICB0aGlzLmdldExpc3QoKTtcbiAgICAgICAgICB0aGlzLmJpbmRDYXJkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBpZiAodGhpcy5maXJzdCkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmuKnppqjmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6K+35YmN5Y6757uR5a6a6K+76ICF5Y2hJyxcbiAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzAwOWVmZicsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRhcE5hbWUoKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5iaW5kQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuXG4gIC8v56e76ZmkL+WAn+mYhVxuICBkZWxldGVPckJvcnJvdygpIHtcbiAgICBpZiAodGhpcy5vcGVyYXRpb24gPT0gJ+e8lui+kScpIHtcbiAgICAgIHRoaXMudG9Cb3Jyb3coKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZGVsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy/liKDpmaRcbiAgZGVsZXRlKCkge1xuICAgIGlmICh0aGlzLnRlbXBfYXJyLmxlbmd0aCA9PSAwKSB7XG4gICAgICBzaG93VG9hc3QoJ+iHs+WwkemAieaLqeS4gOacrOWbvuS5puWTpu+8gScsIHRoaXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL+i/meS4quaWueazleWPquaYr+WwhnRlbXBfYXJy5qC85byP5YyW6L2s5oiQanNvbuagvOW8j+eahOWtl+espuS4slxuICAgIGxldCBwYXJhbSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICdpdGVtaWRMaXN0JzogdGhpcy50ZW1wX2FyclxuICAgIH0pXG4gICAgLy/lsIZqc29u5qC85byP55qE5a2X56ym5Liy6L2s5o2i5oiQanNvbuWvueixoVxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShwYXJhbSk7XG4gICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLG1hc2s6IHRydWV9KTtcbiAgICBjb25maWcuZGVsZXRlQm9ycm93Q2FydChkYXRhKS50aGVuKHJlcyA9PiB7XG4gICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICBpZiAocmVzLnJlc3VsdCA9PSAxKSB7XG4gICAgICAgIHNob3dUb2FzdCgn5pON5L2c5oiQ5Yqf77yBJywgdGhpcyk7XG4gICAgICAgIHRoaXMuZ2V0TGlzdCgnZGVsZXRlJyk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy/lgJ/pmIVcbiAgdG9Cb3Jyb3coKSB7XG4gICAgaWYgKCF0aGlzLmNhblBheSgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IEJvcnJvd0NhcnRMaXN0ID0gdGhpcy5jYXJ0RGF0YVxuICAgIGxldCBzZWxlY3RlZEl0ZW1JbmZvID0gbmV3IE9iamVjdCgpXG4gICAgdGhpcy50ZW1wX2Fyci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKEJvcnJvd0NhcnRMaXN0LmFsbEl0ZW1zRnVsbFtpdGVtXSkge1xuICAgICAgICBzZWxlY3RlZEl0ZW1JbmZvW2l0ZW1dID0gQm9ycm93Q2FydExpc3QuYWxsSXRlbXNGdWxsW2l0ZW1dXG4gICAgICB9XG4gICAgfSlcbiAgICBsZXQgcmUgPSAnJztcbiAgICBPYmplY3Qua2V5cyhzZWxlY3RlZEl0ZW1JbmZvKS5mb3JFYWNoKChrZXksIGkpID0+IHtcbiAgICAgIGxldCBpdGVtID0gc2VsZWN0ZWRJdGVtSW5mb1trZXldXG4gICAgICBsZXQgdW5pcXVlTGliY29kZSA9ICd8JyArIGl0ZW0ubGliY29kZSArICd8J1xuICAgICAgaWYgKHJlLmluZGV4T2YodW5pcXVlTGliY29kZSkgPT0gLTEpIHtcbiAgICAgICAgcmUgPSByZSArIHVuaXF1ZUxpYmNvZGVcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChyZS5pbmRleE9mKCd8fCcpID4gMCkge1xuICAgICAgc2hvd1RvYXN0KCflkIzkuIDkuKrorqLljZXkuK3lj6rog73mnInkuIDkuKrppobol4/lnLDvvIEnLCB0aGlzKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhcHAuZ2xvYmFsRGF0YS5zZWxlY3RlZEJvcnJvd0Jvb2tzID0gc2VsZWN0ZWRJdGVtSW5mb1xuICAgIGxldCB1cmwgPSAnL2Jvb2tzaGVsZi9wYWdlcy9zZXR0bGVtZW50L3NldHRsZW1lbnQnO1xuICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IHVybFxuICAgIH0pXG4gIH1cblxuICBjYW5QYXkoKSB7XG4gICAgbGV0IEJvcnJvd0NhcnRMaXN0ID0gdGhpcy5jYXJ0RGF0YTtcbiAgICBsZXQgYm9ycm93Q2FydENvbmZpZyA9IHRoaXMuY2FydERhdGEuYm9ycm93Q2FydENvbmZpZ1xuICAgIGlmIChib3Jyb3dDYXJ0Q29uZmlnICYmIGJvcnJvd0NhcnRDb25maWcubGliQm9va0NvdW50ICYmIGJvcnJvd0NhcnRDb25maWcubGliQm9va0NvdW50ID4gMCkge1xuICAgICAgaWYgKHRoaXMuY2hvb3NlQ291bnQgPiBib3Jyb3dDYXJ0Q29uZmlnLmxpYkJvb2tDb3VudCkge1xuICAgICAgICBzaG93VG9hc3QoJ+avj+WNleS4jeW+l+i2hei/hycgKyBib3Jyb3dDYXJ0Q29uZmlnLmxpYkJvb2tDb3VudCArICfmnKwnLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy/mo4Dmn6XmmK/lkKblj6/ku6Xljrvnu5PnrpdcbiAgICAvLzEu5Yik5pat5piv5ZCm5bey6YCJ5oupXG4gICAgaWYgKHRoaXMudGVtcF9hcnIubGVuZ3RoID09IDApIHtcbiAgICAgIHNob3dUb2FzdCgn6Iez5bCR6YCJ5oup5LiA5pys5ZOmJywgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8yLuWIpOaWreaYr+WQpuWPr+WAn1xuICAgIC8vMy7liKTmlq3mmK/lkKbmnInmrKDmrL5cbiAgICAvLzQu5Yik5pat5piv5ZCm6LaF6L+H5Y+v5YCf5pWw6YePXG4gICAgaWYgKEJvcnJvd0NhcnRMaXN0LnJlYWRlckJvcnJvd0luZm8gIT0gbnVsbCkge1xuICAgICAgaWYgKEJvcnJvd0NhcnRMaXN0LnJlYWRlckJvcnJvd0luZm8uY2Fubm90Qm9ycm93KSB7XG4gICAgICAgIHNob3dUb2FzdChCb3Jyb3dDYXJ0TGlzdC5yZWFkZXJCb3Jyb3dJbmZvLmNhbm5vdEJvcnJvd1JlYXNvbiwgdGhpcyk7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfWVsc2V7XG4gICAgICAgIGxldCBjdXJyZW50Qm9ycm93TnVtID0gQm9ycm93Q2FydExpc3QucmVhZGVyQm9ycm93SW5mby5jdXJyZW50Qm9ycm93TnVtO1xuICAgICAgICBsZXQgbGliQ2FuTG9hblRvdGFsID0gQm9ycm93Q2FydExpc3QucmVhZGVyQm9ycm93SW5mby5saWJDYW5Mb2FuVG90YWw7XG4gICAgICAgIGxldCBjYW5Cb3Jyb3dOdW0gPSBsaWJDYW5Mb2FuVG90YWwgLSBjdXJyZW50Qm9ycm93TnVtO1xuICAgICAgICBpZiAodGhpcy5jaG9vc2VDb3VudCA+IGNhbkJvcnJvd051bSkge1xuICAgICAgICAgIGxldCBtc2cgPSAn5oKo5oC75YWx5Y+v5Lul5YCf6ZiFJyArIGxpYkNhbkxvYW5Ub3RhbCArICfmnKzkuabvvIzlvZPliY3lt7LlgJ/pmIUnICsgY3VycmVudEJvcnJvd051bSArICfmnKws6L+Y5Y+v5YCf6ZiFJyArIGNhbkJvcnJvd051bSArICfmnKzjgIInXG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6LaF5Ye65LqG5Y+v5YCf5pWw6YePJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5oiR55+l6YGT5LqGJyxcbiAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyMwMDllZmYnLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICB0YXBOYW1lKCkge1xuICAgIC8v5Z+L54K5XG4gICAgYXBwLiR3eGFwcC5hbGRzdGF0LnNlbmRFdmVudCggJ+WOu+e7keWNoScseyfmnaXmupAnOiAn5YCf5Lmm5p62J30gKTtcbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL21pbmUvcGFnZXMvbXlJbmZvL3JlYWRlckNhcmQvcmVhZGVyQ2FyZCdcbiAgICB9KVxuICB9XG5cbiAgLy/lgZzmnI3lhazlkYpcbiAgdGluZ0Z1U3lzdGVtQ29uZmlnKCl7XG4gICAgdmFyIHNob3dUaW5nTXNnID0gd3guZ2V0U3RvcmFnZVN5bmMoZ2V0TGliY29kZUNob29zZWQoKSArICdfc2hvd1RpbmdNc2cnKTtcbiAgICBpZihzaG93VGluZ01zZyl7XG4gICAgICAgdGhpcy5zaG93VGluZ01zZyA9IDJcbiAgICB9ZWxzZXtcbiAgICAgIGxldCByZXF1ZXN0X2RhdGEgPSB7IGNvbmZpZ0tleTogJ1NlcnZpY2VQYXVzZUNvbmZpZycsIGxpYmNvZGU6IGdldExpYmNvZGVDaG9vc2VkKCkgfVxuICAgICAgY29uZmlnLmdldFN5c3RlbUNvbmZpZyhyZXF1ZXN0X2RhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlcztcbiAgICAgICAgaWYocmVzdWx0LnJlc3VsdD09MSl7XG4gICAgICAgICAgdmFyIGN1clRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICBpZihyZXN1bHQuZGF0YSAmJiByZXN1bHQuZGF0YS5pc29wZW4gJiYgcmVzdWx0LmRhdGEuaXNvcGVuICYmIHJlc3VsdC5kYXRhLnNlbmR0b2hvbWVcbiAgICAgICAgICAgICYmIHJlc3VsdC5kYXRhLnNlbmR0b2hvbWUuaXNvcGVuICYmIHJlc3VsdC5kYXRhLnNlbmR0b2hvbWUuc3RhdHVzXG4gICAgICAgICAgICAmJiByZXN1bHQuZGF0YS5zZW5kdG9ob21lLmlzb3BlbiA9PSAxICYmIHJlc3VsdC5kYXRhLnNlbmR0b2hvbWUuc3RhdHVzID09IDFcbiAgICAgICAgICAgICYmIChyZXN1bHQuZGF0YS5waWNrYWRkckJvcnJvdy5pc29wZW4gPT0gMCB8fCAoIXJlc3VsdC5kYXRhLnBpY2thZGRyQm9ycm93Lmlzb3BlbikpKXtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdGFydFRpbWUgJiYgcmVzdWx0LmRhdGEuZW5kVGltZSkge1xuICAgICAgICAgICAgICB2YXIgc3RyVGltZSA9IHJlc3VsdC5kYXRhLnN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgdmFyIHN0clRpbWVEYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShzdHJUaW1lLnJlcGxhY2UoJy8tL2cnLCAnLycpKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICB2YXIgZW5kVGltZSA9IHJlc3VsdC5kYXRhLmVuZFRpbWU7XG4gICAgICAgICAgICAgIHZhciBlbmRUaW1lRGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZW5kVGltZS5yZXBsYWNlKCcvLS9nJywgJy8nKSkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgaWYgKHN0clRpbWVEYXRlIDw9IGN1clRpbWUgJiYgZW5kVGltZURhdGUgPj0gY3VyVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbmdNc2c9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy50Zm1zZyA9IHJlc3VsdC5kYXRhLnNlbmR0b2hvbWUubXNnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGNsb3NlVGluZ2Z1TXNnKCkge1xuICAgIHd4LnNldFN0b3JhZ2VTeW5jKGdldExpYmNvZGVDaG9vc2VkKCkgKyAnX3Nob3dUaW5nTXNnJywgMSlcbiAgICB0aGlzLnNob3dUaW5nTXNnPSAyO1xuICB9XG59XG4iXX0=