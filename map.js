const Map = {
    preload() {

    },
    init () {
        music.stop()
        this.map = game.add.tilemap('tilemap')
        this.map.addTilesetImage('grand')
        this.map.addTilesetImage('collision16x16')
        this.map.addTilesetImage('water')
        
        let layers = game.cache._cache.tilemap.tilemap.data.layers
        
        this.layers = {}
        for (let i = 0, length = layers.length; i < length; i++) {
            if (layers[i].type !== 'objectgroup') {
                let layer =layers[i]
                let key = layer.name
                this.layers[key] = this.map.createLayer(key)
                this.layers[key].setScale(game.global.SCALE, game.global.SCALE)
            }
        }    
        
        this.layers['sea'].resizeWorld()
        this.layers['marker'].alpha = 0
        this.map.setCollision(427, true, this.layers['marker'])
        this.position = {}
        this.map.objects.position.forEach(pos => {
            this.position[pos.name] = pos
        }, this)
        
        this.entryPoints = []
        this.entry = {}
        this.map.objects.entry.forEach(pos => {
            this.entry[pos.name] = pos
            this.addEntryPoint(pos.name)
        }, this)
        
    },
    create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE)
        // music = game.add.audio('continent')
        // music.play()
        this.facing = 'idle'
        
        let startingPoint = this.map.objects.position[0]
        this.knight = game.add.sprite(startingPoint.x * game.global.SCALE, startingPoint.y * game.global.SCALE, 'knight1', 6)
        this.knight.scale.setTo(2)
        this.knight.x += 64
        this.knight.y += 64
        this.knight.SPEED = 2
        
        this.knight.animations.add('right', [6, 7, 8], 10, true)
        this.knight.animations.add('left', [3, 4, 5], 10, true)
        this.knight.animations.add('down', [0, 1, 2], 10, true)
        this.knight.animations.add('up', [9, 10, 11], 10, true)
        
        game.camera.follow(this.knight)

        game.physics.arcade.setBoundsToWorld(true, true, true, true, false)
        cursors = game.input.keyboard.createCursorKeys();
        //create initial collision point for entering the first level
        
        // this.level1_entry = game.add.sprite(startingPoint.x + 100, startingPoint.y + 100, 'level1_building');
        // this.level1_entry.index = 0

        // game.physics.arcade.enable([this.knight, this.level1_entry], false);
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
            button.scale.setTo(1.5)
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

        
	    // this.level1_entry.body.clearShapes()
        // this.level1_entry.body.loadPolygon('physicsData', '1');
        // this.knight.body.onBeginContact.add(this.nextLevelHandler, this);
    },
    update() {
        // this.knight.body.velocity.set(0);
        game.physics.arcade.collide(this.knight, this.layers.marker, function (){console.log('collide with bound')})
        this.entryPoints.some(entry => {
            return game.physics.arcade.collide(this.knight, entry, this.nextLevelHandler)

        })
        // game.physics.arcade.collide(this.knight, )
        this.knight.body.velocity.x = 0
        this.knight.body.velocity.y = 0
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown || this.left || this.right || this.up || this.down) {
            this.knight.play('walk')
            if (cursors.left.isDown || this.left) {
                this.knight.body.velocity.x = -game.global.SPEED
                this.knight.play('left')
            }
            else if (cursors.right.isDown || this.right) {
                this.knight.body.velocity.x = game.global.SPEED
                this.knight.play('right')
            }
            else if (cursors.up.isDown || this.up) {
                
                this.knight.body.velocity.y = -game.global.SPEED
                this.knight.play('up')
            }
            else if (cursors.down.isDown || this.down) {
                
                this.knight.body.velocity.y = game.global.SPEED
                this.knight.play('down')
            }
        } else {
            this.knight.animations.stop()
        }
        if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse){this.left = false; this.right = false; this.up = false; this.down = false }
    },
    render () {
        
        // game.debug.geom(this.level1_entry,'#cfffff');
        // game.debug.body(this.knight)
        // game.debug.body(this.level1_entry)
    // game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(this.knight, 32, 32);
    // game.debug.body(this.entryPoints[0], 'rgba(255,0, 0,0.5)')
    // game.debug.body(this.entryPoints[1], 'rgba(255,0, 0,0.5)')
    // game.debug.geom(this.entryPoints[0], 'rgba(255,0, 0,0.5)')
    // game.debug.body(this.castle, 'rgba(255,0, 0,0.5)')
    // game.debug.bodyInfo(this.castle, 100, 100)

    },
    nextLevelHandler (sprite, levelBody) {
        console.log('collision')
        console.log(`level is ${levelBody.level}`)
        if (game.global.LEVELS[levelBody.level - 1] > -1) {
            // game.state.states.Level.currentLevel = levelBody.level
            music.stop()
            console.log(`you enter level ${levelBody.level}`)
            game.state.start('level' + levelBody.level)
        } else {
            console.log('you can\'t enter yet')
        }
    },
    addEntryPoint (key) {
        let entry = game.add.graphics(0, 0) 
        entry.key = key
        entry.level = game.global.ENTRYTOLEVEL[key]
        console.log(key, entry.level)
        entry.beginFill(0xFF3300)
        entry.drawRect(0, 0, this.entry[key].width, this.entry[key].height)
        entry.endFill()
        entry.scale.setTo(game.global.SCALE, game.global.SCALE)
        entry.x = this.entry[key].x * game.global.SCALE
        entry.y = this.entry[key].y * game.global.SCALE
        game.physics.arcade.enable(entry)
        entry.body.immovable = true
        this.entryPoints.push(entry)
        return entry
    }
}