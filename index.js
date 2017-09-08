const game = new Phaser.Game(1334, 750, Phaser.CANVAS,"seabattle")
game.global = {
    WORD_DELAY: 20,
    // 80,
    LINE_DELAY: 20,
    // 200,
    MAX_LINE: 3,
    LINE_WORDS: 28,
    LEVELS: [0, 0, 0, -1, -1],
    QUIZ_LINE_WORDS: 22,
    DURATION: 100,
    DELAY: 100,
    KEYMAP: {
        single: '单选题',
        multiple: '多选题',
        truth: '判断题'
    },
    PASS_SCORE: 3,
    SCALE: 4,
    SCALE2: 2,
    SPEED: 300,
    ENTRYTOLEVEL: {
        castle: 1,
        shipYard: 2,
        bar: 3
    }
}
let rect
let music
const Main = {
    init () {
    },
    preload () {
        game.load.image('loading_bar', 'assets/loading.png')
        game.load.image('loading_bg', 'assets/loading_bg.jpg')
        game.load.script('loading', 'loading.js')
        game.load.script('util', 'util.js')
    },
    create () {
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
        util.setScale(this)
        game.state.add('Loading', Loading)
        game.state.start('Loading')
    }
}

game.state.add('Main', Main)
game.state.start('Main')


