let ctx = document.querySelector("canvas").getContext("2d")

// Creates scroll background spirite 
class backgroundSprite {
  constructor(name, pos, width, height) {
    this.image = document.createElement("img");
    this.image.src = name;
    this.pos = new Vector(pos[0], pos[1]);
    this.width = width;
    this.height = height;
  }

  scrollBackground(dir, back2, speed) {
    if (dir == 0) {
    }
    else if (dir == 1) { // Background scrolls right to left 
      speed = -0.2;
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
      ctx.drawImage(back2.image,
        0, 0, Math.abs(this.pos.x), this.height,
        this.width + this.pos.x, 0, Math.abs(this.pos.x), this.height);
      this.pos.x += speed; back2.pos.x += speed;
      if (this.pos.x <= -this.width) {
        this.pos.x = 0;
        back2.pos.x = this.width;
      }
    }
  }
}

// Explosion Particle Effect
class ExplodeParticle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.speed = Math.random() * 10;
    this.velocity = new Vector(0, 0);
    this.velocity.x = (Math.random() * 2) - 1;
    this.velocity.y = (Math.random() * 2) - 1;
    this.velocity.normalize().multiply(this.speed);
    this.length = (Math.random() * 7) + 3;
  }

  // Draws Explosion Particle  
  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.length, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.pos.add(this.velocity);
  }
}

// Explosion Effect 
class Explosion {
  constructor(size) {
    this.size = size;
    this.array = [];
  }
  init() {
    this.array = [];
    let x = 490
    let y = 360
    let color = 'yellow'
    let stroke = 'black'
    for (let i = 0; i < this.size; i++) {
      let e = new ExplodeParticle(x, y);
      e.color = color;
      this.array.push(e)
    }
  }
  update() {
    // if (Math.random() < .05) this.init();
    for (let i = 0; i < this.size; i++) {
      this.array[i].update();
    }
  }

  draw() {
    for (let i = 0; i < this.size; i++) {
      this.array[i].draw();
    }
  }
}

// Console counter log
function update() {
  console.log("update" + count1)
  if (count1 > 5850) {
    explosion.update();
  }
  if (count1 > 6800) {
    window.location.href = "./Earth/index.html"
  }
}

// Cloud shape
function drawShape(ctx, xoff, yoff) {
  ctx.beginPath();
  ctx.moveTo(210 + xoff, 177 + yoff);
  ctx.bezierCurveTo(194 + xoff, 206 + yoff, 197 + xoff, 218 + yoff, 157 + xoff, 222 + yoff);
  ctx.bezierCurveTo(119 + xoff, 226 + yoff, 125 + xoff, 291 + yoff, 157 + xoff, 293 + yoff);
  ctx.bezierCurveTo(184 + xoff, 295 + yoff, 299 + xoff, 291 + yoff, 347 + xoff, 293 + yoff);
  ctx.bezierCurveTo(370 + xoff, 294 + yoff, 370 + xoff, 223 + yoff, 342 + xoff, 224 + yoff);
  ctx.bezierCurveTo(310 + xoff, 225 + yoff, 318 + xoff, 186 + yoff, 296 + xoff, 169 + yoff);
  ctx.bezierCurveTo(280 + xoff, 157 + yoff, 229 + xoff, 161 + yoff, 210 + xoff, 177 + yoff);
  ctx.fillStyle = gradient2;
  ctx.strokeStyle = "black"
  ctx.fill();
  ctx.stroke();
}

// Text 1
function text1() {
  ctx.font = '32px Comic Sans MS';
  ctx.fillstroke = 'black';
  ctx.fillText('Something is emerging!', 1000, 190);
}

// Text 2 
function text2() {
  ctx.font = '32px Comic Sans MS';
  ctx.fillstroke = 'black';
  ctx.fillText('Oh no! Its the aliens, we are getting attacked!', 2450, 185);
}

// Text 3
function text3() {
  ctx.font = '36px Comic Sans MS';
  ctx.fillstroke = 'black';
  ctx.fillText('They are Among Us!', 6300, 300);
}

