package com.ideabobo.action;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.annotation.Resource;
import javax.swing.*;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
//import com.ideabobo.model.Address;
import com.ideabobo.model.Bill;
import com.ideabobo.model.Dingzuo;
import com.ideabobo.model.Good;
import com.ideabobo.model.Jkdata;
import com.ideabobo.model.Line;
import com.ideabobo.model.Message;
import com.ideabobo.model.Posts;
import com.ideabobo.model.Replay;
import com.ideabobo.model.Shop;
import com.ideabobo.model.User;
import com.ideabobo.model.Yzmessage;
import com.ideabobo.service.BaseService;
import com.ideabobo.service.BillService;
import com.ideabobo.service.DingzuoService;
import com.ideabobo.service.GoodService;
import com.ideabobo.service.NoticeService;
import com.ideabobo.service.ReplayService;
import com.ideabobo.service.RoomService;
import com.ideabobo.service.ShopService;
import com.ideabobo.service.TypeService;
import com.ideabobo.service.UserService;
import com.ideabobo.util.GetNowTime;
import com.ideabobo.util.HttpClientTools;
import com.ideabobo.util.IdeaAction;
import com.ideabobo.util.MailUtil;

@Controller
public class WehallAction extends IdeaAction {
    @Resource
    private BaseService baseService;
    @Resource
    private BillService billService;
    @Resource
    private ShopService shopService;
    @Resource
    private GoodService goodService;
    @Resource
    private DingzuoService dingzuoService;
    @Resource
    private TypeService typeService;
    @Resource
    private UserService userService;
    @Resource
    private ReplayService replayService;
    @Resource
    private NoticeService noticeService;
    @Resource
    private RoomService roomService;
    public Gson gson = new Gson();
    private static final long serialVersionUID = -3218238026025256103L;

    public String wehall(){
//		String openid = request.getParameter("openid");
//		session.put("openid", openid);
        return SUCCESS;
    }

    public void login(){
        String username = request.getParameter("username");
        String passwd = request.getParameter("passwd");
        User user = new User();
        user.setPasswd(passwd);
        user.setUsername(encodeGet(username));
        User r = userService.find(user);
        if(r!=null){
        	session.put("user", r);
            renderJsonpObj(r);
        }else{
            renderJsonpString("fail");
        }
    }
    
    public void checkSession(){
    	Object obj = session.get("user");
    	if(obj!=null){
    		renderJsonpObj(obj);
    	}else{
    		renderJsonpString("fail");
    	}
    }
    
    public void clearSession(){
    	session.clear();
    }

    public void checkUser(){
        User u = new User();
        String username = request.getParameter("username");
        u.setUsername(username);
        User r = userService.find(u);
        if(r!=null){
            renderJsonpString("fail");
        }else{
            renderJsonpString("success");
        }
    }

    public void updateUser(){
        String tel = request.getParameter("tel");
        String qq = request.getParameter("qq");
        String wechat = request.getParameter("wechat");
        String email = request.getParameter("email");
        String birth = request.getParameter("birth");
        String sex = request.getParameter("sex");
        String id = request.getParameter("id");

        User user = userService.find(id);

        user.setId(Integer.parseInt(id));
        user.setTel(tel);
        user.setWechat(wechat);
        user.setQq(qq);
        user.setEmail(email);
        user.setBirth(birth);
        user.setSex(encodeGet(sex));
        user.setAddress(encodeGet(request.getParameter("address")));

        userService.update(user);
        renderJsonpObj(user);
    }

    public void changePasswd(){
        String passwd = request.getParameter("passwd");
        String id = request.getParameter("id");
        User user = userService.find(id);
        user.setPasswd(passwd);
        userService.update(user);
        renderJsonpString("success");
    }

    public void register(){
    	User user = (User) getByRequest(new User(), true);

        String roletype = "2";

        user.setRoletype(roletype);

        userService.save(user);

        renderJsonpString("success");
    }

