"use strict";

function make_main_game_state( game )
{
    function preload() {
        //Original code
		//game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71); //original
		//game.load.image('background','assets/misc/starfield.jpg'); //original
		//game.load.spritesheet('button', 'assetsP2E/buttons/button_sprite_sheet.png', 193, 71); //test
		//game.load.image('background','assetsP2E/misc/starfield.jpg'); //test
		
		//--My code-------------------------------------------
		//game.load.image('background_art', 'assets/battle_background.png'); //test
		game.load.image('background_art', 'assets/battle_background_2.jpg'); //test
		
		game.load.image('attack_button', 'assets/attackBox_template.png'); //test
		game.load.image('defend_button', 'assets/defendBox_template.png'); //test
		game.load.image('special_button', 'assets/specialBox_template.png'); //test
		game.load.image('heal_button', 'assets/healBox_template.png'); //test
		
		game.load.audio('background_theme', 'sounds/umvci_vergil_theme.m4a'); //test
		game.load.audio('button_click_sound_effect', 'sounds/Blip_Select.mp3'); //test
		game.load.audio('player_got_hit_sound_effect', 'sounds/robolox_off_sound_effect.m4a'); //test
		game.load.audio('player_sword_attack_sound_effect', 'sounds/sword_slash_sound_effect.m4a'); //test
		game.load.audio('player_defend_sound_effect', 'sounds/ssbu_perfect_shield_sound_effect.m4a'); //test
		game.load.audio('player_special_move_sound_effect', 'sounds/dbz_special_move_sound_effect.m4a'); //test
		game.load.audio('player_drinks_potion_sound_effect', 'sounds/minecraft_potion_drink_sound_effect.m4a'); //test
		
    }
    
    //var bouncy;
    //-Testing Code---------
	//var button; //original
	//var background; //original
	//--My code------
	var score; //test
	var scoreString = ''; //test
	var labelScore; //test
	
	//var battle_background; //test
	var background_art; //test
	var music; //test
	var sound; //test
	
	var player; //test
	var enemy; //test
	var enemies; //test
	
	var playerHealth = 0; //test
	var playerHealthString = ''; //test
	var labelPlayerHealth; //test
	
	var enemyHealth = 0; //test
	var enemyHealthString = ''; //test
	var labelEnemyHealth; //test
	
	var playerPotionAmount = 1; //test
	var playerPotionAmountString = ''; //test
	var labelPlayerPotionAmount; //test
	
	var specialMeter = 0; //test
	var specialMeterString = ''; //test
	var labelSpecialMeter; //test
	
	var move; //test
	var playerDecision; //test
	var enemyDecision; //test
	
	var attack_button; //test
	var defend_button; //test
	var special_button; //test
	var heal_button; //test
	
	var restartButton; //test
	
    function create() {
        //-Phaser 2 Example code-------------------------------------------
		/*
		game.stage.backgroundColor = '#182d3b';

		background = game.add.tileSprite(0, 0, 800, 600, 'background');

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

		button.onInputOver.add(over, this);
		button.onInputOut.add(out, this);
		button.onInputUp.add(up, this);
		*/
		//-Phaser 2 Example code End ---------------------------------------------
		
		//--My code. Start. ------------------------------------------------------------------
		
		//Adding the background art
		background_art = game.add.tileSprite(0, 0, 800, 600, 'background_art'); //test
		
		//-My code. Adding a restart button.
		restartButton = game.input.keyboard.addKey(Phaser.Keyboard.R); //test
		restartButton.onDown.add(restartGame); //test
		
		// Create an empty group
		enemies = game.add.group(); 
		
		//Creating and setting score
		score = 0; //original
		scoreString = 'Score: '; //test
		//labelScore = game.add.text(20, 30, scoreString + score, { font: "40px", fill: "#ffffff" }); //test 
		labelScore = game.add.text(325, 0, scoreString + score, { font: "40px", fill: "#ffffff" }); //test 
		
		//Creating and setting Player Health on the screen
		//playerHealth = 1500; //test
		playerHealth = 3000; //test
		playerHealthString= 'Player Health: \n'; //test 
		labelPlayerHealth = game.add.text(0, 0, playerHealthString + playerHealth, { font: "40px", fill: "#00FF00" }); //test 
		
		//Creating and setting Player Health on the screen
		//enemyHealth = 2000; //test
		enemyHealth = 5000; //test
		enemyHealthString= 'Enemy Health: \n'; //test 
		labelEnemyHealth = game.add.text(550, 0, enemyHealthString + enemyHealth, { font: "40px", fill: "#FF0000" }); //test 
		
		//Creating and setting up the Special Meter. At 100, can use special move.
		specialMeter = 0; //test
		specialMeterString = 'Special Meter: '; //test 
		labelSpecialMeter = game.add.text(0, 100, specialMeterString + specialMeter, { font: "30px", fill: "#FF00FF" }); //test 
		
		//Creating and setting up the potion amount.
		playerPotionAmount = 1; //test
		playerPotionAmountString = 'Potions: '; //test 
		labelPlayerPotionAmount = game.add.text(0, 135, playerPotionAmountString + playerPotionAmount, { font: "30px", fill: "#000000" }); //test 
		
		//My code--- Playing background theme
		music = game.add.audio("background_theme"); //test
		music.play('', 0, 1, true); //test
		
		//Adding the buttons/button_sprite_sheet
		//button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0); //original
		attack_button = game.add.button(0, 500, 'attack_button', playerAttackActionOnClick, this); //test
		defend_button = game.add.button(200, 500, 'defend_button', playerDefendActionOnClick, this); //test
		special_button = game.add.button(400, 500, 'special_button', playerSpecialActionOnClick, this); //test
		heal_button = game.add.button(600, 500, 'heal_button', playerHealActionOnClick, this); //test
		//--My code. End. ------------------------------------------------------------------
    }
    
    function update() {
       
	   
	   //Game Over occurs when player has 0 health.
	   if (playerHealth <= 0)
	   {
			game.sound.stopAll(); //test
			game.state.start('end'); //test
	   }
	   
	   //Goes to victory screen when the player wins when enemy health is 0 or less.
	   if (enemyHealth <= 0) {
			//Go to the end screen
			game.sound.stopAll(); //test
			game.state.start('victory_end'); //test
		}
    }
	
	//--My code. More functions, etc. for this state/scene.-------------------------------------------------
	//Original code
	/*
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
	*/
	
	/*
	* What happens when the player clicks the attack action button
	*/
	function playerAttackActionOnClick () {
		
		//My code---------
		score += 10; //test
		labelScore.text = scoreString + score; //test
		
		//enemyHealth -= 175; //test
		enemyHealth -= 200; //test
		labelEnemyHealth.text = enemyHealthString + enemyHealth; //test
		
		specialMeter += 15; //test
		labelSpecialMeter.text = specialMeterString + specialMeter; //test
	
		
		//--Testing enemy damage-----
		playerHealth -= 200; //test
		labelPlayerHealth.text = playerHealthString + playerHealth; //test
		
		
		//My code --- plays button click sound effect
		sound = game.add.audio("button_click_sound_effect"); //test
		sound.play(); //test
		
		//My code --- plays player sword attack sound effect
		sound = game.add.audio("player_sword_attack_sound_effect"); //test
		sound.play(); //test
		
		//My code --- plays player got hit sound effect.
		sound = game.add.audio("player_got_hit_sound_effect"); //test
		sound.play(); //test
		
	}
	
	function playerDefendActionOnClick () {
		
		//My code---------
		score += 20; //test
		labelScore.text = scoreString + score; //test
		
		enemyHealth -= 0; //test //You deal no damage to the enemy
		labelEnemyHealth.text = enemyHealthString + enemyHealth; //test
		
		specialMeter += 30; //test //You gain more special meter when you defend
		labelSpecialMeter.text = specialMeterString + specialMeter; //test
		
		//--Testing enemy damage-----
		playerHealth -= 100; //test
		labelPlayerHealth.text = playerHealthString + playerHealth; //test
		
		
		//My code --- plays button click sound effect
		sound = game.add.audio("button_click_sound_effect"); //test
		sound.play(); //test
		
		//My code --- plays player defend sound effect.
		sound = game.add.audio("player_defend_sound_effect"); //test
		sound.play(); //test
		
		//My code --- plays player got hit sound effect.
		//sound = game.add.audio("player_got_hit_sound_effect"); //test
		//sound.play(); //test
	}
	
	function playerSpecialActionOnClick () {
		
		if (specialMeter >= 100)
		{
			//My code---------
			score += 100; //test
			labelScore.text = scoreString + score; //test
		
			//enemyHealth -= 800; //test
			enemyHealth -= 950; //test
			labelEnemyHealth.text = enemyHealthString + enemyHealth; //test
		
			specialMeter -= 100; //test //Decrease the special meter by 100 when a special move is used.
			labelSpecialMeter.text = specialMeterString + specialMeter; //test
			
			//My code --- plays player using special move sound effect
			sound = game.add.audio("player_special_move_sound_effect"); //test
			sound.play(); //test
		}
		else
		{
		}
		
		//--Testing enemy damage-----
		playerHealth -= 300; //test
		labelPlayerHealth.text = playerHealthString + playerHealth; //test
		
		//My code --- plays...
		sound = game.add.audio("button_click_sound_effect"); //test
		sound.play(); //test
		
		//My code --- plays player got hit sound effect.
		sound = game.add.audio("player_got_hit_sound_effect"); //test
		sound.play(); //test
	}
	
	function playerHealActionOnClick () {
		
		//My code---------
		
		//If the player has 1 or more potions, then they can heal.
		if (playerPotionAmount >= 1)
		{
			score -= 50; //test //You lose score when you heal
			labelScore.text = scoreString + score; //test
		
			playerHealth += 500; //test //Healing the player by a set amount of health when they use a potion.
			labelPlayerHealth.text = playerHealthString + playerHealth; //test
		
			enemyHealth -= 0; //test
			labelEnemyHealth.text = enemyHealthString + enemyHealth; //test
		
			specialMeter += 10; //test //You can some special meter when you heal
			labelSpecialMeter.text = specialMeterString + specialMeter; //test
		
			playerPotionAmount -= 1; //test //You lose 1 potion when you heal/
			labelPlayerPotionAmount.text = playerPotionAmountString + playerPotionAmount; //test
			
			//My code --- plays player drinks potion sound effect.
			sound = game.add.audio("player_drinks_potion_sound_effect"); //test
			sound.play(); //test
		}
		else
		{
		}
		
		//--Testing enemy damage-----
		playerHealth -= 200; //test
		labelPlayerHealth.text = playerHealthString + playerHealth; //test
		
		
		//My code --- plays button click sound effect
		sound = game.add.audio("button_click_sound_effect"); //test
		sound.play(); //test
		
		
		//My code --- plays player got hit sound effect.
		sound = game.add.audio("player_got_hit_sound_effect"); //test
		sound.play(); //test
	}

	
	//Function that restarts the game
	//restartGame: function() { //original
	function restartGame() { //test
		// Start the 'main' state, which restarts the game
		game.state.start('main');
		
		// My added code ---------------------
		game.sound.stopAll();//test
	//},
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



