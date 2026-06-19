const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Variables del juego
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreElement.innerText = highScore;

let gameSpeed = 100;
let gameInterval;
let isGameOver = false; // Nueva variable para controlar el estado de Game Over

function startGame() {
    generateFood();
    gameInterval = setInterval(update, gameSpeed);
}

function update() {
    // Si estamos en estado de Game Over, no actualizamos el movimiento ni las colisiones
    if (isGameOver) return;

    moveSnake();

    if (checkGameOver()) {
        triggerGameOver();
        return;
    }

    checkFoodCollision();
    draw();
}

function draw() {
    // Limpiar fondo
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff007f";
    ctx.fillStyle = "#ff007f";
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Dibujar serpiente
    snake.forEach((segment, index) => {
        ctx.shadowBlur = index === 0 ? 15 : 0;
        ctx.shadowColor = "#00f3ff";
        ctx.fillStyle = index === 0 ? "#00f3ff" : `rgba(0, 243, 255, ${1 - index / (snake.length + 2)})`;
        drawRoundedRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2, 5);
    });

    ctx.shadowBlur = 0;

    // Si es Game Over, dibujar el letrero en pantalla
    if (isGameOver) {
        ctx.fillStyle = "rgba(5, 5, 16, 0.8)"; // Fondo semi-transparente
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff007f";
        ctx.fillStyle = "#ff007f";
        ctx.font = "bold 28px 'Orbitron', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
        
        ctx.shadowColor = "#00f3ff";
        ctx.fillStyle = "#00f3ff";
        ctx.font = "14px 'Orbitron', sans-serif";
        ctx.fillText("Reiniciando en 2 segundos...", canvas.width / 2, canvas.height / 2 + 30);
        ctx.shadowBlur = 0;
    }
}

function drawRoundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
        }
    });
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        
        if (score > highScore) {
            highScore = score;
            highScoreElement.innerText = highScore;
            localStorage.setItem("snakeHighScore", highScore);
        }
        snake.push({ ...snake[snake.length - 1] });
        generateFood();
    }
}

function checkGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

// Activa el estado de fin de juego y dibuja el cartel
function triggerGameOver() {
    isGameOver = true;
    draw(); // Redibujar inmediatamente para mostrar el cartel de Game Over
    
    // Esperar exactamente 2000ms (2 segundos) y reiniciar
    setTimeout(resetGame, 2000);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.innerText = score;
    generateFood();
    isGameOver = false; // Apagar el estado de Game Over para volver a jugar
}

window.addEventListener("keydown", e => {
    // Si el juego terminó, ignoramos las teclas durante los 2 segundos de espera
    if (isGameOver) return;

    switch (e.key) {
        case "ArrowUp": case "w": case "W":
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case "ArrowDown": case "s": case "S":
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case "ArrowLeft": case "a": case "A":
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case "ArrowRight": case "d": case "D":
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});

startGame();