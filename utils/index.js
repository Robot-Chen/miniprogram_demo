Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.stringFormate = stringFormate;

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require("./../config.js");

var _config2 = _interopRequireDefault(_config);

var _MD = require("./cryptojs-master/lib/MD5.js");

var _MD2 = _interopRequireDefault(_MD);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var storageVersion = "v1";

var getClientInfo = function getClientInfo() {
    var clientInfo = JSON.stringify({
        libcode: getLibcodeChoosed(),
        platform: "embed_jieshu_minia",
        channel: "wexin_minia",
        clientSource: getLibcodeChoosed(),
        appEnvironment: getAppEnvironment(),
        username: getWxUserData().userName
    });
    return clientInfo;
};

var getLibcodeChoosed = function getLibcodeChoosed() {
    return getLocalstorage("_libcodeChoosed_");
};

var setLibcodeChoosed = function setLibcodeChoosed(libcodeChoosed) {
    setLocalstorage("_libcodeChoosed_", libcodeChoosed);
};

var getAppEnvironment = function getAppEnvironment() {
    return "production";
    //return 'dev'
};

var getWxUserData = function getWxUserData() {
    var userData = _wepy2.default.$instance.globalData.userData;
    if (userData && userData.userDisplay) {
        return userData;
    } else {
        userData = getLocalstorage("_wxUserData_" + getLibcodeChoosed() + "_");
        if (userData) {
            _wepy2.default.$instance.globalData.userData = userData;
        } else {
            _wepy2.default.$instance.globalData.userData = {
                userid: "0",
                userDisplay: false
            };
        }
        return _wepy2.default.$instance.globalData.userData;
    }
};

var setWxUserData = function setWxUserData(wxUserData) {
    _wepy2.default.$instance.globalData.userData = wxUserData;
    setLocalstorage("_wxUserData_" + getLibcodeChoosed() + "_", wxUserData);
};

var getWxVtUserData = function getWxVtUserData() {
    return getLocalstorage("_wxVtUserData_");
};

var setWxVtUserData = function setWxVtUserData(wxVtUserData) {
    setLocalstorage("_wxVtUserData_", wxVtUserData);
};

var removeWxUserData = function removeWxUserData() {
    _wepy2.default.$instance.globalData.userData = null;
    removeLocalstorage("_wxUserData_" + getLibcodeChoosed() + "_");
};

var getBorrowErrorInfo = function getBorrowErrorInfo() {
    return getLocalstorage("borrowErrorInfo");
};

var removeBorrowErrorInfo = function removeBorrowErrorInfo() {
    removeLocalstorage("borrowErrorInfo");
};

var getWxJwt = function getWxJwt() {
    return getLocalstorage("_wxJwt_" + getLibcodeChoosed() + "_");
};

var setWxJwt = function setWxJwt(wxJwt) {
    setLocalstorage("_wxJwt_" + getLibcodeChoosed() + "_", wxJwt);
};

var getWxVtJwt = function getWxVtJwt() {
    return getLocalstorage("_wxVtJwt_");
};

var setWxVtJwt = function setWxVtJwt(wxVtJwt) {
    setLocalstorage("_wxVtJwt_", wxVtJwt);
};

var removeWxJwt = function removeWxJwt() {
    removeLocalstorage("_wxJwt_" + getLibcodeChoosed() + "_");
};

var getSgmain = function getSgmain() {
    return getLocalstorage("_sgmain_");
};

var setSgmain = function setSgmain(sgmain) {
    setLocalstorage("_sgmain_", sgmain);
};

var setLibinfo = function setLibinfo(libinfo) {
    setLocalstorage("_libinfo_", libinfo);
};

var setUkey = function setUkey(ukey) {
    setLocalstorage("_ukey_", ukey);
};

var getUkey = function getUkey() {
    return getLocalstorage("_ukey_");
};

var setWxUserInfo = function setWxUserInfo(userInfo) {
    setLocalstorage("_userInfo_", userInfo);
};

var getWxUserInfo = function getWxUserInfo() {
    return getLocalstorage("_userInfo_");
};

var setCurrentDate = function setCurrentDate(date) {
    setLocalstorage("_currentDate_" + getLibcodeChoosed() + "_", date);
};

var getCurrentDate = function getCurrentDate() {
    return getLocalstorage("_currentDate_" + getLibcodeChoosed() + "_");
};

var hasLogin = function hasLogin() {
    if (getWxUserData().userDisplay) {
        return true;
    }
    return false;
};

//获取缓存
var getLocalstorage = function getLocalstorage(key) {
    try {
        var actualKey = key + storageVersion;
        var value = _wepy2.default.getStorageSync(actualKey);
        if (value) {
            return value;
        }
    } catch (e) {
        // Do something when catch error
    }
    return "";
};

//设置缓存
var setLocalstorage = function setLocalstorage(key, value) {
    try {
        var actualKey = key + storageVersion;
        _wepy2.default.setStorageSync(actualKey, value);
    } catch (e) {
        // Do something when catch error
    }
};

//清楚缓存
var removeLocalstorage = function removeLocalstorage(key) {
    try {
        var actualKey = key + storageVersion;
        _wepy2.default.removeStorageSync(actualKey);
    } catch (e) {
        // Do something when catch error
    }
};

//绘制封面
var dataConvert = function dataConvert(list, callback) {
    var emptycoverisbn = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        item.isbn = item.isbn.replace(/-/g, "");
        if (!item.bookjpgs || !item.bookjpgs.trim()) {
            var localBookjpgs = getLocalstorage(item.isbn);
            item.bookjpgs = "https://cdn.jieshu.me/minia/wexin/images/defaultBookImg_" + item.isbn % 6 + ".jpg";
            if (localBookjpgs) {
                if (localBookjpgs !== "got") {
                    item.bookjpgs = localBookjpgs;
                }
            } else {
                emptycoverisbn.push(item.isbn);
            }
        } else {
            if (item.bookjpgs.indexOf("http") === -1 && item.bookjpgs.indexOf("https")) {
                item.bookjpgs = _wepy2.default.$instance.configData.picResource + item.bookjpgs;
            }
        }
    }
    //封面
        if (emptycoverisbn.length > 0) {
        downloadCover(emptycoverisbn, list, setEmptyCover(list), callback);
    } else {
        callback(list);
    }
};