    public void listShop(){
        renderJsonpObj(shopService.list());
    }
    public void listGood(){
        String type = request.getParameter("stype");
        String sid = request.getParameter("sid");
        String title = request.getParameter("stitle");
        String sort = request.getParameter("order");
        title = encodeGet(title);
        String hql = "from Good t where 1=1";
        if (type != null&& !"".equals(type)) {
            hql+=" and t.typeid="+type;

        }
        if(sid != null&& !"".equals(sid)){
            hql+=" and t.sid="+sid;
        }
        if(title != null&& !"".equals(title)){
            hql+=" and t.gname='"+title+"'";
        }
        if(sort != null&& !"".equals(sort)){
            hql+=" order by "+sort+" desc";
        }else{
        	hql+=" order by xiaoliang desc";
        }
        /*ArrayList<Good> list = (ArrayList<Good>) goodService.queryObj(g);
        Collections.sort(list);*/
        renderJsonpObj(baseService.list(hql));
    }
    public void listJkdata(){
        String uid = request.getParameter("uid");

        String hql = "from Jkdata t where 1=1";
        if (uid != null&& !"".equals(uid)) {
            hql+=" and t.uid="+uid;

        }
        renderJsonpObj(baseService.list(hql));
    }
  
    
    public void listType(){
        renderJsonpObj(typeService.list());
    }

    public void saveDingzuo(){
        Dingzuo dz = new Dingzuo();
        dz.setRenshu(request.getParameter("renshu"));
        dz.setXingming(encodeGet(request.getParameter("xingming")));
        dz.setShouji(request.getParameter("shouji"));
        dz.setShijian(request.getParameter("shijian"));
        dz.setTodate(request.getParameter("todate"));
        dz.setBeizhu(encodeGet(request.getParameter("beizhu")));
        dz.setShopid(request.getParameter("shopid"));
        dz.setShopname(encodeGet(request.getParameter("shopname")));
        dz.setOpenid(request.getParameter("openid"));
        dz.setNdate(GetNowTime.getNowTimeNian());
        dingzuoService.save(dz);
        renderJsonpString("提交成功!");
    }

    public void saveBill(){
        Bill bill = (Bill) getByRequest(new Bill(), true);
        bill.setNdate(GetNowTime.getNowTimeEn());
        bill.setStatecn("正常");
        billService.save(bill);
        renderJsonpObj(bill);

    }
    
    public void delBill(){
        String id= request.getParameter("bid");
        billService.delete(Integer.parseInt(id));
        renderJsonpString("提交成功!");

    }
    
    public void delReplay(){
        String id= request.getParameter("id");
        baseService.delete(Integer.parseInt(id), Replay.class);
        renderJsonpString("0");

    }
    
    public void billState(){
    	String idstr = request.getParameter("id");
    	Bill b = billService.find(idstr);
    	String statecn = request.getParameter("statecn");
    	statecn = encodeGet(statecn);
    	b.setStatecn(statecn);
    	billService.update(b);
    	saveCharge(b.getUid(), b.getTotal());
    	renderJsonpObj(b);
    }
    
    public void saveCharge(String idstr,String mo){
		User user = userService.find(idstr);
		Integer money = user.getMoney();
		if(money!=null){
			money = money-Integer.parseInt(mo);
			user.setMoney(money);
		}
		userService.update(user);
	}
    
    public void billCuidan(){
    	String idstr = request.getParameter("id");
    	Bill b = billService.find(idstr);
    	b.setCuidan("已催单");
    	billService.update(b);
    	renderJsonpObj(b);
    }

    public void saveBills(){
        String bills = request.getParameter("bills");
        bills = encodeGet(bills);
        JsonParser parser = new JsonParser();
        JsonArray blist = parser.parse(bills).getAsJsonArray();
        Bill bone = null;
        for(int i=0;i<blist.size();i++){
            JsonElement jo = blist.get(i);
            JsonObject obj = (JsonObject) parser.parse(jo.toString());
            Bill bill = new Bill();
            bill.setTotal(obj.get("total").getAsString());
            bill.setSid(obj.get("sid").getAsString());
            bill.setShop(obj.get("shop").getAsString());
            bill.setUid(obj.get("uid").getAsString());
            bill.setUser(obj.get("user").getAsString());
            bill.setNdate(GetNowTime.getNowTimeNian());
            bill.setGids(obj.get("gids").getAsString());
            bill.setGnames(obj.get("gnames").getAsString());
            bill.setAddress(obj.get("address").getAsString());
            bill.setTel(obj.get("tel").getAsString());
            bill.setNote(obj.get("note").getAsString());
            bill.setStatecn("未付款");
            bill.setCuidan("未催单");
            billService.save(bill);
            if(i==0){
            	bone = bill;
            }
            insertLine(Integer.parseInt(bill.getUid()), bill.getId());
        }

        renderJsonpObj(bone);
    }

