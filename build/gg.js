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
            if(ts<60000){
                return '剛剛';
            }else if(ts<3600000){
                return parseInt(ts/60000)+'分鐘前';
            }else if(ts<86400000){
                return parseInt(ts/3600000)+'小時前';
            }else{
                return parseInt(ts/86400000)+'天前';
            }
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
})();
;
(function($){
    function Provide(name,list,parent){
        this.name=name;
        this.parent=parent;
        if(list){
            this.params=list.length==1?[]:list.splice(0,list.length-1);
            this.cb=list.pop();
        }
    }

    function Model(){
        Provide.apply(this,arguments);
        this.cache=null;
    }
    Model.prototype=new Provide();
    Model.prototype.setData=function(data){
        this.cache= window.gg.util.copy(data);
        return this.cache;
    };
    Model.prototype.getData=function(){
        return this.cache;
    };

    function ViewModel(){
        Provide.apply(this,arguments);
    }
    ViewModel.prototype=new Provide();

    function Controller(){
        Provide.apply(this,arguments);
    }
    Controller.prototype=new Provide();
    Controller.prototype.run=function(){
        this.cb.apply(this,this.parent.go(this.params,this.name));
    };

    window.gg= $.extend(window.gg || {},{
        pros:{},
        controls:{},

        provide:function(name,list,type){
            var obj=null;
            switch (type){
                case 'model':obj=this.pros[name]=new Model(name,list,this);break;
                case 'viewModel':obj=this.pros[name]=new ViewModel(name,list,this);break;
                case 'provide':obj=this.pros[name]=new Provide(name,list,this);break;
                case 'controller':obj=this.controls[name]=new Controller(name,list,this);break;
            }
            return obj;
        },
        controller:function(name,list){
            return this.provide(name,list,'controller');
        },
        model:function(name,list){
            return this.provide(name,list,'model');
        },
        viewModel:function(name,list){
            return this.provide(name,list,'viewModel');
        },
        run:function(){
            for(var key in this.controls){
                this.controls[key].cb.apply(this.controls[key],this.go(this.controls[key].params,key));
            }
        },
        go:function(p,key){
            var arr=[];
            for(var i= 0,j= p.length;i<j;i++){
                var obj=this.pros[p[i]];
                if(obj.params.length==0){
                    arr.push(this.pros[p[i]].cb());
                }else{
                    arr.push(this.pros[p[i]].cb.apply(this.pros[p[i]],this.go(obj.params,p[i])));
                }
            }
            return arr;
        }
    });
    $(function(){
        window.gg.run();
    })
})(jQuery);;
(function($){
    function ImgPoll(poll){
        this.poll=$(poll);
        this.pollStr=poll;
        this.theme='img-poll';
        this.nowCont={};
        this.nowSign={};
        this.contClass='poll-content';
        this.signClass='poll-sign';
        this.config={
            animationType:'leftOutRightInSlide',
            data:[],
            auto:true,
            period:5000
        };
        this.inter=null;
    }
    ImgPoll.prototype.kinds={
        leftRightSlide:['left-slide-in','right-slide-in','out','out'],
        leftOutRightInSlide:['right-slide-in','right-slide-in','left-slide-out','left-slide-out'],
        fade:['fade-in','fade-in','fade-out','fade-out'],
        scale:['scale-in','scale-in','scale-out','scale-out'],
        rotateAndScale:['rotate-scale-in','rotate-scale-in','rotate-scale-out','rotate-scale-out'],
        leftRightRotate:['left-rotate-in','right-rotate-in','right-rotate-out','left-rotate-out']
    };
    ImgPoll.prototype.init=function(config){
        $.extend(this.config,config);
        this.poll.addClass(this.theme);
        this.build();
        this.bindEvent();
        this.autoDo();
    };
    ImgPoll.prototype.build=function(){
        this.poll.html('<div class="poll-contents cf"></div><div class="poll-signs"><div class="poll-signs-content"></div></div>');
        var data=this.config.data;
        var poll=this.poll;

        for(var i=0,j=data.length;i<j;i++){
            var src=typeof data[i]==='string'?data[i]:data[i].url;
            var title=typeof data[i]==='string'?data[i]:data[i].bannerTitle;
            var detail = typeof data[i]==='string'?data[i]:data[i].detail;
            //var title=typeof data[i]==='string'?data[i]:data[i].title;
           // var src = data[i][0];
            var animationType=typeof data[i]==='string'?data[i].animationType:this.config.animationType;
            if(i===0){
                $('.poll-contents').html('<div class="selected '+this.contClass+'" poll-cont="'+i+'"><a skip="'+detail+'"><img src="'+src+'"/></a><div class="subTitle"><p>'+title+'</p></div></div>');
                $('.poll-signs-content').html('<div class="selected '+this.signClass+'" animation-type="'+animationType+'" poll-num="'+i+'"></div>');
            }else{
                $('.poll-contents').append('<div class="'+this.contClass+' " poll-cont="'+i+'"><a skip="'+detail+'"><img src="'+src+'"/></a><div class="subTitle"><p>'+title+'</p></div> </div>');
                $('.poll-signs-content').prepend('<div class="'+this.signClass+'" animation-type="'+animationType+'" poll-num="'+i+'"></div>');
            }
        }
        $('.poll-contents img').load(function(){
            var height=$('.poll-contents img').height();
            poll.css('height',height+'px');
        });
        this.nowSign=this.poll.find('.poll-sign.selected');
        this.nowCont=this.poll.find('.poll-contents .selected');
    };
    ImgPoll.prototype.bindEvent=function(){
        var that=this;
        this.poll.on('mouseover','.poll-sign',function(e){
            var num=$(this).attr('poll-num');
            var obj=$(that.pollStr+' .poll-contents [poll-cont="'+num+'"]');
            var it=this;
            function slide(typeIn,typeOut){
                var kings=that.kinds[$(it).attr('animation-type')];
                that.nowCont.removeClass().addClass(that.contClass).addClass(kings[typeOut]);
                obj.removeClass().addClass('selected').addClass(that.contClass).addClass(kings[typeIn]);
                $(that.pollStr+' .poll-sign').removeClass('selected');
                $(it).addClass('selected');
            }
            if(parseInt(that.nowSign.attr('poll-num'))<parseInt($(this).attr('poll-num'))){
                slide(1,3);
            }else if(parseInt(that.nowSign.attr('poll-num'))>parseInt($(this).attr('poll-num'))){
                slide(0,2);
            }
            that.nowCont=obj;
            that.nowSign=$(this);
            clearInterval(that.inter);
            that.autoDo();
            e.stopPropagation();
        });
    };
    ImgPoll.prototype.autoDo=function(){
        if(this.config.auto){
            var that=this;
            this.inter=setInterval(function(){
                that.toDo();
            },this.config.period);
        }
    };
    ImgPoll.prototype.toDo=function(){
        var obj=this.poll.find('.poll-sign.selected').prev();
        if(obj.length>0){
            obj.trigger('mouseover');
        }else{
            $('.poll-sign:last-child').trigger('mouseover');
        }
    };
    window.gg= window.gg || {};
    window.gg.ImgPoll=ImgPoll;
})(jQuery);