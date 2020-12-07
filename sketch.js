var monkey , monkey_running,ground ;
var banana ,bananaimage, obstacle, obstacleimage,r1,s1,play1;
var foodgroup, obstaclegroup;
var survivaltime =0 , score = 0;
var play =1;
var end = 0;
var story;
var gamestate = story ;
var lose;
var sound,collect;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
  r1 =loadImage("restart.png");
  s1 = loadImage ("story.png");
  play1 = loadImage("play.png");
  
  sound = loadSound ("background (online-audio-converter.com).mp3");
  lose = loadSound ("u lose (online-audio-converter.com).mp3");
  collect = loadSound ("Recording (5) (online-audio-converter.com).mp3");

}



function setup() {
  
  createCanvas (625,225);
  
monkey = createSprite( 50,160,20,20);
 monkey.addAnimation("monku",monkey_running);
  monkey.scale = 0.1;
  monkey.lifetime = -1;
  
   ground = createSprite(200,200,2000,10);
  ground.velocityX = -4 ; 
  ground.x = ground.width /2;
  ground. shapeColor = "brown";
  
  
  monkey.setCollider("circle",0,0,225);
  monkey.debug = true
  
  reset = createSprite (300,100);
  reset.addImage("reset",r1);
  //reset.scale =0.3;
  
  story1 = createSprite ( 300,100);
  story1.addImage("story",s1);
  story1.scale = 0.8;
  
 playicon = createSprite ( 300,155);
playicon.addImage("play",play1);
playicon.scale = 0.01;
  
  foodgroup = createGroup();
  obstaclegroup = createGroup();
  
  
}


function draw() {

  background(rgb(140,222,240));
  
  textSize(20);
  fill("black");
  text("Survival Time : " + survivaltime ,135,30);
 
                                     
                                     
  textSize(20);
  fill("black");
  text("Score : " + score ,325,30);
  
  
  
  if(gamestate === story){
    story1.visible = true;
    playicon.visible = false;
    if(mousePressedOver(reset)) {
       sound.loop();
      gamestate = play;
      obstaclegroup.setVelocityXEach(0);
      foodgroup.setVelocityXEach(0);
      monkey.velocityY = 0;
      ground.velocityX = 0;
    }
  }
      
  if(gamestate === play ){
    
    obstacle();
  food();
    
    reset.visible =false;
    story1.visible = false;
    playicon.visible = false;
 
     survivaltime = Math.ceil(frameCount / frameRate());
    
    obstacle();
  food();
    
    reset.visible =false;
    story1.visible = false;
    playicon.visible = false;
    
  
    
    ground.velocityX =-6.5;
    
     if (ground.x < 50){
      ground.x = ground.width/2;
    }
    
      if(keyDown("space")&& monkey.y >= 130) {
        monkey.velocityY = -12;  
    }
    
     monkey.velocityY = monkey.velocityY + 1;
    
    
    
   if(monkey.isTouching(foodgroup)){
     score = score + 2;
     foodgroup.destroyEach();
     collect.play();
     
   }
    
    if(monkey.isTouching(obstaclegroup)){
      lose.play();
      sound.stop();
        gamestate = end;
    }
  }
  
  if(gamestate === end){
    
    reset.visible =true;
    
    ground.velocityX =0;
    foodgroup.destroyEach();
    obstaclegroup.destroyEach();
    
    if(mousePressedOver(reset))  {
      restart();
      
    }
  }
    

  
  monkey.collide(ground);
  
  drawSprites();
 
}

function restart(){
  gamestate = story;
  reset.visible = false;
  frameCount = 0;
  //survivaltime = 0 ;
  score = 0;
}


function obstacle(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(200,185,10,40);
   obstacle.addImage("stone",obstacleimage);
   //obstacle.x = Math.round(random(90,175));
   obstacle.velocityX = -(4+ score/20);
   obstacle.scale =0.1
   obstacle.lifetime =-1;
 obstaclegroup.add(obstacle);
 }
}

function food (){
 if(frameCount % 100 === 0){
  var banana = createSprite (200, 90,20,20);
  //banana.x = Math.round(random(100,300));
    banana.addImage( "foodie",bananaimage);
   banana.scale=0.1;
   banana.lifetime = -1;
   banana.velocityX = -4;
   foodgroup.add(banana);
 }
}
    
  
  