//封面处理
var setEmptyCover = function setEmptyCover(listArr) {
    listArr.forEach(function(item, i) {
        if (item.bookjpgs.indexOf("defaultBookImg_" > -1)) {
            var localBookjpgs = getLocalstorage(item.isbn);
            if (localBookjpgs) {
                if (localBookjpgs != "got") {
                    item.bookjpgs = localBookjpgs;
                }
            }
        }
    });
    return function() {};
};

var downloadCover = function downloadCover(emptycoverisbn, list, callback1, callback2) {
    if (emptycoverisbn.length > 0) {
        var isbns = emptycoverisbn.join(",");
        var _converUrl = "https://api.jieshu.me/bookinfo/api/book/cover/batch";
        _converUrl += "?isbns=" + isbns;
        var appRequestTime = new Date().getTime();
        var appkey = "54189e314608424dbc44f0d033d4eb28";
        var appSign = _MD2.default.hexMD5(appkey + "jiatu_123" + appRequestTime);
        // DigestUtils.md5Hex(apiOrder.getAppKey() + apiOrder.getAppSecret() + appRequestTimeString)
                _wepy2.default.request({
            url: _converUrl,
            method: "GET",
            header: {
                "Content-Type": "application/json",
                appkey: appkey,
                appSign: appSign,
                appRequestTime: appRequestTime
            },
            data: "",
            dataType: "text"
        }).then(function(res) {
            var result = JSON.parse(res.data.match(/{.*}/));
            result = result.data.bookInfoList;
            if (result.length > 0) {
                var coun = 0;
                for (var i = 0; i < result.length; i++) {
                    var isbn = result[i].isbn;
                    var coverlink = result[i].imgUrl;
                    var locallink = "got";
                    if (checkImg(coverlink)) {
                        coun++;
                        locallink = coverlink;
                    }
                    setLocalstorage(isbn, locallink);
                    for (var j = 0; j < list.length; j++) {
                        if (list[j].isbn == isbn && locallink != "got") {
                            list[j].bookjpgs = locallink;
                            break;
                        }
                    }
                    callback1();
                    if (i === result.length - 1) {
                        callback2(list);
                    }
                    console.log("成功请求了" + coun + "个封面");
                }
            } else {
                callback1();
                callback2(list);
            }
        }).catch(function(res) {
            callback1();
            callback2(list);
        });
    }
};

var checkImg = function checkImg(coverlink) {
    if (coverlink != "" && (coverlink.indexOf("https") == 0 || coverlink.indexOf("http") == 0) && coverlink.indexOf("sml_blank") == -1 && coverlink.indexOf("no-img") == -1 && coverlink.indexOf("no_cover") == -1 && coverlink.indexOf("book-default-medium") == -1 && coverlink.indexOf("www.tiantianbook.cn") == -1 && coverlink.indexOf("openbook.com") == -1 && coverlink.indexOf("s26238226.jpg") == -1 && coverlink.indexOf("1261661753") == -1) {
        return true;
    }
    return false;
};

var getCityList = function getCityList(cityList) {
    var titleList = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
    var titleObj = {};
    titleList.map(function(item) {
        titleObj[item] = {
            title: item,
            item: cityList.filter(function(city) {
                return city.spell[0].toUpperCase() === item;
            })
        };
    });
    var list = [];
    for (var key in titleObj) {
        list.push(titleObj[key]);
    }
    var temp = list;
    //Object.values(titleObj).filter(item => item.item.length > 0);
        return list.filter(function(item) {
        return item.item.length > 0;
    });
};

var changeLibcode = function changeLibcode(libcode, city) {
    _wepy2.default.showLoading({
        title: "加载中...",
        mask: true
    });
    clearUnimportantLocalstorage();
    setLibcodeChoosed(libcode);
    getCommonConfig();
    var sgmain = getSgmain();
    if (sgmain) {
        sgmain.chooseLibcode = libcode;
        sgmain.curlibcode = libcode;
        if (city) {
            sgmain.curCity = city;
        }
        setSgmain(sgmain);
        _config2.default.setLibcodeUserChoosed(sgmain).then(function(res) {
            _wepy2.default.$instance.globalData.libChanged = true;
        });
    }
    _wepy2.default.hideLoading();
};

var getCommonConfig = function getCommonConfig() {
    _wepy2.default.$instance.configData.commonConfig = null;
    _config2.default.getCommonConfig().then(function(res) {
        _wepy2.default.$instance.configData.commonConfig = res.data;
    });
};

var changeUserData = function changeUserData() {
    var userData = getLocalstorage("_userData_" + getLibcodeChoosed() + "_");
    if (userData) {
        _wepy2.default.$instance.globalData.userData = userData;
    } else {
        _wepy2.default.$instance.globalData.userData = {
            userid: "0",
            userDisplay: false
        };
    }
};

var clearUnimportantLocalstorage = function clearUnimportantLocalstorage(removeRealuser) {
    try {
        var res = _wepy2.default.getStorageInfoSync();
        var lsKeys = res.keys;
        for (var i = 0; i < lsKeys.length; i++) {
            var needDelete = true;
            var key = lsKeys[i];
            if (key.indexOf("_wxUserData_") == 0 || key.indexOf("_wxJwt_") == 0) {
                if (!removeRealuser) {
                    needDelete = false;
                }
            }
            if (key.indexOf("_wxVtUserData_") == 0 || key.indexOf("_wxVtJwt_") == 0) {
                needDelete = false;
            }
            if (key.indexOf("_sgmain_") == 0) {
                needDelete = false;
            }
            if (key.indexOf("_userInfo_") == 0) {
                needDelete = false;
            }
            if (key.indexOf("_currentDate_") == 0) {
                needDelete = false;
            }
            if (needDelete) {
                if (key != "volunteerInfo") {
                    _wepy2.default.removeStorageSync(key);
                }
            }
        }
        changeUserData();
    } catch (e) {
        console.error(JSON.stringify(e));
        // Do something when catch error
        }
};

var getAuthSetting = function getAuthSetting(scope, succFn) {
    var authSetting = _wepy2.default.$instance.globalData.authSetting;
    if (!authSetting || authSetting[scope]) {
        wx.getSetting({
            success: function success(res) {
                _wepy2.default.$instance.globalData.authSetting = res.authSetting;
                if (!res.authSetting[scope]) {
                    // 设置询问
                    wx.authorize({
                        scope: scope,
                        success: function success(res) {
                            succFn();
                        }
                    });
                } else {
                    succFn();
                }
            }
        });
    } else {
        succFn();
    }
};

//判断是否为手机号
var isPhoneAvailable = function isPhoneAvailable(phone) {
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
};

