// game.js
lass Game {
    constructor() {
        console.log('Initialisation du jeu');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
    console.error("Impossible d'obtenir le contexte 2D du canvas");
    return;
        this.players = [];
        this.platform = null;
        this.gravity = 0.5;
        this.friction = 0.8;

        this.init();
    }

    init() {
        console.log('Méthode init appelée');
        this.canvas.width = 800;
        this.canvas.height = 400;
        document.body.appendChild(this.canvas);
        console.log('Canvas ajouté au document');

        this.players.push(new Player(50, 300, 'white'));
        this.players.push(new Player(700, 300, 'black'));
        this.platform = new Platform(0, 350, 800, 50);
        console.log('Joueurs et plateforme créés');

        window.addEventListener('keydown', this.handleInput.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.lastTime = 0;
        this.loop(0);
        console.log('Boucle de jeu démarrée');
    }

    loop(currentTime) {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        this.players.forEach((player, index) => {
            player.update(deltaTime);
            this.checkCollision(player, this.platform);
            console.log(`Joueur ${index + 1} mis à jour :`, player);
        });

        this.checkPlayerCollision();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        console.log('Début du rendu');
        
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.platform.draw(this.ctx);
        console.log('Plateforme dessinée');
        
        this.players.forEach((player, index) => {
            console.log(`Tentative de dessin du joueur ${index + 1}`);
            player.draw(this.ctx);
        });
        
        console.log('Fin du rendu');
    }

    handleInput(e) {
        if (e.key === 'q') this.players[0].moveLeft();
        if (e.key === 'd') this.players[0].moveRight();
        if (e.key === 'z') this.players[0].jump();
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

        this.x = Math.max(0, Math.min(game.canvas.width - this.width, this.x));
    }

    draw(ctx) {
        console.log(`Dessin du joueur à (${this.x}, ${this.y})`);
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

console.log('Script chargé, création de l\'instance de jeu');
const game = new Game();
console.log('Instance de jeu créée');