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
    var posicion
    var lat;
    var long;
    var marcadores = [];
    var misAmigos;
    var estaLogueado = false;
    var estaEnInicio = false;
    
     
    
    var map;
    var stompClient = null;

    

    return{
        init: function () {
            
            module.connectAndSubscribe()
            module.limpiarTodo();
            $("#tituloContenido").append("<h1>Login</h1>");
            $("#contenido").append("<form action='/action_page.php'>\n\
                                        <div id='formularioLogin' class='container'>\n\
                                          <label><b>Username</b></label>\n\
                                          <input id='name' type='text' placeholder='Enter Username' name='uname' required>\n\
                                          <label><b>Password</b></label>\n\
                                          <input id='pass' type='password' placeholder='Enter Password' name='psw' required>\n\
                                          <button type='button' onclick=\"module.login(document.getElementById('name').value, document.getElementById('pass').value)\">Login</button>\n\
\n\                                       <button type='button' onclick=\"module.formatoSignUp()\">Sign Up</button>\n\
                                        </div>\n\
                                 </form>");
        }, //document.getElementById('name').value, document.getElementById('pass').value
        
        formatoSignUp: function(){
            module.limpiarTodo();
            $("#tituloContenido").append("<h1>Sign Up</h1>");
            $("#contenido").append("<form action='/action_page.php'' style='border:1px solid #ccc'>\n\
                                    <div class='container'>\n\
                                      <label><b>Name</b></label>\n\
                                      <input id='nameSignUp' type='text' placeholder='Enter name' name='nameSignUp' required>\n\
                                      <label><b>Email</b></label>\n\
                                      <input id='emailSignUp' type='text' placeholder='Enter Email' name='emailSignUp' required>\n\
                                      <label><b>Carnet</b></label>\n\
                                      <input id='carnetSignUp' type='text' placeholder='Enter Carnet' name='carnetSignUp' required>\n\
                                      <label><b>Password</b></label>\n\
                                      <input id='pswSignUp' type='password' placeholder='Enter Password' name='pswSignUp' required>\n\
                                    </div>\n\
                                  </form>");
            $("#botones").append("<div class='clearfix'>\n\
                                        <button type='button' class='signupbtn' onclick='module.addNewUser()' >Sign Up</button>\n\
                                        <button type='button' class='cancelbtn' onclick='module.init()' >Cancel</button>\n\
                                      </div>");
            
        },
        
        addNewUser: function (){
            //{"idUser":2098165,"password":"1.0234","friends":[2090540,2099444,1],"mail":"pollo@mail.com","gender":"macho","freeTime":[],"name":"Juan Carlos","location":null,"online":false}
            var newUser = "{\"idUser\":" + document.getElementById("carnetSignUp").value + ",\""+ "password\":" + document.getElementById("pswSignUp").value + ",\"" + "friends\":[],\""+"mail\":" + "\"" + document.getElementById("emailSignUp").value +"\",\"gender\":" + "\"" + "genero"+"\",\"freetime\":[]"+",\"name\":" + "\"" +document.getElementById("nameSignUp").value+"\",\"location\":null"+",\"online\":false"+"}";
            console.log(newUser);
            var crear = $.ajax({
                url: "/eata/addUser",
                type: 'POST',
                data: newUser,
                contentType: "application/json"
            });
            crear.then(
                    function () {
                        module.login(document.getElementById("carnetSignUp").value, document.getElementById("pswSignUp").value);

                    },
                    function(){
                        
                    }

            );
            
        },
        
        newMarcador: function (markerName, lat, long) {
            console.log("Estoy agregando marcadores");
            marcadores.push([markerName, lat, long]);
            var marker, i;
            for (i = 0; i < marcadores.length; i++) {
                new google.maps.Marker({
                    position: new google.maps.LatLng(marcadores[i][1], marcadores[i][2]),
                    title: marcadores[i][0],
                    map: map
                });
            }
        },
        
        connectAndSubscribe: function () {
            console.info('Connecting to WS...');
            var socket = new SockJS('/stompendpoint');
            stompClient = Stomp.over(socket);
            //subscribe to /topic/TOPICXX when connections succeed
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                ///topic/showMyFriendsConected
                stompClient.subscribe('/topic/showMyFriendsConected', function (eventbody) {
                    //conectados.push(eventbody);
                    console.log("Esta logeado y en inicio:"+estaLogueado);
                    console.log(estaEnInicio);
                    if(estaLogueado){
                        console.log("Agregar los amigos conectados de: " + eventbody);
                        module.crearTablaMisAmigosConectados(eventbody);
                        
                    }
                });
                
                stompClient.subscribe('/topic/showOnlineFriendsPosition', function (eventbody) {
                    //conectados.push(eventbody);
                    //module.newMarcador(JSON.parse(eventbody.body)[0],JSON.parse(eventbody.body)[1],JSON.parse(eventbody.body)[2]);
                    if(estaLogueado){
                        console.log(eventbody);
                        module.pintarPosiciones();
                    }
                });
               
                stompClient.subscribe('/topic/posibilidadDeReunion', function (eventbody) {
                    var nombregr;
                    if(estaLogueado){
                        
                        $.get("/eata/groups", function (data) {
                            
                            nombregr = data[JSON.parse(eventbody.body)].name;
                            console.log("nombre GR: "+ nombregr+" con id: "+JSON.parse(eventbody.body));
                            alert("Mas del 60% del grupo: "+nombregr+" esta en linea, puede crear una reunion");
                        });
                        
                    }
                });
                
                stompClient.subscribe('/topic/newgroup', function (eventbody) {
                    //conectados.push(eventbody);
                    //module.newMarcador(JSON.parse(eventbody.body)[0],JSON.parse(eventbody.body)[1],JSON.parse(eventbody.body)[2]);
                    if(estaLogueado){
                        module.traerMisGrupos();
                    }
                });
                
                stompClient.subscribe('/topic/cerrarsesion', function (eventbody) {
                        console.log("entro a cerrar sesion");
                    if(estaEnInicio){
                        module.crearTablaMisAmigosConectados(eventbody);
                        module.pintarPosiciones();
                    }
                });

            });
        },
        
        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            //setConnected(false);http://localhost:8080/
            console.log("Disconnected");
        },
        
        publishNewUserConected: function (carnet) {
            stompClient.send('/app/newuserconected', {}, carnet);
            
        },
        
        login: function (carnet, pass) {
            //var conectar = module.connectAndSubscribe();
            $.get("/eata/users/" + carnet, function (data) {
                            console.log(data.idUser);
                            if (data.idUser == carnet && data.password == pass) {    
                                estaLogueado=true;
                                name = data.name;
                                console.log(name + " :name en login");
                                idUser = data.idUser;
                                password = data.password;
                                mail = data.mail;
                                gender = data.gender;
                                $("#tituloContenido").empty();
                                $("#contenido").empty();
                                module.pagInicio();
                                module.publishNewUserConected(data.idUser);
                                module.traerMisGrupos();
                                }
                            else{
                                $("#formularioLogin").append("<p style='color:#FF0000';>Usuario o contraseña incorrectos o ya inicio sesion</p>");
                            }  
                        });
        },
        
        mostrarPerfilAmigo: function(carnet){
          module.limpiarTodoMenosPerfil();
          $.get("/eata/users/"+ carnet, function (data) {
                //$("#tituloContenido").append("");
                $("#contenido").append("<p style='text-align-last: center'>Nombre: "+data.name+"</p>\n\
                                        <p style='text-align-last: center'>\n\
                                        <img src='usuario.png'  style='height:106px;width:106px;' alt='Avatar'>\n\
                                        </p>\n\
                                        <p style='text-align-last: center'>Escuela Colombiana de Ingenieria</p>\n\
                                        <p style='text-align-last: center'>Email: "+data.mail+"</p><p style='text-align-last: center'>Carnet: "+data.idUser+"</p>\n\
                                        "
                    );
                
            });
            
          
          
        },
        
        funcionBotonInicio: function(){
          estaEnInicio = true;
          module.limpiarTodoMenosPerfil();
          module.traerMapa();
          module.botonesDiv();
          module.crearTablaMisAmigosConectados();
        },
        
        
        crearFormularioGrupo: function () {
            estaEnInicio = false; 
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
            
            var members = [idUser];
            var newId;
            var idGroup=$.get("/eata/groups", function (data) {
                newId = (data.length) + 1;
                console.log((data.length + 1) + " :data.lengyh");
            });

            console.log(document.getElementById("groupName").value);
            console.log(document.getElementById("groupDescription").value);
            idGroup.then(function(){
                var grupo=$.get("/eata/users/myfriends/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    console.log(document.getElementById(data[i].idUser).checked + " : " + data[i].name);
                    if (document.getElementById(data[i].idUser).checked) {
                        console.log("Entro a agregar un miembro" + data[i].idUser);
                        members.push(data[i].idUser);
                        console.log(members);
                    }

                }
                
            })
            console.log(members);
            
            grupo.then(function(){// "{"members":[2101751,2099444],"meetings":[1],"id":1,"name":"arsw trabajo","description":"Este grupo es para hacer lab de arsw"}";
                var newGroup = "{\"members\":" + JSON.stringify(members) + ",\"" + "\meetings\":[],\"" + "id\":" + newId + ",\"" + "name\":" + "\"" + document.getElementById("groupName").value + "\",\"" + "description\":" + "\"" + document.getElementById("groupDescription").value + "\"}";
                console.log(newGroup);
                var crear = $.ajax({
                    url: "/eata/addgroup",
                    type: 'POST',
                    data: newGroup,
                    contentType: "application/json"
                });
                crear.then(
                    function () {
                        stompClient.send('/topic/newgroup', {}, idUser);
                        module.pagInicio();

                    }

                );
                }
                        
                );
                
            
            });
            



            
            
        },
        
        cerrarSesion: function(){
            estaLogueado=false;
            estaEnInicio = false;
            stompClient.send('/app/cerrarsesion', {}, idUser);
            module.disconnect();
            module.init();
        },
        
        traerPerfil: function () {
            $("#perfil").append("<Button class='botonVolverInicio' type='button' onclick='module.funcionBotonInicio()'>Ir a Inicio</Button>\n\
                                        <h4 id='nameUser' style='text-align-last: center'  >" + name + "</h4>\n\
                                        <p >\n\
                                        <img src='usuario.png' style='height:106px;width:106px;' alt='Avatar'>\n\
                                        </p>\n\
                                        <p style='text-align-last: center'>Escuela Colombiana de Ingenieria</p>\n\
                                        <p style='text-align-last: center'>Email: "+mail+"</p><p style='text-align-last: center'>Carnet: "+idUser+"</p>\n\
                                        <hr>\n\
                                        <table id='tablaAmigos' >\n\
                                        <tr><th id='friends'>Mis Amigos</th></tr>\n\
                                        </table>\n\
                                        <hr>\n\
                                        <table id='tablaGrupos'  >\n\
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
            estaEnInicio = true;
            module.limpiarTodo();
            module.traerPerfil();
            module.traerMapa();
            module.traerMisAmigos();
            module.botonesDiv();
            module.crearTablaMisAmigosConectados();
            
            
        },
        
        crearTablaMisAmigosConectados: function () {
            if(estaEnInicio){
                $("#tablas").empty();
                $("#tablas").append("<h1>Amigos Conectados</h1>");
                $("#tablas").append("<table id='amigosConectadosId' class='miclase'>\n\
                                     <tr><th id='Nombre'>Amigos</th></tr>\n\
                                    </table>");

                $.get("/eata/usersconected/"+idUser, function (data) {
                    for (i = 0; i < data.length; i++) {
                        $("#amigosConectadosId").append("<tr><td>" + data[i].name + "</td></tr>");
                    }
                });
            }
        },
        
        pintarPosiciones: function () {
            
            $.get("/eata/usersconected/"+idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    console.log("GET lalalala: "+data);
                    module.newMarcador(data[i].name,data[i].location.latitude,data[i].location.longitude);
                }
            });
        },
        
        funcionBuscar:  function(){
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("tablaTodosUsuarios");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }       
  }
        },
        
        mostrarTodosUsuarios: function(){
            misAmigos.push(idUser);
            $.get("/eata/users/myfriends/"+idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    misAmigos.push(data[i].idUser);
                    console.log("Entro al primer GET");
                }     
            });
            module.mostrarTodosUsuariosContinuacion();
        },
        
        mostrarTodosUsuariosContinuacion: function(){
            module.limpiarTodoMenosPerfil();
            $("#tituloContenido").append("<h1>Todos los Usuarios</h1>");
            
            $("#contenido").append("<input type='text' id='myInput' onkeyup='module.funcionBuscar()' placeholder='Search for names..' title='Type in a name'>\n\
                                        <table id='tablaTodosUsuarios' >\n\
                                        <tr><th id='todosUsuarios'>Todos los Usuarios</th></tr>\n\
                                        </table>");
            

            $.get("/eata/users", function (data) {
                console.log("Arreglo amigos: "+misAmigos);
                for (i = 0; i < data.length; i++) {
                    var algo = misAmigos.includes(data[i].idUser);
                    
                    if(misAmigos.includes(data[i].idUser)){
                        if (data[i].idUser != idUser) {
                            $("#tablaTodosUsuarios").append("<tr><td>" + data[i].name + "</td><td><button class='botonAmigos' onclick=\"module.mostrarPerfilAmigo("+data[i].idUser+")\">Ver</button></td></tr>");
                        }
                    }
                    else{
                        $("#tablaTodosUsuarios").append("<tr><td>" + data[i].name + "</td><td><button class='botonAgregar' onclick=\"module.agregarAmigo("+data[i].idUser+")\">Agregar</button></td></tr>");
                    }
                    
                    
                }
            });

                    
           
            
            
        },
        
        agregarAmigo: function(){
            
        },
        
        botonesDiv: function () {
            $("#botones").empty();
            $("#botones").append("<button type='button' onclick=\"module.crearFormularioGrupo()\">Crear Grupo</button>");
            $("#botones").append("<button type='button' onclick=\"module.mostrarTodosUsuarios()\">Agregar Amigos</button>");
            $("#botones").append("<button class='cancelbtn' type='button' onclick=\"module.cerrarSesion()\">Cerrar Sesion</button>");
        },
        
        traerMapa: function () {
            $("#tituloContenido").append("<h1>Amigos cercanos:</h1>");
            module.getLocation();
        },
        traerMisAmigos: function () {
            $.get("/eata/users/myfriends/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    $("#tablaAmigos").append("<tr><td>" + data[i].name + "</td>\n\
                                                <td><button class='botonAmigos' onclick=\"module.mostrarPerfilAmigo("+data[i].idUser+")\">Ver</button>\n\
                                                  </td>\n\
                                                </tr>");

                }

            });
        },
        traerMisGrupos: function () {
            $("#tablaGrupos").empty();
            $.get("/eata/users/mygroups/" + idUser, function (data) {
                $("#tablaGrupos").append("<tr><th id='grupos'>Mis Grupos</th></tr>");
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
            marcadores = [];
            var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            console.log("Latitude: " + position.coords.latitude +
                    " Longitude: " + position.coords.longitude);
            map = new google.maps.Map(document.getElementById("contenido"), mapOptions);
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(JSON.stringify([name,position.coords.latitude,position.coords.longitude ]));
            stompClient.send('/app/newuserposition',{},JSON.stringify([idUser,position.coords.latitude,position.coords.longitude]));
            module.newMarcador(name,position.coords.latitude,position.coords.longitude );
        }

    }



})();
