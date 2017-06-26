(function(gg,$){
    gg.viewModel('vChannel',['channel',function(channel){
        var that=this;
        return {
            getContent:function(param,resolve,reject){
                channel.getData({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id,since:param.since},function(res){
                    resolve(res);
                },reject);
            },
            getLists:function(param,resolve,reject){
                channel.getList({newsAuthToken:sessionStorage.getItem('newsAuthToken')},function(res){
                    resolve(res);
                },reject);
            },
            getDynamicDetails:function(param,resolve,reject){
                channel.getDynamicDetail({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
                    resolve(res);
                },reject);
            },
            getStaticDetails:function(param,resolve,reject){
                channel.getStaticDetail({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
                    resolve(res);
                },reject);
            },
            getActions:function(param,resolve,reject){
                channel.getAction({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id,actionType:param.actionType,objectType:param.objectType,num:param.num},function(res){
                    resolve(res);
                },reject);
            },
            getTagLists:function(param,resolve,reject){
                channel.getTagList({newsAuthToken:sessionStorage.getItem('newsAuthToken')},function(res){
                    resolve(res);
                },reject);
            },
            getSearches:function(param,resolve,reject){
                channel.getSearch({newsAuthToken:sessionStorage.getItem('newsAuthToken')},function(res){
                    resolve(res);
                },reject);
            },
            getTopics:function(param,resolve,reject){
                channel.getTopic({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
                    resolve(res);
                },reject);
            },
            getImages:function(param,resolve,reject){
                channel.getImage({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
                    resolve(res);
                },reject);
            }

        }
    }]);
})(window.gg,jQuery);;
(function(gg,$){
    gg.viewModel('vUser',['user',function(user){
        var that=this;
        return {
            //login:function(param,resolve,reject){
            //},
            //anonymous:function(param,resolve,reject){
                //if(sessionStorage.getItem('newsAuthToken')){
                //    resolve();
                //}else if(gg.util.getCookie('newsAuthToken')){
                //    sessionStorage.setItem('newsAuthToken',gg.uril.getCookie('newsAuthToken'));
                //}else{
                //    user.anonymous(param,function(res){
                //        sessionStorage.setItem('newsAuthToken',res.data.newsAuthToken);
                //        resolve();
                //    },reject);
                //}
            //}
        }
    }]);
})(window.gg,jQuery);