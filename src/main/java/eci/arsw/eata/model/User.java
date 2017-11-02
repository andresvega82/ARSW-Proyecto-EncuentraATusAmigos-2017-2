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

public class User {
    
    private int idUser;
    private String password;
    private ArrayList<Integer> friends = new ArrayList<Integer>();
    private String mail;
    private String gender;
    private ArrayList<FreeTime> freeTime = new ArrayList<FreeTime>();
    private String name;
    private Location location;
    private Boolean online = false;

    public User(int idUser, String password,ArrayList<Integer> friends, String mail, String gender,ArrayList<FreeTime> freetime, String name) {
        this.idUser = idUser;
        this.password = password;
        this.mail = mail;
        this.gender = gender;
        this.name = name;
        this.friends = friends;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }
    
    public User() {
    }  
    
    public User(String name, int idUser, String password , String mail, String gender) {
        this.name = name;
        this.idUser = idUser;
        this.password = password;
        this.mail = mail;
        this.gender = gender;
    }
    
    public void addFriend(int idUser){
        this.friends.add(idUser);
    }
    
    public void addFreeTime(FreeTime ft){
        this.freeTime.add(ft);
    }
    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<Integer> getFriends() {
        return friends;
    }

    public void setFriends(ArrayList<Integer> friends) {
        this.friends = friends;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public ArrayList<FreeTime> getFreeTime() {
        return freeTime;
    }

    public void setFreeTime(ArrayList<FreeTime> freeTime) {
        this.freeTime = freeTime;
    }

}
