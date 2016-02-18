(function () {

    var ua = window.navigator.userAgent.toLowerCase();
    var UA = {
        isQQBrowser: /qqbrowser/.test(ua),
        isWeixin: /micromessenger/.test(ua) || /weixin/.test(ua),
        isAndroid: /android/.test(ua),
        isIOS: /iphone/.test(ua) || /ipad/.test(ua) || /itouch/.test(ua) || /ipod/.test(ua),
        isFirefox: /firefox/.test(ua),
        isIpad: /ipad/.test(ua),
        isImgotv: /imgo/.test(ua)
    };

    window.UA = UA;

})();
