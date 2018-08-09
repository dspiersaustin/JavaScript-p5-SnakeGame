// The Snake Game - in Java Script using p5.js framework

/*Object of Game:  Move snake around screen with direction arrows (up, down, left, right)
                   and try to eat the fruit.  Each time you eat a piece of fruit 
				   the snake will get longer.  The speed of the game will also increase
				   as more fruit is eaten.  Try not to run over your tail or you have to
				   start over since you loose your tail.



Credits: Based on Coding Challenge #3: The Snake Game
The Coding Train - https://www.youtube.com/watch?v=AaGK-fj-BAM


My modifications to game (dspiers 8/9/2018):
 1)  Don't allow snake to move backwards
 2)  Increase speed of game (frameRate) as snake gets longer
 3)  If snake goes off the screen, reappear on opposite side
 */

var s;         //snake object
var scl = 20;  //scale - height/width of snake head, width of tail
var food;      //food vector - position of the 1 piece of food on screen
var last_keyCode = 0;

function setup() {
  createCanvas(600, 600);   
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  //console.log('In pickLocation');
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
} 

function draw() {
  background(51);
  
  //if snake eats the food, create new food at new random location
  if (s.eat(food)) {
	  pickLocation();
  }
  s.death();   //check to see if snake hits tail
  s.update();  //update memory for new snake position
  s.show();    //display snake
  
  fill(255,0,100);  
  rect(food.x,food.y,scl,scl);    //draw food - size of snake head
  
}

function keyPressed() {        
	//check to see if snake is trying to move backwards on itself and don't allow
	if (keyCode === 38) {                    //UP_ARROW   =38
		if (last_keyCode===40) {             //DOWN_ARROW =40
		  last_keyCode=40;                   //DOWN_ARROW =40 
		} else {
			last_keyCode=keyCode;
			s.dir(0,-1);
		}
    } else {
	    if (keyCode === 40) {                //DOWN_ARROW =40
		  if (last_keyCode===38) {           //UP_ARROW   =38
		    last_keyCode=38;                 //UP_ARROW   =38
		  } else {
			  last_keyCode=keyCode;
			  s.dir(0,1);
		  }
    } else {
	    if (keyCode === 37) {              //LEFT_ARROW   =37
		  if (last_keyCode===39) {         //RIGHT_ARROW  =39
		    last_keyCode=39;               //RIGHT_ARROW  =39
		  } else {
			  last_keyCode=keyCode;
			  s.dir(-1,0);
		  }
    } else {
	    if (keyCode === 39) {               //RIGHT_ARROW  =39
		  if (last_keyCode===37) {          //LEFT_ARROW   =37
		    last_keyCode=37;                //LEFT_ARROW   =37
		  } else {
			  last_keyCode=keyCode;
			  s.dir(1,0);
		  }
		}
	  }
    }
  }
}


