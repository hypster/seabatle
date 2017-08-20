const Level = {
    preload() {
        this.level = 1
        // i = 0
    },
    create() {
        music = game.add.audio('castle')
        // music.play()
        
        let _obj = JSON.parse(game.cache.getText('level' + this.level + '_text'))

        this.dialog = _obj.dialog

        this.questions = _obj.questions

        //对话框组件
        this.dialogGroup  

        this.text_padding = 10

        this.lineIndex = 0

        this.wordIndex = 0

        this.line = ''

        score = this.score = 0

        this.style = {
            font: "28px custom", fill: "#000",
            boundsAlignH: "left",
            boundsAlignV: "top",
            align: 'left',
        }
        util.setScale(this)
        
    
        this.bg = game.add.sprite(700, game.global.DURATION, 'level1_dialog_bg')

        util.centerGameObjects([this.bg])

        game.world.setBounds(0, 0, 1024, 768)

        
        // this.startQuiz()
        this.rollCamera(this.startDialog) 
    },

    update() {


    },
    render() {
        game.debug.geom(this.prompt, 'rgba(255,0,0,0.5)')
        game.debug.cameraInfo(game.camera, 0, 0)
    },
    rollCamera (cb) {
        let x_tween = game.add.tween(this.bg)
        let y_tween = game.add.tween(this.bg)
        let scale_tween = game.add.tween(this.bg.scale)
        x_tween.to({x: game.world.centerX - 80}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
        x_tween.onComplete.addOnce(() => {
            y_tween.to({y: game.world.centerY - 180}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
            y_tween.onComplete.addOnce(() => {
                let position_tween = game.add.tween(this.bg)
                position_tween.to({y: this.bg.y - 140}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
                scale_tween.to({ x: 1.5, y: 1.5 }, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
            })
        })
        
        scale_tween.onComplete.addOnce(() => game.time.events.add(game.global.DURATION, cb, this), this) 
    },

    startDialog() {
        this.dialogGroup = game.add.group()
        let _w = game.cache._cache.image.dialog_box.frame.width
        
        let _h = game.cache._cache.image.dialog_box.frame.height
        
        //对话框对象
        this.dialogBox = game.add.sprite((game.world._width - _w) / 2, game.world._height - _h - 20, 'dialog_box')
        this.dialogGroup.add(this.dialogBox)
        // 当前对话人物图片
        this.currentFacial = game.add.sprite(this.dialogBox.x, this.dialogBox.y, 'hero_facial')
        this.dialogGroup.add(this.currentFacial)

        // 当前对话信息
        this.current
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
        this.text.setTextBounds(
            this.dialogBox.x + this.currentFacial.width + this.text_padding,
            this.dialogBox.y + 74,
            this.dialogBox.width - this.currentFacial.width - 5 * this.text_padding,
            this.dialogBox.height - 6 * this.text_padding
        )

        // 当前人物名字对象
        this.speakerName = game.add.text(this.dialogBox.x + this.currentFacial.width + this.text_padding, this.dialogBox.y + 30, '', nameStyle)
        textGroup.add(this.speakerName)
        //提示符对象
        this.prompt = game.add.image(this.dialogBox.x + this.dialogBox.width - 80, this.dialogBox.y + this.dialogBox.height - 42, 'dialog_prompt')
        this.prompt.alpha = 0
        this.dialogGroup.add(this.prompt)

        //载入对话信息
        this.nextDialog()

    },

    nextDialog() {
        //当前行数
        this.lineIndex = 0
        //当前文本信息{人物名, 人物脚本}
        let current = this.dialog.shift()
        //脚本
        let _text = current.text
        
        this.speakerName.text = current.name
        
        this.text.text = ''
        this.currentFacial.loadTexture(current.key + '_facial')
        if (current.x) {
            this.currentFacial.x = this.currentFacial.x + current.x
        }
        if (current.y) {
            this.currentFacial.y = this.currentFacial.y + current.y
        }
        //对话拆分数组
        this.lines = this.makeLine(_text, game.global.LINE_WORDS)
        this.nextLine()
    },
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
    },

    nextLine() {
        if ((this.lineIndex && this.lineIndex % game.global.MAX_LINE == 0) || this.lineIndex == this.lines.length) {
            this.promptTween()
            game.input.onTap.addOnce(this.onTap, this)
            return
        }
        let line = this.lines[this.lineIndex].split('')
        
        game.time.events.repeat(game.global.WORD_DELAY, line.length, this.nextWord, this, line);
        this.lineIndex++
    },
    nextWord(line) {
        this.text.text = this.text.text.concat(line[this.wordIndex]);
        this.wordIndex++;
        if (this.wordIndex === line.length) {
            this.wordIndex = 0
            this.text.text = this.text.text.concat('\n')
            game.time.events.add(game.global.LINE_DELAY, this.nextLine, this);
        }
    },
    promptTween() {
        this.prompt.alpha = 1
        this.tween_prompt = game.add.tween(this.prompt).to({ y: this.prompt.y + 2 }, 100, Phaser.Easing.Bounce.InOut, false, 100, 3, true).start()
        this.tween_prompt.onComplete.addOnce(this.promptTween, this)
    },
    onTap(pointer) {
        // console.log(i++)
        game.input.onTap.remove(this.onTap, this)
        game.tweens.remove(this.tween_prompt)
        this.prompt.alpha = 0
        this.text.text = ''
        //所有会话结束进入问答环节
        if (!this.dialog.length) {
            this.lineIndex = 0
            console.log('you finished all level 1 dialog')
            
            let _t = game.add.tween(this.dialogGroup).to({alpha: 0}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
            _t.onComplete.add(function () { 
                this.startQuiz()
        }, this)
            // this.startQuiz()
            
        }
        //加载剩余会话
        else if (this.lines.length != this.lineIndex) {
            this.lines.splice(0, this.lineIndex)
            this.lineIndex = 0
            this.nextLine()
        //当前会话结束
        } else {
            this.lineIndex = 0
            console.log('you finished the all the lines')
            this.nextDialog()
        }
        
    },
    startQuiz () {
        this.currentMode = ''
        this.currentAnswer = []
        //问答框
        let quizBox = this.quizBox = game.add.image(0, 0, 'quiz_box')
        quizBox.scale.setTo(1.5)
        quizBox.x = game.world.centerX - quizBox.width/2
        quizBox.y = game.world.centerY - quizBox.height/2
        quizBox.alpha = 0
        
        this.quizGroup = game.add.group()
        this.quizGroup.add(this.quizBox)

        let q_set = this.loadQuestionSet()

        if (!q_set) {
            return console.log('no more questions')

        }

        q_set.question = this.makeLine(q_set.question, game.global.QUIZ_LINE_WORDS).join('\n')
        //text group
        let textGroup = game.add.group()
        this.textGroup = textGroup
        
        this.quizGroup.add(textGroup)
        quizText = game.add.text(this.quizBox.x + 100, 0, q_set.question, this.style)
        textGroup.add(quizText)
        //当前对话文字对象
        quizText.lineSpacing = 5
        //
        this.buttonGroup = game.add.group()
        this.textGroup.add(this.buttonGroup)
        // this.quizText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        // quizText.setTextBounds(
        //     this.quizBox.x + 100,
        //     this.quizBox.y + 100,
        //     this.quizBox.width - 100,
        //     this.quizBox.height - 100
        // )
        
        // title = game.add.image(0, 0, 'title')
        // title.scale.setTo(0.6)
        // title.x = this.quizBox.x + this.quizBox.width/2 - title.width/2
        // title.y = this.quizBox.y + 50
        // title_text = game.add.text(0, 0, '', Object.assign({}, this.style,  {font: '18px custom', boundsAlignH: "center",
        // boundsAlignV: "middle",
        // align: 'center',
        // fill: '#dfcab0'
        // }))
        // title_text.setTextBounds(title.x, title.y, title.width, title.height)

        // switch (this.currentMode) {
        //     case 'single':
        //         this.buttonGroup = this.loadOptionButtons(4)
        //         // title_text.text = '单选题'
        //         break
        //         case 'multiple':
        //         this.buttonGroup = this.loadOptionButtons(5)
        //         // title_text.text = '多选题'
        //         break
        //         case 'truth':
        //         this.buttonGroup = this.loadOptionButtons(2)
        //         // title_text.text = '判断题'
        //         break
        //     }
            
            
        this.loadOption(q_set)
        // this.buttonGroup = this.loadOptionButtons()
        let submitGroup = game.add.group()
        this.quizGroup.add(submitGroup)
        let submit = game.add.button(0, 0,  'button_submit', null, this, 1, 1, 0, 1, submitGroup)
        submit.scale.setTo(2)
        submit.x =  this.quizBox.x + this.quizBox.width/2 - submit.width/2
        submit.y = this.quizBox.y + this.quizBox.height - 84 - submit.height/2
        submit.onInputUp.addOnce(this.onsubmit, this)
        txt = game.add.text(0 , 2, '确定', Object.assign({}, this.style, {font: '24px custom', boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center',
        fill: '#dfcab0'
        }), submitGroup)
        txt.setTextBounds(submit.x, submit.y, submit.width, submit.height)
        
        this.quizGroup.setAll('alpha', 0)
        let alpha_tween = game.add.tween(this.quizBox)
        alpha_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
        let text_tween = game.add.tween(textGroup)
        let submit_tween = game.add.tween(submitGroup)
        // let button_tween = game.add.tween(this.buttonGroup)
        alpha_tween.onComplete.add(function () {
            text_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
            submit_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
            // button_tween.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0 ,false)
        })
    
    },
  
    addButton (x, y, cnt) {
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

    },
    loadOption (q_set) {
        let answer = q_set.answer
        this.optionButtons = []
        //shuffle选项
        if (this.currentMode === 'single') {
            this.currentCorrect = answer[0]
            this.shuffle(answer)
            this.currentOptions = answer
            
        } else if (this.currentMode === 'truth') {
            this.currentOptions = ["正确", '错误']
            this.currentCorrect = answer? '正确': '错误'
        }
         else if(this.currentMode === 'multiple') {
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
        let ROW = Math.ceil(total/2)
        let qBounds = this.textGroup.children[0].getBounds()
        let _h = qBounds.height
        console.log(_h)
        let margin = 50
        let _text
        for (let j = 0; j < ROW; j++) {
            for (let i = 0; i < 2; i++) {
                cnt = j * 2 + i
                if (cnt > total -1) {
                    break
                }
                if (total > 4) {
                    _text = game.add.text(390, _h + margin + cnt * 40, this.currentOptions[cnt], Object.assign({}, this.style, {font: '24px custom'}), this.textGroup)
                } else {
                    _text = game.add.text(390 + i * 160,  _h + margin + j * 40, this.currentOptions[cnt], Object.assign({}, this.style, {font: '24px custom'}), this.textGroup)
                }
                this.addButton(_text.x - 30, _text.y, cnt)
            }
        }
        
        this.textGroup.y = this.quizBox.y + (this.quizBox.height - this.textGroup.height)/2
    },
    loadQuestionSet () {
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
    },
    onselect (button) {
        button.selected = !button.selected
        console.log(button.selected)
        if (this.currentMode !== 'multiple') {
            this.optionButtons.forEach(b => {
                if (b.index !== button.index) {
                    b.loadTexture('buttons', 0)
                    b.selected = false
                }
            })
        }
        console.log(`current button is ${button.index}, it is ${button.selected?'selected': 'not selected'}`)
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
                let index = this.currentAnswer.findIndex(function (num) {num === button.index})
                this.currentAnswer.splice(index, 0)
            }
        }
        console.log(this.currentAnswer)
    },

    onsubmit (button, pointer, isOver) {
        console.log('onsubmit')
        if (!isOver) 
            return
        let _t = game.add.tween(this.quizGroup)
        // this.giveFeedBack()
        _t.to({alpha: 0}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
        _t.onComplete.add(() => {
            this.quizGroup.destroy()
            this.giveFeedBack()}, this)
    },
    giveFeedBack () {
        let _t = game.add.tween(this.dialogGroup)
        this.text.text = ''
        _t.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
        _t.onComplete.add(this.onComplete, this)
    },
    onComplete () {
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
    },
    handleCorrect () {
        this.score++
        this.lines = this.makeLine('答对了，小伙子我看好你')
        this.nextLine()
    },
    
    handleWrong () {
        let _b = '你还是太嫩了，正确答案应该是'
        if (Array.isArray(this.currentCorrect)) {
            this.lines = this.makeLine(`${_b}${this.currentCorrect.join('、')}`, game.global.LINE_WORDS)    
        } else {
            this.lines = this.makeLine(`${_b}${this.currentCorrect}`, game.global.LINE_WORDS)
        }
        this.nextLine()
        this.text.addColor('red', _b.length)

    },
     
    shuffle (array) {
        let i = array.length
        let index
        let temp
        while (i > 0) {
            index = Math.floor(Math.random() * i)
            i--
            temp = array[i]
            array[i]  = array[index]
            array[index] = temp
        }
     }
}