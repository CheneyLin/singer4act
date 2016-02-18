/**
 * @desc 完美假期 SDK，负责 webView 与 APP 间的接口调用。兼容 IOS 和 Android 版本。
 * @author berry
 * @time 2015-07-20
 */
'use strict';

(function (_w) {
    /**
     * ios调用方式封装
     */
    var __functionIndexMap = {};

    function calliOSFunction(functionName, args, successCallback, errorCallback) {
        var url = "js2ios://";

        var callInfo = {};
        callInfo.functionname = functionName;

        if (successCallback) {
            if (typeof successCallback == 'function') {
                var callbackFuncName = createCallbackFunction(functionName + "_" + "successCallback", successCallback);
                callInfo.success = callbackFuncName;
            } else
                callInfo.success = successCallback;
        }

        if (errorCallback) {
            if (typeof errorCallback == 'function') {
                var callbackFuncName = createCallbackFunction(functionName + "_" + "errorCallback", errorCallback);
                callInfo.error = callbackFuncName;
            } else
                callInfo.error = errorCallback;
        }

        if (args) {
            callInfo.args = args;
        }

        url += JSON.stringify(callInfo)

        //eval(callbackFuncName + "({message:'This is a test<br>'})");

        var iFrame = createIFrame(url);
        //remove the frame now
        iFrame.parentNode.removeChild(iFrame);
    }

    function createCallbackFunction(funcName, callbackFunc) {
        if (callbackFunc && callbackFunc.name != null && callbackFunc.name.length > 0) {
            return callbackFunc.name;
        }

        if (typeof window[funcName + 0] != 'function') {
            window[funcName + 0] = callbackFunc;
            __functionIndexMap[funcName] = 0;
            return funcName + 0

        } else {
            var maxIndex = __functionIndexMap[funcName];
            var callbackFuncStr = callbackFunc.toString();
            for (var i = 0; i <= maxIndex; i++) {
                var tmpName = funcName + i;
                if (window[tmpName].toString() == callbackFuncStr)
                    return tmpName;
            }

            var newIndex = ++__functionIndexMap[funcName];
            window[funcName + newIndex] = callbackFunc;
            return funcName + newIndex;
        }
    }

    function createIFrame(src) {
        var rootElm = document.documentElement;
        var newFrameElm = document.createElement("IFRAME");
        newFrameElm.setAttribute("src", src);
        rootElm.appendChild(newFrameElm);
        return newFrameElm;
    }

    _w.calliOSFunction = calliOSFunction

})(window);

