/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module = (function () {
    
    var x = document.getElementById("demo");
    var name;
    var document;
    var password;
    var mail;
    var gender;
    
    return{
       singUp : function(name,password,mail,gender){
           $("#singUp").empty();
           $("#singUp").append("<label>Name:</label><input id='nameNewUser' type='text' size='50' maxlength='30' value='' name='name'>");
           $("#singUp").append("<label>Document:</label><input id='documentUser' type='text' size='50' maxlength='30' value='' document='document'>");
           $("#singUp").append("<label>Password:</label><input id='passworUser' type='text' size='50' maxlength='30' value='' password='password'>");
           $("#singUp").append("<label>Mail:</label><input id='mailUser' type='text' size='50' maxlength='30' value='' mail='mail'>");
           $("#singUp").append("<label>Gender:</label><input id='genderUser' type='text' size='50' maxlength='30' value='' gender='gender'>");
           $("#singUp").append("<button id='botsingUp' style='background-color:crimson' class='btn btn-primary' type = 'button' onclick='module.createUser()'>Sing Up</button>");
            
        },
       createUser:function(){
           document.getElementById("nameNewUSer").innerHTML= "The user "+name+" has been successfully created";
           //[{"document":2090540,"password":"1234","friends":[],"mail":"aaaa@mail.com","gender":"macho","freeHours":null,"name":"Jairo Gonzalez"}
          // "{\"author\":"+"\""+nombre+"\","+"\"points\":"+JSON.stringify(puntosActuales)+",\""+"name\":"+"\""+nombrePlano+"\""+"}";
           var newUSer = "{\"document\":"+"\""+document+"\","+"\"friends\":"+"\""+[]+"\",\""+"mail\":"+"\""+mail+"\",\""+"gender\":"+"\""+gender+"\",\""+"freeHours\":"+"\""+null+"\",\""+"name\":"+"\""+name+"\""+"}";
           var crear=$.ajax({
                url: "/users",
                type: 'PUT',
                data: nuevo,
                contentType: "application/json"
            });
            crear.then(
               function(){
                   getBlueprintsByAuthor();
               },
               function(){
                   alert("No se pudo Actualizar");
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
