        function changeImage(number){
        im = document.getElementById('image');
        switch(number){
            case 0:
                im.src = "./egg/egg-yellow5.png";
                break;
            case 1:
                im.src = "./egg/egg-yellow4.png";
                break;
            case 2:
                im.src = "./egg/egg-yellow3.png";
                break;
            case 3:
                im.src = "./egg/egg-yellow2.png";
                break;
            case 4:
                im.src = "./egg/egg-yellow1.png";
                break;
            case 5:
                im.src = "./egg/egg-yellow.png";
                break;
            case 6:

                im.src = "./egg/hatching_cow.gif";
                var html = [];
html.push('<h1 style="background-color: #B5E8E8 ;">Congratulations!</h1>');
var target = document.getElementById('uniqueTargetID');
target.innerHTML = html.join('');
target.style.display = 'block';
//target.style.display = 'black_overlay';

                break;
        }
        }
        
           function getAccessToken(unique_id,firstname,lastname) {
                 var timestamp = new Date().getTime();
                 $.ajax({
                     type: 'POST',
                     url: 'https://apisandbox.moxtra.com/oauth/token',
                     data: 'client_id=jVvRPHlk5nQ&client_secret=h4HCfKL9mqc&grant_type=http://www.moxtra.com/auth_uniqueid&uniqueid='+unique_id+'&lastname='+lastname+'&firstname='+firstname+'&timestamp='+timestamp,
                     contentType: 'application/x-www-form-urlencoded',
                     success: function(data){
                         response = JSON.stringify(data);
                         var obj = JSON.parse(response);
                         var access_t = (obj.access_token);
                         console.log(access_t);
                         // console.log(response);
                         initializeUser(access_t);

                     }
                 });
             }
            
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
            }
            function parseURI() {
                var uri = window.location.hash.substring(1);
                var elements = uri.split('&');
                var data = new Object();
                for(i = 0; i < elements.length; i++) {
                    var cur = elements[i].split('=');
                    data[cur[0]] = cur[1];
                }
                return data;
            }
            urldata = parseURI();
            uid=urldata.uid;
            fname=urldata.fname;
            lname=urldata.lname;
             access_token=getAccessToken(uid,fname,lname);//'4zMgAAAVCaymINAACowFViYlplVE52OWZURjJlZDZick51dGYzIAAAAANUdHNDeWFmTmxuUERxOTVEZUxSV1BSQmpWdlJQSGxrNW5R';//getAccessToken("u001");
             console.log(access_token);
            function initializeUser(access_token){
                 var options = {
                     mode: "sandbox", 
                     client_id: "jVvRPHlk5nQ", //
                     access_token: access_token,
                     invalid_token: function(event) {
                         //Triggered when the access token is expired or invalid
                         alert("Access Token expired for session id: " + event.session_id);
                     }
                 };
                 Moxtra.init(options);
            }
       
         function start_chat () {            
             var chat_options = {
                 //unique id of the users who will be part of the chat. These users should alrea1,  
                 //unique_id: "u001,u002,u003,u004",  
                 binder_id: "Bhc23AXAtysKo19a5hv4Iy5",
                 iframe: true,
                 //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                 tagid4iframe: "chat",
                 iframewidth: "100%",
                 iframeheight: "100%",                
                 //autostart_meet: true,
                 //autostart_note: true,
                 extension: { "show_dialogs": { "member_invite": true } },
                 start_chat: function(event) {
                     console.log("Chat started binder ID: " + event.binder_id);
                     //Your application server can upload files to draw using the binder_id and access_token
                 },
                 start_meet: function(event) {
                     console.log("Meet started session key: " + event.session_key + " session id: " + event.session_id);
                 },
                 end_meet: function(event) {
                     console.log("Meet end event");
                 },
                 invite_member: function(event) {
                     console.log("Invite member into binder Id: " + event.binder_id);
                 },
                 request_note: function(event) {
                     console.log("Note start request");
                 },
                 error: function(event) {
                     console.log("Chat error code: " + event.error_code + " error message: " + event.error_message);
                 }
             };            
             Moxtra.chat(chat_options);
         }

        // function start_timeline(){
        //     var options = {
        //         iframe: true,
        //         tagid4iframe: "timeline",
        //         iframewidth: "350px",
        //         iframeheight: "650px",
        //         start_timeline: function(event) {
        //             alert("TimelineView started session Id: " + event.session_id);
        //         },
        //         request_view_binder: function(event) {
        //             alert("Request to view binder Id " + event.binder_id);
        //         },
        //         error: function(event) {
        //             alert("TimelineView error code: " + event.error_code + " error message: " + event.error_message);
        //         }
        //     };

        //     Moxtra.timelineView(options);
        //     //start_timeline();
        // }
        // //start_timeline(); 

        //var dataRef = new Firebase('https://blinding-heat-908.firebaseio.com/TName');
        var currDate;
        window.onload = function(){
            $('#addToList').hide();
            //$('#pickDate').hide();
            

            $('#addTaskButton').click(function(){
                console.log('add button clicked');
                var item = document.getElementById('listItem').value;
                console.log(item);
                makeCheckListItemStr(item);
                

                //adding item to firebase
                var dateDB = new Firebase('https://blinding-heat-908.firebaseio.com/TName/Dates/' + currDate);
                //var dateTab = dataRef.child('TName').child('Dates').child();
                //console.log(dateTab.value('Person 1'));
               

                dateDB.push({'name': item, 'done': 'no'});
                console.log('should be pushed');
            });

            // $('.chck').click(function(){
            //     console.log('got checked');
            //     var DB = new Firebase('https://blinding-heat-908.firebaseio.com/TName/Dates/' + currDate);
            //     DB.on('value', function(snapshot){
            //         var data = snapshot.val();
            //         console.log($(this).value);
            //         DB.orderBy('name').equalTo($(this).value).on('value', function(snapshot){
            //             console.log(snapshot);
            //         });
            //     });
            // });
            $('.chck').click(function(){
                console.log('plz');
            });
        }



            var DB = new Firebase('https://blinding-heat-908.firebaseio.com/TName/Dates');
            function makeCheckListItem(obj){
                //console.log(obj.name);
                var label = document.createElement('label');
                label.htmlFor = "id";
                label.appendChild(document.createTextNode(obj.name));
                var taskItem = document.createElement('input');
                taskItem.type = 'checkbox';
                taskItem.setAttribute('class', 'chck');
                var br = document.createElement('br');

                var str = '';
                if(obj.done == 'yes'){
                       console.log('should be checked');
                       str = '<input type="checkbox" onchange="check(\'' + obj.name + '\')" checked><label for="id">' + obj.name + '</label><br>';
                }
                else
                    str = '<input type="checkbox" onchange="check(\'' + obj.name + '\')"><label for="id">' + obj.name + '</label><br>';
                console.log(str);
                    
                    // document.getElementById('list').appendChild(taskItem);
                    // document.getElementById('list').appendChild(label);
                    // document.getElementById('list').appendChild(br);

                $('#list').append(str);

               

            }
            function check(name){
                //console.log($(this).value);
                    console.log(name);
                    
                    var DB = new Firebase('https://blinding-heat-908.firebaseio.com/TName/Dates/' + currDate);
                    var bDB = new Firebase('https://blinding-heat-908.firebaseio.com/TName/Dates');
                    //console.log('made database');
                    DB.once('value', function(snapshot){


                        snapshot.forEach(function(childSnapshot){
                            //console.log(childSnapshot);
                            if(childSnapshot.val().name == name){


                                DB.child(childSnapshot.key()).update({done: 'yes'});
                                bDB.once('value', function(snapshot){
                                    var num = snapshot.val().Total + 1;
                                    changeImage(num);

                                    bDB.update({
                                        "Total": num
                                    });
                                });
                            }
                                //console.log(childSnapshot.val().done);
                                //childSnapshot.child('done').set('yes');
                                //childSnapshot.set({done: 'yes'});
                                //console.log(childSnapshot.child('done'));
                            //}
                            
                        });
                        console.log(snapshot);
                    });
                    //console.log('checked');
                    // DB.once('value', function(snapshot){
                    //     console.log('****' + snapshot.val().Total);
                    //     var num = snapshot.val().Total + 1;
                    //     console.log(num);
                    //     DB.update({
                    //         "Total": num
                    //     });
                    // //console.log(snapshot.val().Total);
                    // });    
                  
            }

            function makeCheckListItemStr(name){
                var taskItem = document.createElement("input");
                taskItem.type = "checkbox";
                //taskItem.checked = "false";
                var label = document.createElement('label');
                label.htmlFor = "id";
                label.appendChild(document.createTextNode(name));
                var br = document.createElement('br');

                //adding item to front end
                document.getElementById('list').appendChild(taskItem);
                document.getElementById('list').appendChild(label);
                document.getElementById('list').appendChild(br);

                
            }

            var dateIDs = ['Date1', 'Date2', 'Date3', 'Date4'];

            function showList(date){
                currDate = date;
                $('#addToList').show();
                $('#pickDate').hide();
                for(var i = 0; i < dateIDs.length; i++){
                    if(dateIDs[i] == date)
                        $('#' + date).addClass('active');
                    else
                        $('#' + dateIDs[i]).removeClass('active');
                }
                
                console.log('showing list of ' + date);
                document.getElementById('list').innerHTML = '';
                var dateDB = new Firebase('https://blinding-heat-908.firebaseio.com/TName/Dates/' + date);
                console.log('set up firebase');
                dateDB.once('value', function(snapshot){
                    snapshot.forEach(function(child){
                        console.log(child.val());
                        //console.log(makeCheckListItem(child.val()));
                        if(child.val() != -1)
                            makeCheckListItem(child.val());
                    });
                });
            }

     