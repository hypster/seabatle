const Level1 = {
    preload() {

    },
    create() {
        this.text_padding = 10

        this.line_index = 0

        this.wordIndex = 0

        this.line = ''

        util.setScale(this)

        this.cameraRoll = false
        this.boundsW = game.cache._cache.image.level1_dialog_bg.frame.width
        this.boundsH = game.cache._cache.image.level1_dialog_bg.frame.height
        // game.world.setBounds(0, 0, this.boundsW, this.boundsH)
        this.bg = game.add.sprite(700, 500, 'level1_dialog_bg')
        util.centerGameObjects([this.bg])
        let x_tween = game.add.tween(this.bg)
        let y_tween = game.add.tween(this.bg)
        let scale_tween = game.add.tween(this.bg.scale)
        x_tween.to({x: game.world.centerX - 80}, 1000, Phaser.Easing.Default, true, 1000, 0, false)
        x_tween.onComplete.addOnce(() => {
            y_tween.to({y: game.world.centerY - 180}, 1000, Phaser.Easing.Default, true, 1000, 0, false)
            y_tween.onComplete.addOnce(() => {
                let position_tween = game.add.tween(this.bg)
                position_tween.to({y: this.bg.y - 140}, 1000, Phaser.Easing.Default, true, 1000, 0, false)
                scale_tween.to({ x: 1.5, y: 1.5 }, 1000, Phaser.Easing.Default, true, 1000, 0, false)
            })
        })
        scale_tween.onComplete.addOnce(() => game.time.events.add(1000, this.startDialog, this), this)
        // let timer = game.time.events.add(500, this.rollCamera, this)




    },

    update() {

        // if (cursors.up.isDown) {
        //     game.camera.y -= 4;
        // }
        // else if (cursors.down.isDown) {
        //     game.camera.y += 4;
        // }

        // if (cursors.left.isDown) {
        //     game.camera.x -= 4;
        // }
        // else if (cursors.right.isDown) {
        //     game.camera.x += 4;
        // }
        // if (this.cameraRoll) {
        //     if (game.camera.x < this.boundsW) {
        //         game.camera.x += 10
        //     }else if (game.camera.y < this.boundsH) {
        //         game.camera.y += 10
        //     } else {
        //         this.cameraRoll = false
        //     }

        // }

    },
    render() {
        game.debug.geom(this.prompt, 'rgba(255,0,0,0.5)')
        game.debug.cameraInfo(game.camera, 0, 0)
    },
    startDialog() {
        this.dialog = game.cache.getJSON('dialog', true).level1


        let _w = game.cache._cache.image.dialog_box.frame.width

        let _h = game.cache._cache.image.dialog_box.frame.height
        // this.dialogBox = game.add.image((game.world._width - _w) / 2, (game.world._height - _h) / 2, 'dialog_box')
        //对话框对象
        this.dialogBox = game.add.image((game.world._width - _w) / 2, game.world._height - _h - 20, 'dialog_box')
        // 当前对话人物图片
        this.currentFacial = game.add.sprite(this.dialogBox.x, this.dialogBox.y, 'hero_facial')

        // 当前对话信息
        this.current = {}
        // 当前对话文本
        this.currentContent = ''
        var style = {
            font: "28px custom", fill: "#fff",
            boundsAlignH: "left",
            boundsAlignV: "top",
            align: 'left',
        };
        var nameStyle = Object.assign({}, style, { font: "32px custom", fill: "#bd865d" })
        //当前对话文字对象
        this.text = game.add.text(0, 0, '', style);
        this.text.lineSpacing = 5
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.text.setTextBounds(
            this.dialogBox.x + this.currentFacial.width + this.text_padding,
            this.dialogBox.y + 74,
            this.dialogBox.width - this.currentFacial.width - 5 * this.text_padding,
            this.dialogBox.height - 6 * this.text_padding
        )

        // 当前人物名字对象
        this.currentName = game.add.text(this.dialogBox.x + this.currentFacial.width + this.text_padding, this.dialogBox.y + 30, '', nameStyle)

        //提示符对象
        this.prompt = game.add.image(this.dialogBox.x + this.dialogBox.width - 80, this.dialogBox.y + this.dialogBox.height - 42, 'dialog_prompt')
        this.prompt.alpha = 0

        // //摄像机全景
        // this.rollCamera()

        //载入对话信息
        this.nextDialog()

        

        // cursors = game.input.keyboard.createCursorKeys();

    },

    nextDialog() {
        this.line_index = 0
        this.loadDialogText()
        this.text.text = ''
        this.currentFacial.loadTexture(this.current.key + '_facial')
        if (this.current.x) {
            this.currentFacial.x = this.currentFacial.x + this.current.x
        }
        if (this.current.y) {
            this.currentFacial.y = this.currentFacial.y + this.current.y
        }
        this.currentContent = this.makeLine(this.currentContent)
        this.nextLine()
    },
    //["each line ", "each line"]
    makeLine(str) {
        let _str = str.split('\n')
        _str = _str.map((_p) => {
            return _p.split('')
        })
        for (let i = 0, length = _str.length; i < length; i++) {
            let p = _str[i]
            let num_space = 0
            for (let j = 0, _len = p.length; j < _len; j++) {
                if (j && j % game.global.LINE_WORDS == 0) {
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
        this.wordIndex = 0
        if ((this.line_index && this.line_index % game.global.MAX_LINE == 0) || this.line_index == this.currentContent.length) {
            this.promptTween()
            this.tapEvent = game.input.onTap.add(this.onTap, this)
            return
        }
        this.line = this.currentContent[this.line_index].split('')
        game.time.events.repeat(game.global.WORD_DELAY, this.line.length, this.nextWord, this);
        this.line_index++

    },
    nextWord() {
        this.text.text = this.text.text.concat(this.line[this.wordIndex]);
        this.wordIndex++;
        if (this.wordIndex === this.line.length) {
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
        if (this.currentContent.length != this.line_index) {
            this.currentContent.splice(0, this.line_index)
            this.line_index = 0
            this.text.text = ''
            this.prompt.alpha = 0
            this.nextLine()
        } else {
            console.log('you finished the all the lines')
            this.nextDialog()
        }
        game.input.onTap.remove(this.onTap, this)
        game.tweens.remove(this.tween_prompt)
        this.prompt.alpha = 0
    },
    loadDialogText() {
        this.current = this.dialog.shift()
        this.currentName.text = this.current.name
        this.currentContent = this.current.text
    },
    rollCamera() {
        this.cameraRoll = true
        // this.bg.scale.setTo(2)
        // game.camera.scale.setTo(2)

    }
}