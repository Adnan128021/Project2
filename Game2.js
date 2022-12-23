const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var speler = new Image();
speler.src = "img/Eesrte game karakter.png"

var platform = new Image();
platform.src = "img/Achtergrond.png"



const gravity = 1.5
class Player {
constructor()  {
    this.position = {
        x: 100,
        y: 100
    }
    this.velocity = {
        x:0,
        y:1
    }
    this.whidth = 50,
    this.height = 50
  }

  draw() {

    c.drawImage(speler, this.position.x-20, this.position.y-125, 240, 230);
  }

update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y +this.height +
    this.velocity.y <= canvas.height)
    this.velocity.y += gravity
    else this.velocity.y = 0
  }
}

class Platform {
    constructor() {
        this.position = {
            x: 400,
            y: 800
        }
        this.width = 300
        this.height = 300
    }

    draw() {

        c.drawImage(platform, this.position.x-20, this.position.y-125, 400, 290)
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
    player.update()
    platform_two.draw()

    if (keys.right.pressed && player.position.x <1450) {
        player.velocity.x = 5
    }else if (keys.left.pressed && player.position.x >165) {
        player.velocity.x = -5

    } else
        player.velocity.x = 0
    if (keys.right.pressed) {
        platform_two.position.x -= 5
    } else if (keys.left.pressed) {
        platform_two.position.x += 5
    }
    if (player.position.y + player.height
        <= platform_two.position.y && player.position.y
        + player.height + player.velocity.y >= platform_two.position.y
        && player.position.x +
        player.whidth >= platform_two.position.x && player.position.x <= platform_two.position.x
        + platform_two.width
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