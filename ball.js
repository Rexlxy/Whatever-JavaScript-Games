
Ball = function(){
	var image = imageFromPath('images/ball.png')
    var o = {
   	  image:image,
      x: 130,
      y:200,
      speedX: 2,
      speedY: 2, 
      fired: false
    }

    o.fire = function(){
      o.fired = true
    }

    o.pause = function(){
      o.fired = false
    }

    o.move = function() {
      if(o.x<0 || o.x>400-o.image.width){
        o.speedX = -o.speedX
      }
      if(o.y<0 || o.y>400-o.image.height){
        o.speedY = -o.speedY
      }
      o.x += o.speedX
      o.y += o.speedY
    }

    o.bounce = function(){
    	o.speedY = -o.speedY
    }

    o.setImage = function(newImg){
      if(o.fired){
        return
      }
      o.image = imageFromPath(newImg)
    }

    return o
  }