(function(gg,$){
    gg.controller('cDetail',['vUser','vChannel',function(vUser,vChannel){
        var ids = idTo();
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
    }]);
})(window.gg,jQuery);