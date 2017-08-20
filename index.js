const game = new Phaser.Game(1024, 768, Phaser.AUTO,"seabattle")
game.global = {
    WORD_DELAY: 20,
    // 80,
    LINE_DELAY: 20,
    // 200,
    MAX_LINE: 3,
    LINE_WORDS: 22,
    LEVELS: [0, -1, -1, -1, -1],
    QUIZ_LINE_WORDS: 15,
    DURATION: 100,
    DELAY: 100,
}
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
        util.setScale(this)
        console.log('in main create')
        game.state.add('Loading', Loading)
        game.state.start('Loading')
    }
}

game.state.add('Main', Main)
game.state.start('Main')


