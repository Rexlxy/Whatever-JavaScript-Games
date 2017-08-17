var Brick = function(){
	var image = imageFromPath("images/block.png")
	var o = {
		image: image,
		x: 50,
		y: 20,
		alive: true,
	}
	o.kill = function(){
		o.alive = false
	}

	o.setImage = function(newImg){
		o.image = imageFromPath(newImg)
	}

	return o
}