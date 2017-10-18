/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.persistence;

import eci.arsw.eata.model.Group;
import eci.arsw.eata.model.User;
import java.util.Set;

import org.springframework.stereotype.Service;

/**
 *
 * @author 2101751
 */
@Service
public interface EataPersistence {
   
    /**
     *
     * @param usuario
     * @throws EataPersistenceException
     */
    public void saveUser(User usr) throws EataPersistenceException;
    
    public void saveGroup(Group grp) throws EataPersistenceException;
    
    
    public User getUser(String idUser) throws EataNotFoundException;
    
    
    public Set<User> getUserByGroup(String idGroup) throws EataNotFoundException;
    
    
    public void deleteBlueprint(String author, String nameBlueprint) throws EataNotFoundException;
  
}
