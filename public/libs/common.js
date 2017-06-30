/**
 * Created by bai on 16-11-22.
 */

var zeroModalId = 0;
var myapp= {
        hash:{},
        api_host :'http://211.159.161.146:8080',
        get: function (url, async, fun) {
            var _this = this;
            $.ajax({
                type: "GET",
                async: async,
                url: url,
                dataType: 'text',
                error: function (XHR, textStatus, errorThrown) {
                    var result = {'code': 50000, 'msg': '服务器错误'};
                    if (typeof(fun) == 'undefined') {
                        return result;
                    } else {
                        fun(result);
                    }
                },
                success: function (result) {
                    if (typeof(fun) == 'undefined') {
                        return result;
                    } else {
                        fun(result);
                    }
                }
            });
        },
        getJson: function (url, async, fun) {
            var _this = this;
            $.ajax({
                type: "GET",
                async: async,
                url: url,
                dataType: 'json',
                error: function (XHR, textStatus, errorThrown) {
                    var result = {'code': 50000, 'msg': '服务器错误'};
                    if (typeof(fun) == 'undefined') {
                        return result;
                    } else {
                        fun(result);
                    }
                },
                success: function (result) {
                    if(result.code == 90000){
                            zhenhr.showMsg(result.msg);
                            setTimeout(" window.location.href = '/login';",2000);
                    }
                    if (typeof(fun) == 'undefined') {
                        return result;
                    } else {
                        fun(result);
                    }
                }
            });
        },
        post: function (url, data, async, fun) {
            var _this = this;
            $.ajax({
                type: "POST",
                async: async,
                url: url,
                data: data,
                dataType: "json",
                error: function (XHR, textStatus, errorThrown) {
                    var result = {'code': 50000, 'msg': '请求错误'};
                    if (typeof(fun) == 'undefined') {
                        return result;
                    } else {
                        fun(result);
                    }
                },
                success: function (result) {
                    if(result.code == 90000){
                        zhenhr.showMsg(result.msg);
                    }
                    if (typeof(fun) == 'undefined') {
                        return result;
                    } else {
                        return fun(result);
                    }
                }
            });
        },
        uploadFile: function (url, data, sign,funsuc,progressHandlingFunction) {
            var _this = this;
            $.ajax({
                cache: false,
                type: "POST",
                url: url,
                contentType: false,
                processData: false,
                data: data,
                xhr: function() {  // custom xhr
                    myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload && typeof(funsuc) != 'undefined'){ // check if upload property exists
                        myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
                    }
                    return myXhr;
                },

                // dataType:"json",
                error: function (XHR, textStatus, errorThrown) {
                    var result = {'code': 50000, 'msg': '服务器错误'};
                    if (typeof(uploadFailed) == 'undefined') {
                        return result;
                    } else {
                        uploadFailed(result);
                    }
                },
                success: function (result) {
                    if (typeof(funsuc) == 'undefined') {
                        return result;
                    } else {
                        return funsuc(result);
                    }
                }
            });
        },
        uploadFileToCos: function (file,funsuc,progressHandlingFunction) {
            var _this = this;
            //处理文件
            var ext = $("#"+file).val().replace(/.+\./, "");
            zhenhr.getJson('/sign?ext='+ext,true,function(ret){
                if(ret.code == 10000){
                    console.log('1223',ret);
                    var sign = ret.data.sign;
                    var url = ret.data.uploadUrl;
                    var formData = new FormData();
                    formData.append("filecontent",$("#"+file)[0].files[0]);
                    formData.append("op",'upload');
                    $.ajax({
                        cache: false,
                        type: "POST",
                        url: url,
                        headers : {'Authorization':sign},
                        contentType: false,
                        processData: false,
                        data: formData,
                        xhr: function() {  // custom xhr
                            myXhr = $.ajaxSettings.xhr();
                            if(myXhr.upload && typeof(funsuc) != 'undefined'){ // check if upload property exists
                                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
                            }
                            return myXhr;
                        },

                        // dataType:"json",
                        error: function (XHR, textStatus, errorThrown) {
                            var result = {'code': 50000, 'msg': '服务器错误'};
                            if (typeof(uploadFailed) == 'undefined') {
                                return result;
                            } else {
                                uploadFailed(result);
                            }
                        },
                        success: function (result) {
                            if (typeof(funsuc) == 'undefined') {
                                return result.data.source_url;
                            } else {
                                return funsuc(result.data.source_url);
                            }
                        }
                    });
                    return true;
                }else{
                    zhenhr.showMsg('获取签名失败');
                    return false;
                }
            });
        },
        uploadPrivateFileToCos: function (file,funsuc,progressHandlingFunction) {
        var _this = this;
        //处理文件
        var ext = $("#"+file).val().replace(/.+\./, "");
        zhenhr.getJson('/sign/private?ext='+ext,true,function(ret){
            if(ret.code == 10000){
                var sign = ret.data.sign;
                var url = ret.data.uploadUrl;
                var formData = new FormData();
                formData.append("filecontent",$("#"+file)[0].files[0]);
                formData.append("op",'upload');
                $.ajax({
                    cache: false,
                    type: "POST",
                    url: url,
                    headers : {'Authorization':sign},
                    contentType: false,
                    processData: false,
                    data: formData,
                    xhr: function() {  // custom xhr
                        myXhr = $.ajaxSettings.xhr();
                        if(myXhr.upload && typeof(funsuc) != 'undefined'){ // check if upload property exists
                            myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
                        }
                        return myXhr;
                    },

                    // dataType:"json",
                    error: function (XHR, textStatus, errorThrown) {
                        var result = {'code': 50000, 'msg': '服务器错误'};
                        if (typeof(uploadFailed) == 'undefined') {
                            return result;
                        } else {
                            uploadFailed(result);
                        }
                    },
                    success: function (result) {
                        if (typeof(funsuc) == 'undefined') {
                            return ret.data;
                        } else {
                            return funsuc(ret.data);
                        }
                    }
                });
                return true;
            }else{
                zhenhr.showMsg('获取签名失败');
                return false;
            }
        });
    },
        showMsg :function(Msg){
            iosOverlay({
                text: Msg,
                duration: 2e3,
                icon: ""
            });
            return false;
        },
        view:function(){
            var hash = $.hash();
            var path = window.location.pathname.slice(1);
            var nav = hash.get('nav');
            console.log(nav,090);
            if(typeof(hashurl[path]) != 'undefined'){
                if(typeof(nav) == 'undefined'){
                    nav= hashurl[path]['default'];
                }
                var url = hashurl[path][nav];
                if(typeof(url)!='undefined'){
                    if($("#"+nav).length>0){
                        $(".sub-nav-item").removeClass('on');
                        $("#"+nav).addClass('on');
                    }
                    var id = hash.get('id');
                    if(typeof(id) !='undefined'){
                        url+= '?id='+id;
                    }
                    this.get(url,true,function (data) {
                        var obj = $(data);
                        obj.hide();
                        clearDate();
                        $("#sub-body").html(obj);
                        obj.slideDown(50);
                        $(".menu").css('height','auto');
                        var height = $(document).height();
                        $(".menu").css('height',height);
                        if($.cookie('companyFlag') == 'false' && nav!= 'company'){
                            showFirstSelect();
                        }else{
                            zeroModal.close(zeroModalId);
                        }
                        //底部demo数据悬浮提示
                        if($.cookie('demoFlag') == 'true'){
                            $("#complete-float-div").css('display','block');
                            $("#sub-body").css('padding-bottom','70px');
                        }

                    });
                }else{
                    zhenhr.showMsg('页面不存在');
                }
            }else{
                zhenhr.showMsg('页面不存在');
            }
        },
        formatCurrency:function (num) {
            var result = '';
            var str = (num || 0).toString().split(".");
            result =  str[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            if(typeof(str[1])!= 'undefined'){
                result = result +  '.' + str[1];
            }
            return result;
        }
    };

