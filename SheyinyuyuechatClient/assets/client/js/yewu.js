/**
 * Created by Bowa on 2014/8/28.
 */
var shoplist = [];
var goodlist = [];
var billlist = [];
var noticelist = [];
var focusobj = null;
var focushop = null;
var focuspost = null;
var gouwuche = "gouwuche";
var postslist = [];
var focuslist = [];





var chattimmer = null;
var iftobutton = true;
var path = "";
var isRecordStart = false;
var counttimmer = null;
var count = 0;
var _chattype = 1;//1朋友聊天,2群聊天
var _mingancis = null;
var focususer = null;





var pr6 = {};
pr6.tpl = '<li>'+
    '<h2>%s</h2>'+
    '<p>%s</p>'+
    '<p>%s</p>'+
    '</li>';
pr6.colums = ["ndate","note","username"];

var pr6d = {};
pr6d.tpl = '<li>'+
    '<h2>%s</h2>'+
    '<p>%s</p>'+
    '<p>%s</p>'+
    '<p onclick="delReplay(%s)" style="color: red;float: right;">删除</p>'+
    '</li>';
pr6d.colums = ["ndate","note","username","id"];
$(function(){
    var tplnote = {};
    tplnote.tpl = '<li onclick="noteiceDetail(%s);">'+
        '<img src="'+fileurl+'%s" style="height: 80px;margin-left: 5px;margin-top: 10px;">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    tplnote.colums = ["id","img","title","ndate"];
    $("#noticeList").data("property",JSON.stringify(tplnote));
//设置类别列表
    var p = {};
    p.tpl = '<li onclick="shopdetail(%s);">'+
                '<img src="'+fileurl+'%s" style="height: 80px;margin-left: 5px;margin-top: 10px;">'+
                '<h2>%s</h2>'+
                '<p>%s</p>'+
                //'<p style="color: red;">最低:%s/小时</p>'+
            '</li>';
    p.colums = ["id","img","sname","address","price"];
    $("#shops").data("property",JSON.stringify(p));

    var p2 = {};
    p2.tpl = '<li onclick="toGood(%s);">'+
        '<img src="'+fileurl+'%s" class="myliimg">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        //'<p style="color: red;">%s 元/小时</p>'+
        '</li>';
    p2.colums = ["id","img","gname","note","price"];
    $("#shopgoods").data("property",JSON.stringify(p2));
    $("#goods").data("property",JSON.stringify(p2));

    var p2u = {};
    p2u.tpl = '<li onclick="toUser(%s);">'+
        '<img src="'+fileurl+'%s" class="myliimg">'+
        '<h2>%s</h2>'+
        //'<p style="color: red;">%s 元/小时</p>'+
        '</li>';
    p2u.colums = ["id","jimg","username"];
    $("#users").data("property",JSON.stringify(p2u));

    var p3 = {};
    p3.tpl = '<li>'+
        '<img src="'+fileurl+'%s" class="ui-li-thumb">'+
        '<h2>%s</h2>'+
        '<p style="color: red;">%s 元</p>'+
        '<p class="ui-li-aside"><a href="#" onclick="removeCar(%s);" style="font-size: 20px;text-decoration:none;">删除</a></p>'+
        '</li>';
    p3.colums = ["img","gname","price","id"];
    $("#cars").data("property",JSON.stringify(p3));

    var p4 = {};
    p4.tpl = '<li><a href="#" onclick="billDetail(%s);">'+
        '<h2>%s %s点到%s点</h2>'+
        '<p>%s</p>'+
        //'<p style="color: red;">总价:%s</p>'+
        '<p>电话:%s</p>'+
        '</a></li>';
    p4.colums = ["id","todate","toh","endh","shop","tel"];
    $("#bills").data("property",JSON.stringify(p4));

    var p42 = {};
    p42.tpl = '<li><a href="#" onclick="billDetail(%s);">'+
        '<h2>%s %s点到%s点</h2>'+
        '<p>%s</p>'+
        //'<p style="color: red;">总价:%s</p>'+
        '<p>电话:%s</p>'+
        '</a><a href="#" onclick="delBill(%s);">del</a></li>';
    p42.colums = ["id","todate","toh","endh","shop","tel","id"];
    $("#bills2").data("property",JSON.stringify(p42));

    var p5 = {};
    p5.tpl = '<li onclick="postDetail(%s);">'+
    '<h2>%s</h2>'+
    '<p>%s</p>'+
    '</li>';
    p5.colums = ["id","title","ndate"];
    $("#posts").data("property",JSON.stringify(p5));




    var p66 = {};
    p66.tpl = '<li><a href="#" onclick="">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '</a></li>';
    p66.colums = ["ndate","note","username"];
    $("#replays2").data("property",JSON.stringify(p66));


    var p222 = {};
    p222.tpl = '<li onclick="toFenxi();">'+
        '<h2>%s</h2>'+
        '<p>心率:%s</p>'+
        '<p>体温:%s</p>'+
        '<p>步数:%s</p>'+
        '<p>血压:%s</p>'+
        '<p>备注:%s</p>'+
        '</li>';
    p222.colums = ["ndate","xinlv","tiwen","bushu","xueya","note"];
    $("#goods2").data("property",JSON.stringify(p222));




    /*****************好友聊天相关***************************/
    var pppp = {};
    pppp.tpl = '<li>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '</li>';
    pppp.colums = ["note","username","ndate"];
    $("#msglist").data("property",JSON.stringify(pppp));

    var fp = {};
    fp.tpl = '<li><a  onclick="toUserInfo(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</a><a href="#" onclick="toChat(%s,1)"></a></li>';
    fp.colums = ["id","img","username","sex","id"];
    $("#myfriendlist").data("property",JSON.stringify(fp));


    var fpp = {};
    fpp.tpl = '<li onclick="toUserInfo(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    fpp.colums = ["id","img","username","sex"];
    $("#userlist").data("property",JSON.stringify(fpp));

    var fppp = {};
    fppp.tpl = '<li onclick="toYzMessage(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    fppp.colums = ["id","img","fuser","ndate"];
    $("#messagelist").data("property",JSON.stringify(fppp));


    $("#recordbtn").unbind("click").bind("click",function(){
        if(isRecordStart){
            isRecordStart = false;
            hideLoader();
            $("#recordbtn").text("点击录音");
            path = myObj.getRecordFile();
            setTimeout(function(){
                sendMsg(path,2);
            },2000);
            clearInterval(counttimmer);
            count = 0;
            myObj.stopSound();
        }else{
            isRecordStart = true;
            $("#recordbtn").text("录音中");
            //showLoader("录音中 "+count+"s",true);
            counttimmer = setInterval(function(){
                //showLoader("录音中 "+count+"s",true);
                $("#recordbtn").text("录音中"+count+"s");
                count++;
            },1000);
            myObj.recordSound();
        }

    });

    $("#filebutton").unbind("click").bind("click",function(){
        sendFile();
    });

    /*****************好友聊天相关***************************/

});

