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
