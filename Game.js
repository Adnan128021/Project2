const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 1.5

class Player{
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30

    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

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

class platform {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.
            position.y, this.width, this.
        height)
    }
}

const player = new Player()
const platform = new platform()
player.draw()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.
        height)
    player.update()
    platform.draw()
    if (keys.right.pressed){
        player.velocity.x = 5
    }  else if (keys.left.pressed){
        player.velocity.x = -5
    } else player.velocity.x = 0
}


animate()

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            player.velocity.y -= 20
            break
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            player.velocity.y -= 20
            break
    }
})