package com.ideabobo.model;

/**
 * User entity. @author MyEclipse Persistence Tools
 */

public class Line implements java.io.Serializable {

	// Fields
    private Integer id;
    private Integer bid;
	private Integer uid;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getBid() {
		return bid;
	}
	public void setBid(Integer bid) {
		this.bid = bid;
	}
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	
   
}