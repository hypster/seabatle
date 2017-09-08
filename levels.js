let level1 = new Level(1)

let level2 = new Level(2)
let level3 = new Level(3)
// let level5 = new Level(5)

let _update = level1.update
level1.addTileMap = function () {
    this.map = game.add.tilemap('manor', 32, 32)
    this.addPosition()
    this.map.addTilesetImage('Castle', 'castle')
    this.map.addTilesetImage('grass', 'grass')
    this.map.addTilesetImage('market', 'market')
    this.map.addTilesetImage('trees1', 'trees')
    this.map.addTilesetImage('collison32x32', 'collision32x32')
    util.addLayer.call(this, 'manor', game.global.SCALE2, () => {
        level1.initCharacter()
        this.knight = util.initMainCharacter.call(this, game.global.SCALE2, 10, 'startingPoint', 'knight1')        
    }, 1)
    this.layers['ground'].resizeWorld()
    this.layers['marker'].alpha = 0
    this.map.setCollision(881, true, this.layers['marker'])
    this.map.setCollisionBetween(132, 133, true, this.layers['gem'], true)   
}
level1.preload = function () {

}
level1.initCharacter = function () {
    this.npc = game.add.group()
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 2, 'npc1', 'npc1'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 7, 'npc2', 'npc2'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'npc3', 'npc3'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier1', 'soldier'))
    this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier2', 'soldier'))
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE2, 1, 'duke', 'duke'))
}
level1.update = function () {
    _update.call(this)
    game.physics.arcade.collide(this.knight, this.layers.gem)
}

level2.addTileMap = function () {
    this.map = game.add.tilemap('dock', 32, 32)
    this.addPosition()
    this.map.addTilesetImage('Ship_Bfix', 'Ship_Bfix')
    this.map.addTilesetImage('collision32x32', 'collision32x32')
    this.map.addTilesetImage('ladder', 'ladder')
    this.map.addTilesetImage('ship', 'ship')
    // this.map.addTilesetImage('water', 'water', 16, 16)
    
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

    // this.collision = game.add.group()
    // this.collision.enableBody = true
    // this.map.createFromObjects('barO', 'bar', 'collision16x16', null, true, false, this.collision)
    // this.collision.children.forEach(col => {
    
    //     game.physics.arcade.enable(col)
    //     col.body.immovable = true
    // })
    
}

level2.initCharacter = function () {
    this.npc = game.add.group()
    // this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 2, 'npc1', 'npc1'))
    // this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 7, 'npc2', 'npc2'))
    // this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'npc3', 'npc3'))
    // this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier1', 'soldier'))
    // this.npc.add(util.initCharacter.call(this, game.global.SCALE2, 1, 'soldier2', 'soldier'))
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE2, 1, 'boss', 'builder'))
}

level2.preload = function () {

}


level3.addTileMap = function () {
    this.map = game.add.tilemap('bar', 16, 16)
    this.addPosition()
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
    this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE2, 1, 'warrior', 'warrior'))
}

class Level5 extends Level {
    constructor() {
        super()
        this.level = 5
    }

