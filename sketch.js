
var monkey , monkeyrunning
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, objGroup
var score;

var play = 1
var end = 0
var gameState = play;
var score = 0;
function preload(){
  
  
  monkeyrunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkeyrunning);
  monkey.scale= 0.1;
  
  ground = createSprite(400,350,900,10)
  
  FoodGroup = new Group();
  objGroup = new Group();
  score = 0;
}


function draw() {
 background(220);
  text("Score: "+ score, 500,50);
  if(gameState === play){
  spawnobj();
  spawnBanana();
        
    textSize(20)
    
     if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
      monkey.velocityY = monkey.velocityY + 0.8
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 1;
    }
    if(objGroup.isTouching(monkey)){
      objGroup.destroyEach();
      FoodGroup.destroyEach();
      gameState = end;
    }
  }
  
  if(gameState === end){
    textSize(20)
    text("GAME OVER, PRESS R TO RESTART",200,250)
    if(keyDown("r")){
      gameState = play;
      score = 0;
    }
  }
 monkey.collide(ground);
  drawSprites()
}

function spawnobj(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,328,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -10
    obstacle.lifetime = 100;
    
    objGroup.add(obstacle);
  }
  
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,200,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8
    banana.y = Math.round(random(120,200));
    banana.lifetime = 100;
    
    FoodGroup.add(banana);
  }
  
}





