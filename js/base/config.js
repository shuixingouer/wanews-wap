(function(){
    window.gg = window.gg || {};
    var hostDomain = window.location.href;
    var hosttemp;
    var gaUaId;
    if(hostDomain.indexOf("http://localhost:8080")==0){
        gaUaId="UA-64549839-4";
        hosttemp ='http://test.www.wanews.co/wap/';
    }else
    if(hostDomain.indexOf("http://www.wanews.co/wap")==0){
        gaUaId="UA-64549839-3";
        hosttemp = 'http://www.wanews.co/wap/';
    }else
    if(hostDomain.indexOf("http://test.www.wanews.co/portal")==0){
        hosttemp = 'http://test.www.wanews.co/';
        gaUaId="UA-64549839-5";
    }else
    if(hostDomain.indexOf("http://www.wanews.co/portal")==0){
        hosttemp = 'http://www.wanews.co/';
        gaUaId="UA-64549839-6";
    }
    window.gg.config = {
        origin: hosttemp,
        //origin:'http://test.www.wanews.co/wap/',
        ga_ua_id: gaUaId
    };
})();
