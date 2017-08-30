const Map = {
    preload() {

    },
    init () {
        music.stop()
        this.map = game.add.tilemap('tilemap')
        this.map.addTilesetImage('grand')
        this.map.addTilesetImage('collision16x16')
        this.map.addTilesetImage('water')
        
        util.addLayer.call(this, 'tilemap', game.global.SCALE)        
        this.layers['sea'].resizeWorld()
        this.layers['marker'].alpha = 0
        this.map.setCollision(427, true, this.layers['marker'])

        util.setPosition.call(this)
        
        this.entryPoints = []
        this.entry = {}
        this.map.objects.entry.forEach(pos => {
            this.entry[pos.name] = pos
            this.addEntryPoint(pos.name)
        }, this)     
    },
    create() {
        util.initWorld.call(this)
        util.initButton.call(this)
        util.initMainCharacter.call(this, game.global.SCALE, 7, 'startingPoint', 'knight1')
    },
    update() {
        util.updateCharacter.call(this)
        game.physics.arcade.collide(this.knight, this.layers.marker, function (){console.log('collide with bound')})
        this.entryPoints.some(entry => {
            return game.physics.arcade.collide(this.knight, entry, this.nextLevelHandler)
        })
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
        // entry.beginFill(0xFF3300)
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