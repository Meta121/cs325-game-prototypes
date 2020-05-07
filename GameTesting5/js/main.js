var global_player_level = 1; //test
var global_player_experience = 0; //test
var global_player_repair_kit_amount = 2; //test

var global_current_level = 1; //test

"use strict";

function make_main_game_state( game )
{
    function preload() {
		
		//--My code-------------------------------------------
		//Preloading the background
		game.load.image('background_art', 'assets/futuristic_city_background.jpg');
		
		//Preloading the music
		game.load.audio('background_theme', 'sounds/ninja_gaiden_unbreakable_determination.m4a'); //Level 1 theme
		//game.load.audio('background_theme', 'sounds/xenoblade_chronicles_mechanical_rhythm_music.m4a'); //Level 2 theme
		//game.load.audio('background_theme', 'sounds/megaman2_wily_stage_1.m4a'); //Level 3 theme
		//game.load.audio('background_theme', 'sounds/castlevania_rondo_of_blood_divine_bloodlines.m4a'); //Level 4 theme
		//game.load.audio('background_theme', 'sounds/ninja_gaiden_act_1_theme.m4a'); //Level 5 theme
		//game.load.audio('background_theme', 'sounds/castlevania_symphony_of_the_night_dracula_castle.m4a'); //Level 6 theme
		
		
		//Preloading sound effects
		game.load.audio('player_level_up_sound_effect', 'sounds/ffxi_level_up_sound_effect.m4a'); //test
		game.load.audio('player_jump_sound_effect', 'sounds/02_jump_sound_effect.wav'); //test
		game.load.audio('player_damaged_sound', 'sounds/robolox_oof_sound_effect.m4a'); //test
		game.load.audio('player_death_sound', 'sounds/megamanX1_death_sound.m4a'); //test
		game.load.audio('player_projectile_sound_effect', 'sounds/11_throwing_star_sound_effect.wav'); //test
		game.load.audio('player_uses_repair_kit_sound_effect', 'sounds/minecraft_potion_drink_sound_effect.m4a'); //test
		game.load.audio('ding_sound_effect', 'sounds/ding_sound_effect.m4a'); //test
		game.load.audio('explosion_sound_effect', 'sounds/18_small_explosion.wav'); //test
		
		//Adding the tilemap
		game.load.tilemap('map', 'assets/level_1_test.csv'); //Level 1
		//game.load.tilemap('map', 'assets/level_2_test.csv'); //Level 2
		//game.load.tilemap('map', 'assets/level_3_test.csv'); //Level 3
		//game.load.tilemap('map', 'assets/level_4_test.csv'); //Level 4
		//game.load.tilemap('map', 'assets/level_5_test.csv'); //Level 5
		//game.load.tilemap('map', 'assets/level_6_test.csv'); //Level 6
		//game.load.tilemap('map', 'assets/level_7_test.csv'); //Level 7
		//game.load.tilemap('map', 'assets/level_8_test.csv'); //Level 8
		//game.load.tilemap('map', 'assets/level_final_boss_test.csv'); //Level Final Boss
		
		//game.load.tilemap('map', 'assets/level_1_test.json', null, Phaser.Tilemap.TILED_JSON); //test

		//Adding the tileset
		game.load.image('tileset', 'assets/simples_pimples.png')
		
		game.load.tilemap
		
		//Adding images and sprites
		
		//Loading player sprites
		//this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //from other game example
		//game.load.spritesheet('player', 'assets/dude.png', 32, 48);//test //Testing original monkey sprite
		//game.load.spritesheet('player', 'assets/piskel_gen_spritesheet_draft_2.png', 32, 32);//test //Gen sprite 32x32 draft 2
		//game.load.spritesheet('player', 'assets/piskel_gen_spritesheet_draft_5.png', 32 * 2, 32 * 2);//test //Gen sprite 64x64 draft 3
		game.load.spritesheet('player', 'assets/piskel_gen_spritesheet_draft_6.png', 32 * 1, 32 * 1);//test //Gen sprite 32x32 draft 6
		
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);//test
		
		game.load.spritesheet('player_blue_throwing_star', 'assets/piskel_blue_throwing_star_draft_5.png', 32, 32);//test
		
		//Loading enemy sprites
		game.load.spritesheet('ground_enemy_1', 'assets/piskel_ground_enemy_draft_1.png', 32, 32);//test
		game.load.spritesheet('flying_enemy_1', 'assets/piskel_flying_enemy_draft_1.png', 32, 32);//test
		game.load.spritesheet('boss_enemy_head_1', 'assets/piskel_boss_enemy_head_draft_2.png', 160, 160);//test
		
		game.load.spritesheet('boss_enemy_head_projectile', 'assets/piskel_boss_enemy_head_draft_projectile_1.png', 32 * 2, 32 * 2);//test
		
		//Loading visual effect sprites
		game.load.image('player_health_bar', 'assets/health_bar_draft_2.png');
		game.load.image('player_health_bar_back', 'assets/health_bar_back_draft_1.png');
		game.load.image('player_experience_bar', 'assets/experience_bar_draft_1.png');
		game.load.image('player_experience_bar_back', 'assets/experience_bar_back_draft_1.png');
		game.load.image('player_stamina_bar', 'assets/stamina_bar_draft_1.png');
		game.load.image('player_stamina_bar_back', 'assets/stamina_bar_back_draft_1.png')

		game.load.image('enemy_health_bar', 'assets/health_bar_draft_2.png');
		game.load.image('enemy_health_bar_back', 'assets/health_bar_back_draft_1.png');
		
		game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);
		
		//Loading objects in the game
		game.load.image('bomb', 'assets/bomb.png');//test
		game.load.spritesheet('repair_kit', 'assets/piskel_repair_kit_draft_1.png', 32, 32);//test
		
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
	
	var enemy_projectile_time = 0;
	var enemy_projectile_speed = 900; //test
	
	var jumpTimer = 0;
	
	var allowWallJump = false;
	
	var enemyBomb; //original
	var enemy_1; //test
	var enemy_2; //test
	var enemy_3; //test
	var enemy_4; //test
	var enemy_5; //test
	var enemy_6; //test
	var enemy_7; //test
	var enemy_8; //test
	var enemy_9; //test
	var enemy_10; //test
	var enemy_11; //test
	var enemy_12; //test
	var enemy_13; //test
	var enemy_14; //test
	var enemy_15; //test
	var enemy_16; //test
	var enemy_17; //test
	var enemy_18; //test
	var enemy_19; //test
	var enemy_20; //test
	var enemy_21; //test
	var enemy_22; //test
	var enemy_23; //test
	var enemy_24; //test
	var enemy_25; //test
	var enemy_26; //test
	var enemy_27; //test
	var enemy_28; //test
	var enemy_29; //test
	var enemy_30; //test
	
	//More added variables 3
	var score; //test
	var scoreString = ''; //test
	var labelScore; //test
	
	var playerLevel = 1; //test
	var playerLevelString = ''; //test
	var labelPlayerLevel; //test
	
	var playerExperience = global_player_experience; //test
	var playerExperienceString = ''; //test
	var labelPlayerExperience; //test
	
	var playerMaxExperience; //test
	var playerMaxExperienceString = ''; //test
	var labelPlayerExperience; //test
	
	var player_experience_bar;
	var player_experience_bar_back;
	
	var playerHealth = 0; //test
	var playerHealthString = ''; //test
	var labelPlayerHealth; //test
	
	var player_health_bar;
	var player_health_bar_back;
	
	var playerMaxHealth; //test
	var playerMaxHealthString = ''; //test
	var labelPlayerHealth; //test
	
	var playerStamina = 100; //test
	var playerStaminaString = ''; //test
	var labelPlayerStamina; //test
	
	var playerMaxStamina; //test
	var playerMaxStaminaString = ''; //test
	var labelPlayerStamina; //test
	
	var player_stamina_bar;
	var player_stamina_bar_back;
	
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
	var player_projectiles;
	
	var enemy_projectile; //test
	var enemy_projectiles; //test
	
	var enemy; //test
	var enemies; //test
	
	var ground_enemy; //test
	var ground_enemies; //test
	
	var flying_enemy; //test DA 6
	var flying_enemies; //test DA 6
	
	var repair_kit; //test //DA  6
	var repair_kits; //test //DA 6
	
	var repair_kit_1; //test //DA  6
	var repair_kit_2; //test //DA  6
	var repair_kit_3; //test //DA  6
	var repair_kit_4; //test //DA  6
	var repair_kit_5; //test //DA  6
	
	var currentEnemyHealth = 0; //test
	var currentEnemyHealthString = ''; //test
	var labelCurrentEnemyHealth; //test
	
	var enemy_health_bar;
	var enemy_health_bar_back;
	
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
		music = game.add.audio("background_theme"); //test
		music.play('', 0, 1, true); //test
		
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
		
		//----------Spawning the player at a certain x and y location Start--------------------------------
		//player = this.add.sprite(100,500, 'player'); //original
		player = this.add.sprite(8 * 16, 60 * 16, 'player'); //test //Level 1 player spawn location
		//player = this.add.sprite(0 * 16, 4 * 16, 'player'); //test //Level 2 player spawn location
		//player = this.add.sprite(8 * 16, 60 * 16, 'player'); //test //Level 3 player spawn location
		//player = this.add.sprite(3 * 16, 70 * 16, 'player'); //test //Level 4 player spawn location
		//player = this.add.sprite(2 * 16, 71 * 16, 'player'); //test //Level 5 player spawn location
		//player = this.add.sprite(100 * 16, 4 * 16, 'player'); //test //Level 6 player spawn location
		//player = this.add.sprite(94 * 16, 69 * 16, 'player'); //test //Level 7 player spawn location
		//player = this.add.sprite(92 * 16, 68 * 16, 'player'); //test //Level 8 player spawn location
		
		//player = this.add.sprite(8 * 16, 60 * 16, 'player'); //test //Final Boss Level player spawn location
		//----------Spawning the player at a certain x and y location End--------------------------------
		
		player.anchor.setTo(0.5, 0.5) //original
		
		//  Our two animations, walking left and right.
		/*
		//Monkey sprite animations
		player.animations.add('left', [0, 1, 2, 3], 10, true); //original
		player.animations.add('right', [5, 6, 7, 8], 10, true); //original
		
		player.animations.add('neutral', [4], 10, true); //test
		*/
		//Gen sprite animations
		/*
		//Draft 2 //test
		player.animations.add('neutral', [0], 10, true); //test
		player.animations.add('left', [1, 3, 5], 10, true); //test
		player.animations.add('left_jump', [7], 10, true); //test
		player.animations.add('right', [2, 4, 6], 10, true); //test
		player.animations.add('right_jump', [8], 10, true); //test
		*/
		player.animations.add('neutral_left', [0], 10, true); //test
		player.animations.add('neutral_right', [1], 10, true); //test
		player.animations.add('left', [2, 4, 6], 10, true); //test
		player.animations.add('left_jump', [8], 10, true); //test
		player.animations.add('right', [3, 5, 7], 10, true); //test
		player.animations.add('right_jump', [9], 10, true); //test
		
		//jump
		//run
		
		//Enabling physics ARCADE on the player
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
		//-------Creating the UI (User Interface) for the player START--------------------------
		
		//Creating and setting Player Level on the screen
		//playerLevel = 1; //test
		playerLevel = global_player_level; //test
		playerLevelString = 'Level: '; //test 
		labelPlayerLevel = game.add.text(0, 0, playerLevelString + playerLevel, { font: "30px", fill: "#FFFFFF" }); //test 
		labelPlayerLevel.fixedToCamera = true; //test //Fixes the text to the camera
		
		
		//Creating and setting Player Experience on the screen
		player_experience_bar_back = game.add.sprite(5, 30, 'player_experience_bar_back'); //test //Used for matching x,y with player_health bar
		player_experience_bar_back.fixedToCamera = true; //test
		player_experience_bar = game.add.sprite(5, 30, 'player_experience_bar'); //DA 6
		player_experience_bar.fixedToCamera = true; //test
		player_experience_bar.cropEnabled = true; //test
		
		playerExperience = global_player_experience; //test
		//playerExperienceString = 'Player Experience: '; //DA 5
		playerExperienceString = 'EXP: '; //DA 6
		//playerMaxExperience = 10; //test
		playerMaxExperience = 5 + (global_player_level * 5); //test
		playerMaxExperienceString = '/'; //test 
		//labelPlayerExperience = game.add.text(0, 30, playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience, { font: "30px", fill: "#FFFFFF" }); //DA 5 
		labelPlayerExperience = game.add.text(10, 30, playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience, { font: "30px", fill: "#000000" }); //DA 6 
		labelPlayerExperience.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Health on the screen
		//player_health_bar_back = game.add.sprite(0, 55, 'player_health_bar_back'); //test //Original when back was bigger than front bar
		player_health_bar_back = game.add.sprite(5, 60, 'player_health_bar_back'); //test //Used for matching x,y with player_health bar
		player_health_bar_back.fixedToCamera = true; //test
		//player_health_bar = game.add.sprite(0, 60, 'player_health_bar'); //DA 5
		player_health_bar = game.add.sprite(5, 60, 'player_health_bar'); //DA 6
		player_health_bar.fixedToCamera = true; //test
		player_health_bar.cropEnabled = true; //test
		//player_health_bar.crop.width = (playerHealth / playerMaxHealth) * player_health_bar.width; //test
		
		//playerHealth = 50; //test
		playerHealth = 40 + (global_player_level * 10); //test
		//playerHealthString = 'Player Health: '; //test //DA 5
		playerHealthString = 'HP: '; //test //DA 6
		//playerMaxHealth = 50; //test
		playerMaxHealth = 40 + (global_player_level * 10); //test
		playerMaxHealthString = '/'; //test 
		
		
		
		//labelPlayerHealth = game.add.text(0, 60, playerHealthString + playerHealth + playerMaxHealthString + playerMaxHealth, { font: "30px", fill: "#00FF00" }); //DA 5 Green color text
		labelPlayerHealth = game.add.text(10, 60, playerHealthString + playerHealth + playerMaxHealthString + playerMaxHealth, { font: "30px", fill: "#000000" }); //DA 6
		labelPlayerHealth.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Stamina on the screen //DA 7
		// x = 5, y = 180 //Was used initially for testing.
		player_stamina_bar_back = game.add.sprite(5, 90, 'player_stamina_bar_back'); //test //Used for matching x,y with player_stamina bar
		player_stamina_bar_back.fixedToCamera = true; //test
		//player_stamina_bar = game.add.sprite(0, 60, 'player_stamina_bar'); //DA 5
		player_stamina_bar = game.add.sprite(5, 90, 'player_stamina_bar'); //DA 6
		player_stamina_bar.fixedToCamera = true; //test
		player_stamina_bar.cropEnabled = true; //test
		//player_stamina_bar.crop.width = (playerStamina / playerMaxStamina) * player_stamina_bar.width; //test
		
		playerStamina = 100; //test
		playerStaminaString = 'Stamina: '; //test //DA 7
		playerMaxStamina =100; //test
		playerMaxStaminaString = '/'; //test 
		
		
		
		labelPlayerStamina = game.add.text(10, 90, playerStaminaString + playerStamina + playerMaxStaminaString + playerMaxStamina, { font: "30px", fill: "#FFFFFF" }); //DA 7
		labelPlayerStamina.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Attack on the screen
		//playerAttack = 10; //test
		playerAttack = 10 + (global_player_level * 2); //test
		playerAttackString = 'Attack: '; //test 
		labelPlayerAttack = game.add.text(0, 120, playerAttackString + playerAttack, { font: "30px", fill: "#FF0000" }); //test 
		labelPlayerAttack.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting Player Defense on the screen
		//playerDefense = 2; //test
		playerDefense = 2 + (global_player_level * 2); //test
		playerDefenseString = 'Defense: '; //test 
		labelPlayerDefense = game.add.text(0, 150, playerDefenseString + playerDefense, { font: "30px", fill: "#00FFFF" }); //test 
		labelPlayerDefense.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting the amount of Repair Kits the Player has on the screen
		playerRepairKitAmount = global_player_repair_kit_amount; //test
		playerRepairKitAmountString = 'Repair Kits: '; //test 
		labelPlayerRepairKitAmount = game.add.text(0, 180, playerRepairKitAmountString + playerRepairKitAmount, { font: "30px", fill: "#FFFF00" }); //test 
		labelPlayerRepairKitAmount.fixedToCamera = true; //test //Fixes the text to the camera
		
		//Creating and setting the current enemy health on the screen
		enemy_health_bar_back = game.add.sprite(550, 60, 'enemy_health_bar_back'); //test //Used for matching x,y with bar visual
		enemy_health_bar_back.fixedToCamera = true; //test
		enemy_health_bar = game.add.sprite(550, 60, 'enemy_health_bar'); //DA 6
		enemy_health_bar.fixedToCamera = true; //test
		enemy_health_bar.cropEnabled = true; //test
		
		currentEnemyHealth = 1; //test
		//currentEnemyHealthString = 'Current Enemy HP: '; //DA 5
		currentEnemyHealthString = 'Enemy HP: '; //DA 6
		//labelCurrentEnemyHealth = game.add.text(550, 60, currentEnemyHealthString + currentEnemyHealth, { font: "25px", fill: "#00FF00" }); //DA 5
		labelCurrentEnemyHealth = game.add.text(555, 64, currentEnemyHealthString + currentEnemyHealth, { font: "25px", fill: "#000000" }); //DA 6
		//labelCurrentEnemyHealth = game.add.text(555, 64, currentEnemyHealthString + "0", { font: "25px", fill: "#000000" }); //DA 7 //test
		labelCurrentEnemyHealth.fixedToCamera = true; //test //Fixes the text to the camera
		
		//-------Creating the UI (User Interface) for the player END--------------------------
		
		//Creating the player projectile group
		player_projectiles = game.add.group();
		player_projectiles.enableBody = true;
		player_projectiles.physicsBodyType = Phaser.Physics.ARCADE;
		player_projectiles.createMultiple(30, 'player_blue_throwing_star');
		player_projectiles.setAll('anchor.x', 0.5);
		player_projectiles.setAll('anchor.y', 1);
		player_projectiles.setAll('outOfBoundsKill', true);
		player_projectiles.setAll('checkWorldBounds', true);
		
		//Creating the boss enemy head projectile group
		enemy_projectiles = game.add.group();
		enemy_projectiles.enableBody = true;
		enemy_projectiles.physicsBodyType = Phaser.Physics.ARCADE;
		enemy_projectiles.createMultiple(30, 'boss_enemy_head_projectile');
		enemy_projectiles.setAll('anchor.x', 0.5);
		enemy_projectiles.setAll('anchor.y', 1);
		enemy_projectiles.setAll('outOfBoundsKill', true);
		enemy_projectiles.setAll('checkWorldBounds', true);
		
		
		//Creating the explosion visual effect group
		explosions = game.add.group();
		explosions.createMultiple(30, 'explosion');
		explosions.forEach(setupEnemy, this);
	
		//Creating the ground enemies
		//  The enemies
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
		
		//createGroundEnemies(); //test
		
		repair_kits = game.add.group();
		repair_kits.enableBody = true;
		repair_kits.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Creating the exit boxes group
		exit_boxes = game.add.group();
		exit_boxes.enableBody = true;
		exit_boxes.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Making and spawning the bomb enemy at specific locations
		
		//Level 1 enemy spawn locations
		
		//enemy_1 = new enemyBomb(0, game, player.x + 400, player.y - 200); //test
		enemy_2 = new createSingleGroundEnemy_1(1, game, 24 * 16, 72 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(2, game, 32 * 16, 72 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(3, game, 54 * 16, 40 * 16); //test //Enemy at the last part of the top level after the wall jump section
		enemy_5 = new createSingleGroundEnemy_1(4, game, 48 * 16, 71 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(5, game, 50 * 16, 31 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(6, game, 65 * 16, 55 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(7, game, 24 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(8, game, 70 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(9, game, 80 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 5 * 16, 60 * 16); //test
		
		exit_box_1 = new createExitBox(10, game, 57 * 16, 40 * 16); //test //Level 1 Exit Box
		
		//Level 2 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 31 * 16, 70 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 18 * 16, 2 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 68 * 16, 3 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 66 * 16, 32 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 20 * 16, 32 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 24 * 16, 56 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 64 * 16, 49 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 18 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 56 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 85 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 5 * 16, 60 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 6 * 16, 70 * 16); //test //Level 2 Exit Box
		*/
		
		//Level 3 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 29 * 16, 6 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 84 * 16, 24 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 44 * 16, 14 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 40 * 16, 70 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 52 * 16, 66 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 24 * 16, 56 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 55 * 16, 44 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 11 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 19 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 85 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 27 * 16, 65 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 94 * 16, 72 * 16); //test //Level 3 Exit Box
		*/
		
		//Level 4 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 12 * 55, 6 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 15 * 16, 43 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 34 * 16, 73 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 73 * 16, 71 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 72 * 16, 43 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 59 * 16, 62 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 71 * 16, 52 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 35 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 45 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 93 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 97 * 16, 21 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 65 * 16, 51 * 16); //test //Level 4 Exit Box
		*/
		//Level 5 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 24 * 16, 70 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 66 * 16, 66 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 93 * 16, 47 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 60 * 16, 29 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 21 * 16, 32 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 24 * 16, 11 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 90 * 16, 8 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 11 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 43 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 76 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 97 * 16, 21 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 92 * 16, 6 * 16); //test //Level 5 Exit Box
		*/
		
		//Level 6 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 70 * 16, 7 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 25 * 16, 21 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 67 * 16, 30 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 83 * 16, 46 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 18 * 16, 53 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 21 * 16, 65 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 68 * 16, 69 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 11 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 43 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 94 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 97 * 16, 20 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 93 * 16, 69 * 16); //test //Level 6 Exit Box
		*/
		
		//Level 7 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 76 * 16, 89 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 48 * 16, 70 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 43 * 16, 60 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 50 * 16, 48 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 13 * 16, 36 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 9 * 16, 36 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 83 * 16, 21 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 22 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 68 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 83 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 6 * 16, 21 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 92 * 16, 20 * 16); //test //Level 7 Exit Box
		*/
		
		//Level 8 enemy spawn locations
		/*
		enemy_1 = new createSingleGroundEnemy_1(1, game, 80 * 16, 70 * 16); //test
		enemy_2 = new createSingleGroundEnemy_1(2, game, 74 * 16, 70 * 16); //test
		enemy_3 = new createSingleGroundEnemy_1(3, game, 28 * 16, 32 * 16); //test
		enemy_4 = new createSingleGroundEnemy_1(4, game, 13 * 16, 71 * 16); //test
		enemy_5 = new createSingleGroundEnemy_1(5, game, 34 * 16, 72 * 16); //test
		enemy_6 = new createSingleGroundEnemy_1(6, game, 33 * 16, 60 * 16); //test
		enemy_7 = new createSingleGroundEnemy_1(7, game, 45 * 16, 49 * 16); //test
		
		enemy_8 =  new createSingleFlyingEnemy_1(8, game, 11 * 16, 5 * 16); //test
		enemy_9 =  new createSingleFlyingEnemy_1(9, game, 65 * 16, 5 * 16); //test
		enemy_10 =  new createSingleFlyingEnemy_1(10, game, 80 * 16, 4 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 6 * 16, 21 * 16); //test
		
		exit_box_1 = new createExitBox(11, game, 92 * 16, 20 * 16); //test //Level 8 Exit Box
		*/
		
		//Level Final - Final Boss Level Spawn Locations
		/*
		enemy_1 = new createSingleBossEnemy_Head_1(1, game, 92 * 16, 67 * 16); //test
		
		repair_kit_1 = new createSingleRepairKit(0, game, 5 * 16, 60 * 16); //test
		*/
		

		//Creating and spawning the exit box (Old code)
		/*
		//exit_box_1 = new createExitBox(7, game, 57 * 16, 40 * 16); //test //Level 1 Exit Box
		//exit_box_1 = new createExitBox(7, game, 6 * 16, 70 * 16); //test //Level 2 Exit Box
		//exit_box_1 = new createExitBox(7, game, 94 * 16, 72 * 16); //test //Level 3 Exit Box
		//exit_box_1 = new createExitBox(7, game, 65 * 16, 51 * 16); //test //Level 4 Exit Box
		//exit_box_1 = new createExitBox(7, game, 92 * 16, 6 * 16); //test //Level 5 Exit Box
		//exit_box_1 = new createExitBox(7, game, 93 * 16, 69 * 16); //test //Level 6 Exit Box
		*/
		
		
    }
    
    function update() {
        
		game.physics.arcade.collide(player, layer); //DA 5
		//this.physics.arcade.collide(player, layer); //test
		//game.physics.arcade.collide(player, layer[1]); //test
		
		game.physics.arcade.collide(enemies, layer); //DA 5
		//game.physics.arcade.collide(enemy_2, layer); //test
		//game.physics.arcade.collide(enemy_2, layer); //test
		//game.physics.arcade.collide(enemy_3, layer); //test
		//game.physics.arcade.collide(enemy_4, layer); //test
		
		//game.physics.arcade.collide(player_projectiles, layer); //test //Tentative
		
		game.physics.arcade.collide(repair_kits, layer); //DA 6
		
		game.physics.arcade.collide(exit_boxes, layer); //DA 5
		
		
		player.body.velocity.x = 0; //So every frame sets player speed to 0 to avoid sliding.
		
		//Setting a limit to how fast the player can fall.
		if (player.body.velocity.y > 650)
		{
			player.body.velocity.y = 650;
		}
		
		//Regenerating stamina
		//playerStamina += 1; //test
		if (player.body.onFloor() == true) //test
		{
			playerStamina += 2;
		}
		
		//Making a minimum limit that the playerStamina can go down to and never go lower.
		if (playerStamina <= 0)
		{
			playerStamina = 0;
		}
		//Making a maximum limit that the playerStamina can go up to and never go higher.
		if (playerStamina > playerMaxStamina)
		{
			playerStamina = playerMaxStamina;
		}
		
		//enemy_2.x = 1000; //test //So every frame sets...
		
		//player.animations.play('neutral');
		
		/*
		if ( controls.up.isDown) {
		
		
		}
		*/
		
		/*
		* CONTROLS
		*/
		if (controls.left.isDown) {
			
			//player.animations.play('right'); //This makes him look left when using player.scale.setTo(-1, 1);
			//player.animations.play('left'); //original //For Monkey sprite
			player.animations.play('left'); //test //For Gen sprite
			
			//player.scale.setTo(-1, 1); //test //This messes with the animation for some reason
			player.body.velocity.x -= playerSpeed;
			
			facingLeft = true; //test
		}
		
		else if (controls.right.isDown == true && controls.left.isDown == false) {
			
			//player.animations.play('right'); //original //For Monkey Sprite
			player.animations.play('right'); //test //For Gen sprite
			
			//player.scale.setTo(1, 1);
			player.body.velocity.x += playerSpeed;
			
			facingLeft = false; //test
		}
		//Else if the player is standing still and not jumping, play the neutral animation
		else if (player.body.velocity.x == 0 && player.body.velocity.y == 0)
		{
			//player.animations.play('neutral'); //test
			
			//Playing the neutral animation depending on what direction the player is facing
			if (facingLeft == true)
			{
				player.animations.play('neutral_left'); //test //For Gen sprite
			}
			else
			{
				player.animations.play('neutral_right'); //test //For Gen sprite
			}
		}
		//test
		else{
			
			//player.animations.play('neutral'); //test
			
			//Playing the neutral animation depending on what direction the player is facing
			if (facingLeft == true)
			{
				player.animations.play('neutral_left'); //test //For Gen sprite
			}
			else
			{
				player.animations.play('neutral_right'); //test //For Gen sprite
			}
		}
		/*
		* REGULAR JUMP
		*Implements regular jumping on the floor
		*/
		//if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && game.time.now > jumpTimer) { //original
		if (controls.up.isDown == true && (player.body.onFloor() == true || player.body.touching.down) == true) {//test
			
			//player.body.velocity.y = -600; //original
			player.body.velocity.y = -650; //test
			jumpTimer = game.time.now + 750;
			
			//Playing the jump animation
			if (facingLeft == true)
			{
				player.animations.play('left_jump'); //test //For Gen sprite
			}
			else
			{
				player.animations.play('right_jump'); //test //For Gen sprite
			}
			//Playing the player jump sound effect
			sound = game.add.audio("player_jump_sound_effect"); //test
			sound.play(); //test
		
		}
		/*
		* WALL JUMP
		* Implementing the wall jump.
		* The wall jump mechanic for Gen
		*/
		//allowWallJump = checkOverlap(player, map); //test
		//if (controls.up.isDown == true && (player.body.onFloor() == false || player.body.touching.down) == false) //test
		//if (controls.up.isDown == true && (player.body.onFloor() == false) ) //test
		//if (controls.up.isDown == true && (player.body.onFloor() == false) && player.body.onWall() == true) //DA 5
		if (controls.up.isDown == true && (player.body.onFloor() == false) && player.body.onWall() == true && playerStamina > 0) //DA 7 //test
		{
			//Sends the player  up initially
			player.body.velocity.y = -650; //test
			
			if (facingLeft == true)
			{
				player.animations.play('left_jump'); //test //For Gen sprite
			}
			else
			{
				player.animations.play('right_jump'); //test //For Gen sprite
			}
			
			//Playing the player jump sound effect
			//sound = game.add.audio("player_jump_sound_effect"); //test
			//sound.play(); //test
			
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
			
			//Decreasing stamina
			playerStamina -= 3; //test
		}
		
		/*
		* CEILING CLIMB
		* Implementing the ceiling climb.
		*/
		//if (controls.up.isDown == true && (player.body.onFloor() == false) && player.body.onCeiling() == true) //DA 5
		if (controls.up.isDown == true && (player.body.onFloor() == false) && player.body.onCeiling() == true && playerStamina > 0)
		{
			//Sends the player  up initially
			player.body.velocity.y = -650; //test
			
			//Playing the jump animations
			if (facingLeft == true)
			{
				player.animations.play('left_jump'); //test //For Gen sprite
			}
			else
			{
				player.animations.play('right_jump'); //test //For Gen sprite
			}
			
			
			//Playing the player jump sound effect
			//sound = game.add.audio("player_jump_sound_effect"); //test
			//sound.play(); //test
			
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
			
			//Decreasing stamina
			playerStamina -= 3; //test
		}
		
		//test //IDK what this is for //DELETE this maybe
		if (controls.up.isDown == true && (player.body.onFloor() == true || player.body.touching.down) == true) {//test
			
			//player.body.velocity.y = -600; //original
			player.body.velocity.y = -650; //test
			jumpTimer = game.time.now + 750;
			
			//Playing the jump animations
			if (facingLeft == true)
			{
				player.animations.play('left_jump'); //test //For Gen sprite
			}
			else
			{
				player.animations.play('right_jump'); //test //For Gen sprite
			}
			
			//Playing the player jump sound effect
			sound = game.add.audio("player_jump_sound_effect"); //test
			sound.play(); //test
		
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
				
				//Playing the player using a repair kit sound effect
				sound = game.add.audio("player_uses_repair_kit_sound_effect"); //test
				sound.play(); //test
			}
			
		}
		
		//Checking player collision with enemy
		/*
		if (checkOverlap(player, enemy_1.bomb))
		{
			player.body.velocity.y = -600; //test //temporary effect to be sent upwards when hit
		}
		*/
		
		//Checking collisions
		game.physics.arcade.overlap(player, enemies, collisionPlayer_and_EnemyBody, null, this); //DA 5
		game.physics.arcade.overlap(player_projectile, enemies, collisionPlayerProjectile_and_EnemyBody, null, this); //DA 5
		game.physics.arcade.overlap(player, exit_boxes, collisionPlayer_and_ExitBox, null, this); //DA 5
		game.physics.arcade.overlap(player, repair_kits, collisionPlayer_and_RepairKit, null, this); //DA 6
		//game.physics.arcade.overlap(player_projectile, layer, collisionPlayerProjectile_and_Tilemap, null, this); //DA 7 //test //Didn't work at as planned
		
		//AI
		//AI_SingleBossEnemy_Head_1(enemies); //test
		//AI_SingleBossEnemy_Head_1(enemy_1); //test
		//AI_SingleBossEnemy_Head_1(); //test
		
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
			
			//Play the level up sound effect
			sound = game.add.audio("player_level_up_sound_effect"); //test
			sound.play(); //test
		}
		
		//Constantly updating the stats of the player on the top left part of the screen every frame
		labelPlayerLevel.text = playerLevelString + playerLevel; //test
		labelPlayerExperience.text = playerExperienceString + playerExperience + playerMaxExperienceString + playerMaxExperience; //test
		labelPlayerHealth.text = playerHealthString + playerHealth + playerMaxHealthString + playerMaxHealth; //test
		labelPlayerStamina.text = playerStaminaString + playerStamina + playerMaxStaminaString + playerMaxStamina; //DA 7
		labelPlayerAttack.text = playerAttackString + playerAttack; //test
		labelPlayerDefense.text = playerDefenseString + playerDefense; //test
		labelPlayerRepairKitAmount.text = playerRepairKitAmountString + playerRepairKitAmount; //test
		
		
		//Updating visual for bars
		//player_health_bar.crop.width = (playerHealth / playerMaxHealth) * player_health_bar.width; //test //Player health bar visual //Wouldn't work
		player_health_bar.width = (playerHealth / playerMaxHealth) * 220; //test //Player health bar visual //220 is the original Y value of the player_health_bar image
		player_health_bar.updateCrop();
		
		player_experience_bar.width = (playerExperience / playerMaxExperience) * 220; //test //Player health bar visual //220 is the original Y value of the player_health_bar image
		player_experience_bar.updateCrop(); //test //Apparently this does nothing here
		
		player_stamina_bar.width = (playerStamina / playerMaxStamina) * 220; //test //Player health bar visual //220 is the original Y value of the player_stamina_bar image
		player_stamina_bar.updateCrop(); //test //Apparently this does nothing here
		
		//Constantly updating the stats of the current enemy on the top right part of the screen every frame
		labelCurrentEnemyHealth.text = currentEnemyHealthString + currentEnemyHealth; //test
		
		//Updating visuals for bars
		
		//--------For Regular levels Start--------
		
		enemy_health_bar.width = (currentEnemyHealth / 100) * 220; //test //Player health bar visual //220 is the original Y value of the player_health_bar image
		
		//--------For Regular levels End-------
		
		//------For Final Boss Level ONLY Start--------
		/*
		enemy_health_bar.width = (currentEnemyHealth / 500) * 220; //test //Player health bar visual //220 is the original Y value of the player_health_bar image
		enemy_health_bar.updateCrop();
		
		//Uncomment for final boss fight only
		if (currentEnemyHealth <= 0)
		{
			game.sound.stopAll(); //test
			game.state.start( "victory_end" ); //test //Goes to the victory screen
		}
		*/
		//------For Final Boss Level ONLY End--------
		
		//If the player health exceeds the max player health, set the player health to what the max player health is.
		if (playerHealth > playerMaxHealth)
		{
			playerHealth = playerMaxHealth; //test
		}
		//If the player health is 0 or below, go to the game over screen
		if (playerHealth <= 0)
		{
			playerHealth = 0; //test
			
			//My code---------
			game.sound.stopAll(); //test
			
			game.state.start( "end" ); //test
			
			//My code --- play player death sound
			sound = game.add.audio("player_death_sound"); //test
			sound.play(); //test
		}
		
		
		//Setting the global variable like global_player_level to what is the current in scene variable like playerLevel.
		global_player_level = playerLevel; //test
		global_player_experience = playerExperience; //test
		global_player_repair_kit_amount = playerRepairKitAmount; //test
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
				//player_projectile.body.allowGravity = false; //DA 5 //Make it so the projectile shoots in a straight line
				player_projectile.body.allowGravity = true; // DA 7 //Makes it so the projectile is affected by gravity
				player_projectile_time = game.time.now + 200;
			}
			
			//Animating the current player projectile
			player_projectile.animations.add('player_projectile_neutral', [0, 1], 60, true); //test
			player_projectile.animations.play('player_projectile_neutral'); //test
			
			//Plays player projectile sound effect.
			//This is kept in the if statement so it only plays when you actually fire a projectile instead of each left click button click.
			sound = game.add.audio("player_projectile_sound_effect"); //test
			sound.play(); //test
		}

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
				//player_projectile.body.allowGravity = false; //DA 5//Make it so the projectile shoots in a straight line
				player_projectile.body.allowGravity = true; // DA 7 //Makes it so the projectile is affected by gravity
				player_projectile_time = game.time.now + 200;
			}
			
			//Animating the current player projectile
			player_projectile.animations.add('player_projectile_neutral', [0, 1], 60, true); //test
			player_projectile.animations.play('player_projectile_neutral'); //test
			
			//Plays player projectile sound effect.
			//This is kept in the if statement so it only plays when you actually fire a projectile instead of each left click button click.
			sound = game.add.audio("player_projectile_sound_effect"); //test
			sound.play(); //test
		}

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
		//tween = game.add.tween(enemies).to( { y: 1000 }, 3500, Phaser.Easing.Linear.None, true, -100, 100, true); //DA 5
		tween = game.add.tween(enemies).to( { y: 1000 }, 3500, Phaser.Easing.Linear.None, true, -100, 100, true); //DA 5
		
	
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
	* Function that creats a single flying enemy 1 at a certain x and y.
	*/
	function createSingleFlyingEnemy_1 (index, game, x, y) //test //My version
	{
		//this.enemy = game.add.sprite(x, y, 'ground_enemy_1'); //test
		this.enemy = enemies.create(x, y, 'flying_enemy_1'); //test
		this.enemy.anchor.setTo(0.5, 0.5);
		this.enemy.name = index.toString();
		//game.physics.enable(this.enemy, Phaser.Physics.ARCADE); //original
		game.physics.arcade.enable(this.enemy); //test
		this.enemy.body.immovable = true;
		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.allowGravity = false;
		
		//this.enemy.body.checkCollision = true; //test
		
		//game.physics.arcade.enable(enemies); //test
		//game.physics.arcade.collide(this.enemy, layer); //test
		
		//game.physics.arcade.collide(this.enemy, layer); //test
		
		
		this.enemy.health = 75; //test
		
		/*
		this.enemyTween = game.add.tween(this.enemy).to( {
			x: this.enemy.x + 800
		}, 2000, 'Linear', true, 0, 100, true);
		*/
		this.enemyTween = game.add.tween(this.enemy).to( {
			y: this.enemy.y + 800
		}, 2000, 'Linear', true, 0, 100, true);
		
	}
	
	/*
	* Function that creats a single boss enemy head 1 at a certain x and y.
	*/
	function createSingleBossEnemy_Head_1 (index, game, x, y) //test //My version
	{
		//this.enemy = game.add.sprite(x, y, 'ground_enemy_1'); //test
		this.enemy = enemies.create(x, y, 'boss_enemy_head_1'); //test
		this.enemy.anchor.setTo(0.5, 0.5);
		this.enemy.name = index.toString();
		//game.physics.enable(this.enemy, Phaser.Physics.ARCADE); //original
		game.physics.arcade.enable(this.enemy); //test
		//this.enemy.body.immovable = true;
		this.enemy.body.collideWorldBounds = true;
		this.enemy.body.allowGravity = true;
		//this.enemy.body.allowGravity = false;
		
		//this.enemy.body.checkCollision = true; //test
		
		//game.physics.arcade.enable(enemies); //test
		//game.physics.arcade.collide(this.enemy, layer); //test
		
		//game.physics.arcade.collide(this.enemy, layer); //test
		
		//test
		this.enemy.health = 500; //test
		//test
		
		this.enemyTween = game.add.tween(this.enemy).to( {
			x: this.enemy.x + -1350
		}, 1500, 'Linear', true, 0, 100, true);
		
		this.enemyTween = game.add.tween(this.enemy).to( {
			y: this.enemy.y + -800
		}, 2000, 'Linear', true, 0, 100, true);
		
		//this.enemy.x = 700; //test
	}
	
	/*
	* The AI function for the SingleBossEnemy_Head_1
	* DOESN'T WORK AS INTENDED
	*/
	function AI_SingleBossEnemy_Head_1 ()
	{
		//Didn't work
		/*
		if (enemy.body.onFloor() == true) //test
		{
			enemy.y = 650;
		}
		*/
		
		/*
		if (enemy.velocity.y == 0) //test
		{
			enemy.velocity.y = -650;
		}
		*/
		//------------------------
		//  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > enemy_projectile_time)
		{
			//  Grab the first bullet we can from the pool
			enemy_projectile = enemy_projectiles.getFirstExists(false);
	
			if (enemy_projectile)
			{
				//Firing the enemy projectile
				enemy_projectile.reset(enemy_1.x, enemy_1.y + 30);
				enemy_projectile.body.velocity.x = 0;
				enemy_projectile.body.velocity.y = enemy_projectile_speed;
				enemy_projectile.body.allowGravity = false; //DA 5//Make it so the projectile shoots in a straight line
				//enemy_projectile.body.allowGravity = true; // DA 7 //Makes it so the projectile is affected by gravity
				enemy_projectile_time = game.time.now + 200;
			}
			
			//Animating the current enemy projectile
			//enemy_projectile.animations.add('enemy_projectile_neutral', [0, 1], 60, true); //test
			//enemy_projectile.animations.play('enemy_projectile_neutral'); //test
			
			//Plays enemy projectile sound effect.
			//This is kept in the if statement so it only plays when you actually fire a projectile instead of each left click button click.
			//sound = game.add.audio("enemy_projectile_sound_effect"); //test
			//sound.play(); //test
		}
		
	}
	
	/*
	* Function that creats a single repair kit at a certain x and y.
	*/
	function createSingleRepairKit (index, game, x, y) //test //My version
	{
		this.repair_kit = repair_kits.create(x, y, 'repair_kit'); //test
		this.repair_kit.anchor.setTo(0.5, 0.5);
		this.repair_kit.name = index.toString();
		
		game.physics.arcade.enable(this.repair_kit); //test
		this.repair_kit.body.immovable = true;
		this.repair_kit.body.collideWorldBounds = true;
		//this.repair_kit.body.allowGravity = false;
		
		//this.repair_kit.body.checkCollision = true; //test
		
		//game.physics.arcade.enable(repair_kits); //test
		//game.physics.arcade.collide(this.repair_kit, layer); //test
		
		//game.physics.arcade.collide(this.repair_kit, layer); //test
		
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
		player.body.velocity.y = -1000; //DA 5
		
		//DA 7
		if (facingLeft == true)
		{
			player.body.velocity.x = 650; //DA 7
		}
		else if (facingLeft == false)
		{
			player.body.velocity.x = -650; //DA 7
		}
		
		//My code --- play player death sound
		sound = game.add.audio("player_damaged_sound"); //test
		sound.play(); //test
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
		
		//Settomg tje current enemy health displayed to the most recently hit enemy's enemy.health
		currentEnemyHealth = enemy.health; //test
		
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
		
		//Play the explosion sound effect
		sound = game.add.audio("explosion_sound_effect"); //test
		sound.play(); //test
		
		
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
	* Function that handles the collision between the player projectile and the tilemap (the layer)
	*/
	function collisionPlayerProjectile_and_Tilemap (player_projectile, layer) {
		
		
		//When a player projectile hits the ground. Kill the player projectile.
		//player_projectile.kill(); //test //This didn't work as expected. All the player projectiles are just dead at the very beginning.
		
		if (player_projectile.body.onFloor() == true || player_projectile.body.onWall() == true)
		{
			player_projectile.kill();
		}
			
		
	}
	
	/*
	* Function that handles the collision between the player and repair kits
	*/
	function collisionPlayer_and_RepairKit (player, repair_kit) {
		
		playerRepairKitAmount += 1; //test
		
		repair_kit.kill();
		
		
		//My code --- play player death sound
		sound = game.add.audio("ding_sound_effect"); //test
		sound.play(); //test
	}
	
	/*
	* This functions handles the collision between the player and an exit box
	*/
	function collisionPlayer_and_ExitBox (player, exit_box) {
		
		//My code---------
		game.sound.stopAll(); //test
		
		game.state.start( "main_level_2" ); //test ////Goes to level 2
		//game.state.start( "main_level_3" ); //test ////Goes to level 3
		//game.state.start( "main_level_4" ); //test ////Goes to level 4
		//game.state.start( "main_level_5" ); //test ////Goes to level 5
		//game.state.start( "main_level_6" ); //test ////Goes to level 6
		//game.state.start( "main_level_7" ); //test ////Goes to level 7
		//game.state.start( "main_level_8" ); //test ////Goes to level 8
		//game.state.start( "main_level_6" ); //test ////Goes to level Final Boss Level
		//game.state.start( "victory_end" ); //test //Goes to the victory screen
		
		//My code --- play player death sound
		//sound = game.add.audio("player_death_sound"); //test
		//sound.play(); //test
	}
	
	 return { "preload": preload, "create": create, "update": update }; //test
}
//End of current level code


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
	
    game.state.add( "main", make_main_game_state( game ) ); //Level 1
	/*
	game.state.add( "main_level_2", make_main_game_level_2_state(game) ); //Level 2
	game.state.add( "main_level_3", make_main_game_level_3_state(game) ); //Level 3
	game.state.add( "main_level_4", make_main_game_level_4_state(game) ); //Level 4
	game.state.add( "main_level_5", make_main_game_level_5_state(game) ); //Level 5
	game.state.add( "main_level_6", make_main_game_level_6_state(game) ); //Level 6
	*/
	
	game.state.add( "start", make_start_state(game) ); //test
	game.state.add( "end", make_end_state(game) ); //test
    game.state.add( "victory_end", make_victory_end_state(game) ); //test
    
	//--My code. Starting the game at the start scene instead of at main which is the main game. -------
	game.state.start( "start" ); //test
    //game.state.start( "main" ); //test
};

