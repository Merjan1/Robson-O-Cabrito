canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bg = new Image();
bg.src = "./images/Mountain-Wall.png";
const robsonImg = new Image();
robsonImg.src = "./images/robson_one-removebg-preview.png";

const obstacleImg = new Image();
obstacleImg.src = "./images/cactus.png";

const gameOver = new Audio();
gameOver.src = "./audio/gameOver.wav";
gameOver.volume = 0.4;

const jump = new Audio();
jump.src = "./audio/jump.wav";
jump.volume = 0.5;

const gameSound = new Audio();
gameSound.src = "./audio/gameSound.wav";
gameSound.volume = 1.0;

class Game {
  constructor(bg, robson) {
    this.bg = bg;
    this.robson = robson;
    this.animationId;
    this.frames = 0;
    this.score = 0;
    this.obstacles = [];
  }

  bgDraw = (bg) => {
    ctx.drawImage(
      bg,
      0,
      0,
      bg.width,
      bg.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.fillStyle = "#aba297";
    ctx.fillRect(0, 550, 900, 100);
  };

  updateObstacles = () => {
    if (this.frames % 90 === 0) {
      let obstacle = new Obstacle(obstacleImg);
      this.obstacles.push(obstacle);
    }

    this.obstacles.forEach((obstacle) => {
      obstacle.draw(ctx);
      obstacle.move();
    });
  };

  updateScore = () => {
    if (this.frames % 10 === 0) {
      this.score++;
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score ${this.score}`, 20, 50);
  };

  checkGameOver = () => {
    this.obstacles.forEach((obstacle) => {
      if (this.robson.isCrashedWith(obstacle)) {
        cancelAnimationFrame(this.animationId);
        gameSound.pause();
        gameOver.play();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillText("Game Over!", canvas.width / 4, 200);
        ctx.fillStyle = "white";
        ctx.fillText(`Your Final Score: ${this.score}`, canvas.width / 6, 400);
      }
    });
  };

  updateGame = () => {
    this.frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.bgDraw(this.bg);

    this.updateObstacles();

    this.robson.move();
    this.robson.draw(ctx);

    this.updateScore(this.score);

    this.animationId = requestAnimationFrame(this.updateGame);

    this.checkGameOver();
  };
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    starGame();
  };

  function starGame() {
    gameSound.play();

    const game = new Game(bg, new Robson(robsonImg));

    game.updateGame();

    function keydownHandler(event) {
      if (game.robson.posY === 510) {
        if (event.key === "ArrowUp" || " ") {
          jump.play();
          game.robson.moveUp = true;
          game.robson.moveDown = false;
        }
      }
    }

    function keyupHandler(event) {
      if (event.key === "ArrowUp" || " ") {
        game.robson.moveDown = true;
        game.robson.moveUp = false;
      }
    }

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
  }
};
