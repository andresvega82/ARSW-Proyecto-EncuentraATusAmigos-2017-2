/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var loginJs = (function () {
    
    
    var name;
    var idUser;
    var password;
    var mail;
    var gender;
    var estaLogeado = false;

    var url = "http://arsw-proyecto-2017-2.herokuapp.com";
    //var url = "http://localhost:8080";
    
    return{
        
         login:function(idUser,password){
             console.log(idUser);
          $.get("/eata/users/" + idUser, function (data) {
                console.log(data.idUser);
                if (data.idUser == idUser && data.password == password) {
                    
                    name = data.name;
                    console.log(name+" :name en login");
                    idUser = data.idUser;
                    password = data.password;
                    mail = data.mail;
                    gender = data.gender;
                    estaLogeado = true;
                    
                    loginJs.redireccionAinicio();
              }
          });
        },
        redireccionAinicio: function(){
            
            if(estaLogeado){
                window.location=url+"/inicio.html";
                
            }
            
            
        },
        
        getName: function(){
          return name;  
        },
    }
    
})();