// Star Shape for the Sun flare
function sun() {
  ctx.beginPath();
  ctx.moveTo(108, 0.0);
  ctx.lineTo(141, 70);
  ctx.lineTo(218, 78.3);
  ctx.lineTo(162, 131);
  ctx.lineTo(175, 205);
  ctx.lineTo(108, 170);
  ctx.lineTo(41.2, 205);
  ctx.lineTo(55, 131);
  ctx.lineTo(1, 78);
  ctx.lineTo(75, 68);
  ctx.lineTo(108, 0);
  ctx.closePath();
  ctx.fillStyle = gradient3;
  ctx.fill();
  ctx.strokeStyle = "gray"
  ctx.stroke();
}

// Circle shape for the Sun
function innersun() {
  ctx.beginPath()
  ctx.arc(100, 108, 35, 0 * toRadians, 360 * toRadians);
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.fill();
}

// UFO Shape 1 
function ufo1() {
  ctx.beginPath()
  ctx.arc(250, 50, 40, 360 * toRadians, 180 * toRadians);
  ctx.fillStyle = gradient;
  ctx.strokeStyle = 'black'
  ctx.stroke();
  ctx.fill();
}

// UFO Shape 2
function ufo2() {
  ctx.beginPath()
  ctx.arc(300, -205, 40, 360 * toRadians, 180 * toRadians);
  ctx.fillStyle = gradient5;
  ctx.strokeStyle = 'black'
  ctx.stroke();
  ctx.fill();
}

// UFO Shape 3 
function ufo3() {
  ctx.beginPath()
  ctx.arc(360, -200, 40, 360 * toRadians, 180 * toRadians);
  ctx.fillStyle = gradient6;
  ctx.strokeStyle = 'black'
  ctx.stroke();
  ctx.fill();
}

// Laser Shape 
function Laser1(ctx, xoff, yoff) {
  ctx.beginPath();
  ctx.moveTo(328 + xoff, 157 + yoff);
  ctx.bezierCurveTo(351 + xoff, 158 + yoff, 373 + xoff, 157 + yoff, 430 + xoff, 157 + yoff);
  ctx.bezierCurveTo(445 + xoff, 157 + yoff, 444 + xoff, 168 + yoff, 427 + xoff, 169 + yoff);
  ctx.bezierCurveTo(398 + xoff, 170 + yoff, 353 + xoff, 168 + yoff, 338 + xoff, 169 + yoff);
  ctx.bezierCurveTo(311 + xoff, 171 + yoff, 329 + xoff, 154 + yoff, 328 + xoff, 157 + yoff);
  ctx.fillStyle = gradient4;
  ctx.strokeStyle = 'black'
  ctx.stroke();
  ctx.fill();
}

// Big UFO that appears at the end
function bigufo() {
  ctx.beginPath()
  ctx.arc(6500, 180, 380, 360 * toRadians, 180 * toRadians);
  ctx.fillStyle = gradient7;
  ctx.strokeStyle = 'black'
  ctx.stroke();
  ctx.fill();
}


