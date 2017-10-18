/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.persistence;

import eci.arsw.eata.model.Group;
import eci.arsw.eata.model.Meeting;
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
     * @param 
     * @return 
     * @throws EataPersistenceException
     */
    public Set<User> getAllUsers() throws EataNotFoundException;
    
    /**
     *
     * @param user
     * @throws EataPersistenceException
     */
    public void saveUser(User user) throws EataPersistenceException;
    
    /**
     *
     * @param group 
     * @throws EataPersistenceException
     */
    public void saveGroup(Group group) throws EataPersistenceException;
    
    /**
     *
     * @param metting es el objeto reunion que se va a agregar a un grupo
     * @param idGroup es el id del grupo al cual se va a agregar la reunion
     * @throws EataPersistenceException
     */
    public void addMeeting(Meeting metting, int idGroup) throws EataPersistenceException;
    
    /**
     *
     * @param friendDocument es el id del amigo al cual va a agregar
     * @param document es el id del usuario actual
     * @throws EataPersistenceException
     */
    public void addFriend(int friendDocument, int document) throws EataPersistenceException;
    
    /**
     *
     * @param document es el id del usuario, corresponde al carnet
     * @return el usuario asociado al id
     * @throws EataPersistenceException
     */
    public User getUser(int document) throws EataNotFoundException;
    
    
    /**
     *
     * @param idGroup es el id del grupo
     * @return retorna el conjunto de usuarios asociados a ese grupo
     * @throws EataPersistenceException
     */
    public Set<User> getUsersByGroup(int idGroup) throws EataNotFoundException;
    
    /**
     *
     * @param idGroup es el id del grupo que se quiere eliminar
     * @throws EataPersistenceException
     */
    public void deleteGroup(int idGroup) throws EataNotFoundException;
  
}