(function (_w) {


    _w.andriodCallbackList = {};

    // 安卓机型的延迟请求
    var andriodReqTimer = null;


    /**
     * ios/andriod 接口调用封装对象 Invoker
     */
    var
        Invoker = {

            version: '1.2',
            /**
             * [isIOS 判断是否Ios设备]
             * @type {Boolean}
             */
            isIOS: (navigator.userAgent.toLowerCase().indexOf('iphone') != -1) ||
            (navigator.userAgent.toLowerCase().indexOf('ipad') != -1),

            /**
             * [use 接口调用入口函数]
             * @param  {[string]} funcName [需要调用的接口名]
             * @param  {[object]} param    [需要传递的参数对象]
             */
            use: function (funcName, opt) {

                var
                    _param = null,
                    _callback = null,
                    _paramArr = [];

                //判断是否带有配置项
                if (typeof(opt) == 'object') {
                    //如果有传参
                    _param = typeof(opt.param) === 'object' ? opt.param : null

                    //如果有回调函数
                    _callback = typeof(opt.onsuccess) === 'function' ? opt.onsuccess : function () {
                    }
                }

                //如果参数是个json,转成字符串
                if (_param && typeof(_param) === 'object') {
                    if (funcName === 'showShareMenus') {
                        for (var k in _param) {
                            _paramArr.push(encodeURIComponent(_param[k]));
                        }
                    } else {
                        _paramArr.push(JSON.stringify(_param));
                    }
                }

                try {
                    //IOS,直接用
                    if (this.isIOS) {
                        calliOSFunction(funcName, _paramArr, _callback)
                    } else {
                        if (andriodReqTimer && funcName === 'jumpPage') {   // 页面跳转做延时
                            return;
                        }

                        if (_paramArr.length !== 0) {
                            //直接调用安卓接口
                            client[funcName](_paramArr)
                        } else if (_callback) {
                            //创建一个随机方法名
                            var a_callbackName = funcName + '_' + Math.ceil(Math.random() * 1000)

                            //包裹回调函数
                            andriodCallbackList[a_callbackName] = function (data) {
                                _callback(data)
                            }

                            //调用安卓接口
                            client[funcName]('andriodCallbackList.' + a_callbackName)
                        } else {
                            //无参数，无回调
                            client[funcName]()
                        }
                        if (funcName === 'jumpPage') {
                            andriodReqTimer = setTimeout(function () {
                                clearTimeout(andriodReqTimer);
                                andriodReqTimer = null;
                            }, 1000 * 1);   // 1s 的请求延时
                        }
                    }
                } catch (e) {
                    console.log(e.message)
                }
            }
        }

    var
        IA = {

            version: '1.1',

            login: function (callback) {
                Invoker.use('login', {
                    onsuccess: callback
                })
            },

            getUserInfo: function (callback) {
                Invoker.use('getUserInfo', {
                    onsuccess: callback
                })
            },

            showShareMenus: function (opt) {
                if (typeof(opt) !== 'object') return

                Invoker.use('showShareMenus', {
                    param: {
                        title: opt.title || document.title,
                        shareUrl: opt.shareUrl || _w.location.href,
                        shareIcon: opt.shareIcon || ''
                    }
                })
            },

            startShake: function (callback) {
                Invoker.use('openShake', {
                    onsuccess: callback
                })
            },

            getDeviceInfo: function (callback) {
                Invoker.use('getDeviceInfo', {
                    onsuccess: callback
                })
            },

            closeWebView: function () {
                Invoker.use('finish')
            },

            toWalletActivity: function () {
                Invoker.use('toWalletActivity')
            },

            supportFunctions: function (apiList, callback) {
                Invoker.use('supportFunctions', {
                    onsuccess: function (supportList) {
                        if (!apiList instanceof Array || apiList.length == 0) return

                        var
                            _unSupportApi = []

                        for (var a in apiList) {
                            if (supportList.indexOf(apiList[a]) == -1) {
                                _unSupportApi.push(apiList[a])
                            }
                        }
                        callback({
                            status: (_unSupportApi.length > 0) ? 0 : 1,
                            unSupportApi: _unSupportApi
                        })
                    }
                })
            },

            sendToClipboard: function (str) {
                Invoker.use('sendToClipboard', {
                    param: {
                        content: str
                    }
                })
            },
            changeVideo: function (opt) {
                if (typeof(opt) !== 'object') return;

                Invoker.use('changeVideo', {
                    param: {
                        sid: opt.sid || 0,
                        videoId: opt.videoId || 0,
                        cameraid: opt.cameraid || 0,
                        category: opt.category || 'liveshow',
                        type: opt.type || 1,
                        hUrl: opt.hUrl || ''
                    }
                })
            },
            getVotesNum: function (opt) {
                if (typeof(opt) !== 'object') return;

                Invoker.use('getVotesNum', {
                    param: {
                        num: opt.num || 10
                    }
                })
            },
            jumpPage: function (opt) {
                if (typeof(opt) !== 'object') return;

                Invoker.use('jumpPage', {
                    param: {
                        url: opt.url || ''
                    }
                })
            },
            getIap: function (opt) {
                if (typeof(opt) !== 'object') return;
                Invoker.use('getIap', {
                    param: {
                        videoId: opt.videoId || '',
                        iapType: 'perfectHolidayIap',
                        payUrl: opt.url || ''
                    }
                })
            },

            getTitle: function (opt) {
                if (typeof(opt) !== 'object') return;

                Invoker.use('getTitle', {
                    param: {
                        title: opt.title || ''
                    }
                })
            },
            getActServerTime: function (callback) {
                Invoker.use('getActServerTime', {
                    onsuccess: callback
                })
            },
            getCurrentActInfo: function (callback) {
                Invoker.use('getCurrentActInfo', {
                    onsuccess: callback
                })
            },
            winViaNativeChannel: function (callback) {
                Invoker.use('winViaNativeChannel', {
                    onsuccess: callback
                })
            }
        }

    //暴露给全局
    _w.ImgotvApi = IA

    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            define(function () {
                return IA;
            });
        } else if (define.cmd) {
            define(function (require, exports, module) {
                module.exports = IA;
            });
        }
    }

})(window);
