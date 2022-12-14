const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let speler = new Image();
speler.src = "img/Eerstegamekarakter.png"


let ag = new Image();
ag.src = "img/Background.png";
ag.onload = function (e) {
    c.drawImage(ag, 10, 10, canvas.width, 1600);
}

var platform = new Image();
platform.src = "img/Achtergrond.png"


const gravity = 1.5

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 50;
        this.height = 50;
    }

    draw() {
        c.drawImage(ag, 10, 10, canvas.width, 1600);
        c.drawImage(speler, this.position.x - 20, this.position.y - 125, 240, 230);
    }


    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor() {
        this.position = {
            x: 0,
            y: 750
        }
        this.height = 1800
        this.width = 1700
    }


    draw() {
        //c.fillStyle = "red"
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(platform, this.position.x - 20, this.position.y - 180, 1100, 400)
    }
}

const player = new Player()
const platform_two = new Platform()

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
        player.velocity.y = 0
    }
}

animate()

addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true
            break
        case 83:
        case 68:
            keys.right.pressed = true
            break
        case 87:
            player.velocity.y -= 20
            break

    }

})
addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
        case 83:
        case 68:
            keys.right.pressed = false
            break
        case 87:
            player.velocity.y -= 20
            break

    }

})


