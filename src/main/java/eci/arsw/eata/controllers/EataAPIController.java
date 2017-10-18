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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author 2101751
 */
@RestController
@RequestMapping(value = "/users")
public class EataAPIController {
    
    @Autowired
    private EataServices eataservice;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        try {
            //obtener datos que se enviarán a través del API
            return new ResponseEntity<>(eataservice.getAllUsers(), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> manejadorPostRecursoXX(@RequestBody User user) {
        try {
            eataservice.addNewUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            Logger.getLogger(EataAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error bla bla bla", HttpStatus.FORBIDDEN);
        }
    }
    
    
}
