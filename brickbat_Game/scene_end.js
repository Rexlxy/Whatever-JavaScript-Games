var SceneEnd = function(game) {
  var s = {
    game: game,
  }
    s.context = game.context
    //按r重新开始游戏
    game.registerKey(82, function() {
      console.log("r pressed")
      var game = Game(200, imageSrc, function() {
        var s = MainScene(game)
        game.runWithScene(s)
      })
    })

  s.draw = function() {
    document.getElementById("status").innerHTML = "呵呵，垃圾"
    s.drawColorLayer()
    //Game over
    s.drawText('Game Over', 10, 205, '#FF6A6A', 'bold 70px arial')
    //分数
    s.drawText("Score:", 160, 280, 'FF6A6A', 'bold 20px arial')
    s.drawText(game.score, 230, 280, 'FF6A6A', 'bold 20px arial')

  }

  s.update = function() {

  }
  //draw游戏结束时的一层色板
  s.drawColorLayer = function() {
    s.context.fillStyle = "rgba(255,165,0,0.8)"
    s.context.fillRect(0, 0, 400, 400)
  }

  //在特定坐标画上文字
  s.drawText = function(text, x, y, color, font) {
    s.context.font = font
    s.context.fillStyle = color
    s.context.fillText(text, x, y)
  }
  return s
}
