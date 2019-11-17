var _network = require("./network/index.js");

var _network2 = _interopRequireDefault(_network);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var apiApp = "https://www.jieshu.me/cloudils";

// const apiApp = 'https://devb.jieshu.me/cloudils';
//const webApp = 'https://alipay.jieshu.me/minia';
var ypApiApp = "https://o2o.yplib.org.cn";

//const ak = 'dybskepTHouZLMEv444pX4mG';
var ak = "ZKRnVBaoe68TQlHlzTrcdFzR2SsqF1Ga";

//定位城市
var loadCity = function loadCity(longitude, latitude) {
    return _network2.default.get("https://api.map.baidu.com/geocoder/v2/?ak=" + ak + "&location=" + latitude + "," + longitude + "&output=json", {});
};

var getCommonConfig = function getCommonConfig(params) {
    return _network2.default.get(apiApp + "/api/jieshu/accessOpen/getCommonConfigByChannelAndLibcode", params);
};

//获取图书馆列表
var getRegionAndLib = function getRegionAndLib(params) {
    return _network2.default.get(apiApp + "/api/library/accessOpen/getRegionAndLib", params);
};

// 分类
var getCategoryList = function getCategoryList() {
    return _network2.default.get(apiApp + "/api/category/list", {});
};

//搜索
var getHotWords = function getHotWords() {
    return _network2.default.get(apiApp + "/api/social/hotword", {});
};

// 授权
var onWxLogin = function onWxLogin(params) {
    return _network2.default.post(apiApp + "/wexin/accessOpen/onWxLogin", params);
};

//自动登录
var autoLogin = function autoLogin(params) {
    return _network2.default.post(apiApp + "/api/thirdPartBind/autoLogin", params);
};

//选择图书馆
var setLibcodeUserChoosed = function setLibcodeUserChoosed(params) {
    return _network2.default.post(apiApp + "/api/thirdPartBind/setLibcodeUserChoosed", params);
};

//轮播图
var getSliders = function getSliders(params) {
    return _network2.default.post(apiApp + "/api/showbook/getSliders", params);
};

//查看是否有优惠券
var getPopup = function getPopup(params) {
    return _network2.default.post(apiApp + "/api/jieshu/accessOpen/getPopup", params);
};

//查看是否领券
var canGetCouponByBatchNo = function canGetCouponByBatchNo(params) {
    return _network2.default.post(apiApp + "/api/coupon/canGetCouponByBatchNo", params);
};

//领券接口
var getCoupon = function getCoupon(params) {
    return _network2.default.post(apiApp + "/api/coupon/accessOpen/getCoupon", params);
};

//兑换优惠券
var getCouponByCouponNo = function getCouponByCouponNo(params) {
    return _network2.default.post(apiApp + "/api/coupon/accessOpen/getCouponByCouponNo", params);
};

//新书推荐，猜你喜欢
var getBlType = function getBlType(params) {
    return _network2.default.post(apiApp + "/api/category/accessOpen/getBlType", params);
};

//更多图书
var getBooks = function getBooks(url, method, params, vtjwt) {
    if (method == "GET") {
        return _network2.default.get(apiApp + url, params);
    } else {
        if (vtjwt) {
            return _network2.default.post(apiApp + url, params, vtjwt);
        } else {
            return _network2.default.post(apiApp + url, params);
        }
    }
};

//首页书单
var getJianshuShelf = function getJianshuShelf(type) {
    return _network2.default.post(apiApp + "/api/showbook/accessOpen/getJianshuShelf?type=" + type, {});
};

//全部书单
var jianshuShelfList = function jianshuShelfList(params) {
    return _network2.default.post(apiApp + "/api/jianshuShelf/accessOpen/list", params);
};

//绑卡第一步
var doLoginCommon = function doLoginCommon(params) {
    return _network2.default.post(apiApp + "/api/user/authentication/login", params);
};

//绑卡
var saveBind = function saveBind(params, jwt) {
    return _network2.default.post(apiApp + "/api/thirdPartBind/saveBind", params, jwt);
};

//更新手机号
var mobileupdate = function mobileupdate(params) {
    return _network2.default.post(apiApp + "/api/users/mobileupdate", params);
};

//更新地址
var saveEmbedAddrWhenBind = function saveEmbedAddrWhenBind(params) {
    return _network2.default.post(apiApp + "/alipay/minia/saveEmbedAddrWhenBind", params);
};

//查询卡
var getBindList = function getBindList(params) {
    return _network2.default.post(apiApp + "/api/thirdPartBind/getBindList", params);
};

var getEncryptPwd = function getEncryptPwd(params) {
    return _network2.default.post(apiApp + "/api/thirdPartBind/accessOpen/getEncryptPwd", params);
};

//解绑
var unbind = function unbind(params) {
    return _network2.default.post(apiApp + "/api/thirdPartBind/unbind", params);
};

//退出
var logout = function logout(params, jwt) {
    return _network2.default.post(apiApp + "/api/logout", params, jwt);
};

//借书架
var getBorrowCartList = function getBorrowCartList(params) {
    return _network2.default.post(apiApp + "/api/borrowcartitem/list", params);
};

//移除借书架
var deleteBorrowCart = function deleteBorrowCart(params) {
    return _network2.default.post(apiApp + "/api/borrowcartitem/delete", params);
};

var getSystemConfig = function getSystemConfig(params) {
    return _network2.default.post(apiApp + "/api/systemConfig/getSystemConfigMinia", params);
};

//获取新消息总数
var getSpecialCounts = function getSpecialCounts(params) {
    return _network2.default.get(apiApp + "/api/personal/getSpecialCounts/" + params.userId, {});
};

//vip卡接口
var checkVip = function checkVip(params) {
    return _network2.default.post(apiApp + "/vipCard/accessOpen/CheckVip", {});
};

//获取消息列表
var getMessage = function getMessage(params) {
    return _network2.default.post(apiApp + "/api/notification/listbyindex", params);
};

//阅读书
var readMessage = function readMessage(params) {
    return _network2.default.post(apiApp + "/api/notification/readed/" + params.id, {});
};

// 获取图书详情
var getBookDetail = function getBookDetail(params) {
    return _network2.default.post(apiApp + "/api/GlobalBookDetail/getBookInfo?type=" + params.bookid, params);
};

// 获取豆瓣简介
var getDoubanSummary = function getDoubanSummary(params) {
    return _network2.default.get("https://alipay.jieshu.me/jieshu/getDoubanSummary?isbn=" + params.isbn, {});
};

// 获取图书列表数量
var getBookListCount = function getBookListCount(isbn) {
    return _network2.default.get(apiApp + "/api/jianshuShelf/accessOpen/getShelfListByBook/" + isbn, {});
};

// 查询该图书可借册数
var getCanBorrowCount = function getCanBorrowCount(params) {
    return _network2.default.post(apiApp + "/api/books/GlobalLibinfo", params);
};

// 判断是否收藏
var judgeCollection = function judgeCollection(params, jwt) {
    return _network2.default.post(apiApp + "/api/praise/bookPraiseInfo", params, jwt);
};

// 收藏图书
var praiseBook = function praiseBook(params, jwt) {
    return _network2.default.post(apiApp + "/api/praise/praiseBook", params, jwt);
};

// 搜索图书列表
var searchBookList = function searchBookList(params) {
    return _network2.default.post(apiApp + "/api/search/serachBookList", params);
};

// 加入借书架
var addBookShelf = function addBookShelf(params) {
    return _network2.default.post(apiApp + "/api/borrowcartitem/add", params);
};

// 购物车书的数量
var getBookShelfCount = function getBookShelfCount() {
    return _network2.default.get(apiApp + "/api/borrowcartitem/count", {});
};

//自助取书点
var pickaddressList = function pickaddressList() {
    return _network2.default.post(apiApp + "/api/personal/pickaddressList", {});
};

//送书上门
var bookToHome = function bookToHome(params, userId) {
    return _network2.default.get(apiApp + "/api/bookToHome/addressLst/" + userId, params);
};

//更改默认地址自助点
var pickaddress = function pickaddress(params) {
    return _network2.default.post(apiApp + "/api/users/pickaddress/update", params);
};

//更改默认地点送书上门
var setAutoAddressType = function setAutoAddressType(userId, appartmentId) {
    return _network2.default.get(apiApp + "/api/bookToHome/addressSetDefault/" + userId + "/" + appartmentId + "?asDefaultDelivertype=T&");
};

//删除送书上门地址
var addressDelete = function addressDelete(userId, params) {
    return _network2.default.post(apiApp + "/api/bookToHome/addressDelete/" + userId, params);
};

//添加地址
var addressAdd = function addressAdd(userId, params) {
    return _network2.default.post(apiApp + "/api/bookToHome/addressAdd/" + userId, params);
};

//编辑地址
var addressUpdate = function addressUpdate(userId, params) {
    return _network2.default.post(apiApp + "/api/bookToHome/addressModify/" + userId, params);
};

//发送短信验证码
var sendSmsVerifyCode = function sendSmsVerifyCode(params) {
    return _network2.default.post(apiApp + "/api/sendSmsVerifyCode", params);
};

//验证码校验
var verifySmsCode = function verifySmsCode(params) {
    return _network2.default.post(apiApp + "/verifySmsCode", params);
};

//更改手机号
var updateMobile = function updateMobile(params) {
    return _network2.default.post(apiApp + "/api/users/mobileupdate", params);
};

//获取送书上门的默认地址
var getDefaultAddress = function getDefaultAddress(rad) {
    return _network2.default.get(apiApp + "/api/bookToHome/getDefaultAddress?rad=" + rad, {});
};

//自取馆结算
var borrowDirectly = function borrowDirectly(params) {
    return _network2.default.post(apiApp + "/api/borrowcartitem/borrowDirectly", params);
};

//获取当前借阅列表
var getCurrentBorrowList = function getCurrentBorrowList(cardNumber, libcode) {
    return _network2.default.get(apiApp + "/api/mmlib/global/myborrow2/" + cardNumber + "?libcode=" + libcode + "&rand=" + Math.random(), {});
};

