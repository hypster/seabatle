const Loading = {
    init() {
        this.bg = game.add.image(game.world.centerX, game.world.centerY, 'loading_bg')
        this.loadingBar = game.add.image(game.world.centerX, game.world.centerY, 'loading_bar')
        this.bg.anchor.setTo(0.5)
        this.loadingBar.anchor.setTo(0.5)
        bgm = game.add.audio('begin', 0.5, true)
        bgm.play()
        // game.load.onLoadStart.add(() => {
        //     console.log('load start')
        // }, this)
        // game.load.onFileComplete.add((progress, cachekey, success, totalLoaded, totalFiles) => {
        //     console.log(`${cachekey} loaded, ${progress} % - ${totalLoaded} out of ${totalFiles}`)
        // }, this)
        // game.load.onLoadComplete.add(() => {
        //     console.log('load complete')
        // }, this)
    },
    preload() {
        this.load.setPreloadSprite(this.loadingBar)
        this.status = game.add.text(game.world.centerX, game.world.centerY - 30, '加载中...', { fill: 'black' });
        this.status.anchor.setTo(0.5)
        this.loadFonts()
        this.loadScript()
        this.loadBgm()
        this.loadImage()
        this.loadOthers()

    },
    loadBgm() {
        // game.load.audio('dangerous', 'assets/audio/Dangerous.mp3')
        // game.load.audio('continent', 'assets/audio/continent.mp3')
        // game.load.audio('castle', 'assets/audio/castle.mp3')
        game.load.audio('field', 'assets/audio/field.mp3')
        game.load.audio('manor', 'assets/audio/manor.mp3')
        game.load.audio('bar', 'assets/audio/bar.mp3')
        game.load.audio('dialog', 'assets/audio/dialog.mp3')
        game.load.audio('quiz', 'assets/audio/quiz.mp3')
        game.load.audio('castle', 'assets/audio/castle.mp3')
        game.load.audio('cave', 'assets/audio/cave.mp3')
        // fx
        game.load.audio('accept', 'assets/audio/fx/accept.mp3')
        game.load.audio('select', 'assets/audio/fx/select.mp3')
        game.load.audio('click', 'assets/audio/fx/click.mp3')
        game.load.audio('coin', 'assets/audio/fx/coin.mp3')
        game.load.audio('wind', 'assets/audio/fx/wind.mp3')
        game.load.audio('press', 'assets/audio/fx/press.mp3')
        game.load.audio('die', 'assets/audio/fx/die.mp3')
        game.load.audio('levelup', 'assets/audio/fx/levelup.mp3')
        game.load.audio('ocean', 'assets/audio/fx/ocean.mp3')
        game.load.audio('offshore', 'assets/audio/fx/splash.mp3')
        game.load.audio('offsea', 'assets/audio/fx/offsea.mp3')
        game.load.audio('wave', 'assets/audio/fx/wave.mp3')
        game.load.audio('rain', 'assets/audio/fx/rain.mp3')
    },
    loadScript() {
        game.load.script('font', 'lib/webfontloader.js')
        game.load.script('Menu', 'menu.js')
        game.load.script('map', 'map.js')
        game.load.script('level', 'level.js')
        game.load.script('levels', 'levels.js')
        game.load.script('end', 'end.js')
        // game.load.text('level1_text', 'assets/data/level1.json')
        // game.load.text('level2_text', 'assets/data/level1.json')
        // game.load.text('level3_text', 'assets/data/level1.json')
        // game.load.text('level4_text', 'assets/data/level1.json')
        // game.load.text('level5_text', 'assets/data/level1.json')
        game.load.text('level1_text', 'assets/data/level1_copy.json')
        game.load.text('level2_text', 'assets/data/level2.json')
        game.load.text('level3_text', 'assets/data/level3.json')
        game.load.text('level4_text', 'assets/data/level4_copy.json')
        game.load.text('level5_text', 'assets/data/level5.json')
        // game.load.text('level1_text', 'level1test.json')
        // game.load.script('test', 'test.js')
    },
    loadOthers () {
        game.load.tilemap('bigmap', 'assets/tiles/bigmap.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.tilemap('bar', 'assets/tiles/bar.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.tilemap('manor', 'assets/tiles/manor.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.tilemap('dock', 'assets/tiles/dock.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.tilemap('castle', 'assets/tiles/castle.json', null, Phaser.Tilemap.TILED_JSON)

        // game.load.tilemap('cave_outside', 'assets/tiles/cave_outside.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.tilemap('cave_inside', 'assets/tiles/cave_inside.json', null, Phaser.Tilemap.TILED_JSON)
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
        }
    },
    createText() {
        console.log('text loaded')
    },
    loadImage() {
        game.load.image('menu_bg', 'assets/menu_bg1.jpg')
        game.load.spritesheet('questionMark', 'assets/Expressions.png', 18, 17, 15)
        game.load.image('fullscreen', 'assets/enter-fullscreen.png')
        game.load.image('exit-fullscreen', 'assets/exit-fullscreen.png')
        
        //grand map
        game.load.image('grand', 'assets/tiles/grand.png')
        game.load.image('collision16x16', 'assets/tiles/collision16x16.png')
        game.load.image('collision32x32', 'assets/tiles/collision32x32.png')
        game.load.image('water', 'assets/tiles/water.png')
        game.load.image('mountains', 'assets/tiles/mountains.png')

        //level1
        game.load.image('castle', 'assets/tiles/Castle.png')
        game.load.image('grass', 'assets/tiles/PathAndObjects.png')
        game.load.image('market', 'assets/tiles/market.png')
        game.load.image('trees', 'assets/tiles/trees1.png')
        game.load.spritesheet('coin', 'assets/tiles/coin.png', 32, 32)

        //level2
        game.load.image('woodland1', 'assets/tiles/woodland_indoor_0.png')
        game.load.image('woodland2', 'assets/tiles/woodland_indoor_x2.png')
        game.load.image('woodland3', 'assets/tiles/woodland_indoor_x3.png')
        game.load.image('rain', 'assets/rain.png')

        //level3
        game.load.image('ladder', 'assets/tiles/ship/ladder.png')
        game.load.image('Ship_Bfix', 'assets/tiles/ship/Ship_Bfix.png')
        game.load.image('ship', 'assets/tiles/ship/ship.png')
        game.load.image('sea1', 'assets/tiles/ship/sea1.png')

        //level4
        game.load.image('sewer_1', 'assets/tiles/sewer_1.png' )

        //level5
        game.load.image('cave', 'assets/tiles/cave.png')
        game.load.image('objects', 'assets/tiles/objects.png')


        //button
        game.load.image('left', 'assets/button/left.png')
        game.load.image('up', 'assets/button/up.png')
        game.load.image('right', 'assets/button/right.png')
        game.load.image('down', 'assets/button/down.png')
        game.load.image('action', 'assets/button/action.png')
        
        game.load.image('hero_facial', 'assets/facial/hero1.png')
        game.load.image('dialog_box', 'assets/dialog_box1.png')
        game.load.image('dialog_prompt', 'assets/dialog_prompt.png')
        game.load.image('duke_facial', 'assets/facial/duke1.png')
        game.load.image('quiz_box', 'assets/quiz_box1a.png')
        game.load.spritesheet('buttons', 'assets/buttons.png', 30, 30, 6, 0, 0)
        game.load.image('title', 'assets/title.png')
        game.load.image('warrior_facial', 'assets/facial/warrior.png')
        game.load.image('oden_facial', 'assets/facial/oden.png')
        //character
        game.load.spritesheet('knight1', 'assets/character/hero.png', 32, 32)
        game.load.spritesheet('bartender', 'assets/character/bartender.png', 32, 32)
        game.load.spritesheet('npc1', 'assets/character/npc1.png', 32, 32)
        game.load.spritesheet('npc2', 'assets/character/npc2.png', 32, 32)
        game.load.spritesheet('npc3', 'assets/character/npc3.png', 32, 32)
        game.load.spritesheet('npc4', 'assets/character/npc4.png', 32, 32)
        game.load.spritesheet('npc5', 'assets/character/npc5.png', 32, 32)
        game.load.spritesheet('duke', 'assets/character/duke.png', 32, 32)
        game.load.spritesheet('soldier', 'assets/character/soldier.png', 32, 32)
        game.load.spritesheet('warrior', 'assets/character/warrior.png', 32, 32)
        game.load.spritesheet('builder', 'assets/character/builder.png', 32, 32)
        game.load.spritesheet('oden', 'assets/character/oden.png', 32, 32)
        game.load.spritesheet('shipSprite', 'assets/character/ship.png', 33, 32)

        game.load.image('builder_facial', 'assets/facial/builder.png')
        // game.load.image('title', 'assets/title1.png')
        // game.load.spritesheet('buttons', 'assets/buttons.png', 30, 30, 6, 0, 0)
        game.load.spritesheet('button_submit', 'assets/button_submit.png', 74, 26, 2, 0, 0)
        game.load.image('feedback', 'assets/feedback.png')
        game.load.spritesheet('cross', 'assets/cross.png')
    },
    addGameState() {
        game.state.add('Menu', Menu)
        game.state.add('Map', Map)
        // game.state.add('Level', Level)
        game.state.add('level1', level1)
        game.state.add('level2', level2)
        game.state.add('level3', level3)
        game.state.add('level4', level4)
        game.state.add('level5', level5)
        game.state.add('end', end)
        // game.state.add('test', test)

    },
    create() {
        this.addGameState()
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        this.status.setText('加载完毕, 单击开始游戏')
        game.input.onTap.addOnce(function (pointer) {
            game.scale.startFullScreen(false)
            game.state.start('Menu')
            // game.state.start('test')
            // game.state.start('Map')
            
            // game.state.start('level1')
            // game.state.start('level2')
            // game.state.start('level3')
            // game.state.start('level4')
            // game.state.start('level5')
            // game.state.start('end')
            // game.state.states.level1.currentLevel = 0
            // music.stop()
            // game.state.start('Level')
        }, this)
    }
}
