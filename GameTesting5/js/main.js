"use strict";

function make_main_game_state( game )
{
    function preload() {
        //game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON); //original
		game.load.tilemap('level_1', 'assets/level_1_test.json', null, Phaser.Tilemap.TILED_JSON);
		
		//game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png'); //original
		game.load.image('tiles', 'assets/simples_pimples.png')
		
		
    }
    
    var map;
	var layer;
    
    function create() {
        game.stage.backgroundColor = '#787878';
		
		map = game.add.tilemap('level_1');
		map.addTilesetImage('level_1_TilesetImage', 'tiles');
		
		layer = map.createLayer('World1');
		
		//  This resizes the game world to match the layer dimensions
		layer.resizeWorld();
		
    }
    
    function update() {
        
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
};
