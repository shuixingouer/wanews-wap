
(function(gg,$){
    gg.controller('cDetail',['vUser','vChannel',function(vUser,vChannel){
        var type = gg.util.getUrlParam().type;
        var ids = gg.util.getUrlParam().id;
        //var idLi = gg.util.getUrlParam().idLi;
        var waNews =encodeURIComponent(window.location.href) ;
        sessionStorage.setItem("waNews",waNews);
        var recommend=[];

            if(type==0) {

                    vChannel.getStaticDetails({id: ids}, function (res) {
                        var author = res.data.author;
                        var body = res.data.body;
                        var name = res.data.channel.channelName.replace(/\s/g,'');
                        var id = res.data.id;
                        var publishTime = res.data.publishTime;
                        var title = res.data.title;
                        var webName = res.data.webName;
                        var type = res.data.type;
                        var images = res.data.images;
                        var logo = res.data.logoUrl;
                        var srcUrl = res.data.srcUrl;
                        var cooperateStatus = res.data.cooperateStatus;
                        var html = "";
                        if (images.length > 0) {
                            for (var t = images.length - 1; t >= 0; t--) {
                                body = body.replace('tdnews://img' + t, images[t]?('<img src="' + images[t].imageUrl + '"/>'):'');
                            }
                        }
                        html="<div class ='bottomBanner'>";
                        html+= " <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a>";
                        html+="</div>";
                        html += " <div class='innerTop'>" +
                                    "<div class='back'>" +
                                         "<a href='main.html'>" +
                                              "<img src='../image/back.png'/>" +
                                         "</a>"+
                                     "</div>"+
                                    "<a href='initial.html?srcUrl=" +encodeURIComponent(srcUrl)+ "&type=" +type+ "&id=" +id+ "&cooperateStatus=" +cooperateStatus+ "'>"+
                                         "<img class='inner' src='../image/original.png'/>"+
                                     "</a>"+
                                "</div>" +
                                "<div class='center'>";

                        html += "<div class='content'>";
                        html += " <div class='innerUp'>";
                        html += " <div class='left'>";
                        if(logo){
                            html += "  <div class='logo '><img onload='imgResponsivetwo(this,1)' src='" + logo + "'/></div>";
                        }else{
                            html += "  <div class='logo '><img src='../image/default.jpg'/></div>";
                        }
                        html += "  </div>";
                        html += "  <div class='right'>";
                        html += "  <div class='webName'>" + webName + "</div>";
                        if(publishTime){
                            html += "  <div class='time'>" + publishTime + "</div>";
                        }
                        html += " </div>";
                        html += " <div class='cf'></div>";
                        html += "    </div>";
                        if(author){
                            html += "   <div class='authorName'>" + author + "</div>";
                        }
                        if(name){
                            html += "   <div class='channelName'><a href='main.html'>進入"+name+"頻道</a></div>";
                        }
                        html += " <div class='cf'></div>";
                        html += "   <div class='innerBody'>";
                        html += "   <div class='innerTitle'>" + title + "</div>";
                        html += "<div class='article'>" + body + "</div>";
                        html += " <div class='articleBottom'>";
                        html += "   <div class='sourceUrl'><a href='" + srcUrl + "'>打開原網址<a/></div>";
                        html += "   <div class='channel'><a href='main.html'>進入"+name+"頻道</a></div>";
                        html += "   </div>";
                        html += "   </div>";

                        html +=  " </div></div>";
                        $('.outer1').html(html);

                        if(cooperateStatus!=0){
                            $('.bottomBanner').hide();

                        }
                        else{

                            $(".outer1 .innerTop .inner").hide();
                            $('.bottomBanner').show();
                        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                            $('.bottomBanner').show();
                        }
                        $('.outer1').on('click','#banner',function(){
                            if(gg.util.browserVersion.android){
                                mobileAppInstall.open('wanews://www.wanews.co/main','market://details?id=com.tdhot.kuaibao.android.v2','https://play.google.com/store/apps/details?id=com.tdhot.kuaibao.android.v2');
                            }
                            else if(gg.util.browserVersion.ios){
                                mobileAppInstall.open('wanews://www.wanews.co/main','https://itunes.apple.com/app/id1107258303');//'itms-apps://itunes.apple.com/app/id1107258303',
                            }
                        });}
                    });
            }
           else if(type==2){
                vChannel.getTopics({id:ids},function(res){
                    var desc = res.data.desc;
                    var imageVo =res.data.imageVo.imageUrl;
                    var simpleObjectVoList = res.data.simpleObjectVoList;
                    var topicTitle = res.data.title;
                    var html="";
                    var topicId = res.data.topicId;
                    var cooperateStatus = res.data.cooperateStatus;
                    $('.outer1').hide();
                    $('.outer3').show();
                    html+="<div class ='bottomBanner'>  <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a></div>";
                    html+="<div class='header'><img onload='imgResponsive(this,1)' src='"+imageVo+"'/>";
                    html+=  " <div class='up'>";
                    html+=   "<a href='main.html'><img src='../image/backred.png'/></a>";
                    html+=   "<a id='center'>"+topicTitle+"</a>";
                    html+="<div class='cf'></div>";
                    html+=  "</div>";
                    html+=   "<div class='down'><p>"+desc+"</p></div>";
                    html+= "<div class='background'><img src='../image/jc.png' /></div></div> <div class='center'>";
                    html+="<div class='content'>";

                    function build6(key){
                        switch (key){
                            case 0:
                                return 'details.html?type='+type+'&id='+id;
                            case 3:
                                return param.srcUrl;
                            case 1:
                                return 'initial.html?srcUrl='+srcUrl+'&type='+type+'&id='+id;
                            case 2:
                            case 4:
                                return 'initial.html?srcUrl='+encodeURIComponent(srcUrl)+'&type='+type+'&id='+id;
                        }
                    }
                    for(var i=0;i<simpleObjectVoList.length;i++){
                        var showStyle =simpleObjectVoList[i].showStyle;
                        var coverImage = simpleObjectVoList[i].coverImage;
                        var title = simpleObjectVoList[i].title;
						var cooperateStatusTemp = simpleObjectVoList[i].cooperateStatus;

                        if(title.length>25){
                            title = title.slice(0,25)+"...";
                        }
                        var images = simpleObjectVoList[i].images;
                        var webName = simpleObjectVoList[i].webName;
                        var imageCount = simpleObjectVoList[i].imageCount;
                        var id = simpleObjectVoList[i].id;
                        var srcUrl = simpleObjectVoList[i].srcUrl;
                        sessionStorage.setItem("src",srcUrl);
                        var subTitle = simpleObjectVoList[i].subTitle;
                        var type = simpleObjectVoList[i].type;
                        var time = gg.util.formatDate(simpleObjectVoList[i].createdAt);


                        if(showStyle==0){
							var strSrc=build6(cooperateStatusTemp);
                            html += "<div class='second'>";
                            html += "<div class='up' id='"+id+"'><a href='"+strSrc+"'>"+title+"</a></div>";
                            html += "<div class='bottom'>"+webName+"</div>";
                            html += "</div>";
                        }else if(showStyle==1){
							var strSrc=build6(cooperateStatusTemp);
                            html+= "<div class='first'>";
                            html+= "<div class='left' id='"+id+"'><a href='"+strSrc+"'><img onload='imgResponsive(this,2)' src='"+images[0]["imageUrl"]+"'/></a></div>";
                            html+= "<div class='right'>";
                            html+= "<div class='up' id='"+id+"'><a href='"+strSrc+"'>"+title+"</a><p></p></div>";
                            html+= "<div class='bottom'>"+webName+" &nbsp;"+time+"</div>";
                            html+= "</div>";
                            html+= "<div class='cf'></div>";
                            html+= "</div>"
                        }else if(showStyle==2){
							var strSrc=build6(cooperateStatusTemp);
                            html+="<div class='second'>";
                            html+="<div class='up' id='"+id+"' ><a href='"+strSrc+"'>"+title+"</a></div>";
                            html+="<div class='img'><a class='bigImage' href='"+strSrc+"' ><img onload='imgResponsive(this,1)' src='"+coverImage.imageUrl+"'/></a></div>";
                            html+="<div class='bottom'>"+webName+" &nbsp;"+time+"</div>";
                            html+="</div>";
                        }else if(showStyle==3){
							var strSrc=build6(cooperateStatusTemp);
                            html+="<div class='second'>";
                            html+="<div class='up' id='"+id+"' ><a href='"+strSrc+"'>"+title+"</a></div>";
                            html+="<div class='img3'>";
                            html+="<a><img onload='imgResponsive(this,3)' src='"+images[0]["imageUrl"]+"'/></a>";
                            html+="<a><img onload='imgResponsive(this,3)' src='"+images[1]["imageUrl"]+"'/></a>";
                            html+="<a><img onload='imgResponsive(this,3)' src='"+images[2]["imageUrl"]+"'/></a>";
                            html+="<div class='cf'></div >";
                            html+="</div>";
                            html+="<div class='bottom'>"+webName+" &nbsp;"+time+"</div>";
                            html+="</div>";
                        }else if(showStyle==4){
							var strSrc=build6(cooperateStatusTemp);
                            html+="<div class='second'>";
                            html+="<div class='up'id='"+id+"' ><a href='"+strSrc+"'>"+title+"</a></div>";
                            html+="<div class='img'><a href='"+strSrc+"'><img src='"+coverImage.imageUrl+"'/></a><div class='f'>"+imageCount+"<h1>pcs</h1></div>";
                            if(subTitle){
                                html+="<div class='subTitle'><p>"+subTitle+"</p></div></div>";
                            }
                            html+="<div class='bottom'>"+webName+" &nbsp;"+time+"</div>";
                            html+="</div>";
                        }
                    }
                    $('.outer3').html(html+" </div></div>");
                    if(cooperateStatus!=0){
                        $('.bottomBanner').hide();
                        $('.outer1 .content').css('padding-bottom','0');
                    }
                    else{
                    $('.bottomBanner').hide();
                    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                        $('.bottomBanner').show();
                    }
                    $('.outer3').on('click','#banner',function(){
                        if(gg.util.browserVersion.android){
                            mobileAppInstall.open('wanews://www.wanews.co/main','market://details?id=com.tdhot.kuaibao.android.v2','https://play.google.com/store/apps/details?id=com.tdhot.kuaibao.android.v2');
                        }
                        else if(gg.util.browserVersion.ios){
                            mobileAppInstall.open('wanews://www.wanews.co/main','https://itunes.apple.com/app/id1107258303');//'itms-apps://itunes.apple.com/app/id1107258303',
                        }
                    });}

                });
            }

    }]);
})(window.gg,jQuery);;
(function(gg,$){
    gg.controller('cImage',[function() {
        var srcUrl = gg.util.getUrlParam().srcUrl;
        var src = gg.util.getUrlParam().src; // �����Ǹ����ģ�
        console.log(decodeURIComponent(src));
        var waNews = decodeURIComponent(sessionStorage.getItem("waNews"));
        var type = gg.util.getUrlParam().type;
        var cooperateStatus = gg.util.getUrlParam().cooperateStatus;
        var id = gg.util.getUrlParam().id;
        $('.wa').attr("href",'details.html?type='+type+'&id='+id);
        // ʲô�߼���
        if(srcUrl){
            html="<iframe src='"+decodeURIComponent(srcUrl)+"'></iframe>";
        }else if(src){
            html="<iframe  src='details.html?type='+type+'&id='+id></iframe>";
        }
        $('.center').html(html);
        if(type==1){
            $('.ups').hide();
            $('.inner').hide();
        }

        if(cooperateStatus!=0){
            $('.outer2 .center iframe').css('padding-bottom','0');
            $('.bottomBanner').hide();

            if(cooperateStatus == 1){
                $('.outer2 .innerTop .inner').hide();
            }

            if(cooperateStatus == 2 || cooperateStatus == 4){
                $('.outer2 .innerTop .inner').show();
            }
        }else{
            $('.bottomBanner').show();
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            $('.bottomBanner').show();
        }else{
            $('.outer2 .center iframe').css('padding-bottom','0');
            $('.bottomBanner').hide();
        }

        }
        $('.outer2').on('click','#banner',function(){
            if(gg.util.browserVersion.android){
                mobileAppInstall.open('wanews://www.wanews.co/main','market://details?id=com.tdhot.kuaibao.android.v2','https://play.google.com/store/apps/details?id=com.tdhot.kuaibao.android.v2');
            }
            else if(gg.util.browserVersion.ios){
                mobileAppInstall.open('wanews://www.wanews.co/main','https://itunes.apple.com/app/id1107258303');//'itms-apps://itunes.apple.com/app/id1107258303',
            }
        });

    }]);
})(window.gg,jQuery);;
(function(gg,$){
    gg.controller('cIndex',['vUser','vChannel',function(vUser,vChannel){
        var option={
            since:0,
            id:-1,
            name:'',
            isLoad:false
        };
        var buildHtml={
            buildList:function(html,list){
                if(list.length>0){
                    for(var i=0;i<list.length;i++){
                        list[i].name=option.name?option.name.replace(/\s/g,''):'';
                        //list[i].idLi=option.id;
                        list[i].time = gg.util.formatDate(list[i].createdAt);
                        list[i].srcUrl = encodeURIComponent(list[i].srcUrl);
                        html=this.getListDom(html,list[i]);
                        if(list[i].type==2){
                            $('.hot').show();
                        }
                    }
                }
                return html;
            },
            getListDom:function(html,param){
                switch (param.showStyle){
                    case 0:html=this.buildSecond(html,param);return this.build0(html,param);
                    case 1:html=this.buildFirst(html,param);return this.build1(html,param);
                    case 2:html=this.buildSecond(html,param);return this.build2(html,param);
                    case 3:html=this.buildSecond(html,param);return this.build3(html,param);
                    case 4:html=this.buildSecond(html,param);return this.build4(html,param);
                }
                return '';
            },
            buildFirst:function(html,param){
                html += "<div class='first'>";
                if(param.type==2){
                    html+= "<div class='hot'type='"+param.type+"' > <img src = '../image/circle.png' /></div>";
                }
                return html;
            },
            buildSecond:function(html,param){
                html += "<div class='second'>";
                if(param.type==2){
                    html+= "<div class='hot' type='"+param.type+"' > <img src = '../image/circle.png' /></div>";
                }
                return html;
            },
            build0:function(html,param){
                var strSrc=this.build5(html,param);
                html += "<div class='up' id='"+param.id+"' '><a href='javascript:void(0)'skip = '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+" >"+param.title+"</a><p></p></div>";
                //'details.html?type="+param.type+"&id="+param.id+'&srcUrl="+param.srcUrl+"
                html += "<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html += "</div>";
                return html;
            },
            build1:function(html,param){
                var strSrc=this.build5(html,param);
                html+= "<div class='left'  id='"+param.id+"''><a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+"><img onload='imgResponsive(this,2)' src='"+param.images[0]["imageUrl"]+"'/></a></div>";
                html+= "<div class='right'>";
                html+= "<div class='up' id='"+param.id+"' '><a href='javascript:void(0)'skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">";
                if(param.title.length>25){
                    html+=  param.title.slice(0,25)+"..."
                }else{
                    html+=param.title;
                }
                html+="</a><p></p></div>";
                html+= "<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html+= "</div>";
                html+= "<div class='cf'></div>";
                html+= "</div>";
                return html;
            },
            build2:function(html,param){
                var strSrc=this.build5(html,param);
                html+="<div class='up' id='"+param.id+"' '><a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">";
                if(param.title){
                    html+=param.title;
                }
                html+="</a></div>";
                html+="<div class='imgs'><a class='bigImage'href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+"><img onload='imgResponsive(this,1)' src='"+param.coverImage.imageUrl+" '/></a></div>";
                html+="<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html+="</div>";
                return html;
            },
            build3:function(html,param){
                var strSrc=this.build5(html,param);
                html+="<div class='up' id='"+param.id+"' '><a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">";
                if(param.title){
                    html+=param.title;
                }
                html+="</a></div>";
                html+="<div class='img3'>";
                html+="<a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+"><img onload='imgResponsive(this,3)' src='"+param.images[0]["imageUrl"]+"'/></a>";
                html+="<a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+"><img onload='imgResponsive(this,3)' src='"+param.images[1]["imageUrl"]+"'/></a>";
                html+="<a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+"><img onload='imgResponsive(this,3)' src='"+param.images[2]["imageUrl"]+"'/></a>";
                html+="<div class='cf'></div >";
                html+="</div>";
                html+="<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html+="</div>";
                return html;
            },
            build4:function(html,param){
                var strSrc=this.build5(html,param);
                html+="<div class='up' id='"+param.id+"' '><a href= '"+strSrc+"'>"+param.title+"</a></div>";
                html+="<div class='img' ><a  href= '"+strSrc+"'><img src='"+param.coverImage.imageUrl+"'/></a><div class='f'>"+param.imageCount+"<h1>pcs</h1></div>";
                if(param.subTitle){
                    html+="<div class='subTitle'><p>"+param.subTitle+"</p></div></div>";
                }
                html+="<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html+="</div>";
                html+="</div>";
                return html;
            },
            build5:function(html,param) {

                switch (param.cooperateStatus){
                    case 0:
                        return 'details.html?type='+param.type+'&id='+param.id;
                    case 3:
                        return param.srcUrl;
                    case 1:
                        return 'initial.html?srcUrl='+encodeURIComponent(param.srcUrl)+'&type='+param.type+'&id='+param.id+'&cooperateStatus='+param.cooperateStatus;
                    case 2:
                    case 4:
                        return 'initial.html?srcUrl='+encodeURIComponent(param.srcUrl)+'&type='+param.type+'&id='+param.id+'&cooperateStatus='+param.cooperateStatus;;
                }
            }


        };

        var initImgPoll=function(banner,idLi){
            if(banner.length>0){
                var imgPoll=new gg.ImgPoll('.shift');
                $('.shift').show();
                var coverImages= [];
                var info =[];
                var type1 = '';
                var id1 = '';
                for(var m=0 ;m<banner.length;m++){
                    coverImages[m]=banner[m].coverImage.imageUrl;
                    type1 = banner[m].type;
                    id1 = banner[m].id;
                    info[m] = {url:coverImages[m],bannerTitle:banner[m].title,detail:"details.html?type="+type1+"&id="+id1+""};
                }
                imgPoll.init({
                    data: info
                });
            }else{
                $('.shift').hide();
            }
        };

        vChannel.getLists({},function(res){
            var arr=res.data;
            if(!arr)return;
            var html="";
            for(var i=0;i<arr.length;i++) {
                html += '<li id="' + i + '" idss="' + arr[i]['channelId'] + '" name="'+arr[i]['channelName']+'">' + arr[i]['channelName'] + '</li>';
            }
            $('.menu').html("<ul>"+html+"</ul>");
            $('.menu ul').scrollLeft(sessionStorage.getItem("length"));
        });

        if( sessionStorage.getItem("id")>0){
            vChannel.getContent({id:sessionStorage.getItem("id")},function(res){
                var obj=$(' li:eq("'+sessionStorage.getItem("idLi")+'")');
                obj.css("color","#00bcd4").css("font-size","0.4166666rem").css("border-bottom","3px solid #f44336");
                option.since=res.data.since;
                option.id=obj.attr("id");
                option.name=obj.attr('name');
                initImgPoll(res.data.banners,option.id);
                $('.content').html(buildHtml.buildList('',res.data.list));
            });
        }else{
            sessionStorage.setItem("id",0);
            vChannel.getContent({id:0},function(res){
                var obj=$('li:first');
                obj.css("color","#f44336").css("font-size","0.4166666rem").css("border-bottom","3px solid #00bcd4");
                option.since=res.data.since;
                option.id=obj.attr("id");
                option.name=obj.attr('name');
                initImgPoll(res.data.banners,option.id);
                $('.content').html(buildHtml.buildList('',res.data.list));
            });
        }
        $('.menu').on('click','li',function(){
            option.id=$(this).attr("id");
            option.name=$(this).attr("name");
            var b= $(this).parent().children();
            for(var i=0;i< b.length;i++){
                if(i==0){
                    $(this).css("color","#f44336").css("font-size","0.4166666rem").css("border-bottom","3px solid #00bcd4");
                }else
                if(i==$(this).attr("id")){
                    $(this).css("color","#00bcd4").css("font-size","0.4166666rem").css("border-bottom","3px solid #f44336");
                }else {
                    $(this).siblings().css("color","#000000").css("font-size","0.4166666rem").css("border-bottom","hidden");
                }
            }
            sessionStorage.setItem("id",$(this).attr("idss"));
            sessionStorage.setItem("idLi",option.id);
            var ulWidth = $('.menu ul').scrollLeft();
            sessionStorage.setItem("length",ulWidth);
            vChannel.getContent({id:sessionStorage.getItem("id")},function(res){
                option.since=res.data.since;
                initImgPoll(res.data.banners,option.id);
                $('.content').html(buildHtml.buildList('',res.data.list));
                document.getElementsByTagName('body')[0].scrollTop = 0;
            });
        });

        $('.content').on('click','a',function(){
            if($(this).attr("srcUrl")!=null){
                sessionStorage.setItem("srcUrl",$(this).attr("srcUrl"));
            }
            sessionStorage.setItem("skip",$(this).attr("skip"));
            window.location.href=$(this).attr('skip');
            //alert(111);
            //var conheight = $('.content').scrollTop();
            //sessionStorage.setItem("length",conheight);
        });


        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            $('.bottomBanner').show();
        }else{
            $('.bottomBanner').hide();
        }
        $('.outer').on('click','#banner',function(){
            if(gg.util.browserVersion.android){
                mobileAppInstall.open('wanews://www.wanews.co/main','market://details?id=com.tdhot.kuaibao.android.v2','https://play.google.com/store/apps/details?id=com.tdhot.kuaibao.android.v2');
            }
            else if(gg.util.browserVersion.ios){
                mobileAppInstall.open('wanews://www.wanews.co/main','https://itunes.apple.com/app/id1107258303');//'itms-apps://itunes.apple.com/app/id1107258303',
            }
        });


        var scrollTimeOut = setTimeout(null,50);
        $(document).scroll(function(){
            if($(document).height()-$(window).scrollTop()-$(window).height()<80){
                clearTimeout(scrollTimeOut);
                scrollTimeOut = setTimeout(scrollCode,300);
            }
        });
        function scrollCode(){
            vChannel.getContent({id:sessionStorage.getItem("id"),since:option.since},function(res){
                option.since=res.data.since;
                $('.content').append(buildHtml.buildList('',res.data.list));
            })
        };
    }]);
})(window.gg,jQuery);
