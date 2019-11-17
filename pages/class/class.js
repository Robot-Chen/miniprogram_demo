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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function(value) {
                        step("next", value);
                    }, function(err) {
                        step("throw", err);
                    });
                }
            }
            return step("next");
        });
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

var self = null;

var Classf = function(_wepy$page) {
    _inherits(Classf, _wepy$page);
    function Classf() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Classf);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Classf.__proto__ || Object.getPrototypeOf(Classf)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "分类",
            enablePullDownRefresh: true
        }, _this.data = {
            classes: null,
            currentIndex: 0,
            //当前选中tab索引,
            pageIndex: 1,
            //图书列表页码从0开始
            pageCounts: 12,
            items: [],
            hasClickClass: null,
            emptyFlag: null,
            isfirstload: true,
            libcode: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Classf, [ {
        key: "onLoad",
        value: function onLoad(options) {
            self = this;
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var that = this;
            var hasClickClass = wx.getStorageSync("hasClickClass");
            if (hasClickClass) {
                that.hasClickClass = 1;
            } else {
                that.hasClickClass = 2;
            }
            if (this.libcode == null || this.libcode != (0, _utils.getLibcodeChoosed)()) {
                this.isfirstload = true;
            }
            if (this.isfirstload) {
                this.pageIndex = 1;
                this.items = [];
                this.libcode = (0, _utils.getLibcodeChoosed)();
                that.getClasses();
                this.isfirstload = false;
            }
        }
    }, {
        key: "nextPage",
        value: function nextPage() {
            var that = this;
            var hasClickClass = wx.getStorageSync("hasClickClass");
            if (hasClickClass && hasClickClass == 1) {
                if (!that.pageIndices || that.pageIndex && that.pageIndex >= that.pageIndices) {
                    (0, _tip.showToast)("没有更多啦！", this);
                    return;
                } else {
                    that.pageIndex++;
                    that.books();
                }
            }
        }
    }, {
        key: "getClasses",
        value: function() {
            var _ref2 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee() {
                var _this2 = this;
                var that, param;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            that = this;
                            param = {
                                isDefaultflag: 1
                            };
                            _wepy2.default.request({
                                method: "POST",
                                url: "https://alipay.jieshu.me/cloudils/api/categoryMapping/listByDefaultFlag",
                                data: param
                            }).then(function(res) {
                                if (res.data && res.data.result == 1) {
                                    var clazes = res.data.data;
                                    var add_classes = wx.getStorageSync("add_classes");
                                    if (add_classes != null && add_classes && add_classes.length > 0) {
                                        for (var i = 0; i < add_classes.length; i++) {
                                            var item1 = add_classes[i];
                                            for (var j = 0; j < clazes.length; j++) {
                                                var item2 = clazes[j];
                                                if (item1.newClassName == item2.newClassName) {
                                                    item1.defaultFlag = 1;
                                                }
                                            }
                                        }
                                        var push_temp = [];
                                        for (var i = 0; i < add_classes.length; i++) {
                                            var item = add_classes[i];
                                            if (item.defaultFlag != 1) {
                                                push_temp.push(item);
                                            }
                                        }
                                        wx.setStorageSync("add_classes", push_temp);
                                        clazes = clazes.concat(add_classes);
                                        var temp = that.arryQuChong(clazes);
                                        _this2.classes = temp;
                                    } else {
                                        _this2.classes = clazes;
                                    }
                                    that.books("first");
                                } else {}
                            });

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function getClasses() {
                return _ref2.apply(this, arguments);
            }
            return getClasses;
        }()
    }, {
        key: "books",
        value: function() {
            var _ref3 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee2(e) {
                var _this3 = this;
                var that, _commonConfig, currentIndex, param;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            that = this;
                            _commonConfig = app.configData.commonConfig;
                            //封面
                                                        currentIndex = e && e.currentTarget ? e.currentTarget.dataset.currentindex : that.currentIndex;
                            if (e && e.currentTarget && that.currentIndex != e.currentTarget.dataset.currentindex) {
                                that.pageIndex = 1;
                                that.items = [];
                            }
                            that.currentIndex = currentIndex;
                            param = null;
                            if (that.classes[that.currentIndex] && that.classes[that.currentIndex].newClassNo) {
                                param = {
                                    pageIndex: that.pageIndex,
                                    //图书列表页码从0开始
                                    pageCounts: that.pageCounts,
                                    newClassNo: that.classes[that.currentIndex].newClassNo
                                };
                            } else {
                                that.currentIndex = 0;
                                param = {
                                    pageIndex: that.pageIndex,
                                    //图书列表页码从0开始
                                    pageCounts: that.pageCounts,
                                    newClassNo: that.classes[that.currentIndex] && that.classes[that.currentIndex].newClassNo ? that.classes[that.currentIndex].newClassNo : ""
                                };
                            }
                            _wepy2.default.showLoading({
                                title: "加载中..."
                            });
                            _config2.default.searchNewClassNo(param).then(function(res) {
                                if (res.result == 1 && res.data && res.data.length > 0) {
                                    //对于bookjpgs为空的图片处理
                                    var emptycoverisbn = new Array();
                                    for (var i = 0; i < res.data.length; i++) {
                                        var item = res.data[i];
                                        if (item.title.length > 30) {
                                            item.title = item.title.substring(0, 29) + "...";
                                        }
                                        item.isbn = item.isbn.replace(/-/g, "");
                                        if (!item.bookjpgs || !item.bookjpgs.trim()) {
                                            var localBookjpgs = (0, _utils.getLocalstorage)(item.isbn);
                                            item.bookjpgs = that.piccdn + "common/defaultBookImg_" + item.isbn % 6 + ".jpg";
                                            if (localBookjpgs) {
                                                if (localBookjpgs != "got") {
                                                    item.bookjpgs = localBookjpgs;
                                                }
                                            } else {
                                                emptycoverisbn.push(item.isbn);
                                            }
                                        } else {
                                            if (item.bookjpgs.indexOf("http") == -1) {
                                                item.bookjpgs = _commonConfig.picResource + item.bookjpgs;
                                            }
                                        }
                                        if (item.bookjpgs && item.bookjpgs.trim()) {
                                            if (item.bookjpgs.indexOf("defaultBookImg") > -1) {
                                                item.bookjpgs = "";
                                            }
                                        }
                                    }
                                    //封面
                                                                        if (emptycoverisbn.length > 0) {
                                        (0, _utils.dataConvert)(res.data, function(data) {
                                            _this3.items = _this3.items.concat(data);
                                            _this3.$apply();
                                        });
                                    } else {
                                        if (that.pageIndex == 1) {
                                            that.items = [];
                                        }
                                        that.items = that.items.concat(res.data);
                                    }
                                    _wepy2.default.hideLoading();
                                    that.emptyFlag = 2;
                                    that.pageIndices = res.pageIndices;
                                } else {
                                    _wepy2.default.hideLoading();
                                    that.emptyFlag = 1;
                                    that.type = that.type;
                                    that.showSearch = that.showSearch;
                                    that.shoucang = false;
                                }
                                _this3.$apply();
                            });

                            // wx.hideLoading();
                                                      case 9:
                          case "end":
                            return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
            function books(_x) {
                return _ref3.apply(this, arguments);
            }
            return books;
        }()
    }, {
        key: "editClass",
        //点击编辑分类按钮
        value: function editClass() {
            var that = this;
            var currentIndex = that.currentIndex;
            var classname = that.classes[currentIndex] && that.classes[currentIndex].newClassName ? that.classes[currentIndex].newClassName : "";
            wx.navigateTo({
                url: "/class/pages/editclass/editclass?classname=" + classname + "&"
            });
        }
    }, {
        key: "saveHasClickClass",
        //记录分类操作引导已经被触发并点击过 1点击过 2没点击过
        value: function saveHasClickClass() {
            wx.setStorageSync("hasClickClass", "1");
            this.hasClickClass = 1;
        }
    }, {
        key: "to_search",
        //到搜索页面
        value: function to_search(event) {
            wx.navigateTo({
                url: "/home/pages/search/search"
            });
        }
    }, {
        key: "bookdetail",
        //图书详情页面
        value: function bookdetail(event) {
            var that = this;
            var libcode = (0, _utils.getLibcodeChoosed)();
            var bookid = event.currentTarget.dataset.bookid;
            var bookrecno = event.currentTarget.dataset.bookrecno;
            var url = "/home/pages/bookInfo/bookInfo?libcode=" + libcode + "&bookid=" + bookid + "&bookrecno=" + bookrecno + "&classno=";
            _wepy2.default.navigateTo({
                url: url
            });
        }
    }, {
        key: "setEmptyCover",
        //封面处理
        value: function setEmptyCover() {
            var listArr = self.items;
            listArr.forEach(function(item, i) {
                if (item.bookjpgs.indexOf("defaultBookImg_" > -1)) {
                    var localBookjpgs = (0, _utils.getLocalstorage)(item.isbn);
                    if (localBookjpgs) {
                        if (localBookjpgs != "got") {
                            item.bookjpgs = localBookjpgs;
                        }
                    }
                }
            });
            self.items = listArr;
        }
    }, {
        key: "arryQuChong",
        value: function arryQuChong(arr) {
            var hash = [];
            for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i].newClassName === arr[j].newClassName) {
                        ++i;
                    }
                }
                hash.push(arr[i]);
            }
            return hash;
        }
    } ]);
    return Classf;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Classf, "pages/class/class"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzLmpzIl0sIm5hbWVzIjpbImFwcCIsIndlcHkiLCIkaW5zdGFuY2UiLCJzZWxmIiwiQ2xhc3NmIiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGF0YSIsImNsYXNzZXMiLCJjdXJyZW50SW5kZXgiLCJwYWdlSW5kZXgiLCJwYWdlQ291bnRzIiwiaXRlbXMiLCJoYXNDbGlja0NsYXNzIiwiZW1wdHlGbGFnIiwiaXNmaXJzdGxvYWQiLCJsaWJjb2RlIiwib3B0aW9ucyIsInRoYXQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0Q2xhc3NlcyIsInBhZ2VJbmRpY2VzIiwiYm9va3MiLCJwYXJhbSIsInJlcXVlc3QiLCJtZXRob2QiLCJ1cmwiLCJ0aGVuIiwicmVzIiwicmVzdWx0IiwiY2xhemVzIiwiYWRkX2NsYXNzZXMiLCJsZW5ndGgiLCJpIiwiaXRlbTEiLCJqIiwiaXRlbTIiLCJuZXdDbGFzc05hbWUiLCJkZWZhdWx0RmxhZyIsInB1c2hfdGVtcCIsIml0ZW0iLCJwdXNoIiwic2V0U3RvcmFnZVN5bmMiLCJjb25jYXQiLCJ0ZW1wIiwiYXJyeVF1Q2hvbmciLCJlIiwiX2NvbW1vbkNvbmZpZyIsImNvbmZpZ0RhdGEiLCJjb21tb25Db25maWciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImN1cnJlbnRpbmRleCIsIm5ld0NsYXNzTm8iLCJzaG93TG9hZGluZyIsInRpdGxlIiwic2VhcmNoTmV3Q2xhc3NObyIsImVtcHR5Y292ZXJpc2JuIiwiQXJyYXkiLCJzdWJzdHJpbmciLCJpc2JuIiwicmVwbGFjZSIsImJvb2tqcGdzIiwidHJpbSIsImxvY2FsQm9va2pwZ3MiLCJwaWNjZG4iLCJpbmRleE9mIiwicGljUmVzb3VyY2UiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsInR5cGUiLCJzaG93U2VhcmNoIiwic2hvdWNhbmciLCJjbGFzc25hbWUiLCJuYXZpZ2F0ZVRvIiwiZXZlbnQiLCJib29raWQiLCJib29rcmVjbm8iLCJsaXN0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QixDQUFwQjtBQUNBLGNBQUlJLGFBQUosRUFBbUI7QUFDakIsZ0JBQUlBLGlCQUFpQixLQUFyQixFQUE0QjtBQUMxQnhCLG1CQUFLc0IsUUFBTCxHQUFnQkUsYUFBaEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVREO0FBVUE5RCxXQUFLUyxLQUFMLEdBQVdtRSxPQUFYO0FBR0Q7OztnQ0FDV0UsRyxFQUFLO0FBQ2YsVUFBSUMsT0FBTyxFQUFYO0FBQ0EsV0FBSyxJQUFJaEQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK0MsSUFBSWhELE1BQXhCLEVBQWdDQyxHQUFoQyxFQUFxQztBQUNuQyxhQUFLLElBQUlFLElBQUlGLElBQUksQ0FBakIsRUFBb0JFLElBQUk2QyxJQUFJaEQsTUFBNUIsRUFBb0NHLEdBQXBDLEVBQXlDO0FBQ3ZDLGNBQUk2QyxJQUFJL0MsQ0FBSixFQUFPSSxZQUFQLEtBQXdCMkMsSUFBSTdDLENBQUosRUFBT0UsWUFBbkMsRUFBaUQ7QUFDL0MsY0FBRUosQ0FBRjtBQUNEO0FBQ0Y7QUFDRGdELGFBQUt4QyxJQUFMLENBQVV1QyxJQUFJL0MsQ0FBSixDQUFWO0FBQ0Q7QUFDRCxhQUFPZ0QsSUFBUDtBQUNEOzs7O0VBdlBpQ2pGLGVBQUtrRixJOztrQkFBcEIvRSxNIiwiZmlsZSI6ImNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgY29uZmlnIGZyb20gJ0AvY29uZmlnJztcbmltcG9ydCB7ZGF0YUNvbnZlcnQsIGdldExvY2Fsc3RvcmFnZSxnZXRMaWJjb2RlQ2hvb3NlZCAgfSBmcm9tICdAL3V0aWxzJztcbmltcG9ydCB7c2hvd1RvYXN0fSBmcm9tICdAL3V0aWxzL3RpcCc7XG5cbmNvbnN0IGFwcCA9IHdlcHkuJGluc3RhbmNlO1xudmFyIHNlbGYgPSBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc2YgZXh0ZW5kcyB3ZXB5LnBhZ2V7XG4gIGNvbmZpZyA9IHtcbiAgICBcIm5hdmlnYXRpb25CYXJUaXRsZVRleHRcIjogXCLliIbnsbtcIixcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgY2xhc3NlczogbnVsbCxcbiAgICBjdXJyZW50SW5kZXg6IDAsLy/lvZPliY3pgInkuK10YWLntKLlvJUsXG4gICAgcGFnZUluZGV4OiAxLC8v5Zu+5Lmm5YiX6KGo6aG156CB5LuOMOW8gOWni1xuICAgIHBhZ2VDb3VudHM6IDEyLFxuICAgIGl0ZW1zOiBbXSxcbiAgICBoYXNDbGlja0NsYXNzOiBudWxsLFxuICAgIGVtcHR5RmxhZzpudWxsLFxuICAgIGlzZmlyc3Rsb2FkOnRydWUsXG4gICAgbGliY29kZTpudWxsXG4gIH07XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgc2VsZiA9IHRoaXNcbiAgfTtcbiAgb25TaG93KCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgIHZhciBoYXNDbGlja0NsYXNzID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2hhc0NsaWNrQ2xhc3MnKTtcbiAgICBpZiAoaGFzQ2xpY2tDbGFzcykge1xuICAgICAgdGhhdC5oYXNDbGlja0NsYXNzPTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuaGFzQ2xpY2tDbGFzcz0yO1xuICAgIH1cbiAgICBpZiAodGhpcy5saWJjb2RlPT1udWxsIHx8IHRoaXMubGliY29kZSAhPSBnZXRMaWJjb2RlQ2hvb3NlZCgpKXtcbiAgICAgIHRoaXMuaXNmaXJzdGxvYWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc2ZpcnN0bG9hZCl7XG4gICAgICB0aGlzLnBhZ2VJbmRleCA9IDE7XG4gICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICB0aGlzLmxpYmNvZGUgPSBnZXRMaWJjb2RlQ2hvb3NlZCgpO1xuICAgICAgdGhhdC5nZXRDbGFzc2VzKCk7XG4gICAgICB0aGlzLmlzZmlyc3Rsb2FkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuICBuZXh0UGFnZSgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIGhhc0NsaWNrQ2xhc3MgPSB3eC5nZXRTdG9yYWdlU3luYygnaGFzQ2xpY2tDbGFzcycpO1xuICAgIGlmIChoYXNDbGlja0NsYXNzICYmIGhhc0NsaWNrQ2xhc3MgPT0gMSkge1xuICAgICAgaWYgKCghdGhhdC5wYWdlSW5kaWNlcykgfHwgKHRoYXQucGFnZUluZGV4ICYmIHRoYXQucGFnZUluZGV4ID49IHRoYXQucGFnZUluZGljZXMpKSB7XG4gICAgICAgIHNob3dUb2FzdCgn5rKh5pyJ5pu05aSa5ZWm77yBJyx0aGlzKVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnBhZ2VJbmRleCsrO1xuICAgICAgICB0aGF0LmJvb2tzKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGFzeW5jICBnZXRDbGFzc2VzKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgcGFyYW0gPSB7XG4gICAgICAnaXNEZWZhdWx0ZmxhZyc6IDFcbiAgICB9XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgIHVybDogJ2h0dHBzOi8vYWxpcGF5LmppZXNodS5tZS9jbG91ZGlscy9hcGkvY2F0ZWdvcnlNYXBwaW5nL2xpc3RCeURlZmF1bHRGbGFnJyxcbiAgICAgIGRhdGE6cGFyYW1cbiAgICB9KS50aGVuKChyZXMpID0+XG4gICAgICB7aWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnJlc3VsdCA9PSAxKSB7XG4gICAgICAgIHZhciBjbGF6ZXMgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICB2YXIgYWRkX2NsYXNzZXMgPSB3eC5nZXRTdG9yYWdlU3luYygnYWRkX2NsYXNzZXMnKVxuICAgICAgICBpZiAoYWRkX2NsYXNzZXMhPW51bGwgJiYgYWRkX2NsYXNzZXMgJiYgYWRkX2NsYXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRkX2NsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtMSA9IGFkZF9jbGFzc2VzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjbGF6ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdmFyIGl0ZW0yID0gY2xhemVzW2pdXG4gICAgICAgICAgICAgIGlmIChpdGVtMS5uZXdDbGFzc05hbWUgPT0gaXRlbTIubmV3Q2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbTEuZGVmYXVsdEZsYWcgPSAxXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHB1c2hfdGVtcCA9IFtdO1xuICAgICAgICAgIGZvcih2YXIgaT0wO2k8YWRkX2NsYXNzZXMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGFkZF9jbGFzc2VzW2ldO1xuICAgICAgICAgICAgaWYoaXRlbS5kZWZhdWx0RmxhZyE9MSl7XG4gICAgICAgICAgICAgIHB1c2hfdGVtcC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnYWRkX2NsYXNzZXMnLCBwdXNoX3RlbXApXG5cbiAgICAgICAgICBjbGF6ZXMgPSBjbGF6ZXMuY29uY2F0KGFkZF9jbGFzc2VzKVxuICAgICAgICAgIHZhciB0ZW1wID0gdGhhdC5hcnJ5UXVDaG9uZyhjbGF6ZXMpO1xuICAgICAgICAgIHRoaXMuY2xhc3Nlcz10ZW1wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xhc3Nlcz1jbGF6ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmJvb2tzKCdmaXJzdCcpO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgfX1cbiAgICApO1xuICB9O1xuICBhc3luYyBib29rcyhlKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIF9jb21tb25Db25maWcgPSBhcHAuY29uZmlnRGF0YS5jb21tb25Db25maWcvL+WwgemdolxuICAgIHZhciBjdXJyZW50SW5kZXggPSBlICYmIGUuY3VycmVudFRhcmdldCA/IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRpbmRleCA6IHRoYXQuY3VycmVudEluZGV4O1xuICAgIGlmIChlICYmIGUuY3VycmVudFRhcmdldCAmJiB0aGF0LmN1cnJlbnRJbmRleCAhPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50aW5kZXgpIHtcbiAgICAgIHRoYXQucGFnZUluZGV4PTE7XG4gICAgICB0aGF0Lml0ZW1zPVtdO1xuICAgIH1cbiAgICB0aGF0LmN1cnJlbnRJbmRleD1jdXJyZW50SW5kZXg7XG4gICAgdmFyIHBhcmFtID0gbnVsbDtcbiAgICBpZiAodGhhdC5jbGFzc2VzW3RoYXQuY3VycmVudEluZGV4XSAmJiB0aGF0LmNsYXNzZXNbdGhhdC5jdXJyZW50SW5kZXhdLm5ld0NsYXNzTm8pIHtcbiAgICAgIHBhcmFtID0ge1xuICAgICAgICBwYWdlSW5kZXg6IHRoYXQucGFnZUluZGV4LC8v5Zu+5Lmm5YiX6KGo6aG156CB5LuOMOW8gOWni1xuICAgICAgICBwYWdlQ291bnRzOiB0aGF0LnBhZ2VDb3VudHMsXG4gICAgICAgIG5ld0NsYXNzTm86IHRoYXQuY2xhc3Nlc1t0aGF0LmN1cnJlbnRJbmRleF0ubmV3Q2xhc3NOb1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LmN1cnJlbnRJbmRleD0wO1xuICAgICAgcGFyYW0gPSB7XG4gICAgICAgIHBhZ2VJbmRleDogdGhhdC5wYWdlSW5kZXgsLy/lm77kuabliJfooajpobXnoIHku44w5byA5aeLXG4gICAgICAgIHBhZ2VDb3VudHM6IHRoYXQucGFnZUNvdW50cyxcbiAgICAgICAgbmV3Q2xhc3NObzogdGhhdC5jbGFzc2VzW3RoYXQuY3VycmVudEluZGV4XSYmdGhhdC5jbGFzc2VzW3RoYXQuY3VycmVudEluZGV4XS5uZXdDbGFzc05vP3RoYXQuY2xhc3Nlc1t0aGF0LmN1cnJlbnRJbmRleF0ubmV3Q2xhc3NObzonJ1xuICAgICAgfVxuICAgIH1cbiAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgIH0pO1xuICAgIGNvbmZpZy5zZWFyY2hOZXdDbGFzc05vKHBhcmFtKS50aGVuKChyZXMpID0+XG4gICAge1xuICAgICAgaWYgKHJlcy5yZXN1bHQgPT0gMSAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8v5a+55LqOYm9va2pwZ3PkuLrnqbrnmoTlm77niYflpITnkIZcbiAgICAgICAgdmFyIGVtcHR5Y292ZXJpc2JuID0gbmV3IEFycmF5KClcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0gcmVzLmRhdGFbaV1cbiAgICAgICAgICBpZiAoaXRlbS50aXRsZS5sZW5ndGggPiAzMCkge1xuICAgICAgICAgICAgaXRlbS50aXRsZSA9IGl0ZW0udGl0bGUuc3Vic3RyaW5nKDAsIDI5KSArICcuLi4nXG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0uaXNibiA9IGl0ZW0uaXNibi5yZXBsYWNlKC8tL2csICcnKVxuICAgICAgICAgIGlmICghaXRlbS5ib29ranBncyB8fCAhaXRlbS5ib29ranBncy50cmltKCkpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbEJvb2tqcGdzID0gZ2V0TG9jYWxzdG9yYWdlKGl0ZW0uaXNibilcbiAgICAgICAgICAgIGl0ZW0uYm9va2pwZ3MgPSB0aGF0LnBpY2NkbiArICdjb21tb24vZGVmYXVsdEJvb2tJbWdfJyArIGl0ZW0uaXNibiAlIDYgKyAnLmpwZydcbiAgICAgICAgICAgIGlmIChsb2NhbEJvb2tqcGdzKSB7XG4gICAgICAgICAgICAgIGlmIChsb2NhbEJvb2tqcGdzICE9ICdnb3QnKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5ib29ranBncyA9IGxvY2FsQm9va2pwZ3NcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZW1wdHljb3ZlcmlzYm4ucHVzaChpdGVtLmlzYm4pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmJvb2tqcGdzLmluZGV4T2YoJ2h0dHAnKSA9PSAtMSkge1xuICAgICAgICAgICAgICBpdGVtLmJvb2tqcGdzID0gX2NvbW1vbkNvbmZpZy5waWNSZXNvdXJjZSArIGl0ZW0uYm9va2pwZ3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGl0ZW0uYm9va2pwZ3MmJml0ZW0uYm9va2pwZ3MudHJpbSgpKXtcbiAgICAgICAgICAgIGlmIChpdGVtLmJvb2tqcGdzLmluZGV4T2YoXCJkZWZhdWx0Qm9va0ltZ1wiKT4tMSl7XG4gICAgICAgICAgICAgIGl0ZW0uYm9va2pwZ3M9XCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/lsIHpnaJcbiAgICAgICAgaWYgKGVtcHR5Y292ZXJpc2JuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBkYXRhQ29udmVydChyZXMuZGF0YSwgZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5jb25jYXQoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICBpZiAodGhhdC5wYWdlSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgdGhhdC5pdGVtcyA9IFtdXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoYXQuaXRlbXMgPSB0aGF0Lml0ZW1zLmNvbmNhdChyZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgdGhhdC5lbXB0eUZsYWc9MjtcbiAgICAgICAgdGhhdC5wYWdlSW5kaWNlcz1yZXMucGFnZUluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgdGhhdC5lbXB0eUZsYWc9MTtcbiAgICAgICAgdGhhdC50eXBlPXRoYXQudHlwZTtcbiAgICAgICAgdGhhdC5zaG93U2VhcmNoPXRoYXQuc2hvd1NlYXJjaDtcbiAgICAgICAgdGhhdC5zaG91Y2FuZz1mYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSk7XG4gICAgLy8gd3guaGlkZUxvYWRpbmcoKTtcbiAgfTtcbiAgLy/ngrnlh7vnvJbovpHliIbnsbvmjInpkq5cbiAgZWRpdENsYXNzKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGF0LmN1cnJlbnRJbmRleDtcbiAgICBsZXQgY2xhc3NuYW1lID0gdGhhdC5jbGFzc2VzW2N1cnJlbnRJbmRleF0mJnRoYXQuY2xhc3Nlc1tjdXJyZW50SW5kZXhdLm5ld0NsYXNzTmFtZT90aGF0LmNsYXNzZXNbY3VycmVudEluZGV4XS5uZXdDbGFzc05hbWU6Jyc7XG5cbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9jbGFzcy9wYWdlcy9lZGl0Y2xhc3MvZWRpdGNsYXNzP2NsYXNzbmFtZT0nICsgY2xhc3NuYW1lICsgJyYnXG4gICAgfSk7XG4gIH07XG4gIC8v6K6w5b2V5YiG57G75pON5L2c5byV5a+85bey57uP6KKr6Kem5Y+R5bm254K55Ye76L+HIDHngrnlh7vov4cgMuayoeeCueWHu+i/h1xuICBzYXZlSGFzQ2xpY2tDbGFzcygpIHtcbiAgICB3eC5zZXRTdG9yYWdlU3luYyhcImhhc0NsaWNrQ2xhc3NcIixcIjFcIilcbiAgICB0aGlzLmhhc0NsaWNrQ2xhc3MgPSAxO1xuICB9O1xuXG4gIC8v5Yiw5pCc57Si6aG16Z2iXG4gIHRvX3NlYXJjaChldmVudCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL2hvbWUvcGFnZXMvc2VhcmNoL3NlYXJjaCdcbiAgICB9KVxuICB9O1xuICAvL+WbvuS5puivpuaDhemhtemdolxuICBib29rZGV0YWlsKGV2ZW50KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgbGV0IGxpYmNvZGUgPSBnZXRMaWJjb2RlQ2hvb3NlZCgpO1xuICAgIGxldCBib29raWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYm9va2lkO1xuICAgIGxldCBib29rcmVjbm8gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYm9va3JlY25vO1xuXG4gICAgbGV0IHVybCA9ICcvaG9tZS9wYWdlcy9ib29rSW5mby9ib29rSW5mbz9saWJjb2RlPScgKyBsaWJjb2RlICsgXCImYm9va2lkPVwiICsgYm9va2lkICsgXCImYm9va3JlY25vPVwiICsgYm9va3JlY25vICsgXCImY2xhc3Nubz1cIjtcbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsXG4gICAgfSlcbiAgfTtcbiAgLy/lsIHpnaLlpITnkIZcbiAgc2V0RW1wdHlDb3ZlcigpIHtcbiAgICB2YXIgbGlzdEFyciA9IHNlbGYuaXRlbXNcbiAgICBsaXN0QXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgIGlmIChpdGVtLmJvb2tqcGdzLmluZGV4T2YoJ2RlZmF1bHRCb29rSW1nXycgPiAtMSkpIHtcbiAgICAgICAgdmFyIGxvY2FsQm9va2pwZ3MgPSBnZXRMb2NhbHN0b3JhZ2UoaXRlbS5pc2JuKVxuICAgICAgICBpZiAobG9jYWxCb29ranBncykge1xuICAgICAgICAgIGlmIChsb2NhbEJvb2tqcGdzICE9ICdnb3QnKSB7XG4gICAgICAgICAgICBpdGVtLmJvb2tqcGdzID0gbG9jYWxCb29ranBnc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgc2VsZi5pdGVtcz1saXN0QXJyO1xuXG5cbiAgfTtcbiAgYXJyeVF1Q2hvbmcoYXJyKSB7XG4gICAgdmFyIGhhc2ggPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChhcnJbaV0ubmV3Q2xhc3NOYW1lID09PSBhcnJbal0ubmV3Q2xhc3NOYW1lKSB7XG4gICAgICAgICAgKytpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBoYXNoLnB1c2goYXJyW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG4gIH1cbn1cbiJdfQ==