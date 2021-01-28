class Component {
    left() {
        return this.posX;
    }

    right() {
        return this.posX + this.width - 13;
    }

    top() {
        return this.posY;
    }

    bottom() {
        return this.posY + this.height - 5;
    }

    isCrashedWith(obstacle) {
        const condition = !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
        return condition;
    }

}