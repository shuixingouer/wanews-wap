
(function(gg,$){
    gg.controller('cComments',['vUser','vChannel',function(vUser,vChannel){
        var type = gg.util.getUrlParam().type;
        var ids = gg.util.getUrlParam().id;
        //var idLi = gg.util.getUrlParam().idLi;
        var waNews =encodeURIComponent(window.location.href) ;
        sessionStorage.setItem("waNews",waNews);
                        vChannel.getComments({id: ids}, function (res) {
                            var html="";
                            html="<div class ='bottomBanner'>";
                            html+= " <a href='javascript:void(0);' id='banner'><img src='../image/banner.png'/><img src='../image/banner_button.png' class='btn'/></a></div>";
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
                            html +=  " </div></div>";
                            html+="</ul></div>";
                            $('.content').html(html);

                    });

    }]);
})(window.gg,jQuery);