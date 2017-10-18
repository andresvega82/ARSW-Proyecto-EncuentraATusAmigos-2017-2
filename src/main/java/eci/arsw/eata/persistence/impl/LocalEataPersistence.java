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
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

/**
 *
 * @author 2101751
 */
@Service
public class LocalEataPersistence implements EataPersistence{
    
    private final Map<Integer,User> users=new HashMap<>();
    private final Map<Integer,Group> groups=new HashMap<>();
    
    public LocalEataPersistence() {
        User u1 = new User("Alejandro Villarraga", 2101751, "1234" , "asdvasd@mail.com", "macho");
        User u2 = new User("Jairo Gonzalez", 2090540, "1234" , "aaaa@mail.com", "macho");
        User u3 = new User("Miguel Rojas", 2099444, "1234" , "bbbbbb@mail.com", "macho");
        
        Set<Integer> members1 = null;
        members1.add(2101751);
        members1.add(2099444);
        
        Set<Integer> members2 = null;
        members2.add(2101751);
        members2.add(2090540);
        members2.add(2099444);
        
        Group g1 = new Group(members1, 1, "arsw trabajo", "Este grupo es para hacer lab de arsw");
        Group g2 = new Group(members2, 2, "segi trabajo", "seminariop de segi");
        
        users.put(2101751, u1);
        users.put(2090540, u2);
        users.put(2099444, u3);
        
        groups.put(1, g1);
        groups.put(2, g2);
        
    }

    @Override
    public Set<User> getAllUsers() throws EataNotFoundException {
        Set<User> allUsers = new HashSet<>();
        
        for (Map.Entry<Integer, User> entry : users.entrySet()) {
            Integer key = entry.getKey();
            User value = entry.getValue();
            allUsers.add(value);
        }
        return allUsers;
    }
    
    @Override
    public Set<Group> getAllGroups() throws EataNotFoundException {
        Set<Group> allGroups = new HashSet<>();
        
        for (Map.Entry<Integer, Group> entry : groups.entrySet()) {
            Integer key = entry.getKey();
            Group value = entry.getValue();
            allGroups.add(value);
        }
        return allGroups;
    }
    
    @Override
    public void saveUser(User user) throws EataPersistenceException {
        
        if (users.containsKey(user.getDocument())){
            throw new EataPersistenceException("El usuario dado ya existe: "+user);
        }
        else{
            users.put(user.getDocument(), user);
        } 
    }

    @Override
    public void saveGroup(Group group) throws EataPersistenceException {
        if (groups.containsKey(group.getId())){
            throw new EataPersistenceException("El usuario dado ya existe: "+group);
        }
        else{
            groups.put(group.getId(), group);
        }
    }

    @Override
    public void addMeeting(Meeting metting, int idGroup) throws EataPersistenceException {
        groups.get(idGroup).addMeeting(metting);
        
    }

    @Override
    public void addFriend(int friendDocument, int document) throws EataPersistenceException {
        users.get(document).addFriend(friendDocument);
    }

    @Override
    public User getUser(int document) throws EataNotFoundException {
        return users.get(document);
    }

    @Override
    public Set<User> getUsersByGroup(int idGroup) throws EataNotFoundException {
        Set<Integer> idUsersGroup = groups.get(idGroup).getMembers();
        Set<User> usersGroup = null;
        
        for (Iterator<Integer> e = idUsersGroup.iterator(); e.hasNext();) {
            usersGroup.add(users.get(e));
        }
        
        
        
        return usersGroup;
    }

    @Override
    public void deleteGroup(int idGroup) throws EataNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    

    

   
    
}
