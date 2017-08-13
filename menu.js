const Menu = {
    preload () {
        this.optionCount = 0
    },
    init () {
        util.setScale(this)
        // 怒海争锋
        this.titleText = game.make.text(game.world.centerX, 100, "test", {
        font: 'bold 60pt custom',
        fill: '#FDFFB5',
        align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    },
    create () {
        this.bg = game.add.image(0, 0, 'menu_bg')
        this.bg.width = game.width
        this.bg.height = game.height
        game.add.existing(this.titleText)
        music = game.add.audio('dangerous')
        music.loop = true
        music.play()
        this.addMenuOption('新开序章', function () {
            music.stop()
            game.state.start('Map')
        })
        this.addMenuOption('环境设定', function () {})
        this.addMenuOption('游戏帮助', function () {})
        this.addMenuOption('离开', function () {})
        // util.centerGameObjects([this.bg])
    },
    update () {},
    addMenuOption (text, cb) {
        let optionStyle = { font: '30pt custom', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
        let txt = game.add.text(30, (this.optionCount * 80) + 200, text, optionStyle);
        let onOver = function (target) {
            console.log('onOver')
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
        };
        let onOut = function (target) {
            console.log('onOut')
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
        };
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        txt.inputEnabled = true;
        // txt.input.enableDrag()
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);
        txt.events.onInputUp.add(cb, this);
        this.optionCount++;
    }
}



