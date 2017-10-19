/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.controllers;

import eci.arsw.eata.model.User;
import eci.arsw.eata.services.EataServices;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author 2101751
 */
@RestController
@RequestMapping(value = "/eata")
public class EataAPIController {
    
    @Autowired
    private EataServices eataservice;
    
    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getAllUsers(), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/users/{document}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByDocument(@PathVariable("document") int document) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getUserByDocument(document), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/groups",method = RequestMethod.GET)
    public ResponseEntity<?> getAllGroups() {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getAllGroups(), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/groups/{idGroup}",method = RequestMethod.GET)
    public ResponseEntity<?> getMembersByGroup(@PathVariable("idGroup") int idGroup) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getUsersByGroup(idGroup), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/users/myfriends/{document}",method = RequestMethod.GET)
    public ResponseEntity<?> getMyFriends(@PathVariable("document") int document) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getMyFriends(document), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/users/freetime/{document}",method = RequestMethod.GET)
    public ResponseEntity<?> getFreeTimeByUser(@PathVariable("document") int document) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getFreeTimeByUser(document), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/groups/meeting/{idGroup}",method = RequestMethod.GET)
    public ResponseEntity<?> getMeetingsByGroup(@PathVariable("idGroup") int idGroup) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getMettingsByGroup(idGroup), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/groups/freetime/{idGroup}",method = RequestMethod.GET)
    public ResponseEntity<?> getCommonFreeTimeByGroup(@PathVariable("idGroup") int idGroup) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getCommonFreeTime(idGroup), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/users/mygroups/{document}",method = RequestMethod.GET)
    public ResponseEntity<?> getMyGroups(@PathVariable("document") int document) {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getMyGroups(document), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        try {
            eataservice.addNewUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.FORBIDDEN);
        }
    }
    
    
}
