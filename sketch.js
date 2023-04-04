

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var sky
var level = false

function preload(){
  sky = loadImage("Sky.jpg")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  cut = loadImage("cut.png")
  melon = loadImage("melon.png")
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

 
}



function setup(){
  createCanvas(700,700)

  engine = Engine.create();
  world = engine.world;

  bunny = createSprite(350,598,50,50)
  bunny.shapeColor = "yellow"
  bunny.scale = 0.3

  ground = new Ground(300,690,1000,20)

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  button = createImg("cut.png")
  button.position(320,30)
  button.size(50, 50)
  button.mouseClicked(drop)

  


  rope1 = new Rope(7,{x:350,y:50})

  rope2 = new Rope(4,{x:400,y:50})

  rope3 = new Rope(6,{x:200,y:90})

  rope4 = new Rope(5,{x:550,y:120}) 
  
  fruit = Bodies.circle(150,30,20,20,)
  fruit1 = Bodies.circle(180,30,20,20,)
  console.log(level)

  Matter.Composite.add(rope1.body,fruit);
  Matter.Composite.add(rope2.body,fruit1);
  Matter.Composite.add(rope3.body,fruit1);
  Matter.Composite.add(rope4.body,fruit1);



  fruit_con = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit1);
  fruit_con3 = new Link(rope3,fruit1);
  fruit_con4 = new Link(rope4,fruit1);


  
}
function draw(){
    background("blue")

    Engine.update(engine);

    image(sky,0,0,700,700)
  
    ground.show()
    rope1.show()
    if(level){
   rope2.show()
   rope3.show()
   rope4.show()
   
   image(melon,fruit1.position.x,fruit1.position.y,50,50)

   button1 = createImg("cut.png")
  button1.position(380,30)
  button1.size(50, 50)
  button1.mouseClicked(drop2)
  
  button2 = createImg("cut.png")
  button2.position(180,90)
  button2.size(50, 50)
  button2.mouseClicked(drop3)

  button3 = createImg("cut.png")
  button3.position(530,90)
  button3.size(50, 50)
  button3.mouseClicked(drop)
  


   
}
    if(fruit!=null){

    

    image(melon,fruit.position.x,fruit.position.y,50,50)}
    drawSprites()

    if(collide(fruit,bunny)==true)
  {
    level = true
    bunny.changeAnimation('eating');
    //eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    //bk_song.stop();
    //sad_sound.play();
    fruit=null;
     
   }
}
function drop(){
  fruit_con.detach()
  fruit_con = null
  rope1.break()
  button.hide()
  
}
function drop2(){
  console.log("hello")
  fruit_con2.detach()
  fruit_con2 = null
  rope2.break()
  button1.hide()
  
}
function drop3(){
  fruit_con3.detach()
  fruit_con3 = null
  rope3.break()
  button2.hide()
  
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}