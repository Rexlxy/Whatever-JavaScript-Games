var main = function() {
  var imageSrc = {
    ball: "images/ball.png",
    paddle: "images/default_paddle.png",
    brick: "images/block.png",
  }

  var game = Game(200, imageSrc, function() {
    var paddle = Paddle(game)
    var ball = Ball(game)

    var bricks = []
    for (var i = 0; i < 23; i++) {
      brick = Brick(game)
      if (i % 5 == 0) {
        brick.x = 50
        brick.y += Math.floor(i / 5) * 30
      } else {
        brick.x += (i % 5) * 70
        brick.y += Math.floor(i / 5) * 30
      }
      bricks.push(brick)
    }
    //注册左箭头
    game.registerKey(37, function() {
      paddle.moveLeft()
    })
    //注册右箭头
    game.registerKey(39, function() {
      paddle.moveRight()
    })
    //注册a
    game.registerKey(65, function() {
      paddle.moveLeft()
    })
    //注册d
    game.registerKey(68, function() {
      paddle.moveRight()
    })
    //注册空格键
    game.registerKey(70, function() {
      ball.fire()
      game.gameStarted = true
      document.getElementById("status").innerHTML = "游戏中..."
    })

    game.drawAll = function() {
      //画砖块
      for (var i = 0; i < bricks.length; i++) {
        var b = bricks[i]
        if (b.alive) {
          game.draw(b)
        }
      }
      //画ball和paddle
      game.draw(ball)
      game.draw(paddle)
      game.drawScore()
      game.checkGG()
    }

    game.update = function() {
      //移动球
      if (ball.fired) {
        game.collide(ball, paddle)
        ball.move()
      } else {
        if (!game.gameStarted) {
          ball.x = paddle.x + Math.floor(paddle.w / 2) - Math.floor(ball.w / 2)
          ball.y = paddle.y - ball.image.height - 5
        }
      }

      for (var i = 0; i < bricks.length; i++) {
        var b = bricks[i]
        if (b.alive) {
          if (game.collide(ball, b)) {
            b.kill()
            game.count++
              game.score += 100
          }
        }
      }
    }

    //判断是否游戏结束
    game.checkGG = function() {
      var godMode = false
      if (document.getElementById("godMode").checked) {
        godMode = true
      }
      //球掉下去，游戏结束
      if (ball.y > 350 && !godMode) {
        document.getElementById("status").innerHTML = "呵呵，垃圾"
        //蒙一层色
        game.drawColorLayer()
        //Game over
        game.drawText('Game Over', 10, 205, '#FF6A6A', 'bold 70px arial')
        //分数
        game.drawText("Score:", 160, 280, 'FF6A6A', 'bold 20px arial')
        game.drawText(game.score, 230, 280, 'FF6A6A', 'bold 20px arial')
        game.gameOver = true
      }
      //砖块打光，过关
      if (game.count == bricks.length) {
        document.getElementById("status").innerHTML = "You win"
        // window.alert("GG")
        game.drawColorLayer()
        game.drawText('You win', 50, 205, 'FF6A6A', 'bold 70px arial')
        game.gameOver = true
      }
    }
  })

}

main()
