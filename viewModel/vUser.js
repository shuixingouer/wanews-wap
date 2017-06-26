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