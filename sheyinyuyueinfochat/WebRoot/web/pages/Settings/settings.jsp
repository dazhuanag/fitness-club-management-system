<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<html>
<head id="Head1">
    <%@ include file="/web/common/common.jsp" %>
<script type="text/javascript">
$(function () {
    
	 
});

function save() {
    $('#managForm').form('submit', {
        url: "<%=__APP__%>/Settings!add",
        onSubmit: function () {
            return inputCheck();
        },
        success: function (data) {
            closeBackGround();
            $.messager.alert("提示", data, "info", function () {
                closeFlush();
            });
        }
    });
}

function edit(obj) {
	var id = obj.id;
    $("#id").val(id);
    $("#gname").val(obj.gname);
    $("#typeid").combobox("setValue", obj.typeid);
    $("#sid").combobox("setValue", obj.sid);
    //$("#price").numberbox('setValue', obj.price);
    //$("#count").numberbox('setValue', obj.count);
    //$("#jifen").numberbox('setValue', obj.jifen);
    $("#mcount").val(obj.mcount);
    $("#price").val(obj.price);
    $("#shouye").val(obj.shouye);
    $("#note").val(obj.note);
    $("#sale").val(obj.sale);
    $("#gimg").val(obj.img);
    $("#managerDialog").dialog('open');
}

function deleteItem(uuid) {
    openBackGround();
    $.post("<%=__APP__%>/Settings!deleteItem", {id: uuid}, function (data) {
        closeBackGround();
        closeFlush();
    });
}

function cancel() {
    $.messager.confirm('提示', '是否要关闭？', function (r) {
        if (r) {
            closeFlush();
        }
    });
}

function query() {
    $('#grid1').datagrid('load', serializeObject($('#searchForm')));
}


function closeFlush() {
    $("#managerDialog").dialog('close');
    $("#grid1").datagrid("reload");
}

function inputCheck() {
    if (!($("#managForm").form("validate"))) {
        return false;
    }
    openBackGround();
    return true;
}

function show(index) {

    var rows = $("#grid1").datagrid('getRows');
    var obj = rows[index];
    var id = obj.id;
    $("#id2").text(obj.id);
    $("#gname2").text(obj.gname);
    $("#gbrand2").text(obj.gbrand);
    $("#intime2").text(obj.intime);
    $("#gmodel2").text(obj.gmodel);
    $("#gcolor2").text(obj.gcolor);
    $("#gprice2").text(obj.gprice);
    $("#note2").text(obj.note);
    $("#gnumber2").text(obj.gnumber);

    $("#viewDialog").dialog('open');
    //});
}


function setNull(){
    searchForm.reset();
}



</script>
</head>
<body class="easyui-layout">


<div id="managerDialog" class="easyui-dialog" title="权重设置" style="width:650px;height:350px;" toolbar="#dlg-toolbar"
     buttons="#dlg-buttons2" resizable="true" modal="true" closed='false'>
    <form id="managForm" name="managForm" method="post" enctype="multipart/form-data">
        <input type="hidden" id="action" name="action" value="edit"/>
        <input type="hidden" id="id" name="id" value="1"/>
        <table cellpadding="1" cellspacing="1" class="tb_custom1" style="width: 98%;">
            <tr>
                <th width="30%" align="right"><label>血压：</label></th>
                <td width="70%">
                    <input id="xueya" name="settings.xueya" class="easyui-validatebox"
                           style="width:200px;word-wrap: break-word;word-break:break-all;" type="text" required="true"
                           validType="length[0,100]"/>
                </td>
             
            </tr>
            <tr>
                <th width="30%" align="right"><label>心律：</label></th>
                <td width="70%">
                    <input id="xinlv" name="settings.xinlv" class="easyui-validatebox"
                           style="width:200px;word-wrap: break-word;word-break:break-all;" type="text" required="true"
                           validType="length[0,100]"/>
                </td>
             
            </tr>
            <tr>
                <th width="30%" align="right"><label>血脂：</label></th>
                <td width="70%">
                    <input id="xuezhi" name="settings.xuezhi" class="easyui-validatebox"
                           style="width:200px;word-wrap: break-word;word-break:break-all;" type="text" required="true"
                           validType="length[0,100]"/>
                </td>
             
            </tr>
            
        </table>


    </form>
    <div id="dlg-buttons2">
        <a href="#" class="easyui-linkbutton" onclick="save();">保存</a>
        <a href="#" class="easyui-linkbutton" onclick="cancel();">取消</a>
    </div>
</div>

</body>
</html>