const util = {
    setScale (game) {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    
    centerGameObjects (objects) {
        objects.forEach(function (object) {
        object.anchor.setTo(0.5);
        })
    },

    initCharacter(gameScale, frame, positionName, key) {
        // let startingPoint = this.map.objects.position.filter(position => position.name == positionName)[0]
        let startingPoint = this.positions[positionName]
        let character = game.add.sprite(0, 0, key, frame)
        game.physics.arcade.enable(character)
        character.body.collideWorldBounds = true
        character.body.immovable = true
        character.body.allowGravity = false
        character.staticFrames = [1, 4, 7, 10]
        character.anchor.setTo(0.5, 0.5)
        character.scale.setTo(2)
        character.body.setSize(16, 20, 8, 0)
        character.x = (startingPoint.x + 8) * gameScale
        character.y = (startingPoint.y + 8) * gameScale
        character.SPEED = 2
        character.animations.add('right', [6, 7, 8], 10, true)
        character.animations.add('left', [3, 4, 5], 10, true)
        character.animations.add('down', [0, 1, 2], 10, true)
        character.animations.add('up', [9, 10, 11], 10, true)
        return character
    },

    initWorld () {
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.physics.arcade.setBoundsToWorld(true, true, true, true, false)
        cursors = game.input.keyboard.createCursorKeys()

    },

    initMainCharacter (gameScale, frame, positionName, key) {
        if (frame == undefined)
            frame = 6
        let character = util.initCharacter.call(this, gameScale, frame, positionName, key)        
        character.body.immovable = false
        
        game.camera.follow(character)
        
        character.body.collideWorldBounds = true
        return character
    },
    onAction (cb) {
        let rect
        let width = 25 * game.global.SCALE2
        let height = 16 * game.global.SCALE2
        switch (this.previousMove) {
            case 1:
                console.log('left')
                rect = new Phaser.Rectangle(this.knight.x  - width, this.knight.y - height/2, width, height)
                break
            case 2:
                console.log('right')
                rect = new Phaser.Rectangle(this.knight.x, this.knight.y - height/2, width, height)
                break
            case 3:
                console.log('up')
                rect = new Phaser.Rectangle(this.knight.x - height/2, this.knight.y - width , height, width)
                break
            case 0:
                console.log('down')
                rect = new Phaser.Rectangle(this.knight.x - height/2, this.knight.y, height, width)
                break
        }

        
        if (Phaser.Rectangle.intersects(rect, this.boss.body)) {
            console.log('intersect')
            if (cb) {
                this.knight.body.enable = false
                util.disableGamePadInput.call(this)
                cb.call(this)
            }
        }
        if (!this.map.getLayer('gem'))
            return
        let x = Math.floor((rect.x + width/2) / 32 / 2)
        let y = Math.floor((rect.y + height/2) / 32 / 2)
        if (this.previousMove == 3) {//up
            y = Math.floor((rect.y) / 32 / 2)
        } else if (this.previousMove == 0) { //down
            y = Math.floor((rect.y + height) / 32 / 2)
        }
        // console.log(x, y)
        let tile = this.map.getTile(x, y, 'gem')
        if (tile){
            // console.log(tile)
            this.map.removeTile(x, y, 'gem')
        }       
    },

    initButton (cb) {
        //button
        this.left = false
        this.down = false
        this.up = false
        this.right = false
        let _centerX = 150
        let _centerY = 600
        
        this.buttons = []
        this.buttons.push(game.add.button(_centerX, _centerY, 'left', null, this))
        this.buttons.push(game.add.button(_centerX, _centerY, 'right', null, this))
        this.buttons.push(game.add.button(_centerX, _centerY, 'up', null, this))
        this.buttons.push(game.add.button(_centerX, _centerY, 'down', null, this))
        let action = game.add.button(1100, _centerY, 'action', null, this)
        action.onInputUp.add(this.onAction? this.onAction.bind(this, cb): util.onAction.bind(this, cb))
        // util.onAction.bind(this, cb)
        this.action = action
        action.anchor.setTo(0.5, 0.5)
        action.scale.setTo(1.3)
        action.fixedToCamera = true
        
        this.buttons.forEach(button => {
            button.scale.setTo(1.3)
            switch (button.key) {
                case 'left':
                    button.anchor.setTo(1, 0.5)
                    button.x -= 10
                    break
                case 'right':
                    button.anchor.setTo(0, 0.5)
                    button.x += 10
                    break
                case 'up':
                    button.anchor.setTo(0.5, 1)
                    button.y -= 10
                    break
                case 'down':
                    button.anchor.setTo(0.5, 0)
                    button.y += 10
                    break
            }
            button.fixedToCamera = true
            util.addButtonEvents.call(this, button)
        }, this)
    },
    
    addButtonEvents (button) {
        button.events.onInputOver.add(function () {this[button.key] = true; this.previousKey = button.key}, this)
        button.events.onInputOut.add(function (){this[button.key] = false}, this)
        button.events.onInputDown.add(function () {this[button.key] = true}, this)
        button.events.onInputUp.add(function () {this[button.key] = false}, this)
    },
    disableGamePadInput () {
        this.buttons.forEach(button => {
            button.events.onInputOver.removeAll()
            button.events.onInputOut.removeAll()
            button.events.onInputDown.removeAll()
            button.events.onInputUp.removeAll()
        })
        cursors.left.enabled = false
        cursors.right.enabled = false
        cursors.down.enabled = false
        cursors.up.enabled = false

        this.action.events.onInputUp.removeAll()
        
    },
    enableGamePadInput (cb) {
        this.buttons.forEach(button => {
            util.addButtonEvents.call(this, button)
        })
        cursors.left.enabled = true
        cursors.right.enabled = true
        cursors.down.enabled = true
        cursors.up.enabled = true

        this.action.events.onInputUp.add(this.onAction? this.onAction.bind(this, cb): util.onAction.bind(this, cb), this)
    },
    updateCharacter () {

        this.knight.body.velocity.x = 0
        this.knight.body.velocity.y = 0
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown || this.left || this.right || this.up || this.down) {
            this.knight.play('walk')
            
            if (cursors.left.isDown || this.left) {
                this.knight.body.velocity.x = -game.global.SPEED
                this.knight.play('left')
                this.previousMove = 1
            }
            else if (cursors.right.isDown || this.right) {
                this.knight.body.velocity.x = game.global.SPEED
                this.knight.play('right')
                this.previousMove = 2
            }
            else if (cursors.up.isDown || this.up) {
                
                this.knight.body.velocity.y = -game.global.SPEED
                this.knight.play('up')
                this.previousMove = 3
            }
            else if (cursors.down.isDown || this.down) {
                
                this.knight.body.velocity.y = game.global.SPEED
                this.knight.play('down')
                this.previousMove = 0
            }
        } else {
            this.knight.animations.stop()
            this.knight.frame = this.knight.staticFrames[this.previousMove]
        }
        if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse){this.left = false; this.right = false; this.up = false; this.down = false }
    },

    addLayer(tilename, scale, cb, order) {
        let layers = game.cache._cache.tilemap[tilename].data.layers
        this.layers = {}
        for (let i = 0, length = layers.length; i < length; i++) {
            if (i == order)
                cb()
            if (layers[i].type !== 'objectgroup') {
                let layer =layers[i]
                let key = layer.name
                this.layers[key] = this.map.createLayer(key)
                this.layers[key].setScale(scale, scale)
            }
        }    
    },
    setPosition () {
        this.position = {}
        this.map.objects.position.forEach(pos => {
            this.position[pos.name] = pos
        }, this)
    }
}
