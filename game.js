let score = 25;
let gamesPlayed = 0;
let totalPoints = 0;
const gridSize = 25;
let hiddenCell = Math.floor(Math.random() * gridSize);
const grid = document.getElementById('playbox');
let clickCount = 0;
const pulseThreshold = 10; 

// Calculate distance between two cells
function distance(cell1, cell2) {
    let x1 = cell1 % 5;
    let y1 = Math.floor(cell1 / 5);
    let x2 = cell2 % 5;
    let y2 = Math.floor(cell2 / 5);

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Calculate color based on distance
function getColor(dist) {
    let normalizedDist = dist / Math.sqrt(50); 
    
    let r = Math.floor((1 - normalizedDist) * 255); 
    let g = 0; 
    let b = Math.floor(normalizedDist * 255); 

    return `rgb(${r},${g},${b})`;
}

// Get emoji based on distance
function getEmoji(dist) {
    if (dist < 1.5) return "🔥"; 
    else if (dist < 2.5) return "🥵"; 
    else if (dist < 3.5) return "❄️"; 
    else return "🧊"; 
}

// Update the scoreboard
function updateScoreboard() {
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('games-played').textContent = `Games Played: ${gamesPlayed}`;
    document.getElementById('total-points').textContent = `Total Points: ${totalPoints}`;
}

// Restart the game
document.getElementById('restart').addEventListener('click', restartGame);

function restartGame() {
    score = 25;
    hiddenCell = Math.floor(Math.random() * gridSize);
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = '';
        cells[i].textContent = '';
    }
    clickCount = 0;
    updateScoreboard();
}

// Reload the page
document.getElementById('reload').addEventListener('click', function() {
    location.reload();
});

// Show overlay with countdown
function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    let seconds = 3;
    const countdownElement = document.getElementById('countdown');

    const countdownInterval = setInterval(() => {
        seconds--;
        countdownElement.textContent = `Next round starts in ${seconds}...`;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            overlay.style.display = 'none';
            restartGame();
        }
    }, 1000);
}

// Show instructions popup
document.getElementById('show-instructions').addEventListener('click', function() {
    const instructionsPopup = document.getElementById('instructions-popup');
    instructionsPopup.style.display = 'flex';
});

// Close instructions popup
document.getElementById('close-instructions-popup').addEventListener('click', function() {
    const instructionsPopup = document.getElementById('instructions-popup');
    instructionsPopup.style.display = 'none';
});

for(let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    cell.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= pulseThreshold) {
            document.getElementsByClassName('cell')[hiddenCell].classList.add('pulse');
        }

        let dist = distance(i, hiddenCell);
        cell.style.backgroundColor = getColor(dist); 
        
        if(i === hiddenCell) {
            cell.textContent = "🏆"; 
            gamesPlayed += 1;
            totalPoints += score;
            showOverlay(); // Show the overlay when the trophy is found
        } else {
            cell.textContent = getEmoji(dist);
            score -= 1;
            updateScoreboard();
        }
    });

    grid.appendChild(cell);
}


window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
};