var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var ifPointInRect=function(pX, pY, recX1, recX2, recY1, recY2){
	if(pX > recX1 && pX<recX2){
		if(pY > recY1 && pY<recY2){
			return true
		}
	}
	return false
}

var checkAcrossB = function(A, B){
	var width1 = A.image.width
	var height1 = A.image.height
	var width2 = B.image.width
	var height2 = B.image.height
	//左上
	if(ifPointInRect(A.x, A.y, B.x, B.x+width2, B.y, B.y+height2)){
		console.log("左上碰撞")
		return true
	}
	//右上
	if(ifPointInRect(A.x+width1, A.y, B.x, B.x+width2, B.y, B.y+height2)){
		console.log("右上碰撞")
		return true
	}
	//左下
	if(ifPointInRect(A.x, A.y+height1, B.x, B.x+width2, B.y, B.y+height2)){
		console.log("左下碰撞")
		return true
	}
	//右下
	if(ifPointInRect(A.x+width1, A.y+height1, B.x, B.x+width2, B.y, B.y+height2)){
		console.log("右下碰撞")
		return true
	}
	return false
}