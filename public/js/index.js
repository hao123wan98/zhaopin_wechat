var config = {
    api_host: 'http://211.159.161.146:8080',
    api_port: 8080,
    pageSize: 14
};
//获取验证码
var validCode = true;
$('.weui-vcode-btn').on('click',function () {
    console.log(99);
    $.ajax({
        url:config.api_host+'/user/smscode/send',
        type:'post',
        data: {
            mobile:$('#mobile').val()
        },
        async : false, //默认为true 异步
        error:function(data){
            alert(error);
        },
        success:function(data){
            if(data.code == 10000){
                var time = 60;
                var code = $("#telcode-btn");
                if (validCode) {
                    validCode = false;
                    code.addClass('disable');
                    var t = setInterval(function () {
                        time--;
                        code.html('已发出' + time + 's');
                        if (time == 0) {
                            clearInterhtml(t);
                            code.val('重新获取');
                            validCode = true;
                            code.removeClass('disable');
                        }
                    }, 1000)
                }
            }else{
                alert(data.msg)
            }
        }
    });

})
//注册
$('.weui-btn_plain-default').on('click',function () {
    $.ajax({
        url:config.api_host+'/user/register',
        type:'post',
        data: {
            mobile:$('#mobile').val(),
            smscode:$('#smscode').val(),
            pwd:hex_md5($('#pwd').val()),
            role:2,
        },
        async : false, //默认为true 异步
        error:function(data){
            alert(error);
        },
        success:function(data){
            if(data.code == 10000){
                window.location.href='/views/wanted/information.html'
            }else{
                alert(data.msg)
            }
        }
    });

})