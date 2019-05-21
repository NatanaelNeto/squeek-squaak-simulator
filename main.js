var squeek = new Howl({
   src: ['sounds/squeek.mp3'],
   volume: 1
});
var squaak = new Howl({
   src: ['sounds/squaak.mp3'],
   volume: 1
});
var btnStart = document.getElementById("start");
var isStart = false;

btnStart.onclick = function(){
   
   var loopSound = document.getElementById("levelDiff").value;
   var x = 0;
   var array = new Array(loopSound);
   var timeEcho = loopSound*500;
   var interval = window.setInterval(function(){
      
      array[x] = playSound();
      if(++x == loopSound){
         window.clearInterval(interval);
         window.setTimeout(function(){
            playGame(array);
         },1000);
      }
   },500);
   console.log(array);
};

function playSound(){
   var x = Math.floor(Math.random()*2);
   x == 0 ? squeek.play() : squaak.play();
   return x;
}

function playOff(){
   if(!isStart){
      if(event.keyCode === 65){
         squeek.play();
      }else if(event.keyCode === 76){
         squaak.play();
      }
   }
}

function playGame(array){
   console.log("playGame: " + array);
   var x = 0;
   var concluido = false;
   var init,end;
   init = new Date();
   document.addEventListener('keyup',(event) =>{
      if(!concluido){
         if(x === array.length-1){
            if((event.keyCode === 65 && array[x] === 0)||(event.keyCode === 76 && array[x] === 1)){
               console.log("concluido");
               concluido = true;
               end = new Date();
               console.log(Math.floor((end-init)/array.length));
            }else{
               x=0;
               console.log(x);
            }
         }else if(event.keyCode === 65 && array[x] === 0){
            x++;
            console.log(x);
         }else if(event.keyCode === 76 && array[x] === 1){
            x++;
            console.log(x);
         }else{
            x=0;
            console.log(x);
         }
      }else{
         return
      }
   });
}