function showMessagePanel(){
    $("#message-panel").show();
}
function closeMessagePanel() {
    $("#message-panel").hide();
}
function showMessageList() {
    window.location.href ='/message';
}
function clearDate() {
    $(".datepicker").remove();
}

$(window).scroll( function(event) {
    $(".menu").css('height','auto');
   var height = $(document).height();
   $(".menu").css('height',height);
});
function showFirstSelect(){
    zeroModalId= zeroModal.show(
        {
            title:'欢迎来到ZhenHR人力资源系统',
            width:"630px",
            height:"400px",
            url:'/select',
            titleCenter:true,
            close:true,
            ok:false,
            cancel:false
        }
    );
}
function demo() {
    zhenhr.getJson('/demo',true,function (ret) {
        if(ret.code == 10000){
            zhenhr.showMsg('操作成功');
            $.cookie('demoFlag','true');
            $.cookie('companyFlag','true');
            setTimeout(function () {
                zeroModal.close(zeroModalId);
                window.location.href ='/staff';
            },3000);
        }else{
            zhenhr.showMsg(ret.msg);
        }
    })

}
function completeCompany(){
    window.location.href = '/setting?#!nav/company';
}
//员转正工
function pass(id,event) {
    zeroModal.show(
        {
            title:'转正通过',
            width:"300px",
            height:"450px",
            url:'/formal/showpass?id='+id,
            close:true,
            ok:true,
            okTitle:'确认转正',
            okFn:savePass,
            titleCenter:true,
            cancel:true,
            cancelTitle:'取消',
            overlay:true
        }
    );
    tid =id;
    enableAddSave =true;
    event.stopPropagation();
}
function savePass(){
    if(enableAddSave){
        zhenhr.post('/formal/savepass',{id:tid},true,function (ret) {
            if(ret.code=10000){
                zhenhr.showMsg('操作完成');
                setData();
                return true;
            }else{
                zhenhr.showMsg('操作失败');
                return false;
            }
        });
        enableAddSave=false;
    }else{
    }

}
//员工离职
function showConfirm() {
    if($("#leaveDate").val() == ''){
        $("#leaveDate").focus();
        zhenhr.showMsg('请填写离职日期');
        return false;
    }
    if($("#leaveMoney").val() >0  && $("#leaveMoneyDate").val() == ''){
        $("#leaveMoneyDate").focus();
        zhenhr.showMsg('请填写补偿发放日期');
        return false;
    }
    if($("#insuranceEndDate").val() == '' && $("#agreementType").val() == '1'){
        $("#insuranceEndDate").focus();
        zhenhr.showMsg('请填写社保终止日期');
        return false;
    }
    if($("#houseFoundEndDate").val() == ''  && $("#agreementType").val() == '1'){
        $("#houseFoundEndDate").focus();
        zhenhr.showMsg('请填写公积金终止日期');
        return false;
    }

    if($("#leaveNote").val() == ''){
        $("#leaveNote").focus();
        zhenhr.showMsg('请填写原因');
        return false;
    }
    var type = typeArr[$("#leaveReason").val()];
    var date = $("#leaveDate").val();
    var cause = $("#leaveNote").val();
    var name = $("#name").text();
    // var name =$("#name").val();
    var name2 = $("#name2").val();
    if(name2 == '' || name != name2){
        $("#name2").focus();
        zhenhr.showMsg('确认名字错误');
        console.log(name,name2)
        return false;
    }
    var map ={};
    map.zhEid=zhEid2;
    map.leaveMoney = $("#leaveMoney").val();
    map.leaveMoneyDate = $("#leaveMoneyDate").val();
    map.leaveNote = $("#leaveNote").val();
    map.leaveDate = $("#leaveDate").val();
    map.leaveReason = $("#leaveReason").val();
    if($("#agreementType").val() == '1'){
        map.insuranceEndDate = $("#insuranceEndDate").val();
        map.houseFoundEndDate = $("#houseFoundEndDate").val();
    }
    zhenhr.post('/leave/save',map,true,function (ret) {

        if(ret.code == 10000){
            zhenhr.showMsg('操作成功');
            // setTimeout("history.back()",3000);
            return true;
        }else{
            zhenhr.showMsg(ret.msg);
            enableClick =true;
            return false;
        }
    });

}

