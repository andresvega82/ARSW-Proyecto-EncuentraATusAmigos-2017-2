/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.model;

/**
 *
 * @author 2101751
 */
public class User {
    
    String nombre;
    int id;
    String password;
    
    
    public User(String nom, int id, String pass){
        this.nombre = nom;
        this.id = id;
        this.password = pass;
    }
}
