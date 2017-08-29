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
        let startingPoint = this.map.objects.position.filter(position => position.name == positionName)[0]
        let character = game.add.sprite(0, 0, key, frame)
        character.staticFrames = [1, 4, 7, 10]
        character.anchor.setTo(0.5, 0.5)
        character.scale.setTo(2)
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
        cursors = game.input.keyboard.createCursorKeys();
    },

    initMainCharacter (gameScale, frame, positionName, key) {
        if (frame == undefined)
            frame = 6
        this.knight = util.initCharacter.call(this, gameScale, frame, positionName, key)        
        
        game.camera.follow(this.knight)
        
        game.physics.arcade.enable(this.knight)
        
        this.knight.body.collideWorldBounds = true
        
        //button
        this.left = false
        this.down = false
        this.up = false
        this.right = false
        let _centerX = 150
        let _centerY = 600
        
        this.buttonGroup = []
        this.buttonGroup.push(game.add.button(_centerX, _centerY, 'left', null, this))
        this.buttonGroup.push(game.add.button(_centerX, _centerY, 'right', null, this))
        this.buttonGroup.push(game.add.button(_centerX, _centerY, 'up', null, this))
        this.buttonGroup.push(game.add.button(_centerX, _centerY, 'down', null, this))
        this.buttonGroup.forEach(button => {
            // button.scale.setTo(1.5)
            switch (button.key) {
                case 'left':
                    button.anchor.setTo(1, 0.5)
                    break
                case 'right':
                    button.anchor.setTo(0, 0.5)
                    break
                case 'up':
                    button.anchor.setTo(0.5, 1)
                    break
                case 'down':
                    button.anchor.setTo(0.5, 0)
                    break
            }
            button.fixedToCamera = true
            button.events.onInputOver.add(function () {this[button.key] = true}, this)
            button.events.onInputOut.add(function (){this[button.key] = false}, this)
            button.events.onInputDown.add(function () {this[button.key] = true}, this)
            button.events.onInputUp.add(function () {this[button.key] = false}, this)
        }, this)
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

    addLayer(tilename, scale) {
        let layers = game.cache._cache.tilemap[tilename].data.layers
        this.layers = {}
        for (let i = 0, length = layers.length; i < length; i++) {
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
