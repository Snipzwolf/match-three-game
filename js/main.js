$(document).ready(function(){
  var gem_prefixs = [
    'yellow', 'blue', 'green', 'red', 'purple', 'pink'
  ];

  var gem_size = {
    w: 55,
    h: 82,
    m: 5
  };
  function preload() {
    game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
  }

  function create() {
     var a = game.add.sprite(0, 0, 'gems', 'yellow_gem_1');
     a.inputEnabled = true;
     a.input.enableDrag();
     game.add.sprite(0, 200, 'gems', 'yellow_gem_2');
  }

  function update() {

  }

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, enableDebug: false});
});
