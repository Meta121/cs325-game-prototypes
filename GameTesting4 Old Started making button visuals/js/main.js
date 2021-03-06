"use strict";

function make_main_game_state( game )
{
    function preload() {
        //game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71); //original
		//game.load.image('background','assets/misc/starfield.jpg'); //original
		game.load.spritesheet('button', 'assetsP2E/buttons/button_sprite_sheet.png', 193, 71);
		game.load.image('background','assetsP2E/misc/starfield.jpg');
    }
    
    var bouncy;
    //-Testing Code---------
	var button;
	var background;
	//--My code------
	
	
    function create() {
        game.stage.backgroundColor = '#182d3b';

		background = game.add.tileSprite(0, 0, 800, 600, 'background');

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

		button.onInputOver.add(over, this);
		button.onInputOut.add(out, this);
		button.onInputUp.add(up, this);
    }
    
    function update() {
       
    }
	
	//--My code. More functions, etc. for this state/scene.-------------------------------------------------
	function up() {
		console.log('button up', arguments);
	}

	function over() {
		console.log('button over');
	}

	function out() {
		console.log('button out');
	}

	function actionOnClick () {

		background.visible =! background.visible;

	}

	
	
	//--End of more of my code. -----------------------------------------------------------------------------------------
    
    return { "preload": preload, "create": create, "update": update };
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
    
    //var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    //game.state.add( "main", make_main_game_state( game ) ); //original
	//game.state.add( "Boot", make_boot_game_state( game ) ); //test
	//game.state.add( "PreLoader", make_preloader_game_state( game ) ); //test
	//game.state.add( "MainMenu", make_main_menu_game_state( game ) ); //test
	//game.state.add( "Level1", make_level_1_game_state( game ) ); //test
    
    //game.state.start( "main" ); //progoma;
	
	//-----------My code from Digital Assignment 3 reused----------------------------------
	var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
	//var game = new Phaser.Game(400, 490); //Original given
    
    game.state.add( "main", make_main_game_state( game ) ); //original
	game.state.add( "start", make_start_state(game) ); //test
	game.state.add( "end", make_end_state(game) ); //test
    game.state.add( "victory_end", make_victory_end_state(game) ); //test
	
	
   // game.state.start( "main" ); //original
	//--My code. Starting the game at the start scene instead of at main which is the main game. -------
	game.state.start( "start" ); //test
	
	
	//-----Tutorial Code. He used multile files so the tutorial video is probably in Phaser 3 instead of Phaser 2. -------------------------------------------------------
	/*
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');
	
	game.state.add('Boot', Game.Boot);
	game.state.add('Preloader', Game.Preloader);
	game.state.add('MainMenu', Game.MainMenu);
	game.state.add('Level1', Game.Level1);
	
	game.state.start('Boot');
	*/
};

//--My code-------------------------------------------------------------------
//---------------------My code. More functions such as for the start and end state.-----------------------------------------------------------
function make_start_state(game)
{
	//preload function
	function preload() {
		game.load.image('title_screen', 'assets/title_screen_3.png'); //test
		
		game.load.audio('start_scene_theme', 'sounds/initialD_runninginthe90s_background_theme.m4a'); //test
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
		
		//My code--- Playing theme
		music = game.add.audio("start_scene_theme"); //test
		music.play('', 0, 1, true); //test
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
		
		//My code--- Playing theme
		music = game.add.audio("end_scene_theme"); //test
		music.play('', 0, 1, true); //test
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



