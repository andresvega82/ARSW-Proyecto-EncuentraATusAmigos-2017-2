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
    
    private int document;
    private String password;
    private ArrayList<Integer> friends = new ArrayList<Integer>();
    private String mail;
    private String gender;
    private ArrayList<FreeTime> freeTime = new ArrayList<FreeTime>();
    private String name;
    
    
    public User(String name, int document, String password , String mail, String gender) {
        this.name = name;
        this.document = document;
        this.password = password;
        this.mail = mail;
        this.gender = gender;
    }
    
    public void addFriend(int document){
        this.friends.add(document);
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

    public int getDocument() {
        return document;
    }

    public void setDocument(int document) {
        this.document = document;
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
