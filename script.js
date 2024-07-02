document.addEventListener('keydown', function(event) {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const step = 10; // Déplacement en pixels

    // Déplacements du joueur 1 (WASD)
    switch(event.key) {
        case 'w':
            player1.style.bottom = (parseInt(player1.style.bottom) + step) + 'px';
            break;
        case 'a':
            player1.style.left = (parseInt(player1.style.left) - step) + 'px';
            break;
        case 's':
            player1.style.bottom = (parseInt(player1.style.bottom) - step) + 'px';
            break;
        case 'd':
            player1.style.left = (parseInt(player1.style.left) + step) + 'px';
            break;
    }

    // Déplacements du joueur 2 (Flèches directionnelles)
    switch(event.key) {
        case 'ArrowUp':
            player2.style.bottom = (parseInt(player2.style.bottom) + step) + 'px';
            break;
        case 'ArrowLeft':
            player2.style.left = (parseInt(player2.style.left) - step) + 'px';
            break;
        case 'ArrowDown':
            player2.style.bottom = (parseInt(player2.style.bottom) - step) + 'px';
            break;
        case 'ArrowRight':
            player2.style.left = (parseInt(player2.style.left) + step) + 'px';
            break;
    }
});

// Initialisation des positions des joueurs
document.getElementById('player1').style.left = '50px';
document.getElementById('player1').style.bottom = '50px';
document.getElementById('player2').style.right = '50px';
document.getElementById('player2').style.bottom = '50px';