var getAllBorrowHistory = function getAllBorrowHistory(start, end, params, jwt) {
    return _network2.default.get(apiApp + "/api/mmlib/global/myborrowhistory2/" + jwt + "/" + start + "/" + end, params);
};

//获取卡号
var getCardNum = function getCardNum(params) {
    return _network2.default.post(apiApp + "/api/bonusActivity/getCardNumFresh", params);
};

//获取全部包裹
var getAllPackageInfo = function getAllPackageInfo() {
    return _network2.default.get(apiApp + "/api/order/currentbookorderlist", {});
};

//获取物流信息
var getLogistics = function getLogistics(orderId) {
    return _network2.default.post(apiApp + "/api/order/" + orderId + "/bookOrderLog", {});
};

//查询历史包裹
var getHisPackageInfo = function getHisPackageInfo(params) {
    return _network2.default.post(apiApp + "/api/order/historybookorderlist", params);
};

//获取订单列表
var getOrderList = function getOrderList(params, userId) {
    return _network2.default.post(apiApp + "/api/bookToHome/toHomeBookOrders/" + userId, params);
};

//取消上门取书订单
var cancelOrder = function cancelOrder(userId, orderNo) {
    return _network2.default.get(apiApp + "/api/bookToHome/cancelToHomeBooks/" + userId + "/" + orderNo);
};

//取消当前借阅
var cancelBorrow = function cancelBorrow(itemId) {
    return _network2.default.post(apiApp + "/api/order/GlobalCancelBorrow/real/" + itemId, {});
};

//生成送书上门订单
var updateToHomeBooks = function updateToHomeBooks(params) {
    return _network2.default.post(apiApp + "/api/bookToHome/updateToHomeBooks", params);
};

//获取送书上门支付信息
var getPayInfo = function getPayInfo(params) {
    return _network2.default.post(apiApp + "/api/accessOpen/wx/getPayInfo", params);
};

//获取书单详情
var getShelfInfo = function getShelfInfo(shelfId) {
    return _network2.default.get(apiApp + "/api/jianshuShelf/accessOpen/getShelfInfo/" + shelfId, {});
};

//根据书单id获取图书列表
var bookListById = function bookListById(shelfId) {
    return _network2.default.get(apiApp + "/api/jianshuShelf/accessOpen/books/" + shelfId, {});
};

//书单收藏
var shelfFav = function shelfFav(shelfId, bindId) {
    return _network2.default.get(apiApp + "/api/jianshuShelf/accessOpen/fav/" + shelfId + "/" + bindId + "?r=" + Math.random(), {});
};

//书单获取是否收藏
var shelfIsFav = function shelfIsFav(shelfId, bindId) {
    return _network2.default.get(apiApp + "/api/jianshuShelf/accessOpen/isFav/" + shelfId + "/" + bindId, {});
};

//获取优惠券列表
var getAllCoupons = function getAllCoupons(params) {
    return _network2.default.get(apiApp + "/api/coupon/myAllCoupons", params);
};

//获取送书上门的优惠券
var getUsableSendToHomeCoupons = function getUsableSendToHomeCoupons() {
    return _network2.default.get(apiApp + "/api/coupon/getUsableSendToHomeCoupons?r=" + Math.random(), {});
};

var getUsableFetchFromHomeCoupons = function getUsableFetchFromHomeCoupons(price) {
    return _network2.default.get(apiApp + "/api/coupon/getUsableFetchFromHomeCoupons?price=" + price + "&r=" + Math.random(), {});
};

var canGetSendtohomeCoupon = function canGetSendtohomeCoupon() {
    return _network2.default.get(apiApp + "/api/coupon/canGetSendtohomeCoupon", {});
};

//判断借书是否免费
var isFree = function isFree(type, userType) {
    return _network2.default.get(apiApp + "/api/borrowcartitem/isFree?type=" + type + "&readType=" + userType, {});
};

//验证优惠券是否有效
var canUseDirectly = function canUseDirectly(params) {
    return _network2.default.post(apiApp + "/api/coupon/canUseDirectly", params);
};

//收藏的书单列表
var getFavList = function getFavList(params, jwt) {
    return _network2.default.post(apiApp + "/api/jianshuShelf/accessOpen/favList", params, jwt);
};

//欠费记录
var mydebt = function mydebt(cardNumber) {
    return _network2.default.get(apiApp + "/api/mmlib/mydebt/info/" + cardNumber, {});
};

//速递柜列表
var getPickaddressList = function getPickaddressList(params) {
    return _network2.default.post(apiApp + "/api/personal/pickaddressList", params);
};

//查看小蜜蜂列表
var getAllWjdS = function getAllWjdS(params) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/getAllWjdS", params);
};

var readerResv = function readerResv(params) {
    return _network2.default.post(apiApp + "/api/sposter/readerResv", params);
};

var getMaxFetchCount = function getMaxFetchCount(params) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/getMaxFetchCount", params);
};

//是否能够上门取书
var canFetchBooks = function canFetchBooks() {
    return _network2.default.get(apiApp + "/api/fetchBookOrder/canFetchBooks", {});
};

//获取预约历史-上门取书
var emsResvListByUser = function emsResvListByUser(parmas) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/emsResvListByUser", parmas);
};

var getFetchBookEms = function getFetchBookEms(parmas) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/getFetchBookEms", parmas);
};

var getreaderResv = function getreaderResv(parmas) {
    return _network2.default.post(apiApp + "/api/sposter/getreaderResv", parmas);
};

//速递柜当前预约信息
var readerCurrentResv = function readerCurrentResv() {
    return _network2.default.get(apiApp + "/api/sposter/readerCurrentResv", {});
};

var readerCancelResv = function readerCancelResv() {
    return _network2.default.get(apiApp + "/api/sposter/readerCancelResv", {});
};

//获取预约历史-速递柜
var readerHistoryResv = function readerHistoryResv(pageIndex, pageNum) {
    return _network2.default.get(apiApp + "/api/sposter/readerHistoryResv?pageIndex=" + pageIndex + "&pageNum=" + pageNum, {});
};

var readerHistoryResvNew = function readerHistoryResvNew(pageIndex, pageNum) {
    return _network2.default.get(apiApp + "/api/sposter/readerHistoryResvNew?pageIndex=" + pageIndex + "&pageNum=" + pageNum, {});
};

//预约上门取书
var expressNotifyInlandWaybillGot = function expressNotifyInlandWaybillGot(params) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/expressNotifyInlandWaybillGot", params);
};

//续借
var renewbook = function renewbook(params) {
    return _network2.default.post(apiApp + "/api/mmlib/renewbook", params);
};

//取消欠款
var cancelDebt = function cancelDebt(params, cardNumber) {
    return _network2.default.post(apiApp + "/api/mmlib/mydebt/cancel/" + cardNumber, params);
};

//是否可以支付欠费
var isAbleToPayDebt = function isAbleToPayDebt() {
    return _network2.default.get(apiApp + "/api/thirdPartBind/isAbleToPayDebt", {});
};

//杭州快递上门
var addOrder = function addOrder(params) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/addOrder", params);
};

//上门取书的点击接口
var getBookDoorToDoor = function getBookDoorToDoor(params) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/listByUser", params);
};

//取消上门取书预约
var cancelReturnOrder = function cancelReturnOrder(params) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/cancelOrder", params);
};

//在线办卡
var submitForm = function submitForm(params) {
    return _network2.default.post(apiApp + "/api/registeOnline/submitForm", params);
};

//在线退卡第一步
var searchBoxCount = function searchBoxCount(params) {
    return _network2.default.post(apiApp + "/api/packingStatement/searchBoxCount", params);
};

//在线退卡第二步
var discardCheck = function discardCheck() {
    return _network2.default.post(apiApp + "/api/registeOnline/discardCheck", {});
};

//在线退卡第三步
var discardOnline = function discardOnline(params) {
    return _network2.default.post(apiApp + "/api/registeOnline/discardOnline", params);
};

//获取书单图书数量显示
var getBookCountConfig = function getBookCountConfig(params, shelfId) {
    return _network2.default.post(apiApp + "/api/jianshuShelf/accessOpen/clk/" + shelfId, params);
};

//根据分类查询图书列表
var searchNewClassNo = function searchNewClassNo(params) {
    return _network2.default.post(apiApp + "/api/categoryMapping/searchNewClassNo", params);
};

//好书盛宴ypApiApp
var ypGoodBookList = function ypGoodBookList(params) {
    return _network2.default.post(ypApiApp + "/ChooseBuy/choosebuy/api/book/bookList", params);
};

//海南三亚图书馆防止重复提交
var yuYueRepeatSubmit = function yuYueRepeatSubmit(params, jwt) {
    return _network2.default.post(apiApp + "/api/fetchBookOrder/checkFetchBookOrderEms", {}, jwt);
};

//湖南图书馆小程序跳转借书小程序绑卡
var bindCardFromMinia = function bindCardFromMinia(params) {
    return _network2.default.post(apiApp + "/weminia/accessOpen/createCardForMinia", params);
};

//地推根据志愿者id查询馆代码
var getLibInfoByVolunteerId = function getLibInfoByVolunteerId(params) {
    return _network2.default.post(apiApp + "/busDevelop/accessOpen/getVolunteerInfo", params);
};

//扫码借书
var scanBorrow = function scanBorrow(params) {
    return _network2.default.post(apiApp + "/api/offlineBorrow/getResultOfflineBorrowNoSubLib", params);
};

//寄语活动发布
var uploadLibraryActivity = function uploadLibraryActivity(params) {
    return _network2.default.post(apiApp + "/api/libraryActivity/uploadWork", params);
};

//寄语作品列表
var getWorkList = function getWorkList(params) {
    return _network2.default.post(apiApp + "/api/libraryActivity/accessOpen/getWorkList", params);
};

//寄语作品详情
var getWorkDetail = function getWorkDetail(params) {
    return _network2.default.post(apiApp + "/api/libraryActivity/accessOpen//workDetail", params);
};