function toNotice(){
    changePage("noticepage");
    listNotice();
}


function noteiceDetail(id){
    changePage("noticedetailpage");
    var good = findObjById(id,noticelist);
    if(good){
        focusobj = good;
        $("#ntitle").text(good.title);
        $("#nndate").text("时间:"+good.ndate);
        $("#nnote").text(good.note);
        $("#nimg").attr("src",fileurl+good.img);
    }
}

function delBill(id){
    ajaxCallback("deleteBill",{id:id},function(data){
        toMyBill2();
    });
}

function toAddNotice(){
    changePage("noticeaddpage");
}

function addNotice(){
    var fdata = serializeObject($("#noticeform"));
    ajaxCallback("addNotice",fdata,function(){
        toNotice();
    });
}

function listNotice(){
    ajaxCallback("listNotice",{sid:(focushop.id||"")},function(data){
        noticelist = data;
        $("#noticeList").refreshShowListView(data);
    });
}

function checkYuyue(){
    if(!userinfo){
        toLogin();
        return;
    }
    var todate = $("#todate").val();
    var toh = $("#toh").val();
    var stayh = $("#stayh").val();
    var endh = parseInt(toh)+parseInt(stayh);
    if(todate&&toh&&stayh){
        focusobj.endh = endh;
        focusobj.toh = toh;
        focusobj.todate = todate;
        focusobj.total = parseInt(stayh)*focusobj.price;
        ajaxCallback("checkYuyue",{id:focusobj.id,todate:todate,toh:toh,endh:endh},function(data){
            if(data.info=="-1"){
                showLoader("此时间段已被占用",true);
            }else{
                tijiaouser();
            }
        });
    }else{
        showLoader("请输入完整信息!",true);
    }

}

