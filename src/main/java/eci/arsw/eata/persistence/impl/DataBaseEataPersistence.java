/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.persistence.impl;

import eci.arsw.eata.model.Group;
import eci.arsw.eata.model.Meeting;
import eci.arsw.eata.model.User;
import eci.arsw.eata.persistence.EataNotFoundException;
import eci.arsw.eata.persistence.EataPersistence;
import eci.arsw.eata.persistence.EataPersistenceException;
import java.util.Set;

/**
 *
 * @author 2101751
 */
public class DataBaseEataPersistence implements EataPersistence{

    @Override
    public void saveUser(User user) throws EataPersistenceException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void saveGroup(Group group) throws EataPersistenceException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void addMeeting(Meeting metting, int idGroup) throws EataPersistenceException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void addFriend(int friendDocument, int document) throws EataPersistenceException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public User getUser(int document) throws EataNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Set<User> getUsersByGroup(int idGroup) throws EataNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deleteGroup(int idGroup) throws EataNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Set<User> getAllUsers() throws EataNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

  
    
}
