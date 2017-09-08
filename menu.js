const Menu = {
    preload () {
        this.optionCount = 0
        this.currentMenu = 0
        this.normalStyle = {fill: "white", stroke: "rgba(0,0,0,0)"}
        this.hoverStyle = {fill: "#FEFFD5", stroke: "rgba(200,200,200,0.5)"}
    },
    init () {
        util.setScale(this)
    },
    create () {
        this.bg = game.add.image(0, 0, 'menu_bg')
        this.bg.width = game.width
        this.bg.height = game.height
        this.menu = []
        
        // music = game.add.audio('dangerous')
        // music.loop = true
        // music.play()
        this.addMenuOption('新开序章', this.nextState)
        this.addMenuOption('环境设定', function () {})
        this.addMenuOption('游戏帮助', function () {})
        this.addMenuOption('离开', function () {})
        this.menu[0].fill = this.hoverStyle.fill

        let spacekey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        spacekey.onDown.add(() => {
            if (this.menu[this.currentMenu].text == '新开序章') {
                this.nextState()
            }
        })
        let up = game.input.keyboard.addKey(Phaser.Keyboard.UP)
        let down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        up.onDown.add(this.onUp, this)
        down.onDown.add(this.onDown, this)
    },
    update () {
        
    },
    nextState () {
            // music.stop()
            game.state.start('Map')
            // game.state.start('Level')
    },
    changeStyle (target) {
        target = target ? target: this.menu[this.currentMenu]
        this.menu.forEach(item => {
            item.fill = this.normalStyle.fill
            item.stroke = this.normalStyle.stroke
        })
        target.fill = this.hoverStyle.fill
        target.stroke = this.hoverStyle.stroke
    },
    onDown () {
        if (this.currentMenu < this.optionCount - 1)
            this.currentMenu++
        this.changeStyle()
    },
    onUp () {
        if (this.currentMenu > 0)
            this.currentMenu--
        this.changeStyle()
    },
    addMenuOption (text, cb) {
        let optionStyle = { font: '30pt custom', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
        let txt = this.menu[this.optionCount] = game.add.text(30, (this.optionCount * 80) + 200, text, optionStyle);
        let onOver = function (target) {
            this.changeStyle(target)
        };
        let onOut = function (target) {
            target.fill = this.normalStyle.fill
            target.stroke = this.normalStyle.stroke
        };
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        txt.inputEnabled = true;
        this.cursors = game.input.keyboard.createCursorKeys()
        // txt.input.enableDrag()
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);
        txt.events.onInputUp.add(cb, this);
        this.optionCount++;
    }
}