    addTileMap () {
        this.map = game.add.tilemap('cave_inside', 16, 16)
        this.addPosition()
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
        let pt = this.positions['hitPoint']
        this.scene = this.add.sprite(pt.x * game.global.SCALE, pt.y * game.global.SCALE, 'collision32x32')
        this.scene.alpha = 0
        this.scene.width = pt.width * game.global.SCALE
        this.scene.height = pt.height * game.global.SCALE
        game.physics.arcade.enable(this.scene)
        this.scene.body.immovable = true
        
        this.scaleFactor = game.global.SCALE
        

        this.signal = new Phaser.Signal()
        this.signal.addOnce(this.walkIntoPlace, this)
    
        // this.interacted = false
    }
    walkIntoPlace () {
        
        console.log('in walk');
        let scale = this.scaleFactor ? this.scaleFactor: game.global.SCALE;
        this.autoMode = true;
        this.previousMove = 10;
        let target = this.positions['meetingPoint'];
        let stop = this.positions['stopPoint']
        
        let _nextScene = () => {
            
            console.log('in nextscene')
            this.knight.animations.stop(null, true)
            this.knight.frame = 10
            this.autoMode = false
            game.time.events.add(1000, this.startDialog, this)
        };
        let velocity = 200;
        // debugger
        let tweenX1 = game.add.tween(this.knight);
        let tweenX2 = game.add.tween(this.knight);
        let tweenY = game.add.tween(this.knight);
        let duration_x1 = Math.round(Math.abs(this.knight.x - (stop.x + 8) * scale) / velocity * 1000);
        let duration_x2 = Math.round(Math.abs(stop.x - (target.x + 8) * scale) / velocity * 1000);
        let duration_y = Math.round(Math.abs(this.knight.y - (target.y + 8) * scale) / velocity * 1000);
        let distanceX1 = Math.round((stop.x + 8) * scale)
        let distanceX2 = Math.round((target.x + 8) * scale)
        let distanceY = Math.round((target.y + 8) * scale)
        // debugger
        // console.log(target.x * scale, target.y * scale)
        tweenY.onComplete.addOnce(() => {
            console.log('tween y complete')
            this.knight.animations._anims.left.play(10, true)
            tweenX2.start()
        });
        tweenX1.onComplete.addOnce(() => {
            console.log('tween x complete')
            this.knight.animations._anims.up.play(10, true)
            tweenY.start()    
        });
        tweenX2.onComplete.addOnce(() => {
            console.log('tween x2 complete')
            _nextScene()
        })
        this.knight.animations._anims.left.onStart.addOnce(() => {
            console.log('left anim started')
            tweenX1.start()
        });
        
        tweenX1.to({x: distanceX1}, duration_x1, Phaser.Easing.Default, false, 0, 0, false)
        tweenY.to({y: distanceY}, duration_y, Phaser.Easing.Default, false, 0, 0, false)
        tweenX2.to({x: distanceX2}, duration_x2, Phaser.Easing.Default, false, 0, 0, false)
        this.knight.animations._anims.left.play(10, true)
    }

    onEnterScene () {
        console.log('enter scene')
        this.walkIntoPlace()
        
    }
    initCharacter () {
        this.npc = game.add.group()
        this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE, 4, 'boss', 'bartender'))
    }
    
    update () {
        super.update()
        game.physics.arcade.collide(this.knight, this.scene, () => {
            console.log('collide')
            this.signal.dispatch()
        })
        // if (Phaser.Rectangle.intersects(this.knight.body, this.hitPoint)) {
        //     this.scene.dispatch()
        //     this.autoMode = true
        //     // this.scene.dispose()
        // }
    }
    
}

let level5 = new Level5(5)


let _update5 = level5.update()
// level5.addTileMap = function () {
//     this.map = game.add.tilemap('cave_inside', 16, 16)
//     this.addPosition()
//     this.map.addTilesetImage('objects', 'objects')
//     this.map.addTilesetImage('cave', 'cave')
//     this.map.addTilesetImage('collision16x16', 'collision16x16')
//     util.addLayer.call(this, 'cave_inside', game.global.SCALE, () => {
//         level5.initCharacter()
//         this.knight = util.initMainCharacter.call(this, game.global.SCALE, 2, 'startingPoint', 'knight1')
//     }, 3)
//     this.layers['black'].resizeWorld()
//     this.layers['marker'].alpha = 0
//     this.map.setCollision(386, true, this.layers['marker'])
//     let pt = this.positions['hitPoint']
//     this.hitPoint = new Phaser.Rectangle(pt.x * game.global.SCALE, pt.y * game.global.SCALE, pt.width * game.global.SCALE, pt.height* game.global.SCALE)
//     this.scene = new Phaser.Signal()

//     this.scaleFactor = game.global.SCALE

//     this.scene.addOnce(level5.onEnterScene, this)

//     this.interacted = false
// }



// level5.onEnterScene = function () {
//     console.log('enter scene')
    
// }

// level5.initCharacter = function () {
//     this.npc = game.add.group()
//     this.npc.add(this.boss = util.initCharacter.call(this, game.global.SCALE, 4, 'boss', 'bartender'))
// }

// level5.update = function () {
//     if (!this.interacted) {
//         console.log('inside')
//         _update5.call(this)
//         if (Phaser.Rectangle.intersects(this.knight.body, this.hitPoint)) {
//             this.scene.dispatch()
//             this.interacted = true
//             // this.scene.dispose()
//         }
//     }
    
