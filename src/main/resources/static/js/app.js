/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google, controllerInicio */

var module = (function () {
    
    var name;
    var idUser;
    var password;
    var mail;
    var gender;
    var posicion;
    var estaLogeado = false;

    return{
        init: function(){
            $("#tituloContenido").empty();
            $("#contenido").empty();
            $("#tituloContenido").append("<h1>Login</h1>");
            $("#contenido").append("<form action='/action_page.php'>\n\
                                        <div class='container'>\n\
                                          <label><b>Username</b></label>\n\
                                          <input id='name' type='text' placeholder='Enter Username' name='uname' required>\n\
                                          <label><b>Password</b></label>\n\
                                          <input id='pass' type='password' placeholder='Enter Password' name='psw' required>\n\
                                          <button type='button' onclick=\"module.login(document.getElementById('name').value, document.getElementById('pass').value)\">Login</button>\n\
                                        </div>\n\
                                 </form>");
        },                  //document.getElementById('name').value, document.getElementById('pass').value
        
        
        
        login: function(carnet, pass){
            console.log(carnet);
            console.log(pass);
            $.get("/eata/users/" + carnet, function (data) {
                console.log(data.idUser);
                if (data.idUser == carnet && data.password == pass) {
                    name = data.name;
                    console.log(name+" :name en login");
                    idUser = data.idUser;
                    password = data.password;
                    mail = data.mail;
                    gender = data.gender;
                    estaLogeado = true;
                    $("#tituloContenido").empty();
                    $("#contenido").empty();
                    $("#perfil").append("<h4 id='nameUser' style='text-align-last: center'  >"+name+"</h4>\n\
                                        <p >\n\
                                        <img src='amigos.png' style='height:106px;width:106px;' alt='Avatar'>\n\
                                        </p>\n\
                                        <p style='text-align-last: center'>Escuela Colombiana de Ingenieria</p>\n\
                                        <p style='text-align-last: center'>London, UK</p><p style='text-align-last: center'> April 1, 1988</p>\n\
                                        <hr><table id='tablaAmigos' class='miclase'>\n\
                                        <tr><th id='friends'>Friends</th></tr>\n\
                                        </table>\n\
                                        <hr><table id='tablaGrupos' class='miclase'>\n\
                                        <tr><th id='grupos'>Groups</th></tr>\n\
                                        </table>"
                                            );
                    module.traerMisAmigos();
                    module.traerMisGrupos();
                    module.traerMapa();

                    
                }
          });
        },
        
        traerMapa: function(){
            $("#tituloContenido").append("<h1>Amigos cercanos:</h1>");
            module.getLocation();
        },
        
        traerMisAmigos: function(){
            $.get("/eata/users/myfriends/" + idUser, function (data) {
               for (i = 0; i < data.length; i++){
                   $("#tablaAmigos").append("<tr>");
                   $("#tablaAmigos").append("<tr><td>"+data[i].name+"</td></tr>");
                    
               }
                
            });
        },
        
        traerMisGrupos: function(){
            $.get("/eata/users/mygroups/" + idUser, function (data) {
               for (i = 0; i < data.length; i++){
                   $("#tablaGrupos").append("<tr>");
                   $("#tablaGrupos").append("<tr><td>"+data[i].name+"</td></tr>");
                    
               }
                
            });
        },
        
        getLocation: function() {
                    if (navigator.geolocation) {
                        //module.myMap(navigator.geolocation.getCurrentPosition());
                        navigator.geolocation.getCurrentPosition(module.myMap);
                    }
        },
                
        showPosition: function(position){
                    console.log( "Latitude: " + position.coords.latitude + 
                    "<br>Longitude: " + position.coords.longitude);
                },
                
        myMap: function(position) {
                    var mapOptions = {
                        center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    console.log( "Latitude: " + position.coords.latitude + 
                    "<br>Longitude: " + position.coords.longitude);
                    var map = new google.maps.Map(document.getElementById("contenido"), mapOptions);
                    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                        
                        map: map
                      });
                }

    }
 
    
    
})();
