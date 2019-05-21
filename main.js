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
   var texto = document.getElementById("startSpan");
   texto.style.backgroundColor = "#C71606";
   texto.innerHTML = "COMEÇOU!";
   init = new Date();
   document.addEventListener('keyup',(event) =>{
      if(!concluido){
         if(x === array.length-1){
            if((event.keyCode === 65 && array[x] === 0)||(event.keyCode === 76 && array[x] === 1)){
               console.log("concluido");
               texto.innerHTML = "CONCLUÍDO!";
               texto.style.backgroundColor = "rgba(0,0,0,0)";
               concluido = true;
               end = new Date();
               calculateMedia(init,end,array.length);
            }else{
               x=0;
               texto.innerHTML = "ERRADO!";
               console.log(x);
            }
         }else if(event.keyCode === 65 && array[x] === 0){
            x++;
            texto.innerHTML = "CERTO";
            console.log(x);
         }else if(event.keyCode === 76 && array[x] === 1){
            x++;
            texto.innerHTML = "CERTO";
            console.log(x);
         }else{
            x=0;
            texto.innerHTML = "ERRADO!";
            console.log(x);
         }
      }else{
         return
      }
   });
}

function calculateMedia(a,b,c){
   var media = Math.floor((b-a)/c);
   var result = document.getElementById("result");
   if(media < 400){
      result.style.color = "#C71606";
      result.innerHTML = "Muito rápido! Seu resultado foi: " + media + "ms para 500ms";
   }else if(media >= 400 && media < 480){
      result.style.color = "#c7c706";
      result.innerHTML = "Bom, mas pode melhorar indo mais devagar. Seu resultado foi: " + media + "ms para 500ms";
   }else if(media >= 480 && media < 520){
      result.style.color = "#06c706";
      result.innerHTML = "Muito bom! Você acertou o ritmo! Seu resultado foi: " + media + "ms para 500ms";
   }else if(media >= 520 && media < 600){
      result.style.color = "#C71606";
      result.innerHTML = "Muito lento! Seu resultado foi: " + media + "ms para 500ms";
   }
}