let birdsSrcs = ["bird1.gif", "bird2.gif", "bird3.gif"];
let count=0;
let numberbirds=0;
let allBirds = [];
let bombedBirdes = [];
let shootedbirds=[];



const moveRight=function(bird, left, top)
{
  let id = setInterval(function() {
    left += 10;

    if (left < (innerWidth - bird.width)) {
        bird.style.left = left + "px";
    } else {
        clearInterval(id);
        let index = allBirds.indexOf(bird);
        allBirds.splice(index, 1);
        bird.remove();
    }
}, 100);

}

const moveLeft=function(imageObject,left)
{
  let id=setInterval(function(){
    left-=10;
    if(left>=0)
    imageObject.style.left=left+"px";
    else{
      clearInterval(id);
      imageObject.classList.remove("flip");
      moveRight(imageObject,left);
    }


  },50);
}
$('.column').remove()


const createBird = () => {
  
  let bird = document.createElement("img");
  bird.src = "./Assets/" + birdsSrcs[Math.floor(Math.random() * birdsSrcs.length)];
  bird.classList.add("bird");
  document.body.appendChild(bird);
  let top = Math.random() * (innerHeight - bird.height);
  bird.style.top = top + "px";
  bird.style.left = "0px";
  allBirds.push(bird);
  moveRight(bird, 0, top);
    
    bird.addEventListener("click",function shoot(){

      allBirds.forEach(function(bird) {
        shootedbirds.push(bird.src.slice(-9, -4))
        let index = allBirds.indexOf(bird);
                    allBirds.splice(index, 1);
                    bird.remove();
    });
    shootedbirds.forEach(function(shooted) {
      if (shooted == "bird1")
     
      {
        numberbirds+=1;
        count+= 5;
      }
      else if (shooted == "bird2")
      {
        numberbirds+=1;
        count += 10;
      }
      
      else if (shooted == "bird3")
      {
        numberbirds+=1;
        count += 5;
      }
      
  });
        
    
      document.querySelector(".score").innerHTML="score:" + count
      document.querySelector(".birdnum").innerHTML="number of birds killed:" + numberbirds
      shootedbirds.length = 0;
      
     
      
  })
}
   

const fallDown = (bomb, top, left) => {

  let id = setInterval(() => {
     
      if (top + 20 < window.innerHeight - bomb.height) {
          top += 10;
          bomb.style.top = top + "px";
      } 
       else {
          bomb.src = "/Assets/expo.png";
          setTimeout(() => {
              bomb.remove();
          }, 1000);
          clearInterval(id);
          createBomb();
      }
  }, 50);
}


let createBomb = () => {
  let bomb = document.createElement("img");
  bomb.src = "./Assets/bomb.png";
  bomb.classList.add("bomb");
  document.body.appendChild(bomb);
  let left = Math.random() * (innerWidth - bomb.width);
  bomb.style.left = left + "px";
  bomb.style.top = "0px";
  let startFall = fallDown(bomb, 0, left);
  bomb.addEventListener("click", function() {
      clearInterval(startFall);
      let firedBomb = this;
      firedBomb.src = "./Assets/expo.png";
      firedBomb.style.width = "200px";
      firedBomb.style.height = "200px";
      let bombLeft = +firedBomb.style.left.replace("px", "");
      let bombTop = +firedBomb.style.top.replace("px", "");
      let bombWidth = firedBomb.width;
      let bombHeight = firedBomb.height;
      setTimeout(function() {
          firedBomb.remove();
      }, 500);
      allBirds.forEach(function(bird) {
          let birdLeft = +bird.style.left.replace("px", "");
          let birdTop = +bird.style.top.replace("px", "");
          let birdWidth = bird.width;
          let birdHeight = bird.height;
          if (birdLeft + birdWidth >= bombLeft &&
              birdLeft <= bombLeft + bombWidth &&
              birdTop + birdHeight >= bombTop &&
              birdTop <= bombTop + bombHeight) {
              bombedBirdes.push(bird.src.slice(-9, -4));
              let index = allBirds.indexOf(bird);
              allBirds.splice(index, 1);
              bird.remove();
          }
      });
      bombedBirdes.forEach(function(bombed) {
          if (bombed == "bird1")
            {
              numberbirds+=1;
              count+=5;
            }
          else if (bombed == "bird2")
              {
               
            numberbirds+=1;
            count+=10;
              }
          else if (bombed == "bird3")
             {
              numberbirds+=1;
              count+=15;
            
             }
      });
      document.querySelector(".score").innerHTML="score:" + count
      document.querySelector(".birdnum").innerHTML="number of birds killed:" + numberbirds
      bombedBirdes.length = 0;
  });
};


  
  $(document).mousemove(function(e){
    $("#aim").css({left:e.pageX, top:e.pageY});
});
  window.addEventListener("load", (e) => {
    var user=localStorage.getItem("name");
    document.querySelector(".name").innerHTML="welcome :" + user;

    let id1 = setInterval(() => {
    
      createBomb();
      
      }, 1000000);
    
    let id2 = setInterval(() => {
    
    createBird();
    
    }, 1000);
    
    var seconds = 60;
    var el = document.querySelector(".seconds-counter")               
    
    function incrementSeconds() {
        seconds -= 1;
        el.innerText = "Time left " + seconds + " seconds.";
    }
    var cancel = setInterval(incrementSeconds, 1000);

    let winlose=function() {
      var res=document.querySelector("#res")
      var restart=document.querySelector(".restart").addEventListener("click",function() {
        location.reload();
      })
      res.classList.add("results")
      var win=setInterval(function(){

      res.classList.remove("results")
      if(count>50){
        document.querySelector(".finalscore").innerHTML=" You Won ";
      }
      else{
        document.querySelector(".finalscore").innerHTML=" you lost ";
      }
  
      clearInterval(cancel)
      clearInterval(id1)
      clearInterval(id2)

    },60000)
    }
   winlose();
   
    
 
  });



    
    


 