    public void mybills(){
        String uid = request.getParameter("uid");
        String sid = request.getParameter("sid");
        String gids = request.getParameter("gids");
        String type = request.getParameter("type");
        
        String hql = "from Bill t where 1=1";
        if(uid!=null && !uid.equals("")){
        	 hql+= " and t.uid='"+uid+"'";
        }
        if(sid!=null && !sid.equals("")){
        	 hql+= " and t.sid='"+sid+"'";
        }
        if(gids!=null && !gids.equals("")){
       	 hql+= " and t.gids='"+gids+"'";
       }
        if(type!=null && !type.equals("")){
        	type = encodeGet(type);
        	hql+= " and t.statecn='"+type+"'";
           }
        renderJsonpObj(baseService.list(hql));
    }
    public void myshopbills(){
        String sid = request.getParameter("sid");
        Bill b = new Bill();
        b.setSid(sid);
        renderJsonpObj(billService.list(b));
    }
    public Bill updateXiaoliang(Bill bill){
    	String gid = bill.getGids();
        Good g = goodService.find(gid);
        int count = 0;
        if(g.getXiaoliang()!=null){
        	count = g.getXiaoliang();
        }
        count++;
        g.setXiaoliang(count);
        goodService.update(g);        
        return bill;
    }

    public void deleteGood(){
        String id = request.getParameter("id");
        goodService.delete(Integer.parseInt(id));
        renderJsonpString("success");
    }
    public void deleteBill(){
        String id = request.getParameter("id");
        billService.delete(Integer.parseInt(id));
        renderJsonpString("success");
    }
    public void listReplay(){
    	String pid = request.getParameter("pid");
    	Replay r = new Replay();
    	r.setPid(pid);
        renderJsonpObj(replayService.list(r));
    }
    public void listNotice(){
    	String hql = "from Notice t where 1=1";
    	String sid = request.getParameter("sid");
    	if(sid!=null && !sid.equals("")){
    		hql+=" and t.sid='"+sid+"'";
    	}
        renderJsonpObj(baseService.list(hql));
    }
    public void listRoom(){
        renderJsonpObj(roomService.list());
    }
    
    public void addReplay(){
    	String uid = request.getParameter("uid");
    	String pid = request.getParameter("pid");
    	String note = encodeGet(request.getParameter("note"));
    	String username = encodeGet(request.getParameter("username"));
    	String ndate = GetNowTime.getNowTimeEn();
    	Replay m = new Replay();
    	m.setUid(uid);
    	m.setPid(pid);
    	m.setUsername(username);
    	m.setNote(note);
    	m.setNdate(ndate);
    	replayService.save(m);
    	renderJsonpString("success");
    }
    
    public void getShouye(){
        Good g = new Good();
        g.setShouye(1);
        renderJsonpObj(goodService.list(g));
    }
    
    public void listBillGoods(){
    	String gids = request.getParameter("gids");
    	String hql = "from Good u where u.id in ("+gids+")";
    	renderJsonpObj(goodService.list(hql));
    }
    
/*    public void saveAddress(){
    	String action = request.getParameter("action");
    	if(action.equals("add")){
    		Address address = (Address) getByRequest(new Address(), true);
    		baseService.save(address);
    	}else{
    		Address address = (Address) getByRequest(new Address(), true);
    		baseService.update(address);
    	}
    	renderJsonpString("0");
    }
    
    public void delAddress(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Address.class);
    	renderJsonpString("0");
    }*/
    
    public void listAddress(){
    	String uid = request.getParameter("uid");
    	renderJsonpObj(baseService.list("from Address t where t.uid = "+uid));
    }
    
    public void getLineNumber(){
    	List<Line> list = baseService.list("from Line t order by id asc");
    	String bid = request.getParameter("bid");
    	int count = 0;
    	for(int i=0;i<list.size();i++){
    		Line l = list.get(i);
    		if(l.getBid()==Integer.parseInt(bid)){
    			break;
    		}else{
    			count++;
    		}
    	}
    	renderJsonpString(count+"");
    }
    
