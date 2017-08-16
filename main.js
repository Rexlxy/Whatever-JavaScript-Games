   function runningGame(){
    //移动挡板
    if(rightKeyDown){
      paddle.moveRight()
    }
    if(leftKeyDown){
      paddle.moveLeft()
    }
    //移动球
    if(ball.fired){
      if(game.collide(ball, paddle)){
        ball.bounce()
      }
      ball.move()
    } else {
      if(!gameStarted){
        ball.x = paddle.x+Math.floor(paddle.image.width/2)-Math.floor(ball.image.width/2)
        ball.y = paddle.y-ball.image.height
      }
    }

    var ifBounce = false
    for(var i=0; i<bricks.length;i++){
      var b = bricks[i]
      if(b.alive){
        if(game.collide(ball, b)){
          b.kill()
          count++
          ifBounce = true
        } 
      }
    }
    if(ifBounce){
      ball.bounce()
    }
    
    updateUI()
    }


   function updateUI(){
      game.clear()
      for(var i=0; i<bricks.length;i++){
        var b = bricks[i]
        if(b.alive){
          game.draw(b)
        }
      }
      game.draw(ball)
      game.draw(paddle)
      game.drawScore(count)
      if(game.checkGG(count)){
        clearInterval(int)
      }
    }

  paddle = Paddle()
  ball = Ball()
  game = Game()

  var bricks = new Array()
  var leftKeyDown = false
  var rightKeyDown = false
  var gameStarted = false
  var count = 0

  for(var i=0; i<23; i++){
      brick = Brick()
      if(i%5==0){
        brick.x = 50
        brick.y += Math.floor(i/5)*30
      } else {
        brick.x += (i%5)*70
        brick.y += Math.floor(i/5)*30
      }
      bricks.push(brick)
    }

  window.addEventListener("keydown", function(event){
  //右箭头
  if(event.keyCode == 39){
  rightKeyDown = true
  }
  //左箭头
  else if(event.keyCode == 37){
    leftKeyDown = true
  }
  //空格 发射和暂停
  else if(event.keyCode == 32){
    if(ball.fired){
      ball.pause()
      document.getElementById("status").innerHTML = "暂停"
    }else{
      ball.fire()
      gameStarted=true
      document.getElementById("status").innerHTML = "游戏中..."
    }
  }
})

  window.addEventListener("keyup", function(event){
    if(event.keyCode == 39){
      rightKeyDown=false
  }
  else if(event.keyCode == 37){
      leftKeyDown=false
  }

  })
 

  var int = setInterval("runningGame()", 1000/80 )
    
   