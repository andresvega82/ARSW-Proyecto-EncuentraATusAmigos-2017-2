/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.model;

import java.util.Set;

/**
 *
 * @author 2101751
 */
public class Group {
    
    private Set<Integer> members;
    private Set<Meeting> meetings;
    private int id;
    private String name;
    private String description;

    public Group(Set<Integer> members, int id, String name, String description) {
        this.members = members;
        this.id = id;
        this.name = name;
        this.description = description;
    }
    
    public void addMeeting(Meeting meeting){
        meetings.add(meeting);
    }
    
    public Set<Integer> getMembers() {
        return members;
    }

    public void setMembers(Set<Integer> members) {
        this.members = members;
    }

    public Set<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(Set<Meeting> meetings) {
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
