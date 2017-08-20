const Loading = {
    init() {
        this.bg = game.add.image(0, 0, 'loading_bg')
        this.loadingBar = game.add.image(game.world.centerX, game.world.centerY, 'loading_bar')
        this.loadingBar.anchor.setTo(0.5)
    },
    preload() {
        this.load.setPreloadSprite(this.loadingBar)
        this.status = game.add.text(game.world.centerX, game.world.centerY - 30, '加载中...', { fill: 'black' });
        this.status.anchor.setTo(0.5)
        this.loadFonts()
        this.loadScript()
        this.loadBgm()
        this.loadImage()

    },
    loadBgm() {
        game.load.audio('dangerous', 'assets/audio/Dangerous.mp3')
        game.load.audio('continent', 'assets/audio/continent.mp3')
        game.load.audio('castle', 'assets/audio/castle.mp3')
    },
    loadScript() {
        game.load.script('font', 'lib/webfontloader.js')
        game.load.script('Menu', 'menu.js')
        game.load.script('map', 'map.js')
        game.load.script('level', 'level.js')
        game.load.text('level1_text', 'assets/level1.json')
        game.load.physics('physicsData', 'assets/physics.json');
        game.load.script('test', 'test.js')
    },
    loadFonts() {
        WebFontConfig = {
            // google: {
            //     families: ['Droid Sans', 'Droid Serif']
            // },
            custom: {
                families: ['custom'],
                urls: ['styles/font.css']
            },
            loading: function (name) { console.log('loading'); console.log(name) },
            // active() { console.log('active') },
            // inactive() { console.log('inactive') },
            // fontloading() { console.log('fontloading') },
            // fontactive() { console.log('font active') },
            // fontinactive() { console.log('fontinactive') }
        }
    },
    createText() {
        console.log('text loaded')
    },
    loadImage() {
        game.load.image('menu_bg', 'assets/menu_bg.jpg')
        game.load.image('map', 'assets/map.png')
        game.load.image('map_sea', 'assets/map_sea.jpg')
        game.load.image('map_mountain', 'assets/map_mountain.jpg')
        // game.load.atlas('knight', 'assets/knight.png', 'assets/knight.json')
        game.load.spritesheet('knight1', 'assets/knight2a.png', 32, 32, 12)
        game.load.image('level1_building', 'assets/building/1.png')
        game.load.image('level1_dialog_bg', 'assets/level1_dialog_bg.png')
        game.load.image('hero_facial', 'assets/facial/hero.png')
        game.load.image('dialog_box', 'assets/dialog_box.png')
        game.load.image('dialog_prompt', 'assets/dialog_prompt.png')
        game.load.image('duke_facial', 'assets/facial/duke.png')
        game.load.image('quiz_box', 'assets/quiz_box.png')
        game.load.spritesheet('buttons', 'assets/buttons.png', 30, 30, 6, 0, 0)
        game.load.image('title', 'assets/title.png')
        // game.load.image('title', 'assets/title1.png')
        // game.load.spritesheet('buttons', 'assets/buttons.png', 30, 30, 6, 0, 0)
        game.load.spritesheet('button_submit', 'assets/button_submit.png', 74, 26, 2, 0, 0)
    },
    addGameState() {
        game.state.add('Menu', Menu)
        game.state.add('Map', Map)
        game.state.add('Level', Level)
        game.state.add('test', test)

    },
    create() {
        this.addGameState()
        this.status.setText('加载完毕, 单击开始游戏')
        console.log('load complete')
        game.input.onTap.add(function (pointer) {
            // game.state.start('Menu')
            // game.state.start('test')
            // game.state.start('Map')
            game.state.start('Level')
            game.state.states.Level.currentLevel = 0
            // music.stop()
            // game.state.start('Level')
        }, this)
    }
}
