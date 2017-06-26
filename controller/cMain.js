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
                if(param.type==4){
                    html += "<div class='up' id='"+param.id+"'><a class='joke' href='javascript:void(0)'skip = '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+" >"+param.title+"</a><p></p></div>";
                }else{
                html += "<div class='up' id='"+param.id+"'><a class='' href='javascript:void(0)'skip = '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+" >"+param.title+"</a><p></p></div>";
                }
                //'details.html?type="+param.type+"&id="+param.id+'&srcUrl="+param.srcUrl+"
                html += "<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html += "</div>";
                return html;
            },
            build1:function(html,param){
                var strSrc=this.build5(html,param);
                html+= "<div class='left'  id='"+param.id+"''><a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">" +
                    "<img class='loading' onload='imgResponsive(this,1);loadingImg(this);' src='../image/loading.jpg'>" +
                    "<img onload='imgResponsive(this,2);onloadImg(this);' src='"+param.images[0]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/>" ;
                html+="</a>";
                if(param.type==6){
                    html+= "<div class='note'><img src = '../image/note.png' />"+param.imageCount+"</div>";
                }
                if(param.type==3 || param.type==31){
                    html+= "<div class='note'><img src = '../image/play.png' />"+ gg.util.formatSecond(param.videoForm.time) +"</div>";
                }
                html+="</div>";
                html+= "<div class='right'>";
                html+= "<div class='up' id='"+param.id+"' '><a href='javascript:void(0)'skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">";
                if(param.title.length>25){
                    html+=  param.title.slice(0,25)+"..."
                }else{
                    html+=param.title;
                }
                html+="</a><p></p></div>";
                html+= "<div class='bottom'>";
                if(param.tag){
                    html+="<span class='tag'>"+ param.tag +"</span>";
                }
                html+=param.webName+" &nbsp;"+param.time+"</div>";
                html+= "</div>";
                html+= "<div class='cf'></div>";
                html+= "</div>";
                return html;
            },
            build2:function(html,param){
                var strSrc=this.build5(html,param);
                //var strSrc1=this.build6(html,param);
                html+="<div class='up' id='"+param.id+"'><a href='javascript:void(0)' skip= '";
                //if(param.type==6){
                //    html+=decodeURIComponent(strSrc1);
                //}else{
                    html+=decodeURIComponent(strSrc);
                //}
                html+="'srcUrl="+param.srcUrl+">";
                if(param.title){
                    html+=param.title;
                }
                html+="</a></div>";
                html+="<div class='imgs'><a class='bigImage' href='javascript:void(0)' skip= '";
                //if(param.type==6){
                //    html+=decodeURIComponent(strSrc1);
                //}else{
                    html+=decodeURIComponent(strSrc);
                //}
                html+="'srcUrl="+param.srcUrl+">" +
                    "<img class='loading' onload='loadingImg(this);' src='../image/loading-big.jpg'>" +
                    "<img onload='imgResponsive(this,1);onloadImg(this);' src='"+param.coverImage.imageUrl+" ' onerror='this.onerror=null; this.src=\"../image/onerror-big.jpg\"'/>" +
                    "</a>";
                if(param.type==6){
                    html+= "<div class='note'><img src = '../image/note.png' />"+param.imageCount+"</div>";
                }
                if(param.type==3|| param.type==31){
                    html+= "<div class='note'><img src = '../image/play.png' />"+ gg.util.formatSecond(param.videoForm.time) +"</div>";
                }
                html+="</div>";
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
                html+="<a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">" +
                    "<img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);' src='"+param.images[0]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a>";
                html+="<a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">" +
                    "<img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);' src='"+param.images[1]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a>";
                html+="<a href='javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'srcUrl="+param.srcUrl+">" +
                    "<img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);' src='"+param.images[2]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a>";
                if(param.type==6){
                    html+= "<div class='note'><img src = '../image/note.png' />"+param.imageCount+"</div>";
                }
                if(param.type==3|| param.type==31){
                    html+= "<div class='note'><img src = '../image/play.png' />"+ gg.util.formatSecond(param.videoForm.time) +"</div>";
                }
                html+="<div class='cf'></div >";
                html+="</div>";
                html+="<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html+="</div>";
                return html;
            },
            build4:function(html,param){
                var strSrc=this.build5(html,param);
                html+="<div class='up' id='"+param.id+"'><a href= 'javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'>"+param.title+"</a></div>";
                html+="<div class='img' ><a  href= 'javascript:void(0)' skip= '"+decodeURIComponent(strSrc)+"'><img class='loading' onload='loadingImg(this);' src='../image/loading-big.jpg'><img src='";
                if(param.coverImage){
                    html+=param.coverImage.imageUrl;
                }
                html+="' onload='onloadImg(this);' onerror='this.onerror=null; this.src=\"../image/onerror-big.jpg\"'/></a><div class='f'>"+param.imageCount+"<h1>pcs</h1></div>";
                if(param.subTitle){
                    html+="<div class='subTitle'><p>"+param.subTitle+"</p></div></div>";
                }
                html+="<div class='bottom'>"+param.webName+" &nbsp;"+param.time+"</div>";
                html+="</div>";
                html+="</div>";
                return html;
            },
            build10:function(html,param) {
                    switch (param.cooperateStatus){
                        case 0:
                            return 'details.html?type='+param.type+'&id='+param.id;
                        case 3:
                            return param.srcUrl+'&type='+param.type+'&id='+param.id;
                        case 1:
                            return 'initial.html?srcUrl='+encodeURIComponent(param.srcUrl)+'&type='+param.type+'&id='+param.id+'&cooperateStatus='+param.cooperateStatus;
                        case 2:
                        case 4:
                            return 'initial.html?srcUrl='+encodeURIComponent(param.srcUrl)+'&type='+param.type+'&id='+param.id+'&cooperateStatus='+param.cooperateStatus;
                    }
            },
            build11:function(html,param) {
                    if(param.cooperateStatus==3){
                        return "wabridge://newsdetail?objectId="+ param.id +"&type="+ param.type +"&coopstatus="+ param.cooperateStatus +"&srcUrl="+ encodeURIComponent(param.srcUrl);
                    }else{
                        return "wabridge://newsdetail?objectId="+ param.id +"&type="+ param.type +"&coopstatus="+ param.cooperateStatus;
                    }
            },
            build5:function(html,param) {
                if(navigator.userAgent.indexOf('WaNews') == 0){
                        return this.build11(html,param);
                }else{
                        return this.build10(html,param);
                }
            }
            //build6:function(html,param) {
            //    switch (param.cooperateStatus){
            //        case 0:
            //            return 'atlas.html?type='+param.type+'&id='+param.id;
            //        case 3:
            //            return param.srcUrl;
            //        case 1:
            //            return 'initial.html?srcUrl='+encodeURIComponent(param.srcUrl)+'&type='+param.type+'&id='+param.id+'&cooperateStatus='+param.cooperateStatus;
            //        case 2:
            //        case 4:
            //            return 'initial.html?srcUrl='+encodeURIComponent(param.srcUrl)+'&type='+param.type+'&id='+param.id+'&cooperateStatus='+param.cooperateStatus;;
            //    }
            //}
        };

        var initImgPoll=function(banner,idLi){
            if(banner.length>0){
                var imgPoll=new gg.ImgPoll('.shift');
                $('.shift').show();
                var coverImages= [];
                var info =[];
                var type1 = '';
                var id1 = '';
                var srcUrl='';
                for(var m=0 ;m<banner.length;m++){
                    coverImages[m]=banner[m].coverImage.imageUrl;
                    type1 = banner[m].type;
                    id1 = banner[m].id;
                        srcUrl= "details.html?type="+type1+"&id="+id1;
                    info[m] = {url:coverImages[m],bannerTitle:banner[m].title,detail:srcUrl};
                }
                imgPoll.init({
                    data: info
                });


                $('.poll-contents').on('click','a',function(){
                    var skip=$(this).attr("skip");
                    var id = request(skip,"id");
                    var type = request(skip,"type");
                    var wanewsUrl;
                    if(type==0||type==3||type==5||type==4){
                        wanewsUrl='wanews://www.wanews.co/news/detail/'+ id;
                    }else if(type==2){
                        wanewsUrl='wanews://www.wanews.co/topic/item/'+ id;
                    }else if(type==1||type==6){
                        wanewsUrl='wanews://www.wanews.co/gallery/'+ id;
                    }
                    mobileAppInstall.open(wanewsUrl,skip);
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
                sessionStorage.getItem("length");
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

        /**
         * ��ȡurl�е�ָ��������ֵ
         * @param {string} paras ����ѯ����
         */
        function request(url,paras){
            var s = url.substr(url.indexOf('?')+1),
                paraObj = {};
            if(s){
                var arr = s.split("&");
                for(var i = 0; i< arr.length; i++){
                    var t = arr[i].split("=");
                    paraObj[t[0]] = t[1];
                }
            }
            return paraObj[paras.toLowerCase()];
        };
        $('.content').on('click','a',function(){
            if($(this).attr("srcUrl")!=null){
                sessionStorage.setItem("srcUrl",$(this).attr("srcUrl"));
            }
            sessionStorage.setItem("skip",$(this).attr("skip"));

            var skip=$(this).attr("skip");
            var id = request(skip,"id");
            var type = request(skip,"type");
            var cooperateStatus = request(skip,"cooperateStatus");
                //alert("wabridge://newsdetail?objectId="+ id +"&type="+ type +"&coopstatus="+ cooperateStatus);
            //mobileAppInstall.open("wabridge://newsdetail?objectId="+ id +"&type="+ type +"&cooperateStatus="+ cooperateStatus,skip);
            var wanewsUrl;
            if(type==0||type==3||type==5||type==4|| type==31){
                wanewsUrl='wanews://www.wanews.co/news/detail/'+ id;
            }else if(type==2){
                wanewsUrl='wanews://www.wanews.co/topic/item/'+ id;
            }else if(type==1||type==6){
                wanewsUrl='wanews://www.wanews.co/gallery/'+ id;
            }

            mobileAppInstall.open(wanewsUrl,skip);
            //alert(wanewsUrl);
            //alert(skip);
            //mobileAppInstall.open("wanews://www.wanews.co/main",skip);
            //window.location.href=$(this).attr('skip');
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
            else if(gg.util.browserVersion.ios || gg.util.browserVersion.webKit || gg.util.browserVersion.iPhone){
                mobileAppInstall.open('wanews://www.wanews.co/main','https://itunes.apple.com/app/id1107258303');//'itms-apps://itunes.apple.com/app/id1107258303',
            }
        });


        //�µļ��˴��룬���������Ӧ�ٶ�
        //�����Ŵ�������
        var isScoll=[];
        $(document).scroll(function(){
            if($(document).height()-$(window).scrollTop()-$(window).height()<80){
                var isScollKey=true;
                var isScollStr=option.since;
                //�ж��Ƿ��ڶ�����
                if(typeof(option.since) != "undefined"){
                    for(var i=0;isScoll.length && i<isScoll.length;i++){
                        if(isScoll[i]==option.since) {isScollKey=false;break;}
                    }
                }else{
                    isScollStr=isScoll[isScoll.length-1];
                    //加个计时器，间隔几秒才能发送一次
                }
                if(isScollKey){

                    //����ż������
                    isScoll.push(option.since);
                    vChannel.getContent({id:sessionStorage.getItem("id"),since:isScollStr},function(res){
                        option.since=res.data.since;
                        $('.content').append(buildHtml.buildList('',res.data.list));
                    });
                    $('.content_loading').show();
                }
            }
        });


    }]);
})(window.gg,jQuery);
