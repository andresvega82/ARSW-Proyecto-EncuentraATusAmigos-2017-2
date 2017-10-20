/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google, controllerInicio */

var module = (function () {

    var estaLogeado = false;

    //var url = "http://arsw-proyecto-2017-2.herokuapp.com";
    var url = "http://localhost:8080";
    

    
    return{
//        myMap : function() {
//            var mapOptions = {
//                center: new google.maps.LatLng(51.5, -0.12),
//                zoom: 10,
//                mapTypeId: google.maps.MapTypeId.HYBRID
//            }
//            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//        },

//        getLocation: function () {
//            if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(showPosition);
//            } else { 
//                y.innerHTML = "Geolocation is not supported by this browser.";
//            }
//        },
//
//        showPosition : function (position) {
//            y.innerHTML = "Latitude: " + position.coords.latitude + 
//            "<br>Longitude: " + position.coords.longitude;
//        },
        
        
      
        
        nombreUser: function(){
            console.log(name+" :nombre en APP");
          return name;  
        },
        cerrarSesion: function(){
            estaLogeado = false;
            module.redireccionAlogin()
        },
        
        redireccionAsingup: function(){
            window.location= url+"/signUp.html";
        },
        
        redireccionAlogin: function(){
            window.location=url+"/login.html";
        },
        
        redireccionAinicio: function(){
            
            if(estaLogeado){
                window.location=url+"/inicio.html";
                
            }
            
            
        },

    }
 
    
    
})();
