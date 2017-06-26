(function(gg,$){
    gg.controller('cDetail',['vUser','vChannel',function(vUser,vChannel){
        var ids = idTo();
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
                    html += "<li><a class='theme' href='${entity.dom}client/view/details.html?type="+type+"&id="+id+"'>";
                    html += "<div class='themeImg'><img class='loading' onload='imgResponsive(this,3);loadingImg(this);' src='../image/loading.jpg'><img onload='imgResponsive(this,3);onloadImg(this);'  src='"+smallImageUrl+"'onerror='this.onerror=null; this.src=\"../image/onerror.jpg\"'></div><div class='themeMain'><h4>"+title+"</h4><p><span class='author'>"+webName+"</span><span class='time'>"+playNum+" 播放</span></p></div>";
                    html += "</a></li>";
                }
            }
            html+="</ul></div>";
            $('.recBox').html(html);
        });
    }]);
})(window.gg,jQuery);