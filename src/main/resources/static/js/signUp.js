/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 
var signUpJs = (function () {
    var x = document.getElementById("demo");
    var y = document.getElementById("demo");
    var name;
    var idUser;
    var password;
    var mail;
    var gender;
    var estaLogeado = false;

    var url = "http://arsw-proyecto-2017-2.herokuapp.com";
    //var url = "http://localhost:8080";
    
    return{
        
        redireccionAinicio: function(){
            
            if(estaLogeado){
                window.location=url+"/inicio.html";
                
            }
            
            
        },
        
        signUp : function(nam,passwor,mai,gende,idUs){
          
          name=nam;
          password= passwor;   
          mail=mai;
          gender=gende;
          idUser=idUs;
          signUpJs.createUser();
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
                    signUpJs.redireccionAinicio();
                   
               }
                       
            );
       },
    }
    
})();
