const Map = {
    preload() {
    },
    init () {
        // music.stop()
        this.map = game.add.tilemap('bigmap')
        this.map.addTilesetImage('grand')
        this.map.addTilesetImage('collision16x16')
        this.map.addTilesetImage('water')
        this.map.addTilesetImage('mountains')
        this.map.addTilesetImage('questionMark')

        // util.setPosition.call(this)

        util.addLayer.call(this, 'bigmap', game.global.SCALE)        
        this.layers['sea'].resizeWorld()
        this.layers['marker'].alpha = 0
        this.map.setCollision(427, true, this.layers['marker'])
        util.setPosition.call(this)
        
        this.entryPoints = game.add.group()
        this.entry = {}
        this.map.objects.entry.forEach(pos => {
            this.entry[pos.name] = pos
            this.entryPoints.add(this.addCustomPoint(pos.name))
        }, this)

        this.routePoints = game.add.group()
        let _p = util.createCollisionObj.call(this, 'routePoint', 16)
        _p.route = this.position['landing0']
        _p.reverse = false
        this.routePoints.add(_p)
        _p = util.createCollisionObj.call(this, 'routePoint2', 16)
        _p.route = this.position['landing0']
        _p.reverse = true
        this.routePoints.add(_p)
       this.debug =  _p = util.createCollisionObj.call(this, 'beach', 16)
        _p.changeTexture = true
        _p.route = this.position['landing1']
        this.routePoints.add(_p)
         _p = util.createCollisionObj.call(this, 'beach2', 16)
        _p.changeTexture = true
        _p.route = this.position['landing2']
        this.routePoints.add(_p)
        _p = util.createCollisionObj.call(this, 'beach3', 16)
        _p.changeTexture = true
        _p.route = this.position['landing3']
        this.routePoints.add(_p)
        //hint
        this.hints = game.add.group()
        // debugger
        this.map.objects.hint.forEach(hint => {
            let _hint = util.createHint.call(this, {x: hint.x * game.global.SCALE, y: hint.y * game.global.SCALE})
            this.hints.add(_hint)
            _hint.alpha = 0
        })
        // debugger
        this.currentLevel = this.getCurrentLevel()
        this.getScores()
        let entryBody = this.entryPoints.children[this.currentLevel]
        util.createHint.call(this, {x: entryBody.x, y: entryBody.y})
        if (this.currentLevel == 3) {
            this.hints.children[0].alpha = 1
            this.hints.children[1].alpha = 1
        }
        if (this.currentLevel == 4) {
            this.hints.children[2].alpha = 1
        }
        
        util.addFullScreenBtn.call(this)

    },
    // createHint (hint) {
    //     let _hint = game.add.sprite(hint.x * game.global.SCALE, hint.y * game.global.SCALE, 'questionMark', 3)
    //     _hint.anchor.setTo(0.5, 0.5)
    //     _hint.scale.setTo(2.5, 2.5)
    //     _hint.name = hint.name
    //     function addTween () {
    //         let _twn = game.add.tween(_hint.scale).to({x: 3, y: 3}, 500, Phaser.Easing.Linear.InOut, false, 1000, 1, true).start()
    //         _twn.onComplete.addOnce(addTween, this)
    //     }
    //     addTween()
    //     return _hint
    // },
   
    create() {
        
        this.bgm = game.add.audio('field', 0.5, true)
        this.bgm.fadeIn(500)
        
        util.initWorld.call(this)
        util.setPosition.call(this)
        util.initButton.call(this)
        // debugger
        this.knight = util.initMainCharacter.call(this, game.global.SCALE, 7, 'startingPoint', 'knight1')
        // this.knight.anchor.setTo(0.5, 1)        
        let pos = JSON.parse(localStorage.getItem('pos'))
        if (pos) {
            // this.knight.x = pos.x - ((pos.radius + 10) * Math.cos(pos.angle))
            // this.knight.y =  pos.y - ((pos.radius + 10) * Math.sin(pos.angle))
            this.knight.x = pos.x
            this.knight.y =  pos.y
        }
        this.wave = game.add.audio('wave', 1, false)
        
    },
    update() {
        game.physics.arcade.collide(this.knight, this.routePoints, this.beforeMove, null, this)
        if (this.inMove)
            return
        
        util.updateCharacter.call(this, this.knight, () => {
                if (this.knight.key == 'shipSprite' && !this.wave.isPlaying) 
                    this.wave.play()
            }
        )
        game.physics.arcade.collide(this.knight, this.layers.marker)
        game.physics.arcade.collide(this.knight, this.entryPoints, this.nextLevelHandler, null, this)
        
    },
    render () {
        // game.debug.body(this.beach2)
        // game.debug.body(this.beach)
        // game.debug.geom(this.level1_entry,'#cfffff');

        // game.debug.body(this.knight)
        // game.debug.body(this.debug)

        // game.debug.body(this.level1_entry)
        // game.debug.body(this.routePoint)
    // game.debug.cameraInfo(game.camera, 500, 32);
    // game.debug.spriteCoords(this.knight, 32, 32);
    // game.debug.body(this.entryPoints[0], 'rgba(255,0, 0,0.5)')
    // game.debug.body(this.entryPoints[1], 'rgba(255,0, 0,0.5)')
    // game.debug.geom(this.entryPoints[0], 'rgba(255,0, 0,0.5)')
    // game.debug.body(this.castle, 'rgba(255,0, 0,0.5)')
    // game.debug.bodyInfo(this.castle, 100, 100)

    },
    getCurrentLevel () {
        // debugger
        let levels = JSON.parse(localStorage.getItem('levels'))
        if (!levels)
            levels = game.global.LEVELS
        let current = levels.length - 1
        for (let i = 0; i < levels.length; i++) {
            let level = levels[i]
            if (level != 1) {
                current = i - 1
                break
            }
        }
        return current
    },
    getScores () {
        let scores = JSON.parse(localStorage.getItem('scores'))
        game.global.SCORES = scores ? scores: game.global.SCORES
    },
    beforeMove (knight, point) {
        let reverse = false
        if (this.inMove)
            return
        // debuggerh
        if (point.changeTexture){
            if (this.currentLevel <= 1)
            return
            else {
                if (knight.key == 'knight1') {
                    fx = game.add.audio('offshore')
                    fx.play()
                    knight.loadTexture('shipSprite')
                    this.wave.play()
                } else {
                    fx = game.add.audio('offsea')
                    fx.play()
                    this.wave.stop()
                    knight.loadTexture('knight1')
                    reverse = true
                }
            }
        }
        if (point.reverse) {
            reverse = true
        }
        util.moveCharacter.call(this, this.knight, point.route, reverse, 16)
        .then(() => this.inMove = false)
    },


  
    nextLevelHandler (sprite, levelBody) {
        // console.log('collision')
        let pos = this.position[levelBody.key + 'Exit']
        let toSave = JSON.stringify({x: (pos.x + 16) * game.global.SCALE, y: (pos.y + 16) * game.global.SCALE})
        localStorage.setItem('pos', toSave)
        // console.log(`level is ${levelBody.level}`)
        if (game.global.LEVELS[levelBody.level - 1]) {
            // game.state.states.Level.currentLevel = levelBody.level
            this.bgm.stop()
            // console.log(`you enter level ${levelBody.level}`)
            game.state.start('level' + levelBody.level)
        } else {
            // console.log('you can\'t enter yet')
        }
    },
    addCustomPoint (key) {
        let entry = game.add.graphics(0, 0) 
        entry.key = key
        entry.level = game.global.ENTRYTOLEVEL[key]
        // console.log(key, entry.level)
        // entry.beginFill(0xFF3300)
        entry.drawRect(0, 0, this.entry[key].width, this.entry[key].height)
        entry.endFill()
        entry.scale.setTo(game.global.SCALE, game.global.SCALE)
        entry.x = this.entry[key].x * game.global.SCALE
        entry.y = this.entry[key].y * game.global.SCALE
        game.physics.arcade.enable(entry)
        entry.body.immovable = true
        return entry
    }
}