"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	//game.load.spritesheet('baddie', 'assets/baddie.png', 32, 48);//test
	game.load.image('diamond', 'assets/diamond.png');//test

	//My code ---Adding sound effects and background theme ---//test
	game.load.audio('background_theme', 'sounds/background_song.m4a'); //test
	game.load.audio('jump_player_sound', 'sounds/jump.wav'); //test
}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

//My code---
var baddie; //test //Note this is baddie not baddies
var diamonds; //test

var sound; //test
var music; //test
//---
function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

	//My code--- Playing background theme
	music = game.add.audio("background_theme"); //test
	music.play('', 0, 1, true); //test
	
    //  A simple background for our game
    //game.add.sprite(0, 0, 'sky'); //original
	game.stage.backgroundColor = "b3b54a"; //test

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

	
	
    //  Now let's create two ledges
    //var ledge = platforms.create(400, 400, 'ground'); //original code //This was the first bottom right platform in original
	var ledge = platforms.create(100, 100, 'ground');
    ledge.body.immovable = true;

    //ledge = platforms.create(-150, 250, 'ground'); //original code //This was the second top left platform in the original
	ledge = platforms.create(400, 300, 'ground'); //test //Right platform in center right of screen
	ledge.body.immovable = true;
	//ledge = platforms.create(400, 150, 'ground'); //test //Right platform in top right of screen
	//ledge.body.immovable = true; //test
	
	//ledge = platforms.create(-100, -100, 'ground'); //test //Broke the 100, 100 platform
	//ledge = platforms.create(-100, 50, 'ground'); //test //Made a platform even higher on top left
	ledge = platforms.create(0, 0, 'ground'); //test //Very top left platform made.
	ledge.body.immovable = true; //test
	//ledge = platforms.create(600, 600, 'ground'); //test //Is in the ground
	//ledge.body.immovable = true; //test
	
	ledge = platforms.create(0, 200, 'ground'); //test 
	ledge.body.immovable = true; //test
	
	//ledge = platforms.create(0, 100, 'ground'); //test 
	//ledge.body.immovable = true; //test
	
	//ledge = platforms.create(0, 50, 'ground'); //test
	//ledge.body.immovable = true; //test
	//ledge = platforms.create(0, 700, 'ground'); //test //Didn't show up
	//ledge.body.immovable = true; //test
	//ledge = platforms.create(0, 800, 'ground'); //test //Didn't show up
	//ledge.body.immovable = true; //test
	//ledge = platforms.create(500, 500, 'ground'); //test //Spawned lowest bottom right platform where player spawned
	//ledge.body.immovable = true; //test
	ledge = platforms.create(0, 450, 'ground'); //test //Spawned bottom left platform
	ledge.body.immovable = true; //test
	ledge = platforms.create(200, 350, 'ground'); //test
	ledge.body.immovable = true; //test
	
	
    //ledge.body.immovable = true; //original //Need 1 of this for every single platform made so they won't fall off.

    // The player and its settings
    //player = game.add.sprite(32, game.world.height - 150, 'dude'); //original
	//player = game.add.sprite(50, game.world.height - 0, 'dude'); //test //Spawned player off screen
	//player = game.add.sprite(50, game.world.height - 50, 'dude'); //test //Spawned at the bottom left stuck in ground
	//player = game.add.sprite(300, game.world.height - 10, 'dude'); //test //Stuck in the floor in the middle
	player = game.add.sprite(600, game.world.height - 150, 'dude'); //test

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2; //original
    //player.body.gravity.y = 300; //original
	//player.body.gravity.y = 100; //test //Player could jump way higher with this
    //player.body.gravity.y = 20; //test //Player was made even more lighter and floatier
	//player.body.gravity.y = 1000; //test //Made his jump very small
	//player.body.gravity.y = 800; //test //Not high enough jump
	player.body.gravity.y = 700; //test //This is good for what I want.
	player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();
	
	//My code. -- Adding baddies to kill player
	//baddies = game.add.group();
	diamonds = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
	diamonds.enableBody = true; //test
	
	//baddies.enableBody = true; //test //Enable physics for baddies

    //  Here we'll create 12 of them evenly spaced apart
    /*
	for (var i = 0; i < 5; i++)
    {
        //  Create a star inside of the 'stars' group
        //var star = stars.create(i * 70, 0, 'star'); //original
		//var star = stars.create(i * 70, 280, 'star'); //test
		var star = stars.create(i * 70, 100, 'star'); //test

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	*/
	
	//My Code. Creating stars at the middle evenly //test
	
	for (var i = 0; i < 10; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 120, 225, 'star'); //test

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	
	//My Code. Creating stars at the bottom evenly
	//for (var i = 0; i < 12; i++) //original
	for (var i = 0; i < 5; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, game.world.height - 150, 'star'); //test

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	
	//My Code. Creating diamonds at the top evenly //test
	
	for (var i = 0; i < 7; i++)
    {
        //  Create a star inside of the 'stars' group
        var diamond = diamonds.create(i * 10, 50, 'diamond'); //test

        //  Let gravity do its thing
        diamond.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	
	//My Code. Creating diamonds at the middle evenly //test
	/*
	for (var i = 0; i < 15; i++)
    {
        //  Create a star inside of the 'stars' group
        var diamond = diamonds.create(i * 60, 425, 'diamond'); //test

        //  Let gravity do its thing
        diamond.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	*/
	

	//My code --- create 12 baddies evenly spaced apart
    /*
	for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        //var star = stars.create(i * 70, 0, 'star'); //original
		var baddie = baddies.create(i * 70, 400, 'baddie'); //test

        //  Let gravity do its thing
        //star.body.gravity.y = 300; //original
		baddie.body.gravity.y = 300; //test

        //  This just gives each star a slightly random bounce value
        //star.body.bounce.y = 0.7 + Math.random() * 0.2; //original
		baddie.body.bounce.y = 0.7 + Math.random() * 0.2; //test
    }
	*/

    //  The score
    //scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }); //original
	scoreText = game.add.text(10, 20, 'Points: 0', { fontSize: '32px', fill: '#000' }); //test

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(diamonds, platforms); //test
	
	//game.physics.arcade.collide(baddies, platforms); //test

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
	
	//  Reset the players velocity (movement) //original
    player.body.velocity.x = 0; //original
	
	//game.physics.arcade.overlap(player, baddies, baddieKillPlayer, null, this); //test
	game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this); //test
    //  Reset the players velocity (movement) //test
    player.body.velocity.x = 0; //test

    if (cursors.left.isDown)
    {
        //  Move to the left
        //player.body.velocity.x = -150; //original
		player.body.velocity.x = -300; //test //made faster

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        //player.body.velocity.x = 150; //original
		player.body.velocity.x = 300; //test //made faster

        player.animations.play('right');
    }
	//My Code. Implementing a fast fall function. //test
	else if (cursors.down.isDown)
    {
        //Fast fall
		player.body.velocity.y = 800; //test

        //player.animations.play('right'); //original
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        //player.body.velocity.y = -350; //original
		player.body.velocity.y = -400; //test //Made heavier
		//player.body.velocity.y = -500; //test //Made more heavier
		
		//My code --- Adding jump sound effect
		sound = game.add.audio("jump_player_sound"); //test
		sound.play(); //test
    }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();
	
	//My code--- Removes the player from the screen
	player.kill(); //test

    //  Add and update the score
    //score += 10; //original
	score -= 100; //test
    scoreText.text = 'Points: ' + score;

}

function collectDiamond (player, diamond) {
    
    // Removes the star from the screen
    diamond.kill();

    //  Add and update the score
    //score += 10; //original
	score += 200; //test
    scoreText.text = 'Points: ' + score;

}

/*
function baddieKillPlayer (player, baddie) {
    
    //Removes the player from the screen
    //player.kill();

    //Decrease and update the score
    //score += 10; //original
	score -= 100; //test
    scoreText.text = 'Score: ' + score;

}
*/

};
