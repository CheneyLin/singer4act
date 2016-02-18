
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
        },

        /**
         * 明星信息 ticket uuid star_id
         */
        getStarDetail: function (data, succCallback) {
            this.get(this.url + '/star/detail', data, succCallback);
        },

        /**
         * 对明星预约 ticket uuid star_id
         */
        bookStar: function (data, succCallback) {
            this.get(this.url + '/star/book', data, succCallback);
        },

        /**
         * 是否绑定手机 ticket uuid
         */
        isBandPhone: function (data, succCallback) {
            this.get(this.url + '/star/isBand', data, succCallback);
        },

        /**
         * 绑定手机 ticket uuid mobile star_id
         */
        bandPhone: function (data, succCallback) {
            this.get(this.url + '/star/band', data, succCallback);
        },

        /**
         * 场次明星 ticket uuid space_date
         */
        getSpaceStar: function (data, succCallback, errCallback) {
            this.get2(this.url + '/space/star', data, succCallback, errCallback);
        },

        /**
         * 场次明星分贝列表 ticket uuid space_date star_id
         */
        getSpaceStarList: function (data, succCallback) {
            this.get2(this.url + '/space/space_star', data, succCallback);
        },

        /**
         * 排行榜 ticket uuid
         */
        getSpaceTop: function (data, succCallback) {
            this.get2(this.url + '/space/top', data, succCallback);
        },

        /**
         * 送分贝 ticket uuid star_id number
         */
        spaceVote: function (data, succCallback) {
            this.get2('http://singer.vote.hunantv.com/vote.php', data, succCallback);
        },

        /**
         * 获取视频详情
         */
        getVideo: function (data, succCallback) {
            this.get2('http://m.api.hunantv.com/video/getbyid', {
                videoId: data.videoId
            }, succCallback);
        },

        /**
         * 获取机位数据
         */
        getSeat: function (succCallback) {
            this.get2(this.url + '/eight/seat', {}, succCallback);
        },

        /**
         * 获取首页数据
         */
        getLiveList: function (succCallback) {
            this.get2(this.url + '/eight/live_list', {}, succCallback);
        },

        /**
         * 当日PK明星
         *  ticket： 必须 客户端传递
            uuid： 必须，用户唯一标识码

            字段说明
            user_number： 用户分贝数
            stage： 轮次
            run_time： 抢分贝进行时间
            start_time： 抢分贝开始时间
            stage_status： 轮次状态 0 未开始 1 抢分贝 2 投分贝
         */
        getPKStar: function (data, succCallback) {
            this.get2(this.url + '/pk/star', data, succCallback);
        },

        /**
         * 明星pk列表
         */
        getPKList: function (succCallback) {
            this.get2(this.url + '/pk/list', {}, succCallback);
        },

        /**
         * 抢分贝
         *  字段说明
            is_grabed： 是否抢到 0 未抢到 1 抢到
            is_allow_grab: 是否允许抢 0 不允许 1 允许
            参数说明
            ticket： 必须 客户端传递
            uuid： 必须，用户唯一标识码
         */
        getFenbei: function (data, succCallback, errCallback) {
            this.get2(this.url + '/pk/grab', data, succCallback, errCallback);
        },

        /**
         * 投分贝
         *  参数说明
            ticket： 必须 客户端传递
            uuid： 必须，用户唯一标识码
            star_id: 明星ID
            number : 非必须，默认为1。 分贝数
            client : 必须 pc|mobile
         */
        voteFenbei: function (data, succCallback) {
            this.get2('http://singer.vote.hunantv.com/pk_vote.php', data, succCallback);
        },

        // 【第三阶段 partB】获取八位歌手
        getTopEight: function (succCallback, errCallback) {
            this.get2(this.url + '/eight/top', {}, succCallback, errCallback);

        },

        // 【第三阶段 partB】获取八位歌手 ticket uuid
        getStarEight: function (data, succCallback, errCallback) {
            this.get2(this.url + '/eight/star', data, succCallback, errCallback);
        },

        // 【第三阶段 partB】投票 ticket uuid star_id client number
        voteEight: function (data, succCallback, errCallback) {
            this.get2('http://singer.api.hunantv.com/eight_vote.php', data, succCallback, errCallback);
        },

        getEightSeat: function (succCallback, errCallback) {
            this.get2(this.url + '/eight/live_list', {}, succCallback, errCallback);
        },

        // 【总决赛】明星列表  ticket uuid
        getFinalStarList: function (data, succCallback, errCallback) {
            this.get2(this.url + '/finals/star', data, succCallback, errCallback);
        },

        // 【总决赛】明星Top
        getFinalStarTop: function (succCallback, errCallback) {
            this.get2(this.url + '/finals/top', {}, succCallback, errCallback);
        },

        // 【总决赛】抢分贝  ticket uuid
        getFinalGrab: function (data, succCallback, errCallback) {
            this.get2(this.url + '/finals/grab', data, succCallback, errCallback);
        },

        // 【总决赛】投分贝  ticket uuid star_id client
        voteFinal: function (data, succCallback, errCallback) {
            this.get2(this.url + '/finals_vote.php', data, succCallback, errCallback);
        }

    };

    window.Api = Api;

})();
