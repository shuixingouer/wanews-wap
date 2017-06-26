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
                $('.poll-contents').html('<div class="selected '+this.contClass+'" poll-cont="'+i+'"><a href="javascript:void(0);" skip="'+detail+'"><img src="'+src+'"/></a><div class="subTitle"><p>'+title+'</p></div></div>');
                $('.poll-signs-content').html('<div class="selected '+this.signClass+'" animation-type="'+animationType+'" poll-num="'+i+'"></div>');
            }else{
                $('.poll-contents').append('<div class="'+this.contClass+' " poll-cont="'+i+'"><a href="javascript:void(0);" skip="'+detail+'"><img src="'+src+'"/></a><div class="subTitle"><p>'+title+'</p></div> </div>');
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