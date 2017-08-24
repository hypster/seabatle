const Map = {
    preload() {

    },
    init () {
        this.map = game.add.tilemap('tilemap')
        this.map.addTilesetImage('grand')
        this.map.addTilesetImage('collision16x16')
        this.map.addTilesetImage('water')
        // let sea = this.map.createLayer('sea')
        // sea.resizeWorld()
        let layers = game.cache._cache.tilemap.tilemap.data.layers
        // console.log(layers.length)
        // debugger
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
    },
    create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE)
        // music = game.add.audio('continent')
        // music.play()
        this.facing = 'idle'
        // util.setScale(this)
        // game.world.setBounds(0, 0, 1920, 1440)
        // this.bg = game.add.sprite(0, 0, 'map_sea')

        let startingPoint = this.map.objects.position[0]
        console.log(startingPoint.x,startingPoint.y)
        this.knight = game.add.sprite(startingPoint.x * game.global.SCALE + 64, startingPoint.y * game.global.SCALE + 64, 'knight1', 6)
        this.knight.scale.setTo(2)
        this.knight.SPEED = 2
        this.knight.anchor.setTo(0.5)
        
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
        

	    // this.level1_entry.body.clearShapes()
        // this.level1_entry.body.loadPolygon('physicsData', '1');
        // this.knight.body.onBeginContact.add(this.nextLevelHandler, this);
    },
    update() {
        // this.knight.body.velocity.set(0);
        game.physics.arcade.collide(this.knight, this.layers.marker)
        this.knight.body.velocity.x = 0
        this.knight.body.velocity.y = 0
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.knight.play('walk')
            if (cursors.left.isDown) {
                this.knight.body.velocity.x = -100
                this.knight.play('left')
            }
            else if (cursors.right.isDown) {
                this.knight.body.velocity.x = 100
                this.knight.play('right')
            }
            else if (cursors.up.isDown) {
                
                this.knight.body.velocity.y = -100
                this.knight.play('up')
            }
            else if (cursors.down.isDown) {
                
                this.knight.body.velocity.y = 100
                this.knight.play('down')
            }
        } else {
            this.knight.animations.stop()
        }

    },
    render () {
        
        // game.debug.geom(this.level1_entry,'#cfffff');
        // game.debug.body(this.knight)
        // game.debug.body(this.level1_entry)
    // game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(this.knight, 32, 32);

    },
    nextLevelHandler (levelBody, bodyB, shapeA, shapeB, equation) {
        console.log('collision')
        if (levelBody) {
            console.log(levelBody)
            if (game.global.LEVELS[levelBody.sprite.index] > -1) {
                game.state.states.Level.currentLevel = levelBody.sprite.index
                music.stop()
                game.state.start('Level')
            } else {
                console.log('you can\'t enter yet')
            }
        }
    }
}