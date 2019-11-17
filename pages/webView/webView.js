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

var WebView = function(_wepy$page) {
    _inherits(WebView, _wepy$page);
    function WebView() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, WebView);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WebView.__proto__ || Object.getPrototypeOf(WebView)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.data = {
            url: ""
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(WebView, [ {
        key: "onLoad",
        value: function onLoad(option) {
            if (option.type && option.type == 2) {
                console.log(option.url);
                this.url = option.url + "?libcode=" + (0, _utils.getLibcodeChoosed)() + "&delivertype=" + (0, 
                _utils.getWxUserData)().delivertype + "&jwt=" + (0, _utils.getWxJwt)() + "&channel=wexin_minia&username=" + (0, 
                _utils.getWxUserData)().userDisplay + "&pic=" + (0, _utils.getSgmain)().headImgUrl + "&openid=" + (0, 
                _utils.getSgmain)().bindId;
            } else if (option.type && option.type == 3) {
                console.log(option.url);
                this.url = option.url + "?libcode=" + (0, _utils.getLibcodeChoosed)() + "&delivertype=" + (0, 
                _utils.getWxUserData)().delivertype + "&jwt=" + (0, _utils.getWxJwt)() + "&channel=wexin_minia&username=" + (0, 
                _utils.getWxUserData)().userDisplay + "&pic=" + (0, _utils.getSgmain)().headImgUrl + "&openid=" + (0, 
                _utils.getSgmain)().bindId;
            } else {
                this.url = option.url + "?libcode=" + option.libcode + "&ucardno1=" + option.ucardno1;
            }
            if (option.url && option.url.indexOf("goldHome") > -1) {
                this.url = option.url + "?libcode=" + (0, _utils.getLibcodeChoosed)() + "&clientSource=wexin_minia&userid=" + (0, 
                _utils.getWxUserData)().userId;
                // this.url = 'http://dev.jiatu.info:9220/wechat/goldHome?libcode=' +option.libcode + '&clientSource=wexin_minia&userid=' + option.userId;
                        }
            _wepy2.default.setNavigationBarTitle({
                title: option.title
            });
        }
    } ]);
    return WebView;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(WebView, "pages/webView/webView"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYlZpZXcuanMiXSwibmFtZXMiOlsiV2ViVmlldyIsImRhdGEiLCJ1cmwiLCJvcHRpb24iLCJ0eXBlIiwiY29uc29sZSIsImxvZyIsImRlbGl2ZXJ0eXBlIiwidXNlckRpc3BsYXkiLCJoZWFkSW1nVXJsIiwiYmluZElkIiwibGliY29kZSIsInVjYXJkbm8xIiwiaW5kZXhPZiIsInVzZXJJZCIsIndlcHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLFdBQUs7QUFEQSxLOzs7OzsyQkFHQUMsTSxFQUFRO0FBQ2IsVUFBR0EsT0FBT0MsSUFBUCxJQUFlRCxPQUFPQyxJQUFQLElBQWEsQ0FBL0IsRUFBaUM7QUFDL0JDLGdCQUFRQyxHQUFSLENBQVlILE9BQU9ELEdBQW5CO0FBQ0EsYUFBS0EsR0FBTCxHQUFXQyxPQUFPRCxHQUFQLEdBQVcsV0FBWCxHQUNQLCtCQURPLEdBQ2MsZUFEZCxHQUM4Qiw0QkFBZ0JLLFdBRDlDLEdBRVIsT0FGUSxHQUVBLHNCQUZBLEdBRVksZ0NBRlosR0FFNkMsNEJBQWdCQyxXQUY3RCxHQUdSLE9BSFEsR0FHQSx3QkFBWUMsVUFIWixHQUd1QixVQUh2QixHQUdrQyx3QkFBWUMsTUFIekQ7QUFJRCxPQU5ELE1BTU0sSUFBR1AsT0FBT0MsSUFBUCxJQUFlRCxPQUFPQyxJQUFQLElBQWEsQ0FBL0IsRUFBaUM7QUFDckNDLGdCQUFRQyxHQUFSLENBQVlILE9BQU9ELEdBQW5CO0FBQ0EsYUFBS0EsR0FBTCxHQUFXQyxPQUFPRCxHQUFQLEdBQVcsV0FBWCxHQUNQLCtCQURPLEdBQ2MsZUFEZCxHQUM4Qiw0QkFBZ0JLLFdBRDlDLEdBRVIsT0FGUSxHQUVBLHNCQUZBLEdBRVksZ0NBRlosR0FFNkMsNEJBQWdCQyxXQUY3RCxHQUdSLE9BSFEsR0FHQSx3QkFBWUMsVUFIWixHQUd1QixVQUh2QixHQUdrQyx3QkFBWUMsTUFIekQ7QUFJRCxPQU5LLE1BTUQ7QUFDSCxhQUFLUixHQUFMLEdBQVdDLE9BQU9ELEdBQVAsR0FBYSxXQUFiLEdBQTBCQyxPQUFPUSxPQUFqQyxHQUEyQyxZQUEzQyxHQUEwRFIsT0FBT1MsUUFBNUU7QUFDRDtBQUNELFVBQUlULE9BQU9ELEdBQVAsSUFBY0MsT0FBT0QsR0FBUCxDQUFXVyxPQUFYLENBQW1CLFVBQW5CLElBQStCLENBQUMsQ0FBbEQsRUFBb0Q7QUFDbEQsYUFBS1gsR0FBTCxHQUFXQyxPQUFPRCxHQUFQLEdBQWEsV0FBYixHQUEwQiwrQkFBMUIsR0FBZ0QsbUNBQWhELEdBQXNGLDRCQUFnQlksTUFBakg7QUFDQTtBQUNEO0FBQ0RDLHFCQUFLQyxxQkFBTCxDQUEyQjtBQUN6QkMsZUFBT2QsT0FBT2M7QUFEVyxPQUEzQjtBQUdEOzs7O0VBM0JrQ0YsZUFBS0csSTs7a0JBQXJCbEIsTyIsImZpbGUiOiJ3ZWJWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQge2hhc0xvZ2luLCBnZXRTZ21haW4sIGdldFd4VnRKd3QsIGdldFd4Snd0LCBzZXRXeFVzZXJJbmZvLGdldFd4VXNlckRhdGEsIGdldExpYmNvZGVDaG9vc2VkfSBmcm9tICdAL3V0aWxzJztcbmltcG9ydCB7Y2hlY2tXeE9ubGluZSwgYXV0b0xvZ2lufSBmcm9tICdAL3V0aWxzL2xvZ2luJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlZpZXcgZXh0ZW5kcyB3ZXB5LnBhZ2V7XG4gIGRhdGEgPSB7XG4gICAgdXJsOiAnJ1xuICB9XG4gIG9uTG9hZChvcHRpb24pIHtcbiAgICBpZihvcHRpb24udHlwZSAmJiBvcHRpb24udHlwZT09Mil7XG4gICAgICBjb25zb2xlLmxvZyhvcHRpb24udXJsKTtcbiAgICAgIHRoaXMudXJsID0gb3B0aW9uLnVybCtcIj9saWJjb2RlPVwiXG4gICAgICAgICsgZ2V0TGliY29kZUNob29zZWQoKSArXCImZGVsaXZlcnR5cGU9XCIrZ2V0V3hVc2VyRGF0YSgpLmRlbGl2ZXJ0eXBlXG4gICAgICAgICtcIiZqd3Q9XCIrZ2V0V3hKd3QoKSsgXCImY2hhbm5lbD13ZXhpbl9taW5pYSZ1c2VybmFtZT1cIitnZXRXeFVzZXJEYXRhKCkudXNlckRpc3BsYXlcbiAgICAgICAgK1wiJnBpYz1cIitnZXRTZ21haW4oKS5oZWFkSW1nVXJsK1wiJm9wZW5pZD1cIitnZXRTZ21haW4oKS5iaW5kSWQ7XG4gICAgfWVsc2UgaWYob3B0aW9uLnR5cGUgJiYgb3B0aW9uLnR5cGU9PTMpe1xuICAgICAgY29uc29sZS5sb2cob3B0aW9uLnVybCk7XG4gICAgICB0aGlzLnVybCA9IG9wdGlvbi51cmwrXCI/bGliY29kZT1cIlxuICAgICAgICArIGdldExpYmNvZGVDaG9vc2VkKCkgK1wiJmRlbGl2ZXJ0eXBlPVwiK2dldFd4VXNlckRhdGEoKS5kZWxpdmVydHlwZVxuICAgICAgICArXCImand0PVwiK2dldFd4Snd0KCkrIFwiJmNoYW5uZWw9d2V4aW5fbWluaWEmdXNlcm5hbWU9XCIrZ2V0V3hVc2VyRGF0YSgpLnVzZXJEaXNwbGF5XG4gICAgICAgICtcIiZwaWM9XCIrZ2V0U2dtYWluKCkuaGVhZEltZ1VybCtcIiZvcGVuaWQ9XCIrZ2V0U2dtYWluKCkuYmluZElkO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy51cmwgPSBvcHRpb24udXJsICsgJz9saWJjb2RlPScgK29wdGlvbi5saWJjb2RlICsgJyZ1Y2FyZG5vMT0nICsgb3B0aW9uLnVjYXJkbm8xO1xuICAgIH1cbiAgICBpZiAob3B0aW9uLnVybCAmJiBvcHRpb24udXJsLmluZGV4T2YoXCJnb2xkSG9tZVwiKT4tMSl7XG4gICAgICB0aGlzLnVybCA9IG9wdGlvbi51cmwgKyAnP2xpYmNvZGU9JyArZ2V0TGliY29kZUNob29zZWQoKSArICcmY2xpZW50U291cmNlPXdleGluX21pbmlhJnVzZXJpZD0nICsgZ2V0V3hVc2VyRGF0YSgpLnVzZXJJZDtcbiAgICAgIC8vIHRoaXMudXJsID0gJ2h0dHA6Ly9kZXYuamlhdHUuaW5mbzo5MjIwL3dlY2hhdC9nb2xkSG9tZT9saWJjb2RlPScgK29wdGlvbi5saWJjb2RlICsgJyZjbGllbnRTb3VyY2U9d2V4aW5fbWluaWEmdXNlcmlkPScgKyBvcHRpb24udXNlcklkO1xuICAgIH1cbiAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogb3B0aW9uLnRpdGxlXG4gICAgfSlcbiAgfVxufVxuIl19