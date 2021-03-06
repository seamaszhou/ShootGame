
/*global someFunction PIXI:true*/
/*eslint no-undef: "error"*/

let Ellie, ellierun, state, ellieaim, elliedie, ellieshoot;


let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";

}

let Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;



let app = new PIXI.Application({
    width: 1024,
    height: 512,
    antialias: true,
    transparent: false,
    resolution: 1
  }

);

//Full screen
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(1920, 512);
app.renderer.backgroundColor = 0x34495e;


//monitor loading progress
function loadProgress(loader, resource) {
  console.log("loading" + resource.url);

  console.log("progress" + loader.progress + "%");
}

//The code snippet below has been sourced from
//https://github.com/kittykatattack/learningPixi
//The code snippet appears in its original form

function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) {key.press();}
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) {key.release();}
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;


}



//The spirits images  below has been sourced from
//https://stensven.itch.io/zombie
//and
//https://petey90.itch.io/ellie-sprite-sheet
//and https://opengameart.org/content/pixel-zombie

document.body.appendChild(app.view), PIXI.loader.add("Ellie/Frames/Ellie frame_idle_0.png").add("Ellie/Frames/Ellie frame_idle_1.png").add("Ellie/Frames/Ellie frame_idle_2.png").add("Ellie/Frames/Ellie frame_idle_3.png").add("Ellie/Frames/Ellie frame_run_0.png").add("Ellie/Frames/Ellie frame_run_1.png").add("Ellie/Frames/Ellie frame_run_2.png").add("Ellie/Frames/Ellie frame_run_3.png").add("Ellie/Frames/Ellie frame_run_4.png").add("Ellie/Frames/Ellie frame_run_5.png").add("Ellie/Frames/Ellie frame_run_6.png").add("Ellie/Frames/Ellie frame_run_7.png").add("Ellie/Frames/Ellie frame_run_8.png").add("Ellie/Frames/Ellie frame_run_9.png").add("Ellie/Frames/Ellie frame_run_10.png").add("Ellie/Frames/Ellie frame_run_11.png").add("Ellie/Frames/Ellie frame_run_12.png").add("Ellie/Frames/Ellie frame_shoot_0.png").add("Ellie/Frames/Ellie frame_shoot_1.png").add("Ellie/Frames/Ellie frame_shoot_2.png").add("Ellie/Frames/Ellie frame_shoot_3.png").add("Ellie/Frames/Ellie frame_aim_0.png").add("Ellie/Frames/Ellie frame_aim_1.png").add("Ellie/Frames/Ellie frame_aim_2.png").add("Ellie/Frames/Ellie frame_aim_3.png").add("Ellie/Frames/Ellie frame_aim_4.png").add("Ellie/Frames/Ellie frame_aim_5.png").add("Ellie/Frames/Ellie frame_aim_6.png").add("Ellie/Frames/Ellie frame_aim_7.png").add("Ellie/Frames/Ellie frame_death_0.png").add("Ellie/Frames/Ellie frame_death_1.png").add("Ellie/Frames/Ellie frame_death_2.png").add("Ellie/Frames/Ellie frame_death_3.png").add("Ellie/Frames/Ellie frame_death_4.png").add("Ellie/Frames/Ellie frame_death_5.png").add("Ellie/Frames/Ellie frame_death_6.png").add("Ellie/Frames/Ellie frame_death_7.png").add("Ellie/Frames/zombie_1.png").add("Ellie/Frames/zombie_2.png").add("Ellie/Frames/zombie_3.png").add("Ellie/Frames/zombie_4.png").add("Ellie/Frames/zombie_5.png").add("Ellie/Frames/zombie_6.png").add("Ellie/Frames/zombie_7.png").add("Ellie/Frames/zombie_8.png").add("Ellie/Frames/zombie_9.png").add("Ellie/Frames/zombie_10.png").add("Ellie/Frames/zombie_11.png").add("Ellie/Frames/zombie_12.png").add("Ellie/Frames/zombie_13.png").add("Ellie/Frames/zombie_14.png").add("Ellie/Frames/zombie_15.png").add("Ellie/Frames/zombie_16.png").add("Ellie/Frames/zombie_attack_1.png").add("Ellie/Frames/zombie_attack_2.png").add("Ellie/Frames/zombie_attack_3.png").add("Ellie/Frames/zombie_attack_4.png").add("Ellie/Frames/zombie_attack_5.png").add("Ellie/Frames/zombie_attack_6.png").add("Ellie/Frames/zombie_attack_7.png").add("Ellie/Frames/zombie_attack_8.png").add("Ellie/Frames/zombie_attack_9.png").add("Ellie/Frames/zombie_born_1.png").add("Ellie/Frames/zombie_born_2.png").add("Ellie/Frames/zombie_born_3.png").add("Ellie/Frames/zombie_born_4.png").add("Ellie/Frames/zombie_born_5.png").add("Ellie/Frames/zombie_born_6.png").add("Ellie/Frames/zombie_born_7.png").add("Ellie/Frames/zombie_born_8.png").add("Ellie/Frames/zombie_die_1.png").add("Ellie/Frames/zombie_die_2.png").add("Ellie/Frames/zombie_die_3.png").add("Ellie/Frames/zombie_die_4.png").add("Ellie/Frames/zombie_die_5.png").add("Ellie/Frames/zombie_die_6.png").add("Ellie/Frames/zombie_die_7.png").add("Ellie/Frames/zombie_die_8.png").on("progress", loadProgress).load(setup);


