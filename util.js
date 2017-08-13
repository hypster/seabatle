const util = {
    setScale (game) {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    
    centerGameObjects (objects) {
        objects.forEach(function (object) {
        object.anchor.setTo(0.5);
        })
    }
}
