
(function(gg,$){
    gg.controller('cDetail',['vUser','vChannel',function(vUser,vChannel){
        var option={
            rrrrNmu:0,
            id:-1,
            name:'',
            isLoad:false
        };
        var type = gg.util.getUrlParam().type;
        var ids = gg.util.getUrlParam().id;
        //var idLi = gg.util.getUrlParam().idLi;
        var waNews =encodeURIComponent(window.location.href) ;
        sessionStorage.setItem("waNews",waNews);
        var recommend=[];
            if(type==0) {
                    vChannel.getStaticDetails({id: ids}, function (res) {
                        var data = res.data ? res.data : "";
                        var author = data.author ? data.author : "";
                        var body = data.body ? data.body : "";
                        var channel=data.channel ? data.channel:' ';
                        var name = channel.channelName?channel.channelName:'';
                        //var name = res.data.channel.channelName.replace(/\s/g,'');
                        var id = data.id ? data.id : "";
                        var publishTime = data.publishTime ? data.publishTime : "";
                        var title = data.title ? data.title : "";
                        var webName = data.webName ? data.webName : "";
                        var type =data.type ? data.type : "";
                        var images = data.images ? data.images : "";
                        var logo = data.logoUrl ? data.logoUrl : "../image/default.jpg";
                        var srcUrl = data.srcUrl ? data.srcUrl : "";
                        var cooperateStatus = data.cooperateStatus ? data.cooperateStatus : "";
                        $('.outer1').show();
                        $('.outer4').hide();
                        $('.outer5').hide();
                        sessionStorage.setItem("id",channel.channelId);
                        var html = "";
                        $(document).attr("title",title);
                        if (images.length > 0) {//alert(images.length)
                            for (var t = images.length - 1; t >= 0; t--) {//alert(t)
                                if(images[t]){
                                    //if(!images[t].squareImageUrl){
                                    //    images[t].squareImageUrl="";
                                    //}
                                    if(!images[t].imageUrl){//大图
                                        images[t].imageUrl=images[t].squareImageUrl;
                                    }
                                    if(!images[t].middleImageUrl){//中图
                                        images[t].middleImageUrl=images[t].imageUrl;
                                    }
                                    if(!images[t].smallImageUrl){//小图
                                        images[t].smallImageUrl=images[t].middleImageUrl;
                                    }
                                //body = body.replace('tdnews://img' + t, images[t]?('<img src="' + images[t].imageUrl + '"/>'):'');
                                body = body.replace('tdnews://img' + t, images[t]?('<p class="image" width="'+ images[t]['width'] +'" height="'+ images[t]['height'] +'" src_path="'+ images[t].middleImageUrl +'" thumb_path="'+  images[t].smallImageUrl +'"></p>'):'');
                                //body = body.replace('tdnews://img' + t, images[t]?('<p class="image" width="'+ images[t]['width'] +'" height="'+ images[t]['height'] +'" src_path="'+ images[t]['middleImageUrl'] +'" thumb_path="'+ images[t]['smallImageUrl'] +'"></p>'):'');
                                //body = body.replace('tdnews://img' + t, images[t]?('<p class="image" width="719" height="431" src_path="http://tdhotimagetest.wanews.co/70126e4c-539c-4d1e-9593-51e716a7cdde.JPEG" thumb_path="http://tdhotimagetest.wanews.co/3f8aac7d-f931-4c9a-818c-92697493774d.JPEG"></p>'):'');
                                }else{body = body.replace('tdnews://img' + t, images[t] ? '':'');}
                            }
                        }
                        //footer里面添加广告图片，要占位功能
                        // body = body.replace('<footer>','<footer><p class="image" width="300" height="200" src_path=http://tdhotimagetest.wanews.co/a3a875be-1d7d-4c7c-a618-478703528148.JPEG></p>');
                        //document.getElementsByTagName("footer").innerHTML="<img src='http://tdhotimagetest.wanews.co/a3a875be-1d7d-4c7c-a618-478703528148.JPEG'/>";
                        body = body.replace('<span class="logo"><img ', '<span class="logo"><img onerror="this.onerror=null; this.src=&quot;../image/1.png&quot;"');
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
                        html += "<p class='toggle-img-con'><a href='javascript:void(0)' class='tt-thin-border tt-font-1' id='toggle-img' style='display:none;'>显示大图</a></p>";
                        if(data){
                        html += "<div class='content'>"+ body ;
                        }
                        else{
                            html += "<div style='line-height:0.66666rem;font-size:0.4rem;text-align:center;margin-top:1rem;'>当前访问的内容非有效状态，不能呈现</div>";
                        }
                        vChannel.getComments({id: ids}, function (res) {
                            //var html="";
                            html +="<div class='comment'><h3 class='title'>網友評論</h3>" +
                                "<ul class='coms'>";
                            var data = res.data ? res.data : "";
                            for(var i=0;i<data.length;i++){
                                var commentNickName=data[i].commentNickName;
                                var content=data[i].content;
                                var commentDt = gg.util.formatDate(data[i].commentDt);
                                var commentLikeNums=data[i].commentLikeNums?data[i].commentLikeNums:"0";
                                var commentNums=data[i].commentNums?data[i].commentNums:"0";
                                var hasLike=data[i].hasLike;
                                html+="<li><a href='../view/comDetail.html?id="+data[i].id+"'><img class='avatar' src='../image/avatar.png'><div class='comsMain'>";
                                html += "<h4>"+ commentNickName +"</h4>";
                                html += "<p>"+content+"</p>";
                                html += "<div class='other cf'><span class='time'>"+commentDt+"</span><span class='message'><img src='../image/message.png'>"+ commentNums +"</span><span class='line'>|</span><span class='like'><img src='../image/like-gray.png'>"+commentLikeNums+"</span></div></div></a></li>";
                            }
                            html+="</ul></div>";
                            html +=  " </div></div></div>";
                        });
                        $('.outer1').html(html);

                        var artheight=$('.outer1 .content .article').height();
                        if( artheight > 1000){
                            $('.outer1 .content .article').css('height','1000');
                            $('.outer1 .content article').append("<div class='opentext'><a href='javascript:void()0'>展开全文<img src='../image/opentext.png'/></a></div>");
                            $('.opentext').show();
                            $('.opentext').click(function(){
                                $('.outer1 .content .article').css('height','auto');
                                $('.opentext').hide();
                            })
                        }

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
                        initPage();

                });
            }
           else if(type==2){
                vChannel.getTopics({id:ids},function(res){
                    var data = res.data;
                    var desc = data.desc;
                    var imageVo =data.imageVo.imageUrl;
                    var simpleObjectVoList = data.simpleObjectVoList;
                    var topicTitle = data.title;
                    var htmlTop="";
                    var topicId = data.topicId;
                    var cooperateStatus = data.cooperateStatus;
                    $(document).attr("title",topicTitle);
                    $('.outer1').hide();
                    $('.outer3').show();
                    $('.outer4').hide();
                    $('.outer5').hide();
                    htmlTop+="<div class ='bottomBanner'>  <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a></div>";
                    htmlTop+="<div class='header'><div class='loading' onload='loadingImg(this);' style='position:absolute;top:0;width:100%;background:#666;bottom:0px;'></div><img onload='onloadImg(this);' style='opacity:0;' src='"+imageVo+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/>";
                    htmlTop+=  " <div class='up'>";
                    htmlTop+=   "<a href='main.html'><img src='../image/backred.png'/></a>";
                    htmlTop+=   "<a id='center'>"+topicTitle+"</a>";
                    htmlTop+="<div class='cf'></div>";
                    htmlTop+=  "</div>";
                    htmlTop+=   "<div class='down'><p>"+desc+"</p></div>";
                    htmlTop+= "<div class='background'><img src='../image/jc.png' /></div></div> <div class='center'>";
                    htmlTop+="<div class='content'></div></div>";

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
                    var html="";
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
                            html+= "<div class='left' id='"+id+"'><a href='"+strSrc+"'>" +
                                "<img class='loading' onload='imgResponsive(this,1);loadingImg(this);' src='../image/loading.jpg'>" +
                                "<img onload='imgResponsive(this,2);onloadImg(this);' src='"+images[0]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a></div>";
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
                            html+="<div class='img'><a class='bigImage' href='"+strSrc+"' ><img class='loading' onload='loadingImg(this);' src='../image/loading-big.jpg'><img onload='imgResponsive(this,1);onloadImg(this);' src='"+coverImage.imageUrl+"' onerror='this.onerror=null; this.src=\"../image/onerror-big.jpg\"'/></a></div>";
                            html+="<div class='bottom'>"+webName+" &nbsp;"+time+"</div>";
                            html+="</div>";
                        }else if(showStyle==3){
							var strSrc=build6(cooperateStatusTemp);
                            html+="<div class='second'>";
                            html+="<div class='up' id='"+id+"' ><a href='"+strSrc+"'>"+title+"</a></div>";
                            html+="<div class='img3'>";
                            html+="<a><img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);' src='"+images[0]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a>";
                            html+="<a><img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);' src='"+images[1]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a>";
                            html+="<a><img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);' src='"+images[2]["imageUrl"]+"' onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a>";
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
                        }
                    }
                    $('.outer3').html(htmlTop);
                    $('.outer3 .content').html(html);
                    if(cooperateStatus!=0){
                        $('.bottomBanner').show();
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
                    //var isScoll=[];
                    //var j=1;
                    //
                    //$(document).scroll(function(){
                    //    if($(document).height()-$(window).scrollTop()-$(window).height()<80){
                    //        var isScollKey=true;
                    //        //�ж��Ƿ��ڶ�����
                    //        for(var i=0;isScoll.length && i<isScoll.length;i++){
                    //            if(isScoll[i]==j) {isScollKey=false;break;}
                    //        }
                    //        if(isScollKey){
                    //            //����ż������
                    //            isScoll.push(j);
                    //            vChannel.getTopics({id:ids,rrrrNmu:++j},function(res){
                    //                $('.content').append(html);
                    //
                    //            });
                    //            $('.content_loading').show();
                    //        }
                    //    }
                    //});
					
					var scrollTimeOut = setTimeout(null,50);
                    $(document).scroll(function(){
                        if($(document).height()-$(window).scrollTop()-$(window).height()<80){
                            clearTimeout(scrollTimeOut);
                            scrollTimeOut = setTimeout(function(){
								vChannel.getTopics({id:ids+'?page:'+j},function(res){
									$('.content').append(html);
								});
								$('.content_loading').show();
							},500);
                        }
                    });

                });
            }
            else if(type==4){
                vChannel.getStaticDetails({id:ids},function(res){
                    var data = res.data ? res.data:"";
                    var cooperateStatus = data.cooperateStatus ? data.cooperateStatus:"";
                    var id = data.id ? data.id:"";
                    var body = data.body ? data.body:"";
                    var images = data.images ? data.images:"";
                    var logoUrl = data.logoUrl ? data.logoUrl:"";
                    var title = data.title ? data.title:"";
                    var webName = data.webName ? data.webName:"";
                    var webUrl = data.webUrl ? data.webUrl:"";
                    var userCommentFormList = data.userCommentFormList ? data.userCommentFormList:"";
                    $(document).attr("title","段子-Wanews");
                    $('.outer1').hide();
                    $('.outer3').show();
                    $('.outer4').hide();
                    $('.outer5').hide();
                    var html="";
                    html+="<div class ='bottomBanner'>  <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a></div>";
                    html += "<div class='bg-fa'><div class='innerTop'>" +
                        "<div class='back'>" +
                        "<a href='main.html'>" +
                        "<img src='../image/back.png'/>" +
                        "</a>"+
                        "</div>"+
                        "</div>";
                    html+="<div class='comment comBox jokes-p'><p class=''>"+body+"</p> </div>";
                    html+="<div class='comment comBox noline'><h3 class='title'>網友評論</h3><div class='comslist'></div>";
                    html+="</ul></div></div></div>";

                    vChannel.getComments({id: ids}, function (res) {
                        var data = res.data;
                        var htmlcoms="";
                        if(data.length>0){
                            htmlcoms+="<ul class='coms'>";
                            for(var i=0;i<data.length;i++){
                                var commentNickName=data[i].commentNickName;
                                var commentLikeNums=data[i].commentLikeNums?data[i].commentLikeNums:"0";
                                var commentNums=data[i].commentNums?data[i].commentNums:"0";
                                var content=data[i].content;
                                var commentDt = gg.util.formatDate(data[i].commentDt);
                                var hasLike=data[i].hasLike;
                                htmlcoms+="<li><a href='../view/comDetail.html?&id="+data[i].id+"'><img class='avatar' src='../image/avatar.png'><div class='comsMain'>";
                                htmlcoms += "<h4>"+ commentNickName +"</h4>";
                                htmlcoms += "<p>"+content+"</p>";
                                htmlcoms += "<div class='other cf'><span class='time'>"+commentDt+"</span><span class='message'><img src='../image/message.png'>"+ commentNums +"</span><span class='line'>|</span><span class='like'><img src='../image/like-gray.png'>"+commentLikeNums+"</span></div></div></a></li>";
                            }
                            htmlcoms+="</ul>";
                        }else{
                            htmlcoms+="<p class='noComment'>讚時還沒有評論喔！快去評論吧</p>";
                        }
                        $(".comslist").html(htmlcoms);
                    });

                    $('.outer3').html(html);
                    if(cooperateStatus!=0){
                        $('.bottomBanner').hide();
                    }
                    else{
                        $('.bottomBanner').show();
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
            else if(type==6){
                vChannel.getDynamicDetails({id:ids},function(res){
                    var data=res.data?res.data:"";
                    var recommend=data.recommend?data.recommend:"";
                    var html="";
                    if(recommend){
                        html+="<div class='listPromote'><ul>";
                        for(var i=0;i<recommend.length;i++){
                            var srcUrl=recommend[i].srcUrl?recommend[i].srcUrl:"";
                            var coverImage=recommend[i].coverImage?recommend[i].coverImage:"";
                            var imageCount=recommend[i].imageCount?recommend[i].imageCount:"0";
                            var title=recommend[i].title?recommend[i].title:"";
                            var imageUrl=coverImage.imageUrl;
                            if(navigator.userAgent.indexOf('WaNews') == 0){
                                srcUrl="wabridge://newsdetail?objectId="+ recommend[i].id +"&type="+ recommend[i].type +"&coopstatus="+ recommend[i].cooperateStatus;
                            }
                            html+="<li><a class='imgatlas' href='"+srcUrl+"'><img class='loading' onload='loadingImg(this);' src='../image/loading-big.jpg'/><img onload='imgResponsive(this,2);onloadImg(this);' src='"+imageUrl+"'onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'/></a><a href='"+srcUrl+"'><h4>"+title+"</h4></a><div class='note'><img src='../image/note.png'>"+imageCount+"</div></li>";
                        }
                    }
                    html+="</ul></div>";
                    $("#atlasPromote").html(html);
                });
                vChannel.getImages({id:ids},function(res){
                    var images =  res.data.images;
                    var title = res.data.title;
                    var srcUrl = res.data.srcUrl;
                    var id = res.data.id;
                    var cooperateStatus = res.data.cooperateStatus;
                    var list = [];
                    $(document).attr("title",title);
                    for (var i=0;i<images.length;i++)
                        list.push({content:images[i].imageUrl,width:images[i].width,height:images[i].height});
                    list.push({
                        content: document.getElementById('atlasPromote')
                    });
                    $('.iSlider-title').text(title);
                    $('.iSlider-num').html("<span class='imgnum'>1</span>/<span class='imglen'>"+ images.length + "</span>");
                    var S = new iSlider(document.getElementById('iSlider-wrapper'), list, {
                        isAutoplay: 0,
                        isLooping: 0,
                        isOverspread: 1,
                        animateTime: 800
                    });
                    phide();
                    function phide() {
                        if ($('.iSlider-p').height() <= $('.iSlider-p').css('max-height')) {
                            $(".iSlider-des .arrow-down").hide();
                        } else {
                            $(".iSlider-des .arrow-down").show();
                        }
                    }
                    $(".iSlider-des .arrow-down").click(function () {
                        $(".iSlider-p").css("max-height", "100%");
                        $(".iSlider-des .arrow-down").hide();
                    });
                });
                $('.outer4').show();
                $('.iSlider-top a').click(function(){
                    history.go(-1);
                })
            }else if(type==31){
                vChannel.getStaticDetails({id:ids},function(res){
                    var data = res.data ? res.data:"";
                    var id = data.id ? data.id:"";
                    var cooperateStatus = data.cooperateStatus ? data.cooperateStatus:"";
                    var body = data.body ? data.body:"";
                    var logoUrl = data.logoUrl ? data.logoUrl:"";
                    var srcUrl = data.srcUrl ? data.srcUrl:"";
                    var webName = data.webName ? data.webName:"";
                    var title = data.title ? data.title:"";
                    var videoForm = data.videoForm ? data.videoForm:"";
                    var playNum = videoForm.playNum ? videoForm.playNum:"0";
                    $(document).attr("title",title);
                    $('.outer1').hide();
                    $('.outer3').hide();
                    $('.outer4').hide();
                    $('.outer5').show();
                    var html="";
                    html="<div class ='bottomBanner'>";
                    html+= " <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a>";
                    html+="</div>";
                    html += "<div class='bg-fa'><div class='innerTop'>" +
                        "<div class='back'>" +
                        "<a href='main.html'>" +
                        "<img src='../image/back.png'/>" +
                        "</a>"+
                        "</div>"+
                        "</div>" +
                        "<div class='center'>";
                    if(data){
                        html += "<div class='embed_container'>"+ body +"</div><div class='comBox vinfo'><span class='logo' style='background-image:url("+logoUrl+")'></span><span>" + webName + "</span><span class='num'>" + playNum + " 播放</span></div><div class='recBox'></div><div class='comment comBox discuss noline'></div>";
                    }
                    else{
                        html += "<div style='line-height:0.66666rem;font-size:0.4rem;text-align:center;margin-top:1rem;'>当前访问的内容非有效状态，不能呈现</div>";
                    }
                    vChannel.getDynamicDetails({id: ids}, function (res) {
                        var data=res.data?res.data:"";
                        var recommend=data.recommend?data.recommend:"";
                        var html='';
                        if(recommend.length>0){
                            html+="<div class='comment comBox'><h3 class='title'>精彩推荐</h3><ul class='coms'>";
                            for(var i=0;i<recommend.length;i++){
                                var srcUrl=recommend[i].srcUrl?recommend[i].srcUrl:"";
                                var coverImage=recommend[i].coverImage?recommend[i].coverImage:"";
                                var imageCount=recommend[i].imageCount?recommend[i].imageCount:"0";
                                var videoForm=recommend[i].videoForm?recommend[i].videoForm:"";
                                var playNum=videoForm.playNum?videoForm.playNum:"0";
                                var title=recommend[i].title?recommend[i].title:"";
                                var smallImageUrl=coverImage.smallImageUrl;
                                if(navigator.userAgent.indexOf('WaNews') == 0){
                                    srcUrl="wabridge://newsdetail?objectId="+ recommend[i].id +"&type="+ recommend[i].type +"&coopstatus="+ recommend[i].cooperateStatus;
                                }
                                html += "<li><a class='theme' href='details.html?type="+type+"&id="+id+"'>";
                                html += "<div class='themeImg'><img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);'  src='"+smallImageUrl+"'onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'></div><div class='themeMain'><h4>"+title+"</h4><p><span class='author'>"+webName+"</span><span class='time'>"+playNum+" 播放</span></p></div>";
                                html += "</a></li>";
                            }
                        }
                        html+="</ul></div>";
                        $('.recBox').html(html);
                    });
                    vChannel.getComments({id: ids}, function (res) {
                        var html="";
                        html +="<div class='comment'><h3 class='title'>網友評論</h3>";
                        var data = res.data;
                        if(data.length>0){
                            html +="<ul class='coms'>";
                            for(var i=0;i<data.length;i++){
                                var commentNickName=data[i].commentNickName;
                                var content=data[i].content;
                                var commentDt = gg.util.formatDate(data[i].commentDt);
                                var commentLikeNums=data[i].commentLikeNums?data[i].commentLikeNums:"0";
                                var commentNums=data[i].commentNums?data[i].commentNums:"0";
                                var hasLike=data[i].hasLike;
                                html+="<li><a href='../view/comDetail.html?id="+data[i].id+"'><img class='avatar' src='../image/avatar.png'><div class='comsMain'>";
                                html += "<h4>"+ commentNickName +"</h4>";
                                html += "<p>"+content+"</p>";
                                html += "<div class='other cf'><span class='time'>"+commentDt+"</span><span class='message'><img src='../image/message.png'>"+ commentNums +"</span><span class='line'>|</span><span class='like'><img src='../image/like-gray.png'>"+commentLikeNums+"</span></div></div></a></li>";
                            }
                        }else{
                            html+="<p class='noComment'>讚時還沒有評論喔！快去評論吧</p>";
                        }
                        html+="</ul></div>";
                        $('.discuss').html(html);
                    });
                    html +=  "</div></div>";
                    $('.outer5').html(html);

                    var vdw=document.body.clientWidth;
                    var vdh=vdw*9/16;
                    $('.embed_container').css('width','100%').css('height',vdh);

                    if(cooperateStatus!=0){
                        $('.bottomBanner').hide();
                    }
                    else{
                        $('.bottomBanner').show();
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
})(window.gg,jQuery);