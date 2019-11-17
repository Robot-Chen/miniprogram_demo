Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.request = request;

exports.response = response;

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

/**
 * request 拦截器
 * 可以全局拦截请求参数
 */ function request(params) {
    return params;
}

/**
 * response 拦截器
 * 可以全局拦截请求返回结果
 */ function response(res) {
    _wepy2.default.hideNavigationBarLoading();
    if (res.statusCode === 200) {
        return res.data;
    } else {
        return Promise.reject(res);
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVyY2VwdG9yLmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJyZXNwb25zZSIsInBhcmFtcyIsInJlcyIsIndlcHkiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzdGF0dXNDb2RlIiwiZGF0YSIsIlByb21pc2UiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7O1FBTWdCQSxPLEdBQUFBLE87UUFRQUMsUSxHQUFBQSxROztBQWRoQjs7Ozs7O0FBRUE7Ozs7QUFJTyxTQUFTRCxPQUFULENBQWlCRSxNQUFqQixFQUF5QjtBQUM5QixTQUFPQSxNQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJTyxTQUFTRCxRQUFULENBQWtCRSxHQUFsQixFQUF1QjtBQUM1QkMsaUJBQUtDLHdCQUFMO0FBQ0EsTUFBSUYsSUFBSUcsVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUMxQixXQUFPSCxJQUFJSSxJQUFYO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBT0MsUUFBUUMsTUFBUixDQUFlTixHQUFmLENBQVA7QUFDRDtBQUNGIiwiZmlsZSI6ImludGVyY2VwdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcblxuLyoqXG4gKiByZXF1ZXN0IOaLpuaIquWZqFxuICog5Y+v5Lul5YWo5bGA5oum5oiq6K+35rGC5Y+C5pWwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KHBhcmFtcykge1xuICByZXR1cm4gcGFyYW1zXG59XG5cbi8qKlxuICogcmVzcG9uc2Ug5oum5oiq5ZmoXG4gKiDlj6/ku6XlhajlsYDmi6bmiKror7fmsYLov5Tlm57nu5PmnpxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlKHJlcykge1xuICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xuICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgIHJldHVybiByZXMuZGF0YVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXMpXG4gIH1cbn1cbiJdfQ==