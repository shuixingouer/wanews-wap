(function(){
    window.gg= window.gg || {};
    gg.util={
        extend:function(){
            var args=Array.prototype.slice.call(arguments);
            var deep=false;
            var length=args.length;
            if(typeof args[length-1]==='boolean'){
                deep=args[length-1];
                length--;
            }
            var newObj={};
            for(var i= 0;i<length;i++){
                for(var key in args[i]){
                    var v=args[i][key];
                    if(deep && typeof v==='object'){
                        if(v instanceof Array){
                            var arr=[];
                            for(var j=0;j< v.length;j++){
                                if(typeof v[j]==='object'){
                                    arr.push(gg.extend(v[j],true));
                                }else{
                                    arr.push(v[j]);
                                }
                            }
                            v=arr;
                        }else{
                            v=gg.extend(v,true);
                        }
                    }
                    newObj[key]=v;
                }
            }
            return newObj;
        },
        copy:function(obj){
            return JSON.parse(JSON.stringify(obj));
        },
        create:function(superClass){
            if(typeof superClass==='function'){
                var args=Array.prototype.slice.call(arguments);
                function NewF(){
                    superClass.apply(this,args)
                }
                var f=function(){};
                f.prototype=superClass.prototype;
                NewF.prototype=new f();
                NewF.prototype.constructor=NewF;
                return NewF;
            }else{
                return function(){};
            }
        },
        ajax:function(config){
            var con=this.extend({
                type:'GET',
                async:false,
                dataType:'string'
            },config);
            var xhr=new XMLHttpRequest();
            xhr.open(con.type.toUpperCase(),con.url,con.async);
            xhr.onreadystatechange=function(res){
                if (xhr.readyState == 4) {
                    if(xhr.status >= 400){
                        con.error(res);
                    }else{
                        con.success(con.dataType.toUpperCase()==='JSON'?JSON.parse(res.currentTarget.responseText):res.currentTarget.responseText);
                    }
                }
            };
            xhr.send();
        },
        setCookie:function(key,value){
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },
        getCookie:function(key){
            var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        removeCookie:function(key){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=this.getCookie(key);
            if(cval!=null)
                document.cookie= key + "="+cval+";expires="+exp.toGMTString();
        },
        setCache:function(key,value,type){
            if(typeof value==='object'){
                value=JSON.stringify(value);
            }
            switch(type){
                case 'sessionStorage':sessionStorage.setItem(key,value);break;
                case 'localStorage':localStorage.setItem(key,value);break;
                default:sessionStorage.setItem(key,value);
            }
        },
        getCache:function(key){
            var value=sessionStorage.getItem(key) || localStorage.getItem(key);
            try{
                return JSON.parse(value);
            }catch(e){
                return value;
            }
        },
        clearCache:function(){
            sessionStorage.clear();
            localStorage.clear();
        },
        pageScroll:function(){
            var times=setInterval(function(){
                window.scrollBy(0,-50);
                if(document.documentElement.scrollTop==0 && document.body.scrollTop==0){
                    clearInterval(times);
                }
            },20);
        },
        getUrlParam:function(){
            var obj={};
            var param=location.search.split('?');
            param.shift();
            var paramStr=param.join('');
            if(paramStr){
                var params=paramStr.split('&');
                for(var i= 0,j=params.length;i<j;i++){
                    var arr=params[i].split('=');
                    obj[arr[0]]=arr[1];
                }
            }
            return obj;
        },
        formatDate:function(time){
            var ts=new Date().getTime()-time;
            if(ts<900000){
                return '剛剛';
            }else if(ts<3600000){
                return parseInt(ts/60000)+'分鐘前';
            }else if(ts<86400000){
                return parseInt(ts/3600000)+'小時前';
            }else if(ts<172800000){
                return '昨天';
            }else if(ts<604800000){
                return parseInt(ts/86400000)+'天前';
            }else{
                return getFormatDateByLong(time, "yyyy-MM-dd");
            }
        },
        formatSecond:function(msd){
            var time = parseFloat(msd) ;
            if (null != time && "" != time) {
                if (time > 60) {
                    time = parseInt(time / 60.0) + ":" + parseInt((parseFloat(time / 60.0) -
                            parseInt(time / 60.0)) * 60);
                }
                else {
                    time = "00:" + parseInt(time);
                }
            }
            return time;
        },
        browserVersion:function(){

            var u = navigator.userAgent || navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: navigator.userAgent.indexOf('Trident') > -1, //IE内核
                presto: navigator.userAgent.indexOf('Presto') > -1, //opera内核
                webKit: navigator.userAgent.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1, //火狐内核
                mobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: navigator.userAgent.indexOf('iPad') > -1, //是否iPad
                webApp: navigator.userAgent.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        util:{
            splitWhite:function(str){
                return str.match(/\S+/g) || [];
            }
        }
    }

    /*long类型的时间转换成日期*/
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    function getSmpFormatDate(date, isFull) {
        var pattern = "";
        if (isFull == true || isFull == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        } else {
            pattern = "yyyy-MM-dd";
        }
        return getFormatDate(date, pattern);
    }

    function getSmpFormatNowDate(isFull) {
        return getSmpFormatDate(new Date(), isFull);
    }

    function getSmpFormatDateByLong(l, isFull) {
        return getSmpFormatDate(new Date(l), isFull);
    }

    function getFormatDateByLong(l, pattern) {
        return getFormatDate(new Date(l), pattern);
    }

    function getFormatDate(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.format(pattern);
    }



})();
