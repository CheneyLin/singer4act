
(function () {

    var Utils = {

        setCookie: function (name, value, day) {
            var Days = day || 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + "; expires=" + exp.toGMTString();
        },

        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if( arr = document.cookie.match(reg) ) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },

        clearCookie: function (){
            var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;)
                document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
            }
        },

        parseQuery: function(url) {
            var url = url ? url : location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    // 暂时没找到解决中文乱码的方法，先这么处理着 -.-||
                    try {
                        // 解决中文乱码
                        theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                    } catch (e) {
                        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                    }
                }
            }
            return theRequest;
        },

        rnd: function (m, n) {
            return Math.floor((n - m) * Math.random() + m);
        },

        toParam: function(obj) {
            var result = [];
            for(var key in obj){
                result.push(key + '=' + obj[key]);
            }
            return result.join('&');
        },

        showToast: function (txt, callback) {
            $('.mg-toast').show();

            var p = $('.mg-toast p');
            p.removeClass('s h').html(txt).show();
            setTimeout(function () {
                p.addClass('s')
            }, 1);

            p.on('webkitTransitionEnd', function () {
                setTimeout(function () {
                    p.addClass('h');
                }, 1500);
            });

            setTimeout(function () {
                $('.mg-toast').hide();
                if ( typeof callback == 'function' ) callback();
            }, 3000);
        },

        /**
         * @desc 获取字节长度，中文算两个
         * @returns {Number}
         */
        getByteLength: function (s) {
            return (s + '').replace(/[^\x00-\xff]/g, "mm").length;
        },

        showLoading: function () {
            $('.mg-loading').show();
        },

        hideLoading: function () {
            $('.mg-loading').hide();
        },

        downloadApp: function () {
            var appUrl = {
                android: 'http://www.hunantv.com/v/m/v/2015/mandroid/',
                weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hunantv.imgo.activity',
                ios: 'https://itunes.apple.com/cn/app/id629774477?pt=355474&ct=mgtv&mt=8'
            };

            if ( UA.isWeixin ) {
                window.location.href = appUrl.weixin;
            } else {
                window.location.href = UA.isIOS ? appUrl.ios : appUrl.android;
            }
        },

        checkAppVersion: function () {
            var ua = window.navigator.userAgent.toLowerCase();

            if (UA.isIOS) {
                var a = ua.split('imgotv-iphone/');
                var b = a[1].split('.');

                if (('' + b[0] + b[1] + b[2]) > 453) {
                    return true;
                }
            }

            if (UA.isAndroid) {
                var a = ua.split('imgotv-aphone/');
                var b = a[1].split('.');

                if (('' + b[0] + b[1] + b[2]) > 451) {
                    return true;
                }
            }

                    },
/*
wxReady,wxShare需要在index.html定义ShareData
var ShareData = {
    "type": "link",
    "imgUrl": "http://i5.hunantv.com/s1/2014/m/u/96/20161201022286836.jpg",
    "link": (location.href.split('#')[0]).replace(/h=1/g,'h=0'),
    "title": "我是歌手·互动",
    "desc": "我是歌手·互动",
    "title2": "我是歌手·互动"
};

*/
        wxReady: function () {
            wx.onMenuShareAppMessage({
                title: ShareData.title,
                desc: ShareData.desc,
                link: ShareData.link,
                imgUrl: ShareData.imgUrl,
                type: ShareData.type,
                success: function () {
                            //goAnalytics('','kpi_wxshare');
                }
                });
            wx.onMenuShareTimeline({
                title: ShareData.title2,
                link: ShareData.link,
                imgUrl: ShareData.imgUrl,
                type: ShareData.type,
                success: function () {
                            //goAnalytics('','kpi_wxshare');
                }
                });
        },

        wxShare: function () {

            var callurl=location.href.split('#')[0];
            callurl=escape(callurl);
            var u="http://v.api.hunantv.com/weixin/sign?url="+callurl+"&callback=?";

            $.getJSON(u,function(data){
                var dd=data.data;
                wx.config({
                    appId: dd.appId,
                    timestamp: dd.timestamp,
                    nonceStr: dd.nonceStr,
                    signature: dd.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                     });
                });
            wx.ready(function () {
                Utils.wxReady();
                });
        },

        parseUrl: function () {
            var ua = window.navigator.userAgent.toLowerCase();

            if ( ua.indexOf('imgo') != -1 ) {
                $('a').each(function (key, val) {
                    var href = $(val).attr('href');
                    if ( href.indexOf('hunantv.com') != -1 ) {
                        var ret = href.match(/\/\w{1}\/\d{1}\/\d{1,}\/\w{1}\/(.*)\.html/i);
                        if (!ret) return;
                        $(val).attr('href', 'imgotv://player?videoId=' + ret[1]);
                    }
                });
            }
        },

        jumpPage: function (url) {
            ImgotvApi.jumpPage({url: url});
        }

    };

    window.Utils = Utils;

})();
