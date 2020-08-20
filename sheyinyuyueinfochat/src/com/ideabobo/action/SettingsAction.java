package com.ideabobo.action;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.ideabobo.model.Settings;
import com.ideabobo.service.BaseService;
import com.ideabobo.service.SettingsService;
import com.ideabobo.util.IdeaAction;
import com.ideabobo.util.Page;

@Controller
public class SettingsAction extends IdeaAction {
	@Resource
	private SettingsService settingsService;
	@Resource
	private BaseService baseService;
	private static final long serialVersionUID = -3218238026025256103L;
	private Settings settings;
	public Settings getSettings() {
		return settings;
	}

	public void setSettings(Settings settings) {
		this.settings = settings;
	}

	public String settings(){
		return SUCCESS;
	}
	
	public void getList(){
		String settingsname = request.getParameter("sgname");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		Page page = new Page();
		Map paramsMap = new HashMap();
        String roletype = (String) session.get("roletype");
        if(roletype.equals("3")){
            String sid = (String) session.get("sid");
            paramsMap.put("sid",sid);
        }
		paramsMap.put("settingsname", settingsname);
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
		page = settingsService.findByPage(page, paramsMap);
		Gson json = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		render(json.toJson(map));		
	}
	
	public void add(){
		String action = request.getParameter("action");
		if(settings != null){
			if(action.equals("add")){
				settingsService.save(settings);
				render("操作成功!");
			}else {
				String id = request.getParameter("id");
				settings.setId(Integer.parseInt(id));
				settingsService.update(settings);
				render("操作成功!");
			}
		}		
	}
	
	public void deleteItem(){
		String id = request.getParameter("id");
		settingsService.delete(Integer.parseInt(id));
		render("操作成功");
	}


		
}
