class Level extends Phaser.State {
    constructor (level) {
        super()
        this.level = level
    }
    preload() {
        this.finish = false
    }
    create() {
        music = game.add.audio('castle')
        music.play()
        
        let _obj = JSON.parse(game.cache.getText('level' + this.level + '_text'))

        this.dialog = _obj.dialog

        this.endDialog = _obj.endDialog

        this.questions = _obj.questions

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
        
    
        this.bg = game.add.sprite(700, game.global.DURATION, 'level1_dialog_bg')

        util.centerGameObjects([this.bg])

        game.world.setBounds(0, 0, 1334, 750)

        
        // this.startQuiz()
        this.rollCamera(this.startDialog) 
    }

    update() {


    }
    render() {
        game.debug.geom(this.prompt, 'rgba(255,0,0,0.5)')
        game.debug.cameraInfo(game.camera, 0, 0)
        game.debug.geom(this.textGroup)
        game.debug.geom(this.mask, 'red')
        // game.debug.body(this.mask, 'red')
        
    }
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
    }

    startDialog() {
        this.dialogGroup = game.add.group()
        //对话框对象
        this.dialogBox = game.add.sprite(0, 0, 'dialog_box')
        
        this.dialogBox.x = (game.width - this.dialogBox.width)/2
        this.dialogBox.y = game.height - this.dialogBox.height - 20
        
        let mask = this.mask = game.add.graphics(this.dialogBox.x, this.dialogBox.y)
        //shapes on mask must be filled!
        mask.beginFill(0xff00000)
        let rect = this.rect = new Phaser.Rectangle(mask.x + 16, mask.y + 19, 1083, 222)
        // mask.drawRect(16, 19 - 200, 861, 222 + 200)
        mask.drawRect(16, 19 - 200, 1083, 222 + 200)
        
        this.dialogGroup.add(this.dialogBox)
        
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
                _x_bound = this.dialogBox.x  + 4 * this.text_padding
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

        this.currentFacial.alignIn(this.rect, facing, current.x ? current.x : 0, current.y ? current.y: 0)
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
        this.nextLine()
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

    nextLine() {
        //对话结束注册tap事件
        if ((this.lineIndex && this.lineIndex % game.global.MAX_LINE == 0) || this.lineIndex == this.lines.length) {
            this.promptTween()
            game.input.onTap.addOnce(this.onTap, this)
        } else {
            let line = this.lines[this.lineIndex].split('')
            game.time.events.repeat(game.global.WORD_DELAY, line.length, this.nextWord, this, line);
            this.lineIndex++
        }
    }
    nextWord(line) {
        this.text.text = this.text.text.concat(line[this.wordIndex]);
        this.wordIndex++;
        if (this.wordIndex === line.length) {
            this.wordIndex = 0
            this.text.text = this.text.text.concat('\n')
            game.time.events.add(game.global.LINE_DELAY, this.nextLine, this);
        }
    }
    promptTween() {
        this.prompt.alpha = 1
        this.tween_prompt = game.add.tween(this.prompt).to({ y: this.prompt.y + 2 }, 100, Phaser.Easing.Bounce.InOut, false, 100, 3, true).start()
        this.tween_prompt.onComplete.addOnce(this.promptTween, this)
    }
    onTap() {//对话框文字显示完成后需要加载的内容，游戏主要节点
        if (this.finish) {
            return game.state.start('Map')
        }
        game.input.onTap.remove(this.onTap, this)
        game.tweens.remove(this.tween_prompt)
        this.prompt.alpha = 0
        this.text.text = ''
        //所有会话结束进入问答环节
        if (!this.dialog.length) {
            console.log('you finished all level 1 dialog')
            if (this.lines.length != this.lineIndex) {
                // debugger
                let colors = {}
                for (let i = 0; i < this.text.colors.length; i++) {
                    if (this.text.colors[i]) {
                        colors[this.text.colors[i]] = i
                    }
                }
                console.log(colors)
                let _red_start = colors['red']
                let _normal_start = colors['#fff']                
                this.text.clearColors()
                // _red_start - this.lineIndex * game.global.LINE_WORDS
                this.text.addColor('red', 0)
                this.text.addColor('#fff', _normal_start - this.lineIndex * game.global.LINE_WORDS)
                this.lines.splice(0, this.lineIndex)
                this.lineIndex = 0
                this.nextLine()
            } else {
                this.lineIndex = 0
                if (!this.q_set)
                    this.q_set = this.loadQuestionSet()
                if (!this.q_set) {
                    this.lineIndex = 0
                    if (this.score < 8) {
                        this.dialog = this.endDialog.failure
                    } else {
                        this.dialog = this.endDialog.success
                    }
                    this.text.clearColors()
                    this.finish = true
                    this.nextDialog()
            
                } else {
                    let _t = game.add.tween(this.dialogGroup).to({alpha: 0}, game.global.DURATION, Phaser.Easing.Default, true, game.global.DURATION, 0, false)
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
            this.nextLine()
        //当前会话结束
        } else {
            this.lineIndex = 0
            console.log('you finished the all the lines')
            this.nextDialog()
        }
        
    }
    startQuiz () {
        // this.currentMode = ''
        this.currentAnswer = []
        //问答框
        let quizBox = this.quizBox = game.add.image(0, 0, 'quiz_box')
        quizBox.scale.setTo(1.5)
        quizBox.alpha = 0
        
        this.quizGroup = game.add.group()
        this.quizGroup.x = game.world.centerX - quizBox.width/2
        this.quizGroup.y = 0
        this.quizGroup.scale.setTo(1.1)
        this.quizGroup.add(this.quizBox)

        // let q_set = this.loadQuestionSet()

        // if (!this.q_set) {
        //     console.log('no more questions')
        //     debugger
        //     if (this.score < 8) {
        //         this.dialog = this.endDialog.failure
        //     } else {
        //         this.dialog = this.endDialog.success
        //     }
        //     return this.startDialog()
        //     // return this.nextDialog()
        // }

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
        let submit = game.add.button(0, 0,  'button_submit', null, this, 1, 1, 0, 1, submitGroup)
        submit.scale.setTo(2)
        submit.x =  this.quizBox.x + this.quizBox.width/2 - submit.width/2
        submit.y = this.quizBox.y + this.quizBox.height - 84 - submit.height/2
        submit.onInputUp.addOnce(this.onsubmit, this)
        let txt = game.add.text(0 , 2, '确定', Object.assign({}, this.style, {font: '28px custom', boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center',
        fill: '#dfcab0'
        }), submitGroup)
        txt.setTextBounds(submit.x, submit.y, submit.width, submit.height)

        this.setTitle()
        
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
    
    }

    setTitle () {
        let title = game.add.image(0, 0, 'title')
        this.submitGroup.add(title)
        title.scale.setTo(0.6)
        title.x = this.quizBox.x + this.quizBox.width/2 - title.width/2
        title.y = this.quizBox.y + 50
        let title_text = game.add.text(0, 0, '', Object.assign({}, this.style,  {font: '18px custom', boundsAlignH: "center",
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

    }
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
        let a_optionText = []
        let questionX = this.textGroup.children[0].x
        for (let j = 0; j < ROW; j++) {
            for (let i = 0; i < 2; i++) {
                cnt = j * 2 + i
                if (cnt > total -1) {
                    break
                }
                if (total > 4) {
                    _text = game.add.text(questionX + 24, _h + margin + cnt * 40, this.currentOptions[cnt], Object.assign({}, this.style, {font: '24px custom'}), this.textGroup)
                    a_optionText.push(_text)
                    this.addButton(_text.x - 30, _text.y, cnt)
                } else {
                    _text = game.add.text(this.quizBox.x + i * 160,  _h + margin + j * 40, this.currentOptions[cnt], Object.assign({}, this.style, {font: '24px custom'}), this.textGroup)
                    a_optionText.push(_text)
                }
            }
        }
        
        if (total <= 4) {
            let _totalW = a_optionText.slice(0, 2).reduce((prev, curr, index) => {return prev + curr.width}, 0) + 160
            a_optionText.forEach((text, cnt) => {
                text.x += (this.quizBox.width - _totalW) / 2 + this.quizBox.width/10
                this.addButton(text.x - 30, text.y, cnt)
            })
        }
        this.textGroup.y = this.quizBox.y + (this.quizBox.height - this.textGroup.height)/2
    }
    loadQuestionSet () {
        let q_set = null
        if (this.questions.multiple.length) {
            q_set = this.questions.multiple.shift()
            this.currentMode = 'multiple'
        } 
        else if (this.questions.single.length) {
            q_set = this.questions.single.shift()
            this.currentMode = 'single'
        }
        else if (this.questions.truth.length) {
            q_set = this.questions.truth.shift()
            this.currentMode = 'truth'
        } 
        return q_set
    }
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
    }

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
    }
    giveFeedBack () {
        let _t = game.add.tween(this.dialogGroup)
        this.text.text = ''
        _t.to({alpha: 1}, game.global.DURATION, Phaser.Easing.Default, true, 0, 0, false)
        _t.onComplete.add(this.onComplete, this)
    }
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
    }
    handleCorrect () {
        this.score++
        this.text.clearColors()
        let _previous = this.currentMode
        this.q_set = this.loadQuestionSet()
        let _current = this.currentMode
        let _b = `答对了，小伙子我看好你, 但下面我还要再出几道`
        let _length = _b.length
        if (_previous != _current) {
            this.lines = this.makeLine(`${_b}${game.global.KEYMAP[_current]}来考验考验你`, game.global.LINE_WORDS)
        } else {
            this.lines = this.makeLine('答对了，小伙子我看好你', game.global.LINE_WORDS)
        }
        if (_length) {
            this.text.addColor('dfcab0', _length)
            this.text.addColor('#fff', _length + 3)
        }
        this.nextLine()
    }
    
    handleWrong () {
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
            _b = `${_b}, 下面我再出几道`
            _length3 = _b.length
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
        this.nextLine()

    }
     
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