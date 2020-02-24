"use strict";

function make_main_game_state( game )
{
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
        //Prof. default given code
		/*
		// Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
		*/
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
		spaceKey.onDown.add(this.jump, this); 
		
		
		// Create an empty group
		this.pipes = game.add.group(); 
		
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
		
		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });   
		
	}
    
    function update() {
        //Prof. given code
		/*
		// Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
		*/
		
		//--------------------------------------------------------------------------------------------------
		// If the bird is out of the screen (too high or too low)
		// Call the 'restartGame' function
		if (this.bird.y < 0 || this.bird.y > 490)
			this.restartGame();
		
		
		game.physics.arcade.overlap(
		this.bird, this.pipes, this.restartGame, null, this);
		}
    
	//-More functins------------------------------------------------------------------------
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

	//----------------------------------------------------------------------------------------
    
	
	//Prof. given code
	return { "preload": preload, "create": create, "update": update }; //Prof. given code
}


window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
	//var game = new Phaser.Game(400, 490); //Original given
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
	
	//---------------------------------------------------------------------------------
	
	
};

//Functions
/*
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
*/