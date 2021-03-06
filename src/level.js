class Level extends Phaser.State {
    constructor(level) {
        super()
        this.level = level
    }
    preload() {

    }
    create() {

        this.finish = false

        this.addTileMap()

        util.initWorld.call(this)

        util.initButton.call(this, this.walkIntoPlace)

        util.addFullScreenBtn.call(this)

        this.fetchAllText()

        this.q_set = null

        //对话框组件
        this.dialogGroup

        this.text_padding = 10

        this.lineIndex = 0

        this.wordIndex = 0

        this.line = ''

        this.score = 0

        this.style = {
            font: "28px custom", fill: "#000",
            boundsAlignH: "left",
            boundsAlignV: "top",
            align: 'left',
        }

        util.setScale(this)

        util.showLocationIndicator.call(this, game.global.LEVELNAME[this.level-1])
        
    }

    update() {
        game.physics.arcade.collide(this.knight, this.layers.marker)
        game.physics.arcade.collide(this.knight, this.npc)
        if (this.knight.x <= 32 || this.knight.x >= this.world.width - 32 || this.knight.y <= 32 || this.knight.y >= this.world.height - 32) {
            if (this.bgm) 
                this.bgm.stop()
            game.state.start('Map')
        }
        if (!this.autoMode) {
            util.updateCharacter.call(this, this.knight)
        }
    }
    render() {
        // game.debug.geom(rect, 'rgba(0, 255, 0, 0.5)')
        // game.debug.bodyInfo(this.knight, 20, 20)

        // game.debug.body(this.boss, 'rgba(0, 255, 0, 0.5)')
        // game.debug.body(this.knight, 'rgba(0,255,0,0.5)')
        // game.debug.body(this.knight, 'rgba(0,255,0,0.5)')
        // game.debug.geom(this.prompt, 'rgba(255,0,0,0.5)')
        // game.debug.cameraInfo(game.camera, 0, 0)
        // game.debug.geom(this.textGroup)
        // game.debug.geom(this.mask, 'red')
        // game.debug.body(this.mask, 'red')

    }


    fetchAllText(key) {
        let _obj = JSON.parse(game.cache.getText('level' + this.level + '_text'))
        key = key ? key : 'initial'
        if (key == 'initial' || key == 'monolog')
            this.dialog = _obj.dialog[key]
        else if (key == 'restart'){
            if (this.passed) {
                this.dialog = _obj.dialog[key]['success']
            } else
                this.dialog = _obj.dialog[key]['failure']
        }

        this.endDialog = _obj.endDialog

        this.questions = _obj.questions
        this.stats = _obj.stats
        // console.log(this.stats)
    }
    // addPosition () {
    //     this.positions = {}
    //     this.map.objects.position.forEach(pos => {
    //         this.positions[pos.name] = pos
    //     })
    // }
    walkIntoPlace() {
        this.bossFight = true
        if (this.bgm) {
            this.bgm.stop()
        }
        bgm = game.add.audio('dialog')
        bgm.fadeIn(2000)
        let scale = this.scaleFactor ? this.scaleFactor : game.global.SCALE2
        // this.previousMove = 10
        this.autoMode = true
        let pos = this.position['meetingPoint']

        let _pos1 = this.position['leftWalk']
        let _pos2 = this.position['rightWalk']
        let x = (pos.x + 8) * scale
        let y = (pos.y + 8) * scale
        let _x = this.knight.x
        let _y = this.knight.y
        let velocity = 100

        let left = false
        let right = false
        let bottom = false
        let top = false
        let _nextScene = () => {

            this.knight.animations.stop()
            // this.knight.frame = this.knight.staticFrames[Math.floor(this.knight.frame / 3)]
            this.knight.frame = 10
            this.autoMode = false
            game.time.events.add(1000, this.startDialog, this)
        }
        // debugger
        if (_x < this.boss.x)
            left = true
        else
            right = true
        if (_y < this.boss.y)
            top = true
        else
            bottom = true
        // console.log(`top ${top} right ${right} bottom ${bottom} left ${left}`)
        if (top) {
            //bypass route
            let t_x1 = game.add.tween(this.knight)
            let t_y = game.add.tween(this.knight)
            let t_x2 = game.add.tween(this.knight)
            let x1 = (_pos1.x + 8) * scale
            let y1 = (_pos1.y + 8) * scale
            let x2 = (_pos2.x + 8) * scale
            let y2 = (_pos2.y + 8) * scale
            t_x2.onComplete.addOnce(() => {
                // _nextScene()
                this.knight.animations.stop()
                // this.knight.frame = this.knight.staticFrames[Math.floor(this.knight.frame / 3)]
                this.knight.frame = 10
                this.autoMode = false
                game.time.events.add(1000, this.startDialog, this)
            })
            let duration_y = Math.round(Math.abs(_y - y) / velocity * 1000)
            t_y.to({ y }, duration_y, Phaser.Easing.Default, false, 0, 0, false)
            t_x1.onComplete.addOnce(() => {
                this.knight.animations.play('down', 10, true)
                t_y.start()
            })
            if (left) {
                //bypass _pos1
                let duration_x1 = Math.round(Math.abs(_x - x1) / velocity * 1000)
                let duration_x2 = Math.round(Math.abs(x1 - x) / velocity * 1000)
                t_x1.to({ x: x1 }, duration_x1, Phaser.Easing.Default, false, 0, 0, false)
                t_x2.to({ x }, duration_x2, Phaser.Easing.Default, false, 0, 0, false)
                t_y.onComplete.addOnce(() => {
                    this.knight.animations.play('right', 10, true)
                    t_x2.start()
                })
                this.knight.animations._anims.left.onStart.addOnce(() => {
                    t_x1.start()
                })
                this.knight.animations.play('left', 10, true)
            } else {
                //bypass _pos2
                let duration_x1 = Math.round(Math.abs(_x - x2) / velocity * 1000)
                let duration_x2 = Math.round(Math.abs(x2 - x) / velocity * 1000)
                t_x1.to({ x: x2 }, duration_x1, Phaser.Easing.Default, false, 0, 0, false)
                t_x2.to({ x }, duration_x2, Phaser.Easing.Default, false, 0, 0, false)
                t_y.onComplete.addOnce(() => {
                    this.knight.animations.play('left', 10, true)
                    t_x2.start()
                })
                this.knight.animations._anims.right.onStart.addOnce(() => {
                    t_x1.start()
                })
                this.knight.animations.play('right', 10, true)
            }
        } else {
            //direct route
            // debugger
            let duration_x_direct = Math.round(Math.abs(_x - x) / velocity * 1000)
            let duration_y_direct = Math.round(Math.abs(_y - y) / velocity * 1000)
            // console.log(duration_y_direct, duration_x_direct)
            let t_x = game.add.tween(this.knight)
            let t_y = game.add.tween(this.knight)
            t_x.to({ x }, duration_x_direct, Phaser.Easing.Default, false, 0, 0, false)
            t_y.to({ y }, duration_y_direct, Phaser.Easing.Default, false, 0, 0, false)

            t_x.onComplete.addOnce(() => {
                _nextScene()
            })
            this.knight.animations._anims.down.onStart.addOnce(() => {
                console.log('anim down start')
                t_y.start()
            })
            // t_x.start()
            if (left) {
                t_y.onComplete.addOnce(() => {
                    this.knight.animations.play('right', 10, true)
                    if (duration_x_direct < 10)
                        _nextScene()
                    else
                        t_x.start()
                })

            } else {
                t_y.onComplete.addOnce(() => {
                    this.knight.animations.play('left', 10, true)
                    if (duration_x_direct < 10) {
                        _nextScene()
                    } else
                        t_x.start()
                })
            }
            this.knight.animations.play('down', 10, true)
        }





        // this.autoMode = false
        // t.to({y: to}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DELAY, false, false)
        // let x_tween = game.add.tween(this.bg)
        // let y_tween = game.add.tween(this.bg)
        // let scale_tween = game.add.tween(this.bg.scale)
        // x_tween.to({x: game.world.centerX - 80}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
        // x_tween.onComplete.addOnce(() => {
        //     y_tween.to({y: game.world.centerY - 180}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
        //     y_tween.onComplete.addOnce(() => {
        //         let position_tween = game.add.tween(this.bg)
        //         position_tween.to({y: this.bg.y - 140}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
        //         scale_tween.to({ x: 1.5, y: 1.5 }, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
        //     })
        // })

        // scale_tween.onComplete.addOnce(() => game.time.events.add(game.global.DURATION, cb, this), this) 
    }

    startDialog() {
        this.dialogGroup = game.add.group()
        //对话框对象
        this.dialogBox = game.add.sprite(0, 0, 'dialog_box')

        this.dialogBox.x = game.world.camera.view.centerX - this.dialogBox.width / 2
        // this.dialogBox.y = game.height - this.dialogBox.height - 20
        this.dialogBox.y = game.world.camera.view.centerY + 100

        let mask = this.mask = game.add.graphics(this.dialogBox.x, this.dialogBox.y)
        //shapes on mask must be filled!
        mask.beginFill(0xff00000)
        let rect = this.rect = new Phaser.Rectangle(mask.x + 16, mask.y + 19, 1083, 222)
        // mask.drawRect(16, 19 - 200, 861, 222 + 200)
        mask.drawRect(16, 19 - 200, 1083, 222 + 200)

        this.dialogGroup.add(this.dialogBox)
        this.dialogGroup.add(mask)
        let textGroup = game.add.group()
        this.dialogGroup.add(textGroup)
        var style = {
            font: "28px custom", fill: "#fff",
            boundsAlignH: "left",
            boundsAlignV: "top",
            align: 'left',
        };
        var nameStyle = Object.assign({}, style, { font: "32px custom", fill: "#bd865d" })
        //当前对话文字对象
        this.text = game.add.text(0, 0, '', style);
        textGroup.add(this.text)
        this.text.lineSpacing = 5
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        // 当前人物名字对象
        this.speakerName = game.add.text(0, 0, '', nameStyle)
        textGroup.add(this.speakerName)
        //提示符对象

        this.prompt = game.add.image(this.dialogBox.x + this.dialogBox.width - 80, this.dialogBox.y + this.dialogBox.height - 20, 'dialog_prompt')
        this.prompt.alpha = 0
        this.dialogGroup.add(this.prompt)

        //载入对话信息
        this.nextDialog()

    }

    nextDialog() {
        //当前行数
        this.lineIndex = 0
        //当前文本信息{人物名, 人物脚本}
        let current = this.dialog.shift()
        //脚本
        let facing = ''
        let scale_factor = 1
        let _x_bound = 0
        let _y_bound = 0
        let _width_bound = 0
        let _height_bound = 0
        if (current.left) {
            facing = Phaser.BOTTOM_LEFT
            _x_bound = this.dialogBox.x + 280 + this.text_padding
            _y_bound = this.dialogBox.y + 74
            _width_bound = this.rect.width - 280
            _height_bound = this.dialogBox.height - 6 * this.text_padding
            this.prompt.x = this.dialogBox.x + this.dialogBox.width - 80
        }
        else {
            facing = Phaser.BOTTOM_RIGHT
            scale_factor = -1
            _x_bound = this.dialogBox.x + 4 * this.text_padding
            _y_bound = this.dialogBox.y + 74
            _width_bound = this.rect.width - 280
            _height_bound = this.dialogBox.height - 6 * this.text_padding
            this.prompt.x = this.dialogBox.x + 4 * this.text_padding
        }
        if (this.currentFacial) {
            this.currentFacial.destroy()
        }
        this.currentFacial = game.add.sprite(0, 0, current.key + '_facial')
        this.dialogGroup.add(this.currentFacial, true, 1)
        this.currentFacial.anchor.setTo(0.5, 1)

        this.currentFacial.alignIn(this.rect, facing, current.x ? current.x : 0, current.y ? current.y : 0)
        this.currentFacial.mask = this.mask
        if (current.scale) {
            this.currentFacial.scale.setTo(scale_factor * current.scale, current.scale)
        }

        let _text = current.text
        this.text.text = ''
        this.text.setTextBounds(
            _x_bound,
            _y_bound,
            _width_bound,
            _height_bound
        )

        this.speakerName.text = current.name
        this.speakerName.x = _x_bound
        this.speakerName.y = this.dialogBox.y + 30
        //对话拆分数组
        this.lines = this.makeLine(_text, game.global.LINE_WORDS)
        util.nextLine.call(this)
    }
    //["each line ", "each line"]
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

    // nextLine() {
    //     //对话结束注册tap事件
    //     if ((this.lineIndex && this.lineIndex % game.global.MAX_LINE == 0) || this.lineIndex == this.lines.length) {
    //         this.promptTween()
    //         game.input.onTap.addOnce(this.onTap, this)
    //     } else {
    //         let line = this.lines[this.lineIndex].split('')
    //         game.time.events.repeat(game.global.WORD_DELAY, line.length, this.nextWord, this, line);
    //         this.lineIndex++
    //     }
    // }
    // nextWord(line) {
    //     this.text.text = this.text.text.concat(line[this.wordIndex]);
    //     this.wordIndex++;
    //     if (this.wordIndex === line.length) {
    //         this.wordIndex = 0
    //         this.text.text = this.text.text.concat('\n')
    //         game.time.events.add(game.global.LINE_DELAY, this.nextLine, this);
    //     }
    // }
    promptTween() {
        this.prompt.alpha = 1
        this.tween_prompt = game.add.tween(this.prompt).to({ y: this.prompt.y + 2 }, 100, Phaser.Easing.Bounce.InOut, false, 100, 3, true).start()
        this.tween_prompt.onComplete.addOnce(this.promptTween, this)
    }
    onTap() {//对话框文字显示完成后需要加载的内容，游戏主要节点
        if (this.bossFight && this.finish && this.lines.length == this.lineIndex) {
            this.dialogGroup.alpha = 0
            this.afterQuiz()
            this.fetchAllText('restart')
            this.finish = false
            this.bossFight = false
            return
            // return game.state.start('Map')
        } else if (!this.bossFight && this.lines.length == this.lineIndex) {
            this.fetchAllText()
            util.enableGamePadInput.call(this, this.walkIntoPlace)
            this.dialogGroup.alpha = 0
            return 
        }
        game.input.onTap.remove(this.onTap, this)
        game.tweens.remove(this.tween_prompt)
        this.prompt.alpha = 0
        this.text.text = ''
        this.text.clearColors()
        //所有会话结束进入问答环节
        if (!this.dialog.length) {
            // console.log('you finished all level 1 dialog')
            if (this.lines.length != this.lineIndex) {
                // debugger
                let colors = {}
                for (let i = 0; i < this.text.colors.length; i++) {
                    if (this.text.colors[i]) {
                        colors[this.text.colors[i]] = i
                    }
                }
                // console.log(colors)
                let _red_start = colors['red']
                let _normal_start = colors['#fff']
                this.text.clearColors()
                // _red_start - this.lineIndex * game.global.LINE_WORDS
                // this.text.addColor('red', 0)
                // this.text.addColor('#fff', _normal_start - this.lineIndex * game.global.LINE_WORDS)
                this.lines.splice(0, this.lineIndex)
                this.lineIndex = 0
                util.nextLine.call(this)
            } else {
                this.lineIndex = 0
                if (!this.q_set)
                    this.q_set = this.loadQuestionSet()
                if (!this.q_set) { //题目答完
                    bgm.fadeOut(2000)
                    this.lineIndex = 0
                    if (this.score < game.global.PASS_SCORE) {
                        this.dialog = this.endDialog.failure
                        this.passed = false
                    } else {
                        this.dialog = this.endDialog.success
                        this.passed = true
                        this.openNextLevel()
                        let door = this.position['door']
                        if (door) {
                            let tile = this.map.getTile(Math.floor((door.x + 16) / 32), Math.floor((door.y + 16) / 32), 'marker')
                            tile.resetCollision()
                        }
                    }
                    this.text.clearColors()
                    this.finish = true
                    this.nextDialog()

                } else {
                    if (bgm.key !== 'quiz') {
                        bgm.stop()
                        bgm = game.add.audio('quiz', 0.5, true)
                        bgm.onDecoded.add(() => {
                            bgm.loopFull()
                        })
                    }
                    let _t = game.add.tween(this.dialogGroup).to({ alpha: 0 }, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
                    _t.onComplete.add(function () {
                        this.startQuiz()
                    }, this)
                }
                // this.startQuiz()
            }
        }
        //加载剩余会话
        else if (this.lines.length != this.lineIndex) {
            this.lines.splice(0, this.lineIndex)
            this.lineIndex = 0
            util.nextLine.call(this)
            //当前会话结束
        } else {
            this.lineIndex = 0
            // console.log('you finished the all the lines')
            this.nextDialog()
        }

    }
    afterQuiz() {
        if (this.passed) {
            fx = game.add.audio('levelup', 1.5, false)
            fx.play()
            this.showFeedback(true)
        } else {
            this.showFeedback(false)
        }
    }
    showFeedback(success) {
        // debugger

        let feedback = game.add.group()
        // 910, 1536,
        let _box = game.add.image(0, 0, 'feedback')

        _box.scale.setTo(2, 2)
        let onPress = function () {
            let _t = game.add.tween(feedback).to({ alpha: 0 }, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
            _t.onComplete.add(() => {
                feedback.destroy()
                this.score = 0
                util.enableGamePadInput.call(this, this.walkIntoPlace)
                this.knight.body.enable = true
                this.quizGroup.destroy(true)
                if (this.level == 3) {
                    this.fetchAllText('monolog')
                    this.startDialog()
                }
                if (this.level == 5) {
                    game.state.start('end')
                }
                if (!success) {
                    return game.state.start('Menu')
                }
                if (this.bgm) {
                    bgm.stop()
                    this.bgm.loopFull()
                }
            })
        }
        let _cross = game.add.button(0, 0, 'cross', onPress, this)
        _cross.anchor.setTo(0.5, 0.5)
        _cross.scale.setTo(2, 2)
        _cross.x = _box.width - _cross.width / 3
        _cross.y = _cross.height / 3
        feedback.add(_box)
        feedback.add(_cross)
        feedback.x = game.world.camera.view.centerX - _box.width / 2
        feedback.y = game.world.camera.view.centerY - _box.height / 2
        let that = this
        function addText(x, y, txt, style, colorStop) {
            let _txt = game.add.text(x, y, txt, Object.assign({}, that.style, style))
            _txt.x = (_box.width - _txt.width) / 2
            if (colorStop)
                colorStop.forEach(stop => {
                    _txt.addColor(stop[0], stop[1])
                })
            feedback.add(_txt)
        }
        let _title
        let _task
        if (success) {
            _title = '任务完成'
            _task = this.stats['success']
        } else {
            _title = '任务失败'
            _task = this.stats['failure']
        }
        addText(0, 60, _title, { fontSize: 36 })
        let correctNessStr = `你答对${this.score}/10题`
        addText(0, 120, `你答对${this.score}/10题`, null, [['red', 3], [this.style.fill, correctNessStr.length - 1]])
        let task = this.makeLine(_task, game.global.FEEDBACK_WORDS)
        addText(0, 240, task.join('\n'), { fontSize: 36 })
    }
    startQuiz() {

        // this.currentMode = ''
        this.currentAnswer = []
        //问答框
        let quizBox = this.quizBox = game.add.image(0, 0, 'quiz_box')
        quizBox.scale.setTo(1.3)
        quizBox.alpha = 0

        this.quizGroup = game.add.group()
        // this.quizGroup.x = game.world.centerX - quizBox.width/2
        this.quizGroup.x = game.world.camera.view.centerX - quizBox.width / 2 * 1.15
        this.quizGroup.y = game.world.camera.view.centerY - 340
        this.quizGroup.scale.setTo(1.1)
        this.quizGroup.add(this.quizBox)

        this.q_set.question = this.makeLine(this.q_set.question, game.global.QUIZ_LINE_WORDS).join('\n')
        //text group
        let textGroup = game.add.group()
        this.textGroup = textGroup

        this.quizGroup.add(textGroup)
        let quizText = game.add.text(this.quizBox.x + 100, 0, this.q_set.question, this.style)
        textGroup.add(quizText)
        //当前对话文字对象
        quizText.lineSpacing = 5
        //
        this.buttonGroup = game.add.group()
        this.textGroup.add(this.buttonGroup)


        this.loadOption(this.q_set)
        // this.buttonGroup = this.loadOptionButtons()
        let submitGroup = this.submitGroup = game.add.group()
        this.quizGroup.add(submitGroup)
        let submit = game.add.button(0, 0, 'button_submit', null, this, 1, 1, 0, 1, submitGroup)
        submit.scale.setTo(2)
        submit.x = this.quizBox.x + this.quizBox.width / 2 - submit.width / 2
        submit.y = this.quizBox.y + this.quizBox.height - 84 - submit.height / 2
        submit.onInputUp.addOnce(this.onsubmit, this)
        let txt = game.add.text(0, 2, '确定', Object.assign({}, this.style, {
            font: '28px custom', boundsAlignH: "center",
            boundsAlignV: "middle",
            align: 'center',
            fill: '#dfcab0'
        }), submitGroup)
        txt.setTextBounds(submit.x, submit.y, submit.width, submit.height)

        this.setTitle()

        this.quizGroup.setAll('alpha', 0)
        let alpha_tween = game.add.tween(this.quizBox)
        alpha_tween.to({ alpha: 1 }, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
        let text_tween = game.add.tween(textGroup)
        let submit_tween = game.add.tween(submitGroup)
        // let button_tween = game.add.tween(this.buttonGroup)
        alpha_tween.onComplete.add(function () {
            text_tween.to({ alpha: 1 }, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
            submit_tween.to({ alpha: 1 }, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
            // button_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
        })

    }

    openNextLevel() {
        // let currentLevel
        for (let i = 0; i < game.global.LEVELS.length; i++) {
            let released = game.global.LEVELS[i]
            if (!released) {
                // currentLevel = i
                if (this.level == i) {
                    game.global.LEVELS[i] = 1
                    break
                }
            }
        }
        // game.global.CURRENTLEVEL = currentLevel
        localStorage.setItem('levels', JSON.stringify(game.global.LEVELS))
        let previousScore = game.global.SCORES[this.level - 1]
        game.global.SCORES[this.level - 1] = Math.max(previousScore, this.score)
        localStorage.setItem('scores', JSON.stringify(game.global.SCORES))
        // localStorage.setItem('currentLevel', currentLevel)
    }

    setTitle() {
        let title = game.add.image(0, 0, 'title')
        this.submitGroup.add(title)
        title.scale.setTo(0.6)
        title.x = this.quizBox.x + this.quizBox.width / 2 - title.width / 2
        title.y = this.quizBox.y + 50
        let title_text = game.add.text(0, 0, '', Object.assign({}, this.style, {
            font: '18px custom', boundsAlignH: "center",
            boundsAlignV: "middle",
            align: 'center',
            fill: '#dfcab0'
        }), this.submitGroup)
        title_text.setTextBounds(title.x, title.y, title.width, title.height)

        switch (this.currentMode) {
            case 'single':
                title_text.text = '单选题'
                break
            case 'multiple':
                title_text.text = '多选题'
                break
            case 'truth':
                title_text.text = '判断题'
                break
        }
    }

    addButton(x, y, cnt) {
        let button = game.add.button(x, y, 'buttons', 0)
        button.inputEabled = true
        button.selected = false
        button.index = cnt
        //  Enable the hand cursor
        button.input.useHandCursor = true;
        button.onInputDown.add(this.onselect, this)
        this.buttonGroup.add(button)
        // buttonGroup.add(button)
        this.optionButtons.push(button)

    }
    loadOption(q_set) {
        let answer = q_set.answer
        this.optionButtons = []
        //shuffle选项
        if (this.currentMode === 'single') {
            this.currentCorrect = answer[0]
            this.shuffle(answer)
            this.currentOptions = answer

        } else if (this.currentMode === 'truth') {
            this.currentOptions = ["正确", '错误']
            this.currentCorrect = answer ? '正确' : '错误'
        }
        else if (this.currentMode === 'multiple') {
            this.currentCorrect = []
            this.currentOptions = []
            q_set.correct.forEach(k => {
                this.currentCorrect.push(answer[k])
            })
            for (let k in answer) {
                this.currentOptions.push(answer[k])
                this.shuffle(this.currentOptions)
            }
        }

        let total = this.currentOptions.length
        let cnt = 0
        let _cnt = -1
        let ROW = Math.ceil(total / 2)
        let qBounds = this.textGroup.children[0].getBounds()
        let _h = qBounds.height
        // console.log(_h)
        let margin = 50
        let _text
        let a_optionText = []
        let questionX = this.textGroup.children[0].x
        for (let j = 0; j < ROW; j++) {
            for (let i = 0; i < 2; i++) {
                cnt = j * 2 + i
                _cnt++
                if (cnt > total - 1) {
                    break
                }
                let line = this.makeLine(this.currentOptions[cnt], game.global.QUIZ_LINE_WORDS)

                //total > 4
                if (total > 0) {

                    _text = game.add.text(questionX + 24, _h + margin + _cnt * 40, line.length > 1 ? line.join('\n') : this.currentOptions[cnt], Object.assign({}, this.style, { font: '24px custom' }), this.textGroup)
                    a_optionText.push(_text)
                    for (let k = 0; k < line.length - 1; k++) {
                        _cnt++
                    }
                    this.addButton(_text.x - 30, _text.y, cnt)
                } else {
                    _text = game.add.text(this.quizBox.x + i * 160, _h + margin + j * 40, this.currentOptions[cnt], Object.assign({}, this.style, { font: '24px custom' }), this.textGroup)
                    a_optionText.push(_text)
                }
            }
        }

        // if (total <= 4) {
        //     let _totalW = a_optionText.slice(0, 2).reduce((prev, curr, index) => {return prev + curr.width}, 0) + 160
        //     a_optionText.forEach((text, cnt) => {
        //         text.x += (this.quizBox.width - _totalW) / 2 + this.quizBox.width/10
        //         this.addButton(text.x - 30, text.y, cnt)
        //     })
        // }
        this.textGroup.y = this.quizBox.y + (this.quizBox.height - this.textGroup.height) / 2
    }
    loadQuestionSet() {
        let q_set = null
        if (this.questions.single.length) {
            q_set = this.questions.single.shift()
            this.currentMode = 'single'
        }
        else if (this.questions.multiple.length) {
            q_set = this.questions.multiple.shift()
            this.currentMode = 'multiple'
        }
        else if (this.questions.truth.length) {
            q_set = this.questions.truth.shift()
            this.currentMode = 'truth'
        }
        return q_set
    }
    onselect(button) {
        fx = game.add.audio('click', 1.5, false)
        fx.play()
        button.selected = !button.selected
        // console.log(button.selected)
        if (this.currentMode !== 'multiple') {
            this.optionButtons.forEach(b => {
                if (b.index !== button.index) {
                    b.loadTexture('buttons', 0)
                    b.selected = false
                }
            })
        }
        // console.log(`current button is ${button.index}, it is ${button.selected?'selected': 'not selected'}`)
        if (button.selected) {
            button.loadTexture('buttons', 3)
        } else {
            button.loadTexture('buttons', 0)
        }

        if (button.selected) {
            if (this.currentMode !== 'multiple') {
                if (!this.currentAnswer.length) {
                    this.currentAnswer.push(button.index)
                } else {
                    this.currentAnswer = [button.index]
                }
            } else {
                this.currentAnswer.push(button.index)
            }
        } else {
            if (this.currentMode !== 'multiple') {
                this.currentAnswer = []
            } else {
                let index = this.currentAnswer.findIndex(function (num) { num === button.index })
                this.currentAnswer.splice(index, 0)
            }
        }
        // console.log(this.currentAnswer)
    }

    onsubmit(button, pointer, isOver) {
        // console.log('onsubmit')
        if (!isOver)
            return
        fx = game.add.audio('press', 1, false)
        fx.play()
        let _t = game.add.tween(this.quizGroup)
        // this.giveFeedBack()
        _t.to({ alpha: 0 }, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
        _t.onComplete.add(() => {
            this.quizGroup.destroy()
            this.giveFeedBack()
        }, this)
    }
    giveFeedBack() {
        let _t = game.add.tween(this.dialogGroup)
        this.text.text = ''
        _t.to({ alpha: 1 }, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
        _t.onComplete.add(this.onComplete, this)
    }
    onComplete() {
        //多选题逻辑单独
        if (this.currentMode !== 'multiple') {
            if (this.currentAnswer.length == 1 && this.currentOptions[this.currentAnswer[0]] == this.currentCorrect) {
                this.handleCorrect()
            } else {
                this.handleWrong()
            }
        } else {
            let correct = false
            // debugger
            if (this.currentAnswer.length === this.currentCorrect.length) {
                let _copy = [].concat(this.currentCorrect)
                let _a
                while (_a = this.currentOptions[this.currentAnswer.pop()]) {
                    let _i = _copy.findIndex(_item => _item === _a)
                    if (_i == -1)
                        break
                    else {
                        _copy.splice(_i, 1)
                    }
                }
                if (!_copy.length) {
                    correct = true
                }
            }
            correct ? this.handleCorrect() : this.handleWrong()
        }
    }
    handleCorrect() {
        this.score++
        this.text.clearColors()
        let _previous = this.currentMode
        this.q_set = this.loadQuestionSet()
        let _current = this.currentMode
        let _b
        if (this.level == 4 || this.level == 5)
            _b = `可恶，竟然被你答对了，看来我要拿出更强的实力出来了，下面这几道`
        else
            _b = `答对了，但下面我还要再出几道`
        let _length = _b.length
        if (_previous != _current) {
            if (this.level == 4 || this.level == 5 )
                this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}一定会让你发出来自地狱的呐喊`, game.global.LINE_WORDS)
            else
                this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}来考验考验你`, game.global.LINE_WORDS)
        } else {
            if (this.level == 4 || this.level == 5)
                this.lines = this.makeLine('可恶竟然被你答对了', game.global.LINE_WORDS)
            else
                this.lines = this.makeLine('答对了', game.global.LINE_WORDS)
        }
        if (_length) {
            this.text.addColor('dfcab0', _length)
            this.text.addColor('#fff', _length + 3)
        }
        util.nextLine.call(this)
    }

    handleWrong() {
        this.text.clearColors()
        let _previous = this.currentMode
        this.q_set = this.loadQuestionSet()
        let _current = this.currentMode
        let _b = '你还是太嫩了，正确答案是'
        let _length = _b.length
        let _length2
        let _length3
        if (Array.isArray(this.currentCorrect)) {
            _b = `${_b}${this.currentCorrect.join('、')}`
        } else {
            _b = `${_b}${this.currentCorrect}`
        }
        _length2 = _b.length
        if (_previous != _current) {
            if (this.level == 4 || this.level == 5) 
                _b = `${_b}, 让你尝一下我更强的实力吧，下面几道`
            else
                _b = `${_b}, 下面我再出几道`
            _length3 = _b.length
            if (this.level == 4 || this.level == 5)
                this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}会让你切身发出来自地狱的呐喊`, game.global.LINE_WORDS)
            else 
                this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}来考验一下你，你的机会已经不多了`, game.global.LINE_WORDS)
            
        } else {
            this.lines = this.makeLine(`${_b}`, game.global.LINE_WORDS)
        }
        this.text.addColor('red', _length)
        this.text.addColor('#fff', _length2)
        if (_length3) {
            this.text.addColor('#dfcab0', _length3)
            this.text.addColor('#fff', _length3 + 3)
        }
        util.nextLine.call(this)

    }

    shuffle(array) {
        let i = array.length
        let index
        let temp
        while (i > 0) {
            index = Math.floor(Math.random() * i)
            i--
            temp = array[i]
            array[i] = array[index]
            array[index] = temp
        }
    }
}