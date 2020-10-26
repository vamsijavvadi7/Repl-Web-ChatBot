
var user_input=document.getElementById("input")

output("p","bot","Welcome to movie info bot.<br> Say Hi to start the conversation.....");



user_input.addEventListener("click",function loadDoc() {
  var xhttp = new XMLHttpRequest();
  try{
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
    let data= JSON.parse(this.responseText);
    var msg=document.getElementById("inp").value;
    
    document.getElementById("inp").value="";
   

    
    output("p","user",msg);
     

    
    if(msg.includes("Hi") || msg.includes("hi"))
    {
      output("p","bot",time_Of_The_Day()+","+Greeting()+"<br>"+data["menu"]);
    }
    else if(msg.length==1)
    {
    
//info for what input the user must give based on the input given by the user, the bot performs that
      if(data[msg])
      {output("p","bot",data[msg]);
      if(msg=="3")
        output("p","bot","Say hi to restart the bot");
        }
     else
      output("p","bot","Plz select from [1-3]");

    }
    else if(msg.includes("expression")){
    evaluator(msg.split(":")[1]);
    output("p","bot",data['menu']);
    }

    else if(msg.includes("movie")){
    movie_Info(msg.split("movie")[1].trim());

    }
    else
    output("p","bot","Sorry I didnt get that");
  
   if(msg==" ")
   output("p","bot","Plz enter some text");

    
  }
 

 };

  xhttp.open("GET", "file.json", true);
  xhttp.send();
  }
  catch(e){
    output("p","bot","Sorry I didnt get that");
  }
}


);



//This function creates and add elements to main page
function output(tag,className,text){


let main= document.getElementById("main")
if(className=="bot"){

main.innerHTML+=`<img class="bot_image" 
 src="https://image.shutterstock.com/image-vector/bot-icon-chatbot-cute-smiling-260nw-715418281.jpg">`;
}
if(className=="user")
main.innerHTML+=`<img  class="user_image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png">`;




 main.innerHTML+=`<${tag} class=${className}>${text}</${tag}>`
}





function Greeting(){
    //a list of responses from bot
    res=["Nice to see you.I can help you do some calulations and you can know information about a movie",
    "Its wonderful to see to you.Iam a chat bot,I have 2 special features.I can help you do some calulations and you can know information about a movie"];
    //to select a response at random and to return that
    
    return res[Math.floor((Math.random() * res.length) + 1)-1];
}

//greets the person based on the time of the day
function time_Of_The_Day(){

  let now = new Date();
    let current_time=now.getHours();
    let time_Greeting="Good Morning"
    if (current_time>21)
        time_Greeting="Good Night"
    else if(current_time>16)
        time_Greeting="Good Evening"
    else if(current_time>=12)
        time_Greeting="Good AfterNoon"
    
    return time_Greeting;
}



function evaluator(expression){

    
    try{
        output("p","bot","Result of the expression:"+eval(expression)); 
    }
    catch(e){
       output("p","bot","Enter a valid expression"); 
    }
        
}







//gives the information based on movie name
function movie_Info(movie){
var request = new XMLHttpRequest()

request.open('GET',`https://www.omdbapi.com/?t=${movie}&apikey=6637725e`, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(data.Response);
try{
  if(data.Response=="True"){

output("p","bot","imdbRating:"+data["imdbRating"]+"<br>"+"Runtime :"+data["Runtime"]+"<br>"
+"Actors :"+data["Actors"]+"<br>"
+"Director :"+data["Director"]+"<br>"
+"Plot :"+data["Plot"]);

output("p","movie_image","<img src="+data.Poster+">");

  }
  else {
    output("p","bot","Sorry we could not find the movie");
    
    
  }
  output("p","bot","1.Calculate an expression<br>2.Know about a Movie<br>3.End this chat<br>Enter a number from [1-3]");
  }
  catch(error){
output("p","bot","Sorry we could not find the movie");
  }
}

request.send()
}
