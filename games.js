const score = document.querySelector('.Score');
const startscreen = document.querySelector('.StartScreen');
const gamearea = document.querySelector('.GameArea');
let player = { speed: 8, score: 0 };

startscreen.addEventListener('click', start);

let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(ev) {
    ev.preventDefault();
    keys[ev.key] = true;
}

function keyUp(ev) {
    ev.preventDefault();
    keys[ev.key] = false;
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}


function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    });
}

function endGame(message) {
    player.start = false;
    startscreen.classList.remove('hide');

    const gameOverText = document.createElement('div');
    gameOverText.textContent = message;
    gameOverText.style.color = 'white';
    gameOverText.style.fontSize = '40px';
    gameOverText.style.position = 'absolute';
    gameOverText.style.top = '60%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';

    gamearea.appendChild(gameOverText);
}

function moveCar(car) {
    let other = document.querySelectorAll('.other');
    other.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log('Car Position:', player.x, player.y);
            console.log('Other Car Position:', item.style.left, item.y);
            console.log('HIT');
            endGame("Game Over! Your Score: " + player.score);
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    });
}


function gamePlay() {
    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();

    if (player.start) {
        moveLines();
        moveCar(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerHTML = "Your Score:" + player.score;

        if (player.score === 4000) {
            endGame("Congratulations! You Won!");
        }
    }
}

function displayUsername() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        // Display the username on the right corner of the game area
        const usernameDisplay = document.createElement('div');
        usernameDisplay.textContent = 'Username: ' + storedUsername;
        usernameDisplay.style.color = 'white';
        usernameDisplay.style.position = 'absolute';
        usernameDisplay.style.top = '15px';
        usernameDisplay.style.right = '10px';
        usernameDisplay.style.fontSize = '20px';

        gamearea.appendChild(usernameDisplay);
    }
}


function start() {
    startscreen.classList.add('hide');
    gamearea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (x * 150);
        roadline.style.top = roadline.y + 'px';
        gamearea.appendChild(roadline);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gamearea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let othercar = document.createElement('div');
        othercar.setAttribute('class', 'other');
        othercar.y = ((x + 1) * 350) * -1;
        othercar.style.top = othercar.y + 'px';
        othercar.style.left = Math.floor(Math.random() * 350) + 'px';
        gamearea.appendChild(othercar);
    }

    // Call displayUsername to show the username on the right side of the screen
    displayUsername();
}

// Call displayUsername when the page loads to show any previously stored username
displayUsername();
