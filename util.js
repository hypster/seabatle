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

    initCharacter(gameScale, frame, positionName, key, hint) {
        // let startingPoint = this.map.objects.position.filter(position => position.name == positionName)[0]
        let startingPoint = this.position[positionName]
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
        if (hint)
            character.hint = util.createHint.call(this, {x: character.x, y: character.y - character.height/2 - 5})
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
        switch (Math.floor(this.knight.frame / 3)) {
            case 0:
                console.log('down')
                rect = new Phaser.Rectangle(this.knight.x - height/2, this.knight.y, height, width)
                break
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
        }

        
        if (Phaser.Rectangle.intersects(rect, this.boss.body)) {
            console.log('intersect')
            if (this.boss.hint)
                this.boss.hint.alpha = 0
            if (cb) {
                this.knight.body.enable = false
                util.disableGamePadInput.call(this)
                cb.call(this)
            }
        }
        // if (!this.map.getLayer('gem'))
        //     return
        // let x = Math.floor((rect.x + width/2) / 32 / 2)
        // let y = Math.floor((rect.y + height/2) / 32 / 2)
        // if (this.previousMove == 3) {//up
        //     y = Math.floor((rect.y) / 32 / 2)
        // } else if (this.previousMove == 0) { //down
        //     y = Math.floor((rect.y + height) / 32 / 2)
        // }
        // // console.log(x, y)
        // let tile = this.map.getTile(x, y, 'gem')
        // if (tile){
        //     // console.log(tile)
        //     this.map.removeTile(x, y, 'gem')
        // }       
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
    updateCharacter (character, cb) {
        character.body.velocity.x = 0
        character.body.velocity.y = 0
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown || this.left || this.right || this.up || this.down) {
            if (cb)
                cb()            
            character.play('walk')
            if (cursors.left.isDown || this.left) {
                character.body.velocity.x = -game.global.SPEED
                character.play('left')
                
            }
            else if (cursors.right.isDown || this.right) {
                character.body.velocity.x = game.global.SPEED
                character.play('right')
                
            }
            else if (cursors.up.isDown || this.up) {
                
                character.body.velocity.y = -game.global.SPEED
                character.play('up')
            }
            else if (cursors.down.isDown || this.down) {
                
                character.body.velocity.y = game.global.SPEED
                character.play('down')
                
            }
        } else {
            
            character.animations.stop()
            character.frame = character.staticFrames[Math.floor(character.frame / 3)]
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
    },
    createCollisionObj (key, offset) {
        offset = offset ? offset: 0
        //routePoint
        // debugger
        let routePoint =  this.position[key]
        let gr = game.add.graphics(0, 0)
        gr.drawRect(0, 0, routePoint.width, routePoint.height)
        gr.endFill()
        gr.anchor.setTo(0, 0)
        gr.x = (routePoint.x + offset) * game.global.SCALE
        gr.y = (routePoint.y + offset) * game.global.SCALE
        gr.scale.setTo(game.global.SCALE, game.global.SCALE)
        game.physics.arcade.enable(gr)
        gr.body.immovable = true
        return gr
    },
    moveCharacter(character, polyLines, reverse, offset, speed) {
        return new Promise((resolve, reject) => {
            speed = speed? speed: game.global.SPEED
            offset = offset? offset: 0
            this.inMove = true
            // console.log(polyLines)
            let polyline =  polyLines.polyline.slice()
            if (reverse)
                polyline = polyline.reverse()
            let _previousX = character.x
            let _previousY = character.y
            let tweens = []
            polyline.forEach ((point, i) => {
                if (!i)
                    return
                let x = point[0]
                let y = point[1]
                x = Math.round((polyLines.x + offset + x) * game.global.SCALE)
                y = Math.round((polyLines.y + offset + y) * game.global.SCALE)
                
             let _tween = game.add.tween(character)
            tweens.push(_tween)
            let getTweenValue = function () {
                let previousX = _previousX
                let previousY = _previousY
                let direction = ''
                let dist = 0
                let distX = x - previousX
                let distY = y -previousY
                if (Math.abs(distX) > Math.abs(distY)) {
                    dist = Math.abs(distX)
                    if (distX < 0) {
                        direction = 'left'
                    } else {
                        direction = 'right'
                    }
                } else {
                    dist = Math.abs(distY)
                    if (distY < 0) {
                        direction = 'up'
                    } else {
                        direction = 'down'
                    }
                }
    
                return {direction, duration: Math.round(dist / speed * 1000)}
                // previousMove = [(polyLines.x + x + 16) * game.global.SCALE, (polyLines.y + y + 16) * game.global.SCALE]
            }
            let tweenValue = getTweenValue()
            // console.log(tweenValue.duration)
            _tween.to({x, y}, tweenValue.duration, Phaser.Easing.Default, false)
                _previousX = x
                _previousY = y
               _tween.onStart.add(function () {
                //    console.log(`play animation ${tweenValue.direction}`)
                   character.animations.play(tweenValue.direction)
               }, this) 
    
               _tween.onComplete.add(function () {
                   character.animations.stop()
                   if (tweens.length) {
                       tweens.shift().start()
                   } else {
                       resolve()
                   }
               }, this)
            })
            tweens.shift().start()    
        })
    },
    createHint (hint, anim) {
        if (anim == undefined)
            anim = true
        let _hint = game.add.sprite(hint.x, hint.y, 'questionMark', 3)
        _hint.anchor.setTo(0.5, 0.5)
        _hint.scale.setTo(2.5, 2.5)
        _hint.name = hint.name
        function addTween () {
            let _twn = game.add.tween(_hint.scale).to({x: 2.7, y: 2.7}, 500, Phaser.Easing.Linear.InOut, false, 1000, 1, true).start()
            // let _twn = game.add.tween(_hint).to({y: '+5'}, 500, Phaser.Easing.Linear.InOut, false, 0, 0, true).start()
            _twn.onComplete.addOnce(addTween, this)
        }
        if (anim)
            addTween()
        return _hint
    },
    addFullScreenBtn() {
        let fullscreen = game.add.button(1290, 720, 'fullscreen', function () {
            if (game.scale.isFullScreen) {
                console.log('exit fullscreen')
                game.scale.stopFullScreen()
                fullscreen.loadTexture('fullscreen')
            } else {
                console.log('start fullscreen')
                game.scale.startFullScreen(false)
                fullscreen.loadTexture('exit-fullscreen')
            }
        }, this)
        fullscreen.anchor.setTo(0.5, 0.5)
        fullscreen.width = 50
        fullscreen.height = 50
        fullscreen.fixedToCamera = true
        return fullscreen
    },
    makeLine(str, maxLineWord) {
        let _str = str.split('\n')
        _str = _str.map((_p) => {
            return _p.split('')
        })
        for (let i = 0, length = _str.length; i < length; i++) {
            let p = _str[i]
            let num_space = 0
            for (let j = 0, _len = p.length; j < _len; j++) {
                if (j && j % maxLineWord == 0) {
                    p.splice(j + num_space, 0, '\n')
                    num_space++
                }
            }
        }
        let num_space = 0
        _str.forEach((p, i) => {
            if (!i)
                return
            _str.splice(i + num_space, 0, '\n')
            num_space++
        })
        _str = [].concat.apply([], _str)
        return _str.join('').split('\n')
    }
}
