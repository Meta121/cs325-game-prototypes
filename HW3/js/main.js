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
		//game.load.image('bird', 'assets/bird.png'); //original
		game.load.image('bird', 'assets/player.png'); //test
		
		//game.load.image('pipe', 'assets/pipe.png'); //original
		game.load.image('pipe', 'assets/cat_wall.png'); //test
		
		
		//--My code-----------------------------------------------
		game.load.image('celebrity', 'assets/celebrity_collectable.png'); //test
		
		game.load.image('background_art', 'assets/background_city_street_road.jpg'); //original
		
		
		
		game.load.audio('background_theme', 'sounds/initialD_dejavu_background_theme.m4a'); //test
		game.load.audio('player_jump_sound_effect', 'sounds/quake_jump_sound_effect.m4a'); //test
		
		
		
    }
    
    var bouncy;
	
	//--Variables that I had to make for code to work-------
	var bird;
	var jump;
	var pipes;
	//var hole;
	var score;
	var timer;
	var labelScore;
	
	//--My new variables-------
	var celebrity; //test
	var celebrities; //test
	
	var scoreString = ''; //test
	
	
	var music; //test
	var sound; //test
	
	var background_art; //test
	
	
    
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
		
		// Change the background color of the game to blue //original
		//game.stage.backgroundColor = '#71c5cf'; //original
		
		//Adding the background art
		background_art = game.add.tileSprite(0, 0, 800, 600, 'background_art'); //test

		// Set the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Display the bird at the position x=100 and y=245
		bird = game.add.sprite(100, 245, 'bird');

		// Add physics to the bird
		// Needed for: movements, gravity, collisions, etc.
		game.physics.arcade.enable(bird);

		// Add gravity to the bird to make it fall
		bird.body.gravity.y = 1000;  

		// Call the 'jump' function when the spacekey is hit
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spaceKey.onDown.add(jump, this); //original
		spaceKey.onDown.add(jump); //test
		
		
		
		// Create an empty group
		pipes = game.add.group(); 
		
		//Creating a celebrities group
		celebrities = game.add.group(); //test
		
		timer = game.time.events.loop(1500, addRowOfPipes); 
		
		score = 0; //original
		scoreString = 'Score: '; //test
		//labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" }); //original
		labelScore = game.add.text(20, 30, scoreString + score, { font: "40px", fill: "#ffffff" }); //test 
		
		
		//--My code-----------------------------------------
		
		
		
		
		//My code--- Playing background theme
		music = game.add.audio("background_theme"); //test
		music.play('', 0, 1, true); //test
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
		
		//  Making the background scroll to the left.
		//background_art.tilePosition.x -= 2; //test
		background_art.tilePosition.x -= 10; //test
		
		
		// If the bird is out of the screen (too high or too low)
		// Call the 'restartGame' function
		if (bird.y < 0 || bird.y > 490) {
			//restartGame(); //original
			restartGame();
		}
		
		game.physics.arcade.overlap(bird, pipes, restartGame, null); //original
		game.physics.arcade.overlap(bird, celebrities, celebrityHitsPlayer, null); //test
	}
    
    //------------------------------------------------------------------------------------
	// Make the bird jump 
	//jump: function() { //original
	function jump() { //test
		// Add a vertical velocity to the bird
		bird.body.velocity.y = -350;
		
		//Playing a sound effect when you jump.
		//My code --- plays player_jump_sound_effect
		sound = game.add.audio("player_jump_sound_effect"); //test
		sound.play(); //test
		
	//}, original
	} //test

	// Restart the game
	//restartGame: function() { //original
	function restartGame() { //test
		// Start the 'main' state, which restarts the game
		game.state.start('main');
		
		// My added code ---------------------
		game.sound.stopAll();//test
	//},
	}
	
	//My code---Hearts hit player
	function celebrityHitsPlayer(player, celebrity) {
    
		celebrity.kill();
	
		//My code---------
		score += 10; //test
		scoreText.text = scoreString + score; //test
		//labelScore.text = score; //test
	
		//My code --- play power up sound
		//sound = game.add.audio("power_up_sound"); //test
		//sound.play(); //test
		
	}

	//addOnePipe: function(x, y) { //original
	function addOnePipe(x, y) { //test
		// Create a pipe at the position x and y
		var pipe = game.add.sprite(x, y, 'pipe');

		// Add the pipe to our previously created group
		pipes.add(pipe);

		// Enable physics on the pipe 
		game.physics.arcade.enable(pipe);

		// Add velocity to the pipe to make it move left
		pipe.body.velocity.x = -200; 

		// Automatically kill the pipe when it's no longer visible 
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	//},
	}
	
	//---My code-----------------------------------------
	function addOneCelebrity(x, y) { //test
		// Create a pipe at the position x and y
		//var pipe = game.add.sprite(x, y, 'pipe'); //original
		celebrity = game.add.sprite(x, y, 'celebrity'); //test

		// Add the pipe to our previously created group
		//pipes.add(pipe); //original
		celebrities.add(celebrity); //test

		// Enable physics on the pipe 
		//game.physics.arcade.enable(pipe); //oringinal
		game.physics.arcade.enable(celebrity); //test

		// Add velocity to the pipe to make it move left
		//pipe.body.velocity.x = -200; //original 
		celebrity.body.velocity.x = -250; //test

		// Automatically kill the pipe when it's no longer visible 
		//pipe.checkWorldBounds = true; //original
		//pipe.outOfBoundsKill = true; //original
		celebrity.checkWorldBounds = true; //test
		celebrity.outOfBoundsKill = true; //test
		
		
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
				addOnePipe(400, i * 60 + 10); 
			//---My added code-----------------------------------------
			else { //test
				addOneCelebrity(400, i * 60 + 10); //test
			}
		
		score += 1; //original
		labelScore.text = score;  
	//},
	}
	
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
    bird.body.velocity.y = -350;
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
    pipes.add(pipe);

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
            addOnePipe(400, i * 60 + 10);   
	
	score += 1;
	labelScore.text = score;  
//},
}
*/