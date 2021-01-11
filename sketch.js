var gameState = "start";
var energy = 0;

function preload(){
  backgroundImg = loadImage("bg.jpg");
  
  butterflyImg = loadAnimation ("butterfly2.png","butterfly5.png","butterfly3.png");
  
  plant1Img = loadImage("plant1.png");
  plant2Img = loadImage("plant2.gif");
  plant3Img = loadImage("plant3.png");
  
  web1Img = loadImage("web1.png");
  web2Img = loadImage("web2.png");
  
  bird1Img = loadImage("bird1.png");
  bird2Img = loadImage("bird2.png");
  bird3Img = loadImage("bird3.png");
}

function setup () {
  createCanvas(600,400);
  
  butterfly = createSprite(300,200);
  butterfly.addAnimation("butterflyImg",butterflyImg);
  
  obstaclesGroup = createGroup();
  plantsGroup = createGroup();
}

function draw () {
  background ("lightblue");
  
  if(gameState === "start"){
    textSize(35);
    stroke("blue");
    strokeWeight(3);
    textFont("georgia");
    fill("white");
    text("Butterfly Migration",150,50);
    
    textSize(20);
    strokeWeight(1);
    fill("blue");
    text("Imagine you are a butterfly who must travel south for the winter.",15,90);
    text("Butterflies face many dangers in their 3,000-mile journey.",35,120);
    text("Predators, such as birds & spiders, are always hunting for prey.",20,150);
    text("Butterflies require nectar from plants, which their energy source.",15,180);
    text("In this game, as a butterfly, you must fly south for the winter.",35,210);
    text("Use the arrow keys to move up, down, left, and right respectively.",15,240);
    text("Be careful! It's dangerous out there. You never know what's coming.",2,270);
    
    textSize(25);
    fill(255);
    strokeWeight(3);
    text("Press the space bar to begin! Have fun! Good luck!",20,320)
    
    if(keyDown("space"))
        gameState = "play"
  }
  
  if(gameState === "play"){
    drawSprites();
    spawnObstacles();
    spawnPlants();
    
    camera.position.x = butterfly.x;
    camera.position.y = butterfly.y;
    
    if(keyDown(UP_ARROW)){
        butterfly.y = butterfly.y-10;
    } else if(keyDown(DOWN_ARROW)){
        butterfly.y = butterfly.y+10;
    } else if(keyDown(RIGHT_ARROW)){
        butterfly.x = butterfly.x+10;
    } else if(keyDown(LEFT_ARROW)){
        butterfly.x = butterfly.x-10;
    }
    
    if(obstaclesGroup.isTouching(butterfly)){
      gameState = "end";
    }
    
    if(plantsGroup.isTouching(butterfly)){
      plantsGroup.destroyEach();
      energy++;
    }
    
    textSize(20);
    stroke("black");
    strokeWeight(1);
    textFont("georgia");
    fill("black");
    text("Energy Level: " + energy,butterfly.x-200,butterfly.y);
    
  }
  
  if(gameState === "end"){
      
      if(keyDown("space")){
        gameState  = "play";
        energy = 0;
      }
    
      plantsGroup.destroyEach();
      obstaclesGroup.destroyEach();
    
      textSize(70);
      stroke("blue");
      strokeWeight(3);
      textFont("georgia");
      fill("white");
      text("Game Over!",butterfly.x-200,butterfly.y);
    
      textSize(30);
      strokeWeight(1);
      fill("blue");
      text("Your energy level was "+energy+".",butterfly.x-175,butterfly.y+50);
      text("Press the space bar to play again!",butterfly.x-225,butterfly.y+100);
  }
  
}

function spawnObstacles(){
  
  if(frameCount % 50 === 0){
    
    obstacle = createSprite(butterfly.x+600,random(butterfly.y+150,butterfly.y-150),10,10);
    
    var rand = Math.round(random(1,5));
    if(rand === 1) {
      obstacle.addImage("web1Img",web1Img);
    } else if(rand === 2){
      obstacle.addImage("web2Img",web2Img);
    } else if (rand === 3){
      obstacle.addImage("bird1Img",bird1Img);
    } else if (rand === 4){
      obstacle.addImage("bird2Img",bird2Img);
    } else if (rand === 5){
      obstacle.addImage("bird3Img",bird3Img);
    }
      
    obstacle.lifetime = 1000;
    obstacle.scale = 0.15;
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnPlants(){
  
  if(frameCount % 50 === 0){
    
    plant = createSprite(butterfly.x+600,random(butterfly.y+150,butterfly.y-150),10,10);
    
    var rand2 = Math.round(random(1,3));
    if(rand2 === 1){
      plant.addImage("plant1Img",plant1Img);
    } else if (rand2 === 2){
      plant.addImage("plant2Img",plant2Img);
    } else if (rand2 === 3){
      plant.addImage("plant3Img",plant3Img);
    }
    
    plant.scale = 0.2;
    plant.lifetime = 1000;
    plantsGroup.add(plant);
    
  }
  
}