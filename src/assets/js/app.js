
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

(function () {

    var DEBUG = true;
    var DEVICEINFO = '';
    var USERINFO = '';
    var TERMLIST = [];
    var STARINFO;
    var APP_HALF=false;
    var PAGE_HEIGHT=$(window).height();
    var PAGE_TOP_OFFSET=0;
    // var DEVICEINFO = {"appVersion":"4.5.2","channel":"mgtv","device":"MX4 Pro","mac":"i866002023160087","osType":"android","osVersion":"4.4.4","ticket":""};
    // var USERINFO = {"uid":5,"avatar":"http://wx.qlogo.cn/mmopen/PiajxSqBRaEJZ5UatEEsKT4fFo5jO5sE3tpooxS7zNAN8Qa4icwJibiaWegwLTu9vuBSLHiaqWxDrwUrgMWvL2Eu3lsmM3LFqBJHYibcMDxUWh4h8/132","ticket":"3427OF1VXBHIVYHZC101","isValidated":1,"vipExpiretime":"","isRenew":0,"birthday":"","gender":1,"vipInfo":{"vipDescImg":"http://attach.hunantv.com/i/20141124/i5472ca1e842f4.png","showVipIcon":1,"vipIcon":"http://attach.hunantv.com/i/20150413/i552b8d8e8b5da.png","notVipIcon":"","vipDescUrl":"http://mobile.api.hunantv.com/help/vip.html","showVipDesc":0},"nickname":"Jankerli21921","uuid":"5cb9b48723d78ab32b588a422e0f9c6c","isVip":0};

    var MG = {
        init: function () {

            if ( UA.isImgotv && !Utils.checkAppVersion() ) {
                window.location.href = 'http://www.hunantv.com/v/m/v/2015/mupdate/?from=wsgstg';
                return;
            }
            //微信调整

            var qs = Utils.parseQuery();
            if (qs) {
                APP_HALF = (qs.h==='1');
            }

            if (!APP_HALF){
            //非半屏下调整布局参数
                PAGE_TOP_OFFSET=$(window).width()/16*9;
                PAGE_HEIGHT -= PAGE_TOP_OFFSET;

                $('.app-nav ul li.quit').hide();
            }

            var _this = this;

            ImgotvApi.getDeviceInfo(function(data) {
                if ( data ) {
                    DEVICEINFO = JSON.parse(data);
                }
            });

            ImgotvApi.getUserInfo(function(data) {
                if ( data ) {
                    USERINFO = JSON.parse(data);
                    //alert(USERINFO.uuid);
                    //alert(USERINFO.ticket);
                    // _this.isBandPhone();
                    //_this.getStarDetail();
                }
            });

            this.getTermList();

            //this.setIntroHeight();
            //this.getComments();
            //this.render();
            this.bindEvents();
        },
        goAlert:function(t){
            var _this = this;
            clearTimeout(_this.alertTimeout);
            $('.mg-toast p').html(t);
            $('.mg-toast').fadeIn();
            _this.alertTimeout=setTimeout("$('.mg-toast').fadeOut();",2000);
        },
        goCheckLogin:function(){
            var _this = this;
            if (!USERINFO) {
                if ( APP_HALF ) {
                    ImgotvApi.login(function(data) {
                        window.location.reload();
                    });
                }else {
                    _this.goAlert('请先登录芒果TV客户端');
                }
                return false;
            }else {
                return true;
            }
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

            $('.vote-nav img').on('click', function (e) {
                $('.page-vote').fadeOut();
            });
            $('.app-nav ul li.quit').on('click', function (e) {
                ImgotvApi.closeWebView();
            });


            // 隐藏分享浮层
            $('.mg-share').on('click', function () {
                $('.mg-share').hide();
            });


            $('.main-content-share img').on('click', function (e) {
                if (APP_HALF){
                    ImgotvApi.showShareMenus({
                        title: ShareData.title,
                        shareUrl: ShareData.link,
                        shareIcon: ShareData.imgUrl
                        });
                }else {
                    $('.mg-share').show();
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


        //取得全部数据
        getTermList: function () {
            var _this = this;
            Api.getTermList({
                ticket: USERINFO.ticket,
                uuid: USERINFO.uuid
            }, function (respData) {
                TERMLIST = respData.data.list;
                console.log(respData.data.list);
                _this.appRender();
                _this.appBind();
            });
        },
        //取得全部数据
        appRender: function () {
            setTimeout("$('.page-loading').fadeOut();",1000);
            $('.page-app').css('margin-top',PAGE_TOP_OFFSET+'px');
            $('.page-vote').css('margin-top',PAGE_TOP_OFFSET+'px');
            $('.main-menu').height(PAGE_HEIGHT-$('.nav').height());
            for(var i=0;i<TERMLIST.length;i++){
                $('.main-menu ul').append('<li><h1>'+(i+1)+'</h1><h2>期</h2></li>')
            }
            $('.main-menu ul li:last-child').addClass('active');
            $('.main-menu').scrollTop($('.main-menu').height());

            $('.main-content').width($(window).width()-$('.main-menu').width());
            $('.main-content').height(PAGE_HEIGHT-$('.nav').height());
            for(var i=0;i<TERMLIST.length;i++){
                var content = '';
                var data=TERMLIST[i];
                var maxValue=10;

                if(i==TERMLIST.length-1){

                    for(var j=0;j<data.length;j++){
                        if(parseFloat(data[j].like_star_number)>maxValue){
                            maxValue = parseFloat(data[j].like_star_number)+1;
                        }
                    }


                    content = '<li><h1>谁是本周第一名？</h1><div class="content-list1 clearfix" style="height:'+($('.main-content').height()-80)+'px;"><ul>';

                    for(var j=0;j<data.length;j++){
                        content+='<li class="content-voteli clearfix" data-sortvalue="'+data[j].like_star_number+'" data-index="'+i+'" data-index2="'+j+'">';
                        content+='<img class="avatar" src="'+data[j].pc_avatar_key+'">';
                        content+='<h1>'+data[j].name+'</h1>';
                        content+='<h2><img class="icon" src="assets/images/icon_uncheck.png">'+data[j].like_star_number+'</h2>';
                        content+='<h3><div class="barbg"></div>';
                        content+='<div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_star_number)/maxValue*80))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div></li>';
                }else {

                    for(var j=0;j<data.length;j++){
                        if(parseFloat(data[j].like_music_number)>maxValue){
                            maxValue = parseFloat(data[j].like_music_number)+1;
                        }
                    }
                    content = '<li class="content-term content-term-'+i+'"><h2 class="active" data-index="'+i+'">网友人气榜</h2><h3 data-index="'+i+'">本轮竞演排名</h3>';
                    content+='<div class="content-list1 clearfix" style="height:'+($('.main-content').height()-80)+'px;"><ul>';
                    for(var j=0;j<data.length;j++){
                        content+='<li class="content-voteli clearfix" data-sortvalue="'+data[j].like_music_number+'" data-index="'+i+'" data-index2="'+j+'">';
                        content+='<img class="avatar" src="'+data[j].pc_avatar_key+'">';
                        content+='<h1>'+data[j].name+'<img class="icon"  src="assets/images/icon_song.png">'+data[j].music+'</h1>';
                        content+='<h2><img class="icon"  src="assets/images/icon_uncheck.png">'+data[j].like_music_number+'</h2>';
                        content+='<h3><div class="barbg"></div><div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_music_number)/maxValue*80))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div>';
                    content+='<div class="content-list2 clearfix" style="height:'+($('.main-content').height()-80)+'px;display:none;"><ul>';
                    for(var j=0;j<data.length;j++){
                        content+='<li class="-cancel-content-voteli clearfix" data-rank="'+data[j].rank+'">';
                        content+='<img class="avatar" src="'+data[j].pc_avatar_key+'">';
                        content+='<h1>'+data[j].name+'</h1>';
                        //content+='<h2>'+data[j].like_star_number+'</h2>';
                        //content+='<h3><div class="barbg"></div><div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_star_number)/maxValue*0.8))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div>';
                    content+='</li>'
                }
                $('.main-content>ul').append(content);
            }
            $('.main-content>ul>li:last-child').show();

            $('.vote-main').height(PAGE_HEIGHT-$('.nav').height());
        },
        // 绑定事件
        appBind: function () {
            var _this = this;

            // 期数切换
            $('.main-menu ul li').on('click', '', function () {
                var termIndex = $(this).index();
                $('.main-menu ul li').removeClass('active');
                $('.main-menu ul li:nth-child('+(termIndex+1)+')').addClass('active');
                $('.main-content>ul>li').hide();
                $('.main-content>ul>li:nth-child('+(termIndex+1)+')').show();

                //var termData = TERMLIST[termIndex];
                //console.log(termData)
            });
            // 投票
            $('.main-content li').on('click', '.content-voteli', function () {
                var i = $(this).data('index');
                var j = $(this).data('index2');
                var data = TERMLIST[i][j];
                //console.log(data);
                _this.showVotePage(data);
            });
            //歌曲投票和竞演排行切换
            $('.content-term').on('click', 'h2', function () {
                var i = $(this).data('index');
                $('.content-term-'+i+' h2').addClass('active');
                $('.content-term-'+i+' h3').removeClass('active');
                $('.content-term-'+i+' .content-list1').show();
                $('.content-term-'+i+' .content-list2').hide();

            });
            $('.content-term').on('click', 'h3', function () {
                var i = $(this).data('index');
                $('.content-term-'+i+' h3').addClass('active');
                $('.content-term-'+i+' h2').removeClass('active');
                $('.content-term-'+i+' .content-list2').show();
                $('.content-term-'+i+' .content-list1').hide();

            });

        },
        // 投票pop
        showVotePage: function (data) {
            var _this = this;

            if(data.is_end==0){

                var content='';
                content+='<h1>'+data.name+'</h1>';
                content+='<img class="avatar" src="'+data.pc_avatar_key+'">';
                content+='<h2><img class="icon"  src="assets/images/icon_uncheck.png"><span>'+data.like_star_number+'</span></h2>';
                content+='<h3><div><img class="btnvote1" src="assets/images/btn_vote1.png"></div><div><img class="btnvote2" src="assets/images/btn_vote2.png"></div></h3>';
                $('.vote-main').html(content);
                $('.page-vote').show();

                // 投票 6a30ccf62c399d605151dc022796721e X435J77VHPUVXVYXDB8B
                $('.btnvote1').on('click', '', function () {
                    $(this).addClass('active');
                    if(_this.goCheckLogin()){
                        Api.getTermLike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert('请不要重复投票');
                            }else {
                                $('.vote-main h2 span').html(parseFloat($('.vote-main h2 span').html())+1);
                                _this.goAlert('操作成功');
                            }
                        });
                        //setTimeout("$('.page-vote').hide();",2000);
                    }
                });
                // 取消
                $('.btnvote2').on('click', '', function () {
                    $(this).addClass('active');
                    setTimeout("$('.page-vote').hide();",500);
                    //_this.goAlert('请不要重复投票');
                    //$('.page-vote').hide();
                });
            }else {

                var content='';
                content+='<h1>'+data.name+'</h1>';
                content+='<h2><img class="icon"  src="assets/images/icon_song.png">'+data.music+'</h2>';
                content+='<img class="avatar" src="'+data.pc_avatar_key+'">';
                content+='<h4><div><img class="btnvote1" src="assets/images/btn_vote1.png"><span>'+data.like_music_number+'</span></div><div><img class="btnvote3" src="assets/images/btn_vote3.png"><span>'+data.unlike_music_number+'</span></div></h4>';
                $('.vote-main').html(content);
                $('.page-vote').show();

                // 投票 6a30ccf62c399d605151dc022796721e X435J77VHPUVXVYXDB8B
                $('.btnvote1').on('click', '', function () {
                    $(this).addClass('active');
                    if(_this.goCheckLogin()){
                        Api.getTermLike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert('请不要重复投票');
                            }else {
                                $('.vote-main h4 div:first-child span').html(parseFloat($('.vote-main h4 div:first-child span').html())+1);
                                _this.goAlert('操作成功');
                            }
                        });
                        //setTimeout("$('.page-vote').hide();",2000);
                    }
                });
                // 取消
                $('.btnvote3').on('click', '', function () {
                    $(this).addClass('active');
                    if(_this.goCheckLogin()){
                        Api.getTermUnlike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert('请不要重复投票');
                            }else {
                                $('.vote-main h4 div:last-child span').html(parseFloat($('.vote-main h4 div:last-child span').html())+1);
                                _this.goAlert('操作成功');
                            }
                        });
                        //setTimeout("$('.page-vote').hide();",2000);
                    }
                });
            }

        },
        //结束标记
        end: function(){

        }
    };

    MG.init();

})();
