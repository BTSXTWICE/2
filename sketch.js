
var gameState = 0;
var timer=100;
var shinchan_run,shinchan_dance,doraemon_run,doraemon_doracake, background_image,game_thumbnail;
var shinchan,doraemon,background,invivsiblebackground, doracake_group;
var doracake;
var doraScore=0,shinScore=0;
var restart_restart,restart;
function preload(){
    shinchan_run=loadImage("shinchan_zindabad_0.2.png")
    shinchan_dance=loadImage("lol.png")
    doraemon_run=loadImage("doraemon_baghi3.png")
    doraemon_doracake=loadImage("modak.png")
    background_image=loadImage("track.jpeg")
    game_thumbnail=loadImage("thumbnail.jpeg")
     restart_restart=loadImage("restart2.png")

}

function setup(){
    createCanvas(600,600);
     
    background=createSprite(300,300,800,600);
   restart=createSprite(300,300,20,10);
   restart.scale=0.1
   restart.addImage(restart_restart);
   restart.visible=false;

    background.addImage("tdoong",game_thumbnail);
    background.velocityY= 1.5
    background.y=background.height/2
    


doracake_group=new Group();

shinchan=createSprite(450,500,20,10);
shinchan.addImage(shinchan_run);
shinchan.scale=0.7;

doraemon=createSprite(105,500,20,10);
doraemon.addImage(doraemon_run);
doraemon.scale=0.4;

}

function draw(){
if(gameState===0){
    background.scale=0.8
background.changeImage("tdoong")
timer=timer-1
if(timer<=0){
    
    timer=0
    gameState=1
}
}
drawSprites();
console.log(gameState)
if(gameState===1){
    if(shinScore===60||doraScore===60){
        gameState=2
    
    }
    background.addImage("ttt",background_image);
background.changeImage("ttt")
background.scale=1.5
    if(background.y>400){
background.y= background.height/2
}
spawnDoracakes()
edges=createEdgeSprites()
shinchan.collide(edges);
doraemon.collide(edges);
for(var i=0;i<doracake_group.length;i++){
if(doracake_group.get(i).isTouching(shinchan)){doracake_group.get(i).destroy()
shinScore+=3
}
if(doracake_group.get(i).isTouching(doraemon)){doracake_group.get(i).destroy()
doraScore+=3 
}
}

if(keyDown("right")){
    shinchan.x=shinchan.x+2;
}
if(keyDown("left")){
    shinchan.x=shinchan.x-2;
}
if(keyDown("a")){
doraemon.x=doraemon.x-2;
}
if(keyDown("d")){
    doraemon.x=doraemon.x+2;
}

textSize(15)
text("doraScore:"+doraScore,50,20)
text("shinScore:"+shinScore,480,20)
}
if(gameState===2){
    text("khatam",150,150)
    if(shinScore>doraScore){
        textSize(20)
        text("shinchan wins",200,150)

    }
    else{
        textSize(20)
        text("doraemon wins", 100,150)
    }

    background.velocityY=0
    doracake_group.setLifetimeEach(-1)

    restart.visible=true;
    if(mousePressedOver(restart)){reset()}

}

}
function spawnDoracakes() {
    if (frameCount % 60 === 0) {
        var doracake = createSprite(300,100,20,10);
       doracake.x = Math.round(random(80,560));
        doracake.addImage(doraemon_doracake);
        doracake.scale = 0.3;
        doracake.velocityY = 3;
        doracake.lifetime=150;
        doracake_group.add(doracake)
        doracake.debug=true;
        doracake.setCollider("circle",0,0,20)
}
}
function reset(){
    gameState=1;
    restart.visible=false;
   doraScore=0;
   shinScore=0
   background.velocityY=1.5;
   doracake_group.destroyEach() 
}  