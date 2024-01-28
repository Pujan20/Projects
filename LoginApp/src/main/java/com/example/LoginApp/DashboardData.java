package com.example.LoginApp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Entity
public class DashboardData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "`procedure`", nullable = false) 
    private String procedure;

    @Column(nullable = false)
    private String place;

    @Column(name = "procedure_by", nullable = false) 
    private String procedureBy;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    
    

public DashboardData(Long id, String name, String procedureName, String place, String procedureBy,
		LocalDateTime dateTime) {
	super();
	this.id = id;
	this.name = name;
	this.procedure = procedure;
	this.place = place;
	this.procedureBy = procedureBy;
	this.dateTime = dateTime;
}



@Override
public String toString() {
	return "DashboardData [id=" + id + ", name=" + name + ", procedure=" + procedure + ", place=" + place
			+ ", procedureBy=" + procedureBy + ", dateTime=" + dateTime + "]";
}



public DashboardData() {
	// TODO Auto-generated constructor stub
}


public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getProcedure() {
	return procedure;
}
public void setProcedure(String procedure) {
	this.procedure = procedure;
}
public String getPlace() {
	return place;
}
public void setPlace(String place) {
	this.place = place;
}
public String getProcedureBy() {
	return procedureBy;
}
public void setProcedureBy(String procedureBy) {
	this.procedureBy = procedureBy;
}
public LocalDateTime getDateTime() {
	return dateTime;
}
public void setDateTime(LocalDateTime dateTime) {
	this.dateTime = dateTime;
}


}
