/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.collab;

import eci.arsw.eata.services.EataServices;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class STOMPMessagesHandler {
	
	@Autowired
	SimpMessagingTemplate msgt;
        
        @Autowired
        private EataServices eataservice;
        
        ArrayList<String> conectados = new ArrayList<String>(); 
        ConcurrentHashMap<String, String> repositorioUsuariosConectados = new ConcurrentHashMap<String, String>();
        
	@MessageMapping("/newuserconected")    
	public void handlePointEvent(String nombre) throws Exception {
            System.out.println("Nombre a agregar: "+nombre);
            if(!eataservice.isUserConected(nombre)){
                eataservice.addNewUserConected(nombre);
                msgt.convertAndSend("/topic/newuserconected", nombre);
                
            }
            
	}
        
        @MessageMapping("/cerrarsesion")    
	public void cerrarSesion(String nameUser) throws Exception {
            System.out.println("Cerrar sesion: "+nameUser);
            eataservice.userDisconected(nameUser);
            msgt.convertAndSend("/topic/cerrarsesion", nameUser);
            
            
	}
}