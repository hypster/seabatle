const Intro = {
    preload () {

    },
    create () {
        util.setScale(this)
        
        let intro = `很久以前，在西方有一个岛屿国家叫做辛特尔兰，在英明的老国王格兰特的治理下人民安居乐业。随着年事已高，老国王想要还政于民、组建议会，推行民主的君主立宪制。就在此时，一个贪念权利的阴谋家奥登将军，发动了一场政变，自立为王。他把国王囚禁在海峡城堡，四处抓捕议员，试图建立残暴的独裁统治。在辛特尔兰的另一个小岛上，有一位叫雷恩的英雄，正在筹备力量，准备征讨奥登，解救国王，拯救国家。怒海争锋，快来行动吧！
     `
        let _str = util.makeLine.call(this, intro, 18).join('\n')
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
        txt.y = game.world.camera.view.centerY - txt.height / 2
        let enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        game.input.onTap.add(this.enterGame, this)
        enterKey.onDown.add(this.enterGame, this)
    },
    enterGame () {
        game.state.start('Map')
    },
    render () {
        // game.debug.text(txt.x +' '+ txt.y, 20, 20)
    },
    update () {

    }
}