
(function () {

    var Api = {

        url: 'http://singer.api.hunantv.com',

        get: function (url, data, succCallback) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'jsonp',
                success: function (respData) {
                    console.log(url, respData);
                    if (respData.code == 200 || respData.err_code == 200 || respData.code == 400 || respData.code == 403 || respData.status == 'ok') {
                        succCallback(respData);
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    Utils.showToast('网络异常，请刷新重试！');
                    // _czc.push(﻿["_trackEvent", '接口错误', url]);
                },
                timeout: 5000
            });
        },

        get2: function (url, data, succCallback, errCallback) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'jsonp',
                success: function (respData) {
                    console.log(url, respData);
                    if (typeof succCallback === 'function') succCallback(respData);
                }.bind(this),
                error: function (xhr, status, err) {
                    Utils.showToast('网络异常，请刷新重试！');
                    console.log(url);
                    //_czc.push(﻿["_trackEvent", '接口错误', url]);
                    if (typeof errCallback === 'function') errCallback();
                },
                timeout: 5000
            });
        },

        /**
         * 投票列表
         */
        getTermList: function (data, succCallback) {
            this.get(this.url + '/term/list', data, succCallback);
        },
        /**
         * 投票 term_id ticket uuid
         */
        getTermLike: function (data, succCallback) {
            this.get(this.url + '/term/like', data, succCallback);
        },

        /**
         * 投票2 term_id ticket uuid
         */
        getTermUnlike: function (data, succCallback) {
            this.get(this.url + '/term/unlike', data, succCallback);
        }

    };

    window.Api = Api;

})();
