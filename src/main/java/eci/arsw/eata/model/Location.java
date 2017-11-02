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
public class Location {
    private double latitude;
    private double  longitude;

    public Location(double  latitude, double  longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double  getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public double  getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }


}
