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
		
		game.load.image('background_art', 'assets/background_city_street_road.jpg'); //test
		
		
		
		game.load.audio('background_theme', 'sounds/initialD_dejavu_background_theme.m4a'); //test
		game.load.audio('player_jump_sound_effect', 'sounds/quake_jump_sound_effect.m4a'); //test
		game.load.audio('player_cat_collision_sound_effect', 'sounds/robolox_off_sound_effect.m4a'); //test
		game.load.audio('celebrity_sound_effect', 'sounds/celebrity_thankyou.m4a'); //test
		
		
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
	
	var leftClickMouse; //test
	var restartButton; //test
	
	
    
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
		//var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //original
		//var spaceKey = game.input.activePointer.isDown; //test
		//leftClickMouse = game.input.activePointer.leftButton.isDown; //test
		
		
		//spaceKey.onDown.add(jump, this); //original
		//spaceKey.onDown.add(jump); //test
		/*
		if (leftClickMouse == true) //test //moved
		{
			jump(); //test
		}
		*/
		
		//-My code. Adding a restart button.
		restartButton = game.input.keyboard.addKey(Phaser.Keyboard.R); //test
		restartButton.onDown.add(restartGame); //test
		
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
		//if (bird.y < 0 || bird.y > 490) { //original
		if (bird.y < 0 || bird.y > 600) { //test
			//restartGame(); //original
			//restartGame(); //test
			
			
			game.sound.stopAll(); //test
			game.state.start('end'); //test
		}
		
		
		
		//game.physics.arcade.overlap(bird, pipes, restartGame, null); //original
		game.physics.arcade.overlap(bird, pipes, pipeHitsPlayer, null); //test
		game.physics.arcade.overlap(bird, celebrities, celebrityHitsPlayer, null); //test
		
		//--My code.Checks to see if total score is 500 or greater. If so, go to the end screen.
		
		if (score >= 500) {
			
			//Go to the end screen
			game.sound.stopAll(); //test
			game.state.start('victory_end'); //test
		}
		
		leftClickMouse = game.input.activePointer.leftButton.isDown; //test
		if (leftClickMouse == true) //test
		{
			jump(); //test
		}
		
		
		
	}
    
    //------------------------------------------------------------------------------------
	// Make the bird jump 
	//jump: function() { //original
	function jump() { //test
		// Add a vertical velocity to the bird
		//bird.body.velocity.y = -350; //original
		bird.body.velocity.y = -300; //original
		
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
	
	//My code---Celebrities hit player
	function celebrityHitsPlayer(player, celebrity) {
    
		celebrity.kill();
	
		//My code---------
		score += 10; //test
		//score += 700; //test //For testing the victory end scene fast.
		labelScore.text = scoreString + score; //test
		//scoreText.text = scoreString + score; //test
		//labelScore.text = score; //test
	
		//My code --- plays...
		sound = game.add.audio("celebrity_sound_effect"); //test
		sound.play(); //test
		
	}
	
	//My code---Walls hit playe
	function pipeHitsPlayer(player, pipe) {
    
		pipe.kill();
	
		//My code---------
		score -= 10; //test
		labelScore.text = scoreString + score; //test
		//scoreText.text = scoreString + score; //test
		//labelScore.text = score; //test
		
		//Makes the player go upwards after hitting a wall.
		bird.body.velocity.y = -600; //test
		
		
		//My code ---
		sound = game.add.audio("player_cat_collision_sound_effect"); //test
		sound.play(); //test
		
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
		//pipe.body.velocity.x = -200; //original
		pipe.body.velocity.x = -250; //test

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
		//celebrity.body.velocity.x = -250; //test
		celebrity.body.velocity.x = -300; //test

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
		//for (var i = 0; i < 8; i++) //original
		for (var i = 0; i < 10; i++) //test
			if (i != hole && i != hole + 1) 
				addOnePipe(400, i * 60 + 10); 
			//---My added code-----------------------------------------
			else { //test
				addOneCelebrity(400, i * 60 + 10); //test
			}
		
		//score += 1; //original
		//labelScore.text = score; //original
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
    
    game.state.add( "main", make_main_game_state( game ) ); //original
	game.state.add( "start", make_start_state(game) ); //test
	game.state.add( "end", make_end_state(game) ); //test
    game.state.add( "victory_end", make_victory_end_state(game) ); //test
	
	
   // game.state.start( "main" ); //original
	//--My code. Starting the game at the start scene instead of at main which is the main game. -------
	game.state.start( "start" ); //test
	
	//---------------------------------------------------------------------------------
	
	
};

//---------------------My code. More functions such as for the start and end state.-----------------------------------------------------------
function make_start_state(game)
{
	//preload function
	function preload() {
		game.load.image('title_screen', 'assets/title_screen_3.png'); //test
	}
	
	
	var background_art; //test
	
	var music; //test
	var sound; //test
	
	var startButton; //test
	var leftClickMouse; //test
	
	//Create function
	function create() {
		
		//this.music = null; //og
		//this.playButton = null; //og
		this.startButton = null; //test
		this.leftClickMouse = null; ///test
		
		//Adding the background art
		background_art = game.add.tileSprite(0, 0, 800, 600, 'title_screen'); //test
		
		//startButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //original
		
		
		//------------------------
		
		//this.music = this.add.audio('titleMusic'); //original
		//this.music = this.add.audio('title_theme'); //test
		//this.music.play(); //original

		//this.add.sprite(0, 0, 'titlepage'); //original
		//this.add.sprite(0, 0, 'title_screen'); //test

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
	}
	
	//Update function
	function update() {
		
		//-My code. Using Space Bar key to start the game----
		//if (startButton.isDown) //test
		/*
		if (startButton.isDown == true) //test
        {
			//Go to the main scene. The main part of the game.
			game.sound.stopAll(); //test
			game.state.start('main'); //test
        }
		*/
		
		//-My code. Using Mouse Left Click to start the game----
		leftClickMouse = game.input.activePointer.leftButton.isDown; //test
		if (leftClickMouse == true) //test
		{
			//Go to the main scene. The main part of the game.
			game.sound.stopAll(); //test
			game.state.start('main'); //test
		}
	}
	
	//Start Game function
	function startGame(pointer) {
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop(); //original

		//	And start the actual game
		//this.state.start('Game'); //original
		//this.state.start('main'); //test
	}
	
	return { "preload": preload, "create": create, "update": update, "startGame": startGame}; //test //Prof. given code
}

function make_end_state(game)
{
	
	
	var background_art; //test
	
	var music; //test
	var sound; //test
	
	var restartButton; //test
	
	
	function preload() {
		//game.load.image('background_art', 'assets/game_over_screen.jpg'); //test
		game.load.image('game_over_screen', 'assets/game_over_screen.jpg'); //test
	}
	
	function create() {
		//Adding the background art
		background_art = game.add.tileSprite(0, 0, 800, 600, 'game_over_screen'); //test
		
		//-My code. Adding a restart button.
		restartButton = game.input.keyboard.addKey(Phaser.Keyboard.R); //test
		restartButton.onDown.add(restartGame); //test
	}
	
	function update() {
		
		
	}
	
	// Restart the game
	//restartGame: function() { //original
	function restartGame() { //test
		// Start the 'main' state, which restarts the game
		game.state.start('main');
		
		// My added code ---------------------
		game.sound.stopAll();//test
	//},
	}
	
	
	return { "preload": preload, "create": create, "update": update}; //Prof. given code
	
}

function make_victory_end_state(game)
{
	
	var background_art; //test
	
	var music; //test
	var sound; //test
	
	var restartButton; //test
	
	function preload() {
		//game.load.image('background_art', 'assets/game_over_screen.jpg'); //test
		game.load.image('victory_screen', 'assets/victory_screen.jpg'); //test
	}
	
	function create() {
		//Adding the background art
		background_art = game.add.tileSprite(0, 0, 800, 600, 'victory_screen'); //test
		
		//-My code. Adding a restart button.
		restartButton = game.input.keyboard.addKey(Phaser.Keyboard.R); //test
		restartButton.onDown.add(restartGame); //test
	}
	
	function update() {
		
	}
	
	// Restart the game
	//restartGame: function() { //original
	function restartGame() { //test
		// Start the 'main' state, which restarts the game
		game.state.start('main');
		
		// My added code ---------------------
		game.sound.stopAll();//test
	//},
	}
	
	
	return { "preload": preload, "create": create, "update": update}; //Prof. given code
	
}
