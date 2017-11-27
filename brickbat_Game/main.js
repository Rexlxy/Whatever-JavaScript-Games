var loadLevel = function(game, n){
  n = n - 1;
  var level = levels[n]
  var blocks = []
  for (var i=0; i<level.length; i++){
    var p = level[i]
    var b = Block(game, p)
    blocks.push(b)
  }
  return blocks
}

var main = function() {
  var imageSrc = {
    ball: "images/ball.png",
    paddle: "images/default_paddle.png",
    brick: "images/block.png",
  }

  var game = Game(200, imageSrc, function() {
    var s = MainScene(game)
    game.runWithScene(s)
  })



}

main()
