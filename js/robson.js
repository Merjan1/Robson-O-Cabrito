class Robson extends Component {
  constructor(img) {
    super();
    this.posX = 50;
    this.posY = 510;
    this.moveUp = false;
    this.moveDown = false;
    this.width = 50;
    this.height = 50;
    this.img = img;
    this.srcX = 43;
    this.srcY = 34;
    this.speed = 4;
    this.frame = 0;
    this.imageOffset = 128;
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.width,
      this.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.animation();
  }

  animation() {
    this.frame++;

    if (this.frame >= 20) {
      this.frame = 0;
    }

    this.srcX = 43 + Math.floor(this.frame / 5) * this.imageOffset;
  }

  move() {
    if (this.moveUp) {
      if (this.posY > 380) {
        this.posY -= this.speed;
      } else {
        this.posY = 380;
        this.moveUp = false;
        this.moveDown = true;
      }
    }
    if (this.moveDown) {
      if (this.posY < 510) {
        this.posY += this.speed;
      } else {
        this.posY = 510;
      }
    }
  }
}
