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
    var stompClient = null;
    var conectados = [];

    


    return{
        init: function () {
            module.connectAndSubscribe();
            module.limpiarTodo();
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
        }, //document.getElementById('name').value, document.getElementById('pass').value


        connectAndSubscribe: function () {
            console.info('Connecting to WS...');
            var socket = new SockJS('/stompendpoint');
            stompClient = Stomp.over(socket);
            //subscribe to /topic/TOPICXX when connections succeed
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                stompClient.subscribe('/topic/newuserconected', function (eventbody) {
                    //conectados.push(eventbody);
                    console.log("usuarios conectados: " + eventbody);
                    module.crearTablaAmigosConectados();

                });
                ///topic/cerrarsesion
                stompClient.subscribe('/topic/cerrarsesion', function (eventbody) {
                    //conectados.push(eventbody);
                    for (i = 0; i < conectados.length; i++) {
                        console.log(conectados[i]);
                        console.log(JSON.parse(eventbody.body));
                        if(conectados[i]==JSON.parse(eventbody.body).toString()){
                            console.log("tabla: "+conectados+" "+conectados[i]==JSON.parse(eventbody.body));
                            conectados[i] == "";
                        }

                    }
                    console.log("usuarios conectados: " + eventbody);
                    module.crearTablaAmigosConectados();

                });

            });return true;
        },
        
        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            //setConnected(false);
            console.log("Disconnected");
        },
        
        publishNewUserConected: function (nombre) {
            stompClient.send('/app/newuserconected', {}, nombre);
        },
        
        login: function (carnet, pass) {
            
            $.get("/eata/users/" + carnet, function (data) {
                            console.log(data.idUser);
                            if (data.idUser == carnet && data.password == pass) {
                                name = data.name;
                                console.log(name + " :name en login");
                                idUser = data.idUser;
                                password = data.password;
                                mail = data.mail;
                                gender = data.gender;
                                estaLogeado = true;
                                $("#tituloContenido").empty();
                                $("#contenido").empty();
                                module.pagInicio();
                                module.publishNewUserConected(name);
                            }
                        });
        },
        
        crearFormularioGrupo: function () {
            module.limpiarTodoMenosPerfil();
            $("#tituloContenido").append("<h1>Crear Grupo</h1>");
            $("#contenido").append("<form action='/action_page.php'>\n\
                                        <div class='container'>\n\
                                          <label><b>Name</b></label>\n\
                                          <input id='groupName' type='text' placeholder='Enter group name'  required>\n\
                                          <label><b>Description</b></label>\n\
                                          <input id='groupDescription' type='text' placeholder='Enter group description'  required>\n\
                                        </div>\n\
                                 </form>");
            $("#botones").append("<button type='button' onclick=\"module.crearGrupo()\">Crear Grupo</button>\n\
                                  <button type='button' class='cancelbtn' onclick=\"module.pagInicio()\">Cancelar</button>");

            $("#tablas").append("<table id='checkAmigosGrupos' class='miclase'>\n\
                                 <tr><th id='amigosParaGrupo'>Amigos</th><th id='checkgrupo'></th></tr>\n\
                                </table>");

            $.get("/eata/users/myfriends/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    $("#checkAmigosGrupos").append("<tr>\n\
                                                    <td>" + data[i].name + "</td>\n\
                                                    <td><input aling='center' id=" + data[i].idUser + " type='checkbox' name='idFriend' value=" + data[i].idUser + "><br></td>\n\
                                                   </tr>");



                }

            });
        },
        crearGrupo: function () {
            var members = [];
            var newId;
            $.get("/eata/groups", function (data) {
                newId = (data.length) + 1;
                console.log((data.length + 1) + " :data.lengyh");
            });

            console.log(document.getElementById("groupName").value);
            console.log(document.getElementById("groupDescription").value);
            $.get("/eata/users/myfriends/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    console.log(document.getElementById(data[i].idUser).checked + " : " + data[i].name);
                    if (document.getElementById(data[i].idUser).checked) {
                        console.log("Entro a agregar un miembro" + data[i].idUser);
                        members.push(data[i].idUser);
                        console.log(members);
                    }

                }
            });
            console.log(members);



            // "{"members":[2101751,2099444],"meetings":[1],"id":1,"name":"arsw trabajo","description":"Este grupo es para hacer lab de arsw"}";
            var newGroup = "{\"members\":" + JSON.stringify(members) + "," + "\meetings\":[],\"" + "id\":" + newId + ",\"" + "name\":" + "\"" + document.getElementById("groupName").value + "\",\"" + "description\":" + "\"" + document.getElementById("groupDescription").value + "\"}";
            console.log(newGroup);
            var crear = $.ajax({
                url: "/addgroup",
                type: 'POST',
                data: newGroup,
                contentType: "application/json"
            });
            crear.then(
                    function () {
                        alert("Usuario Creado");
                        estaLogeado = true;
                        signUpJs.redireccionAinicio();

                    }

            );
        },
        
        cerrarSesion: function(){
            stompClient.send('/app/cerrarsesion', {}, JSON.stringify(name));
            
             module.disconnect();
                module.init();
        },
        
        traerPerfil: function () {
            $("#perfil").append("<h4 id='nameUser' style='text-align-last: center'  >" + name + "</h4>\n\
                                        <p >\n\
                                        <img src='amigos.png' style='height:106px;width:106px;' alt='Avatar'>\n\
                                        </p>\n\
                                        <p style='text-align-last: center'>Escuela Colombiana de Ingenieria</p>\n\
                                        <p style='text-align-last: center'>London, UK</p><p style='text-align-last: center'> April 1, 1988</p>\n\
                                        <hr>\n\
                                        <table id='tablaAmigos' class='miclase'>\n\
                                        <tr><th id='friends'>Friends</th></tr>\n\
                                        </table>\n\
                                        <hr>\n\
                                        <table id='tablaGrupos' class='miclase'>\n\
                                        <tr><th id='grupos'>Groups</th></tr>\n\
                                        </table>"
                    );
        },
        limpiarTodo: function () {
            $("#perfil").empty();
            $("#tituloContenido").empty();
            $("#contenido").empty();
            $("#tablas").empty();
            $("#botones").empty();
        },
        limpiarTodoMenosPerfil: function () {
            $("#tituloContenido").empty();
            $("#contenido").empty();
            $("#tablas").empty();
            $("#botones").empty();
        },
        pagInicio: function () {
            module.limpiarTodo();
            module.traerPerfil();
            module.traerMapa();
            module.traerMisAmigos();
            module.traerMisGrupos();
            module.botonesDiv();
            module.crearTablaAmigosConectados();
        },
        
        crearTablaAmigosConectados: function () {
            $("#tablas").empty();
            $("#tablas").append("<h1>Amigos Conectados</h1>");
            $("#tablas").append("<table id='amigosConectadosId' class='miclase'>\n\
                                 <tr><th id='Nombre'>Amigos</th></tr>\n\
                                </table>");
            
            $.get("/eata/usersconected", function (data) {
                for (i = 0; i < data.length; i++) {
                    console.log("GET lalalala: "+data);
                    $("#tablas").append("<tr><td>" + data[i] + "</td></tr>");

                }

            });
        },
        botonesDiv: function () {
            $("#botones").empty();
            $("#botones").append("<button type='button' onclick=\"module.crearFormularioGrupo()\">Crear Grupo</button>");
            $("#botones").append("<button class='cancelbtn' type='button' onclick=\"module.cerrarSesion()\">Cerrar Sesion</button>");
        },
        traerMapa: function () {
            $("#tituloContenido").append("<h1>Amigos cercanos:</h1>");
            module.getLocation();
        },
        traerMisAmigos: function () {
            $.get("/eata/users/myfriends/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    $("#tablaAmigos").append("<tr><td>" + data[i].name + "</td></tr>");

                }

            });
        },
        traerMisGrupos: function () {
            $.get("/eata/users/mygroups/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    $("#tablaGrupos").append("<tr><td>" + data[i].name + "</td></tr>");

                }

            });
        },
        getLocation: function () {
            if (navigator.geolocation) {
                //module.myMap(navigator.geolocation.getCurrentPosition());
                navigator.geolocation.getCurrentPosition(module.myMap);
            }
        },
        showPosition: function (position) {
            console.log("Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude);
        },
        myMap: function (position) {
            var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            console.log("Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude);
            var map = new google.maps.Map(document.getElementById("contenido"), mapOptions);
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                map: map
            });
        }

    }



})();
