/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eci.arsw.eata.persistence;

/**
 *
 * @author hcadavid
 */
public class EataNotFoundException extends Exception{

    public EataNotFoundException(String message) {
        super(message);
    }

    public EataNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
