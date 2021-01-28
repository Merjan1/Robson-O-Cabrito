class Obstacle extends Component{
    constructor(img) {
        super()
        this.posX = 900 + Math.floor(Math.random() * 300)
        this.posY = 502
        this.speed = 5
        this.width = 50
        this.height = 60
        this.img = img
    }
    draw(ctx) {
        
        ctx.drawImage(
            this.img,
            this.posX,
            this.posY,
            this.width,
            this.height,
        );
    }

    move() {
        this.posX -= this.speed
    }

}