//活动投票、收藏、分享
var libraryActivityVote = function libraryActivityVote(params) {
    return _network2.default.post(apiApp + "/api/libraryActivity/vote", params);
};

//荐书
var uploadRecommnedBook = function uploadRecommnedBook(params) {
    return _network2.default.post(apiApp + "/api/recommend/upload/bookinfo", params);
};

//我的荐书列表
var getRecommendBooks = function getRecommendBooks(params) {
    return _network2.default.post(apiApp + "/api/recommend/getRecommendBooks", params);
};

//当前取书点
var getPickAddr = function getPickAddr(params) {
    return _network2.default.post(apiApp + "/api/personal/getPickaddressByCode", params);
};

//全年借书量
var getMyBookCount = function getMyBookCount() {
    return _network2.default.post(apiApp + "/api/borrowCount/myBorrowCount", {});
};

//判断领奖资格
var getCanPrize = function getCanPrize() {
    return _network2.default.post(apiApp + "/api/borrowCount/isCanGetPrize", {});
};

//领奖保存联系方式
var savePhone = function savePhone(params) {
    return _network2.default.post(apiApp + "/api/borrowCount/savePhone", params);
};

//爆仓保存用户数据
var getAddUser = function getAddUser(params) {
    return _network2.default.post(apiApp + "/api/autoBox/package/addUser", params);
};

var config = {
    apiApp: apiApp,
    loadCity: loadCity,
    getCategoryList: getCategoryList,
    getHotWords: getHotWords,
    getCommonConfig: getCommonConfig,
    onWxLogin: onWxLogin,
    autoLogin: autoLogin,
    setLibcodeUserChoosed: setLibcodeUserChoosed,
    getSliders: getSliders,
    getBlType: getBlType,
    getBooks: getBooks,
    getRegionAndLib: getRegionAndLib,
    getJianshuShelf: getJianshuShelf,
    jianshuShelfList: jianshuShelfList,
    doLoginCommon: doLoginCommon,
    saveBind: saveBind,
    mobileupdate: mobileupdate,
    saveEmbedAddrWhenBind: saveEmbedAddrWhenBind,
    getBindList: getBindList,
    getEncryptPwd: getEncryptPwd,
    unbind: unbind,
    logout: logout,
    getBorrowCartList: getBorrowCartList,
    getSystemConfig: getSystemConfig,
    getSpecialCounts: getSpecialCounts,
    checkVip: checkVip,
    getMessage: getMessage,
    readMessage: readMessage,
    deleteBorrowCart: deleteBorrowCart,
    getBookDetail: getBookDetail,
    getDoubanSummary: getDoubanSummary,
    getBookListCount: getBookListCount,
    getCanBorrowCount: getCanBorrowCount,
    judgeCollection: judgeCollection,
    praiseBook: praiseBook,
    searchBookList: searchBookList,
    addBookShelf: addBookShelf,
    getBookShelfCount: getBookShelfCount,
    pickaddressList: pickaddressList,
    bookToHome: bookToHome,
    pickaddress: pickaddress,
    setAutoAddressType: setAutoAddressType,
    addressDelete: addressDelete,
    addressAdd: addressAdd,
    addressUpdate: addressUpdate,
    sendSmsVerifyCode: sendSmsVerifyCode,
    verifySmsCode: verifySmsCode,
    updateMobile: updateMobile,
    getDefaultAddress: getDefaultAddress,
    borrowDirectly: borrowDirectly,
    getCurrentBorrowList: getCurrentBorrowList,
    getAllBorrowHistory: getAllBorrowHistory,
    getCardNum: getCardNum,
    getAllPackageInfo: getAllPackageInfo,
    getLogistics: getLogistics,
    getHisPackageInfo: getHisPackageInfo,
    getOrderList: getOrderList,
    cancelOrder: cancelOrder,
    cancelBorrow: cancelBorrow,
    updateToHomeBooks: updateToHomeBooks,
    getPayInfo: getPayInfo,
    getShelfInfo: getShelfInfo,
    bookListById: bookListById,
    shelfFav: shelfFav,
    shelfIsFav: shelfIsFav,
    getAllCoupons: getAllCoupons,
    getUsableSendToHomeCoupons: getUsableSendToHomeCoupons,
    getUsableFetchFromHomeCoupons: getUsableFetchFromHomeCoupons,
    canGetSendtohomeCoupon: canGetSendtohomeCoupon,
    isFree: isFree,
    canUseDirectly: canUseDirectly,
    getFavList: getFavList,
    mydebt: mydebt,
    getPickaddressList: getPickaddressList,
    getAllWjdS: getAllWjdS,
    readerResv: readerResv,
    getMaxFetchCount: getMaxFetchCount,
    canFetchBooks: canFetchBooks,
    emsResvListByUser: emsResvListByUser,
    getFetchBookEms: getFetchBookEms,
    getreaderResv: getreaderResv,
    readerCurrentResv: readerCurrentResv,
    readerCancelResv: readerCancelResv,
    readerHistoryResv: readerHistoryResv,
    readerHistoryResvNew: readerHistoryResvNew,
    expressNotifyInlandWaybillGot: expressNotifyInlandWaybillGot,
    renewbook: renewbook,
    cancelDebt: cancelDebt,
    isAbleToPayDebt: isAbleToPayDebt,
    addOrder: addOrder,
    getBookDoorToDoor: getBookDoorToDoor,
    cancelReturnOrder: cancelReturnOrder,
    getPopup: getPopup,
    canGetCouponByBatchNo: canGetCouponByBatchNo,
    getCoupon: getCoupon,
    getCouponByCouponNo: getCouponByCouponNo,
    submitForm: submitForm,
    searchBoxCount: searchBoxCount,
    discardCheck: discardCheck,
    discardOnline: discardOnline,
    getBookCountConfig: getBookCountConfig,
    searchNewClassNo: searchNewClassNo,
    ypGoodBookList: ypGoodBookList,
    yuYueRepeatSubmit: yuYueRepeatSubmit,
    bindCardFromMinia: bindCardFromMinia,
    getLibInfoByVolunteerId: getLibInfoByVolunteerId,
    scanBorrow: scanBorrow,
    uploadLibraryActivity: uploadLibraryActivity,
    getWorkList: getWorkList,
    getWorkDetail: getWorkDetail,
    libraryActivityVote: libraryActivityVote,
    uploadRecommnedBook: uploadRecommnedBook,
    getRecommendBooks: getRecommendBooks,
    getPickAddr: getPickAddr,
    getMyBookCount: getMyBookCount,
    getCanPrize: getCanPrize,
    savePhone: savePhone,
    getAddUser: getAddUser
};

