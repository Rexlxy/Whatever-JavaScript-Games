var Game = function(){
  var g = {
    keyDowns:{},
    keyFunctions:{},
    gameOver:false
  }
  g.canvas = document.getElementById("myCanvas")
  g.context = g.canvas.getContext('2d')

  g.loadImage = function(){
    g.images["ball"] = imageFromPath(imageSrc.ball)
    g.images["paddle"] = imageFromPath(imageSrc.paddle)
    g.images["brick"] = imageFromPath(imageSrc.brick)
  }

  g.getImage = function(imageKey){
    return g.images[imageKey]
  }

  g.clear = function(){
    g.context.clearRect(0, 0, 400, 400)
  }


  window.addEventListener('keydown', function(event){
    g.keyDowns[event.keyCode] = true
  })

  window.addEventListener('keyup', function(event){
    g.keyDowns[event.keyCode] = false
  })

  g.registerKey = function(keyCode, callback){
    g.keyFunctions[keyCode] = callback
  }
  //draw text
  g.drawText = function(text, x, y, color, font){
    g.context.font = font
    g.context.fillStyle = color
    g.context.fillText(text, x, y)
  }

  g.drawColorLayer = function(){
    g.context.fillStyle = "rgba(255,165,0,0.8)"
    g.context.fillRect(0, 0, 400, 400)
  }

  g.draw = function(img){
   g.context.drawImage(img.image, img.x, img.y)
 }

 g.drawScore = function(score){
  g.drawText("Score:", 10, 380, 'blue', 'bold 16px arial' )
  g.drawText(score, 60, 380, 'blue', 'bold 16px arial' )
}

g.collide = function(object1, object2){
  var result = checkBallIntersectB(object1, object2)
  if(result == null){
    return false
  }
  if(result == "vertical"){
    console.log("竖直碰撞")
    object1.bounceVertical()
    return true
  }
  if(result == "horizontal"){
    console.log("水平碰撞")
    object1.bounceHorizontal()
    return true
  }
  
}

 
 //重复发生的游戏主体
 var runGame = function(){
  var keys = Object.keys(g.keyFunctions)
  for(var i = 0; i < keys.length; i++){
    var keyCode = keys[i]
      // 如果对应键被按下
      if (g.keyDowns[keyCode]){
            g.keyFunctions[keyCode]()
      }
    }
    //更新球的位置
    g.update()
    g.clear()
    g.drawAll()
    
    if(g.gameOver){
      return
    }
    setTimeout(function(){
      runGame()
    }, 1000/60)
  }


  // 开始运行程序
  setTimeout(function(){
    runGame()
  }, 1000/60)

  return g
}
