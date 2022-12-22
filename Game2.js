const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var speler = new Image();
speler.src = "img/Eesrte game karakter.png"




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
            x: 500,
            y: 100
        }
        this.width = 300
        this.height = 20
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platform = new Platform()

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
    platform.draw()

    if (keys.right.pressed && player.position.x <1450) {
        player.velocity.x = 5
    }else if (keys.left.pressed && player.position.x >165) {
        player.velocity.x = -5

    } else
        player.velocity.x = 0
    if (keys.right.pressed) {
        platform.position.x -= 5
    } else if (keys.left.pressed) {
        platform.position.x += 5
    }
    if (player.position.y + player.height
        <= platform.position.y && player.position.y
        + player.height + player.velocity.y >= platform.position.y
        && player.position.x +
        player.whidth >= platform.position.x && player.position.x <= platform.position.x
        + platform.width
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