function tijiaouser(){
    //var note = $("#infobeizhu2").val();
    var bill = {};
    bill.uid = userinfo.id;
    bill.user = userinfo.username;
    bill.shop = focushop.sname;
    bill.sid = focushop.id;
    bill.gids = focusobj.id;
    bill.gnames = focusobj.gname || focusobj.sname;
    bill.total = focusobj.total;
    bill.tel = userinfo.tel;
    bill.toh = focusobj.toh;
    bill.endh = focusobj.endh;
    bill.todate = focusobj.todate;
    bill.status = 1;


    //bill.address = userinfo.address;
    //bill.note = note;
    ajaxCallback("saveBill",bill,function(){
        showTipTimer("预约提交成功!",function(){
            toMyBill();
        });

    });
}


function checkYuyue2(){
    if(!userinfo){
        toLogin();
        return;
    }
    var todate = $("#todate2").val();
    var toh = $("#toh2").val();
    var stayh = $("#stayh2").val();
    var endh = parseInt(toh)+parseInt(stayh);
    if(todate&&toh&&stayh){
        focusobj.endh = endh;
        focusobj.toh = toh;
        focusobj.todate = todate;
        focusobj.total = parseInt(stayh)*focusobj.price;
        ajaxCallback("checkYuyue",{id:focusobj.id,todate:todate,toh:toh,endh:endh},function(data){
            if(data.info=="-1"){
                showLoader("此时间段已被占用",true);
            }else{
                tijiaouser2();
            }
        });
    }else{
        showLoader("请输入完整信息!",true);
    }

}

function tijiaouser2(){
    //var note = $("#infobeizhu2").val();
    var bill = {};
    bill.uid = userinfo.id;
    bill.user = userinfo.username;
    bill.shop = focushop.sname;
    bill.sid = focushop.id;
    bill.gids = focusobj.id;
    bill.gnames = focusobj.username;
    bill.total = focusobj.total;
    bill.tel = userinfo.tel;
    bill.toh = focusobj.toh;
    bill.endh = focusobj.endh;
    bill.todate = focusobj.todate;
    bill.status = 1;


    //bill.address = userinfo.address;
    //bill.note = note;
    ajaxCallback("saveBill",bill,function(){
        showTipTimer("预约提交成功!",function(){
            toMyBill();
        });

    });
}

function toMain(){
    changePage("mainpage");
    listShop();
    //toGoods();
    initswiper();
}

function listShop(){
    ajaxCallback("listShop",{},function(data){
        shoplist = data;
        $("#shops").refreshShowListView(data);
    });
}

function toShop(id){
    for(var i=0;i<shoplist.length;i++){
        if(shoplist[i].id == id){
            focushop = shoplist[i];
            break;
        }
    }
    toGoods()
}

function toGoods(id){
    var sid = id || "";
    changePage("goodspage");
    listType();
    listGood(sid);
}

function refreshGood(title,type){
    var stype = title || $("#type").val() || "";
    ajaxCallback("listGood",{stitle:title,stype:stype},function(data){
        $("#goods").refreshShowListView(data);
    });
}

function listGood(sid){
    ajaxCallback("listGood",{sid:sid},function(data){
        goodlist = data;
        $("#goods").refreshShowListView(data);
    });
}

function listGoodShop(sid){
    ajaxCallback("listGood",{sid:sid},function(data){
        goodlist = data;
        $("#shopgoods").refreshShowListView(data);
    });
}

function listJiaolian(sid){
    ajaxCallback("listJiaolian",{sid:sid},function(data){
        $("#users").refreshShowListView(data);
    });
}

function listType(){
    ajaxCallback("listType",{},function(data){
        $("#type").empty();
        var html = "<option value=''>请选择</option>";
        $("#type").append(html);
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var html = "<option value='"+obj.id+"'>"+obj.title+"</option>";
            $("#type").append(html);
        }
    });
}

function toGood(id){
    var obj = getGoodById(id);
    focusobj = obj;
    changePage("gooddetail");
    $("#gname33").text("编号:"+obj.gname);
    $("#gimg33").attr("src",fileurl+obj.img);
    $("#gnote33").text("简介:"+obj.note);
    $("#gprice33").text("价格:"+obj.price);
}


function shopdetail(id){
    var obj = getObjectById(id,shoplist);
    focushop = obj;
    changePage("shopdetail");
    $("#gname3").text("健身房名:"+obj.sname);
    $("#gimg3").attr("src",fileurl+obj.img);
    $("#gnote3").text("介绍:"+obj.note);
    $("#gprice3").text("地址:"+obj.address);
    listGoodShop(focushop.id);
    listJiaolian(focushop.id);
}

function getGoodById(id){
    for(var i=0;i<goodlist.length;i++){
        var good = goodlist[i];
        if(good.id == id){
            return good;
        }
    }
    return null;
}



