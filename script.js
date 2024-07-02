const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const gameContainer = document.querySelector('.game-container');

const STEP = 5;
const CONTAINER_WIDTH = 800;
const PLAYER_WIDTH = 50;

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        // Contrôles du Joueur 1
        case 'q': movePlayer(player1, -STEP); break;
        case 'd': movePlayer(player1, STEP); break;
        
        // Contrôles du Joueur 2
        case 'ArrowLeft': movePlayer(player2, -STEP); break;
        case 'ArrowRight': movePlayer(player2, STEP); break;
    }
});

function movePlayer(player, step) {
    const currentLeft = parseInt(player.style.left || 0);
    let newLeft = currentLeft + step;
    
    // Empêcher le joueur de sortir de l'écran
    newLeft = Math.max(0, Math.min(CONTAINER_WIDTH - PLAYER_WIDTH, newLeft));
    
    player.style.left = `${newLeft}px`;
}

// Initialisation des positions des joueurs
player1.style.left = '50px';
player2.style.left = `${CONTAINER_WIDTH - PLAYER_WIDTH - 50}px`;