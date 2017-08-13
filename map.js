const Map = {
    preload() {

    },
    create() {
        this.facing = 'idle'
        util.setScale(this)
        game.forceSingleUpdate = true;
        game.world.setBounds(0, 0, 1920, 1440)
        this.bg = game.add.sprite(0, 0, 'map_sea')
        this.knight = game.add.sprite(1400, 1200, 'knight')
        this.knight.SPEED = 2
        game.physics.enable(this.knight, Phaser.Physics.ARCADE);
        this.knight.body.collideWorldBounds = true
        this.knight.anchor.setTo(0.5)
        this.knight.animations.add('walk', Phaser.Animation.generateFrameNames('walk/Walk', 1, 10, '', 2), 10, true)
        this.knight.animations.add('idle', Phaser.Animation.generateFrameNames('idle/Idle', 1, 10, '', 2), 10, true)
        
        this.knight.scale.setTo(0.4)
        // game.camera.follow(this.knight)
        game.camera.follow(this.knight);
        cursors = game.input.keyboard.createCursorKeys();
        //create initial collision point for entering the first level
        this.level1_entry = game.add.sprite(1700, 1150, new Phaser.Circle(0, 0, 30));
        this.level1_entry.name = 'Level1'
        game.physics.enable(this.level1_entry, Phaser.Physics.ARCADE);
    },
    update() {
        this.knight.body.velocity.set(0);
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.knight.play('walk')
            if (cursors.left.isDown) {
                this.knight.scale.x = -0.4
                this.knight.body.velocity.x = -100;
            }
            if (cursors.right.isDown) {
                this.knight.body.velocity.x = 100;
                this.knight.scale.x = 0.4
            }
            if (cursors.up.isDown) {
                this.knight.body.velocity.y = -100;
            }
            if (cursors.down.isDown) {
                this.knight.body.velocity.y = 100;
            }
        } else {
            this.knight.play('idle')
        }

    },
    render () {
        game.physics.arcade.collide(this.knight, this.level1_entry, this.nextLevelHandler, null, this);
        // game.debug.geom(this.level1_entry,'#cfffff');
        // game.debug.body(this.knight)
        // game.debug.body(this.level1_entry)
    // game.debug.cameraInfo(game.camera, 500, 32);
    // game.debug.spriteCoords(this.knight, 32, 32);

    // game.debug.rectangle({x:400+game.camera.x,y:0+game.camera.y,width:1,height:600});
    // game.debug.rectangle({x:0+game.camera.x,y:300+game.camera.y,width:800,height:1});

    },
    nextLevelHandler (_, level) {
        console.log('collision')
        game.state.start(level.name)
    }
}