//字符串去除空格
function stringFormate(str) {
    if (!str) {
        return "";
    }
    return str.replace(/\s+/g, "");
}

module.exports = {
    getClientInfo: getClientInfo,
    getLibcodeChoosed: getLibcodeChoosed,
    setLibcodeChoosed: setLibcodeChoosed,
    getAppEnvironment: getAppEnvironment,
    removeLocalstorage: removeLocalstorage,
    getWxUserData: getWxUserData,
    setWxUserData: setWxUserData,
    getWxVtUserData: getWxVtUserData,
    setWxVtUserData: setWxVtUserData,
    removeWxUserData: removeWxUserData,
    getWxJwt: getWxJwt,
    setWxJwt: setWxJwt,
    getWxVtJwt: getWxVtJwt,
    setWxVtJwt: setWxVtJwt,
    removeWxJwt: removeWxJwt,
    setSgmain: setSgmain,
    getSgmain: getSgmain,
    setLibinfo: setLibinfo,
    setWxUserInfo: setWxUserInfo,
    getWxUserInfo: getWxUserInfo,
    hasLogin: hasLogin,
    setUkey: setUkey,
    getUkey: getUkey,
    getCityList: getCityList,
    dataConvert: dataConvert,
    changeLibcode: changeLibcode,
    getBorrowErrorInfo: getBorrowErrorInfo,
    removeBorrowErrorInfo: removeBorrowErrorInfo,
    getAuthSetting: getAuthSetting,
    isPhoneAvailable: isPhoneAvailable,
    setLocalstorage: setLocalstorage,
    getLocalstorage: getLocalstorage,
    stringFormate: stringFormate,
    setCurrentDate: setCurrentDate,
    getCurrentDate: getCurrentDate
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0cmluZ0Zvcm1hdGUiLCJzdG9yYWdlVmVyc2lvbiIsImdldENsaWVudEluZm8iLCJjbGllbnRJbmZvIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldExpYmNvZGVDaG9vc2VkIiwiZ2V0QXBwRW52aXJvbm1lbnQiLCJnZXRXeFVzZXJEYXRhIiwidXNlck5hbWUiLCJnZXRMb2NhbHN0b3JhZ2UiLCJzZXRMaWJjb2RlQ2hvb3NlZCIsImxpYmNvZGVDaG9vc2VkIiwic2V0TG9jYWxzdG9yYWdlIiwidXNlckRhdGEiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInVzZXJEaXNwbGF5IiwidXNlcmlkIiwic2V0V3hVc2VyRGF0YSIsInd4VXNlckRhdGEiLCJnZXRXeFZ0VXNlckRhdGEiLCJzZXRXeFZ0VXNlckRhdGEiLCJ3eFZ0VXNlckRhdGEiLCJyZW1vdmVXeFVzZXJEYXRhIiwicmVtb3ZlTG9jYWxzdG9yYWdlIiwiZ2V0Qm9ycm93RXJyb3JJbmZvIiwicmVtb3ZlQm9ycm93RXJyb3JJbmZvIiwiZ2V0V3hKd3QiLCJzZXRXeEp3dCIsInd4Snd0IiwiZ2V0V3hWdEp3dCIsInNldFd4VnRKd3QiLCJ3eFZ0Snd0IiwicmVtb3ZlV3hKd3QiLCJnZXRTZ21haW4iLCJzZXRTZ21haW4iLCJzZ21haW4iLCJzZXRMaWJpbmZvIiwibGliaW5mbyIsInNldFVrZXkiLCJ1a2V5IiwiZ2V0VWtleSIsInNldFd4VXNlckluZm8iLCJ1c2VySW5mbyIsImdldFd4VXNlckluZm8iLCJzZXRDdXJyZW50RGF0ZSIsImRhdGUiLCJnZXRDdXJyZW50RGF0ZSIsImhhc0xvZ2luIiwia2V5IiwiYWN0dWFsS2V5IiwidmFsdWUiLCJnZXRTdG9yYWdlU3luYyIsImUiLCJzZXRTdG9yYWdlU3luYyIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiZGF0YUNvbnZlcnQiLCJsaXN0IiwiY2FsbGJhY2siLCJlbXB0eWNvdmVyaXNibiIsImkiLCJsZW5ndGgiLCJpdGVtIiwiaXNibiIsInJlcGxhY2UiLCJib29ranBncyIsInRyaW0iLCJsb2NhbEJvb2tqcGdzIiwicHVzaCIsImluZGV4T2YiLCJjb25maWdEYXRhIiwicGljUmVzb3VyY2UiLCJkb3dubG9hZENvdmVyIiwic2V0RW1wdHlDb3ZlciIsImxpc3RBcnIiLCJmb3JFYWNoIiwiY2FsbGJhY2sxIiwiY2FsbGJhY2syIiwiaXNibnMiLCJqb2luIiwiX2NvbnZlclVybCIsImFwcFJlcXVlc3RUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJhcHBrZXkiLCJhcHBTaWduIiwiTUQ1IiwiaGV4TUQ1IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsImRhdGEiLCJkYXRhVHlwZSIsInRoZW4iLCJyZXN1bHQiLCJwYXJzZSIsInJlcyIsIm1hdGNoIiwiYm9va0luZm9MaXN0IiwiY291biIsImNvdmVybGluayIsImltZ1VybCIsImxvY2FsbGluayIsImNoZWNrSW1nIiwiaiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImdldENpdHlMaXN0IiwiY2l0eUxpc3QiLCJ0aXRsZUxpc3QiLCJ0aXRsZU9iaiIsIm1hcCIsInRpdGxlIiwiZmlsdGVyIiwiY2l0eSIsInNwZWxsIiwidG9VcHBlckNhc2UiLCJ0ZW1wIiwiY2hhbmdlTGliY29kZSIsImxpYmNvZGUiLCJzaG93TG9hZGluZyIsIm1hc2siLCJjbGVhclVuaW1wb3J0YW50TG9jYWxzdG9yYWdlIiwiZ2V0Q29tbW9uQ29uZmlnIiwiY2hvb3NlTGliY29kZSIsImN1cmxpYmNvZGUiLCJjdXJDaXR5IiwiY29uZmlnIiwic2V0TGliY29kZVVzZXJDaG9vc2VkIiwibGliQ2hhbmdlZCIsImhpZGVMb2FkaW5nIiwiY29tbW9uQ29uZmlnIiwiY2hhbmdlVXNlckRhdGEiLCJyZW1vdmVSZWFsdXNlciIsImdldFN0b3JhZ2VJbmZvU3luYyIsImxzS2V5cyIsImtleXMiLCJuZWVkRGVsZXRlIiwiZXJyb3IiLCJnZXRBdXRoU2V0dGluZyIsInNjb3BlIiwic3VjY0ZuIiwiYXV0aFNldHRpbmciLCJ3eCIsImdldFNldHRpbmciLCJzdWNjZXNzIiwiYXV0aG9yaXplIiwiaXNQaG9uZUF2YWlsYWJsZSIsInBob25lIiwibXlyZWciLCJ0ZXN0Iiwic3RyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUErWmdCQSxhLEdBQUFBLGE7O0FBL1poQjs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUZBLElBQU1DLGlCQUFpQixJQUF2Qjs7O0FBSUEsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixHQUFNO0FBQzFCLE1BQUlDLGFBQWFDLEtBQUtDLFNBQUwsQ0FBZTtBQUM5QixlQUFXQyxtQkFEbUI7QUFFOUIsZ0JBQVksb0JBRmtCO0FBRzlCLGVBQVcsYUFIbUI7QUFJOUIsb0JBQWdCQSxtQkFKYztBQUs5QixzQkFBa0JDLG1CQUxZO0FBTTlCLGdCQUFZQyxnQkFBZ0JDO0FBTkUsR0FBZixDQUFqQjtBQVFBLFNBQU9OLFVBQVA7QUFDRCxDQVZEOztBQVlBLElBQU1HLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQU07QUFDOUIsU0FBT0ksZ0JBQWdCLGtCQUFoQixDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxjQUFELEVBQW9CO0FBQzVDQyxrQkFBZ0Isa0JBQWhCLEVBQW9DRCxjQUFwQztBQUNELENBRkQ7O0FBSUEsSUFBTUwsb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM3QixTQUFPLFlBQVA7QUFDQTtBQUNGLENBSEQ7O0FBS0EsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixHQUFNO0FBQzFCLE1BQUlNLFdBQVdDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkgsUUFBekM7QUFDQSxNQUFJQSxZQUFZQSxTQUFTSSxXQUF6QixFQUFzQztBQUNwQyxXQUFPSixRQUFQO0FBQ0QsR0FGRCxNQUVPO0FBQ0xBLGVBQVdKLGdCQUFnQixpQkFBaUJKLG1CQUFqQixHQUF1QyxHQUF2RCxDQUFYO0FBQ0EsUUFB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SSxDQUFDQSxHQUFMLEVBQVU7QUFDUixXQUFPLEVBQVA7QUFDRDtBQUNELFNBQU9BLElBQUl6RixPQUFKLENBQVksTUFBWixFQUFtQixFQUFuQixDQUFQO0FBQ0Q7O0FBRUQwRixPQUFPQyxPQUFQLEdBQWlCO0FBQ2YzSiw4QkFEZTtBQUVmSSxzQ0FGZTtBQUdmSyxzQ0FIZTtBQUlmSixzQ0FKZTtBQUtmbUIsd0NBTGU7QUFNZmxCLDhCQU5lO0FBT2ZZLDhCQVBlO0FBUWZFLGtDQVJlO0FBU2ZDLGtDQVRlO0FBVWZFLG9DQVZlO0FBV2ZJLG9CQVhlO0FBWWZDLG9CQVplO0FBYWZFLHdCQWJlO0FBY2ZDLHdCQWRlO0FBZWZFLDBCQWZlO0FBZ0JmRSxzQkFoQmU7QUFpQmZELHNCQWpCZTtBQWtCZkcsd0JBbEJlO0FBbUJmSyw4QkFuQmU7QUFvQmZFLDhCQXBCZTtBQXFCZkksb0JBckJlO0FBc0JmVCxrQkF0QmU7QUF1QmZFLGtCQXZCZTtBQXdCZm9FLDBCQXhCZTtBQXlCZnJELDBCQXpCZTtBQTBCZmdFLDhCQTFCZTtBQTJCZi9GLHdDQTNCZTtBQTRCZkMsOENBNUJlO0FBNkJmbUgsZ0NBN0JlO0FBOEJmUSxvQ0E5QmU7QUErQmYxSSxrQ0EvQmU7QUFnQ2ZILGtDQWhDZTtBQWlDZlYsOEJBakNlO0FBa0NmK0MsZ0NBbENlO0FBbUNmRTtBQW5DZSxDQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuY29uc3Qgc3RvcmFnZVZlcnNpb24gPSAndjEnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICdAL2NvbmZpZyc7XG5pbXBvcnQgTUQ1IGZyb20gJ0AvdXRpbHMvY3J5cHRvanMtbWFzdGVyL2xpYi9NRDUnO1xuXG5jb25zdCBnZXRDbGllbnRJbmZvID0gKCkgPT4ge1xuICBsZXQgY2xpZW50SW5mbyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAnbGliY29kZSc6IGdldExpYmNvZGVDaG9vc2VkKCksXG4gICAgJ3BsYXRmb3JtJzogJ2VtYmVkX2ppZXNodV9taW5pYScsXG4gICAgJ2NoYW5uZWwnOiAnd2V4aW5fbWluaWEnLFxuICAgICdjbGllbnRTb3VyY2UnOiBnZXRMaWJjb2RlQ2hvb3NlZCgpLFxuICAgICdhcHBFbnZpcm9ubWVudCc6IGdldEFwcEVudmlyb25tZW50KCksXG4gICAgJ3VzZXJuYW1lJzogZ2V0V3hVc2VyRGF0YSgpLnVzZXJOYW1lXG4gIH0pO1xuICByZXR1cm4gY2xpZW50SW5mbztcbn07XG5cbmNvbnN0IGdldExpYmNvZGVDaG9vc2VkID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0TG9jYWxzdG9yYWdlKCdfbGliY29kZUNob29zZWRfJyk7XG59O1xuXG5jb25zdCBzZXRMaWJjb2RlQ2hvb3NlZCA9IChsaWJjb2RlQ2hvb3NlZCkgPT4ge1xuICBzZXRMb2NhbHN0b3JhZ2UoJ19saWJjb2RlQ2hvb3NlZF8nLCBsaWJjb2RlQ2hvb3NlZCk7XG59O1xuXG5jb25zdCBnZXRBcHBFbnZpcm9ubWVudCA9ICgpID0+IHtcbiAgIHJldHVybiAncHJvZHVjdGlvbic7XG4gICAvL3JldHVybiAnZGV2J1xufTtcblxuY29uc3QgZ2V0V3hVc2VyRGF0YSA9ICgpID0+IHtcbiAgbGV0IHVzZXJEYXRhID0gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VyRGF0YTtcbiAgaWYgKHVzZXJEYXRhICYmIHVzZXJEYXRhLnVzZXJEaXNwbGF5KSB7XG4gICAgcmV0dXJuIHVzZXJEYXRhO1xuICB9IGVsc2Uge1xuICAgIHVzZXJEYXRhID0gZ2V0TG9jYWxzdG9yYWdlKCdfd3hVc2VyRGF0YV8nICsgZ2V0TGliY29kZUNob29zZWQoKSArICdfJyk7XG4gICAgaWYgKHVzZXJEYXRhKSB7XG4gICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdXNlckRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHsgdXNlcmlkOiAnMCcsIHVzZXJEaXNwbGF5OiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VyRGF0YVxuICB9XG59O1xuXG5jb25zdCBzZXRXeFVzZXJEYXRhID0gKHd4VXNlckRhdGEpID0+IHtcbiAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHd4VXNlckRhdGE7XG4gIHNldExvY2Fsc3RvcmFnZSgnX3d4VXNlckRhdGFfJyArIGdldExpYmNvZGVDaG9vc2VkKCkgKyAnXycsIHd4VXNlckRhdGEpO1xufTtcblxuY29uc3QgZ2V0V3hWdFVzZXJEYXRhID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0TG9jYWxzdG9yYWdlKCdfd3hWdFVzZXJEYXRhXycpO1xufTtcblxuY29uc3Qgc2V0V3hWdFVzZXJEYXRhID0gKHd4VnRVc2VyRGF0YSkgPT4ge1xuICBzZXRMb2NhbHN0b3JhZ2UoJ193eFZ0VXNlckRhdGFfJywgd3hWdFVzZXJEYXRhKTtcbn07XG5cbmNvbnN0IHJlbW92ZVd4VXNlckRhdGEgPSAoKSA9PiB7XG4gIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckRhdGEgPSBudWxsO1xuICByZW1vdmVMb2NhbHN0b3JhZ2UoJ193eFVzZXJEYXRhXycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJ18nKTtcbn07XG5cbmNvbnN0IGdldEJvcnJvd0Vycm9ySW5mbyA9ICgpID0+IHtcbiAgcmV0dXJuIGdldExvY2Fsc3RvcmFnZSgnYm9ycm93RXJyb3JJbmZvJyk7XG59O1xuXG5jb25zdCByZW1vdmVCb3Jyb3dFcnJvckluZm8gPSAoKSA9PiB7XG4gIHJlbW92ZUxvY2Fsc3RvcmFnZSgnYm9ycm93RXJyb3JJbmZvJyk7XG59O1xuXG5jb25zdCBnZXRXeEp3dCA9ICgpID0+IHtcbiAgcmV0dXJuIGdldExvY2Fsc3RvcmFnZSgnX3d4Snd0XycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJ18nKTtcbn07XG5cbmNvbnN0IHNldFd4Snd0ID0gKHd4Snd0KSA9PiB7XG4gIHNldExvY2Fsc3RvcmFnZSgnX3d4Snd0XycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJ18nLCB3eEp3dCk7XG59O1xuXG5jb25zdCBnZXRXeFZ0Snd0ID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0TG9jYWxzdG9yYWdlKCdfd3hWdEp3dF8nKTtcbn07XG5cbmNvbnN0IHNldFd4VnRKd3QgPSAod3hWdEp3dCkgPT4ge1xuICBzZXRMb2NhbHN0b3JhZ2UoJ193eFZ0Snd0XycsIHd4VnRKd3QpO1xufTtcblxuY29uc3QgcmVtb3ZlV3hKd3QgPSAoKSA9PiB7XG4gIHJlbW92ZUxvY2Fsc3RvcmFnZSgnX3d4Snd0XycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJ18nKTtcbn07XG5cbmNvbnN0IGdldFNnbWFpbiA9ICgpID0+IHtcbiAgcmV0dXJuIGdldExvY2Fsc3RvcmFnZSgnX3NnbWFpbl8nKTtcbn07XG5cbmNvbnN0IHNldFNnbWFpbiA9IChzZ21haW4pID0+IHtcbiAgc2V0TG9jYWxzdG9yYWdlKCdfc2dtYWluXycsIHNnbWFpbik7XG59O1xuXG5jb25zdCBzZXRMaWJpbmZvID0gKGxpYmluZm8pID0+IHtcbiAgc2V0TG9jYWxzdG9yYWdlKCdfbGliaW5mb18nLCBsaWJpbmZvKTtcbn07XG5cbmNvbnN0IHNldFVrZXkgPSAodWtleSkgPT4ge1xuICBzZXRMb2NhbHN0b3JhZ2UoJ191a2V5XycsIHVrZXkpO1xufTtcblxuY29uc3QgZ2V0VWtleSA9ICgpID0+IHtcbiAgcmV0dXJuIGdldExvY2Fsc3RvcmFnZSgnX3VrZXlfJyk7XG59O1xuXG5jb25zdCBzZXRXeFVzZXJJbmZvID0gKHVzZXJJbmZvKSA9PiB7XG4gIHNldExvY2Fsc3RvcmFnZSgnX3VzZXJJbmZvXycsIHVzZXJJbmZvKTtcbn1cblxuY29uc3QgZ2V0V3hVc2VySW5mbyA9ICgpID0+IHtcbiAgcmV0dXJuIGdldExvY2Fsc3RvcmFnZSgnX3VzZXJJbmZvXycpO1xufVxuXG5jb25zdCBzZXRDdXJyZW50RGF0ZSA9IChkYXRlKSA9PiB7XG4gIHNldExvY2Fsc3RvcmFnZSgnX2N1cnJlbnREYXRlXycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJ18nLCBkYXRlKTtcbn1cblxuY29uc3QgZ2V0Q3VycmVudERhdGUgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRMb2NhbHN0b3JhZ2UoJ19jdXJyZW50RGF0ZV8nICsgZ2V0TGliY29kZUNob29zZWQoKSArICdfJyk7XG59XG5cbmNvbnN0IGhhc0xvZ2luID0gKCkgPT4ge1xuICBpZiAoZ2V0V3hVc2VyRGF0YSgpLnVzZXJEaXNwbGF5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy/ojrflj5bnvJPlrZhcbmNvbnN0IGdldExvY2Fsc3RvcmFnZSA9IChrZXkpID0+IHtcbiAgdHJ5IHtcbiAgICBsZXQgYWN0dWFsS2V5ID0ga2V5ICsgc3RvcmFnZVZlcnNpb247XG4gICAgbGV0IHZhbHVlID0gd2VweS5nZXRTdG9yYWdlU3luYyhhY3R1YWxLZXkpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuLy/orr7nva7nvJPlrZhcbmNvbnN0IHNldExvY2Fsc3RvcmFnZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gIHRyeSB7XG4gICAgbGV0IGFjdHVhbEtleSA9IGtleSArIHN0b3JhZ2VWZXJzaW9uO1xuICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoYWN0dWFsS2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxuICB9XG59O1xuXG4vL+a4healmue8k+WtmFxuY29uc3QgcmVtb3ZlTG9jYWxzdG9yYWdlID0gZnVuY3Rpb24oa2V5KSB7XG4gIHRyeSB7XG4gICAgdmFyIGFjdHVhbEtleSA9IGtleSArIHN0b3JhZ2VWZXJzaW9uO1xuICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoYWN0dWFsS2V5KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXG4gIH1cbn07XG5cbi8v57uY5Yi25bCB6Z2iXG5jb25zdCBkYXRhQ29udmVydCA9IChsaXN0LCBjYWxsYmFjaykgPT4ge1xuICBsZXQgZW1wdHljb3ZlcmlzYm4gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGl0ZW0gPSBsaXN0W2ldO1xuICAgIGl0ZW0uaXNibiA9IGl0ZW0uaXNibi5yZXBsYWNlKC8tL2csICcnKTtcbiAgICBpZiAoIWl0ZW0uYm9va2pwZ3MgfHwgIWl0ZW0uYm9va2pwZ3MudHJpbSgpKSB7XG4gICAgICBsZXQgbG9jYWxCb29ranBncyA9IGdldExvY2Fsc3RvcmFnZShpdGVtLmlzYm4pO1xuICAgICAgaXRlbS5ib29ranBncyA9ICdodHRwczovL2Nkbi5qaWVzaHUubWUvbWluaWEvd2V4aW4vaW1hZ2VzL2RlZmF1bHRCb29rSW1nXycgKyBpdGVtLmlzYm4gJSA2ICsgJy5qcGcnO1xuICAgICAgaWYgKGxvY2FsQm9va2pwZ3MpIHtcbiAgICAgICAgaWYgKGxvY2FsQm9va2pwZ3MgIT09ICdnb3QnKSB7XG4gICAgICAgICAgaXRlbS5ib29ranBncyA9IGxvY2FsQm9va2pwZ3M7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVtcHR5Y292ZXJpc2JuLnB1c2goaXRlbS5pc2JuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGl0ZW0uYm9va2pwZ3MuaW5kZXhPZignaHR0cCcpID09PSAtMSAmJiBpdGVtLmJvb2tqcGdzLmluZGV4T2YoJ2h0dHBzJykpIHtcbiAgICAgICAgaXRlbS5ib29ranBncyA9IHdlcHkuJGluc3RhbmNlLmNvbmZpZ0RhdGEucGljUmVzb3VyY2UgKyBpdGVtLmJvb2tqcGdzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL+WwgemdolxuICBpZiAoZW1wdHljb3ZlcmlzYm4ubGVuZ3RoID4gMCkge1xuICAgIGRvd25sb2FkQ292ZXIoZW1wdHljb3ZlcmlzYm4sIGxpc3QsIHNldEVtcHR5Q292ZXIobGlzdCksIGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjayhsaXN0KTtcbiAgfVxufTtcblxuLy/lsIHpnaLlpITnkIZcbmNvbnN0IHNldEVtcHR5Q292ZXIgPSAobGlzdEFycikgPT4ge1xuICBsaXN0QXJyLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgIGlmIChpdGVtLmJvb2tqcGdzLmluZGV4T2YoJ2RlZmF1bHRCb29rSW1nXycgPiAtMSkpIHtcbiAgICAgIGxldCBsb2NhbEJvb2tqcGdzID0gZ2V0TG9jYWxzdG9yYWdlKGl0ZW0uaXNibik7XG4gICAgICBpZiAobG9jYWxCb29ranBncykge1xuICAgICAgICBpZiAobG9jYWxCb29ranBncyAhPSAnZ290Jykge1xuICAgICAgICAgIGl0ZW0uYm9va2pwZ3MgPSBsb2NhbEJvb2tqcGdzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge307XG59O1xuXG5jb25zdCBkb3dubG9hZENvdmVyID0gKGVtcHR5Y292ZXJpc2JuLCBsaXN0LCBjYWxsYmFjazEsIGNhbGxiYWNrMikgPT4ge1xuICBpZiAoZW1wdHljb3ZlcmlzYm4ubGVuZ3RoID4gMCkge1xuICAgIGxldCBpc2JucyA9IGVtcHR5Y292ZXJpc2JuLmpvaW4oJywnKTtcbiAgICBsZXQgX2NvbnZlclVybCA9ICdodHRwczovL2FwaS5qaWVzaHUubWUvYm9va2luZm8vYXBpL2Jvb2svY292ZXIvYmF0Y2gnO1xuICAgIF9jb252ZXJVcmwgKz0gJz9pc2Jucz0nICsgaXNibnM7XG4gICAgbGV0IGFwcFJlcXVlc3RUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbGV0IGFwcGtleSA9ICc1NDE4OWUzMTQ2MDg0MjRkYmM0NGYwZDAzM2Q0ZWIyOCc7XG4gICAgbGV0IGFwcFNpZ24gPSBNRDUuaGV4TUQ1KGFwcGtleSArIFwiamlhdHVfMTIzXCIgKyBhcHBSZXF1ZXN0VGltZSk7XG4gICAgLy8gRGlnZXN0VXRpbHMubWQ1SGV4KGFwaU9yZGVyLmdldEFwcEtleSgpICsgYXBpT3JkZXIuZ2V0QXBwU2VjcmV0KCkgKyBhcHBSZXF1ZXN0VGltZVN0cmluZylcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiBfY29udmVyVXJsLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYXBwa2V5JzogYXBwa2V5LFxuICAgICAgICAnYXBwU2lnbic6IGFwcFNpZ24sXG4gICAgICAgICdhcHBSZXF1ZXN0VGltZSc6IGFwcFJlcXVlc3RUaW1lXG5cbiAgICAgIH0sXG4gICAgICBkYXRhOiAnJyxcbiAgICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXMuZGF0YS5tYXRjaCgvey4qfS8pKTtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5kYXRhLmJvb2tJbmZvTGlzdDtcbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgY291biA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGlzYm4gPSByZXN1bHRbaV0uaXNibjtcbiAgICAgICAgICBsZXQgY292ZXJsaW5rID0gcmVzdWx0W2ldLmltZ1VybDtcbiAgICAgICAgICBsZXQgbG9jYWxsaW5rID0gJ2dvdCc7XG4gICAgICAgICAgaWYgKGNoZWNrSW1nKGNvdmVybGluaykpIHtcbiAgICAgICAgICAgIGNvdW4rKztcbiAgICAgICAgICAgIGxvY2FsbGluayA9IGNvdmVybGluaztcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0TG9jYWxzdG9yYWdlKGlzYm4sIGxvY2FsbGluayk7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobGlzdFtqXS5pc2JuID09IGlzYm4gJiYgbG9jYWxsaW5rICE9ICdnb3QnKSB7XG4gICAgICAgICAgICAgIGxpc3Rbal0uYm9va2pwZ3MgPSBsb2NhbGxpbms7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjazEoKTtcbiAgICAgICAgICBpZiAoaSA9PT0gcmVzdWx0Lmxlbmd0aCAtMSkge1xuICAgICAgICAgICAgY2FsbGJhY2syKGxpc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZygn5oiQ5Yqf6K+35rGC5LqGJyArIGNvdW4gKyAn5Liq5bCB6Z2iJyk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICAgIGNhbGxiYWNrMSgpO1xuICAgICAgICAgIGNhbGxiYWNrMihsaXN0KTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKHJlcyA9PiB7XG4gICAgICAgIGNhbGxiYWNrMSgpO1xuICAgICAgICBjYWxsYmFjazIobGlzdCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgY2hlY2tJbWcgPSAoY292ZXJsaW5rKSA9PiB7XG4gIGlmIChjb3ZlcmxpbmsgIT0gJycgJiYgKGNvdmVybGluay5pbmRleE9mKCdodHRwcycpID09IDAgfHwgY292ZXJsaW5rLmluZGV4T2YoJ2h0dHAnKSA9PSAwKVxuICAgICYmIGNvdmVybGluay5pbmRleE9mKCdzbWxfYmxhbmsnKSA9PSAtMVxuICAgICYmIGNvdmVybGluay5pbmRleE9mKCduby1pbWcnKSA9PSAtMVxuICAgICYmIGNvdmVybGluay5pbmRleE9mKCdub19jb3ZlcicpID09IC0xXG4gICAgJiYgY292ZXJsaW5rLmluZGV4T2YoJ2Jvb2stZGVmYXVsdC1tZWRpdW0nKSA9PSAtMVxuICAgICYmIGNvdmVybGluay5pbmRleE9mKCd3d3cudGlhbnRpYW5ib29rLmNuJykgPT0gLTFcbiAgICAmJiBjb3ZlcmxpbmsuaW5kZXhPZignb3BlbmJvb2suY29tJykgPT0gLTFcbiAgICAmJiBjb3ZlcmxpbmsuaW5kZXhPZignczI2MjM4MjI2LmpwZycpID09IC0xXG4gICAgJiYgY292ZXJsaW5rLmluZGV4T2YoJzEyNjE2NjE3NTMnKSA9PSAtMSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldENpdHlMaXN0ID0gKGNpdHlMaXN0KSA9PiB7XG4gIGNvbnN0IHRpdGxlTGlzdCA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSicsICdLJywgJ0wnLCAnTScsICdOJywgJ08nLCAnUCcsICdRJywgJ1InLCAnUycsICdUJywgJ1UnLCAnVicsICdXJywgJ1gnLCAnWScsICdaJ107XG4gIGNvbnN0IHRpdGxlT2JqID0ge307XG4gIHRpdGxlTGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgdGl0bGVPYmpbaXRlbV0gPSB7XG4gICAgICB0aXRsZTogaXRlbSxcbiAgICAgIGl0ZW06IGNpdHlMaXN0LmZpbHRlcihjaXR5ID0+IGNpdHkuc3BlbGxbMF0udG9VcHBlckNhc2UoKSA9PT0gaXRlbSlcbiAgICB9O1xuICB9KTtcbiAgdmFyIGxpc3QgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIHRpdGxlT2JqKSB7XG4gICAgbGlzdC5wdXNoKHRpdGxlT2JqW2tleV0pO1xuICB9XG4gIHZhciB0ZW1wID0gbGlzdFxuICAvL09iamVjdC52YWx1ZXModGl0bGVPYmopLmZpbHRlcihpdGVtID0+IGl0ZW0uaXRlbS5sZW5ndGggPiAwKTtcbiAgcmV0dXJuIGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pdGVtLmxlbmd0aCA+IDApO1xufTtcblxuY29uc3QgY2hhbmdlTGliY29kZSA9IChsaWJjb2RlLCBjaXR5KSA9PiB7XG4gIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJyxtYXNrOiB0cnVlfSk7XG4gIGNsZWFyVW5pbXBvcnRhbnRMb2NhbHN0b3JhZ2UoKTtcbiAgc2V0TGliY29kZUNob29zZWQobGliY29kZSk7XG4gIGdldENvbW1vbkNvbmZpZygpO1xuICBsZXQgc2dtYWluID0gZ2V0U2dtYWluKCk7XG4gIGlmIChzZ21haW4pIHtcbiAgICBzZ21haW4uY2hvb3NlTGliY29kZSA9IGxpYmNvZGU7XG4gICAgc2dtYWluLmN1cmxpYmNvZGUgPSBsaWJjb2RlO1xuICAgIGlmIChjaXR5KSB7XG4gICAgICBzZ21haW4uY3VyQ2l0eSA9IGNpdHk7XG4gICAgfVxuICAgIHNldFNnbWFpbihzZ21haW4pO1xuICAgIGNvbmZpZy5zZXRMaWJjb2RlVXNlckNob29zZWQoc2dtYWluKS50aGVuKHJlcyA9PiB7XG4gICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLmxpYkNoYW5nZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgd2VweS5oaWRlTG9hZGluZygpO1xuXG59O1xuXG5jb25zdCBnZXRDb21tb25Db25maWcgPSAgKCkgPT4ge1xuICB3ZXB5LiRpbnN0YW5jZS5jb25maWdEYXRhLmNvbW1vbkNvbmZpZyA9IG51bGw7XG4gIGNvbmZpZy5nZXRDb21tb25Db25maWcoKS50aGVuKHJlcyA9PiB7XG4gICAgd2VweS4kaW5zdGFuY2UuY29uZmlnRGF0YS5jb21tb25Db25maWcgPSByZXMuZGF0YTtcbiAgfSlcbn1cblxuY29uc3QgY2hhbmdlVXNlckRhdGEgPSAoKSA9PiB7XG4gIGxldCB1c2VyRGF0YSA9IGdldExvY2Fsc3RvcmFnZSgnX3VzZXJEYXRhXycgKyBnZXRMaWJjb2RlQ2hvb3NlZCgpICsgJ18nKTtcbiAgaWYgKHVzZXJEYXRhKSB7XG4gICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHVzZXJEYXRhO1xuICB9IGVsc2Uge1xuICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckRhdGEgPSB7IHVzZXJpZDogJzAnLCB1c2VyRGlzcGxheTogZmFsc2UgfTtcbiAgfVxufTtcblxuY29uc3QgY2xlYXJVbmltcG9ydGFudExvY2Fsc3RvcmFnZSA9IChyZW1vdmVSZWFsdXNlcikgPT4ge1xuICB0cnkge1xuICAgIGxldCByZXMgPSB3ZXB5LmdldFN0b3JhZ2VJbmZvU3luYygpO1xuICAgIGxldCBsc0tleXMgPSByZXMua2V5cztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxzS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5lZWREZWxldGUgPSB0cnVlO1xuICAgICAgbGV0IGtleSA9IGxzS2V5c1tpXTtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignX3d4VXNlckRhdGFfJykgPT0gMCB8fCBrZXkuaW5kZXhPZignX3d4Snd0XycpID09IDApIHtcbiAgICAgICAgaWYgKCFyZW1vdmVSZWFsdXNlcikge1xuICAgICAgICAgIG5lZWREZWxldGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGtleS5pbmRleE9mKCdfd3hWdFVzZXJEYXRhXycpID09IDAgfHwga2V5LmluZGV4T2YoJ193eFZ0Snd0XycpID09IDApIHtcbiAgICAgICAgbmVlZERlbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5pbmRleE9mKCdfc2dtYWluXycpID09IDApIHtcbiAgICAgICAgbmVlZERlbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5pbmRleE9mKCdfdXNlckluZm9fJykgPT0gMCkge1xuICAgICAgICBuZWVkRGVsZXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoa2V5LmluZGV4T2YoJ19jdXJyZW50RGF0ZV8nKSA9PSAwKSB7XG4gICAgICAgIG5lZWREZWxldGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkRGVsZXRlKSB7XG4gICAgICAgIGlmKGtleSE9J3ZvbHVudGVlckluZm8nKXtcbiAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlVXNlckRhdGEoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXG4gIH1cbn07XG5cbmNvbnN0IGdldEF1dGhTZXR0aW5nID0gKHNjb3BlLCBzdWNjRm4pID0+IHtcbiAgbGV0IGF1dGhTZXR0aW5nID0gIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuYXV0aFNldHRpbmc7XG4gIGlmICghYXV0aFNldHRpbmcgfHwgYXV0aFNldHRpbmdbc2NvcGVdKSB7XG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLmF1dGhTZXR0aW5nID0gcmVzLmF1dGhTZXR0aW5nXG4gICAgICAgIGlmICghcmVzLmF1dGhTZXR0aW5nW3Njb3BlXSkge1xuICAgICAgICAgIC8vIOiuvue9ruivoumXrlxuICAgICAgICAgIHd4LmF1dGhvcml6ZSh7XG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICBzdWNjRm4oKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHN1Y2NGbigpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9ZWxzZXtcbiAgICBzdWNjRm4oKVxuICB9XG59XG5cbi8v5Yik5pat5piv5ZCm5Li65omL5py65Y+3XG5jb25zdCBpc1Bob25lQXZhaWxhYmxlID0gKHBob25lKSA9PiB7XG4gIGxldCBteXJlZyA9IC9eWzFdWzMsNCw1LDcsOCw5XVswLTldezl9JC87XG4gIGlmICghbXlyZWcudGVzdChwaG9uZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLy/lrZfnrKbkuLLljrvpmaTnqbrmoLxcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdGb3JtYXRlKHN0cikge1xuICBpZiAoIXN0cikge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccysvZyxcIlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsaWVudEluZm8sXG4gIGdldExpYmNvZGVDaG9vc2VkLFxuICBzZXRMaWJjb2RlQ2hvb3NlZCxcbiAgZ2V0QXBwRW52aXJvbm1lbnQsXG4gIHJlbW92ZUxvY2Fsc3RvcmFnZSxcbiAgZ2V0V3hVc2VyRGF0YSxcbiAgc2V0V3hVc2VyRGF0YSxcbiAgZ2V0V3hWdFVzZXJEYXRhLFxuICBzZXRXeFZ0VXNlckRhdGEsXG4gIHJlbW92ZVd4VXNlckRhdGEsXG4gIGdldFd4Snd0LFxuICBzZXRXeEp3dCxcbiAgZ2V0V3hWdEp3dCxcbiAgc2V0V3hWdEp3dCxcbiAgcmVtb3ZlV3hKd3QsXG4gIHNldFNnbWFpbixcbiAgZ2V0U2dtYWluLFxuICBzZXRMaWJpbmZvLFxuICBzZXRXeFVzZXJJbmZvLFxuICBnZXRXeFVzZXJJbmZvLFxuICBoYXNMb2dpbixcbiAgc2V0VWtleSxcbiAgZ2V0VWtleSxcbiAgZ2V0Q2l0eUxpc3QsXG4gIGRhdGFDb252ZXJ0LFxuICBjaGFuZ2VMaWJjb2RlLFxuICBnZXRCb3Jyb3dFcnJvckluZm8sXG4gIHJlbW92ZUJvcnJvd0Vycm9ySW5mbyxcbiAgZ2V0QXV0aFNldHRpbmcsXG4gIGlzUGhvbmVBdmFpbGFibGUsXG4gIHNldExvY2Fsc3RvcmFnZSxcbiAgZ2V0TG9jYWxzdG9yYWdlLFxuICBzdHJpbmdGb3JtYXRlLFxuICBzZXRDdXJyZW50RGF0ZSxcbiAgZ2V0Q3VycmVudERhdGVcbn07XG4iXX0=