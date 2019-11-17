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

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require("./../utils/index.js");

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

var METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

var Request = function() {
    function Request() {
        _classCallCheck(this, Request);
        this._baseUrl = null;
        this.interceptors = {
            request: null,
            response: null
        };
    }
    _createClass(Request, [ {
        key: "request",
        value: function request(params) {
            var _this = this;
            var url = params.url;
            var method = params.method;
            var data = params.data;
            var jwt = params.jwt ? params.jwt : (0, _utils.getWxJwt)() ? (0, _utils.getWxJwt)() : (0, 
            _utils.getWxVtJwt)();
            _wepy2.default.showNavigationBarLoading();
            var header = {
                "Content-Type": "application/json",
                jwt: jwt,
                clientinfo: (0, _utils.getClientInfo)()
            };
            return _wepy2.default.request({
                url: (this._baseUrl || "") + url,
                method: method || METHOD.GET,
                data: method == "POST" ? JSON.stringify(data) : data,
                header: header
            }).then(function(res) {
                return _this.interceptors.response ? _this.interceptors.response(res) : res;
            });
        }
    }, {
        key: "get",
        value: function get(url, data) {
            return this.request({
                url: url,
                method: METHOD.GET,
                data: data
            });
        }
    }, {
        key: "post",
        value: function post(url, data, jwt) {
            return this.request({
                url: url,
                method: METHOD.POST,
                data: data,
                jwt: jwt
            });
        }
    }, {
        key: "put",
        value: function put(url, data) {
            return this.request({
                url: url,
                method: METHOD.PUT,
                data: data
            });
        }
    }, {
        key: "delete",
        value: function _delete(url, data) {
            return this.request({
                url: url,
                method: METHOD.DELETE,
                data: data
            });
        }
    }, {
        key: "token",
        value: function token(_token) {
            this._header.token = _token;
            return this;
        }
    }, {
        key: "header",
        value: function header(_header) {
            this._header = _header;
            return this;
        }
    }, {
        key: "baseUrl",
        value: function baseUrl() {
            return this;
        }
    }, {
        key: "interceptor",
        value: function interceptor(request, response) {
            if (typeof request === "function") {
                this.interceptors.request = request;
            }
            if (typeof request === "function") {
                this.interceptors.response = response;
            }
            return this;
        }
    } ]);
    return Request;
}();

