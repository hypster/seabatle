const game = new Phaser.Game(1334, 750, Phaser.CANVAS,"seabattle")
game.global = {
    WORD_DELAY: 20,
    // 80,
    LINE_DELAY: 20,
    // 200,
    MAX_LINE: 3,
    LINE_WORDS: 28,
    FEEDBACK_WORDS: 13,
    // LEVELS: [1, 1, 1, 1, 1],
    // CURRENTLEVEL: 4,
    LEVELS: [1, 0, 0, 0, 0],
    CURRENTLEVEL: 0,
    QUIZ_LINE_WORDS: 22,
    DURATION: 100,
    DELAY: 100,
    KEYMAP: {
        single: '单选题',
        multiple: '多选题',
        truth: '判断题'
    },
    PASS_SCORE: 8,
    SCORES: [0, 0, 0, 0, 0],
    SCALE: 4,
    SCALE2: 2,
    SPEED: 300,
    ENTRYTOLEVEL: {
        manson: 1,
        shipYard: 2,
        bar: 3,
        castle: 4,
        cave: 5
    }
}
let rect
let fx
let bgm
const Main = {
    init () {
    },
    preload () {
        game.load.image('loading_bar', 'assets/loading.png')
        game.load.image('loading_bg', 'assets/loading_bg.jpg')
        game.load.script('loading', 'loading.js')
        game.load.script('util', 'util.js')
        game.load.audio('begin', 'assets/audio/begin.mp3')
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


