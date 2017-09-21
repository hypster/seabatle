const end = {
    preload () {

    },
    create () {
        util.setScale(this)
        let total = game.global.SCORES.reduce((sum, score, index) => {
            return score + sum
        }, 0)
        let reward = ''
        if (total <= 45) {
            reward = '伯爵'
        } else if (total <= 49 ) {
            reward = '侯爵'
        } else {
            reward = '公爵'
        }
        let ending = `雷恩在此次讨伐奥登的战役中带队击沉了${total}艘敌船，国王赐予了他${reward}的头衔，从此以后，天下太平，人民生活在自由民主的美好世界中...`
        let _str = util.makeLine.call(this, ending, 18).join('\n')
        txt = game.add.text(0, 0, _str, {font: "28px custom", fill: "#fff",
        boundsAlignH: "left",
        boundsAlignV: "top",
        align: 'left'})
        txt.alpha = 0
        game.add.tween(txt).to({alpha: 1}, 800, Phaser.Easing.Default, true, 0, 0, false)
        // txt.stroke = "#de77ae";
        // txt.strokeThickness = 16;
        // txt.setShadow(2, 2, "#333333", 2, true, true);
        txt.x = game.world.camera.view.centerX -  txt.width / 2
        txt.y = (game.world.camera.view.centerY - txt.height) / 2
        let enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        game.input.onTap.add(this.returnToMenu, this)
        enterKey.onDown.add(this.returnToMenu, this)

    },
    returnToMenu () {
        game.state.start('Menu')
    },
    render () {
        // game.debug.text(txt.x +' '+ txt.y, 20, 20)
    },
    update () {

    }
}