//to hold the varible for game state
var gameState = "serve";

//to hold the variable for the following 
var monkey , monkey_running , monkey_crashed
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var jungle , jungleImage;
var score = 0;

//to hold the variable for score
var SurvivalTime=0;

//function load images , animation for the following
function preload(){
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png" , "Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
  monkey_crashed = loadAnimation("Monkey_01.png");
  
  jungleImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,400);
  
  //creating monkey and adding animation 
  monkey = createSprite(100,300,20,20);
  monkey.addAnimation("Moving",monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("crashed",monkey_crashed);
  
  //creating ground 
  ground = createSprite(300,330,1200,20);
  ground.x = ground.width /2;
  ground.visible = false;
  
  jungle = createSprite(0,50,1200,400)
  jungle.addImage("forest" , jungleImage)
  jungle.scale = 1.3;
  jungle.x = jungle.width/2;
  
  //creating Groups for the obstacles and banana
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {
    background(180);
    
    //to display sprites 
    drawSprites();
  
     monkey.depth= monkey.depth+1
    //to display text and the score value and its size 
    fill("white")
    textSize(20);
    text("survivaltime:"+SurvivalTime,250,30);
  
   //if conditions for game state serve
   if(gameState === "serve"){
     fill("white");
     textSize(20);
     text("press S to start",200,200);
     text("press space to jump",180,230);
     monkey.y = 290;
     monkey.changeAnimation("crashed",monkey_crashed);
   } 
  
   //if condition that if s key pressed and the game state in serve so the game state will turn to play
   if(gameState === "serve" && keyDown("S")){
      gameState = "play";
   }
  
   //if condition for the game state play 
   if(gameState === "play"){ 
     
      monkey.changeAnimation("Moving",monkey_running);
   
      if(FoodGroup.isTouching(monkey)){
         SurvivalTime = SurvivalTime + 2;
      }
     
      ground.velocityX = -4;
      jungle.velocityX = -(4+4*SurvivalTime/30);
  
      if(keyDown("space") && monkey.y>=250){
         monkey.velocityY = -15;
      }
      monkey.velocityY = monkey.velocityY+0.8;
  
      monkey.collide(ground);
  
      if(ground.x<0){
         ground.x = ground.width/2;
      }
      if(jungle.x<0){
        jungle.x = jungle.width/2;
      }
     
      if(FoodGroup.isTouching(monkey)){
        FoodGroup.destroyEach();
      }

      food();
      obstacles();
   
      switch(SurvivalTime){
        case 10: monkey.scale = 0.12;
          break;
        case 20: monkey.scale = 0.14; 
          break;
        case 30: monkey.scale = 0.16;
          break;
        case 40: monkey.scale = 0.18;  
          break;
        default: break;  
      }
     
      if(obstacleGroup.isTouching(monkey)){
         monkey.scale = 0.1;
         gameState = "end";
      } 
   }
  
   //if condition for the game state end 
   if(gameState === "end"){
     obstacleGroup.setVelocityXEach (0);
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     monkey.velocityX = 0;
     monkey.velocityY = 0;
     ground.velocityX = 0;
     jungle.velocityX = 0;
   
     monkey.changeAnimation("crashed",monkey_crashed);
   
     fill("white")
     text("press R to restart",250,200);
   
     if(keyDown("R")){
       reset();
     } 
   } 
  
}

//function for the banana
function food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,30,30);
    banana.addImage("fruit",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(6+4*SurvivalTime/20);
    banana.y = Math.round(random(120,200));
    banana.lifetime = 100;
    FoodGroup.add(banana);
  }
}

//function for the obstacles 
function obstacles(){
 if(frameCount % 300 === 0){
  var obstacle = createSprite(600,300,30,30);
  obstacle.addImage("rocks",obstacleImage);
  obstacle.scale = 0.3;
  obstacle.velocityX = -(6+4*SurvivalTime/20);
  //obstacle.debug = true;
  obstacle.setCollider("circle",10,10,150);
  obstacle.lifetime = 100; 
  obstacleGroup.add(obstacle);
   
 }
}

//function to reset 
function reset(){
  gameState = "serve";
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  SurvivalTime = 0;
}