//--My code-------------------------------------------------------------------
//---------------------My code. More functions such as for the start and end state.-----------------------------------------------------------
function make_start_state(game)
{
	//preload function
	function preload() {
		game.load.image('title_screen', 'assets/da5_title_screen_draft_2.png'); //test
		
		game.load.audio('start_scene_theme', 'sounds/megaman2_opening_theme.m4a'); //test
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
			//game.state.start('main'); //test
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
		game.load.image('game_over_screen', 'assets/da5_gameover_screen_draft_2.png'); //test
		
		game.load.audio('game_over_end_scene_theme', 'sounds/megaman2_password_theme.m4a'); //test
	}
	
	function create() {
		//Adding the background art
		background_art = game.add.tileSprite(0, 0, 800, 600, 'game_over_screen'); //test
		
		//-My code. Adding a restart button.
		restartButton = game.input.keyboard.addKey(Phaser.Keyboard.R); //test
		restartButton.onDown.add(restartGame); //test
		
		//My code--- Playing theme
		music = game.add.audio("game_over_end_scene_theme"); //test
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

function make_victory_end_state(game)
{
	
	var background_art; //test
	
	var music; //test
	var sound; //test
	
	var totalScoreString = ''; //test
	var labelTotalScore; //test
	
	var restartButton; //test
	
	function preload() {
		game.load.image('victory_screen', 'assets/da5_victory_screen_draft_2.png'); //test
		
		game.load.audio('end_scene_theme', 'sounds/ninja_gaiden_ending_theme.m4a'); //test
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
		
		/*
		//Creating and setting the total score
		totalScoreString = 'Total Score: '; //test
		labelTotalScore = game.add.text(250, 550, totalScoreString + total_score, { font: "40px", fill: "#ffffff" }); //test 
		*/
		
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
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------Separate Levels (copy and pasted code from original level to a new scene)-----------------------------------------------
//Would have to store a list of all the objects spawned in certain levels like player, enemies, exit blocks, etc.
/*
*
*/
//function make_main_game_level_2_state( game )

//End of current level code