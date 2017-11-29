/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.persistence;

import eci.arsw.eata.model.FreeTime;
import eci.arsw.eata.model.Group;
import eci.arsw.eata.model.Meeting;
import eci.arsw.eata.model.User;
import java.util.ArrayList;
import java.util.Map;
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
    
    public boolean sonAmigos(int idUser1, int idUser2);
    
    /**
     *
     * @param 
     * @return 
     * @throws EataPersistenceException
     */
    public Set<User> getMyFriends(int idUser) throws EataNotFoundException;
    
    /**
     *
     * @param 
     * @return 
     * @throws EataPersistenceException
     */
    public Set<Group> getAllGroups() throws EataNotFoundException;
    
    /**
     *
     * @param idUser es el id de la persona que solicita los grupos de si mismo
     * @return 
     * @throws EataPersistenceException
     */
    public Set<Group> getMyGroups(int idUser) throws EataNotFoundException;
    
    
    
    /**
     *
     * @param idUser es el id de la persona que solicita los grupos de si mismo
     * @return 
     * @throws EataPersistenceException
     */
    public ArrayList<FreeTime> getFreeTimebyUser(int idUser) throws EataNotFoundException;
    
    

    
    /**
     *
     * @param idUser es el id de la persona que solicita los grupos de si mismo
     * @return 
     * @throws EataPersistenceException
     */
    public ArrayList<FreeTime> getCommonFreeTimebyGroup(int idGroup) throws EataNotFoundException;
            
    /**
     *
     * @param user
     * @throws EataPersistenceException
     */
    public void saveUser(User user) throws EataPersistenceException;
    
    public Group getGroupById(int idGroup);
    

    /**
     *
     * @param group 
     * @throws EataPersistenceException
     */
    public void saveGroup(Group group) throws EataPersistenceException;
    /**
     *
     * @param meeting
     * @throws EataPersistenceException
     */
    public void saveMeeting(Meeting meeting) throws EataPersistenceException;
    
    /**
     *
     * @param metting es el objeto reunion que se va a agregar a un grupo
     * @param idGroup es el id del grupo al cual se va a agregar la reunion
     * @throws EataPersistenceException
     */
    public void addMeeting(int idMetting, int idGroup) throws EataPersistenceException;
    
    /**
     *
     * @param friendDocument es el id del amigo al cual va a agregar
     * @param idUser es el id del usuario actual
     * @throws EataPersistenceException
     */
    public void addFriend(int friendDocument, int idUser) throws EataPersistenceException;
    
    /**
     *
     * @param idUser es el id del usuario, corresponde al carnet
     * @return el usuario asociado al id
     * @throws EataPersistenceException
     */
    public User getUserByDocument(int idUser) throws EataNotFoundException;
    
    
    /**
     *
     * @param idGroup es el id del grupo
     * @return retorna el conjunto de usuarios asociados a ese grupo
     * @throws EataPersistenceException
     */
    public Set<User> getUsersByGroup(int idGroup) throws EataNotFoundException;
    
    /**
     *
     * @param idGroup es el id del grupo
     * @return retorna el conjunto de usuarios asociados a ese grupo
     * @throws EataPersistenceException
     */
    public Set<Meeting> getMeetingsByGroup(int idGroup) throws EataNotFoundException;
    
    /**
     *
     * @param idGroup es el id del grupo que se quiere eliminar
     * @throws EataPersistenceException
     */
    public void deleteGroup(int idGroup) throws EataNotFoundException;

    
    public void addNewUserConected(int idUser);

    public ArrayList<User> getMyFriendsConected(int idUser);

    public void addNewUserPosition(int idUser, double  lat, double  lon);

    public void disconectUser(int idUser);
    
    public Map<Integer,Integer> porcentajeDePersonasConectadasPorGrupo();
    
    public void addMeetingByGroup(int idMeeting, int idGroup);
    
    public ArrayList<Meeting> getAllMeetings();

    public boolean perteneceAlGrupo(int idUser, int idGroup);
  
}