function tijiao(){
    if(userinfo){
        changePage("infopage2");
        if(focusobj.sname){
            $("#billimg").attr("src","images/site.jpg").show();
        }else{
            $("#billimg").hide();
        }
        $("#iscar2").val("1");
    }else{
        changePage("infopage");
        $("#iscar").val("1");
    }
}

function tijiaoyouke(){
    var tel = $("#infotel").val();
    var address = $("#infoaddress").val();
    var note = $("#infobeizhu").val();
    if($.trim(tel)=="" || $.trim(address)==""){
        showLoader("请填写电话和地址信息!",true);
        return;
    }
    if(tel.length<11){
        showLoader("请填写正确的电话号码!",true);
        return;
    }
    var bill = {};
    bill.shop = focushop.sname;
    bill.sid = focushop.id;
    bill.gids = focusobj.id;
    bill.gnames = focusobj.gname;
    bill.total = focusobj.price;
    bill.tel = tel;
    bill.address = address;
    bill.note = note;
    ajaxCallback("saveBill",bill,function(){
        showLoader("预约提交成功!",true);
        showTipTimer("预约提交成功!",function(){
            toMyBill();
        });

    });
}

function youketijiao(){
    var type = $("#iscar").val();
    if(type == 1){
        tijiaoyouke();
    }else{
        tijiaocaryouke();
    }
}

function usertijiao(){
    var type = $("#iscar2").val();
    if(type == 1){
        tijiaouser()
    }else{
        tijiaocaruser();
    }
}

function addToCar(){
    var str = localStorage[gouwuche];
    var list = [];
    if(str){
        list = JSON.parse(str);
    }
    list.push(focusobj);
    localStorage[gouwuche] = JSON.stringify(list);
    showLoader("已经添加到收藏!",true);
}

function showCar(){
    changePage("carspage");
    carlist();
}

function carlist(){
    var str = localStorage[gouwuche];
    var list = [];
    if(str){
        list = JSON.parse(str);
    }
    $("#cars").refreshShowListView(list);
}

function removeCar(id){
    var str = localStorage[gouwuche];
    var list = [];
    var newlist = [];
    if(str){
        list = JSON.parse(str);
        for(var i=0;i<list.length;i++){
            var obj = list[i];
            if(obj.id == id){
                continue;
            }
            newlist.push(obj);
        }
        localStorage[gouwuche] = JSON.stringify(newlist);
        $("#cars").refreshShowListView(newlist);
    }
}

function tijiaocar(){
    if(userinfo){
        changePage("infopage2");
        $("#iscar2").val("2");
    }else{
        changePage("infopage");
        $("#iscar").val("2");
    }
}

