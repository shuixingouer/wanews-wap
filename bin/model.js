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
            getDynamicDetail:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/dynamic/detail/'+param.id,{},function(res){
                    resolve(res);
                });
            },
            getStaticDetail:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/static/detail/'+param.id,{},function(res){
                    resolve(res);
                });
            },
            getTopic:function(param,resolve,reject){
                $.get(gg.config.origin+'wap2/topic/list/'+param.id,{page:param.page},function(res){
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
            getComment:function(param,resolve,reject){
                $.get(gg.config.origin+'v2/comment/list/'+param.id,{type:2,page:param.page,size:param.size},function(res){
                    resolve(res);
                });
            },
            getCommentDetail:function(param,resolve,reject){
                $.get(gg.config.origin+'comment/detail/'+param.id,{},function(res){
                    resolve(res);
                });
            },
    getSearchInfo:function(param,resolve,reject){
                $.get(gg.config.origin+'news/search/info',function(res){
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
})(window.gg,jQuery);;
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
            getSearchInfos:function(param,resolve,reject){
                channel.getSearchInfo({newsAuthToken:sessionStorage.getItem('newsAuthToken')},function(res){
                    resolve(res);
                },reject);
            },
            getTopics:function(param,resolve,reject){
                channel.getTopic({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
                    resolve(res);
                },reject);
            },
            getComments:function(param,resolve,reject){
                channel.getComment({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
                    resolve(res);
                },reject);
            },
            getCommentDetails:function(param,resolve,reject){
                channel.getCommentDetail({newsAuthToken:sessionStorage.getItem('newsAuthToken'),id:param.id},function(res){
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
})(window.gg,jQuery);;
(function(){
    window.gg = window.gg || {};
    var hostDomain = window.location.href;
    var hosttemp;
    var gaUaId;
    if(hostDomain.indexOf("http://10.8.82.30:8080")==0){
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
