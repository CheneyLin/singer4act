
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

(function () {

    var pageCount = 1;
    var DEVICEINFO = '';
    var USERINFO = '';
    var TERMLIST = [];
    var STARINFO;
    var PDATA;
    var STARID; // 明星 id
    // var DEVICEINFO = {"appVersion":"4.5.2","channel":"mgtv","device":"MX4 Pro","mac":"i866002023160087","osType":"android","osVersion":"4.4.4","ticket":""};
    // var USERINFO = {"uid":5,"avatar":"http://wx.qlogo.cn/mmopen/PiajxSqBRaEJZ5UatEEsKT4fFo5jO5sE3tpooxS7zNAN8Qa4icwJibiaWegwLTu9vuBSLHiaqWxDrwUrgMWvL2Eu3lsmM3LFqBJHYibcMDxUWh4h8/132","ticket":"3427OF1VXBHIVYHZC101","isValidated":1,"vipExpiretime":"","isRenew":0,"birthday":"","gender":1,"vipInfo":{"vipDescImg":"http://attach.hunantv.com/i/20141124/i5472ca1e842f4.png","showVipIcon":1,"vipIcon":"http://attach.hunantv.com/i/20150413/i552b8d8e8b5da.png","notVipIcon":"","vipDescUrl":"http://mobile.api.hunantv.com/help/vip.html","showVipDesc":0},"nickname":"Jankerli21921","uuid":"5cb9b48723d78ab32b588a422e0f9c6c","isVip":0};

    var MG = {
        init: function () {

            if ( UA.isImgotv && !Utils.checkAppVersion() ) {
                window.location.href = 'http://www.hunantv.com/v/m/v/2015/mupdate/?from=wsgstg';
                return;
            }

            var _this = this;
            var qs = Utils.parseQuery();
            if (qs) {
                STARID = qs.star_id;

                for (var i in mdata) {
                    if (STARID == i) {
                        PDATA = mdata[i];
                        PDATA.star_id = STARID;
                        console.log(PDATA);
                    }
                }
            }

            this.render();
            this.getStarDetail();

            if ( UA.isImgotv && !Utils.checkAppVersion() ) {
                Utils.downloadApp();
                return;
            }

            ImgotvApi.getDeviceInfo(function(data) {
                if ( data ) {
                    DEVICEINFO = JSON.parse(data);
                }
            });

            ImgotvApi.getUserInfo(function(data) {
                if ( data ) {
                    USERINFO = JSON.parse(data);
                    // _this.isBandPhone();
                    _this.getStarDetail();
                }
            });

            this.getTermList();

            //this.setIntroHeight();
            //this.getComments();
            this.bindEvents();
        },

        render: function () {
            $('.star-name').html(PDATA.person_info.name);
            $('.star-info').html(PDATA.person_info.info);

            // header
            if ( UA.isImgotv ) {
                var tpl = '<div class="thumbnail"> \
                                    <img src="'+ PDATA['person_info']['img'] +'" alt=""> \
                            </div>';
                $('.video').html(tpl);
            } else {

                if ( PDATA.person_info.vid == 0 ) {
                    var tpl = '<div class="thumbnail"> \
                                    <img src="'+ PDATA['person_info']['img'] +'" alt=""> \
                            </div>';
                    $('.video').html(tpl);
                } else {
                    this.getVideo();
                }

            }

            // 直播回顾
            var tpl = '';
            PDATA['live_pics'] = PDATA['live_pics'].reverse();
            for (var i = 0; ; i++) {
                if (!PDATA['live_pics'][i]) break;

                tpl += '<div class="swiper-slide"> \
                            <div class="bd"> \
                                <a href="imgotv://player?videoId='+ PDATA['live_pics'][i]['vid'] +'"> \
                                    <img src="'+ PDATA['live_pics'][i]['img'] +'" alt=""> \
                                    <img class="icon-play" src="http://i5.hunantv.com/s1/2015/mwsgssltg//images/icon-play.png" alt=""> \
                                    <div class="title">'+ PDATA['live_pics'][i]['title'] +'</div> \
                                </a> \
                            </div> \
                        </div>';
            }
            $('.js-zbhg-list').html(tpl);
            if (PDATA['live_pics'].length == 0) {
                $('.zbhg, .grfb').addClass('hide');
            }

            // 踢馆冲刺中
            var tpl = '';
            PDATA['live_tgcc'] = PDATA['live_tgcc'].reverse();
            for (var i = 0; i < 4; i++) {
                if (!PDATA['live_tgcc'][i]) break;

                tpl += '<li> \
                            <a href="imgotv://player?videoId='+ PDATA['live_tgcc'][i]['vid'] +'"> \
                                <div class="pic" style="background: url('+ PDATA['live_tgcc'][i]['img'] +') no-repeat; background-size: 100% 100%;"> \
                                    <img class="hidden" src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/default-normal.png" alt=""> \
                                </div> \
                                <div class="title"> \
                                    <p>'+ PDATA['live_tgcc'][i]['title'] +'</p> \
                                </div> \
                            </a> \
                        </li>';
            }
            $('.js-tgccz-list').html(tpl);
            if (PDATA['live_tgcc'].length == 0) $('.live-tgcc').addClass('hide');

            // 歌手的日常
            var tpl = '';
            PDATA['live_gsdrc'] = PDATA['live_gsdrc'].reverse();
            for (var i = 0; i < 4; i++) {
                if (!PDATA['live_gsdrc'][i]) break;

                tpl += '<li> \
                            <a href="imgotv://player?videoId='+ PDATA['live_gsdrc'][i]['vid'] +'"> \
                                <div class="pic" style="background: url('+ PDATA['live_gsdrc'][i]['img'] +') no-repeat; background-size: 100% 100%;"> \
                                    <img class="hidden" src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/default-normal.png" alt=""> \
                                </div> \
                                <div class="title"> \
                                    <p>'+ PDATA['live_gsdrc'][i]['title'] +'</p> \
                                </div> \
                            </a> \
                        </li>';
            }
            $('.js-gsdrc-list').html(tpl);
            if (PDATA['live_gsdrc'].length == 0) $('.live-gsdrc').addClass('hide');

            // liveshow
            var tpl = '';
            PDATA['live_show'] = PDATA['live_show'].reverse();
            for (var i = 0; i < 4; i++) {
                if (!PDATA['live_show'][i]) break;

                tpl += '<li> \
                            <a href="imgotv://player?videoId='+ PDATA['live_show'][i]['vid'] +'"> \
                                <div class="pic" style="background: url('+ PDATA['live_show'][i]['img'] +') no-repeat; background-size: 100% 100%;"> \
                                    <img class="hidden" src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/default-normal.png" alt=""> \
                                </div> \
                                <div class="title"> \
                                    <p>'+ PDATA['live_show'][i]['title'] +'</p> \
                                </div> \
                            </a> \
                        </li>';
            }
            $('.js-liveshow-list').html(tpl);
            if (PDATA['live_show'].length == 0) $('.live-show').addClass('hide');

            // 精选视频
            var tpl = '';
            PDATA['live_video'] = PDATA['live_video'].reverse();
            for (var i = 0; i < 4; i++) {
                if (!PDATA['live_video'][i]) break;

                tpl += '<li> \
                            <a href="imgotv://player?videoId='+ PDATA['live_video'][i]['vid'] +'"> \
                                <div class="pic" style="background: url('+ PDATA['live_video'][i]['img'] +') no-repeat; background-size: 100% 100%;"> \
                                    <img class="hidden" src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/default-normal.png" alt=""> \
                                </div> \
                                <div class="title"> \
                                    <p>'+ PDATA['live_video'][i]['title'] +'</p> \
                                </div> \
                            </a> \
                        </li>';
            }
            $('.js-jxsp-list').html(tpl);
            if (PDATA['live_video'].length == 0) $('.jxsp').addClass('hide');

            // TA的音乐
            var tpl = '';
            PDATA['live_music'] = PDATA['live_music'].reverse();
            for (var i = 0; i < 4; i++) {
                if (!PDATA['live_music'][i]) break;

                tpl += '<li> \
                            <a href="imgotv://player?videoId='+ PDATA['live_music'][i]['vid'] +'"> \
                                <div class="pic" style="background: url('+ PDATA['live_music'][i]['img'] +') no-repeat; background-size: 100% 100%;"> \
                                    <img class="hidden" src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/default-normal.png" alt=""> \
                                </div> \
                                <div class="title"> \
                                    <p>'+ PDATA['live_music'][i]['title'] +'</p> \
                                </div> \
                            </a> \
                        </li>';
            }
            $('.js-live-music-list').html(tpl);
            if (PDATA['live_music'].length == 0) $('.tdyy').addClass('hide');

            // 同类型歌手推荐
            var tpl = '';
            PDATA['live_tlxgs'] = PDATA['live_tlxgs'].reverse();
            for (var i = 0; i < 4; i++) {
                if (!PDATA['live_tlxgs'][i]) break;

                tpl += '<li> \
                            <a href="imgotv://player?videoId='+ PDATA['live_tlxgs'][i]['vid'] +'"> \
                                <div class="pic" style="background: url('+ PDATA['live_tlxgs'][i]['img'] +') no-repeat; background-size: 100% 100%;"> \
                                    <img class="hidden" src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/default-normal.png" alt=""> \
                                </div> \
                                <div class="title"> \
                                    <p>'+ PDATA['live_tlxgs'][i]['title'] +'</p> \
                                </div> \
                            </a> \
                        </li>';
            }
            $('.js-tlgs-list').html(tpl);
            if (PDATA['live_tlxgs'].length == 0) $('.tlxgs').addClass('hide');

            // TA 的图片
            var tpl = '';
            for (var i = 0; ; i++) {
                if (!PDATA['live_photo'][i]) break;

                tpl += '<li> \
                            <div data-pid="'+ (i+1) +'" class="pic"> \
                                <img src="'+ PDATA['live_photo'][i]['img1'] +'" alt=""> \
                            </div> \
                        </li>';
            }
            $('.js-live-photo1').html(tpl);
            if (PDATA['live_photo'].length == 0) $('.tdtp').addClass('hide');

            // TA 的图片2
            var tpl = '';
            for (var i = 0; ; i++) {
                if (!PDATA['live_photo'][i]) break;

                tpl += '<div class="swiper-slide"> \
                            <img src="'+ PDATA['live_photo'][i]['img2'] +'" alt=""> \
                        </div>';
            }
            $('.js-live-photo2').html(tpl);
        },

        initSlider: function () {
            if (PDATA['live_pics'].length <= 1) return;

            new Swiper('.zbhg-swiper-container', {
                autoplay: 4000,
                pagination: '.zbhg-swiper-container .swiper-pagination',
                loop: true
            });
        },

        getStarDetail: function () {
            setTimeout(function () {
                if (STARID == 7) {

                    ImgotvApi.showShareMenus({
                        title: '《我是歌手》终极踢馆歌手金志文个人小站',
                        shareUrl: 'http://i5.hunantv.com/s1/2015/mwsgssltg/share.html?star_id=' + STARID,
                        shareIcon: PDATA.person_info.img
                    });

                } else {

                    ImgotvApi.showShareMenus({
                        title: '《我是歌手 谁来踢馆》'+ PDATA.person_info.name +'的个人小站-芒果tv',
                        shareUrl: 'http://i5.hunantv.com/s1/2015/mwsgssltg/share.html?star_id=' + STARID,
                        shareIcon: PDATA.person_info.img
                    });

                }
            }, 2000);
        },

        isBandPhone: function () {
            Api.isBandPhone({
                ticket: USERINFO.ticket,
                uuid: USERINFO.uuid
            }, function (respData) {
                USERINFO.is_band = respData.data.status;
            });
        },

        getVideo: function () {

            Api.get('http://m.api.hunantv.com/video/getbyid/', {videoId: PDATA.person_info.vid}, function (respData) {
                var videoInfo = respData.data;
                var canPlayM3U8 = !!document.createElement('video').canPlayType('application/x-mpegURL');
                var videoUrl = canPlayM3U8 ? (videoInfo.m3u8Url[1] ? videoInfo.m3u8Url[1] : videoInfo.m3u8Url[0] ) : (videoInfo.mp4Url[1] ? videoInfo.mp4Url[1] : videoInfo.mp4Url[0]);

                Api.get(videoUrl, {}, function (respData) {
                    var ele = '<video id="mgo-player" preload="auto" controls="controls" width="100%" height="100%" poster="'+ videoInfo.detail.image +'" src="'+ respData.info +'" webkit-playsinline></video>';
                    $('.video').html(ele);
                });
            });
        },

        setIntroHeight: function () {
            setTimeout(function () {
                var h = $('.js-singer-info').height();
                if (h > 40) {
                    $('.js-singer-info').css('display', '-webkit-box');
                    $('.js-btn-expand').removeClass('hidden');
                }
            }, 300);
        },

        showPopupBindPhone: function () {
            var popup = $('.js-popup-yycg');

            popup.find('.ret2 span').html(STARINFO.number);
            popup.removeClass('hide');
        },

        showPopupSubmitSucc: function () {
            $('.js-popup-yycg').addClass('hide');
            $('.js-popup-tjcg').removeClass('hide');
        },

        bindEvents: function () {
            var _this = this;

            $('.js-jump-list').on('click', function (e) {
                e.preventDefault();

                var type = $(this).data('type');
                var link = $(this).attr('href');
                console.log(type);
                var url = link + '?type='+ type +'&star_id=' + STARID;
                if (UA.isImgotv) {
                    Utils.jumpPage(url);
                } else {
                    window.location.href = url;
                }
            });

            $('.js-popup-yycg').on('click', '.btn-close', function () {
                $('.js-popup-yycg').addClass('hide');
            });

            $('.js-popup-tjcg').on('click', '.btn-close', function () {
                $('.js-popup-tjcg').addClass('hide');
            });

            // 提交手机号码
            $('.js-popup-yycg').on('click', '.btn-tj', function () {
                var phone = $('.phone').val();

                if (!phone) {
                    Utils.showToast('手机号码不能为空！');
                    return;
                }

                if (phone.length != 11) {
                    Utils.showToast('手机号码格式不对！');
                    return;
                }

                Api.bandPhone({
                    ticket: USERINFO.ticket,
                    uuid: USERINFO.uuid,
                    mobile: phone,
                    star_id: STARINFO.star_id
                }, function (respData) {
                    USERINFO.is_band = 1;
                    _this.showPopupSubmitSucc();
                    $('.js-btn-yyt').addClass('btn-yyy').removeClass('btn-yyt').html('已预约');
                    _czc.push(﻿["_trackEvent", '提交次数', 'ok']);
                });
            });

            // 显示分享浮层
            $('.js-popup-tjcg').on('click', '.btn-fx', function () {
                $('.mg-share').show();
            });

            // 隐藏分享浮层
            $('.mg-share').on('click', function () {
                $('.mg-share').hide();
            });

            $('.word').on('focus', function () {

                if (!USERINFO) {
                    console.log('未登录');
                    ImgotvApi.login(function(data) {
                        window.location.reload();
                    });
                    return;
                }

            });

            // 预约 ta
            $('.js-btn-yyt').on('click', function () {
                if ( $(this).hasClass('btn-yyy') ) return;

                if (!USERINFO) {
                    console.log('未登录');
                    ImgotvApi.login(function(data) {
                        window.location.reload();
                    });
                    return;
                }

                Api.bookStar({
                    ticket: USERINFO.ticket,
                    uuid: USERINFO.uuid,
                    star_id: STARID
                }, function () {
                    $('.js-btn-yyt').addClass('btn-yyy').removeClass('btn-yyt').html('已预约');

                    ImgotvApi.showShareMenus({
                        title: '大家好，我是'+ STARINFO.name +'，我正在参加《我是歌手，谁来踢馆》挑战赛，赶紧来预约我的live show吧 - 芒果TV',
                        shareUrl: 'http://i5.hunantv.com/s1/2015/mwsgssltg/yuyue.html?star_id=' + STARINFO.star_id,
                        shareIcon: STARINFO.pc_avatar_key
                    });
                });

                if (USERINFO.is_band) {
                    // 已绑定手机
                } else {
                    // 未绑定手机，显示绑定手机号码的弹窗
                    _this.showPopupBindPhone();
                }

            });

            $('.js-tdtp').on('click', '.pic', function () {
                var pid = $(this).data('pid');

                $('.js-tdtpd').removeClass('hide');

                var swiper = new Swiper('.tdtpd-swiper-container', {
                    preventLinksPropagation : false,
                    pagination: '.tdtpd-swiper-container .swiper-pagination',
                    autoplay: 4000,
                    loop: true
                });

                swiper.slideTo(pid);
            });

            $('.js-tdtpd').on('click', function () {
                $('.js-tdtpd').addClass('hide');
            });

            // 展开更多
            $('.js-btn-expand').on('click', function () {
                $(this).toggleClass('active');

                var hasClass = $(this).hasClass('active');

                if (hasClass) {
                    $(this).find('span').html('缩起');
                    $('.js-singer-info').attr('style', '');
                } else {
                    $(this).find('span').html('展开');
                    $('.js-singer-info').css('display', '-webkit-box');
                }

            });

            // 点击加载更多评论
            $('.js-btn-load-comment').on('click', function () {
                pageCount++;
                _this.getComments();
            });

            // 点击添加评论
            $('.js-btn-add-comment').on('click', function () {
                _this.addComment();
            });

            // 赞评论
            $('.js-comment-list').on('click', '.like', function (e) {

                if (!USERINFO) {
                    console.log('未登录');
                    ImgotvApi.login(function(data) {
                        window.location.reload();
                    });
                    return;
                }

                var tagName = e.target.tagName.toLowerCase();
                var target = tagName == 'span' || tagName == 'img' || tagName == 'i' ? $(e.target).parent('.like') : $(e.target);
                var comment_id = target.data('cid');

                if (target.hasClass('locked')) return;

                $.ajax({
                    url: 'http://mobile.api.hunantv.com/comment/up',
                    data: {
                        commentId: comment_id,
                        ticket: USERINFO.ticket,
                        device: DEVICEINFO.device
                    },
                    dataType: 'jsonp',
                    success: function (respData) {
                        console.log('comment/up', respData);

                        if (respData.err_code == 200) {
                            target.addClass('locked');
                            var n = target.find('span').html();
                            target.find('span').html( parseInt(n) + 1 ).css('color', '#FDAD36');
                        } else {
                            Utils.showToast(respData.err_msg);
                        }
                    }
                });

            });
        },

        // 头像地址错误时使用默认头像
        loadAvatars: function () {
            $('.js-comment-list .avatar img').each(function (key, val) {
                var img = new Image();
                img.src = $(val).attr('src');
                img.onload = function () {

                };
                img.onerror = function () {
                    $(val).attr('src', 'http://i5.hunantv.com/s1/2015/qmjs/images/default-avatar.png');
                }
            });
        },

        // 获取评论
        getComments: function () {
            var _this = this;

            $.ajax({
                url: 'http://mobile.api.hunantv.com/comment/read',
                data: {
                    videoId: PDATA.person_info.comment_id,
                    type: 'hunantvtopic',
                    pageCount: pageCount
                },
                dataType: 'jsonp',
                success: function (respData) {
                    console.log('comment/read', respData);

                    if (respData.err_code == 200) {
                        var html = '';
                        var data = respData.data;

                        if (!data.length) {
                            $('.js-more').addClass('hide');
                            return;
                        }

                        if (pageCount == 1) {
                            $('.js-comment-list dd').remove();
                        }

                        for (var i in data) {
                            html += '<dd> \
                                        <div class="avatar"> \
                                            <img src="'+ data[i]['commentAvatar'] +'" alt=""> \
                                        </div> \
                                        <div class="info"> \
                                            <p class="name">'+ data[i]['commentBy'] +'</p> \
                                            <p class="cnt">'+ data[i]['comment'] +'</p> \
                                        </div> \
                                        <div class="like" data-cid="'+ data[i]['commentId'] +'"> \
                                            <span>'+ data[i]['up'] +'</span> <img src="http://i5.hunantv.com/s1/2015/mwsgssltg/images/icon-like.png" alt=""> \
                                        </div> \
                                    </dd>';
                        }

                        $('.js-comment-list').append(html);

                        _this.loadAvatars();
                    }
                }
            });
        },
        //取得全部数据
        getTermList: function () {
            Api.getTermList({
                ticket: USERINFO.ticket,
                uuid: USERINFO.uuid
            }, function (respData) {
                console.log(respData.data.list);
            });
        },
        // 添加评论
        addComment: function () {

            if (!USERINFO) {
                console.log('未登录');
                ImgotvApi.login(function(data) {
                    window.location.reload();
                });
                return;
            }

            var _this = this;
            var content = $('.word').val();

            if (!content) {
                Utils.showToast('内容不能为空！');
                return;
            }

            if (Utils.getByteLength(content) > 150) {
                Utils.showToast('内容不能超过150个字符');
                return;
            }

            $.ajax({
                url: 'http://mobile.api.hunantv.com/comment/write',
                data: {
                    videoId: PDATA.person_info.comment_id,
                    type: 'hunantvtopic',
                    content: content,
                    ticket: USERINFO.ticket,
                    device: DEVICEINFO.device
                },
                dataType: 'jsonp',
                success: function (respData) {
                    console.log('comment/write', respData);

                    if (respData.err_code == 200) {
                        pageCount = 1;
                        $('.word').val('');
                        _this.getComments();
                    } else {
                        Utils.showToast(respData.err_msg);
                    }
                }
            });

        }
    };

    MG.init();

})();