function tijiaocaruser(){
    var note = $("#infobeizhu2").val();
    var str = localStorage[gouwuche];
    var sids = [];
    var shopgoods = {};
    var bills = [];
    if(str){
        var list = JSON.parse(str);
        for(var i=0;i<list.length;i++){
            var flag = false;
            var good = list[i];
            for(var n=0;n<sids.length;n++){
                if(sids[n]==good.sid){
                    shopgoods[good.sid].push(good);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                shopgoods[good.sid] = [];
                shopgoods[good.sid].push(good);
                sids.push(good.sid);
            }
        }
    }

    for(var i=0;i<sids.length;i++){
        var goodlist = shopgoods[sids[i]];
        var gids = "";
        var gnames = "";
        var sname = "";
        var total = 0;
        var sid = sids[i];
        var bill = {};
        bill.uid = userinfo.id;
        bill.user = userinfo.username;
        for(var n=0;n<goodlist.length;n++){
            var good = goodlist[n];
            if(n==0){
                sname = good.shop;
                gids+=good.id;
                gnames+=good.gname;
            }else{
                gids+=","+good.id;
                gnames+=","+good.gname;
            }
            total+=parseInt(good.price);
        }
        bill.shop = sname;
        bill.sid = sid;
        bill.gids = gids;
        bill.gnames = gnames;
        bill.total = total;
        bill.tel = userinfo.tel;
        bill.address = userinfo.address;
        bill.note = note;
        bills.push(bill);
    }
    if(bills.length){
        ajaxCallback("saveBills",{bills:JSON.stringify(bills)},function(data){
            localStorage[gouwuche] = "";
            showTipTimer("预约提交成功!",function(){
                toMyBill();
            });
        });
    }

}

function tijiaocaryouke(){
    var tel = $("#infotel").val();
    var address = $("#infoaddress").val();
    var note = $("#infobeizhu").val();
    if($.trim(tel)=="" || $.trim(address)==""){
        showLoader("请填写电话和地址信息!",true);
        return;
    }
    if(tel.length<11){
        showLoader("请填写正确的电话号码!",true);
        return;
    }
    var str = localStorage[gouwuche];
    var sids = [];
    var shopgoods = {};
    var bills = [];
    if(str){
        var list = JSON.parse(str);
        for(var i=0;i<list.length;i++){
            var flag = false;
            var good = list[i];
            for(var n=0;n<sids.length;n++){
                if(sids[n]==good.sid){
                    shopgoods[good.sid].push(good);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                shopgoods[good.sid] = [];
                shopgoods[good.sid].push(good);
                sids.push(good.sid);
            }
        }
    }

    for(var i=0;i<sids.length;i++){
        var goodlist = shopgoods[sids[i]];
        var gids = "";
        var gnames = "";
        var sname = "";
        var total = 0;
        var sid = sids[i];
        var bill = {};
        bill.uid = "";
        bill.user = "";
        for(var n=0;n<goodlist.length;n++){
            var good = goodlist[n];
            if(n==0){
                sname = good.shop;
                gids+=good.id;
                gnames+=good.gname;
            }else{
                gids+=","+good.id;
                gnames+=","+good.gname;
            }
            total+=parseInt(good.price);
        }
        bill.shop = sname;
        bill.sid = sid;
        bill.gids = gids;
        bill.gnames = gnames;
        bill.total = total;
        bill.tel = tel;
        bill.address = address;
        bill.note = note;
        bills.push(bill);
    }
    if(bills.length){
        ajaxCallback("saveBills",{bills:JSON.stringify(bills)},function(data){
            localStorage[gouwuche] = "";
            showTipTimer("预约提交成功!",function(){
                toMyBill();
            });
        });
    }

}



function toMyBill(){
    if(userinfo){
        changePage("mybillpage");
        mybillslist();
    }else{
        changePage("loginpage");
    }

}

function toMyBill2(){
    if(userinfo){
        changePage("mybillpage2");
        mybillslist2();
    }else{
        changePage("loginpage");
    }
}

function mybillslist(){
    ajaxCallback("mybills",{uid:userinfo.id},function(data){
        billlist = data;
        $("#bills").refreshShowListView(data);
    });
}

function mybillslist2(){
    ajaxCallback("mybills",{gids:userinfo.id},function(data){
        billlist = data;
        $("#bills2").refreshShowListView(data);
    });
}

function toHelp(){
    changePage('lianxipage');
}

function billDetail(id){
    changePage("billgoodspage");
    var bill = {};
    if(typeof id == "object"){
        bill = id;
    }else{
        bill = getObjectById(id,billlist);
    }

    focusobj = bill;
    //$("#btotal").text("总价:"+bill.total+"元");
    $("#bfenqi").text("健身房:"+bill.shop+" ,预约时间:"+bill.todate+" "+bill.toh+"点到"+bill.endh+"点");
    $("#bndate").text("下单时间:"+bill.ndate);
    $("#statecn").text("状态:"+bill.statecn);

    $("#czbtn").hide();
    if(bill.statecn=="未付款"){
        $("#paydiv").show();
    }else{
        $("#paydiv").hide();
    }

    if(bill.gids==userinfo.id){
        $("#czbtn").show();
    }
}

function toYuyueChat(){

    ajaxCallback("getUser",{id:focusobj.uid},function(data){
        focususer = data;
        checkIsMyFriend(function (info){
            if(info=="0"){
                addFriend();
            }
        });
        toChat(focusobj.uid,1);
    });

}

function payBill(statecn){

    //if(userinfo.money && userinfo.money*1>focusobj.total*1){
        var id = focusobj.id;
        /*var statecn="已付款";
        if(type==2){
            statecn="已拒绝";
        }*/
        ajaxCallback("billState",{id:id,statecn:statecn},function(data){
            showTipTimer("操作成功!",function(){
                billDetail(data);
            });

        });
    /*}else{
        showLoader("余额不足!",true);
    }*/

}

function toLuntan(uid){
    changePage("luntanpage");
    listPosts(uid,1);
}
function listPosts(uid,type){
    uid = uid || "";
    ajaxCallback("listPosts",{uid:uid,type:type},function(data){
        postslist = data;
        $("#posts").refreshShowListView(data);
    });
}
var _focusposttype = 1;
function toAddForm(type){
    if(!userinfo){
        toLogin();
        return;
    }
    _focusposttype = type;
    changePage("addformpage");
    if(type==2){
        $("#spctn").show();
    }else{
        $("#spctn").hide();
    }
}
function addForm(){
    var note = $("#fnote").val();
    var title = $("#ftitle").val();
    var ndate = $("#ndate").val();
    var img = "";
    uplaodImg(function (r){
       img = r;
        ajaxCallback("addPosts",{img:img,type:_focusposttype,uid:userinfo.id,title:title,note:note,username:userinfo.username,tel:userinfo.tel,wechat:userinfo.wechat,ndate:ndate},function(){
            toLuntan();
        });
    });

}

function delPosts(){
    ajaxCallback("delPosts",{id:focuspost.id},function(data){
        toLuntan();
    });
}
function postDetail(id){
    var obj = getPostsById(id);
    focuspost = obj;
    changePage("postdetail");
    $("#vptitle").text("标题:"+obj.title);
    $("#vpnote").text("内容:"+obj.note);
    $("#vpusername").text("发布者:"+obj.username);
    $("#vpdate").text("时间:"+obj.ndate);
    $("#vtell").text("电话:"+obj.tel);
    $("#vwechat2").text("微信:"+obj.wechat);
    if(obj.img){
        $("#pimg").attr("src",fileurl+obj.img).show();
    }else{
        $("#pimg").hide();
    }
    $("#mypost").hide();
    listReplay();
    if(obj.uid == userinfo.id){
        $("#mypost").show();
        $("#replays").data("property",JSON.stringify(pr6d));
    }else{
        $("#mypost").hide();
        $("#replays").data("property",JSON.stringify(pr6));
    }


}

function delReplay(id){
    ajaxCallback("delReplay",{id:id},function(data){
        listReplay();
    });
}

function listReplay(){
    ajaxCallback("listReplay",{pid:focuspost.id},function(data){
        $("#replays").refreshShowListView(data);
    });
}
function listReplay2(){
    ajaxCallback("listReplay",{pid:focusobj.id},function(data){
        $("#replays2").refreshShowListView(data);
    });
}
function addReplay(){
    if(!userinfo){
        toLogin();
        return;
    }
    var note = $("#rnote").val();
    ajaxCallback("addReplay",{pid:focuspost.id,uid:userinfo.id,username:userinfo.username,note:note},function(data){
        listReplay();
    });
}
function addReplay2(){
    var note = $("#rnote2").val();
    ajaxCallback("addReplay",{pid:focusobj.id,uid:userinfo.id,username:userinfo.username,note:note},function(data){
        listReplay2();
        //nativeNotice("收到新的留言",note);
    });
}
function getPostsById(id){
    for(var i=0;i<postslist.length;i++){
        if(postslist[i].id == id){
            return postslist[i];
        }
    }
}

function toFabu(){
    changePage("fabupage");
    ajaxCallback("listType",{},function(data){
        shoplist = data;
        $("#fcity").refreshShowSelectMenu(data,"选择分类","id","title");
    });
}

function mypost(){
    toLuntan(userinfo.id);
}

function saveJkdata(){
    var fdata = serializeObject($("#jkdataform"));
    fdata.uid = userinfo.id;
    fdata.username = userinfo.username;
    ajaxCallback("saveJkdata",fdata,function(data){
        toJkdata();
    });
}

function toJkdata(uid){
    uid = uid || userinfo.id;
    changePage('jkdatapage');
    ajaxCallback("listJkdata",{uid:uid},function(data){
        focuslist = data;
        $("#goods2").refreshShowListView(data);
    });
}

function toFenxi(){
    changePage('fenxipage');
    initChart1();
}

function saveGood(){
    var fdata = serializeObject($("#goodform"));
    fdata.sid = userinfo.id;
    fdata.shop = userinfo.username;

    uplaodImg(function(img){
        fdata.img = img;
        ajaxCallback("saveGood",fdata,function(){
            showLoader("发布成功!",true);
            toGoods();
        });
    });
}

function mygood(){
    toGoods(userinfo.id);
}


function toBanli(){
    changePage("banlipage");
}

function tijiaoBanli(){
    showTipTimer("提交成功!",function () {
       toMore();
    });
}

function toBeJiaolian(){
    changePage('jiaolianinfo');
    ajaxCallback("listShop",{},function(data){
        $("#sid").refreshShowSelectMenu(data,"选择健身房","id","sname");
    });
}






/**************************************聊天相关******************************/

function backclear(){
    clearInterval(chattimmer);
    goback();
}

var refreshgap = 5000;
/*function toQunChat(id){
 var qz = getObjectById(id,focuslist);
 focusobj = qz;
 changePage("chatpage");
 chattimmer = setInterval(function (){
 refreshServerQunChatList();
 },refreshgap);
 }*/

function toChat(id,type){
    ajaxCallback("getUser",{id:id},function(data){
        focususer = data;
        /*if(userinfo.status=="禁言"){
     showLoader("你已被禁言",true);
     return;
     }*/
        _chattype = type;
        /*if(type==2){
            var qz = getObjectById(id,focuslist);
            focususer = qz;
        }*/

        changePage("chatpage");
        refreshServerChatList();
        chattimmer = setInterval(function (){
            refreshServerChatList();
        },refreshgap);
    });

}

function refreshChatMSg(){
    ajaxCallback("listMyMessage",{uid:userinfo.id,fid:focususer.id},function(data){
        $("#msglist").refreshShowListView(data);
    },true);
}






function sendFile(){
    getFileAttach(function(path){
        sendMsg(path,3);
    });
}

function sendMsg(path,type){

    var ajaxurl = "addMessage";
    if(_chattype==2){
        ajaxurl="addQunMessage";
    }
    var obj = {};
    obj.uid = userinfo.id;
    obj.fid = focususer.id;
    if(_chattype==2){
        obj.qid = focususer.id;
    }
    obj.note = $("#msgaarea").val();
    obj.username = userinfo.username;
    obj.fusername = focususer.username;
    obj.type = 1;
    obj.img = userinfo.img;
    if(path){
        if(type==2){
            obj.type = type;
            uploadFileUrl = path;
            uplaodImg(function(r){
                obj.attach = r;
                ajaxCallback(ajaxurl,obj,function(data){
                    iftobutton = true;
                    refreshServerChatList();
                });
            });
        }else if(type==3){
            obj.type = type;
            uploadFileUrl = path;
            uplaodImg(function(r){
                obj.attach = r;
                obj.attachname = uploadFileUrl.substr(uploadFileUrl.lastIndexOf("/")+1);
                ajaxCallback(ajaxurl,obj,function(data){
                    iftobutton = true;
                    refreshServerChatList();
                });
            });
        }

    }else{
        /*if(checkMgc(obj.note)){
         showLoader("消息不合法",true);
         return;
         }*/
        obj.attach = "";
        ajaxCallback(ajaxurl,obj,function(data){
            iftobutton = true;
            refreshServerChatList();
        });
    }
    $("#msgaarea").val("");


    /*var note = $("#chatnote").val();
     var msg = {};
     msg.note = note;
     msg.qid = focususer.id;
     msg.uid = userinfo.id;
     msg.username = userinfo.username;
     ajaxCallback("addQunMessage",msg,function(data){
     ajaxCallback("listQunMessage",{uid:userinfo.id,qid:focususer.id},function(data){
     $("#chatnote").val("");
     $("#qunmsglist").refreshShowListView(data);
     });
     });*/
}

function checkMgc(str){
    for(var i=0;i<_mingancis.length;i++){
        var mgc = _mingancis[i]['title'];
        if(str.indexOf(mgc)!=-1){
            return true;
        }
    }
    return false;
}

function refreshServerChatList(){
    var queryobj = {uid:userinfo.id,fid:focususer.id};
    var ajaxurl = "listMyMessage";
    if(_chattype==2){
        queryobj = {uid:userinfo.id,qid:focususer.id};
        ajaxurl = "listQunMessage";
    }
    ajaxCallback(ajaxurl,queryobj,function(data){
        refreshChatList(data);
    },true);
}


var _oldlength = null;
function refreshChatList(data){
    if(data.length!=_oldlength){
        iftobutton = true;
        _oldlength = data.length;
    }
    var html = "";
    if(data && data.length){
        for(var i=0;i<data.length;i++){
            var msg = data[i];
            var cn = "citemto";
            if(msg.uid != userinfo.id){
                var cn = "citemfrom";
            }
            var li = "";
            if(msg.type==1){
                li = '<li class="'+cn+'"><div><img src="'+fileurl+msg.img+'"><p>'+msg.note+'</p></div></li>';
            }else if(msg.type==2){
                li = '<li class="'+cn+'" onclick="myObj.playAudio(\''+msg.attach+'\');"><div><img src="'+fileurl+msg.img+'"><p>点击播放语音</p></div></li>';
            }else if(msg.type==3){
                if(getFileType(msg.attach)==".png" || getFileType(msg.attach)==".jpg"||getFileType(msg.attach)==".gif"||getFileType(msg.attach)==".jpeg"){
                    li = '<li class="'+cn+'" onclick="localFile(\''+msg.attach+'\');"><div><img src="'+fileurl+msg.img+'"><p class="imgctn" style="background-image: url('+fileurl+msg.attach+')"></p></div></li>';
                }else{
                    li = '<li class="'+cn+'" onclick="localFile(\''+msg.attach+'\');"><div><img src="'+fileurl+msg.img+'"><p>'+msg.attachname+'</p></div></li>';
                }

            }

            html+=li;
        }
        $("#chatlist").html(html);
        setScroll("chatscroll",document.getElementById("chatdiv"));
    }else{
        $("#chatlist").html(html);
    }
    var hei = $("#chatlist").height();
    if(iftobutton){
        if(hei>600){
            var scrollY = 0-(hei-600);
            scrolls["chatscroll"].scrollTo(0,scrollY,300);
        }
        iftobutton = false;
    }


}
/**************************************聊天相关结束******************************/
/*****************************************************************好友管理********************************************/
function toMyFriend(){
    changePage('friendpage');
    listMyFriend();
}
function listMyFriend(){
    ajaxCallback("listMyFriend",{uid:userinfo.id},function(data){
        focuslist = data;
        $("#myfriendlist").refreshShowListView(data);
    });
}

function toUserInfo(id){
    ajaxCallback("getUser",{id:id},function(obj){

        if(obj){
            focususer = obj;
            changePage('userdetailpage');
            checkIsMyFriend();
            $("#vusername2").text("学号:"+focususer.username);
            $("#vuserimg2").attr("src",fileurl+focususer.img);
            $("#vbirth2").text("生日:"+focususer.birth);
            $("#vsex2").text("性别:"+focususer.sex);
            $("#vqq2").text("QQ:"+focususer.qq);
            $("#vemail2").attr("href","tel:"+focusobj.tel).text("电话:"+focususer.tel);
        }
    });


}

function toJibu(){
   window.location.href="../jibu/index.html"
}

function toSearchFriend(){
    changePage("addfriendpage");
    listUser();
}

function listUser(){
    ajaxCallback("listUser",{roletype:2},function(data){
        focuslist = data;
        $("#userlist").refreshShowListView(data);
    });
}

function checkIsMyFriend(cb){
    ajaxCallback("checkIsMyFriend",{uid:userinfo.id,fid:focususer.id},function(data){
        cb && cb(data.info);
        if(data.info=="1"){
            $("#canadd").hide();
            $("#candelf").show();
        }else{
            if(focususer.id!=userinfo.id){
                $("#canadd").show();
                $("#candelf").hide();
            }else{
                $("#canadd").hide();
                $("#candelf").hide();
            }

        }
    });
}

function addFriend(){
    ajaxCallback("addFriend",{uid:userinfo.id,fid:focususer.id},function(data){
        userinfo = data;
        //toMyFriend();
        ajaxCallback("addFriend",{uid:focususer.id,fid:userinfo.id},function(data2){

        });
    });
    //改为同意的时候后台自动加上
    /*ajaxCallback("sendAddMessage",{fid:userinfo.id,tid:focususer.id,status:"待同意",fuser:userinfo.username,img:userinfo.img},function(data){
        showLoader("请求已发送,等待好友验证!",true);
    });*/
}

function delFriend(){
    ajaxCallback("delFriend",{uid:userinfo.id,fid:focususer.id},function(data){
        userinfo = data;
        toMyFriend();
    });
}


function toMyYanzhengMessage(){
    changePage('yzmessagelistpage');
    ajaxCallback("listMyAddMessage",{uid:userinfo.id},function(data){
        focuslist = data;
        $("#messagelist").refreshShowListView(data);
    });
}

function toYzMessage(id){
    var msg = getObjectById(id,focuslist);
    if(msg){
        focusobj = msg;
        changePage('yzmsgdetailpage');
        $("#vusername4").text(msg.fuser);
        $("#vstatus").text("状态:"+msg.status);
        $("#userimg").attr("src",fileurl+msg.img);
        if(msg.status="待同意"){
            $("#opctn").show();
        }else{
            $("#opctn").hide();
        }
    }
}

function agree(){
    ajaxCallback("addFriend",{uid:focusobj.fid,fid:focusobj.tid},function(r){
        ajaxCallback("addFriend",{uid:userinfo.id,fid:focusobj.fid},function(rr){
            ajaxCallback("updateYzMsgStatus",{id:focusobj.id,status:"已同意"},function(data){
                userinfo = rr;
                toMyFriend();
            });

        });
    });
}

function refuse(){
    ajaxCallback("updateYzMsgStatus",{id:focusobj.id,status:"已拒绝"},function(data){
        goback();
    });

}

/*****************************************************************好友管理结束********************************************/


function toUrl(){
    window.location.href="http://www.hc3i.cn/";
}