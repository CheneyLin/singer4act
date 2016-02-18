
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);

(function () {
    const COOKIE_TAG = 'singer4act_';
    const PROMPT_SUCCESS = '投票成功，谢谢你的参与';
    const PROMPT_REPEATE = '你已经投过啦，下次再来哈';

    var DEBUG = true;
    var APP_HALF=false;
    var APP_LOGIN_NEED=false;
    var PAGE_HEIGHT=$(window).height();
    var PAGE_TOP_OFFSET=0;

    var DEVICEINFO = '';
    var USERINFO = '';

    var TERMLIST = [];


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



        bindEvents: function () {
            var _this = this;

            $('.vote-nav img').on('click', function (e) {
                $('.page-vote').hide();
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
            setTimeout("$('.page-loading').fadeOut('fast');",2000);

            $('.app-nav .title').html(CustomData.titleApp);

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

                if(data[0].is_end==0){

                    for(var j=0;j<data.length;j++){
                        if(parseFloat(data[j].like_star_number)>maxValue){
                            maxValue = parseFloat(data[j].like_star_number)+1;
                        }
                    }


                    content = '<li><h1>'+CustomData.titleLastPage+'</h1><div class="content-list1 clearfix" style="height:'+($('.main-content').height()-80)+'px;"><ul>';

                    for(var j=0;j<data.length;j++){
                        content+='<li class="content-voteli clearfix" data-sortvalue="'+data[j].like_star_number+'" data-index="'+i+'" data-index2="'+j+'">';
                        content+='<img class="avatar" src="'+data[j].pc_avatar_key+'">';
                        content+='<h1>'+data[j].name+'</h1>';
                        //content+='<h2><span id="check_'+data.term_id+'"><img class="icon" src="assets/images/icon_uncheck.png"></span>'+data[j].like_star_number+'</h2>';
                        content+='<h2><span class="content-check" id="check_'+data[j].term_id+'"></span>'+data[j].like_star_number+'</h2>';
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
                        content+='<h2><span class="content-check" id="check_'+data[j].term_id+'"></span>'+data[j].like_music_number+'</h2>';
                        content+='<h3><div class="barbg"></div><div class="barshow" style="width:'+(Math.floor(parseFloat(data[j].like_music_number)/maxValue*80))+'%"></div></h3>';
                        content+='</li>';
                    }
                    content+='</ul></div>';
                    content+='<div class="content-list2 clearfix" style="height:'+($('.main-content').height()-80)+'px;display:none;"><ul>';
                    for(var j=0;j<data.length;j++){
                        if(j==4&&data.length==7){
                            content+='<li class="-cancel-content-voteli clearfix cols3offset" data-rank="'+data[j].rank+'">';
                        }
                        else {
                            content+='<li class="-cancel-content-voteli clearfix" data-rank="'+data[j].rank+'">';
                        }
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

				//tinysort.defaults.order = 'asc';
				tinysort.defaults.attr = 'data-rank';
				tinysort('.main-content>ul li:nth-child('+(i+1)+') .content-list2 ul li');

                var lastCheck=Utils.getCookie(COOKIE_TAG+data[0].id);
                $('#check_'+lastCheck).removeClass('content-check').addClass('content-check-active');
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
                    var goVote=function(){
                        Api.getTermLike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert(PROMPT_REPEATE);
                            }else {
                                $('.vote-main h2 span').html(parseFloat($('.vote-main h2 span').html())+1);
                                Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                                $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                                _this.goAlert(PROMPT_SUCCESS);
                            }
                        });
                    };
                    var goVoteGuest = function(){
                        var lastCheck=Utils.getCookie(COOKIE_TAG+data.id);
                        if(lastCheck==null){
                            $('.vote-main h2 span').html(parseFloat($('.vote-main h2 span').html())+1);
                            Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                            $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                            _this.goAlert(PROMPT_SUCCESS);
                        }else {
                            _this.goAlert(PROMPT_REPEATE);
                        }
                    };
                    $(this).addClass('active');
                    if(!USERINFO){
                        if(APP_LOGIN_NEED){
                            if(_this.goCheckLogin()){
                                goVote();
                            }
                        }else {
                            goVoteGuest();
                        }
                    }else {
                        goVote();
                    }
                });
                // 取消
                $('.btnvote2').on('click', '', function () {
                    //$(this).addClass('active');
                    //setTimeout("$('.page-vote').hide();",200);
                    $('.page-vote').hide();
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

                    var goVote=function(){
                        Api.getTermLike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert(PROMPT_REPEATE);
                            }else {
                                $('.vote-main h4 div:first-child span').html(parseFloat($('.vote-main h4 div:first-child span').html())+1);
                                Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                                $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                                _this.goAlert(PROMPT_SUCCESS);
                            }
                        });
                    };
                    var goVoteGuest = function(){
                        var lastCheck=Utils.getCookie(COOKIE_TAG+data.id);
                        if(lastCheck==null){
                            $('.vote-main h4 div:first-child span').html(parseFloat($('.vote-main h4 div:first-child span').html())+1);
                            Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                            $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                            _this.goAlert(PROMPT_SUCCESS);
                        }else {
                            _this.goAlert(PROMPT_REPEATE);
                        }
                    };
                    $(this).addClass('active');

                    if(!USERINFO){
                        if(APP_LOGIN_NEED){
                            if(_this.goCheckLogin()){
                                goVote();
                            }
                        }else {
                            goVoteGuest();
                        }
                    }else {
                        goVote();
                    }
                });
                // 取消
                $('.btnvote3').on('click', '', function () {
                    var goVote=function(){
                        Api.getTermUnlike({
                            term_id: data.term_id,
                            ticket: USERINFO.ticket,
                            uuid: USERINFO.uuid
                        }, function (respData) {
                            if(respData.code==400){
                                _this.goAlert(PROMPT_REPEATE);
                            }else {
                                $('.vote-main h4 div:last-child span').html(parseFloat($('.vote-main h4 div:last-child span').html())+1);
                                Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                                $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                                _this.goAlert(PROMPT_SUCCESS);
                            }
                        });
                    };
                    var goVoteGuest = function(){
                        var lastCheck=Utils.getCookie(COOKIE_TAG+data.id);
                        if(lastCheck==null){
                            $('.vote-main h4 div:last-child span').html(parseFloat($('.vote-main h4 div:last-child span').html())+1);
                            Utils.setCookie(COOKIE_TAG+data.id,data.term_id,1/24);
                            $('#check_'+data.term_id).removeClass('content-check').addClass('content-check-active');
                            _this.goAlert(PROMPT_SUCCESS);
                        }else {
                            _this.goAlert(PROMPT_REPEATE);
                        }
                    };
                    $(this).addClass('active');
                    if(!USERINFO){
                        if(APP_LOGIN_NEED){
                            if(_this.goCheckLogin()){
                                goVote();
                            }
                        }else {
                            goVoteGuest();
                        }
                    }else {
                        goVote();
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
