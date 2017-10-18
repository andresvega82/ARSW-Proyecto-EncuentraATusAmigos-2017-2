/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.services;

import eci.arsw.eata.model.User;
import eci.arsw.eata.persistence.EataNotFoundException;
import eci.arsw.eata.persistence.EataPersistence;
import eci.arsw.eata.persistence.EataPersistenceException;
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
    
    public void saveNewUser(User user) throws EataNotFoundException, EataPersistenceException{
        eatap.saveUser(user);
    }
    
}
