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
    var misAmigos = [];
    var estaLogueado = false;
    var estaEnInicio = false;
    var estaEnInfoGrupo= [false,null];
    
     
    
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
            
            marcadores.push([markerName, lat, long]);
            var marker, i;
            
            for (i = 0; i < marcadores.length; i++) {
                //--------------------------
                var x1 = new google.maps.LatLng(lat, long);
                var x2 = new google.maps.LatLng(marcadores[i][1], marcadores[i][2]);
                var distancia = google.maps.geometry.spherical.computeDistanceBetween(x1, x2);
                console.log("Distancia entre yo y el nuevo conectado: "+distancia);
                //---------------------------
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
              
                    if(estaLogueado){
                        module.crearTablaMisAmigosConectados(eventbody);
                        
                    }
                });
                
                stompClient.subscribe('/topic/showOnlineFriendsPosition', function (eventbody) {
                    //conectados.push(eventbody);
                    //module.newMarcador(JSON.parse(eventbody.body)[0],JSON.parse(eventbody.body)[1],JSON.parse(eventbody.body)[2]);
                    if(estaLogueado){
  
                        module.pintarPosiciones();
                    }
                });
               
                stompClient.subscribe('/topic/posibilidadDeReunion', function (eventbody) {
                    var valido = false;
                    if(estaLogueado){
                        var promise = $.get("/eata/perteceneAlGrupo/"+idUser+"/"+JSON.parse(eventbody.body), function (data) {
                           valido = data;
                        });
                        promise.then(function(){
                            if(valido){
                                $.get("/eata/groups/detail/" + JSON.parse(eventbody.body), function (data) {

                                    $("#textoModalCrearReunion").empty();
                                    $("#textoModalCrearReunion").append("Mas del 60% del grupo: <h1>" + data.name + "</h1> esta en linea.");
                                    var modal = document.getElementById('myModal');
                                    var btnCrearReunion = document.getElementById("botonCrearReunion");
                                    var span = document.getElementsByClassName("close")[0];
                                    modal.style.display = "block";
                                    span.onclick = function () {
                                        modal.style.display = "none";
                                    }
                                    btnCrearReunion.onclick = function () {
                                        modal.style.display = "none";
                                        module.crearFormularioReuniones(data.id);
                                    }
                                });
                            }
                            
                        });
                        
                        
                    }
                });
                
                stompClient.subscribe('/topic/newgroup', function (eventbody) {
                    if(estaLogueado){
                        module.traerMisGrupos();
                    }
                });
                
                stompClient.subscribe('/topic/newmetting', function (eventbody) {
                    
                    if(estaEnInfoGrupo[0] && estaEnInfoGrupo[1]==JSON.parse(eventbody.body)){
                        module.mostrarInfoGrupo(JSON.parse(eventbody.body));
                    }
                });
                
                
                stompClient.subscribe('/topic/notificacionUrgente', function (eventbody) {
                    var valido = false;
                    if(estaLogueado){
                        var promise = $.get("/eata/perteceneAlGrupo/"+idUser+"/"+JSON.parse(eventbody.body), function (data) {
                           valido = data;
                        });
                        
                        promise.then(function(){
                            if(valido) {
                                $.get("/eata/groups/detail/" + JSON.parse(eventbody.body), function (data) {

                                    $("#textoModalCrearReunion").empty();
                                    $("#textoModalCrearReunion").append("NOTIFICACION URGENTE !!! de: <h1>" + data.name + "</h1>");
                                    var modal = document.getElementById('myModal');
                                    document.getElementById("botonCrearReunion").innerHTML = "Ver reuniones del Grupo";
                                    var btnCrearReunion = document.getElementById("botonCrearReunion");
                                    var span = document.getElementsByClassName("close")[0];

                                    modal.style.display = "block";
                                    span.onclick = function () {
                                        modal.style.display = "none";
                                    }
                                    btnCrearReunion.onclick = function () {
                                        modal.style.display = "none";
                                        module.mostrarInfoGrupo(JSON.parse(eventbody.body));
                                    }
                                });
                            }
                            
                        });
                        
                        
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
                            
                            if (data.idUser == carnet && data.password == pass) {    
                                estaLogueado=true;
                                name = data.name;
                                
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
          estaEnInicio = false;
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
                                  <button type='button' class='cancelbtn' onclick=\"module.irAInicioDesdeReunion()\">Cancelar</button>");

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
               
            });

            
            idGroup.then(function(){
                var grupo=$.get("/eata/users/myfriends/" + idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    
                    if (document.getElementById(data[i].idUser).checked) {
                        
                        members.push(data[i].idUser);
                        
                    }

                }
                
            })
          
            
            grupo.then(function(){// "{"members":[2101751,2099444],"meetings":[1],"id":1,"name":"arsw trabajo","description":"Este grupo es para hacer lab de arsw"}";
                var newGroup = "{\"members\":" + JSON.stringify(members) + ",\"" + "\meetings\":[],\"" + "id\":" + newId + ",\"" + "name\":" + "\"" + document.getElementById("groupName").value + "\",\"" + "description\":" + "\"" + document.getElementById("groupDescription").value + "\"}";
               
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
        
        irAInicioDesdeReunion: function(){
            module.traerMisGrupos();
            module.pagInicio();
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
            estaEnInicio = false;
            misAmigos = [];
            misAmigos.push(idUser);
            module.limpiarTodoMenosPerfil();
            
            var promise1 = $.get("/eata/users/myfriends/"+idUser, function (data) {
                for (i = 0; i < data.length; i++) {
                    misAmigos.push(data[i].idUser);
                }     
            });
            
            $("#tituloContenido").append("<h1>Todos los Usuarios</h1>");
            
            $("#contenido").append("<input type='text' id='myInput' onkeyup='module.funcionBuscar()' placeholder='Search for names..' title='Type in a name'>\n\
                                        <table id='tablaTodosUsuarios' >\n\
                                        <tr><th id='todosUsuarios'>Todos los Usuarios</th></tr>\n\
                                        </table>");

            promise1.then(
                    function () {

                        $.get("/eata/users", function (data) {
                            for (i = 0; i < data.length; i++) {
                                var algo = misAmigos.includes(data[i].idUser);

                                if (misAmigos.includes(data[i].idUser)) {
                                    if (data[i].idUser != idUser) {
                                        $("#tablaTodosUsuarios").append("<tr><td>" + data[i].name + "</td><td><button class='botonAmigos' onclick=\"module.mostrarPerfilAmigo(" + data[i].idUser + ")\">Ver</button></td></tr>");
                                    }
                                } else {
                                    $("#tablaTodosUsuarios").append("<tr><td>" + data[i].name + "</td><td><button class='botonAgregar' onclick=\"module.agregarAmigo(" + data[i].idUser + ")\">Agregar</button></td></tr>");
                                }
                            }
                        });

                    },
                    function(){
                        
                    }

            );            
        },
        
        agregarAmigo: function(){
            
        },
        
        botonesDiv: function () {
            $("#botones").empty();
            $("#botones").append("<button type='button' onclick=\"module.crearFormularioGrupo()\">Crear Grupo</button>");
            $("#botones").append("<button type='button' onclick=\"module.mostrarTodosUsuarios()\">Agregar Amigos</button>");            
            $("#botones").append("<button class='cancelbtn' type='button' onclick=\"module.cerrarSesion()\">Cerrar Sesion</button>");
        },
        
        crearFormularioReuniones: function(idGroup){
            estaEnInicio = false;
            module.limpiarTodoMenosPerfil();
            //$("#contenido").append("<h1>Hacer el formulario y metodo para crear reuniones aqui (buscar metodo: crearFormularioReuniones)</h1>");
            $("#tituloContenido").append("<h1>Crear Reunión</h1>");
            $("#contenido").append("<form action='/action_page.php'>\n\
                                        <div class='container'>\n\
                                          <label><b>Name</b></label>\n\
                                          <input id='meetingName' type='text' placeholder='Enter name of the meeting'  required>\n\
                                          <label><b>Date</b></label>\n\
                                          <input type='date' id='fecha' placeholder = 'aaaa/mm/dd' required>\n\
                                          <label><b>Description</b></label>\n\
                                          <input id='meetingDescription' type='text' placeholder='Enter description of the meeting'  required>\n\
                                        </div>\n\
                                 </form>");
            $("#botones").append("<button class='button' type='button' onclick=\"module.enviarNotificacionUrgente("+idGroup+")\">Crear con Notificacion</button>");
            $("#botones").append("<button type='button' onclick=\"module.crearReunion("+idGroup+")\">Crear Reunion</button>\n\
                                  <button type='button' class='cancelbtn' onclick=\"module.irAInicioDesdeReunion()\">Cancelar</button>");
            

                      
            
        },
        crearReunion: function(idGroup){            
            var newId;
            var idMeeting=$.get("/eata/meetings/", function (data) {
                newId = (data.length) + 1;
               
            });
                 
            
            idMeeting.then(function(){// "{"members":[2101751,2099444],"meetings":[1],"id":1,"name":"arsw trabajo","description":"Este grupo es para hacer lab de arsw"}";
                var newMeeting = "{\"id\":" + newId + ",\"" + "\date\":\""+document.getElementById("fecha").value+"\",\""+"subject\":\"" + document.getElementById("meetingName").value + "\",\"" + "description\":" + "\"" + document.getElementById("meetingDescription").value + "\"}";
                console.log(newMeeting);
                var crear = $.ajax({
                    url: "/eata/addmeeting",
                    type: 'POST',
                    data: newMeeting,
                    contentType: "application/json"
                });
                crear.then(
                    
                    function () {
                        stompClient.send('/app/addmeetingbygroup',{},JSON.stringify([newId,idGroup]));
                        estaEnInfoGrupo=[true,idGroup];
                        stompClient.send('/topic/newmetting',{},idGroup);
                    }
                );
                }); 
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
                    $("#tablaGrupos").append("<tr><td>" + data[i].name + "</td>\n\
                                                <td><button class='botonAmigos' onclick=\"module.mostrarInfoGrupo("+data[i].id+")\">Ver</button>\n\
                                                  </td>\n\
                                                </tr>");

                }

            });
        },
        
        mostrarInfoGrupo: function(idGroup){
            estaEnInicio=false;
            estaEnInfoGrupo=[true,idGroup];
            
            module.limpiarTodoMenosPerfil();
            var promise1 = $.get("/eata/groups/detail/" + idGroup, function (data) {
                $("#tituloContenido").append("<h1>"+data.name+"</h1>");
                $("#contenido").append(data.description+"<hr>");
                
            });
            
            promise1.then(function(){
                $.get("/eata/groups/meeting/" + idGroup, function (data) {

                    $("#contenido").append("<table id='Reuniones'>\n\
                                 <tr><th id='idReunion'>Meetings</th><th id='descripcion'>Description</th><th id='date'>Date</th></tr>\n\
                                </table>");
                    for (i = 0; i < data.length; i++) {
                        console.log(data[i].subject+" Nombre de reunion");
                        $("#Reuniones").append("<tr><td>" + data[i].subject+ "</td><td>" + data[i].description + "</td><td>" + data[i].date + "</td></tr>");
                    }

                })
                
            }); 
            
            
            
            $("#botones").append("<button class='button' type='button' onclick=\"module.crearFormularioReuniones("+idGroup+")\">Crear Reunion</button>");

        },
        
        enviarNotificacionUrgente: function(idGroup){
            var newId;
            var idMeeting = $.get("/eata/meetings/", function (data) {
                newId = (data.length) + 1;

            });


            idMeeting.then(function () {// "{"members":[2101751,2099444],"meetings":[1],"id":1,"name":"arsw trabajo","description":"Este grupo es para hacer lab de arsw"}";
                var newMeeting = "{\"id\":" + newId + ",\"" + "\date\":\"" + document.getElementById("fecha").value + "\",\"" + "subject\":\"" + document.getElementById("meetingName").value + "\",\"" + "description\":" + "\"" + document.getElementById("meetingDescription").value + "\"}";
                console.log(newMeeting);
                var crear = $.ajax({
                    url: "/eata/addmeeting",
                    type: 'POST',
                    data: newMeeting,
                    contentType: "application/json"
                });
                crear.then(
                        function () {
                            stompClient.send('/app/addmeetingbygroup', {}, JSON.stringify([newId, idGroup]));

                            estaEnInfoGrupo = [true, idGroup];
                            stompClient.send('/topic/newmetting', {}, idGroup);
                        }
                );
            }); 
            stompClient.send('/topic/notificacionUrgente',{},idGroup);
            
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
            
            map = new google.maps.Map(document.getElementById("contenido"), mapOptions);
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            lat = position.coords.latitude;
            long = position.coords.longitude;
            
            
            
            
            
            stompClient.send('/app/newuserposition',{},JSON.stringify([idUser,position.coords.latitude,position.coords.longitude]));
            module.newMarcador(name,position.coords.latitude,position.coords.longitude );
        }

    }



})();
