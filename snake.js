function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;  //tracks length of snake with 0=no body, just head and 1=1 body + head
  this.tail = [];  //array to track the location of the tail
  
  //Check to see if the snake has eaten the food with distance calc
  this.eat = function(pos) {
	  var d = dist(this.x, this.y, pos.x, pos.y);

	  if (d < 1) {
		  this.total++;
		  return true;
	  } else {
		  return false;
	  }
  }
  
  this.dir = function(x,y) {
    this.xspeed = x;
    this.yspeed = y;
}

   //Check to see if the snake has run into itself (if so loose tail)
   this.death = function() {
	   for (var i = 0; i < this.tail.length; i++) {
		   var pos = this.tail[i];
		   var d = dist(this.x, this.y, pos.x, pos.y);
		   if (d < 1) {
			   this.total = 0;
			   this.tail  = [];
		   }
	   }
   }	   

   this.update = function() {
	//if the food was not eaten, shift all the positions in array
	if (this.total === this.tail.length) {
	  for (var i=0; i < this.tail.length-1; i++) {
	    this.tail[i] = this.tail[i+1];
	  }
	}		
    this.tail[this.total-1] = createVector(this.x,this.y);

    console.log("this.x=",this.x);
    console.log("this.y=",this.y);	
	
    this.x = this.x + this.xspeed*scl;	
	this.y = this.y + this.yspeed*scl;
	
	//constrain the snake to the Canvas
	//this.x = constrain(this.x, 0, width-scl);
	//this.y = constrain(this.y, 0, height-scl);
	
	//let the snake move off the end of the canvas and reappear on the opposite sidebar
	if (this.x > width-scl) {
		this.x = 0
	} else {
		if (this.x < 0) {
		this.x = width-scl
	    }	
    }	
	
	if (this.y > height-scl) {
		this.y = 0
	} else {
		if (this.y < 0) {
		this.y = height-scl
	    }	
    }
}	
	
  this.show = function() {
	fill(255);  
	//draw the tail from positions in the tail array
	for (var i=0; i < this.tail.length; i++) {
		rect(this.tail[i].x,this.tail[i].y,scl,scl);
	}
	
    //Increase the pace of game as the snake grows
	if (this.total < 5) {
		frameRate(10);
	} else {
		frameRate(this.total * 2);
	}		
	rect(this.x,this.y,scl,scl);
  }
  


}
