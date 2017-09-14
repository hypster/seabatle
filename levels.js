let level1 = new Level(1)

let level2 = new Level(2)
let level3 = new Level(3)
let level4 = new Level(4)
let level5 = new Level(5)

let _update = level1.update
level1.addTileMap = function () {
    this.map = game.add.tilemap('manor', 32, 32)
    util.setPosition.call(this)
    this.map.addTilesetImage('Castle', 'castle')
    this.map.addTilesetImage('grass', 'grass')
    this.map.addTilesetImage('market', 'market')
    this.map.addTilesetImage('trees1', 'trees')
    this.map.addTilesetImage('collison32x32', 'collision32x32')
    this.map.addTilesetImage('coin', 'coin')
    util.addLayer.call(this, 'manor', game.global.SCALE2, () => {
        level1.initCharacter()
        this.knight = util.initMainCharacter.call(this, game.global.SCALE2, 10, 'startingPoint', 'knight1')        
    }, 1)

    this.layers['ground'].resizeWorld()
    this.layers['marker'].alpha = 0
    this.map.setCollision(881, true, this.layers['marker'])
    this.map.setCollisionBetween(132, 133, true, this.layers['gem'], true)  
    
    //coin group
    this.coins = game.add.group()
    this.map.objects.coin.forEach(coin => {
        let _coin = game.add.sprite(coin.x * game.global.SCALE2, coin.y * game.global.SCALE2, 'coin', 0)
        _coin.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true)
        _coin.animations.play('spin')
        game.physics.arcade.enable(_coin)
        _coin.body.immovable = true
        this.coins.add(_coin)        
    })
    
    
}

level1.initCharacter = function () {
    this.npc = game.add.group()
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 2, 'npc1', 'npc1'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 7, 'npc2', 'npc2'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'npc3', 'npc3'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier1', 'soldier'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier2', 'soldier'))
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE2, 1, 'duke', 'duke', true))
    
}
level1.update = function () {
    _update.call(this)
    game.physics.arcade.collide(this.knight, this.layers.gem)
    game.physics.arcade.collide(this.knight, this.coins, function (sprite, coin) {
        coin.kill()
    });
}

level2.addTileMap = function () {
    this.map = game.add.tilemap('dock', 32, 32)
    util.setPosition.call(this)
    this.map.addTilesetImage('Ship_Bfix', 'Ship_Bfix')
    this.map.addTilesetImage('collision32x32', 'collision32x32')
    this.map.addTilesetImage('ladder', 'ladder')
    this.map.addTilesetImage('ship', 'ship')
    this.map.addTilesetImage('water' ,'water')
    util.addLayer.call(this, 'dock', game.global.SCALE2, () => {
        level2.initCharacter()
        this.knight = util.initMainCharacter.call(this, game.global.SCALE2, 10, 'startingPoint', 'knight1')        
    }, 4)
    this.layers['sea'].resizeWorld()
    this.layers['marker'].alpha = 0
    this.layers['offset1'].cameraOffset.x = this.layers['offset1'].layer.offsetX
    this.layers['offset2'].cameraOffset.x = this.layers['offset2'].layer.offsetX
    this.map.setCollision(609, true, this.layers['marker'])
    this.map.setCollision(610, true, this.layers['sea'])    
}

level2.initCharacter = function () {
    this.npc = game.add.group()
    
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE2, 1, 'boss', 'builder', true))
}


level3.addTileMap = function () {
    this.map = game.add.tilemap('bar', 16, 16)
    util.setPosition.call(this)
    this.map.addTilesetImage('woodland_indoor_0', 'woodland1')
    this.map.addTilesetImage('woodland_indoor_x2', 'woodland2')
    this.map.addTilesetImage('woodland_indoor_x3', 'woodland3')
    this.map.addTilesetImage('collision16x16', 'collision32x32')
    // this.map.addTilesetImage('tilesetformattedupdate1', 'woodland4') 
    util.addLayer.call(this, 'bar', game.global.SCALE2, () => {
        level3.initCharacter()
        this.knight = util.initMainCharacter.call(this, game.global.SCALE2, 10, 'startingPoint', 'knight1')
    }, 1)
    this.layers['ground'].resizeWorld()
    this.layers['marker'].alpha = 0
    this.map.setCollision(1345, true, this.layers['marker'])
}