module.exports = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJhcGlBcHAiLCJ5cEFwaUFwcCIsImFrIiwibG9hZENpdHkiLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInJlcSIsImdldCIsImdldENvbW1vbkNvbmZpZyIsInBhcmFtcyIsImdldFJlZ2lvbkFuZExpYiIsImdldENhdGVnb3J5TGlzdCIsImdldEhvdFdvcmRzIiwib25XeExvZ2luIiwicG9zdCIsImF1dG9Mb2dpbiIsInNldExpYmNvZGVVc2VyQ2hvb3NlZCIsImdldFNsaWRlcnMiLCJnZXRQb3B1cCIsImNhbkdldENvdXBvbkJ5QmF0Y2hObyIsImdldENvdXBvbiIsImdldENvdXBvbkJ5Q291cG9uTm8iLCJnZXRCbFR5cGUiLCJnZXRCb29rcyIsInVybCIsIm1ldGhvZCIsInZ0and0IiwiZ2V0SmlhbnNodVNoZWxmIiwidHlwZSIsImppYW5zaHVTaGVsZkxpc3QiLCJkb0xvZ2luQ29tbW9uIiwic2F2ZUJpbmQiLCJqd3QiLCJtb2JpbGV1cGRhdGUiLCJzYXZlRW1iZWRBZGRyV2hlbkJpbmQiLCJnZXRCaW5kTGlzdCIsImdldEVuY3J5cHRQd2QiLCJ1bmJpbmQiLCJsb2dvdXQiLCJnZXRCb3Jyb3dDYXJ0TGlzdCIsImRlbGV0ZUJvcnJvd0NhcnQiLCJnZXRTeXN0ZW1Db25maWciLCJnZXRTcGVjaWFsQ291bnRzIiwidXNlcklkIiwiY2hlY2tWaXAiLCJnZXRNZXNzYWdlIiwicmVhZE1lc3NhZ2UiLCJpZCIsImdldEJvb2tEZXRhaWwiLCJib29raWQiLCJnZXREb3ViYW5TdW1tYXJ5IiwiaXNibiIsImdldEJvb2tMaXN0Q291bnQiLCJnZXRDYW5Cb3Jyb3dDb3VudCIsImp1ZGdlQ29sbGVjdGlvbiIsInByYWlzZUJvb2siLCJzZWFyY2hCb29rTGlzdCIsImFkZEJvb2tTaGVsZiIsImdldEJvb2tTaGVsZkNvdW50IiwicGlja2FkZHJlc3NMaXN0IiwiYm9va1RvSG9tZSIsInBpY2thZGRyZXNzIiwic2V0QXV0b0FkZHJlc3NUeXBlIiwiYXBwYXJ0bWVudElkIiwiYWRkcmVzc0RlbGV0ZSIsImFkZHJlc3NBZGQiLCJhZGRyZXNzVXBkYXRlIiwic2VuZFNtc1ZlcmlmeUNvZGUiLCJ2ZXJpZnlTbXNDb2RlIiwidXBkYXRlTW9iaWxlIiwiZ2V0RGVmYXVsdEFkZHJlc3MiLCJyYWQiLCJib3Jyb3dEaXJlY3RseSIsImdldEN1cnJlbnRCb3Jyb3dMaXN0IiwiY2FyZE51bWJlciIsImxpYmNvZGUiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QWxsQm9ycm93SGlzdG9yeSIsInN0YXJ0IiwiZW5kIiwiZ2V0Q2FyZE51bSIsImdldEFsbFBhY2thZ2VJbmZvIiwiZ2V0TG9naXN0aWNzIiwib3JkZXJJZCIsImdldEhpc1BhY2thZ2VJbmZvIiwiZ2V0T3JkZXJMaXN0IiwiY2FuY2VsT3JkZXIiLCJvcmRlck5vIiwiY2FuY2VsQm9ycm93IiwiaXRlbUlkIiwidXBkYXRlVG9Ib21lQm9va3MiLCJnZXRQYXlJbmZvIiwiZ2V0U2hlbGZJbmZvIiwic2hlbGZJZCIsImJvb2tMaXN0QnlJZCIsInNoZWxmRmF2IiwiYmluZElkIiwic2hlbGZJc0ZhdiIsImdldEFsbENvdXBvbnMiLCJnZXRVc2FibGVTZW5kVG9Ib21lQ291cG9ucyIsImdldFVzYWJsZUZldGNoRnJvbUhvbWVDb3Vwb25zIiwicHJpY2UiLCJjYW5HZXRTZW5kdG9ob21lQ291cG9uIiwiaXNGcmVlIiwidXNlclR5cGUiLCJjYW5Vc2VEaXJlY3RseSIsImdldEZhdkxpc3QiLCJteWRlYnQiLCJnZXRQaWNrYWRkcmVzc0xpc3QiLCJnZXRBbGxXamRTIiwicmVhZGVyUmVzdiIsImdldE1heEZldGNoQ291bnQiLCJjYW5GZXRjaEJvb2tzIiwiZW1zUmVzdkxpc3RCeVVzZXIiLCJwYXJtYXMiLCJnZXRGZXRjaEJvb2tFbXMiLCJnZXRyZWFkZXJSZXN2IiwicmVhZGVyQ3VycmVudFJlc3YiLCJyZWFkZXJDYW5jZWxSZXN2IiwicmVhZGVySGlzdG9yeVJlc3YiLCJwYWdlSW5kZXgiLCJwYWdlTnVtIiwicmVhZGVySGlzdG9yeVJlc3ZOZXciLCJleHByZXNzTm90aWZ5SW5sYW5kV2F5YmlsbEdvdCIsInJlbmV3Ym9vayIsImNhbmNlbERlYnQiLCJpc0FibGVUb1BheURlYnQiLCJhZGRPcmRlciIsImdldEJvb2tEb29yVG9Eb29yIiwiY2FuY2VsUmV0dXJuT3JkZXIiLCJzdWJtaXRGb3JtIiwic2VhcmNoQm94Q291bnQiLCJkaXNjYXJkQ2hlY2siLCJkaXNjYXJkT25saW5lIiwiZ2V0Qm9va0NvdW50Q29uZmlnIiwic2VhcmNoTmV3Q2xhc3NObyIsInlwR29vZEJvb2tMaXN0IiwieXVZdWVSZXBlYXRTdWJtaXQiLCJiaW5kQ2FyZEZyb21NaW5pYSIsImdldExpYkluZm9CeVZvbHVudGVlcklkIiwic2NhbkJvcnJvdyIsInVwbG9hZExpYnJhcnlBY3Rpdml0eSIsImdldFdvcmtMaXN0IiwiZ2V0V29ya0RldGFpbCIsImxpYnJhcnlBY3Rpdml0eVZvdGUiLCJ1cGxvYWRSZWNvbW1uZWRCb29rIiwiZ2V0UmVjb21tZW5kQm9va3MiLCJnZXRQaWNrQWRkciIsImdldE15Qm9va0NvdW50IiwiZ2V0Q2FuUHJpemUiLCJzYXZlUGhvbmUiLCJnZXRBZGRVc2VyIiwiY29uZmlnIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxnQ0FBZjtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsV0FBVywwQkFBakI7O0FBRUE7O0FBRUEsSUFBTUMsS0FBSyxrQ0FBWDtBQUNBO0FBQ0EsSUFBTUMsV0FBVyxTQUFYQSxRQUFXLENBQUNDLFNBQUQsRUFBWUMsUUFBWjtBQUFBLFNBQXlCQyxrQkFBSUMsR0FBSixDQUFRLCtDQUErQ0wsRUFBL0MsR0FBb0QsWUFBcEQsR0FBbUVHLFFBQW5FLEdBQThFLEdBQTlFLEdBQW9GRCxTQUFwRixHQUFnRyxjQUF4RyxFQUF3SCxFQUF4SCxDQUF6QjtBQUFBLENBQWpCOztBQUVBLElBQU1JLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0Ms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SCxvQkE3RmE7QUE4RmJDLDhDQTlGYTtBQStGYkMsc0JBL0ZhO0FBZ0diQywwQ0FoR2E7QUFpR2I4Ryx3QkFqR2E7QUFrR2JDLGdDQWxHYTtBQW1HYkMsNEJBbkdhO0FBb0diQyw4QkFwR2E7QUFxR2JDLHdDQXJHYTtBQXNHYkMsb0NBdEdhO0FBdUdiQyxnQ0F2R2E7QUF3R2JDLHNDQXhHYTtBQXlHYkMsc0NBekdhO0FBMEdiQyxrREExR2E7QUEyR2JDLHdCQTNHYTtBQTRHYkMsOENBNUdhO0FBNkdiQywwQkE3R2E7QUE4R2JDLDhCQTlHYTtBQStHYkMsMENBL0dhO0FBZ0hiQywwQ0FoSGE7QUFpSGJDLHNDQWpIYTtBQWtIYkMsMEJBbEhhO0FBbUhiQyxnQ0FuSGE7QUFvSGJDLDBCQXBIYTtBQXFIYkMsc0JBckhhO0FBc0hiQztBQXRIYSxDQUFmOztBQXlIQUUsT0FBT0MsT0FBUCxHQUFpQkYsTUFBakIiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcSBmcm9tICdAL25ldHdvcmsnO1xuXG5jb25zdCBhcGlBcHAgPSAnaHR0cHM6Ly93d3cuamllc2h1Lm1lL2Nsb3VkaWxzJztcbi8vIGNvbnN0IGFwaUFwcCA9ICdodHRwczovL2RldmIuamllc2h1Lm1lL2Nsb3VkaWxzJztcbi8vY29uc3Qgd2ViQXBwID0gJ2h0dHBzOi8vYWxpcGF5LmppZXNodS5tZS9taW5pYSc7XG5cbmNvbnN0IHlwQXBpQXBwID0gJ2h0dHBzOi8vbzJvLnlwbGliLm9yZy5jbic7XG5cbi8vY29uc3QgYWsgPSAnZHlic2tlcFRIb3VaTE1FdjQ0NHBYNG1HJztcblxuY29uc3QgYWsgPSAnWktSblZCYW9lNjhUUWxIbHpUcmNkRnpSMlNzcUYxR2EnO1xuLy/lrprkvY3ln47luIJcbmNvbnN0IGxvYWRDaXR5ID0gKGxvbmdpdHVkZSwgbGF0aXR1ZGUpID0+IHJlcS5nZXQoJ2h0dHBzOi8vYXBpLm1hcC5iYWlkdS5jb20vZ2VvY29kZXIvdjIvP2FrPScgKyBhayArICcmbG9jYXRpb249JyArIGxhdGl0dWRlICsgJywnICsgbG9uZ2l0dWRlICsgJyZvdXRwdXQ9anNvbicsIHt9KTtcblxuY29uc3QgZ2V0Q29tbW9uQ29uZmlnID0gKHBhcmFtcykgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9qaWVzaHUvYWNjZXNzT3Blbi9nZXRDb21tb25Db25maWdCeUNoYW5uZWxBbmRMaWJjb2RlJywgcGFyYW1zKTtcblxuLy/ojrflj5blm77kuabppobliJfooahcbmNvbnN0IGdldFJlZ2lvbkFuZExpYiA9IChwYXJhbXMpID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvbGlicmFyeS9hY2Nlc3NPcGVuL2dldFJlZ2lvbkFuZExpYicsIHBhcmFtcyk7XG5cbi8vIOWIhuexu1xuY29uc3QgZ2V0Q2F0ZWdvcnlMaXN0ID0gKCkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9jYXRlZ29yeS9saXN0Jywge30pO1xuXG4vL+aQnOe0olxuY29uc3QgZ2V0SG90V29yZHMgPSAoKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL3NvY2lhbC9ob3R3b3JkJywge30pO1xuXG4vLyDmjojmnYNcbmNvbnN0IG9uV3hMb2dpbiA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvd2V4aW4vYWNjZXNzT3Blbi9vbld4TG9naW4nLCBwYXJhbXMpO1xuXG4vL+iHquWKqOeZu+W9lVxuY29uc3QgYXV0b0xvZ2luID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvdGhpcmRQYXJ0QmluZC9hdXRvTG9naW4nLCBwYXJhbXMpO1xuXG4vL+mAieaLqeWbvuS5pummhlxuY29uc3Qgc2V0TGliY29kZVVzZXJDaG9vc2VkID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvdGhpcmRQYXJ0QmluZC9zZXRMaWJjb2RlVXNlckNob29zZWQnLCBwYXJhbXMpO1xuXG4vL+i9ruaSreWbvlxuY29uc3QgZ2V0U2xpZGVycyA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3Nob3dib29rL2dldFNsaWRlcnMnLCBwYXJhbXMpO1xuXG4vL+afpeeci+aYr+WQpuacieS8mOaDoOWIuFxuY29uc3QgZ2V0UG9wdXAgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9qaWVzaHUvYWNjZXNzT3Blbi9nZXRQb3B1cCcsIHBhcmFtcyk7XG5cbi8v5p+l55yL5piv5ZCm6aKG5Yi4XG5jb25zdCBjYW5HZXRDb3Vwb25CeUJhdGNoTm8gPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9jb3Vwb24vY2FuR2V0Q291cG9uQnlCYXRjaE5vJywgcGFyYW1zKTtcblxuLy/poobliLjmjqXlj6NcbmNvbnN0IGdldENvdXBvbiA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2NvdXBvbi9hY2Nlc3NPcGVuL2dldENvdXBvbicsIHBhcmFtcyk7XG5cbi8v5YWR5o2i5LyY5oOg5Yi4XG5jb25zdCBnZXRDb3Vwb25CeUNvdXBvbk5vID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvY291cG9uL2FjY2Vzc09wZW4vZ2V0Q291cG9uQnlDb3Vwb25ObycsIHBhcmFtcyk7XG5cbi8v5paw5Lmm5o6o6I2Q77yM54yc5L2g5Zac5qyiXG5jb25zdCBnZXRCbFR5cGUgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9jYXRlZ29yeS9hY2Nlc3NPcGVuL2dldEJsVHlwZScsIHBhcmFtcyk7XG5cbi8v5pu05aSa5Zu+5LmmXG5jb25zdCBnZXRCb29rcyA9ICh1cmwsIG1ldGhvZCwgcGFyYW1zLHZ0and0KSA9PiB7XG4gIGlmIChtZXRob2QgPT0gJ0dFVCcpIHtcbiAgICByZXR1cm4gcmVxLmdldChhcGlBcHAgKyB1cmwsIHBhcmFtcylcbiAgfWVsc2V7XG4gICAgaWYodnRqd3Qpe1xuICAgICAgcmV0dXJuIHJlcS5wb3N0KGFwaUFwcCArIHVybCwgcGFyYW1zLHZ0and0KTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiByZXEucG9zdChhcGlBcHAgKyB1cmwsIHBhcmFtcyk7XG4gICAgfVxuICB9XG59XG5cbi8v6aaW6aG15Lmm5Y2VXG5jb25zdCBnZXRKaWFuc2h1U2hlbGYgPSAodHlwZSkgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvc2hvd2Jvb2svYWNjZXNzT3Blbi9nZXRKaWFuc2h1U2hlbGY/dHlwZT0nICsgdHlwZSwge30pO1xuXG4vL+WFqOmDqOS5puWNlVxuY29uc3QgamlhbnNodVNoZWxmTGlzdCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2ppYW5zaHVTaGVsZi9hY2Nlc3NPcGVuL2xpc3QnLCBwYXJhbXMpO1xuXG4vL+e7keWNoeesrOS4gOatpVxuY29uc3QgZG9Mb2dpbkNvbW1vbiA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3VzZXIvYXV0aGVudGljYXRpb24vbG9naW4nLCBwYXJhbXMpO1xuXG4vL+e7keWNoVxuY29uc3Qgc2F2ZUJpbmQgPSAocGFyYW1zLCBqd3QpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3RoaXJkUGFydEJpbmQvc2F2ZUJpbmQnLCBwYXJhbXMsIGp3dCk7XG5cbi8v5pu05paw5omL5py65Y+3XG5jb25zdCBtb2JpbGV1cGRhdGUgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS91c2Vycy9tb2JpbGV1cGRhdGUnLHBhcmFtcyk7XG5cbi8v5pu05paw5Zyw5Z2AXG5jb25zdCBzYXZlRW1iZWRBZGRyV2hlbkJpbmQgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FsaXBheS9taW5pYS9zYXZlRW1iZWRBZGRyV2hlbkJpbmQnLCBwYXJhbXMpO1xuXG4vL+afpeivouWNoVxuY29uc3QgZ2V0QmluZExpc3QgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS90aGlyZFBhcnRCaW5kL2dldEJpbmRMaXN0JywgcGFyYW1zKTtcblxuY29uc3QgZ2V0RW5jcnlwdFB3ZCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3RoaXJkUGFydEJpbmQvYWNjZXNzT3Blbi9nZXRFbmNyeXB0UHdkJywgcGFyYW1zKTtcblxuLy/op6Pnu5FcbmNvbnN0IHVuYmluZCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3RoaXJkUGFydEJpbmQvdW5iaW5kJywgcGFyYW1zKTtcblxuLy/pgIDlh7pcbmNvbnN0IGxvZ291dCA9IChwYXJhbXMsIGp3dCkgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvbG9nb3V0JywgcGFyYW1zLCBqd3QpO1xuXG4vL+WAn+S5puaetlxuY29uc3QgZ2V0Qm9ycm93Q2FydExpc3QgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9ib3Jyb3djYXJ0aXRlbS9saXN0JywgcGFyYW1zKTtcblxuLy/np7vpmaTlgJ/kuabmnrZcbmNvbnN0IGRlbGV0ZUJvcnJvd0NhcnQgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9ib3Jyb3djYXJ0aXRlbS9kZWxldGUnLCBwYXJhbXMpO1xuXG5jb25zdCBnZXRTeXN0ZW1Db25maWcgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9zeXN0ZW1Db25maWcvZ2V0U3lzdGVtQ29uZmlnTWluaWEnLCBwYXJhbXMpO1xuXG4vL+iOt+WPluaWsOa2iOaBr+aAu+aVsFxuY29uc3QgZ2V0U3BlY2lhbENvdW50cyA9IChwYXJhbXMpID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvcGVyc29uYWwvZ2V0U3BlY2lhbENvdW50cy8nICsgcGFyYW1zLnVzZXJJZCwge30pXG5cbi8vdmlw5Y2h5o6l5Y+jXG5jb25zdCBjaGVja1ZpcCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvdmlwQ2FyZC9hY2Nlc3NPcGVuL0NoZWNrVmlwJywge30pXG5cbi8v6I635Y+W5raI5oGv5YiX6KGoXG5jb25zdCBnZXRNZXNzYWdlID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvbm90aWZpY2F0aW9uL2xpc3RieWluZGV4JywgcGFyYW1zKTtcblxuLy/pmIXor7vkuaZcbmNvbnN0IHJlYWRNZXNzYWdlID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvbm90aWZpY2F0aW9uL3JlYWRlZC8nICsgcGFyYW1zLmlkLCB7fSk7XG5cbi8vIOiOt+WPluWbvuS5puivpuaDhVxuY29uc3QgZ2V0Qm9va0RldGFpbCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL0dsb2JhbEJvb2tEZXRhaWwvZ2V0Qm9va0luZm8/dHlwZT0nICsgcGFyYW1zLmJvb2tpZCwgcGFyYW1zKTtcblxuLy8g6I635Y+W6LGG55Oj566A5LuLXG5jb25zdCBnZXREb3ViYW5TdW1tYXJ5ID0gKHBhcmFtcykgPT4gcmVxLmdldCgnaHR0cHM6Ly9hbGlwYXkuamllc2h1Lm1lL2ppZXNodS9nZXREb3ViYW5TdW1tYXJ5P2lzYm49JyArIHBhcmFtcy5pc2JuLCB7fSk7XG5cbi8vIOiOt+WPluWbvuS5puWIl+ihqOaVsOmHj1xuY29uc3QgZ2V0Qm9va0xpc3RDb3VudCA9IChpc2JuKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL2ppYW5zaHVTaGVsZi9hY2Nlc3NPcGVuL2dldFNoZWxmTGlzdEJ5Qm9vay8nICsgaXNibiwge30pO1xuXG4vLyDmn6Xor6Lor6Xlm77kuablj6/lgJ/lhozmlbBcbmNvbnN0IGdldENhbkJvcnJvd0NvdW50ID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvYm9va3MvR2xvYmFsTGliaW5mbycsIHBhcmFtcyk7XG5cbi8vIOWIpOaWreaYr+WQpuaUtuiXj1xuY29uc3QganVkZ2VDb2xsZWN0aW9uID0gKHBhcmFtcyxqd3QpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3ByYWlzZS9ib29rUHJhaXNlSW5mbycsIHBhcmFtcyxqd3QpO1xuXG4vLyDmlLbol4/lm77kuaZcbmNvbnN0IHByYWlzZUJvb2sgPSAocGFyYW1zLGp3dCkgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvcHJhaXNlL3ByYWlzZUJvb2snLCBwYXJhbXMsand0KTtcblxuLy8g5pCc57Si5Zu+5Lmm5YiX6KGoXG5jb25zdCBzZWFyY2hCb29rTGlzdCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3NlYXJjaC9zZXJhY2hCb29rTGlzdCcsIHBhcmFtcyk7XG5cbi8vIOWKoOWFpeWAn+S5puaetlxuY29uc3QgYWRkQm9va1NoZWxmID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvYm9ycm93Y2FydGl0ZW0vYWRkJywgcGFyYW1zKTtcblxuLy8g6LSt54mp6L2m5Lmm55qE5pWw6YePXG5jb25zdCBnZXRCb29rU2hlbGZDb3VudCA9ICgpID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvYm9ycm93Y2FydGl0ZW0vY291bnQnLCB7fSk7XG5cbi8v6Ieq5Yqp5Y+W5Lmm54K5XG5jb25zdCBwaWNrYWRkcmVzc0xpc3QgPSAoKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9wZXJzb25hbC9waWNrYWRkcmVzc0xpc3QnLCB7fSk7XG5cbi8v6YCB5Lmm5LiK6ZeoXG5jb25zdCBib29rVG9Ib21lID0gKHBhcmFtcywgdXNlcklkKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL2Jvb2tUb0hvbWUvYWRkcmVzc0xzdC8nICsgdXNlcklkLCBwYXJhbXMpO1xuXG4vL+abtOaUuem7mOiupOWcsOWdgOiHquWKqeeCuVxuY29uc3QgcGlja2FkZHJlc3MgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS91c2Vycy9waWNrYWRkcmVzcy91cGRhdGUnLCBwYXJhbXMpO1xuXG4vL+abtOaUuem7mOiupOWcsOeCuemAgeS5puS4iumXqFxuY29uc3Qgc2V0QXV0b0FkZHJlc3NUeXBlID0gKHVzZXJJZCwgYXBwYXJ0bWVudElkKSA9PnJlcS5nZXQoYXBpQXBwICsgJy9hcGkvYm9va1RvSG9tZS9hZGRyZXNzU2V0RGVmYXVsdC8nICsgdXNlcklkICsgJy8nICsgYXBwYXJ0bWVudElkICsgJz9hc0RlZmF1bHREZWxpdmVydHlwZT1UJicpXG5cbi8v5Yig6Zmk6YCB5Lmm5LiK6Zeo5Zyw5Z2AXG5jb25zdCBhZGRyZXNzRGVsZXRlID0gKHVzZXJJZCwgcGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9ib29rVG9Ib21lL2FkZHJlc3NEZWxldGUvJyArIHVzZXJJZCwgcGFyYW1zKTtcblxuLy/mt7vliqDlnLDlnYBcbmNvbnN0IGFkZHJlc3NBZGQgPSAodXNlcklkLCBwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2Jvb2tUb0hvbWUvYWRkcmVzc0FkZC8nICsgdXNlcklkLCBwYXJhbXMpO1xuXG4vL+e8lui+keWcsOWdgFxuY29uc3QgYWRkcmVzc1VwZGF0ZSA9ICh1c2VySWQsIHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvYm9va1RvSG9tZS9hZGRyZXNzTW9kaWZ5LycgKyB1c2VySWQsIHBhcmFtcyk7XG5cbi8v5Y+R6YCB55+t5L+h6aqM6K+B56CBXG5jb25zdCBzZW5kU21zVmVyaWZ5Q29kZSA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3NlbmRTbXNWZXJpZnlDb2RlJywgcGFyYW1zKTtcblxuLy/pqozor4HnoIHmoKHpqoxcbmNvbnN0IHZlcmlmeVNtc0NvZGUgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL3ZlcmlmeVNtc0NvZGUnLCBwYXJhbXMpO1xuXG4vL+abtOaUueaJi+acuuWPt1xuY29uc3QgdXBkYXRlTW9iaWxlID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvdXNlcnMvbW9iaWxldXBkYXRlJywgcGFyYW1zKTtcblxuLy/ojrflj5bpgIHkuabkuIrpl6jnmoTpu5jorqTlnLDlnYBcbmNvbnN0IGdldERlZmF1bHRBZGRyZXNzID0gKHJhZCkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9ib29rVG9Ib21lL2dldERlZmF1bHRBZGRyZXNzP3JhZD0nICsgcmFkLCB7fSlcblxuLy/oh6rlj5bppobnu5PnrpdcbmNvbnN0IGJvcnJvd0RpcmVjdGx5ID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvYm9ycm93Y2FydGl0ZW0vYm9ycm93RGlyZWN0bHknLCBwYXJhbXMpO1xuXG4vL+iOt+WPluW9k+WJjeWAn+mYheWIl+ihqFxuY29uc3QgZ2V0Q3VycmVudEJvcnJvd0xpc3Q9IChjYXJkTnVtYmVyLCBsaWJjb2RlKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL21tbGliL2dsb2JhbC9teWJvcnJvdzIvJyArIGNhcmROdW1iZXIgKyAnP2xpYmNvZGU9JyArIGxpYmNvZGUgKyAnJnJhbmQ9JyArIE1hdGgucmFuZG9tKCksIHt9KTtcblxuY29uc3QgZ2V0QWxsQm9ycm93SGlzdG9yeSA9IChzdGFydCxlbmQsIHBhcmFtcywgand0KSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL21tbGliL2dsb2JhbC9teWJvcnJvd2hpc3RvcnkyLycgKyBqd3QgKyBcIi9cIiArIHN0YXJ0ICsgXCIvXCIgKyBlbmQsIHBhcmFtcyk7XG5cbi8v6I635Y+W5Y2h5Y+3XG5jb25zdCBnZXRDYXJkTnVtID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvYm9udXNBY3Rpdml0eS9nZXRDYXJkTnVtRnJlc2gnLCBwYXJhbXMpO1xuXG4vL+iOt+WPluWFqOmDqOWMheijuVxuY29uc3QgZ2V0QWxsUGFja2FnZUluZm8gPSAoKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL29yZGVyL2N1cnJlbnRib29rb3JkZXJsaXN0Jywge30pO1xuXG4vL+iOt+WPlueJqea1geS/oeaBr1xuY29uc3QgZ2V0TG9naXN0aWNzID0gKG9yZGVySWQpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL29yZGVyLycgKyBvcmRlcklkICsgJy9ib29rT3JkZXJMb2cnLCB7fSk7XG5cbi8v5p+l6K+i5Y6G5Y+y5YyF6KO5XG5jb25zdCBnZXRIaXNQYWNrYWdlSW5mbyA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL29yZGVyL2hpc3Rvcnlib29rb3JkZXJsaXN0JywgcGFyYW1zKTtcblxuLy/ojrflj5borqLljZXliJfooahcbmNvbnN0IGdldE9yZGVyTGlzdCA9IChwYXJhbXMsIHVzZXJJZCkgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvYm9va1RvSG9tZS90b0hvbWVCb29rT3JkZXJzLycgKyB1c2VySWQsIHBhcmFtcyk7XG5cbi8v5Y+W5raI5LiK6Zeo5Y+W5Lmm6K6i5Y2VXG5jb25zdCBjYW5jZWxPcmRlciA9ICh1c2VySWQsIG9yZGVyTm8pID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvYm9va1RvSG9tZS9jYW5jZWxUb0hvbWVCb29rcy8nICsgdXNlcklkICsgJy8nICsgb3JkZXJObyk7XG5cbi8v5Y+W5raI5b2T5YmN5YCf6ZiFXG5jb25zdCBjYW5jZWxCb3Jyb3cgPSAoaXRlbUlkKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9vcmRlci9HbG9iYWxDYW5jZWxCb3Jyb3cvcmVhbC8nICsgaXRlbUlkLCB7fSk7XG5cbi8v55Sf5oiQ6YCB5Lmm5LiK6Zeo6K6i5Y2VXG5jb25zdCB1cGRhdGVUb0hvbWVCb29rcyA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2Jvb2tUb0hvbWUvdXBkYXRlVG9Ib21lQm9va3MnLCBwYXJhbXMpO1xuXG4vL+iOt+WPlumAgeS5puS4iumXqOaUr+S7mOS/oeaBr1xuY29uc3QgZ2V0UGF5SW5mbyA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2FjY2Vzc09wZW4vd3gvZ2V0UGF5SW5mbycsIHBhcmFtcyk7XG5cbi8v6I635Y+W5Lmm5Y2V6K+m5oOFXG5jb25zdCBnZXRTaGVsZkluZm8gPSAoc2hlbGZJZCkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9qaWFuc2h1U2hlbGYvYWNjZXNzT3Blbi9nZXRTaGVsZkluZm8vJyArIHNoZWxmSWQsIHt9KTtcblxuLy/moLnmja7kuabljZVpZOiOt+WPluWbvuS5puWIl+ihqFxuY29uc3QgYm9va0xpc3RCeUlkID0gKHNoZWxmSWQpID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvamlhbnNodVNoZWxmL2FjY2Vzc09wZW4vYm9va3MvJyArIHNoZWxmSWQsIHt9KTtcblxuLy/kuabljZXmlLbol49cbmNvbnN0IHNoZWxmRmF2ID0gKHNoZWxmSWQsIGJpbmRJZCkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9qaWFuc2h1U2hlbGYvYWNjZXNzT3Blbi9mYXYvJyArIHNoZWxmSWQgKyAnLycgKyBiaW5kSWQgKyAnP3I9JyArIE1hdGgucmFuZG9tKCkse30pO1xuXG4vL+S5puWNleiOt+WPluaYr+WQpuaUtuiXj1xuY29uc3Qgc2hlbGZJc0ZhdiA9IChzaGVsZklkLCBiaW5kSWQpID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvamlhbnNodVNoZWxmL2FjY2Vzc09wZW4vaXNGYXYvJyArIHNoZWxmSWQgKyAnLycgKyBiaW5kSWQsIHt9KTtcblxuLy/ojrflj5bkvJjmg6DliLjliJfooahcbmNvbnN0IGdldEFsbENvdXBvbnMgPSAocGFyYW1zKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL2NvdXBvbi9teUFsbENvdXBvbnMnLCBwYXJhbXMpO1xuXG4vL+iOt+WPlumAgeS5puS4iumXqOeahOS8mOaDoOWIuFxuY29uc3QgZ2V0VXNhYmxlU2VuZFRvSG9tZUNvdXBvbnMgPSAoKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL2NvdXBvbi9nZXRVc2FibGVTZW5kVG9Ib21lQ291cG9ucz9yPScgKyBNYXRoLnJhbmRvbSgpLCB7fSk7XG5cbmNvbnN0IGdldFVzYWJsZUZldGNoRnJvbUhvbWVDb3Vwb25zID0gKHByaWNlKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL2NvdXBvbi9nZXRVc2FibGVGZXRjaEZyb21Ib21lQ291cG9ucz9wcmljZT0nICtwcmljZSsgJyZyPScrTWF0aC5yYW5kb20oKSwge30pO1xuXG5jb25zdCBjYW5HZXRTZW5kdG9ob21lQ291cG9uID0gKCkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9jb3Vwb24vY2FuR2V0U2VuZHRvaG9tZUNvdXBvbicsIHt9KTtcblxuLy/liKTmlq3lgJ/kuabmmK/lkKblhY3otLlcbmNvbnN0IGlzRnJlZSA9ICh0eXBlLCB1c2VyVHlwZSkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9ib3Jyb3djYXJ0aXRlbS9pc0ZyZWU/dHlwZT0nICsgdHlwZSArJyZyZWFkVHlwZT0nICsgdXNlclR5cGUsIHt9KTtcblxuLy/pqozor4HkvJjmg6DliLjmmK/lkKbmnInmlYhcbmNvbnN0IGNhblVzZURpcmVjdGx5ID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvY291cG9uL2NhblVzZURpcmVjdGx5JywgcGFyYW1zKTtcblxuLy/mlLbol4/nmoTkuabljZXliJfooahcbmNvbnN0IGdldEZhdkxpc3QgPSAocGFyYW1zLCBqd3QpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2ppYW5zaHVTaGVsZi9hY2Nlc3NPcGVuL2Zhdkxpc3QnLCBwYXJhbXMsIGp3dCk7XG5cbi8v5qyg6LS56K6w5b2VXG5jb25zdCBteWRlYnQgPSAoY2FyZE51bWJlcikgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9tbWxpYi9teWRlYnQvaW5mby8nICsgY2FyZE51bWJlciwge30pO1xuXG4vL+mAn+mAkuafnOWIl+ihqFxuY29uc3QgZ2V0UGlja2FkZHJlc3NMaXN0ID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvcGVyc29uYWwvcGlja2FkZHJlc3NMaXN0JywgcGFyYW1zKTtcblxuLy/mn6XnnIvlsI/onJzonILliJfooahcbmNvbnN0IGdldEFsbFdqZFMgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9mZXRjaEJvb2tPcmRlci9nZXRBbGxXamRTJywgcGFyYW1zKTtcblxuY29uc3QgcmVhZGVyUmVzdiA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3Nwb3N0ZXIvcmVhZGVyUmVzdicsIHBhcmFtcyk7XG5cbmNvbnN0IGdldE1heEZldGNoQ291bnQgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9mZXRjaEJvb2tPcmRlci9nZXRNYXhGZXRjaENvdW50JywgcGFyYW1zKTtcblxuLy/mmK/lkKbog73lpJ/kuIrpl6jlj5bkuaZcbmNvbnN0IGNhbkZldGNoQm9va3MgPSAoKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL2ZldGNoQm9va09yZGVyL2NhbkZldGNoQm9va3MnLCB7fSk7XG5cbi8v6I635Y+W6aKE57qm5Y6G5Y+yLeS4iumXqOWPluS5plxuY29uc3QgZW1zUmVzdkxpc3RCeVVzZXIgPSAocGFybWFzKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9mZXRjaEJvb2tPcmRlci9lbXNSZXN2TGlzdEJ5VXNlcicsIHBhcm1hcyk7XG5cbmNvbnN0IGdldEZldGNoQm9va0VtcyA9IChwYXJtYXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2ZldGNoQm9va09yZGVyL2dldEZldGNoQm9va0VtcycsIHBhcm1hcyk7XG5cbmNvbnN0IGdldHJlYWRlclJlc3YgPSAocGFybWFzKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9zcG9zdGVyL2dldHJlYWRlclJlc3YnLCBwYXJtYXMpO1xuXG4vL+mAn+mAkuafnOW9k+WJjemihOe6puS/oeaBr1xuY29uc3QgcmVhZGVyQ3VycmVudFJlc3YgPSAoKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL3Nwb3N0ZXIvcmVhZGVyQ3VycmVudFJlc3YnLCB7fSk7XG5cbmNvbnN0IHJlYWRlckNhbmNlbFJlc3YgPSAoKSA9PiByZXEuZ2V0KGFwaUFwcCArICcvYXBpL3Nwb3N0ZXIvcmVhZGVyQ2FuY2VsUmVzdicsIHt9KTtcblxuLy/ojrflj5bpooTnuqbljoblj7It6YCf6YCS5p+cXG5jb25zdCByZWFkZXJIaXN0b3J5UmVzdiA9IChwYWdlSW5kZXgsIHBhZ2VOdW0pID0+IHJlcS5nZXQoYXBpQXBwICsgJy9hcGkvc3Bvc3Rlci9yZWFkZXJIaXN0b3J5UmVzdj9wYWdlSW5kZXg9JyArIHBhZ2VJbmRleCArICcmcGFnZU51bT0nICsgcGFnZU51bSwge30pXG5cbmNvbnN0IHJlYWRlckhpc3RvcnlSZXN2TmV3ID0gKHBhZ2VJbmRleCwgcGFnZU51bSkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS9zcG9zdGVyL3JlYWRlckhpc3RvcnlSZXN2TmV3P3BhZ2VJbmRleD0nICsgcGFnZUluZGV4ICsgJyZwYWdlTnVtPScgKyBwYWdlTnVtLCB7fSlcblxuLy/pooTnuqbkuIrpl6jlj5bkuaZcbmNvbnN0IGV4cHJlc3NOb3RpZnlJbmxhbmRXYXliaWxsR290ID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvZmV0Y2hCb29rT3JkZXIvZXhwcmVzc05vdGlmeUlubGFuZFdheWJpbGxHb3QnLCBwYXJhbXMpXG5cbi8v57ut5YCfXG5jb25zdCByZW5ld2Jvb2sgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9tbWxpYi9yZW5ld2Jvb2snLCBwYXJhbXMpO1xuXG4vL+WPlua2iOasoOasvlxuY29uc3QgY2FuY2VsRGVidCA9IChwYXJhbXMsIGNhcmROdW1iZXIpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL21tbGliL215ZGVidC9jYW5jZWwvJytjYXJkTnVtYmVyLCBwYXJhbXMpO1xuXG4vL+aYr+WQpuWPr+S7peaUr+S7mOasoOi0uVxuY29uc3QgaXNBYmxlVG9QYXlEZWJ0ID0gKCkgPT4gcmVxLmdldChhcGlBcHAgKyAnL2FwaS90aGlyZFBhcnRCaW5kL2lzQWJsZVRvUGF5RGVidCcsIHt9KTtcblxuLy/mna3lt57lv6vpgJLkuIrpl6hcbmNvbnN0IGFkZE9yZGVyID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvZmV0Y2hCb29rT3JkZXIvYWRkT3JkZXInLCBwYXJhbXMpO1xuXG4vL+S4iumXqOWPluS5pueahOeCueWHu+aOpeWPo1xuY29uc3QgZ2V0Qm9va0Rvb3JUb0Rvb3IgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9mZXRjaEJvb2tPcmRlci9saXN0QnlVc2VyJywgcGFyYW1zKTtcblxuLy/lj5bmtojkuIrpl6jlj5bkuabpooTnuqZcbmNvbnN0IGNhbmNlbFJldHVybk9yZGVyID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvZmV0Y2hCb29rT3JkZXIvY2FuY2VsT3JkZXInLCBwYXJhbXMpO1xuXG4vL+WcqOe6v+WKnuWNoVxuY29uc3Qgc3VibWl0Rm9ybSA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3JlZ2lzdGVPbmxpbmUvc3VibWl0Rm9ybScsIHBhcmFtcyk7XG5cbi8v5Zyo57q/6YCA5Y2h56ys5LiA5q2lXG5jb25zdCBzZWFyY2hCb3hDb3VudCA9IChwYXJhbXMpID0+cmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvcGFja2luZ1N0YXRlbWVudC9zZWFyY2hCb3hDb3VudCcsIHBhcmFtcyk7XG5cbi8v5Zyo57q/6YCA5Y2h56ys5LqM5q2lXG5jb25zdCBkaXNjYXJkQ2hlY2sgPSAoKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9yZWdpc3RlT25saW5lL2Rpc2NhcmRDaGVjaycsIHt9KTtcblxuLy/lnKjnur/pgIDljaHnrKzkuInmraVcbmNvbnN0IGRpc2NhcmRPbmxpbmUgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9yZWdpc3RlT25saW5lL2Rpc2NhcmRPbmxpbmUnLCBwYXJhbXMpO1xuXG4vL+iOt+WPluS5puWNleWbvuS5puaVsOmHj+aYvuekulxuY29uc3QgZ2V0Qm9va0NvdW50Q29uZmlnID0gKHBhcmFtcyxzaGVsZklkKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9qaWFuc2h1U2hlbGYvYWNjZXNzT3Blbi9jbGsvJytzaGVsZklkLCBwYXJhbXMpO1xuXG4vL+agueaNruWIhuexu+afpeivouWbvuS5puWIl+ihqFxuY29uc3Qgc2VhcmNoTmV3Q2xhc3NObyA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2NhdGVnb3J5TWFwcGluZy9zZWFyY2hOZXdDbGFzc05vJywgcGFyYW1zKTtcblxuLy/lpb3kuabnm5vlrrR5cEFwaUFwcFxuY29uc3QgeXBHb29kQm9va0xpc3QgPSAocGFyYW1zKSA9PiByZXEucG9zdCh5cEFwaUFwcCArICcvQ2hvb3NlQnV5L2Nob29zZWJ1eS9hcGkvYm9vay9ib29rTGlzdCcsIHBhcmFtcyk7XG5cbi8v5rW35Y2X5LiJ5Lqa5Zu+5Lmm6aaG6Ziy5q2i6YeN5aSN5o+Q5LqkXG5jb25zdCB5dVl1ZVJlcGVhdFN1Ym1pdCA9IChwYXJhbXMsand0KSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9mZXRjaEJvb2tPcmRlci9jaGVja0ZldGNoQm9va09yZGVyRW1zJywge30sand0KTtcblxuLy/muZbljZflm77kuabppoblsI/nqIvluo/ot7PovazlgJ/kuablsI/nqIvluo/nu5HljaFcbmNvbnN0IGJpbmRDYXJkRnJvbU1pbmlhID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy93ZW1pbmlhL2FjY2Vzc09wZW4vY3JlYXRlQ2FyZEZvck1pbmlhJywgcGFyYW1zKTtcblxuLy/lnLDmjqjmoLnmja7lv5fmhL/ogIVpZOafpeivoummhuS7o+eggVxuY29uc3QgZ2V0TGliSW5mb0J5Vm9sdW50ZWVySWQgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2J1c0RldmVsb3AvYWNjZXNzT3Blbi9nZXRWb2x1bnRlZXJJbmZvJywgcGFyYW1zKTtcblxuLy/miavnoIHlgJ/kuaZcbmNvbnN0IHNjYW5Cb3Jyb3cgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9vZmZsaW5lQm9ycm93L2dldFJlc3VsdE9mZmxpbmVCb3Jyb3dOb1N1YkxpYicsIHBhcmFtcyk7XG5cbi8v5a+E6K+t5rS75Yqo5Y+R5biDXG5jb25zdCB1cGxvYWRMaWJyYXJ5QWN0aXZpdHkgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9saWJyYXJ5QWN0aXZpdHkvdXBsb2FkV29yaycsIHBhcmFtcyk7XG5cbi8v5a+E6K+t5L2c5ZOB5YiX6KGoXG5jb25zdCBnZXRXb3JrTGlzdCA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2xpYnJhcnlBY3Rpdml0eS9hY2Nlc3NPcGVuL2dldFdvcmtMaXN0JywgcGFyYW1zKTtcblxuLy/lr4Tor63kvZzlk4Hor6bmg4VcbmNvbnN0IGdldFdvcmtEZXRhaWwgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9saWJyYXJ5QWN0aXZpdHkvYWNjZXNzT3Blbi8vd29ya0RldGFpbCcsIHBhcmFtcyk7XG5cbi8v5rS75Yqo5oqV56Wo44CB5pS26JeP44CB5YiG5LqrXG5jb25zdCBsaWJyYXJ5QWN0aXZpdHlWb3RlID0gKHBhcmFtcykgPT4gcmVxLnBvc3QoYXBpQXBwICsgJy9hcGkvbGlicmFyeUFjdGl2aXR5L3ZvdGUnLCBwYXJhbXMpO1xuXG4vL+iNkOS5plxuY29uc3QgdXBsb2FkUmVjb21tbmVkQm9vayA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL3JlY29tbWVuZC91cGxvYWQvYm9va2luZm8nLCBwYXJhbXMpO1xuXG4vL+aIkeeahOiNkOS5puWIl+ihqFxuY29uc3QgZ2V0UmVjb21tZW5kQm9va3MgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9yZWNvbW1lbmQvZ2V0UmVjb21tZW5kQm9va3MnLCBwYXJhbXMpO1xuXG4vL+W9k+WJjeWPluS5pueCuVxuY29uc3QgZ2V0UGlja0FkZHIgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9wZXJzb25hbC9nZXRQaWNrYWRkcmVzc0J5Q29kZScsIHBhcmFtcyk7XG5cbi8v5YWo5bm05YCf5Lmm6YePXG5jb25zdCBnZXRNeUJvb2tDb3VudCA9ICgpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2JvcnJvd0NvdW50L215Qm9ycm93Q291bnQnLCB7fSk7XG5cbi8v5Yik5pat6aKG5aWW6LWE5qC8XG5jb25zdCBnZXRDYW5Qcml6ZSA9ICgpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2JvcnJvd0NvdW50L2lzQ2FuR2V0UHJpemUnLCB7fSk7XG5cbi8v6aKG5aWW5L+d5a2Y6IGU57O75pa55byPXG5jb25zdCBzYXZlUGhvbmUgPSAocGFyYW1zKSA9PiByZXEucG9zdChhcGlBcHAgKyAnL2FwaS9ib3Jyb3dDb3VudC9zYXZlUGhvbmUnLCBwYXJhbXMpO1xuXG4vL+eIhuS7k+S/neWtmOeUqOaIt+aVsOaNrlxuY29uc3QgZ2V0QWRkVXNlciA9IChwYXJhbXMpID0+IHJlcS5wb3N0KGFwaUFwcCArICcvYXBpL2F1dG9Cb3gvcGFja2FnZS9hZGRVc2VyJywgcGFyYW1zKTtcblxuY29uc3QgY29uZmlnID0ge1xuICBhcGlBcHAsXG4gIGxvYWRDaXR5LFxuICBnZXRDYXRlZ29yeUxpc3QsXG4gIGdldEhvdFdvcmRzLFxuICBnZXRDb21tb25Db25maWcsXG4gIG9uV3hMb2dpbixcbiAgYXV0b0xvZ2luLFxuICBzZXRMaWJjb2RlVXNlckNob29zZWQsXG4gIGdldFNsaWRlcnMsXG4gIGdldEJsVHlwZSxcbiAgZ2V0Qm9va3MsXG4gIGdldFJlZ2lvbkFuZExpYixcbiAgZ2V0SmlhbnNodVNoZWxmLFxuICBqaWFuc2h1U2hlbGZMaXN0LFxuICBkb0xvZ2luQ29tbW9uLFxuICBzYXZlQmluZCxcbiAgbW9iaWxldXBkYXRlLFxuICBzYXZlRW1iZWRBZGRyV2hlbkJpbmQsXG4gIGdldEJpbmRMaXN0LFxuICBnZXRFbmNyeXB0UHdkLFxuICB1bmJpbmQsXG4gIGxvZ291dCxcbiAgZ2V0Qm9ycm93Q2FydExpc3QsXG4gIGdldFN5c3RlbUNvbmZpZyxcbiAgZ2V0U3BlY2lhbENvdW50cyxcbiAgY2hlY2tWaXAsXG4gIGdldE1lc3NhZ2UsXG4gIHJlYWRNZXNzYWdlLFxuICBkZWxldGVCb3Jyb3dDYXJ0LFxuICBnZXRCb29rRGV0YWlsLFxuICBnZXREb3ViYW5TdW1tYXJ5LFxuICBnZXRCb29rTGlzdENvdW50LFxuICBnZXRDYW5Cb3Jyb3dDb3VudCxcbiAganVkZ2VDb2xsZWN0aW9uLFxuICBwcmFpc2VCb29rLFxuICBzZWFyY2hCb29rTGlzdCxcbiAgYWRkQm9va1NoZWxmLFxuICBnZXRCb29rU2hlbGZDb3VudCxcbiAgcGlja2FkZHJlc3NMaXN0LFxuICBib29rVG9Ib21lLFxuICBwaWNrYWRkcmVzcyxcbiAgc2V0QXV0b0FkZHJlc3NUeXBlLFxuICBhZGRyZXNzRGVsZXRlLFxuICBhZGRyZXNzQWRkLFxuICBhZGRyZXNzVXBkYXRlLFxuICBzZW5kU21zVmVyaWZ5Q29kZSxcbiAgdmVyaWZ5U21zQ29kZSxcbiAgdXBkYXRlTW9iaWxlLFxuICBnZXREZWZhdWx0QWRkcmVzcyxcbiAgYm9ycm93RGlyZWN0bHksXG4gIGdldEN1cnJlbnRCb3Jyb3dMaXN0LFxuICBnZXRBbGxCb3Jyb3dIaXN0b3J5LFxuICBnZXRDYXJkTnVtLFxuICBnZXRBbGxQYWNrYWdlSW5mbyxcbiAgZ2V0TG9naXN0aWNzLFxuICBnZXRIaXNQYWNrYWdlSW5mbyxcbiAgZ2V0T3JkZXJMaXN0LFxuICBjYW5jZWxPcmRlcixcbiAgY2FuY2VsQm9ycm93LFxuICB1cGRhdGVUb0hvbWVCb29rcyxcbiAgZ2V0UGF5SW5mbyxcbiAgZ2V0U2hlbGZJbmZvLFxuICBib29rTGlzdEJ5SWQsXG4gIHNoZWxmRmF2LFxuICBzaGVsZklzRmF2LFxuICBnZXRBbGxDb3Vwb25zLFxuICBnZXRVc2FibGVTZW5kVG9Ib21lQ291cG9ucyxcbiAgZ2V0VXNhYmxlRmV0Y2hGcm9tSG9tZUNvdXBvbnMsXG4gIGNhbkdldFNlbmR0b2hvbWVDb3Vwb24sXG4gIGlzRnJlZSxcbiAgY2FuVXNlRGlyZWN0bHksXG4gIGdldEZhdkxpc3QsXG4gIG15ZGVidCxcbiAgZ2V0UGlja2FkZHJlc3NMaXN0LFxuICBnZXRBbGxXamRTLFxuICByZWFkZXJSZXN2LFxuICBnZXRNYXhGZXRjaENvdW50LFxuICBjYW5GZXRjaEJvb2tzLFxuICBlbXNSZXN2TGlzdEJ5VXNlcixcbiAgZ2V0RmV0Y2hCb29rRW1zLFxuICBnZXRyZWFkZXJSZXN2LFxuICByZWFkZXJDdXJyZW50UmVzdixcbiAgcmVhZGVyQ2FuY2VsUmVzdixcbiAgcmVhZGVySGlzdG9yeVJlc3YsXG4gIHJlYWRlckhpc3RvcnlSZXN2TmV3LFxuICBleHByZXNzTm90aWZ5SW5sYW5kV2F5YmlsbEdvdCxcbiAgcmVuZXdib29rLFxuICBjYW5jZWxEZWJ0LFxuICBpc0FibGVUb1BheURlYnQsXG4gIGFkZE9yZGVyLFxuICBnZXRCb29rRG9vclRvRG9vcixcbiAgY2FuY2VsUmV0dXJuT3JkZXIsXG4gIGdldFBvcHVwLFxuICBjYW5HZXRDb3Vwb25CeUJhdGNoTm8sXG4gIGdldENvdXBvbixcbiAgZ2V0Q291cG9uQnlDb3Vwb25ObyxcbiAgc3VibWl0Rm9ybSxcbiAgc2VhcmNoQm94Q291bnQsXG4gIGRpc2NhcmRDaGVjayxcbiAgZGlzY2FyZE9ubGluZSxcbiAgZ2V0Qm9va0NvdW50Q29uZmlnLFxuICBzZWFyY2hOZXdDbGFzc05vLFxuICB5cEdvb2RCb29rTGlzdCxcbiAgeXVZdWVSZXBlYXRTdWJtaXQsXG4gIGJpbmRDYXJkRnJvbU1pbmlhLFxuICBnZXRMaWJJbmZvQnlWb2x1bnRlZXJJZCxcbiAgc2NhbkJvcnJvdyxcbiAgdXBsb2FkTGlicmFyeUFjdGl2aXR5LFxuICBnZXRXb3JrTGlzdCxcbiAgZ2V0V29ya0RldGFpbCxcbiAgbGlicmFyeUFjdGl2aXR5Vm90ZSxcbiAgdXBsb2FkUmVjb21tbmVkQm9vayxcbiAgZ2V0UmVjb21tZW5kQm9va3MsXG4gIGdldFBpY2tBZGRyLFxuICBnZXRNeUJvb2tDb3VudCxcbiAgZ2V0Q2FuUHJpemUsXG4gIHNhdmVQaG9uZSxcbiAgZ2V0QWRkVXNlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG4iXX0=