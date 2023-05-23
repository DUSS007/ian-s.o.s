var bg;
var bgimg;
var playerimg ,playeratirando ,player;
var zombie ,zombieImg ,zombieGroup;
var bullets ,bulletsImg
var heart1 ,heart2 ,heart3 
var heart1Img ,heart2Img ,heart3Img 
var life=3
var bulletos=5;
var reloading=false;

function preload(){
  bgimg=loadImage("bg.jpeg");
  playerimg=loadImage("shooter_2.png");
  playeratirando=loadImage("shooter_3.png");
  zombieImg=loadImage("zombie.png");
  bulletsImg=loadImage("Bullets.png");
  heart1Img=loadImage("heart_1.png");
  heart2Img=loadImage("heart_2.png");
  heart3Img=loadImage("heart_3.png");

}

function setup() {
 createCanvas(1300,650);

  //adicionando a imagem de fundo
  bg=createSprite(660,450,30,30);
  bg.addImage(bgimg);
  //adicionando o jogador
  player=createSprite(180,430,50,50);
  player.addImage(playerimg);
  player.scale=0.3;
  
  //coração
  heart1=createSprite(1000,40,20,20);
  heart1.visible=false;
  heart1.addImage("heart1",heart1Img);
  heart1.scale=0.4

  heart2=createSprite(950,40,20,20);
  heart2.visible=false;
  heart2.addImage("heart2",heart2Img);
  heart2.scale=0.4

  heart3=createSprite(1000,40,20,20);
  heart3.addImage("heart3",heart3Img);
  heart3.scale=0.4

  //criando grupo dos zombis
  zombieGroup = new Group();




  

  

}

function draw() {
  background(0); 

  //logica para exibir
  if(life==3){
    heart3.visible=true;
    heart2.visible=false;
    heart1.visible=false;
  }
  
  if(life==2){
    heart3.visible=false;
    heart2.visible=true;
    heart1.visible=false;
  }

  if(life==1){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=true;
  }

  if(life==0){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=false;
    player.destroy();
  }

  //movendo o jogador para baixo
  if(keyDown("S")&&player.y<580){
    player.y +=10
  }
  //MOVENDO PARA CIMA
  if(keyDown("W")&&player.y>70){
    player.y -=10
  }
  //movendo para frente
  if(keyDown("D")){
    player.x +=10
  }
  //movendo para 
  if(keyDown("A")){
    player.x -=10
  }
  //ATIRAR
  if(keyWentDown("SPACE")){
   bullets=createSprite(player.x+60,player.y-25,20,10);
   bullets.addImage(bulletsImg);
   bullets.scale=0.05;
   bullets.velocityX=20
   player.addImage(playeratirando);
   bulletos--;

  }
  else if(keyWentUp("SPACE")){
    player.addImage(playerimg);
  }

  //m@t@r zumbi 
  if(zombieGroup.isTouching(player)){
    for(var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life--;
      }
    }
  }

  if (keyWentDown("R") && bulletos < 5) {
    reloading = true;
    reloadTime = 60; 
    // 2 segundos (60 frames por segundo)
    
  }
  
  if (reloading) {
    reloadTime--;
    
    if (reloadTime <= 0) {
      bulletos = 5;
      reloading = false;
    }
  }

  spawnEnemy();


  drawSprites();

}

function spawnEnemy() {

  if(frameCount %50==0){
    var zombie = createSprite(1300,random(100,600),40,40);
    zombie.addImage(zombieImg);
    zombie.velocityX = -2;
    zombie.scale =0.6;
    zombie.lifetime = 700;
    zombieGroup.add(zombie);
  }


}
