(function(gg,$){
    gg.controller('cImage',[function() {
        var srcUrl = gg.util.getUrlParam().srcUrl;
        var src = gg.util.getUrlParam().src; // 这个是干嘛的？
        console.log(decodeURIComponent(src));
        var waNews = decodeURIComponent(sessionStorage.getItem("waNews"));
        var type = gg.util.getUrlParam().type;
        var cooperateStatus = gg.util.getUrlParam().cooperateStatus;
        console.log(cooperateStatus);
        var id = gg.util.getUrlParam().id;
            $('.wa').attr("href",'details.html?type='+type+'&id='+id);
        // 什么逻辑？
        if(srcUrl){
            html="<iframe src='"+decodeURIComponent(srcUrl)+"'></iframe>";
        }else if(src){
            html="<iframe  src='details.html?type='+type+'&id='+id></iframe>";
        }else{
			html="";
        }
        //html="<iframe  src='http://10.8.82.30:8080/wap/2016-11-17-client-wap2/view/details.html?type=6&id=3283035'</iframe>";
        $('.center').html(html);


        /**
         * 获取url中的指定参数的值
         * @param {string} paras 待查询参数
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

        $('.listPromote ul').on('click','li',function(){
            var skip=$(this).children("a").attr("href");
            var id = request(skip,"id");
            var type = request(skip,"type");
            var cooperateStatus = request(skip,"cooperateStatus");
            var wanewsUrl;
                wanewsUrl='wanews://www.wanews.co/gallery/'+ id;
            alert(1);
            mobileAppInstall.open(wanewsUrl,skip);
        });

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
})(window.gg,jQuery);