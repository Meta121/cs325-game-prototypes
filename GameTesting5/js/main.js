"use strict";

function make_main_game_state( game )
{
    function preload() {
        //game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON); //original
		//game.load.tilemap('level_1', 'assets/level_1_test.json', null, Phaser.Tilemap.TILED_JSON);
		//game.load.tilemap('level_1', 'assets/level_1_test.csv');
		game.load.tilemap('map', 'assets/level_1_test.csv');
		
		
		
		//game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png'); //original
		//game.load.image('tiles', 'assets/simples_pimples.png')
		game.load.image('tileset', 'assets/simples_pimples.png')
		
		game.load.tilemap
		
		//this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //from other game example
		game.load.spritesheet('player', 'assets/dude.png', 32, 48);//test
		
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);//test
		game.load.image('bomb', 'assets/bomb.png');//test
		
    }
    
    var map;
	var layer;
	
	//More added variables
	var player;
	var controls; //var controls {};
	var playerSpeed = 150;
	var jumpTimer = 0;
	
	var enemy1;
	var enemyBomb;
    
    function create() {
        /*
		game.stage.backgroundColor = '#787878';
		
		map = game.add.tilemap('level_1');
		map.addTilesetImage('tileset', 'tiles');
		
		layer = map.createLayer('Tile Layer 1');
		*/
		
		//  This resizes the game world to match the layer dimensions
		//layer.resizeWorld();
		
		//game.state.start('level1');//
		
		game.stage.backgroundColor = '#787878';
		
		game.physics.arcade.gravity.y = 1400; //original //Creates almost realistic gravity
		
		map = game.add.tilemap('map', 16, 16);
		
		map.addTilesetImage('tileset');
		
		layer = map.createLayer(0);
		layer.resizeWorld();
		
		//map.setCollisionBetween(0,2); //original
		map.setCollisionBetween(0,0); //test
		//map.setCollisionBetween(100, 100); //test
		
		player = this.add.sprite(100,500, 'player');
		player.anchor.setTo(0.5, 0.5) //original
		
		//  Our two animations, walking left and right.
		player.animations.add('left', [0, 1, 2, 3], 10, true); //original
		player.animations.add('right', [5, 6, 7, 8], 10, true); //original
		
		player.animations.add('neutral', [4], 10, true); //test
		
		//jump
		//run
		
		game.physics.arcade.enable(player);
		game.camera.follow(player);
		player.body.collideWorldBounds = true;
		
		controls = {
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			
			
		}
		
		
		
		//Making the bomb enemy
		enemy1 = new enemyBomb(0, game, player.x + 400, player.y - 200);
		
		
    }
    
    function update() {
        
		game.physics.arcade.collide(player, layer);
		
		player.body.velocity.x = 0; //So every frame sets player speed to 0 to avoid sliding.
		
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
		}
		
		else if (controls.right.isDown == true && controls.left.isDown == false) {
			
			player.animations.play('right');
			//player.scale.setTo(1, 1);
			player.body.velocity.x += playerSpeed;
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
		
		
		if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && game.time.now > jumpTimer) {
			
			player.body.velocity.y = -600;
			jumpTimer = game.time.now + 750;
		
		}
		
		//Checking player collision with enemy
		if (checkOverlap(player, enemy1.bomb))
		{
			player.body.velocity.y = -600; //test //temporary effect to be sent upwards when hit
		}
		
    }
	
	enemyBomb = function(index, game, x, y) {
	
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
    var game = new Phaser.Game( 1600, 1400, Phaser.AUTO, 'game' );
	
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};

function checkOverlap(spriteA, spriteB) {
	
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	
	return Phaser.Rectangle.intersects(boundsA, boundsB);
	
}
