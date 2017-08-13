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
    },
    loadScript() {
        game.load.script('font', 'lib/webfontloader.js')
        game.load.script('Menu', 'menu.js')
        game.load.script('map', 'map.js')
        game.load.script('level', 'level1.js')
        game.load.json('dialog', 'assets/dialog.json')
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
            active() { console.log('active') },
            inactive() { console.log('inactive') },
            fontloading() { console.log('fontloading') },
            fontactive() { console.log('font active') },
            fontinactive() { console.log('fontinactive') }
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
        game.load.atlas('knight', 'assets/knight.png', 'assets/knight.json')
        game.load.image('level1_dialog_bg', 'assets/level1_dialog_bg.png')
        game.load.image('hero_facial', 'assets/facial/hero.png')
        game.load.image('dialog_box', 'assets/dialog_box.png')
        game.load.image('dialog_prompt', 'assets/dialog_prompt.png')
        game.load.image('duke_facial', 'assets/facial/duke.png')
    },
    addGameState() {
        game.state.add('Menu', Menu)
        game.state.add('Map', Map)
        game.state.add('Level1', Level1)

    },
    create() {
        this.addGameState()
        this.status.setText('加载完毕, 单击开始游戏')
        console.log('load complete')
        game.input.onTap.add(function (pointer) {
            // game.state.start('Menu')
            // game.state.start('Map')
            game.state.start('Level1')
        }, this)
    }
}