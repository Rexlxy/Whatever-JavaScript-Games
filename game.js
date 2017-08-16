var Game = function(){
  var g = {
    gameName:110
  }
  g.canvas = document.getElementById("myCanvas")
  g.context = g.canvas.getContext('2d')

  g.clear = function(){
  g.context.clearRect(0,0, 400,400)
}

  //判断是否游戏结束
  g.checkGG = function(count){

    //球掉下去，游戏结束
    if(ball.y > 350){
    document.getElementById("status").innerHTML = "呵呵，垃圾"
    //蒙一层色
    g.drawColorLayer()
    //Game over
    g.drawText('Game Over', 10, 205, '#FF6A6A','bold 70px arial' )

    //分数
    g.drawText("Score:", 160, 280, 'FF6A6A','bold 20px arial' )
    g.drawText(count, 230, 280, 'FF6A6A','bold 20px arial' )
    return true
    }

    //砖块打光，过关
    if(count == bricks.length){
    document.getElementById("status").innerHTML = "You win"
      // window.alert("GG")
    g.drawColorLayer()
    g.drawText('You win', 50, 205, 'FF6A6A','bold 70px arial' )
    return true
    }
    return false
  }

  //draw text 
  g.drawText = function(text, x, y, color, font){
    g.context.font = font
    g.context.fillStyle = color
    g.context.fillText(text, x, y)
  }

  g.drawColorLayer = function(){
        g.context.fillStyle="rgba(255,165,0,0.8)"
    g.context.fillRect(0,0,400,400)
  }

  g.draw = function(img){
   g.context.drawImage(img.image, img.x, img.y)
}

  g.drawScore = function(score){
    g.drawText("Score:", 10, 380, 'blue','bold 16px arial' )
    g.drawText(score, 60, 380, 'blue','bold 16px arial' )
  }

  g.collide = function(object1, object2){
      if(checkAcrossB(object1, object2)){
        return true
      }
      if(checkAcrossB(object2, object1)){
        return true
      }
      return false
    }

return g
}
