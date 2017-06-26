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
    window.onload=function(){
        window.gg.run();

    };

})(jQuery);