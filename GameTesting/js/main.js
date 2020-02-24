"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        //Prof. default given code
		/*
		// Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
		*/
		
		//-------------------------------------------------------------------------
		// Load the bird sprite
		game.load.image('bird', 'assets/bird.png'); 
		game.load.image('pipe', 'assets/pipe.png');
    }
    
    var bouncy;
    
    function create() {
        //----------------------------------------------------------------------------------------------
		// Change the background color of the game to blue
		game.stage.backgroundColor = '#71c5cf';

		// Set the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Display the bird at the position x=100 and y=245
		this.bird = game.add.sprite(100, 245, 'bird');

		// Add physics to the bird
		// Needed for: movements, gravity, collisions, etc.
		game.physics.arcade.enable(this.bird);

		// Add gravity to the bird to make it fall
		this.bird.body.gravity.y = 1000;  

		// Call the 'jump' function when the spacekey is hit
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spaceKey.onDown.add(this.jump, this); //original
		spaceKey.onDown.add(jump); //test
		
		
		
		// Create an empty group
		this.pipes = game.add.group(); 
		
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
		
		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
    }
    
    function update() {
        //--------------------------------------------------------------------------------------------------
		// If the bird is out of the screen (too high or too low)
		// Call the 'restartGame' function
		if (this.bird.y < 0 || this.bird.y > 490) {
			//this.restartGame(); //original
			restartGame();
		}
		
		game.physics.arcade.overlap(
		this.bird, this.pipes, this.restartGame, null, this);
    }
	
	//------------------------------------------------------------------------------------
	// Make the bird jump 
	//jump: function() { //original
	function jump() { //test
		// Add a vertical velocity to the bird
		this.bird.body.velocity.y = -350;
	//}, original
	} //test

	// Restart the game
	//restartGame: function() { //original
	function restartGame() { //test
		// Start the 'main' state, which restarts the game
		game.state.start('main');
	//},
	}

	//addOnePipe: function(x, y) { //original
	function addOnePipe(x, y) { //test
		// Create a pipe at the position x and y
		var pipe = game.add.sprite(x, y, 'pipe');

		// Add the pipe to our previously created group
		this.pipes.add(pipe);

		// Enable physics on the pipe 
		game.physics.arcade.enable(pipe);

		// Add velocity to the pipe to make it move left
		pipe.body.velocity.x = -200; 

		// Automatically kill the pipe when it's no longer visible 
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	//},
	}

//addRowOfPipes: function() { //original
	function addRowOfPipes() { //test
		// Randomly pick a number between 1 and 5
		// This will be the hole position
		var hole = Math.floor(Math.random() * 5) + 1;

			// Add the 6 pipes 
		// With one big hole at position 'hole' and 'hole + 1'
		for (var i = 0; i < 8; i++)
			if (i != hole && i != hole + 1) 
				this.addOnePipe(400, i * 60 + 10);   
		
		this.score += 1;
		this.labelScore.text = this.score;  
	//},
	}
};