// }

// let _render = level5.render
// level5.render = function () {
//     _render.call(this)
    
// }
// const Level = {
//     preload() {
//         this.level = 1

//         this.finish = false
//         // i = 0
//     },
//     create() {
//         music = game.add.audio('castle')
//         music.play()
        
//         let _obj = JSON.parse(game.cache.getText('level' + this.level + '_text'))

//         this.dialog = _obj.dialog

//         this.endDialog = _obj.endDialog

//         this.questions = _obj.questions

//         this.q_set = null

//         //对话框组件
//         this.dialogGroup  

//         this.text_padding = 10

//         this.lineIndex = 0

//         this.wordIndex = 0

//         this.line = ''

//         score = this.score = 0


//         this.style = {
//             font: "28px custom", fill: "#000",
//             boundsAlignH: "left",
//             boundsAlignV: "top",
//             align: 'left',
//         }
//         util.setScale(this)
        
    
//         this.bg = game.add.sprite(700, game.global.DURATION, 'level1_dialog_bg')

//         util.centerGameObjects([this.bg])

//         game.world.setBounds(0, 0, 1334, 750)

        
//         // this.startQuiz()
//         this.rollCamera(this.startDialog) 
//     },

//     update() {


//     },
//     render() {
//         game.debug.geom(this.prompt, 'rgba(255,0,0,0.5)')
//         game.debug.cameraInfo(game.camera, 0, 0)
//         game.debug.geom(this.textGroup)
//     },
//     rollCamera (cb) {
//         let x_tween = game.add.tween(this.bg)
//         let y_tween = game.add.tween(this.bg)
//         let scale_tween = game.add.tween(this.bg.scale)
//         x_tween.to({x: game.world.centerX - 80}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
//         x_tween.onComplete.addOnce(() => {
//             y_tween.to({y: game.world.centerY - 180}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
//             y_tween.onComplete.addOnce(() => {
//                 let position_tween = game.add.tween(this.bg)
//                 position_tween.to({y: this.bg.y - 140}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
//                 scale_tween.to({ x: 1.5, y: 1.5 }, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
//             })
//         })
        
//         scale_tween.onComplete.addOnce(() => game.time.events.add(game.global.DURATION, cb, this), this) 
//     },

//     startDialog() {
//         this.dialogGroup = game.add.group()
        
//         //对话框对象
//         this.dialogBox = game.add.sprite(0, 0, 'dialog_box')
//         // let _expectedW = game.width * 2/3
//         // this.dialogBox.scale.setTo(_expectedW / this.dialogBox.width)
//         this.dialogBox.x = (game.width - this.dialogBox.width)/2
//         this.dialogBox.y = game.height - this.dialogBox.height - 20
//         // this.dialogBox = game.add.sprite((game.width - _w) / 2, game.height - _h - 20, 'dialog_box')
        
//         this.dialogGroup.add(this.dialogBox)
//         // 当前对话人物图片
//         this.currentFacial = game.add.sprite(this.dialogBox.x, this.dialogBox.y, 'hero_facial')
//         this.dialogGroup.add(this.currentFacial)

//         // 当前对话信息
//         this.current
//         let textGroup = game.add.group()
//         this.dialogGroup.add(textGroup)
//         var style = {
//             font: "28px custom", fill: "#fff",
//             boundsAlignH: "left",
//             boundsAlignV: "top",
//             align: 'left',
//         };
//         var nameStyle = Object.assign({}, style, { font: "32px custom", fill: "#bd865d" })
//         //当前对话文字对象
//         this.text = game.add.text(0, 0, '', style);
//         textGroup.add(this.text)
//         this.text.lineSpacing = 5
//         this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
//         this.text.setTextBounds(
//             this.dialogBox.x + this.currentFacial.width + this.text_padding,
//             this.dialogBox.y + 74,
//             this.dialogBox.width - this.currentFacial.width - 5 * this.text_padding,
//             this.dialogBox.height - 6 * this.text_padding
//         )

