/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */

var module = (function () {
    
    var x = document.getElementById("demo");
    var name;
    var idUser;
    var password;
    var mail;
    var gender;
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
        
        
      singUp : function(nam,passwor,mai,gende,idUs){
          
          name=nam;
          password= passwor;   
          mail=mai;
          gender=gende;
          idUser=idUs;
          module.createUser();
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
        
        login:function(idUser,password){
          $.get("/eata/users/"+idUser, function(data){
              if(data.idUser == idUser && data.password == password){
                  estaLogeado=true;
                  module.redireccionAinicio();
                  
              }
          });
        },
       createUser:function(){
           
          // document.getElementById("nameNewUSer").innerHTML= "The user "+name+" has been successfully created";
           //[{"document":2090540,"password":"1234","friends":[],"mail":"aaaa@mail.com","gender":"macho","freeHours":null,"name":"Jairo Gonzalez"}
          // "{\"author\":"+"\""+nombre+"\","+"\"points\":"+JSON.stringify(puntosActuales)+",\""+"name\":"+"\""+nombrePlano+"\""+"}";
           var newUser = "{\"idUser\":"+idUser+","+"\"password\":"+"\""+password+"\","+"\"friends\":[],\""+"mail\":"+"\""+mail+"\",\""+"gender\":"+"\""+gender+"\",\""+"freeTime\":[],\""+"name\":"+"\""+name+"\""+"}";
           console.log(newUser);
           var crear=$.ajax({
                url: "/eata",
                type: 'POST',
                data: newUser,
                contentType: "application/json"
            });
            crear.then(
               function(){
                   alert("Usuario Creado");
                   estaLogeado=true;
                   module.redireccionAinicio();
                   
               }
                       
            );
       },
       getLocation: function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(module.showPosition(), module.showError() );
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
       },
       //coordinates
       showPosition: function(position){
            console.log(position.latitude);
            var latlon = position.latitude + "," + position.coords.longitude;
            var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+ latlon + "&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
            document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
       },
       
       showError: function(error){
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    break;
            }
        }
    }
 
    
    
})();
