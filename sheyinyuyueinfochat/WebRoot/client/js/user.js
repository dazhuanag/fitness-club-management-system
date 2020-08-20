/**
 * Created by ideabobo on 14-6-28.
 */

/***************************************用户模块*******************************************/
$(function(){
    var uinfo = localStorage['userinfo'];
    //var f = localStorage['welcomed'];
    //if(f){
        if(uinfo && $.trim(uinfo)!=""){
            uinfo  = JSON.parse(uinfo);
            $("#lusername").val(uinfo.username);
            $("#lpasswd").val(uinfo.passwd);
            uinfo.remember = "1";
            login(uinfo,0);
        }else{
            toMain();
        }
    //}else{
    //    changePage("welcomepage1","none");
    //}

    $("#welcome1").bind("swipeleft tap",function(){
        changePage("welcomepage2");
    });
    $("#welcome2").bind("swipeleft tap",function(){
        changePage("welcomepage3");
    });
    $("#welcome3").bind("swipeleft tap",function(){
        changePage("welcomepage4");
    });
    $("#welcome4").bind("swipeleft tap",function(){
        changePage("welcomepage5");
    });
    $("#welcome5").bind("swipeleft tap",function(){
        changePage("welcomepage6");
    });
    $("#welcome6").bind("swipeleft tap",function(){
        changePage("loginpage");
        localStorage['welcomed'] = "yes";
    });


});
var userinfo = null;
function login(uinfo,checkyzm){
    //if(checkyzm==0){
        doLogin(uinfo);
    /*}else{
        var randcode = $("#yzm").val();
        ajaxCallback("getCodeNumber",{},function(data){
            if(data.info==randcode){
                doLogin(uinfo);
            }else{
                showLoader("验证码错误!",true);
            }
        });
    }*/


}

function doLogin(uinfo){
    var fdata = uinfo || serializeObject($("#loginform"));
    if($.trim(fdata.username)=="" || $.trim(fdata.passwd) == ""){
        showLoader("请输入用户名或密码！",true);
        return;
    }
    //fdata.passwd = $.md5(fdata.passwd);
    ajaxCallback("login",fdata,function(data){
        if(data.info && data.info=="fail"){
            showLoader("用户名或密码错误",true);
            changePage("loginpage");
        }else{
            showLoader("登陆成功!",true);
            userinfo = data;
            if(fdata.remember == "1"){
                //data.passwd = $("#lpasswd").val();
                localStorage["userinfo"] = JSON.stringify(data);
            }else{
                localStorage["userinfo"] = "";
            }
            toMain();
        }
    });
}

function logout(){
    userinfo = null;
    toLogin();
    localStorage["userinfo"] = "";
}

function toRegister(){
    changePage("registerpage");
}

function toLogin(){
    $($(':input','#loginform').get(1)).val("");
    changePage("loginpage");
}
function toMore(){
    if(!userinfo){
        toLogin();
        return;
    }
    changePage('morepage');
    if(userinfo.isjl=="1"){
        $(".jiaolian").show();
        $(".bijiaolian").hide();
    }else{
        $(".jiaolian").hide();
        $(".bijiaolian").show();
    }
}

function register(){

    var randcode = $("#yzm2").val();
    //ajaxCallback("getCodeNumber",{},function(data){
        //if(data.info==randcode){


            var fdata = serializeObject($("#registerform"));
            if($.trim(fdata.username) == "" || $.trim(fdata.passwd) == "" || $.trim(fdata.tel) == "" || $.trim(fdata.address) == ""){
                showLoader("请填写完整信息!",true);
                return;
            }
            if(fdata.tel.length<11){
                showLoader("电话号码格式不对!",true);
                return;
            }
            if(fdata.passwd.length<6){
                showLoader("密码不能小于6位!",true);
                return;
            }
            if(fdata.passwd != fdata.passwd2){
                showLoader("两次密码不一致!",true);
                return;
            }
            //fdata.passwd = $.md5(fdata.passwd);
            uplaodImg(function(r){
                fdata.img = r;
                ajaxCallback("checkUser",fdata,function(d){
                    if(d.info == "success"){
                        ajaxCallback("register",fdata,function(r){
                            if(r.info=="success"){
                                showLoader("注册成功!",true);
                                toLogin();
                            }else{
                                showLoader("注册失败请稍候再试!",true);
                            }
                        });
                    }else{
                        showLoader("用户名已存在!",true);
                    }
                });
            });
        //}else{
            //showLoader("验证码错误!",true);
        //}
    //});


}

function myinfo(){
    changePage("userinfopage");
    $("#editbutton").hide();
    //$("#vusername").text(userinfo.username+" 余额:"+userinfo.money);
    $("#vusername").text(userinfo.username);
    $("#vtel").val(userinfo.tel);
    $("#vqq").val(userinfo.qq);
    $("#vwechat").val(userinfo.wechat);
    $("#vsex").val(userinfo.sex);
    $("#vbirth").val(userinfo.birth);
    $("#vemail").val(userinfo.email);
}

function editUserInfo(){
    $("#editbutton").show();
}

function updateUserInfo(){
    var fdata = serializeObject($("#userform"));
    fdata.id = userinfo.id;
    ajaxCallback("updateUser",fdata,function(r){
        if(r){
            showLoader("保存成功!",true);
            userinfo.qq = fdata.qq;
            userinfo.tel = fdata.tel;
            userinfo.wechat = fdata.wechat;
            userinfo.email = fdata.email;
            userinfo.birth = fdata.birth;
            userinfo.sex = fdats.sex;
        }else{
            showLoader("保存失败,请稍候再试!",true);
        }
    });
}

function toChangePasswd(){
    $("#pusername").text("用户名:"+userinfo.username);
    changePage("passwdpage");
}

function changePasswd(){
    var fdata = serializeObject($("#passwdform"));
    fdata.id = userinfo.id;
    if(fdata.oldpasswd != userinfo.passwd){
        showLoader("原始密码错误！",true);
        return;
    }
    if($.trim(fdata.passwd) == ""){
        showLoader("密码不能为空！",true);
        return;
    }
    if(fdata.passwd != fdata.passwd2){
        showLoader("两次密码不一致！",true);
        return;
    }
    ajaxCallback("changePasswd",fdata,function(r){
        if(r.info == "success"){
            showLoader("保存成功!",true);
        }else{
            showLoader("保存失败,请稍候再试!",true);
        }
    });
}

function updateUserJiaolian(){
    var fdata = serializeObject($("#ruzhuform"));
    fdata.uid = userinfo.id;
    fdata.shop = $("#sid").find("option:selected").text();
    uplaodImg(function (r){
        fdata.jimg = r;
        ajaxCallback("updateUserJiaolian",fdata,function(data){
            showLoader("提交成功!等待审核",function (){
                toMore();
            });
        });
    });
}

function toUser(id){
    ajaxCallback("getUser",{id:id},function(data){
        focusobj = data;
        changePage('userdetail');
        $("#gimg333").attr("src",fileurl+focusobj.jimg);
        $("#susername").text("姓名:"+focusobj.username);
        $("#szizhi").text("可预约时间:"+focusobj.zizhi);
        //$("#szhengshu").text("可预约时间简介:"+focusobj.zhengshu);
        listReplay2();
        $("#sprice").text("收费:"+focusobj.price);

    });
}

/***************************************用户模块*******************************************/




