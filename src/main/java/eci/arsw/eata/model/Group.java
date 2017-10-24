/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.model;

import java.util.ArrayList;
import java.util.Set;

/**
 *
 * @author 2101751
 */
public class Group {
    
    private ArrayList<Integer> members = new ArrayList<Integer>();
    private ArrayList<Integer> meetings = new ArrayList<Integer>();
    private int id;
    private String name;
    private String description;

    public Group(ArrayList<Integer> members, int id, String name, String description) {
        this.members = members;
        this.id = id;
        this.name = name;
        this.description = description;
    }
    
    public Group(){
        
    }
    
    public void addMeeting(Integer idMeeting){
        meetings.add(idMeeting);
    }
    
    public ArrayList<Integer> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<Integer> members) {
        this.members = members;
    }

    public ArrayList<Integer> getMeetings() {
        return meetings;
    }

    public void setMeetings(ArrayList<Integer> meetings) {
        this.meetings = meetings;
    }

    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    
    
}
