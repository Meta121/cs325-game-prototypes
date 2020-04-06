var global_player_level = 1;


"use strict";

function make_main_game_state( game )
{
    function preload() {
		
		//--My code-------------------------------------------
		//Preloading the background
		game.load.image('background_art', 'assets/futuristic_city_background.jpg'); //test
		
		//Preloading the music
		game.load.audio('background_theme', 'sounds/xenoblade_chronicles_mechanical_rhythm_music.m4a'); //test
		
		//Adding the tilemap
		//game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON); //original
		//game.load.tilemap('level_1', 'assets/level_1_test.json', null, Phaser.Tilemap.TILED_JSON);
		//game.load.tilemap('level_1', 'assets/level_1_test.csv');
		game.load.tilemap('map', 'assets/level_1_test.csv');
		
		//game.load.tilemap('map', 'assets/level_1_test.json', null, Phaser.Tilemap.TILED_JSON); //test

		//Adding the tileset
		//game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png'); //original
		//game.load.image('tiles', 'assets/simples_pimples.png')
		game.load.image('tileset', 'assets/simples_pimples.png')
		
		game.load.tilemap
		
		//Adding images and sprites
		
		//Loading player sprites
		//this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //from other game example
		game.load.spritesheet('player', 'assets/dude.png', 32, 48);//test
		
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);//test
		
		game.load.spritesheet('player_blue_throwing_star', 'assets/piskel_blue_throwing_star_draft_1.png', 32, 32);//test
		
		//Loading enemy sprites
		game.load.spritesheet('ground_enemy_1', 'assets/piskel_ground_enemy_draft_1.png', 32, 32);//test
		
		
		//Loading visual effect sprites
		game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);
		
		//Loading objects in the game
		game.load.image('bomb', 'assets/bomb.png');//test
		
		game.load.spritesheet('exit_box', 'assets/piskel_exit_box.png', 32, 32);//tes
		
		
		
		//game.load.image('exit_box', 'assets/exit_box.png');//test
		
    }
    
    //Variables
	var map;
	var layer;
	
	//More added variables 1
	var background_art;
	
	var music; //test
	var sound; //test
	
	
	//More added variables 2
	var player = global_player_level;
	var controls; //var controls {};
	//var playerSpeed = 150; //original
	//var playerSpeed = 300; //test
	//var playerSpeed = 400; //test
	var playerSpeed = 450; //test
	var player_projectile_time = 0;
	var player_projectile_speed = 900; //test
	var player_repair_kit_use_time = 0; //test
	var jumpTimer = 0;
	
	var allowWallJump = false;
	
	var enemy_1; //test
	var enemy_2; //test
	var enemy_3; //test
	var enemyBomb; //original
	
	//More added variables 3
	var score; //test
	var scoreString = ''; //test
	var labelScore; //test
	
	var playerLevel = 1; //test
	var playerLevelString = ''; //test
	var labelPlayerLevel; //test
	
	var playerExperience = 0; //test
	var playerExperienceString = ''; //test
	var labelPlayerExperience; //test
	
	var playerMaxExperience; //test
	var playerMaxExperienceString = ''; //test
	var labelPlayerExperience; //test
	
	var playerHealth = 0; //test
	var playerHealthString = ''; //test
	var labelPlayerHealth; //test
	
	var playerMaxHealth; //test
	var playerMaxHealthString = ''; //test
	var labelPlayerHealth; //test
	
	var playerAttack = 0; //test
	var playerAttackString = ''; //test
	var labelPlayerAttack; //test
	
	var playerDefense = 0; //test
	var playerDefenseString = ''; //test
	var labelPlayerDefense; //test
	
	var playerRepairKitAmount = 2; //test
	var playerRepairKitAmountString = ''; //test
	var labelPlayerRepairKitAmount; //test
	
	var player_projectile; //test
	var player_projectiles; //test
	
	var enemy; //test
	var enemies; //test
	
	var ground_enemy; //test
	var ground_enemies; //test
	
	var explosion;
	var explosions; //test
	
	var exit_box; //test
	var exit_boxes; //test
	
	var facingLeft = false;
	var restartButton; //test
	
	var tween; //test
    
    function create() {
		
	   
	   //game.physics.startSystem(Phaser.Physics.ARCADE);
 /*
		game.stage.backgroundColor = '#787878';
		
		map = game.add.tilemap('level_1');
		map.addTilesetImage('tileset', 'tiles');
		
		layer = map.createLayer('Tile Layer 1');
		*/
		
		//  This resizes the game world to match the layer dimensions
		//layer.resizeWorld();
		
		//game.state.start('level1');//
		
		//Adding the background art
		game.stage.backgroundColor = '#787878'; //test
		background_art = game.add.tileSprite(0, 0, 800, 600, 'background_art'); //test
		//background_art = game.add.tileSprite(0, 0, 1600, 1400, 'background_art'); //test
		//background_art = game.add.tileSprite(0, 0, 16000, 14000, 'background_art'); //test
		background_art.fixedToCamera = true;
		
		//Adding the music //Turn this back on later
		//My code--- Playing background theme
		//music = game.add.audio("background_theme"); //test
		//music.play('', 0, 1, true); //test
		
		game.physics.arcade.gravity.y = 1400; //original //Creates almost realistic gravity
		
		map = game.add.tilemap('map', 16, 16);
		
		map.addTilesetImage('tileset');
		
		layer = map.createLayer(0); //original
		//layer = map.createLayer('Tile Layer 1'); //test
		//layer = this.map.createLayer(0); //test
		layer.resizeWorld();
		
		//map.setCollisionBetween(0,2); //original
		//map.setCollisionBetween(0,0); //test //Default that I should use
		//map.setCollisionBetween(100, 100); //test
		//map.setCollisionBetween(0, 10000, true, layer3); //test
		//map.setCollisionBetween(0, 10000, true); //test //Somehow this works for touching tiles in tilemap.
		//map.setCollisionBetween(0, 1000, true); //test //Somehow this works for touching tiles in tilemap.
		
		map.setCollisionBetween(0, 10000, true); //test //Somehow this works for touching tiles in tilemap.
		
		
		player = this.add.sprite(100,500, 'player');
		player.anchor.setTo(0.5, 0.5) //original
		
		//  Our two animations, walking left and right.
		player.animations.add('left', [0, 1, 2, 3], 10, true); //original
		player.animations.add('right', [5, 6, 7, 8], 10, true); //original
		
		player.animations.add('neutral', [4], 10, true); //test
		
		//jump
		//run
		
		game.physics.arcade.enable(player);
		//Player physics properties. Give the player some bounceyness.
		//player.body.bounce.y = 0.2; //test
		game.camera.follow(player);
		player.body.collideWorldBounds = true;
		
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
			heal: game.input.keyboard.addKey(Phaser.Keyboard.R),
		}
		//Creating the UI (User Interface) for the player START--------------------------
		
		//Creating and setting Player Level on the screen
		//playerLevel = 1; //test
		playerLevel = global_player_level; //test
		playerLevelString = 'Level: '; //test 
		labelPlayerLevel = game.add.text(0, 0, playerLevelString + playerLevel, { font: "30px", fill: "#FFFFFF" }); //test 
		labelPlayerLevel.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Experience on the screen
		playerExperience = 0; //test
		playerExperienceString = 'Player Experience: '; //test 
		//playerMaxExperience = 10; //test
		playerMaxExperience = 5 + (global_player_level * 5); //test
		playerMaxExperienceString = '/'; //test 
		labelPlayerExperience = game.add.text(0, 30, playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience, { font: "30px", fill: "#FFFFFF" }); //test 
		labelPlayerExperience.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Health on the screen
		//playerHealth = 50; //test
		playerHealth = 40 + (global_player_level * 10); //test
		playerHealthString = 'Player Health: '; //test 
		//playerMaxHealth = 50; //test
		playerMaxHealth = 40 + (global_player_level * 10); //test
		playerMaxHealthString = '/'; //test 
		labelPlayerHealth = game.add.text(0, 60, playerHealthString + playerHealth + playerMaxHealthString + playerMaxHealth, { font: "30px", fill: "#00FF00" }); //test 
		labelPlayerHealth.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Attack on the screen
		//playerAttack = 10; //test
		playerAttack = 10 + (global_player_level * 2); //test
		playerAttackString = 'Attack: '; //test 
		labelPlayerAttack = game.add.text(0, 90, playerAttackString + playerAttack, { font: "30px", fill: "#FF0000" }); //test 
		labelPlayerAttack.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Defense on the screen
		//playerDefense = 2; //test
		playerDefense = 2 + (global_player_level * 2); //test
		playerDefenseString = 'Defense: '; //test 
		labelPlayerDefense = game.add.text(0, 120, playerDefenseString + playerDefense, { font: "30px", fill: "#00FFFF" }); //test 
		labelPlayerDefense.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting the amount of Repair Kits the Player has on the screen
		playerRepairKitAmount = 2; //test
		playerRepairKitAmountString = 'Repair Kits: '; //test 
		labelPlayerRepairKitAmount = game.add.text(0, 150, playerRepairKitAmountString + playerRepairKitAmount, { font: "30px", fill: "#FFFF00" }); //test 
		labelPlayerRepairKitAmount.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating the UI (User Interface) for the player END--------------------------
		
		//Creating the player projectile group
		player_projectiles = game.add.group();
		player_projectiles.enableBody = true;
		player_projectiles.physicsBodyType = Phaser.Physics.ARCADE;
		player_projectiles.createMultiple(30, 'player_blue_throwing_star');
		player_projectiles.setAll('anchor.x', 0.5);
		player_projectiles.setAll('anchor.y', 1);
		player_projectiles.setAll('outOfBoundsKill', true);
		player_projectiles.setAll('checkWorldBounds', true);
		
		
		//Creating the explosion visual effect group
		explosions = game.add.group();
		explosions.createMultiple(30, 'explosion');
		explosions.forEach(setupEnemy, this);
	
		//Creating the ground enemies
		//  The baddies!
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
		
		//createGroundEnemies(); //test
		
		//Making and spawning the bomb enemy at specific locations
		enemy_1 = new enemyBomb(0, game, player.x + 400, player.y - 200); //test
		enemy_2 = new createSingleGroundEnemy_1(1, game, 42 * 16, 43 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(2, game, 24 * 16, 72 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(3, game, 54 * 16, 40 * 16); //test //Enemy at the last part of the top level after the wall jump section
		enemy_5 = new createSingleGroundEnemy_1(4, game, 48 * 16, 71 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(5, game, 50 * 16, 31 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(6, game, 14 * 16, 55 * 16); //test
		
		//Creating the exit boxes group
		exit_boxes = game.add.group();
		exit_boxes.enableBody = true;
		exit_boxes.physicsBodyType = Phaser.Physics.ARCADE;
		//Creating and spawning the exit box
		exit_box_1 = new createExitBox(7, game, 57 * 16, 40 * 16); //test
		
		
		
    }
    
    function update() {
        
		game.physics.arcade.collide(player, layer); //test
		//this.physics.arcade.collide(player, layer); //test
		//game.physics.arcade.collide(player, layer[1]); //test
		
		game.physics.arcade.collide(enemies, layer); //test
		//game.physics.arcade.collide(enemy_2, layer); //test
		//game.physics.arcade.collide(enemy_2, layer); //test
		//game.physics.arcade.collide(enemy_3, layer); //test
		//game.physics.arcade.collide(enemy_4, layer); //test
		
		game.physics.arcade.collide(exit_boxes, layer); //test
		
		
		player.body.velocity.x = 0; //So every frame sets player speed to 0 to avoid sliding.
		
		//enemy_2.x = 1000; //test //So every frame sets...
		
		//player.animations.play('neutral');
		
		/*
		if ( controls.up.isDown) {
		
		
		}
		*/
		
		if (controls.left.isDown) {
			
			//player.animations.play('right'); //This makes him look left when using player.scale.setTo(-1, 1);
			player.animations.play('left'); //original
			//player.scale.setTo(-1, 1); //test //This messes with the animation for some reason
			player.body.velocity.x -= playerSpeed;
			
			facingLeft = true; //test
		}
		
		else if (controls.right.isDown == true && controls.left.isDown == false) {
			
			player.animations.play('right');
			//player.scale.setTo(1, 1);
			player.body.velocity.x += playerSpeed;
			
			facingLeft = false; //test
		}
		//Else if the player is standing still and not jumping, play the neutral animation
		else if (player.body.velocity.x == 0 && player.body.velocity.y == 0)
		{
			player.animations.play('neutral');
		}
		//test
		else{
			
			player.animations.play('neutral');
		}
		
		//Implements regular jumping on the floor
		//if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && game.time.now > jumpTimer) { //original
		if (controls.up.isDown == true && (player.body.onFloor() == true || player.body.touching.down) == true) {//test
			
			//player.body.velocity.y = -600; //original
			player.body.velocity.y = -650; //test
			jumpTimer = game.time.now + 750;
		
		}
		/*
		* Implementing the wall jump.
		* The wall jump mechanic for Gen
		*/
		//allowWallJump = checkOverlap(player, map); //test
		//if (controls.up.isDown == true && (player.body.onFloor() == false || player.body.touching.down) == false) //test
		//if (controls.up.isDown == true && (player.body.onFloor() == false) ) //test
		if (controls.up.isDown == true && (player.body.onFloor() == false) && player.body.onWall() == true) //test
		{
			//Sends the player  up initially
			player.body.velocity.y = -650; //test
			
			/*
			//test
			//This part of the code doesn't work like how I imagined
			if (player.body.onWall() == true && controls.left.isDown)
			{
				player.body.velocity.x += 200; //test //Bounces the player to the right a bit when wall jumping from a wall on the left side of the player
			}
			
			if (player.body.onWall() == true && controls.right.isDown)
			{
				player.body.velocity.x -= 200; //test //Bounces the player to the left a bit when wall jumping from a wall on the left side of the player
			}
			*/
		}
		
		/*
		* Implementing the ceiling climb
		*/
		if (controls.up.isDown == true && (player.body.onFloor() == false) && player.body.onCeiling() == true) //test
		{
			//Sends the player  up initially
			player.body.velocity.y = -650; //test
			
			/*
			//test
			//This part of the code doesn't work like how I imagined
			if (player.body.onWall() == true && controls.left.isDown)
			{
				player.body.velocity.x += 200; //test //Bounces the player to the right a bit when wall jumping from a wall on the left side of the player
			}
			
			if (player.body.onWall() == true && controls.right.isDown)
			{
				player.body.velocity.x -= 200; //test //Bounces the player to the left a bit when wall jumping from a wall on the left side of the player
			}
			*/
		}
		
		//test //IDK what this is for //DELETE this maybe
		if (controls.up.isDown == true && (player.body.onFloor() == true || player.body.touching.down) == true) {//test
			
			//player.body.velocity.y = -600; //original
			player.body.velocity.y = -650; //test
			jumpTimer = game.time.now + 750;
		
		}
		
		//My Code. Implementing a fast fall for the player. //test
		if (controls.down.isDown == true)
		{
			//Fast fall
			player.body.velocity.y = 800; //test
			
			
		}
		
		/*
		* Implmenting the player ability to fire a projectile
		*/
		if (game.input.activePointer.leftButton.isDown == true)
		{
			//test
			if (facingLeft == true)
			{
				firePlayerProjectileLeft();
			}
			if (facingLeft == false)
			{
				firePlayerProjectileRight();
			}
		}
		
		/*
		* Implementing healing using repair kits available to the player.
		*/
		if (controls.heal.isDown && playerRepairKitAmount > 0)
		{
			if (game.time.now > player_repair_kit_use_time )
			{
				playerRepairKitAmount -= 1; //Lower the amount of repair kits owned by 1.
				playerHealth += playerMaxHealth / 2; //Recovers the player's health by half the max health.
				
				player_repair_kit_use_time = game.time.now + 200; //test
			}
			
		}
		
		//Checking player collision with enemy
		if (checkOverlap(player, enemy_1.bomb))
		{
			player.body.velocity.y = -600; //test //temporary effect to be sent upwards when hit
		}
		
		//Checking collisions
		game.physics.arcade.overlap(player, enemies, collisionPlayer_and_EnemyBody, null, this); //test
		game.physics.arcade.overlap(player_projectile, enemies, collisionPlayerProjectile_and_EnemyBody, null, this); //test
		game.physics.arcade.overlap(player, exit_boxes, collisionPlayer_and_ExitBox, null, this); //test
		
		//Checking if the player levels up or not
		if (playerExperience == playerMaxExperience)
		{
			//Increasing the player stats if they level up
			playerLevel += 1;
			playerExperience = 0; //reseting the player experience back to 0.
			playerMaxExperience += 5; //Increasing the max experience required to level.
			playerMaxHealth += 10; //Increasing the max health of the player.
			playerHealth = playerMaxHealth; //Restoring the player's health to the new max player health limit.
			playerAttack += 2; //Increasing the attack of the player
			playerDefense += 2; //Increasing the defense of the player
		}
		
		//Constantly updating the stats of the player on the top left part of the screen every frame
		labelPlayerLevel.text = playerLevelString + playerLevel; //test
		labelPlayerExperience.text = playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience; //test
		labelPlayerHealth.text = playerHealthString + playerHealth + playerMaxHealthString + playerMaxHealth; //test
		labelPlayerAttack.text = playerAttackString + playerAttack; //test
		labelPlayerDefense.text = playerDefenseString + playerDefense; //test
		labelPlayerRepairKitAmount.text = playerRepairKitAmountString + playerRepairKitAmount; //test
		
		//If the player health exceeds the max player health, set the player health to what the max player health is.
		if (playerHealth > playerMaxHealth)
		{
			playerHealth = playerMaxHealth; //test
		}
		
		//Setting the global variable global_player_level to what is the current level.
		global_player_level = playerLevel; //test
   }
	
	/* This functions checks if 2 sprites are overlapping with each other or not.
	*/
	function checkOverlap(spriteA, spriteB) {
		
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();
	
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	
	}

	//test //OLD CODE
	/*
	function firePlayerProjectile() {

		//  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > player_projectile_time)
		{
			//  Grab the first bullet we can from the pool
			player_projectile = player_projectiles.getFirstExists(false);
	
			if (player_projectile)
			{
				//  And fire it
				player_projectile.reset(player.x, player.y + 8);
				player_projectile.body.velocity.x = 400;
				player_projectile.body.velocity.y = 0;
				player_projectile.body.allowGravity = false; //Make it so the projectile shoots in a straight line
				player_projectile_time = game.time.now + 200;
			}
		}
		//My code --- play player shoot sound
		//sound = game.add.audio("player_shoot_sound"); //test
		//sound.play(); //test

	}
	*/
	
	function firePlayerProjectileLeft() {

		//  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > player_projectile_time)
		{
			//  Grab the first bullet we can from the pool
			player_projectile = player_projectiles.getFirstExists(false);
	
			if (player_projectile)
			{
				//  And fire it
				player_projectile.reset(player.x, player.y + 30);
				player_projectile.body.velocity.x = -1 * player_projectile_speed;
				player_projectile.body.velocity.y = 0;
				player_projectile.body.allowGravity = false; //Make it so the projectile shoots in a straight line
				player_projectile_time = game.time.now + 200;
			}
		}
		//My code --- play player shoot sound
		//sound = game.add.audio("player_shoot_sound"); //test
		//sound.play(); //test

	}
	
	function firePlayerProjectileRight() {

		//  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > player_projectile_time)
		{
			//  Grab the first bullet we can from the pool
			player_projectile = player_projectiles.getFirstExists(false);
	
			if (player_projectile)
			{
				//Firing the player projectile
				player_projectile.reset(player.x, player.y + 30);
				player_projectile.body.velocity.x = player_projectile_speed;
				player_projectile.body.velocity.y = 0;
				player_projectile.body.allowGravity = false; //Make it so the projectile shoots in a straight line
				player_projectile_time = game.time.now + 200;
			}
		}
		//My code --- play player shoot sound
		//sound = game.add.audio("player_shoot_sound"); //test
		//sound.play(); //test

	}

	/*
	* This is the setupEnemy function
	*/
	function setupEnemy (enemy) {
	
		enemy.anchor.x = 0.5;
		enemy.anchor.y = 0.5;
		enemy.animations.add('explosion');
	}

	/*
	* This is the descend function for enemies 
	*/
	function descend() {
		
		//aliens.y += 10; //original
		
		enemies.y += 1000; //test
	}

	/*
	* This function creates multiple ground type enemies
	*/
	function createGroundEnemies () {
	
		//for (var y = 0; y < 4; y++) //original
		for (var y = 0; y < 4; y++) 
		{
			//for (var x = 0; x < 10; x++) //original
			for (var x = 0; x < 20; x++) //test
			{
				//var alien = aliens.create(x * 48, y * 50, 'invader'); //original
				enemy = enemies.create(x * 30, y * 50, 'ground_enemy_1'); //test
				
				enemy.anchor.setTo(0.5, 0.5); 
				//alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true); //original //creates (or sets) the 'fly' animation
				//alien.play('fly'); //original
				enemy.body.moves = false;
			}
		}
	
		enemies.x = 100;
		enemies.y = 50;

		//  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		//var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true); //original
		//var tween = game.add.tween(aliens).to( { y: 1000 }, 3500, Phaser.Easing.Linear.None, true, -100, 100, true); //test
		tween = game.add.tween(enemies).to( { y: 1000 }, 3500, Phaser.Easing.Linear.None, true, -100, 100, true); //test
	
	
		//When the tween loops it calls descend
		tween.onLoop.add(descend, this);
	
		//
		//game.physics.arcade.enable(enemies); //test
	}

	/*
	* This is the enemyBomb function
	*/
	// enemyBomb = function(index, game, x, y) { //original
	function enemyBomb (index, game, x, y) //test //My version
	{
	
		this.bomb = game.add.sprite(x, y, 'bomb');
		this.bomb.anchor.setTo(0.5, 0.5);
		this.bomb.name = index.toString();
		game.physics.enable(this.bomb, Phaser.Physics.ARCADE);
		this.bomb.body.immovable = true;
		this.bomb.body.collideWorldBounds = true;
		this.bomb.body.allowGravity = false;
	
		this.bombTween = game.add.tween(this.bomb).to( {
			y: this.bomb.y + 800
		}, 2000, 'Linear', true, 0, 100, true);
	
	}
	
	/*
	* Function that creats a single ground enemy 1 at a certain x and y.
	*/
	function createSingleGroundEnemy_1 (index, game, x, y) //test //My version
	{
		//this.enemy = game.add.sprite(x, y, 'ground_enemy_1'); //test
		this.enemy = enemies.create(x, y, 'ground_enemy_1'); //test
		this.enemy.anchor.setTo(0.5, 0.5);
		this.enemy.name = index.toString();
		//game.physics.enable(this.enemy, Phaser.Physics.ARCADE); //original
		game.physics.arcade.enable(this.enemy); //test
		//this.enemy.body.immovable = true;
		this.enemy.body.collideWorldBounds = true;
		//this.enemy.body.allowGravity = false;
		
		//this.enemy.body.checkCollision = true; //test
		
		//game.physics.arcade.enable(enemies); //test
		//game.physics.arcade.collide(this.enemy, layer); //test
		
		//game.physics.arcade.collide(this.enemy, layer); //test
		
		//test
		this.enemy.health = 50; //test
		//test
		/*
		this.enemyTween = game.add.tween(this.enemy).to( {
			x: this.enemy.x + 800
		}, 2000, 'Linear', true, 0, 100, true);
		*/
		this.enemyTween = game.add.tween(this.enemy).to( {
			x: this.enemy.x + 100
		}, 2000, 'Linear', true, 0, 100, true);
	}
	
	/*
	* Function that creats an exit box at a certain x and y.
	*/
	function createExitBox (index, game, x, y) //test //My version
	{
		//this.exit_box = game.add.sprite(x, y, 'exit_box'); //test
		this.exit_box = exit_boxes.create(x, y, 'exit_box'); //test
		this.exit_box.anchor.setTo(0.5, 0.5);
		this.exit_box.name = index.toString();
		
		game.physics.arcade.enable(this.exit_box); //test
		this.exit_box.body.immovable = true;
		this.exit_box.body.collideWorldBounds = true;
		this.exit_box.body.allowGravity = false;
		
	}
	
    
    //return { "preload": preload, "create": create, "update": update }; //test
	
	
	/*
	* My code -Make a function that damages the player when they touch the enemy.
	*/
	function collisionPlayer_and_EnemyBody (player, enemy) {
		
		//My code---------
		//invader.kill(); //test //Kill invader that was touched
		//My code -------- Decreasing Health
		playerHealth -= 5; //test
		//playerHealth = playerDefense; //test
		
		//player.body.velocity.y = -650; //test
		player.body.velocity.y = -1000; //test
		
		//My code --- play player death sound
		//sound = game.add.audio("player_death_sound"); //test
		//sound.play(); //test
	}
	
	/*
	* Function that handles the collision between the player projectile and the body of an enemy.
	*/
	function collisionPlayerProjectile_and_EnemyBody (player_projectile, enemy) {
		
		//Decrease the health of the enemy
		enemy.health -= playerAttack; //test //Modify later with player attack
		
		if (enemy.health < 0)
		{
			enemy.health = 0;
		}
		
		//  When a player projectile hits an enemy, we kill them both
		player_projectile.kill();
		//enemy.kill(); //test
		
		//  Increase the experience of the player
		
		/*
		playerExperience += 5;
		labelPlayerExperience.text =  playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience;
		*/
		
		//Create an explosion visual effect
		//var explosion = explosions.getFirstExists(false); //original
		explosion = explosions.getFirstExists(false); //test
		explosion.reset(enemy.body.x, enemy.body.y);
		explosion.play('explosion', 30, false, true);
		
		
		if (enemy.health == 0)
		{
			playerExperience += 5;
			labelPlayerExperience.text =  playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience;
			
			enemy.kill(); //test
		}
	
		//My extra code-----------------------------------------
		/*
		else{
		
			//My code --- play enemy death sound
			sound = game.add.audio("enemy_death_sound"); //test
			sound.play(); //test
		}
		*/
	}
	
	/*
	* This functions handles the collision between the player and an exit box
	*/
	function collisionPlayer_and_ExitBox (player, exit_box) {
		
		//My code---------
		player.body.velocity.y = -1000; //test
		
		//My code --- play player death sound
		//sound = game.add.audio("player_death_sound"); //test
		//sound.play(); //test
	}
	
	 return { "preload": preload, "create": create, "update": update }; //test
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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' ); //test //Normal view
    //var game = new Phaser.Game( 1600, 1400, Phaser.AUTO, 'game' ); //test //Full view of level 1 for testing
	
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
