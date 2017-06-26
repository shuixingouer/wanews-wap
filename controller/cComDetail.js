(function(gg,$){
    gg.controller('cComDetail',['vUser','vChannel',function(vUser,vChannel){
        var type = gg.util.getUrlParam().type;
        var ids = gg.util.getUrlParam().id;
        //var idLi = gg.util.getUrlParam().idLi;
        sessionStorage.setItem("type",type);
        var waNews =encodeURIComponent(window.location.href) ;
        sessionStorage.setItem("waNews",waNews);
            vChannel.getCommentDetails({id: ids}, function (res) {
                var data = res.data ? res.data : "";
                var commentNickName = data.commentNickName ? data.commentNickName:"";
                var commentNums = data.commentNums ? data.commentNums:"";
                var content = data.content ? data.content:"";
                var commentLikeNums = data.commentLikeNums ? data.commentLikeNums:"";
                var hasLike = data.hasLike;
                var userCommentFormList = data.userCommentFormList ? data.userCommentFormList:"";
                var commentDt = gg.util.formatDate(data.commentDt) ? gg.util.formatDate(data.commentDt):"";
                var objectId = data.objectId ? data.objectId:"";
                var simpleObjectForm = data.simpleObjectForm ? data.simpleObjectForm:"";
                var html="";
                html+="<div class ='bottomBanner'>  <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a></div>";
                html += "<div class='innerTop'><div class='back'><a href='details.html?type="+simpleObjectForm.type+"&id="+simpleObjectForm.id+"'><img src='../image/back.png'></a></div></div>";
                var type=data.simpleObjectForm.type;
                html += "<div class='comment comBox'><ul class='coms'><li class='noline'><img class='avatar' src='../image/avatar.png'><div class='comsMain'><h4>"+commentNickName+"</h4><div class='other cf'><span class='time'>"+commentDt+"</span><span class='like'><img src='../image/like-gray.png'>"+ commentLikeNums +"</span></div></div><p class='land'>"+ content +"</p><a class='theme' href='details.html?type="+simpleObjectForm.type+"&id="+simpleObjectForm.id+"'>";
                    if(type != 4){
                        html += "<div class='themeImg'><img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);'  src='"+simpleObjectForm.images[0].smallImageUrl+"'onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'></div><div class='themeMain'><h4>"+simpleObjectForm.title+"</h4><p><span class='author'>"+simpleObjectForm.webName+"</span><span class='time'>"+gg.util.formatDate(simpleObjectForm.createdAt)+"</span></p></div>";
                    }else{
                        html+="<div class='jokesTitle'>"+ simpleObjectForm.title +"</div>";
                    }
                    html += "</a></li></ul>";
                html+="</div><div class='comment comBox noline'><h3 class='title'>網友回復</h3>";
                if(userCommentFormList.length>0){
                    html+="<ul class='coms'>";
                for(var i=0;i<userCommentFormList.length;i++){
                    var userCommentNickName=userCommentFormList[i].commentNickName;
                    var userContent=userCommentFormList[i].content;
                    var userCommentDt = gg.util.formatDate(userCommentFormList[i].commentDt);
                    var commentLikeNums=userCommentFormList[i].commentLikeNums?userCommentFormList[i].commentLikeNums:"0";
                    html += "<li><img class='avatar' src='../image/avatar.png'> <div class='comsMain'><h4>"+userCommentNickName+"</h4> <p>"+userContent+"</p><div class='other cf'><span class='time'>"+userCommentDt+"</span><span class='like'><img src='../image/like-gray.png'>"+commentLikeNums+"</span></div></div></li>";
                }
                    html += "</ul>";
                }else{
                    html+="<p class='noComment'>讚時還沒有評論喔！快去評論吧</p>";
                }
                html+="</div>";
                $('.comTop').html(html);


                if(simpleObjectForm.cooperateStatus!=0){
                    $('.bottomBanner').hide();
                }
                else{
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
    }]);
})(window.gg,jQuery);