//         // 当前人物名字对象
//         this.speakerName = game.add.text(this.dialogBox.x + this.currentFacial.width + this.text_padding, this.dialogBox.y + 30, '', nameStyle)
//         textGroup.add(this.speakerName)
//         //提示符对象
//         this.prompt = game.add.image(this.dialogBox.x + this.dialogBox.width - 80, this.dialogBox.y + this.dialogBox.height - 42, 'dialog_prompt')
//         this.prompt.alpha = 0
//         this.dialogGroup.add(this.prompt)

//         //载入对话信息
//         this.nextDialog()

//     },

//     nextDialog() {
//         //当前行数
//         this.lineIndex = 0
//         //当前文本信息{人物名, 人物脚本}
//         let current = this.dialog.shift()
//         //脚本
//         let _text = current.text
        
//         this.speakerName.text = current.name
        
//         this.text.text = ''
//         this.currentFacial.destroy()
//         this.currentFacial = game.add.sprite(this.dialogBox.x, this.dialogBox.y, current.key + '_facial')
//         this.dialogGroup.add(this.currentFacial)
//         if (current.x) {
//             this.currentFacial.x = this.dialogBox.x + current.x
//         }
//         if (current.y) {
//             this.currentFacial.y = this.dialogBox.y + current.y
//         }
//         //对话拆分数组
//         this.lines = this.makeLine(_text, game.global.LINE_WORDS)
//         this.nextLine()
//     },
//     //["each line ", "each line"]
//     makeLine(str, maxLineWord) {
//         let _str = str.split('\n')
//         _str = _str.map((_p) => {
//             return _p.split('')
//         })
//         for (let i = 0, length = _str.length; i < length; i++) {
//             let p = _str[i]
//             let num_space = 0
//             for (let j = 0, _len = p.length; j < _len; j++) {
//                 if (j && j % maxLineWord == 0) {
//                     p.splice(j + num_space, 0, '\n')
//                     num_space++
//                 }
//             }
//         }
//         let num_space = 0
//         _str.forEach((p, i) => {
//             if (!i)
//                 return
//             _str.splice(i + num_space, 0, '\n')
//             num_space++
//         })
//         _str = [].concat.apply([], _str)
//         return _str.join('').split('\n')
//     },

//     nextLine() {
//         //对话结束注册tap事件
//         if ((this.lineIndex && this.lineIndex % game.global.MAX_LINE == 0) || this.lineIndex == this.lines.length) {
//             this.promptTween()
//             game.input.onTap.addOnce(this.onTap, this)
//         } else {
//             let line = this.lines[this.lineIndex].split('')
//             game.time.events.repeat(game.global.WORD_DELAY, line.length, this.nextWord, this, line);
//             this.lineIndex++
//         }
//     },
//     nextWord(line) {
//         this.text.text = this.text.text.concat(line[this.wordIndex]);
//         this.wordIndex++;
//         if (this.wordIndex === line.length) {
//             this.wordIndex = 0
//             this.text.text = this.text.text.concat('\n')
//             game.time.events.add(game.global.LINE_DELAY, this.nextLine, this);
//         }
//     },
//     promptTween() {
//         this.prompt.alpha = 1
//         this.tween_prompt = game.add.tween(this.prompt).to({ y: this.prompt.y + 2 }, 100, Phaser.Easing.Bounce.InOut, false, 100, 3, true).start()
//         this.tween_prompt.onComplete.addOnce(this.promptTween, this)
//     },
//     onTap() {//对话框文字显示完成后需要加载的内容，游戏主要节点
//         if (this.finish) {
//             return game.state.start('Map')
//         }
//         game.input.onTap.remove(this.onTap, this)
//         game.tweens.remove(this.tween_prompt)
//         this.prompt.alpha = 0
//         this.text.text = ''
//         //所有会话结束进入问答环节
//         if (!this.dialog.length) {
//             this.lineIndex = 0
//             console.log('you finished all level 1 dialog')
//             if (!this.q_set)
//                 this.q_set = this.loadQuestionSet()
//             if (!this.q_set) {
//                 this.lineIndex = 0
//                 if (this.score < 8) {
//                     this.dialog = this.endDialog.failure
//                 } else {
//                     this.dialog = this.endDialog.success
//                 }
//                 this.text.clearColors()
//                 this.finish = true
//                 this.nextDialog()
        
