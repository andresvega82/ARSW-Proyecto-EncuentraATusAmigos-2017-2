/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.services;

import eci.arsw.eata.model.FreeTime;
import eci.arsw.eata.model.Group;
import eci.arsw.eata.model.User;
import eci.arsw.eata.persistence.EataNotFoundException;
import eci.arsw.eata.persistence.EataPersistence;
import eci.arsw.eata.persistence.EataPersistenceException;
import java.util.ArrayList;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author 2101751
 */
@Service
public class EataServices {
    
    @Autowired
    EataPersistence eatap = null;
    
    public Set<User> getAllUsers() throws EataNotFoundException{
        return eatap.getAllUsers();
    }
    
    public User getUserByDocument(int document) throws EataNotFoundException{
        return eatap.getUserByDocument(document);
    }
    
    public Set<User> getUsersByGroup(int idGroup) throws EataNotFoundException{
        return eatap.getUsersByGroup(idGroup);
    }
    
    public Set<User> getMyFriends(int document) throws EataNotFoundException{
        return eatap.getMyFriends(document);
    }
    
    public Set<Group> getAllGroups() throws EataNotFoundException{
        return eatap.getAllGroups();
    }
    
    public Set<Group> getMyGroups(int document) throws EataNotFoundException{
        return eatap.getMyGroups(document);
    }
    
    public void addNewUser(User user) throws EataNotFoundException, EataPersistenceException{
        eatap.saveUser(user);
    }
    
    public ArrayList<FreeTime> getFreeTimeByUser(int document) throws EataNotFoundException, EataPersistenceException{
        return eatap.getFreeTimebyUser(document);
        
    }
    
    public ArrayList<FreeTime> getCommonFreeTime(int idGroup) throws EataNotFoundException, EataPersistenceException{
        return eatap.getCommonFreeTimebyGroup(idGroup);
    }
    
    
    
}
