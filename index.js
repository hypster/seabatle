const game = new Phaser.Game(1024, 768, Phaser.AUTO,"seabattle")
game.global = {
    WORD_DELAY: 80,
    LINE_DELAY: 200,
    MAX_LINE: 3,
    LINE_WORDS: 22
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


