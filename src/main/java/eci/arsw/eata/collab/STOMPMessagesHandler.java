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
       
        
        
	@MessageMapping("/newuserconected")    
	public void handlePointEvent(int idUser) throws Exception {
            eataservice.addNewUserConected(idUser);
            System.out.println("Usuario a agregar: "+idUser);
            msgt.convertAndSend("/topic/showMyFriendsConected", idUser);
            
	}
        
        
        @MessageMapping("/newuserposition")    
	public void agregarPosicionAUsuario(ArrayList<Object> vector) throws Exception {         
            System.out.println("Este es el vector: "+vector);
            int carnet = (int)vector.get(0);
            double lat = (double)vector.get(1);
            double lon = (double)vector.get(2);
            System.out.println("tipo de carnet: "+vector.get(0).getClass());
            System.out.println("tipo de lat: "+vector.get(1).getClass());
            System.out.println("tipo de long: "+vector.get(2).getClass());
            eataservice.addNewUserPosition(carnet, lat, lon);
            msgt.convertAndSend("/topic/showOnlineFriendsPosition", "pintar posiciones");
            
	}
        
        @MessageMapping("/cerrarsesion")    
	public void cerrarSesion(String nameUser) throws Exception {
//            System.out.println("Cerrar sesion: "+nameUser);
//            eataservice.userDisconected(nameUser);
//            msgt.convertAndSend("/topic/cerrarsesion", nameUser);
//            
            
	}
}