package com.ideabobo.service;

import java.util.List;
import java.util.Map;

import com.ideabobo.model.Settings;
import com.ideabobo.util.Page;

public interface SettingsService {
	public void save(Settings model);
	public void update(Settings model);
	public Settings find(String uuid);
	public Settings find(Settings model);
	public void delete(Integer uuid);
	public List<Settings> list();
    public List<Settings> list(Settings model);
	public Page findByPage(Page page,Map paramsMap);
}
