function imgResponsive (obj,pNum){
    var pWTemp;
    var pHTemp;
    var size;
    //var str=$(this)[0].className;;
    //alert(str);
    //alert(str.substr(-1,1));
    //switch($(this).attr("class").substr(-1,1))
    //alert(pNum);
    switch(pNum)
    {
        case 1:
            pWTemp=16;
            pHTemp=9;
            size=100;
            break;

        case 2:
            pWTemp=5;
            pHTemp=3;
            size=100;
            break;

        case 3:
            pWTemp=5;
            pHTemp=3;
            size=32;
            break;



        default:
            alert("比例参数错误！")
    }
    var wpercent = $(obj).width()/pWTemp;
    var hpercent = $(obj).height()/pHTemp;
    var wmax,hmax;
    if(wpercent > hpercent){
        $(obj).height((wpercent-hpercent+hpercent)*pHTemp);
        $(obj).width("auto");
        $(obj).parent().height($(obj).height());
    }else if(wpercent < hpercent){
        $(obj).parent().width(size+"%");
        $(obj).parent().height(wpercent*pHTemp);
    }else{
        $(obj).parent().height($(obj).height());
    }
}

function imgResponsivetwo (obj,pNum){
    var pWTemp;
    var pHTemp;
    switch(pNum)
    {
        case 1:
            pWTemp=2;
            pHTemp=1;
            size=90;
            break;
        default:
            alert("比例参数错误！")
    }
    var wpercent = $(obj).width()/pWTemp;
    var hpercent = $(obj).height()/pHTemp;
    var wmax,hmax;
    if(wpercent > hpercent){
        $(obj).parent().height(wpercent*pHTemp);
        $(obj).width("90%");
    }else if(wpercent < hpercent){
        $(obj).height("1.11rem");
        $(obj).width("auto");
        $(obj).parent().height("1.11rem");
    }else{
        $(obj).parent().height("1.11rem");
    }
}

function loadingImg(a){
    $(a).css('opacity','0.6');
}
function onloadImg(a){
setTimeout(function(){onloadImg_time(a)} ,1000);
}
function onloadImg_time(a){

        $(a).prev().css('opacity','0');
        $(a).css('opacity','1');

}