level3.initCharacter = function () {
    this.npc = game.add.group()
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 4, 'bartender', 'bartender'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 4, 'npc1', 'npc1'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 7, 'npc5', 'npc5'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'npc3', 'npc3'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier1', 'soldier'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier2', 'soldier'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier3', 'soldier'))
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE2, 1, 'warrior', 'warrior', true))
}

level4.addTileMap = function () {
    this.map = game.add.tilemap('castle', 16, 16)
    util.setPosition.call(this)
    console.log(this.positions)
    this.map.addTilesetImage('sewer_1', 'sewer_1')
    this.map.addTilesetImage('cave', 'cave')
    this.map.addTilesetImage('collision16x16', 'collision16x16')
    util.addLayer.call(this, 'castle', game.global.SCALE, () => {
        level4.initCharacter()
        this.knight = util.initMainCharacter.call(this, game.global.SCALE, 10, 'startingPoint', 'knight1')
    }, 3)
    this.layers['bg'].resizeWorld()
    this.layers['marker'].alpha = 0
    this.map.setCollision(689, true, this.layers['marker'])
    this.scaleFactor = game.global.SCALE
    this.routePoints = game.add.group()
    let _p = util.createCollisionObj.call(this, 'step', 0)
    this.debug = _p
    _p.route = this.position['route']
    this.routePoints.add(_p)

}


level4.initCharacter = function () {
    this.npc = game.add.group()
    this.npc.add(util.initCharacter.call(this, game.global.SCALE, 1, 'npc0', 'soldier'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE, 1, 'npc1', 'soldier'))
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE, 1, 'boss', 'oden'))
}
_update = level4.update


level4.update =  function () {
    game.physics.arcade.collide(this.knight, this.routePoints, function (knight, point) {
        if (this.inMove)
            return
        Promise.all(this.allMovements(knight, point))
        .then(() => {
            game.time.events.add(game.global.DURATION, () => {
                util.disableGamePadInput.call(this)
                this.inMove = false
                this.startDialog()
            }, this)
            
        })
        point.destroy()
    }, null, this)
    if (!this.inMove && !this.autoMode) {
        _update.call(this)
    }
}

level4.allMovements = function (knight, point) {
    return [util.moveCharacter.call(this, knight,point.route, false, 0, 500)]
}


level4.render = function () {
    game.debug.body(this.debug)
    game.debug.body(this.knight)
}


level5.addTileMap  = function () {
    this.map = game.add.tilemap('cave_inside', 16, 16)
    util.setPosition.call(this)
    this.map.addTilesetImage('objects', 'objects')
    this.map.addTilesetImage('cave', 'cave')
    this.map.addTilesetImage('collision16x16', 'collision16x16')
    util.addLayer.call(this, 'cave_inside', game.global.SCALE, () => {
        level5.initCharacter()
        this.knight = util.initMainCharacter.call(this, game.global.SCALE, 2, 'startingPoint', 'knight1')
    }, 3)
    this.layers['black'].resizeWorld()
    this.layers['marker'].alpha = 0
    this.map.setCollision(386, true, this.layers['marker'])
    this.routePoints = game.add.group()
    let _p = util.createCollisionObj.call(this, 'trigger', 0)
    _p.route = this.position['route']
    this.routePoints.add(_p)
    }
    
    
    level5.initCharacter = function () {
        this.npc = game.add.group()
        this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE, 6, 'boss', 'oden'))
    }

    level5.update = level4.update
    level5.allMovements = function (knight, point) {
        return [
            util.moveCharacter.call(this, knight,point.route, false, 0, 500),
            util.moveCharacter.call(this, this.boss, this.position['escapeRoute'], false, 0, 200)
        ]
    }
    


