var Paddle = function(){
     var image = imageFromPath('images/default_paddle.png')
          var o = {
            image:image,
            x:200,
            y:350,
            speed:5
          }



          o.moveLeft = function(){
            if(o.x <0){
              return
            }
            o.x -= o.speed
          }
          

          o.moveRight = function(){
            if(o.x > 400-o.image.width){
              return
            }
            o.x += o.speed
          }

    o.setImage = function(newImg){
      o.image = imageFromPath(newImg)
    }
          return o
        }