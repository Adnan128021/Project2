const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let speler = new Image();
speler.src = "img/Eerstegamekarakter.png"


let ag = new Image();
ag.src = "img/gamebackground.png";
ag.onload = function () {
    c.drawImage(ag, 5, 5, canvas.width, canvas.height);
}

var platform = new Image();
platform.src = "img/Achtergrond.png"
platform.src = "img/Achtergrond.png"


const gravity = 1.5

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 250
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 50;
        this.height = 50;
        this.isOnGround = false;
    }

    draw() {
        c.drawImage(ag, 7, 7, canvas.width, 800);
        c.drawImage(speler, this.position.x - 20, this.position.y - 125, 240, 230);
    }


    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height +
            this.velocity.y <= canvas.height - 130)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = 1700
        this.height = 1800
    }


    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(platform, this.position.x - 20, this.position.y - 180, 1100, 400)
        c.drawImage(platform, this.position.x + 300, this.position.y - 180, 1100, 400)
        c.drawImage(platform, this.position.x + 600, this.position.y - 180, 1100, 400)
    }
}
var num = 2;

var platforms = [];

function createplat() {
    for (i = 0; i < num; i++) {
        platforms.push(
            {
                x: 100 * i,
                y: 200 + (30 * i),
                width: 110,
                height: 15
            }
        );
    }
}

function renderplat() {
    ctx.fillStyle = "#45597E";
    ctx.fillRect(platforms[0].x, platforms[0].y, platforms[0].width, platforms[0].height);
    ctx.fillRect(platforms[1].x, platforms[1].y, platforms[1].width, platforms[1].height);

}

let player = new Player()
let platform_two = new Platform({
    x: 0, y: 800,

})
new Platform({
    x: 0, y: 800

})

const keys = {
    right: {
        pressed: false

    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    platform_two.draw()
    player.update()

    if (keys.right.pressed && player.position.x < 1450) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 165) {
        player.velocity.x = -5

    } else
        player.velocity.x = 0
    if (keys.right.pressed) {
        platform_two.position.x -= 5
    } else if (keys.left.pressed) {
        platform_two.position.x += 5
    }
    if (player.position.y + player.height <= platform_two.position.y
        && player.position.y + player.height + player.velocity.y >= platform_two.position.y
        && player.position.x + player.width >= platform_two.position.x
        && player.position.x <= platform_two.position.x + platform_two.width

    ) {
        Player.isOnGround = true;
        player.velocity.y = 0
    }
}

animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true
            break
        case 83:
        case 68:
            keys.right.pressed = true
            break
        case 87:
            if (Player.isOnGround) {
                player.velocity.y -= 20
                Player.isOnGround = false;
            }
            break

    }

})
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
        case 83:
        case 68:
            keys.right.pressed = false
            break
        case 87:
            player.velocity.y -= 13
            break

    }


})


