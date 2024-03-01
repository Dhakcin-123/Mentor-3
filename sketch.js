var splashscreen;
var playbutton, aboutbutton;
var gameState = "wait";
var health1 = 200;
var maxhealth1 = 200;
var score1 = 0;
var bgwait, reward;
var playerimg, player;
var enemy;

function preload() {
  splashscreen = loadImage("assets/The hunters union.gif");
  bgwait = loadImage("assets/background.png");
  playerimg = loadImage("assets/Alien_UFO.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playbutton = createImg("assets/Play_button.png");
  playbutton.position(width - 300, height - 100);
  playbutton.size(200, 75);

  aboutbutton = createImg("assets/info.png");
  aboutbutton.position(1, 1);
  aboutbutton.size(200, 75);

  player = createSprite(50, 50);
  player.addImage(playerimg);
  player.scale = 0.4;
  player.visible = false;
}

function draw() {
  if (gameState == "wait") {
    background(splashscreen);
  }
  playbutton.mousePressed(() => {
    gameState = "play";
    playbutton.hide();
  });

  aboutbutton.mousePressed(() => {
    gameState = "aboutgame";
    aboutbutton.hide();
  });

  if (gameState == "aboutgame") {
    aboutpopup();
  }

  if (gameState == "play") {
    background(bgwait);
    player.visible = true;

    // image(bgwait, -width/2, -height/2, width * 2, height*1.25);

    aboutbutton.hide();
    playbutton.hide();
    healthBar(width - 300, 33, health1, maxhealth1, "violet");
    healthBar(155, 33, 10, 200, "green");
    movement();
    spawnRewards();
    spawnEnemy();
    // camera.x = player.x;
    // camera.y = player.y;
  }

  drawSprites();

  if (gameState == "play") {
    textSize(50);
    stroke("red");
    strokeWeight(4);
    fill("yellow");
    text("LEVEL 1", width / 2 - 100, 50);
    textSize(30);
    fill("cyan");
    stroke("red");
    text("TARGET :", 15, 50);
  }
}

function aboutpopup() {
  swal(
    {
      title: "HOW TO  UNITE - AGAINST THE ODDS !!!",
      text: "Come on, lets unite together out in space. Pass all the enimies and collect stuf on your journey to increase your health. Dont forget to level up.",
      textAlign: "center",
      imageUrl: "assets/Alien_UFO.png",
      imageSize: "200x200",
      confirmButtonText: "LET's UNITE!!!",
      confirmButtonColor: "#0000bf",
    },
    function () {
      gameState = "wait";
    }
  );
}

function healthBar(x, y, h, mx, clr) {
  noFill();
  stroke("cyan");
  strokeWeight(2);
  rect(x, y, mx, 20);
  fill(clr);
  rect(x, y, h, 20);
}

function spawnRewards() {
  if (frameCount % 100 == 0) {
    reward = createSprite(
      Math.round(random(10, width - 100)),
      Math.round(random(50, height - 100)),
      50,
      50
    );
  }
}

function movement() {
  if (keyDown("RIGHT")) {
    player.x += 5;
  }
  if (keyDown("DOWN")) {
    player.y+= 5;
  }
  if (keyDown("LEFT")) {
    player.x -= 5;
  }
  if (keyDown("UP")) {
    player.y -= 5;
  }
}

function spawnEnemy() {
  if (frameCount % 60 == 0) {
    enemy = createSprite(width,Math.round(random(50,height-150)) );
    enemy.velocityX=-7
  }
}
