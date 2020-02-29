"use strict";

function make_main_game_state( game )
{
    function preload() {
		
		//game.load.spritesheet('dude', 'assets/dude.png', 32, 48); //original from Phaser 2 Tutorial
		this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
        this.game.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tutorial2_tm.png');
		

    }
    
    var bouncy;
    
    function create() {
		
		//  Our two animations, walking left and right.
		//player.animations.add('left', [0, 1, 2, 3], 10, true); //original
		// player.animations.add('right', [5, 6, 7, 8], 10, true); //original
		
		//-Tutorial Code--------------------------------------------------------------------------
		//----Importing TileMap into Phaser-------------------------------------
		//Start the Arcade Physics systems
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Change the background colour
        this.game.stage.backgroundColor = "#a9f0ff";

        //Add the tilemap and tileset image. The first parameter in addTilesetImage
        //is the name you gave the tilesheet when importing it into Tiled, the second
        //is the key to the asset in Phaser
        this.map = this.game.add.tilemap('tilemap');
        //this.map.addTilesetImage('tiles128', 'tiles'); //original
		this.map.addTilesetImage('tutorial2_tm', 'tiles'); //test
		

        //Add both the background and ground layers. We won't be doing anything with the
        //GroundLayer though
        this.backgroundlayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');

        //Before you can use the collide function you need to set what tiles can collide
        this.map.setCollisionBetween(1, 100, true, 'GroundLayer');

        //Change the world size to match the size of this layer
        this.groundLayer.resizeWorld();
		
		//----Creating a Player----------------------------------
		//Set some physics on the sprite
        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = 2000;
        this.sprite.body.gravity.x = 20;
        this.sprite.body.velocity.x = 100;

        //Create a running animation for the sprite and play it
        //this.sprite.animations.add('right', [5, 6, 7, 8], 10, true); //original
        //this.sprite.animations.play('right'); //original
		
		this.sprite.animations.add('left', [0, 1, 2, 3], 10, true); //test
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true); //test
        this.sprite.animations.play('right'); //original

        //Make the camera follow the sprite //Sets the camera to follow the player
        this.game.camera.follow(this.sprite); //original

        //Enable cursor keys so we can create some controls
        this.cursors = this.game.input.keyboard.createCursorKeys();
		
    }
    
    function update() {
		
		//Make the sprite collide with the ground layer
        this.game.physics.arcade.collide(this.sprite, this.groundLayer);
		
		//Make the sprite jump when the up key is pushed
        if(this.cursors.up.isDown) {
          this.sprite.body.velocity.y = -500;
        }
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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
	
	//--------------------------------
	
};