//             } else {
//                 let _t = game.add.tween(this.dialogGroup).to({alpha: 0}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
//                 _t.onComplete.add(function () { 
//                     this.startQuiz()
//                 }, this)
//             }
//             // this.startQuiz()
//         }
//         //加载剩余会话
//         else if (this.lines.length != this.lineIndex) {
//             this.lines.splice(0, this.lineIndex)
//             this.lineIndex = 0
//             this.nextLine()
//         //当前会话结束
//         } else {
//             this.lineIndex = 0
//             console.log('you finished the all the lines')
//             this.nextDialog()
//         }
        
//     },
//     startQuiz () {
//         // this.currentMode = ''
//         this.currentAnswer = []
//         //问答框
//         let quizBox = this.quizBox = game.add.image(0, 0, 'quiz_box')
//         quizBox.scale.setTo(1.5)
//         quizBox.alpha = 0
        
//         this.quizGroup = game.add.group()
//         this.quizGroup.x = game.world.centerX - quizBox.width/2
//         this.quizGroup.y = 0
//         this.quizGroup.scale.setTo(1.1)
//         this.quizGroup.add(this.quizBox)

//         // let q_set = this.loadQuestionSet()

//         // if (!this.q_set) {
//         //     console.log('no more questions')
//         //     debugger
//         //     if (this.score < 8) {
//         //         this.dialog = this.endDialog.failure
//         //     } else {
//         //         this.dialog = this.endDialog.success
//         //     }
//         //     return this.startDialog()
//         //     // return this.nextDialog()
//         // }

//         this.q_set.question = this.makeLine(this.q_set.question, game.global.QUIZ_LINE_WORDS).join('\n')
//         //text group
//         let textGroup = game.add.group()
//         this.textGroup = textGroup
        
//         this.quizGroup.add(textGroup)
//         quizText = game.add.text(this.quizBox.x + 100, 0, this.q_set.question, this.style)
//         textGroup.add(quizText)
//         //当前对话文字对象
//         quizText.lineSpacing = 5
//         //
//         this.buttonGroup = game.add.group()
//         this.textGroup.add(this.buttonGroup)
            
            
//         this.loadOption(this.q_set)
//         // this.buttonGroup = this.loadOptionButtons()
//         let submitGroup = this.submitGroup = game.add.group()
//         this.quizGroup.add(submitGroup)
//         let submit = game.add.button(0, 0,  'button_submit', null, this, 1, 1, 0, 1, submitGroup)
//         submit.scale.setTo(2)
//         submit.x =  this.quizBox.x + this.quizBox.width/2 - submit.width/2
//         submit.y = this.quizBox.y + this.quizBox.height - 84 - submit.height/2
//         submit.onInputUp.addOnce(this.onsubmit, this)
//         txt = game.add.text(0 , 2, '确定', Object.assign({}, this.style, {font: '28px custom', boundsAlignH: "center",
//         boundsAlignV: "middle",
//         align: 'center',
//         fill: '#dfcab0'
//         }), submitGroup)
//         txt.setTextBounds(submit.x, submit.y, submit.width, submit.height)

//         this.setTitle()
        
//         this.quizGroup.setAll('alpha', 0)
//         let alpha_tween = game.add.tween(this.quizBox)
//         alpha_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
//         let text_tween = game.add.tween(textGroup)
//         let submit_tween = game.add.tween(submitGroup)
//         // let button_tween = game.add.tween(this.buttonGroup)
//         alpha_tween.onComplete.add(function () {
//             text_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
//             submit_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
//             // button_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
//         })
    
//     },

//     setTitle () {
//         let title = game.add.image(0, 0, 'title')
//         this.submitGroup.add(title)
//         title.scale.setTo(0.6)
//         title.x = this.quizBox.x + this.quizBox.width/2 - title.width/2
//         title.y = this.quizBox.y + 50
//         title_text = game.add.text(0, 0, '', Object.assign({}, this.style,  {font: '18px custom', boundsAlignH: "center",
//         boundsAlignV: "middle",
//         align: 'center',
//         fill: '#dfcab0'
//         }), this.submitGroup)
//         title_text.setTextBounds(title.x, title.y, title.width, title.height)

