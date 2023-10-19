const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');
const level = document.querySelector('.level');
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
ClickToStart.addEventListener('click', Start);

let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight: false
}

let player = {
    speed: 2,
    score: 0,
    levels: 1,
    highScore: 0
}

function keydown(e) {
    keys[e.key] = true
}
function keyup(e) {
    keys[e.key] = false;
}

function Start() {
    gameArea.innerHTML = "";
    startScreen.classList.add('hide');
    player.isStart = true;
    player.score = 0;
    window.requestAnimationFrame(Play);
    level.innerHTML = "Level" + ":" + (player.levels= 0);
// creating the road lines
    for (i = 0; i < 5; i++) {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'roadLines');
        roadLines.y = (i * 140);
        roadLines.style.top = roadLines.y + "px";
        gameArea.appendChild(roadLines);
    }
// creating the opponents car
    for (i = 0; i < 3; i++) {
        let Opponents = document.createElement('div');
        Opponents.setAttribute('class', 'Opponents');
        Opponents.y = ((i) * -300);
        Opponents.style.top = Opponents.y + "px";
        gameArea.appendChild(Opponents);
        Opponents.style.left = Math.floor(Math.random() * 300) + "px";
    }
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

function Play() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.isStart) {
        moveLines();
        moveOpponents(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.height - 75)) { player.y += player.speed }
        if (keys.ArrowRight && player.x < 350) { player.x += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
        player.score++;
        player.speed += 0.01;
        if (player.highScore < player.score) {
            player.highScore++;
            highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
            highScore.style.top="80px";
        }


        score.innerHTML = "Score" + ":" + (player.score - 1);
        window.requestAnimationFrame(Play);

        if(player.score> 500){
            level.innerHTML = "Level" + ":" + (player.levels+1);
            level.style.top="150px";
        }if(player.score> 1000){
            level.innerHTML = "Level" + ":" + (player.levels= 2);
        }if(player.score>1500){
            level.innerHTML = "Level" + ":" + (player.levels= 3);
        }if(player.score>2000){
            level.innerHTML = "Level" + ":" + (player.levels= 4);
        }
    }
}

function moveLines() {
    let roadLines = document.querySelectorAll('.roadLines');
    roadLines.forEach(function (item) {
        if (item.y >= 700)
            item.y -= 700;
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function moveOpponents(fire) {
    let Opponents = document.querySelectorAll('.Opponents');
    Opponents.forEach(function (item) {
        if (isCollide(fire, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y -= 900;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.style.right = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
//check whether the cars collide or not
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}
//game is end
function endGame() {
    player.isStart = false;
    player.speed = 2;
    startScreen.classList.remove('hide');
}


