(function(gg,$){
    gg.model('channel',[function(){
        var that=this;
        return {
            getData:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/channel/'+param.id,{since:param.since},function(res){
                    resolve(res);
                });
            },
            getList:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/channel/list',{},function(res){
                    resolve(res);
                });
            },
            /*getDynamicDetail:function(param,resolve,reject){
                $.get(gg.config.origin+'news/dynamic/detail/'+param.id,{newsAuthToken:param.newsAuthToken},function(res){
                    resolve(res);
                });
            },*/
            getStaticDetail:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/static/detail/'+param.id,{},function(res){
                    resolve(res);
                });
            },
            getTopic:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/topic/list/'+param.id,{},function(res){
                    resolve(res);
                });
            },
            getImage:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/imagearry/detail/'+param.id,{},function(res){
                    resolve(res);
                });
            },
            /*getAction:function(param,resolve,reject){
                $.post('http://test.www.wanews.co/news/action/'+param.id,{newsAuthToken:param.newsAuthToken,actionType:param.actionType,objectType:param.objectType,num:param.num},function(res){
                    resolve(res);
                });
            },*/
            getTagList:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/tag/list',{actionType:param.actionType,objectType:param.objectType,num:param.num},function(res){
                    resolve(res);
                });
            },
    getSearch:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/search',{keyword:"ʲô"},function(res){
                    resolve(res);
                });
            }
        }
    }]);
})(window.gg,jQuery);;
(function(gg,$){
    gg.model('user',[function(){
        var that=this;
        return {
            //anonymous:function(param,resolve,reject){
            //    $.post(gg.config.origin,{userSourceType:1},function(res){
            //        resolve(res);
            //    },'json');
            //},
            //login:function(param,resolve,reject){
            //    $.get(gg.config.origin,{},function(res){
            //        resolve(res);
            //    });
            //}
        }
    }]);
})(window.gg,jQuery);