//         switch (this.currentMode) {
//             case 'single':
//                 title_text.text = '单选题'
//                 break
//                 case 'multiple':
//                 title_text.text = '多选题'
//                 break
//                 case 'truth':
//                 title_text.text = '判断题'
//                 break
//             }
//     },
  
//     addButton (x, y, cnt) {
//         let button = game.add.button(x, y, 'buttons', 0)
//         button.inputEabled = true
//         button.selected = false
//         button.index = cnt
//             //  Enable the hand cursor
//         button.input.useHandCursor = true;
//         button.onInputDown.add(this.onselect, this)
//         this.buttonGroup.add(button)
//         // buttonGroup.add(button)
//         this.optionButtons.push(button)

//     },
//     loadOption (q_set) {
//         let answer = q_set.answer
//         this.optionButtons = []
//         //shuffle选项
//         if (this.currentMode === 'single') {
//             this.currentCorrect = answer[0]
//             this.shuffle(answer)
//             this.currentOptions = answer
            
//         } else if (this.currentMode === 'truth') {
//             this.currentOptions = ["正确", '错误']
//             this.currentCorrect = answer? '正确': '错误'
//         }
//          else if(this.currentMode === 'multiple') {
//             this.currentCorrect = []
//             this.currentOptions = []
//             q_set.correct.forEach(k => {
//                 this.currentCorrect.push(answer[k])
//             })
//             for (let k in answer) {
//                 this.currentOptions.push(answer[k])
//                 this.shuffle(this.currentOptions)
//             }
//         }

//         let total = this.currentOptions.length
//         let cnt = 0
//         let ROW = Math.ceil(total/2)
//         let qBounds = this.textGroup.children[0].getBounds()
//         let _h = qBounds.height
//         console.log(_h)
//         let margin = 50
//         let _text
//         let a_optionText = []
//         let questionX = this.textGroup.children[0].x
//         for (let j = 0; j < ROW; j++) {
//             for (let i = 0; i < 2; i++) {
//                 cnt = j * 2 + i
//                 if (cnt > total -1) {
//                     break
//                 }
//                 if (total > 4) {
//                     _text = game.add.text(questionX + 24, _h + margin + cnt * 40, this.currentOptions[cnt], Object.assign({}, this.style, {font: '24px custom'}), this.textGroup)
//                     a_optionText.push(_text)
//                     this.addButton(_text.x - 30, _text.y, cnt)
//                 } else {
//                     _text = game.add.text(this.quizBox.x + i * 160,  _h + margin + j * 40, this.currentOptions[cnt], Object.assign({}, this.style, {font: '24px custom'}), this.textGroup)
//                     a_optionText.push(_text)
//                 }
//             }
//         }
        
//         if (total <= 4) {
//             let _totalW = a_optionText.slice(0, 2).reduce((prev, curr, index) => {return prev + curr.width}, 0) + 160
//             a_optionText.forEach((text, cnt) => {
//                 text.x += (this.quizBox.width - _totalW) / 2 + this.quizBox.width/10
//                 this.addButton(text.x - 30, text.y, cnt)
//             })
//         }
//         this.textGroup.y = this.quizBox.y + (this.quizBox.height - this.textGroup.height)/2
//     },
//     loadQuestionSet () {
//         let q_set = null
//         if (this.questions.single.length) {
//             q_set = this.questions.single.shift()
//             this.currentMode = 'single'
//         }
//         else if (this.questions.multiple.length) {
//             q_set = this.questions.multiple.shift()
//             this.currentMode = 'multiple'
//         } 
//         else if (this.questions.truth.length) {
//             q_set = this.questions.truth.shift()
//             this.currentMode = 'truth'
//         } 
//         return q_set
//     },
//     onselect (button) {
//         button.selected = !button.selected
//         console.log(button.selected)
//         if (this.currentMode !== 'multiple') {
//             this.optionButtons.forEach(b => {
//                 if (b.index !== button.index) {
//                     b.loadTexture('buttons', 0)
//                     b.selected = false
//                 }
//             })
//         }
//         console.log(`current button is ${button.index}, it is ${button.selected?'selected': 'not selected'}`)
//         if (button.selected) {
//             button.loadTexture('buttons', 3)
//         } else {
//             button.loadTexture('buttons', 0)
//         }
        