    public void insertLine(int uid,int bid){
    	Line line = new Line();
    	line.setUid(uid);
    	line.setBid(bid);
    	baseService.save(line);
    }
    
    public void getShop(){
    	String id = request.getParameter("id");
    	Shop shop = (Shop) baseService.find(Integer.parseInt(id), Shop.class);
    	renderJsonpObj(shop);
    }
    
    public void saveGood(){
    	String action  = request.getParameter("action");
    	Good info = (Good) getByRequest(new Good(), true);
    	if(action!=null && action.equals("edit")){
    		baseService.update(info);
    	}else{
    		baseService.save(info);
    	}
        renderJsonpString("success");
    }
    
    public void saveJkdata(){
    	String action  = request.getParameter("action");
    	Jkdata info = (Jkdata) getByRequest(new Jkdata(), true);
    	if(action!=null && action.equals("edit")){
    		baseService.update(info);
    	}else{
    		baseService.save(info);
    	}
        renderJsonpString("success");
    }
    public void delGood(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Good.class);
    	renderJsonpString("0");
    }
    
    public void zan(){
    	String id = request.getParameter("id");
    	Good g = (Good) baseService.find(Integer.parseInt(id), Good.class);
    	Integer zan = g.getZan();
    	if(zan!=null){
    		zan++;
    	}else{
    		zan = 1;
    	}
    	g.setZan(zan);
    	baseService.update(g);
    	renderJsonpString(zan+"");
    }
    
    /**
     * 发送重置密码邮件
     * email邮箱地址
     */
    public void sendEmail(){
    	String to = request.getParameter("email");
    	String title = request.getParameter("title");
    	String content = request.getParameter("str");
    	title = encodeGet(title);
    	content = encodeGet(content);
        boolean flag = MailUtil.sendEmail(to, title, content);
        if(flag){
            renderJsonpString("0");
        }else{
            renderJsonpString("-1");
        }
 
    }
    
    public void checkYuyue(){
    	String todate = request.getParameter("todate");
    	String toh = request.getParameter("toh");
    	String endh = request.getParameter("endh");
    	
    	String hql = "from Bill t where t.todate='"+todate+"' and t.toh<"+endh+" and t.endh>"+toh+" and status='1'";
    	List list = baseService.list(hql);
    	if(list!=null && list.size()>0){
    		renderJsonpString("-1");
    	}else{
    		renderJsonpString("0");
    	}
    }
    
    public void addPosts(){
    	Posts p = (Posts) getByRequest(new Posts(), true);
    	p.setNdate(GetNowTime.getNowTimeEn());
    	baseService.save(p);
    	renderJsonpString("0");
    }
    
    public void listPosts(){
    	String hql = "from Posts t where 1=1";
    	String type = request.getParameter("type");
    	String uid = request.getParameter("uid");
    	if(type!=null && !type.equals("")){
    		hql+=" and t.type='"+type+"'";
    	}
    	if(uid!=null && !uid.equals("")){
    		hql+=" and t.uid='"+uid+"'";
    	}
        renderJsonpObj(baseService.list(hql));
    }
    public void delPosts(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Posts.class);
    	renderJsonpString("success");
    }
    
    public void updateUserJiaolian(){
    	User user = (User) baseService.find(Integer.parseInt(request.getParameter("uid")), User.class);
    	if(user!=null){
    		User jl = (User) getByRequest(new User(), true);
    		user.setJimg(jl.getJimg());
    		user.setShop(jl.getShop());
    		user.setIdcard(jl.getIdcard());
    		user.setZhengshu(jl.getZhengshu());
    		//user.setPasswd(jl.getPrice());
    		user.setZizhi(jl.getZizhi());
    		user.setPrice(jl.getPrice());
    		user.setSid(jl.getSid());
    		user.setShop(jl.getShop());
    		user.setIsjl("1");
    		user.setStatecn("待审核");
    		baseService.update(user);
    	}
    	renderJsonpString("0");
    }
    
    /*public void getUser(){
    	renderJsonpObj(baseService.find(Integer.parseInt(request.getParameter("id")), User.class));
    }*/
    
    public void listJiaolian(){
    	renderJsonpObj(baseService.list("from User t where t.sid='"+request.getParameter("sid")+"' and t.isjl='1' and t.statecn='通过'"));
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    /****************************************聊天相关********************************/
    /*public void listQunzu(){
    	String hql = "from Qunzu t where 1=1";
    	String type = request.getParameter("type");
    	if(type!=null && !type.equals("")){
    		type = encodeGet(type);
    		hql+=" and t.type like '%"+type+"%'";
    	}
        renderJsonpObj(baseService.list(hql));
    }
    
    
    
    public void listMyQunzu(){
    	String uid = request.getParameter("uid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	if(u.getQids()==null || u.getQids().equals("")){
    		renderJsonpObj(null);
    	}else{
    		List<Qunzu> list = baseService.list("from Qunzu t where t.id in ("+u.getQids()+")");
        	renderJsonpObj(list);
    	}
    	
    }
    
    public void checkIsMyQunzu(){
    	String uid = request.getParameter("uid");
    	String qid = request.getParameter("qid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	String qids = u.getQids();
    	String info = "0";
    	if(qids!=null && !qids.equals("")){
    		String[] qidsarray = qids.split(",");
        	
        	for(int i=0;i<qidsarray.length;i++){
        		if(qidsarray[i].equals(qid)){
        			info = "1";
        			break;
        		}
        	}
        	renderJsonpString(info);
    	}else{
    		renderJsonpString(info);
    	}
    	
    }
    
   
    
    public void saveQunzu(){
    	Qunzu info = (Qunzu) getByRequest(new Qunzu(), true);
    	baseService.save(info);
        renderJsonpObj(info);
    }
    
    public void delQunzu(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Qunzu.class);
    	renderJsonpString("success");
    }
    
    
    
    
    
    public void addQunzu(){
    	String uid = request.getParameter("uid");
    	String qid = request.getParameter("qid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	String qids = u.getQids();
    	if(qids==null||qids.equals("")){
    		qids = qid;
    	}else{
    		qids+=","+qid;
    	}
    	u.setQids(qids);
    	baseService.update(u);
    	renderJsonpObj(u);
    }
 //退出群   
    public void delQunzus(){
    	String uid = request.getParameter("uid");
    	String qid = request.getParameter("qid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	String qids = u.getQids();
    	String[] qidsarray = qids.split(",");
    	String nqids = "";
    	for(int i=0;i<qidsarray.length;i++){
    		String oid = qidsarray[i];
    		if(oid.equals(qid)){
    			continue;
    		}else{
    			if(nqids.equals("")){
    				nqids = oid;
    			}else{
    				nqids+=","+oid;
    			}
    		}
    	}
    	
    	u.setQids(nqids);
    	baseService.update(u);
    	renderJsonpObj(u);
    }*/
    
    /*******************************************好友管理*******************************/
    
    
    
    public void listMyFriend(){
    	String uid = request.getParameter("uid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	if(u.getFids()==null || u.getFids().equals("")){
    		renderJsonpObj(null);
    	}else{
    		List<User> list = baseService.list("from User t where t.id in ("+u.getFids()+")");
        	renderJsonpObj(list);
    	}
    	
    }

    public void listUser(){
    	String roletype = request.getParameter("roletype");
    	String hql = "from User t where 1=1";
    	if(roletype!=null && !roletype.equals("")){
    		hql+=" and t.roletype='"+roletype+"'";
    	}
    	renderJsonpObj(baseService.list(hql));
    }
    
    public void checkIsMyFriend(){
    	String uid = request.getParameter("uid");
    	String fid = request.getParameter("fid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	String fids = u.getFids();
    	String info = "0";
    	if(fids!=null && !fids.equals("")){
    		String[] fidsarray = fids.split(",");
    		for(int i=0;i<fidsarray.length;i++){
        		if(fidsarray[i].equals(fid)){
        			info = "1";
        			break;
        		}
        	}
    	}
    	
    	renderJsonpString(info);
    }
    
    public void addFriend(){
    	String uid = request.getParameter("uid");
    	String fid = request.getParameter("fid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	String fids = u.getFids();
    	if(fids==null||fids.equals("")){
    		fids = fid;
    	}else{
    		fids+=","+fid;
    	}
    	u.setFids(fids);
    	baseService.update(u);
    	renderJsonpObj(u);
    }
    
    
    public void delFriend(){
    	String uid = request.getParameter("uid");
    	String fid = request.getParameter("fid");
    	User u = (User) baseService.find(Integer.parseInt(uid), User.class);
    	String fids = u.getFids();
    	String[] fidsarray = fids.split(",");
    	String nfids = "";
    	for(int i=0;i<fidsarray.length;i++){
    		String oid = fidsarray[i];
    		if(oid.equals(fid)){
    			continue;
    		}else{
    			if(nfids.equals("")){
    				nfids = oid;
    			}else{
    				nfids+=","+oid;
    			}
    		}
    	}
    	
    	u.setFids(nfids);
    	baseService.update(u);
    	renderJsonpObj(u);
    }
    
    public void sendAddMessage(){
    	Yzmessage msg = (Yzmessage) getByRequest(new Yzmessage(), true);
    	msg.setNdate(GetNowTime.getNowTimeEn());
    	baseService.save(msg);
    	renderJsonpString("0");
    }
    
    public void listMyAddMessage(){
 	   String uid = request.getParameter("uid");
 	   List<Message> mlist = baseService.list("from Yzmessage t where t.tid = "+uid);
 	   renderJsonpObj(mlist);
    }
    
    public void updateYzMsgStatus(){
    	String id = request.getParameter("id");
    	String status = request.getParameter("status");
    	status = encodeGet(status);
    	Yzmessage msg = (Yzmessage) baseService.find(Integer.parseInt(id), Yzmessage.class);
    	msg.setStatus(status);
    	baseService.update(msg);
    	renderJsonpString("0");
    }
    
    
    /*******************************************好友管理*******************************/
    
    public void addMessage(){
    	Message msg = (Message) getByRequest(new Message(), true);
        String ndate = GetNowTime.getNowTimeEn();
        msg.setNdate(ndate);
        baseService.save(msg);
        renderJsonpObj(msg);
    }
    
    public void addQunMessage(){
    	Message msg = (Message) getByRequest(new Message(), true);
        String ndate = GetNowTime.getNowTimeEn();
        msg.setNdate(ndate);
        msg.setZan(0);
        baseService.save(msg);
        renderJsonpObj(msg);
    }
    
    public void listQunMessage(){
    	String uid = request.getParameter("uid");
    	String qid = request.getParameter("qid");
    	List<Message> list = null;
    	if(uid!=null){
    		int id = Integer.parseInt(uid);
    		int iqid = Integer.parseInt(qid);
    		list = listAboutMeQun(id,iqid);
    	}
    	renderJsonpObj(list);
    }
    
    
    public List<Message> listAboutMeQun(int uid,int fid) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("from Message u where 1=1");
		sb.append(" and u.qid="+fid);
	
		System.out.println(sb.toString());
		List teaList = baseService.list(sb.toString());
		return teaList;
	}
    
    public void listMyMessage(){
    	String uid = request.getParameter("uid");
    	String fid = request.getParameter("fid");
    	List<Message> list = null;
    	if(uid!=null){
    		int id = Integer.parseInt(uid);
    		int fiid = Integer.parseInt(fid);
    		list = listAboutMe(id,fiid);
    	}
    	renderJsonpObj(list);
    }
    
    public List<Message> listAboutMe(int uid,int fid) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("from Message u where 1=1");
		sb.append(" and (u.uid="+uid+" or u.fid="+uid+") and (u.uid="+fid+" or u.fid="+fid+")");
	
		System.out.println(sb.toString());
		List teaList = baseService.list(sb.toString());
		return teaList;
	}
    
    
    public void getUser(){
    	String id = request.getParameter("id");
    	User u = (User) baseService.find(Integer.parseInt(id), User.class);
    	renderJsonpObj(u);
    }
    public void getWeather(){
    	try {
    		String city = request.getParameter("city");
    		city = encodeGet(city);
			city = URLEncoder.encode(city,"utf-8");
			String url = "http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=W6eQXHTZjNf7QTG9k9Mpboez";		
			String r = HttpClientTools.get(url);
		
			renderJsonpString(r);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    /**********************************************聊天相关结束*************************************/
}