//Bullet
let bullet = new PIXI.Graphics();
bullet.beginFill(0xe74c3c);
bullet.lineStyle(4, 0xe74c3c, 1);
bullet.drawRect(0, 0, 32, 6);
bullet.endFill();



let wall = new PIXI.Graphics();
wall.beginFill(0xe74c3c);
wall.lineStyle(4, 0xe74c3c, 1);
wall.drawCircle(0, 12, 128, 50);
wall.endFill();
app.stage.addChild(wall);
wall.position.set(2000, 400);

//box
let box = new PIXI.Graphics();
box.beginFill(0xe74c3c);
box.lineStyle(4, 0xe74c3c, 1);
box.drawRect(0, 12, 128, 50);
box.endFill();

//name
let nameStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 24,
  fill: "white",

});
let name = new PIXI.Text("", nameStyle);
app.stage.addChild(name);
name.position.set(570, 300);




function setup() {
  //idle
  let filePath = "Ellie/Frames/",
    idleArray = [];
  for (let $e = 0; $e < 3; $e++) {
    idleArray.push(filePath + "Ellie frame_idle_" + ($e + 1) + ".png");

  }

  //run

  let runArray = [];
  for (let $e = 0; $e < 12; $e++) {
    runArray.push(filePath + "Ellie frame_run_" + ($e + 1) + ".png");
  }

  //shoot
  let shootArray = [];
  for (let $e = 0; $e < 3; $e++) {
    shootArray.push(filePath + "Ellie frame_shoot_" + ($e + 1) + ".png");
  }

  //aim
  let aimArray = [];
  for (let $e = 0; $e < 6; $e++) {
    aimArray.push(filePath + "Ellie frame_aim_" + ($e + 1) + ".png");
  }


  let dieArray = [];
  for (let $e = 0; $e < 6; $e++) {
    dieArray.push(filePath + "Ellie frame_death_" + ($e + 1) + ".png");

  }


  let zombieArray = [];
  for (let $e = 0; $e < 15; $e++) {
    zombieArray.push(filePath + "zombie_" + ($e + 1) + ".png");

  }

  let zombieAttackArray = [];
  for (let $e = 0; $e < 8; $e++) {
    zombieAttackArray.push(filePath + "zombie_attack_" + ($e + 1) + ".png");
  }

  let zombieBornArray = [];
  for (let $e = 0; $e < 7; $e++) {
    zombieBornArray.push(filePath + "zombie_born_" + ($e + 1) + ".png");
  }

  let zombieDieArray = [];
  for (let $e = 0; $e < 7; $e++) {
    zombieDieArray.push(filePath + "zombie_die_" + ($e + 1) + ".png");
  }
  //arrow key
  let left = keyboard(65),
    up = keyboard(38),
    right = keyboard(68),
    down = keyboard(40),
    space = keyboard(32),
    aim = keyboard(81);

  //left arrow


  // let Ellie = new PIXI.Sprite(PIXI.loader.resources["Ellie/Frames/Ellie frame_idle_0.png"].texture);
  Ellie = new PIXI.extras.AnimatedSprite.fromImages(idleArray);
  ellierun = new PIXI.extras.AnimatedSprite.fromImages(runArray);
  ellieshoot = new PIXI.extras.AnimatedSprite.fromImages(shootArray);
  ellieaim = new PIXI.extras.AnimatedSprite.fromImages(aimArray);
  elliedie = new PIXI.extras.AnimatedSprite.fromImages(dieArray);
  zombie_stand = new PIXI.extras.AnimatedSprite.fromImages(zombieArray);
  zombie_attack = new PIXI.extras.AnimatedSprite.fromImages(zombieAttackArray);
  zombie_born = new PIXI.extras.AnimatedSprite.fromImages(zombieBornArray);
  zombie_die = new PIXI.extras.AnimatedSprite.fromImages(zombieDieArray);
  app.stage.addChild(Ellie);



  state = play;

  app.ticker.add(delta => gameLoop(delta));

  Ellie.animationSpeed = 0.1;
  Ellie.play();
  Ellie.position.set(500, 300);
  Ellie.vx = 0;
  Ellie.vy = 0;


  zombie_die.animationSpeed = 0.1;
  zombie_die.position.set(1300, 200);
  zombie_die.width = 480;
  zombie_die.height = 480;

  //
  //
  //
  //
  // zombie_born.animationSpeed = 0.05;
  // zombie_born.position.set(1300, 200);
  // zombie_born.width = 480;
  // zombie_born.height = 480;
  //   app.stage.addChild(zombie_born);
  // zombie_born.play();

  zombie_stand.animationSpeed = 0.1;
  zombie_stand.position.set(1300, 200);
  zombie_stand.width = 480;
  zombie_stand.height = 480;




  // app.stage.addChild(zombie_attack);
  //
  // zombie_attack.animationSpeed = 0.1;
  // zombie_attack.position.set(1300, 200);
  // zombie_attack.width = 480;
  // zombie_attack.height = 480;
  //
  // zombie_attack.play();




  right.press = () => {

    ellierun.vx = 0;
    app.stage.addChild(Ellie);
    app.stage.removeChild(ellierun);
    ellierun.position;
  };


  //shoot control
  space.press = () => {

    if (!right.isDown) {
      ellierun.vx = 5;
      ellierun.vy = 0;
      ellieshoot.animationSpeed = 0.1;
      ellieshoot.play();
      app.stage.removeChild(Ellie);
      app.stage.removeChild(ellieaim);
      app.stage.addChild(ellieshoot);
      ellieshoot.position.set(500, 300);
      console.log('test');

    }

  };

  space.release = () => {
    if (!right.isDown && !aim.isDown) {
      ellierun.vx = 0;
      app.stage.addChild(Ellie);
      app.stage.removeChild(ellieshoot);
      ellierun.position;
    }
  };

  //aim
  aim.press = () => {
    if (!right.isDown) {
      app.stage.addChild(ellieaim);
      ellieaim.animationSpeed = 0.1;
      ellieaim.position.set(500, 300);
      app.stage.removeChild(Ellie);
      ellieaim.play();
    }

  };

  aim.release = () => {

    if (!space.isDown) {
      app.stage.removeChild(ellieaim);
      app.stage.addChild(Ellie);
    }

  };

}

function gameLoop(delta) {
  state(delta);
}



//The code snippet below has been sourced from
//https://github.com/kittykatattack/learningPixi
//The code snippet appears in its original form
//collsion test function
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 8;
  r1.centerY = r1.y + r1.height / 8;
  r2.centerX = r2.x + r2.width / 8;
  r2.centerY = r2.y + r2.height / 8;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 8;
  r1.halfHeight = r1.height / 8;
  r2.halfWidth = r2.width / 8;
  r2.halfHeight = r2.height / 8;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};
// End code snippet

function play(delta) {
  ellierun.x += ellierun.vx;
  ellierun.x += ellierun.vy;
  if (hitTestRectangle(ellierun,zombie_stand)) {

      alert("die");
    }

}



// End code snippet
