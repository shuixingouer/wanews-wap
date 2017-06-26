(function(){
    window.gg = window.gg || {};
    var hostDomain = window.location.protocol + '//' + window.location.host;
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        hostDomain = hostDomain + "/wap";
    }else{
        hostDomain = hostDomain + "/portal";
    }
    var hosttemp;
    var gaUaId;
        switch (hostDomain) {
            case 'http://test.www.wanews.co/wap':
            //case 'http://10.8.82.30:8080':
            //case 'http://localhost:8080':
                gaUaId="UA-64549839-4";
                hosttemp ='http://test.www.wanews.co/wap/';
                break;
            case 'http://www.wanews.co/wap':
                gaUaId="UA-64549839-3";
                hosttemp = 'http://www.wanews.co/wap/';
                break;
            case 'http://test.www.wanews.co/portal':
                hosttemp = 'http://test.www.wanews.co/';
                gaUaId="UA-64549839-5";
                break;
            case 'http://www.wanews.co/portal':
                hosttemp = 'http://www.wanews.co/';
                gaUaId="UA-64549839-6";
                break;
        }

    window.gg.config = {
        origin: hosttemp,
        //origin:'http://test.www.wanews.co/wap/',
        ga_ua_id: gaUaId
    };
})();
