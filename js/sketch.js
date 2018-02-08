let generation = 0
class tChar{

	constructor(_x, _y ,_text){
		
		if ( typeof _x == 'string' ) {
			_text = _x
			_x = random(width)
			_y = random(height)
		}else if (typeof _x == 'number' && typeof _y == 'number' && typeof _text == 'string'){

		}else{
			alert('arguments is bullshit')
		}


		this.x = _x
		this.y = _y
		this.text = _text
		this.xoff = random(20)
		this.yoff = random(20)
		this.trail = []
		this.trail.push(createVector (5, 5))
	}


	randomMove(){
		this.x = map(noise(this.xoff), 0, 1, -1, 1) * 200
		this.y = map(noise(this.yoff), 0, 1, -1, 1) * 200
		this.xoff+=.005
		this.yoff+=.005


		if (this.trail.length < 50) {
			this.trail.push(createVector (this.x, this.y))
		}else{
			this.trail.splice(0,1)
			this.trail.push(createVector (this.x, this.y))
		}
	}

	setupStyle(){
		noFill()
		fill(20,50,80,50)
		strokeWeight(2)
		stroke(255,0,50,140)
	}

	render(){
		
		this.setupStyle()

		text(this.text, this.x, this.y)
		
		strokeWeight(this.trail[0].mag() / (8))
		beginShape()
		noFill()
		this.trail.map(x => {
			stroke(255, x.mag()%255, 0, 40)
			strokeWeight(x.mag() / (10))

			vertex(x.x, x.y)
		})
		endShape()
	}

	toString(){

		return this.text.toString()
	}
}


let strArr = []

function setup(){
	createCanvas(700, 700)
	strArr = [new tChar('a'), new tChar('c')]
	strokeWeight(2)

}


// xoff logic
let xoff = 50
let delta = .1

function draw(){
	// draw background
	background(xoff, 100)
	
	// xoff logic
	xoff+=delta
	if (xoff > 100) {
		delta *= -1
	}
	if (xoff < 50) {
		delta *= -1
	}


	// instructions
	textSize(14)
	fill(255)
	stroke(0)
	strokeWeight(2)
	text('HOW TO PLAY:', 0, 10)
	text('space - to spawn next generation | i - infect, o - kill half of all, p - clear all \'c\'', 10, 30)
	text(`current generation: ${generation}`, 10, 55)
	text(`content       : ${strArr.toString()}`, 10, 80)
	text(`their length: ${strArr.length}`, 10, 95)


	// drawing text
	translate(width/2, height/2)
	textSize(50)
	strArr.map(textChar => {
		textChar.randomMove()
		textChar.render()
		// text(textChar.text,textChar.x,textChar.y)
	})

}


function generate() {
	strNew  = []
	strArr.map( x => {
		if (x.text == 'a') {
			strNew.push(new tChar('c'))
		}
		if (x.text == 'b') {
			if (random(100) < 20) {

				strNew.push(new tChar('b'))
				strNew.push(new tChar('a'))
			}else{
				strNew.push(new tChar('b'))

			}
		}
		if (x.text == 'c') {
			if (random(100) < 30) {

				strNew.push(new tChar('b'))
				strNew.push(new tChar('a'))
				strNew.push(new tChar('a'))
			}else{
				strNew.push(new tChar('b'))
				
			}
		}
		if (x.text == ' ') {
			strNew.push(new tChar('a'))
		}

	})

	strArr = strNew
	console.log(strNew)
}

function keyPressed(event){
	
	switch(event.key){

		case ' ':
			generate();
			generation+=1
		break;

		case 'i':
			strArr.push(new tChar(' '))
		break;

		case 'o':
			strArr = strArr.splice(strArr.length/2, strArr.length/2)
		break;

		case 'p':
			filtered = strArr.filter(x => x != 'c')
			strArr = filtered
		break;
	}
}