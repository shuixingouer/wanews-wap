(function (gg, $) {
    var hostDomain = window.location.protocol + '//' + window.location.host;
    var hosttemp;
    var gaUaId;
    switch (hostDomain) {
        case 'http://test.www.wanews.co':
            hosttemp ='http://test.www.wanews.co';
            break;
        case 'http://www.wanews.co':
            hosttemp = 'http://www.wanews.co';
            break;
    }
    $.ajax({
        type: 'get',
        url: hosttemp+"/news/search/info",//请求的action路径
        error: function () {//请求失败处理函数
            console.log('error');
        },success:function(res){
            var html="";
            if(res){
                var i= 0,j=0;
                var tags=res.data.tags?res.data.tags:"";
                var topList=res.data.topList?res.data.topList:"";
                var srcUrls;
                html+="<div class='keyword'><h3>热门关键字</h3>";
                for(i;i<tags.length;i++){
                    html+="<a href='wabridge://keywords?keyword="+ tags[i] +"'>"+ tags[i] +"</a>";
                }
                html+="</div>";
                if(topList.length > 0){
                html+="<h3>今日热榜</h3><div class='ranking'>";
                for(j;j<topList.length;j++){
                    html+="<a href='";
                    if(topList[j].cooperateStatus==3){
                        html+="wabridge://newsdetail?objectId="+ topList[j].id +"&type="+ topList[j].type +"&coopstatus="+ topList[j].cooperateStatus +"&srcUrl="+ encodeURIComponent(topList[j].srcUrl);
                    }else{
                        html+="wabridge://newsdetail?objectId="+ topList[j].id +"&type="+ topList[j].type +"&coopstatus="+ topList[j].cooperateStatus;
                    }
                    html+="'><span class='ranking-num'>"+ parseInt(j+1) +"</span>"+ topList[j].title+"</a>";
                }
                html+="</div>";
                }
                $(".search").html(html);
            }else{
                alert('提示','操作失败！','error');
            }
        }
    });
})(window.gg, jQuery);