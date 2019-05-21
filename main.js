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
      }
   },500);
   console.log(array);
   var pG = window.setTimeout(playGame(array),1000);
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
   var startTime = new Date();
   
}