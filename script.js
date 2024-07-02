// game.js
class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.players = [];
        this.platform = null;
        this.gravity = 0.5;
        this.friction = 0.8;

        this.init();
    }

    init() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        document.body.appendChild(this.canvas);

        this.players.push(new Player(50, 300, 'red'));
        this.players.push(new Player(700, 300, 'blue'));
        this.platform = new Platform(0, 350, 800, 50);

        window.addEventListener('keydown', this.handleInput.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.lastTime = 0;
        this.loop();
    }

    loop(currentTime) {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        this.players.forEach(player => {
            player.update(deltaTime);
            this.checkCollision(player, this.platform);
        });

        this.checkPlayerCollision();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.platform.draw(this.ctx);
        this.players.forEach(player => player.draw(this.ctx));
    }

    handleInput(e) {
        if (e.key === 'a') this.players[0].moveLeft();
        if (e.key === 'd') this.players[0].moveRight();
        if (e.key === 'w') this.players[0].jump();
        if (e.key === 'ArrowLeft') this.players[1].moveLeft();
        if (e.key === 'ArrowRight') this.players[1].moveRight();
        if (e.key === 'ArrowUp') this.players[1].jump();
    }

    handleKeyUp(e) {
        if (['a', 'd'].includes(e.key)) this.players[0].stop();
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) this.players[1].stop();
    }

    checkCollision(player, platform) {
        if (player.y + player.height > platform.y &&
            player.y < platform.y + platform.height &&
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x) {
            player.y = platform.y - player.height;
            player.vy = 0;
            player.canJump = true;
        }
    }

    checkPlayerCollision() {
        const [p1, p2] = this.players;
        if (p1.x < p2.x + p2.width &&
            p1.x + p1.width > p2.x &&
            p1.y < p2.y + p2.height &&
            p1.y + p1.height > p2.y) {
            // Collision détectée, on applique une force de répulsion
            const force = 5;
            if (p1.x < p2.x) {
                p1.vx -= force;
                p2.vx += force;
            } else {
                p1.vx += force;
                p2.vx -= force;
            }
        }
    }
}

class Player {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jumpForce = 10;
        this.canJump = false;
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        this.vy += game.gravity;
        this.vx *= game.friction;

        // Empêcher le joueur de sortir de l'écran
        this.x = Math.max(0, Math.min(game.canvas.width - this.width, this.x));
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.vx = -this.speed;
    }

    moveRight() {
        this.vx = this.speed;
    }

    stop() {
        this.vx = 0;
    }

    jump() {
        if (this.canJump) {
            this.vy = -this.jumpForce;
            this.canJump = false;
        }
    }
}

class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const game = new Game();