exports.default = new Request();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1FVEhPRCIsIkdFVCIsIlBPU1QiLCJQVVQiLCJERUxFVEUiLCJSZXF1ZXN0IiwiX2Jhc2VVcmwiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJwYXJhbXMiLCJ1cmwiLCJtZXRob2QiLCJkYXRhIiwiand0Iiwid2VweSIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsImhlYWRlciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzIiwidG9rZW4iLCJfaGVhZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQVM7QUFDYkMsT0FBSyxLQURRO0FBRWJDLFFBQU0sTUFGTztBQUdiQyxPQUFLLEtBSFE7QUFJYkMsVUFBUTtBQUpLLENBQWY7O0lBT01DLE87Ozs7U0FDSkMsUSxHQUFXLEk7U0FFWEMsWSxHQUFlO0FBQ2JDLGVBQVMsSUFESTtBQUViQyxnQkFBVTtBQUZHLEs7Ozs7OzRCQUtQQyxNLEVBQVE7QUFBQTs7QUFDZCxVQUFJQyxNQUFNRCxPQUFPQyxHQUFqQjtBQUNBLFVBQUlDLFNBQVNGLE9BQU9FLE1BQXBCO0FBQ0EsVUFBSUMsT0FBT0gsT0FBT0csSUFBbEI7QUFDQSxVQUFJQyxNQUFNSixPQUFPSSxHQUFQLEdBQWFKLE9BQU9JLEdBQXBCLEdBQTJCLHlCQUFhLHNCQUFiLEdBQTBCLHdCQUEvRDtBQUNBQyxxQkFBS0Msd0JBQUw7QUFDQSxVQUFJQyxTQUFTO0FBQ1gsd0JBQWUsa0JBREo7QUFFWCxlQUFPSCxHQUZJO0FBR1gsc0JBQWM7QUFISCxPQUFiO0FBS0EsYUFBT0MsZUFBS1AsT0FBTCxDQUFhO0FBQ2xCRyxhQUFLLENBQUMsS0FBS0wsUUFBTCxJQUFpQixFQUFsQixJQUF3QkssR0FEWDtBQUVsQkMsZ0JBQVFBLFVBQVVaLE9BQU9DLEdBRlA7QUFHbEJZLGNBQU1ELFVBQVUsTUFBVixHQUFtQk0sS0FBS0MsU0FBTCxDQUFlTixJQUFmLENBQW5CLEdBQTBDQSxJQUg5QjtBQUlsQkksZ0JBQVFBO0FBSlUsT0FBYixFQUtKRyxJQUxJLENBS0M7QUFBQSxlQUFPLE1BQUtiLFlBQUwsQ0FBa0JFLFFBQWxCLEdBQTZCLE1BQUtGLFlBQUwsQ0FBa0JFLFFBQWxCLENBQTJCWSxHQUEzQixDQUE3QixHQUErREEsR0FBdEU7QUFBQSxPQUxELENBQVA7QUFNRDs7O3dCQUVHVixHLEVBQUtFLEksRUFBTTtBQUNiLGFBQU8sS0FBS0wsT0FBTCxDQUFhLEVBQUVHLFFBQUYsRUFBT0MsUUFBUVosT0FBT0MsR0FBdEIsRUFBMkJZLFVBQTNCLEVBQWIsQ0FBUDtBQUNEOzs7eUJBRUlGLEcsRUFBS0UsSSxFQUFNQyxHLEVBQUs7QUFDbkIsYUFBTyxLQUFLTixPQUFMLENBQWEsRUFBRUcsUUFBRixFQUFPQyxRQUFRWixPQUFPRSxJQUF0QixFQUE0QlcsVUFBNUIsRUFBa0NDLFFBQWxDLEVBQWIsQ0FBUDtBQUNEOzs7d0JBRUdILEcsRUFBS0UsSSxFQUFNO0FBQ2IsYUFBTyxLQUFLTCxPQUFMLENBQWEsRUFBRUcsUUFBRixFQUFPQyxRQUFRWixPQUFPRyxHQUF0QixFQUEyQlUsVUFBM0IsRUFBYixDQUFQO0FBQ0Q7Ozs0QkFFTUYsRyxFQUFLRSxJLEVBQU07QUFDaEIsYUFBTyxLQUFLTCxPQUFMLENBQWEsRUFBRUcsUUFBRixFQUFPQyxRQUFRWixPQUFPSSxNQUF0QixFQUE4QlMsVUFBOUIsRUFBYixDQUFQO0FBQ0Q7OzswQkFFS1MsTSxFQUFPO0FBQ1gsV0FBS0MsT0FBTCxDQUFhRCxLQUFiLEdBQXFCQSxNQUFyQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7MkJBRU1MLE8sRUFBUTtBQUNiLFdBQUtNLE9BQUwsR0FBZU4sT0FBZjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7OEJBRVM7QUFDUixhQUFPLElBQVA7QUFDRDs7O2dDQUVXVCxPLEVBQVNDLFEsRUFBVTtBQUM3QixVQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakMsYUFBS0QsWUFBTCxDQUFrQkMsT0FBbEIsR0FBNEJBLE9BQTVCO0FBQ0Q7QUFDRCxVQUFJLE9BQU9BLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakMsYUFBS0QsWUFBTCxDQUFrQkUsUUFBbEIsR0FBNkJBLFFBQTdCO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRDs7Ozs7O2tCQUdZLElBQUlKLE9BQUosRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHtnZXRDbGllbnRJbmZvLCBnZXRXeEp3dCwgZ2V0V3hWdEp3dH0gZnJvbSAnQC91dGlscyc7XG5cbmNvbnN0IE1FVEhPRCA9IHtcbiAgR0VUOiAnR0VUJyxcbiAgUE9TVDogJ1BPU1QnLFxuICBQVVQ6ICdQVVQnLFxuICBERUxFVEU6ICdERUxFVEUnXG59O1xuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgX2Jhc2VVcmwgPSBudWxsO1xuXG4gIGludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBudWxsLFxuICAgIHJlc3BvbnNlOiBudWxsXG4gIH07XG5cbiAgcmVxdWVzdChwYXJhbXMpIHtcbiAgICBsZXQgdXJsID0gcGFyYW1zLnVybDtcbiAgICBsZXQgbWV0aG9kID0gcGFyYW1zLm1ldGhvZDtcbiAgICBsZXQgZGF0YSA9IHBhcmFtcy5kYXRhO1xuICAgIGxldCBqd3QgPSBwYXJhbXMuand0ID8gcGFyYW1zLmp3dCA6IChnZXRXeEp3dCgpID8gZ2V0V3hKd3QoKSA6IGdldFd4VnRKd3QoKSk7XG4gICAgd2VweS5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICBsZXQgaGVhZGVyID0ge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ2p3dCc6IGp3dCxcbiAgICAgICdjbGllbnRpbmZvJzogZ2V0Q2xpZW50SW5mbygpXG4gICAgfVxuICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAodGhpcy5fYmFzZVVybCB8fCAnJykgKyB1cmwsXG4gICAgICBtZXRob2Q6IG1ldGhvZCB8fCBNRVRIT0QuR0VULFxuICAgICAgZGF0YTogbWV0aG9kID09ICdQT1NUJyA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YSxcbiAgICAgIGhlYWRlcjogaGVhZGVyXG4gICAgfSkudGhlbihyZXMgPT4gdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UgPyB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZShyZXMpIDogcmVzKTtcbiAgfVxuXG4gIGdldCh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6IE1FVEhPRC5HRVQsIGRhdGF9KTtcbiAgfVxuXG4gIHBvc3QodXJsLCBkYXRhLCBqd3QpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6IE1FVEhPRC5QT1NULCBkYXRhLCBqd3QgfSk7XG4gIH1cblxuICBwdXQodXJsLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7IHVybCwgbWV0aG9kOiBNRVRIT0QuUFVULCBkYXRhIH0pO1xuICB9XG5cbiAgZGVsZXRlKHVybCwgZGF0YSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoeyB1cmwsIG1ldGhvZDogTUVUSE9ELkRFTEVURSwgZGF0YSB9KTtcbiAgfVxuXG4gIHRva2VuKHRva2VuKSB7XG4gICAgdGhpcy5faGVhZGVyLnRva2VuID0gdG9rZW47XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoZWFkZXIoaGVhZGVyKSB7XG4gICAgdGhpcy5faGVhZGVyID0gaGVhZGVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYmFzZVVybCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGludGVyY2VwdG9yKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUmVxdWVzdCgpO1xuIl19