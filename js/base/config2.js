(function(){
    window.gg = window.gg || {};
    var hostDomain = window.location.protocol + '//' + window.location.host;
    var hosttemp;
    var gaUaId;
        switch (hostDomain) {
            case 'http://test.www.wanews.co':
            case 'http://10.8.82.30:8080':
            case 'http://localhost:8080':
                gaUaId="UA-64549839-4";
                hosttemp ='http://test.www.wanews.co/wap/';
                break;
            case 'http://www.wanews.co':
                gaUaId="UA-64549839-3";
                hosttemp = 'http://www.wanews.co/wap/';
                break;
        }

    window.gg.config = {
        origin: hosttemp,
        //origin:'http://test.www.wanews.co/wap/',
        ga_ua_id: gaUaId
    };
})();