//         if (button.selected) {
//             if (this.currentMode !== 'multiple') {
//                 if (!this.currentAnswer.length) {
//                     this.currentAnswer.push(button.index)
//                 } else {
//                     this.currentAnswer = [button.index]
//                 }
//             } else {
//                 this.currentAnswer.push(button.index)
//             }
//         } else {
//             if (this.currentMode !== 'multiple') {
//                 this.currentAnswer = []
//             } else {
//                 let index = this.currentAnswer.findIndex(function (num) {num === button.index})
//                 this.currentAnswer.splice(index, 0)
//             }
//         }
//         console.log(this.currentAnswer)
//     },

//     onsubmit (button, pointer, isOver) {
//         console.log('onsubmit')
//         if (!isOver) 
//             return
//         let _t = game.add.tween(this.quizGroup)
//         // this.giveFeedBack()
//         _t.to({alpha: 0}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
//         _t.onComplete.add(() => {
//             this.quizGroup.destroy()
//             this.giveFeedBack()}, this)
//     },
//     giveFeedBack () {
//         let _t = game.add.tween(this.dialogGroup)
//         this.text.text = ''
//         _t.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
//         _t.onComplete.add(this.onComplete, this)
//     },
//     onComplete () {
//         //多选题逻辑单独
//         if (this.currentMode !== 'multiple') {
//             if (this.currentAnswer.length == 1 && this.currentOptions[this.currentAnswer[0]] == this.currentCorrect) {
//                 this.handleCorrect()
//             } else {
//                 this.handleWrong()
//             }
//         } else {
//             let correct = false
//             // debugger
//             if (this.currentAnswer.length === this.currentCorrect.length) {
//                 let _copy = [].concat(this.currentCorrect)
//                 let _a 
//                 while (_a = this.currentOptions[this.currentAnswer.pop()]) {
//                     let _i = _copy.findIndex(_item => _item === _a)
//                     if (_i == -1)
//                         break
//                     else {
//                         _copy.splice(_i, 1)
//                     }
//                 }
//                 if (!_copy.length) {
//                     correct = true
//                 }
//             } 
//             correct ? this.handleCorrect() : this.handleWrong()
//         }
//     },
//     handleCorrect () {
//         this.score++
//         this.text.clearColors()
//         let _previous = this.currentMode
//         this.q_set = this.loadQuestionSet()
//         let _current = this.currentMode
//         let _b = `答对了，小伙子我看好你, 但下面我还要再出几道`
//         let _length = _b.length
//         if (_previous != _current) {
//             this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}来考验考验你`, game.global.LINE_WORDS)
//         } else {
//             this.lines = this.makeLine('答对了，小伙子我看好你', game.global.LINE_WORDS)
//         }
//         if (_length) {
//             this.text.addColor('dfcab0', _length)
//             this.text.addColor('#fff', _length + 3)
//         }
//         this.nextLine()
//     },
    
//     handleWrong () {
//         this.text.clearColors()
//         let _previous = this.currentMode
//         this.q_set = this.loadQuestionSet()
//         let _current = this.currentMode
//         let _b = '你还是太嫩了，正确答案是'
//         let _length = _b.length
//         let _length2
//         let _length3
//         if (Array.isArray(this.currentCorrect)) {
//             _b = `${_b}${this.currentCorrect.join('、')}`
//         } else {
//             _b = `${_b}${this.currentCorrect}`
//         }
//         _length2 = _b.length
//         if (_previous != _current) {
//             _b = `${_b}, 下面我再出几道`
//             _length3 = _b.length
//             this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}来考验一下你，你的机会已经不多了`, game.global.LINE_WORDS)    
//         } else {
//             this.lines = this.makeLine(`${_b}`, game.global.LINE_WORDS)
//         }
//         this.text.addColor('red', _length)
//         this.text.addColor('#fff', _length2)
//         if (_length3) {
//             this.text.addColor('#dfcab0', _length3)
//             this.text.addColor('#fff', _length3 + 3)
//         }
//         this.nextLine()

//     },
     
//     shuffle (array) {
//         let i = array.length
//         let index
//         let temp
//         while (i > 0) {
//             index = Math.floor(Math.random() * i)
//             i--
//             temp = array[i]
//             array[i]  = array[index]
//             array[index] = temp
//         }
//      }
// }