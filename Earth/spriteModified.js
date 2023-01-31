let drawBoundingBoxes=false 
class Sprite {
  constructor(name, frames, spriteWidth, spriteHeight) {
    this.image = document.createElement("img");
    this.image.src = name;
    this.frames = frames; // number of images in sprite sheet
    this.pos = new Vector(0, 0);
    this.spriteW = spriteWidth;
    this.spriteH = spriteHeight;
    this.scale = 1;
    this.flipY=false;
    this.rotate = 0;
    this.transparency = 1;
    this.index = 0; //the index of the current sprite (a number between 0-(frames-1), ignoring rows and columns)
    this.sheetRows = 1; // the number of rows in the sheet
    this.sheetCols = 1;// the number of columns in the sheet
    this.col = 0; // the current column be used
    this.row = 0;// the current column be used
    this.animDelay = 0; // the number of frames to display an individual image for
    this.count = 0;
    this.list = []
    this.tx = 0;
    this.ty = 0;
    this.tinc = 1;
  }
  drawBoundingBox(){
    ctx.lineWidth = 1;
    ctx.save()
    ctx.strokeStyle = `rgb(255,255,255)`;
    ctx.strokeRect(this.pos.x-this.spriteW/2,this.pos.y-this.spriteH/2, this.spriteW, this.spriteH); 
    ctx.restore()  
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.transparency;
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotate);
    if(this.flipY){ctx.scale(-this.scale, this.scale);}
    else{ctx.scale(this.scale, this.scale);}
    ctx.translate(-this.spriteW / 2, -this.spriteH / 2);
    ctx.drawImage(this.image, 0, 0, this.spriteW, this.spriteH);
    ctx.restore();
    if(drawBoundingBoxes)this.drawBoundingBox();
   
  }
  drawAnim(ctx){
    ctx.save()
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotate);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-this.spriteW / 2, -this.spriteH / 2);
    if (this.index >= this.list.length) this.index = 0; // reset index if  new list used
    this.col = this.list[this.index] % this.sheetCols;
    this.row = Math.trunc(this.list[this.index] / this.sheetCols);
    // ctx.drawImage(this.image, this.col * this.spriteW, this.row * this.spriteH, this.spriteW,
    //   this.spriteH, 0, 0, this.spriteW, this.spriteH);
    ctx.restore()
    this.count += 1;
    if (this.count % this.animDelay == 0) {
      this.count = 0;
      this.index += 1;
      if (this.index == this.list.length)
        this.index = 0;
    }
    
    if(drawBoundingBoxes)this.drawBoundingBox(); 

  }
  drawAnimAll(ctx) {
    ctx.save()
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotate);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-this.spriteW / 2, -this.spriteH / 2);

    this.col = this.index % this.sheetCols;
    this.row = Math.trunc(this.index / this.sheetCols);
   // ctx.drawImage(this.image, this.col * this.spriteW, this.row * this.spriteH, this.spriteW, this.spriteH, 0, 0, this.spriteW, this.spriteH);
    ctx.restore()
    this.count += 1;
    if (this.count % this.animDelay == 0) {
      this.count = 0;
      this.index += 1;
      this.index = this.index % this.frames;
    }
    if(drawBoundingBoxes)this.drawBoundingBox(); 
  }
    wrapScreen(){
      if (this.pos.x<0)this.pos.x=width;
      if (this.pos.x>width)this.pos.x=0;
      if (this.pos.y<0)
      this.pos.y=height;
      if (this.pos.y>height)this.pos.y=0;
    }
  }