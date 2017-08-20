const Map = {
    preload() {

    },
    create() {
        music = game.add.audio('continent')
        music.play()
        game.physics.startSystem(Phaser.Physics.P2JS)
        this.facing = 'idle'
        util.setScale(this)
        game.forceSingleUpdate = true;
        game.world.setBounds(0, 0, 1920, 1440)
        this.bg = game.add.sprite(0, 0, 'map_sea')
        // this.knight = game.add.sprite(1400, 1200, 'knight')
        this.knight = game.add.sprite(1400, 1200, 'knight1', 6)
        this.knight.scale.setTo(2)
        this.knight.SPEED = 2

        
        // game.physics.enable(this.knight, Phaser.Physics.P2);
        util.centerGameObjects([this.knight])
        // this.knight.body.setSize(100, 200, 0, 0)
        this.knight.anchor.setTo(0.5)

        // this.knight.animations.add('walk', Phaser.Animation.generateFrameNames('walk/Walk', 1, 10, '', 2), 10, true)
        // this.knight.animations.add('idle', Phaser.Animation.generateFrameNames('idle/Idle', 1, 10, '', 2), 10, true)
        this.knight.animations.add('right', [6, 7, 8], 10, true)
        this.knight.animations.add('left', [3, 4, 5], 10, true)
        this.knight.animations.add('down', [0, 1, 2], 10, true)
        this.knight.animations.add('up', [9, 10, 11], 10, true)

        
        // this.knight.scale.setTo(0.4)
        // game.camera.follow(this.knight)
        game.camera.follow(this.knight);
        cursors = game.input.keyboard.createCursorKeys();
        //create initial collision point for entering the first level
        this.level1_entry = game.add.sprite(1600, 1000, 'level1_building');
        this.level1_entry.index = 0
        // game.physics.enable(this.level1_entry, Phaser.Physics.P2);

        game.physics.p2.enable([this.knight, this.level1_entry ], false);
        // this.knight.body.static = true
        game.physics.p2.restitution = 0
        this.knight.body.setZeroDamping()
	    this.knight.body.fixedRotation = true
        this.level1_entry.body.static = true

        this.knight.body.collideWorldBounds = true

        // this.knight.body.clearShapes();
        // this.knight.body.loadPolygon('physicsData', 'knight');
        this.knight.body.clearShapes()
        this.knight.body.setRectangle(45, 70, 0, 0, 0)
	    this.level1_entry.body.clearShapes()
        this.level1_entry.body.loadPolygon('physicsData', '1');

        this.knight.body.onBeginContact.add(this.nextLevelHandler, this);
    },
    update() {
        // this.knight.body.velocity.set(0);
        this.knight.body.setZeroVelocity();
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.knight.play('walk')
            if (cursors.left.isDown) {
                this.knight.body.moveLeft(100)
                this.knight.play('left')
            }
            else if (cursors.right.isDown) {
                this.knight.body.moveRight(100)
                this.knight.play('right')
            }
            else if (cursors.up.isDown) {
                
                this.knight.body.moveUp(100)
                this.knight.play('up')
            }
            else if (cursors.down.isDown) {
                
                this.knight.body.moveDown(100)
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