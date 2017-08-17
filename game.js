var Game = function(fps, imageSrc, runCallback) {
  var g = {
    keyDowns: {},
    keyFunctions: {},
    images: {},
    gameOver: false,
    gameStarted: false,
    score: 0,
    count: 0,
  }
  g.canvas = document.getElementById("myCanvas")
  g.context = g.canvas.getContext('2d')

  g.getImage = function(imageKey) {
    return g.images[imageKey]
  }

  g.clear = function() {
    g.context.clearRect(0, 0, 400, 400)
  }

  window.addEventListener('keydown', function(event) {
    g.keyDowns[event.keyCode] = true
  })

  window.addEventListener('keyup', function(event) {
    g.keyDowns[event.keyCode] = false
  })

  g.registerKey = function(keyCode, callback) {
    g.keyFunctions[keyCode] = callback
  }

  //draw text
  g.drawText = function(text, x, y, color, font) {
    g.context.font = font
    g.context.fillStyle = color
    g.context.fillText(text, x, y)
  }

  g.drawColorLayer = function() {
    g.context.fillStyle = "rgba(255,165,0,0.8)"
    g.context.fillRect(0, 0, 400, 400)
  }

  g.draw = function(img) {
    g.context.drawImage(img.image, img.x, img.y)
  }

  g.drawScore = function() {
    g.drawText("Score:", 10, 380, 'blue', 'bold 16px arial')
    g.drawText(g.score, 60, 380, 'blue', 'bold 16px arial')
  }

  g.collide = function(object1, object2) {
    var result = checkBallIntersectB(object1, object2)
    if (result == null) {
      return false
    }
    if (result == "vertical") {
      console.log("竖直碰撞")
      object1.bounceVertical()
      return true
    }
    if (result == "horizontal") {
      console.log("水平碰撞")
      object1.bounceHorizontal()
      return true
    }

  }

  var loadCount = 0
  var imageKeys = Object.keys(imageSrc)
  for (var i = 0; i < imageKeys.length; i++) {
    //图片的路径的代号
    let imageKey = imageKeys[i]
    //图片路径
    var path = imageSrc[imageKey]
    //加载图片
    let img = new Image()
    img.src = path
    img.onload = function() {
      console.log("Load:", path)
      g.images[imageKey] = img
      loadCount++
      if (loadCount == imageKeys.length) {
        g.run()
      }

    }
  }

  g.getImage = function(name) {
    var img = g.images[name]
    var image = {
      w: img.width,
      h: img.height,
      image: img,
    }
    return image
  }
  //重复发生的游戏主体
  var runGame = function() {
    var keys = Object.keys(g.keyFunctions)
    for (var i = 0; i < keys.length; i++) {
      var keyCode = keys[i]
      // 如果对应键被按下
      if (g.keyDowns[keyCode]) {
        g.keyFunctions[keyCode]()
      }
    }
    //更新球的位置
    g.update()
    g.clear()
    g.drawAll()

    if (g.gameOver) {
      return
    }
    setTimeout(function() {
      runGame()
    }, 1000 / fps)
  }

  g.run = function() {
    runCallback()
    // 开始运行程序
    setTimeout(function() {
      runGame()
    }, 1000 / fps)
  }
  return g
}
