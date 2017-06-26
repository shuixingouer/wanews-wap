(function(gg,$){
    gg.controller('cDetail',['vUser','vChannel',function(vUser,vChannel){
        var ids = idTo();
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
    }]);
})(window.gg,jQuery);