
//提交
$('.weui-btn_plain-default').on('click',function () {
    var strData={};
    var list=document.getElementsByTagName("input");
    //对表单中所有的input进行遍历
    for(var i=0;i<list.length && list[i];i++){
        //判断是否为文本框
        if(list[i].type=="text"){
            strData[list[i].id]  = list[i].value;
        }
    }
    $.ajax({
        url:config.api_host+'/company/info/set',
        type:'GET',
        data: strData,
        async : false, //默认为true 异步
        error:function(data){
            alert('error');
        },
        success:function(data){
            if(data.code == 10000){
                window.location.href= '/wechat/views/position.html'
            }else{
                alert(data.msg)
            }
        }
    });

})