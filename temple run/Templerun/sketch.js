//declaring vars

var gameState = "start"
var count = 0;
var distance = 0;
var b5,pot,treasureChest,man,monster;
var i,o,lost;

//loading animations
function preload(){
  b5=loadImage("images/scratchbg.png")
  cactus6=loadImage("images/cactus_06.png")
  cactus7=loadImage("images/cactus_07.png")
  cactus8=loadImage("images/cactus_08.png")
  flower2=loadImage("images/flower2.png")
  flower4=loadImage("images/flower4.png")
  gem3=loadImage("images/gem3.png")
  gem5=loadImage("images/gem5.png")
  chest2=loadImage("images/b2.png")
  chest3=loadImage("images/b3.png")
  manImg=loadAnimation("images/man1.png","images/man2.png")
  monsterImg=loadAnimation("images/monster1.png","images/monster2.png")
  bgMusic=loadSound("music/palace.mp3")
  gemSound=loadSound("music/gemSound.mp3")
  chestSound=loadSound("music/treasureChest.mp3")
  scoreSound=loadSound("music/woohoo.mp3")
  bonusMeter=loadSound("music/scoreBlast.mp3")
  dieSound=loadSound("music/splat.mp3")
  potImg=loadImage("images/pot1.png")
  mainBg=loadImage("images/bg2.png")
  restartB=loadImage("images/restart.png")
  lost=loadSound("music/lostjungleBg.mp3")
}


function setup(){


 //canvas
createCanvas(700,800)

//bg
 bg=createSprite(350,300)
 bg.addImage(b5)
 bg.velocityY=12;
 bg.scale=1.7

 //man
 man=createSprite(350,550)
 man.addAnimation("background",manImg)
 man.setCollider("rectangle",0,0,70,200)
man.scale=1.0
 

 //monster

 monster=createSprite(350,700)
 monster.addAnimation("background",monsterImg)
 monster.scale=1.7

 //bg
 bg1=createSprite(350,300)
 //pot
 pot=createSprite(350,350)


 //restart button
 restartbutton=createSprite(350,300)
 
 //grps
  cactusGroup= new Group()
  flowersGroup= new Group()
  gemsGroup=new Group()
  chestboxGroup=new Group()
}
function draw(){

//bg
  background("pink") 

  //gamestate
    if(gameState==="start"){
      
//pot=visible

      pot.addImage(potImg)
      pot.visible=true
      
//bg2=visible

      bg1.addImage(mainBg)
      bg1.scale=1

 //visiblity false

              man.visible=false
       monster.visible=false
       count.visible=false
       bg.visible=false
       restartbutton.visible=false
    
    
       //state = play
       if (mousePressedOver(pot)) {
         gameState="play"
         pot.visible=false
 
       }


    }

    //state-play conditions

  if(gameState==="play"){
    bgMusic.stop();
    man.visible=true
    restartbutton.visible=false
    monster.visible=true
    count.visible=true
    bg.visible=true
    bg1.visible=false

    //moving ground

 if(bg.y>600){
      bg.y=  0;
      }
      distance = distance + Math.round(World.frameRate/60);

      //movement

     if (keyWentDown("right_arrow")&&man.x==350) {
      man.x=510
     }
     if (keyWentDown("left_arrow")&&man.x==350) {
      man.x=220
     }

    if (keyWentDown("left_arrow")&&man.x==510) {
    man.x=350
    }
    if (keyWentDown("right_arrow")&&man.x==220) {
      man.x=350
      }

      //score

    if (frameCount%1000 === 0){
     scoreSound.play();
    }

    if(distance%10===0){

//treasures

    }
     if (gemsGroup.isTouching(man)){
      gemsGroup.destroyEach();
      gemSound.play();
      count=count+30
    }
     if(chestboxGroup.isTouching(man)){
       chestboxGroup.destroyEach();
       chestSound.play()
       count=count+100
     }

     //functions
        spawnPlants();
        spawnFlowers();
        spawnGems();
        spawnChests();


        //obs collition

      if(cactusGroup.isTouching(man)||flowersGroup.isTouching(man)){
      cactusGroup.destroyEach();
      flowersGroup.destroyEach();
      dieSound.play();
      gameState="end"
      

      }

     

  } //state-end conditions
  else if(gameState==="end"){

     bg.velocityY=0
     cactusGroup.setVelocityYEach(0)
     flowersGroup.setVelocityYEach(0)
     chestboxGroup.setVelocityYEach(0)
     gemsGroup.setVelocityYEach(0)
     count=0
     distance=0
     man.visible=false;
     monster.visible=false;
     restartbutton.addImage(restartB)
     restartbutton.visible=true
     restartbutton.scale=0.6

     //restart
     if (mousePressedOver(restartbutton)){
       gameState="play"
       man.visible=true;
       monster.visible=true;
       bg.velocityY=12;
       bg.scale=1.7
       if(bg.y>600){
        bg.y=  0;
        }

        //distance
        distance = distance + Math.round(World.frameRate/60);
     }
   }

  drawSprites();


  //text,score,etc
  textSize(30)
  textFont("Georgia")
  textStyle(BOLD)
  fill("orangered")

  
  textSize(30)
  textFont("Georgia")
  textStyle(BOLD)
  fill("goldenbrown")
  text("The Infinite Forest Run",130,25)
  textSize(30);
  textFont("Georgia")
  textStyle(BOLD)
  fill("lightgreen")
  text("Score:"+count,10,55)
  text("Distance:"+distance,10,85)
}

//functions

function spawnPlants(){
  if (frameCount%170===0) {
    cactus = createSprite(250, 0);
    cactus.velocityY=12

cactus.depth=monster.depth-1

    var rand = Math.round(random(1,3))
    switch (rand) {
      case 1: cactus.addImage(cactus6)   
        break;
      case 2: cactus.addImage(cactus7)   
        break;
      case 3: cactus.addImage(cactus8)   
        break;
      default: break;
    }
   cactus.x=Math.round(random(220,550))
    cactus.lifetime=80
 //   cactus.debug = true;
    cactus.scale = 0.4
    cactusGroup.add(cactus)
  }
}
function spawnFlowers(){
  if (frameCount%890===0) {
    flora=createSprite(250,0)
    flora.velocityY=12
    flora.depth=monster.depth-1
    
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: flora.addImage(flower2)   
        break;
      case 2: flora.addImage(flower4)   
        break;
      default:  break;
    }
    flora.x=Math.round(random(220,300))
    flora.lifetime=80
  //  flora.debug=true;
    flora.scale=0.4
    flowersGroup.add(flora)
  }
}
function spawnGems(){
  if (frameCount%590===0) {
    gemy=createSprite(220,0)
    gemy.velocityY=12

    gemy.depth=monster.depth-1
 
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: gemy.addImage(gem3)
        break;
      case 2: gemy.addImage(gem5)
        break;
      default: break;
    }
    gemy.x=Math.round(random(220,400))
    gemy.lifetime = 80
    gemy.scale=0.2
    gemsGroup.add(gemy)
  }
}
function spawnChests() {
  if (frameCount%1280===0) {
    chesty=createSprite(220,0)
    chesty.velocityY=12

    chesty.depth=monster.depth-1

    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: chesty.addImage(chest2)   
        break;
      case 2: chesty.addImage(chest3)   
        break;
      default:  break;
    }
    chesty.x=Math.round(random(220,400))
    chesty.lifetime=80
    chesty.scale=0.5
    chestboxGroup.add(chesty)
  }
}