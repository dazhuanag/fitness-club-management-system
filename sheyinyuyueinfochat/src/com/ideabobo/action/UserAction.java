package com.ideabobo.action;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;





import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.ideabobo.model.Bill;
import com.ideabobo.model.Shop;
import com.ideabobo.model.User;
import com.ideabobo.service.BaseService;
import com.ideabobo.service.UserService;
import com.ideabobo.util.GetNowTime;
import com.ideabobo.util.IdeaAction;
import com.ideabobo.util.Page;

@Controller
public class UserAction extends IdeaAction {
	@Resource
	private UserService userService;
	@Resource
	private BaseService baseService;
	private static final long serialVersionUID = -3218238026025256103L;
	private User user;
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String user(){
		return SUCCESS;
	}
	
	public String user2(){
		return "user2";
	}
	
	public void getList(){
		String isjl = request.getParameter("isjl");
		String username = request.getParameter("susername");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		Page page = new Page();
		Map paramsMap = new HashMap();
		paramsMap.put("username", username);
		paramsMap.put("isjl", isjl);
		paramsMap.put("sort", "order by "+sort+" "+order);
		String pageNo = (String) this.request.getParameter("page");
		String pageSizes = (String) this.request.getParameter("rows");
		if (pageNo == null) {
			page.setPageSize(10);
			page.setPageNo(1);
		} else {
			page.setPageSize(Integer.parseInt(pageSizes));
			page.setPageNo(Integer.parseInt(pageNo));
		}
		page = userService.findByPage(page, paramsMap);
		Gson json = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		render(json.toJson(map));		
	}
	
	public void add(){
		String action = request.getParameter("action");
		if(user != null){
			if(action.equals("add")){
				userService.save(user);
				render("操作成功!");
			}else {
				String id = request.getParameter("id");
				user.setId(Integer.parseInt(id));
				userService.update(user);
				render("操作成功!");
			}
		}		
	}
	
	public void deleteItem(){
		String id = request.getParameter("id");
		userService.delete(Integer.parseInt(id));
		render("操作成功");
	}
	
	public void login(){
		String username = request.getParameter("username");
		String passwd = request.getParameter("passwd");
		User tu = new User();
		tu.setUsername(username);
		tu.setPasswd(passwd);
		User u = userService.find(tu);
		if(u != null){
			session.put("usertype", u.getRoletype());
			session.put("username", u.getUsername());
			render("登录成功,欢迎您!"+u.getUsername());
		}else{
			render("用户名或密码错误!");
		}		
	}
	
	public void saveCharge(){
		String idstr = request.getParameter("id");
		User user = userService.find(idstr);
		Integer money = user.getMoney();
		String mo = request.getParameter("money");
		if(money!=null){
			money = money+Integer.parseInt(mo);
			user.setMoney(money);
		}else{
			user.setMoney(Integer.parseInt(mo));
		}
		userService.update(user);
		render("success");
	}
	
	
	
	public void userState(){
		String bid = request.getParameter("bid");
		String statecn = request.getParameter("statecn");
		User b = (User) baseService.find(Integer.parseInt(bid), User.class);
		b.setStatecn(statecn);
		baseService.update(b);
		render("success");
	}
	
	public void userList(){
		ArrayList<User> list = (ArrayList<User>) baseService.list("from User t where t.isjl='1'");
		render(gson.toJson(list));
	}
		
}