// Draws every function on the screen 
function draw() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  background1.scrollBackground(1, background2, 5)

  // Rotates the star shape for the sun
  ctx.save()
  ctx.translate(105, 108)
  ctx.rotate(prz)
  ctx.translate(-105, -108)
  sun(ctx)
  ctx.restore()
  prz += 0.1 * toRadians;

  // Rotates inner circle for the sun 
  ctx.save()
  ctx.translate(100, 100)
  ctx.rotate(prz)
  ctx.translate(-100, -100)
  innersun(ctx)
  ctx.restore()

  // Moves the cloud across the screen   
  ctx.save();
  ctx.translate(tx, 0)
  drawShape(ctx, 800, -140)
  ctx.restore();
  if (tx < -1200) tx = 0;
  tx = tx - 0.4;

  // Moves the text across the screen
  ctx.save();
  ctx.translate(ta, 0)
  text1(ctx, 100, -40)
  ctx.restore();
  ta = ta - 0.7;

  // Scales UFO 1 shape
  ctx.save()
  ctx.scale(psx, psy)
  ufo1()
  ctx.restore()
  psx += 0.0004; psy += 0.0004;

  // Scales UFO 2 shape
  ctx.save()
  ctx.translate(-100, -600)
  ctx.scale(pgx, pgy)
  ctx.translate(100, 600)
  ufo2()
  ctx.restore()
  pgx += 0.0002; pgy += 0.0002;

  // Scales UFO 3 shape
  ctx.save()
  ctx.translate(250, 850)
  ctx.scale(ptx, pty)
  ctx.translate(-200, 50)
  ufo3()
  ctx.restore()
  ptx += 0.00025; pty += 0.00025;

  // Moves the second text across the screen
  ctx.save();
  ctx.translate(tb, 0)
  text2(ctx, 100, -40)
  ctx.restore();
  tb = tb - 0.7;

  // Draws the plane image
  ctx.save();
  ctx.translate(130, 210)
  ctx.drawImage(image, 0, 0);
  ctx.restore();

  // Moves the laser shape 
  ctx.save();
  ctx.translate(la, 0)
  Laser1(ctx, 17700, 200)
  ctx.restore();
  la -= 3.0;

  // Big ufo appears at the end 
  ctx.save();
  ctx.translate(bx, 0)
  bigufo(ctx, -700, 500)
  ctx.restore();
  bx -= 0.9;

  // Moves the third text across the screen
  ctx.save();
  ctx.translate(tc, 0)
  text3(ctx, 100, -40)
  ctx.restore();
  tc = tc - 0.9;



  // Explosion effect disapears once it reaches a specific frame 
  if (count1 < 6000 && count1 > 5850) {
    explosion.draw()
  }
  count1++
  // console.log(count1)

  if (count1 == 5850) {
    explosion.init();
  }
}

// Gradient for UFO 1
var gradient = ctx.createLinearGradient(20, 280, 250, 30);
gradient.addColorStop(0.5, "white");
gradient.addColorStop(1, "gray");

// Gradient for the cloud shape
var gradient2 = ctx.createLinearGradient(175, 280, 200, 30);
gradient2.addColorStop(1, "white");
gradient2.addColorStop(0.5, "gray");

// Gradient for the Sun 
var gradient3 = ctx.createLinearGradient(0, 350, 280, 100);
gradient3.addColorStop(0.5, "darkorange");
gradient3.addColorStop(1, "yellow");

// Gradient for the laser
var gradient4 = ctx.createLinearGradient(5000, 500, 550, 500);
gradient4.addColorStop(0.5, "red");
gradient4.addColorStop(0.5, "white");

// Gradient for UFO 2
var gradient5 = ctx.createLinearGradient(500, 200, 150, 50);
gradient5.addColorStop(0.5, "white");
gradient5.addColorStop(1, "gray");

// Gradient for UFO 3
var gradient6 = ctx.createLinearGradient(500, 250, 150, 30);
gradient6.addColorStop(0.5, "white");
gradient6.addColorStop(1, "gray");

// Gradient for the big UFO 
var gradient7 = ctx.createLinearGradient(140, 100, 150, 765);
gradient7.addColorStop(0.4, "gray");
gradient7.addColorStop(1, "white");



function loop(timestamp) {
  let delta = (timestamp - lastRender);
  fps = 1000 / delta;
  lastRender = timestamp;
  update()
  draw()
  window.requestAnimationFrame(loop)
}

// loads background image
let image = document.createElement("img");
image.src = "./images/plane.png";
let background1 = new backgroundSprite("./images/background/sky.png", [0, 0], ctx.canvas.width, ctx.canvas.height);
let background2 = new backgroundSprite("./images/background/sky.png", [0, 0], ctx.canvas.width, ctx.canvas.height);
let toRadians = Math.PI / 180;
let tx = 0;
let prz = 0;
let bx = 0;
let ta = 0;
let tb = 0;
let tc = 0;
let la = 0;
let count1 = 0
let explosion = new Explosion(200);

let psx = psy = 0;
let pgx = pgy = 1;
let ptx = pty = 1;
let fps, lastRender;
window.requestAnimationFrame(loop)
// Program terimates here