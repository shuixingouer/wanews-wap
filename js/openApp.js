var mobileAppInstall = (function(){
    var ua = navigator.userAgent,
        loadIframe,
        win = window;

    function getIntentIframe(){
        if(!loadIframe){
            var iframe = document.createElement("iframe");
            iframe.style.cssText = "display:none;width:0px;height:0px;";
            document.body.appendChild(iframe);
            loadIframe = iframe;
        }
        return loadIframe;
    }

    var appInstall = {
        isChrome:ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/) || ua.match(/Safari\/([\d.]+)/) || ua.match(/firefox\/([\d.]+)/) || ua.match(/UCBrowser\/([\d.]+)/),
        isAndroid:ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        timeout:3000,
        /**
         * 尝试跳转appurl,如果跳转失败，进入h5url
         * @param {Object} appurl 应用地址
         * @param {Object} h5url  http地址
         */
        open:function(){
            var that=this;
            var argsArray = Array.prototype.slice.call(arguments);
            var h5url=argsArray.pop();
            this.openApp(argsArray,function(){
                h5url && that.openH5(h5url);
            });
        },
        openApp:function(appurls,cb){
            var t = Date.now();
            if(appurls.length>0){
                var that=this;
                if(appInstall.isChrome){

                    win.location.href = appurls.shift();
                    setTimeout(function(){cb();},1000);
                }else{
                    getIntentIframe().src = appurls.shift();
                }
                setTimeout(function(){
                    if(Date.now() - t < appInstall.timeout+100){
                        that.openApp(appurls,cb)
                    }
                },appInstall.timeout+300);
            }else{
                if(Date.now() - t < appInstall.timeout+100) {
                    cb();
                }
            }
        },
        openH5:function(h5url){
            win.location.href = h5url;
        }
    };

    return appInstall;
})();