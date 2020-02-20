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
    
    
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    //game.load.image('bullet', 'assets/games/invaders/bullet.png'); //original
	game.load.image('bullet', 'assets/player_bullet.png'); //test
    //game.load.image('enemyBullet', 'assets/games/invaders/enemy-bullet.png'); //original
	game.load.image('enemyBullet', 'assets/enemy_bullet.png'); //test
    //game.load.spritesheet('invader', 'assets/games/invaders/invader32x32x4.png', 32, 32); //original
	game.load.image('invader', 'assets/red_ghost.png'); //test
    //game.load.image('ship', 'assets/games/invaders/player.png'); //original
	game.load.image('ship', 'assets/red_boo.png'); //test
    game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
    //game.load.image('starfield', 'assets/games/invaders/starfield.png'); //original
	game.load.image('starfield', 'assets/ghost_mansion_background.png'); //test
    game.load.image('background', 'assets/games/starstruck/background2.png'); //original
	
	
	//--My Code-------------------
	game.load.image('blue_plus', 'assets/blue_plus.png'); //test
	game.load.image('heart', 'assets/firstaid.png'); //test
	//My code ---Adding sound effects and background theme ---//test
	game.load.audio('background_theme', 'sounds/luigimansionbrawl_theme.m4a'); //test
	game.load.audio('player_shoot_sound', 'sounds/1_player_shoot_sound.wav'); //test
	game.load.audio('enemy_shoot_sound', 'sounds/5_enemy_shoot_sound.wav'); //test
	game.load.audio('player_death_sound', 'sounds/megamanX1_death_sound.m4a'); //test
	game.load.audio('enemy_death_sound', 'sounds/pacman_death_sound.m4a'); //test
	

}

var player;
var aliens;
var bullet; //test
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var live; //test
var lives;
var enemyBullet;
var enemyBullets; //test
var firingTimer = 0;
var stateText;
var livingEnemies = [];

//My new variables ------
var health = 100; //test
var healthText; //test
var healthString = ''; //test

var hearts; //test

var blue_plus; //test
var blue_plus_group; //test

var sound; //test
var music; //test

var blaster_type = 0; //test //0 = Default, 1 = Power up 1
var first_aid; //test
var blue_plus; //test

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens(); //original
	
	//My code---The hearts / first aid //test
	hearts = game.add.group();
    hearts.enableBody = true;
    hearts.physicsBodyType = Phaser.Physics.ARCADE;
	createHearts(); //test
	
	//My code---The blue plusses //test
	blue_plus_group = game.add.group();
    blue_plus_group.enableBody = true;
    blue_plus_group.physicsBodyType = Phaser.Physics.ARCADE;
	createBluePlusGroup(); //test

    //  The score
    //scoreString = 'Score : '; //original
	scoreString = 'Points: '; //test
    //scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' }); //original
	scoreText = game.add.text(game.world.width - 300, 10, scoreString + score, { font: '34px', fill: '#fff' }); //test


    //  Lives
    lives = game.add.group();
    //game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' }); //original
	//game.add.text(game.world.width - 100, 10, 'Health: ', { font: '34px', fill: '#fff' }); //test
	
	healthString = 'Health: '; //test
	//healthText = game.add.text(10, 10, 'Health: ' + health, { font: '34px', fill: '#fff' }); //test
	healthText = game.add.text(10, 10, healthString + health, { font: '34px', fill: '#fff' }); //test

    //  Text
    //stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' }); //original
	stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px', fill: '#fff' }); //test
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

	//original code --- Where lives are created in original code---------
	//test //Change this to health points
	
	/*
    for (var i = 0; i < 3; i++) //original
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship'); //original
        ship.anchor.setTo(0.5, 0.5); //original
        ship.angle = 90; //original
        ship.alpha = 0.4; //original
    }
	*/
	

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //original
	//fireButton = game.input.mousePointer(Phaser.Keyboard.SPACEBAR); //test
	
	//My code--- Playing background theme
	music = game.add.audio("background_theme"); //test
	music.play('', 0, 1, true); //test
    
}

function createAliens () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            //var alien = aliens.create(x * 48, y * 50, 'invader'); //original
			var alien = aliens.create(x * 48, y * 50, 'invader'); //test
			
            alien.anchor.setTo(0.5, 0.5); 
            //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true); //original //creates (or sets) the 'fly' animation
            //alien.play('fly'); //original
            alien.body.moves = false;
        }
    }

    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    //var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true); //original
	var tween = game.add.tween(aliens).to( { x: 1000 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	
    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
}

//My code----Creating hearts that give health-----------------
function createHearts () {

	//for (var x = 0; x < 4; x++) //original
	for (var x = 1; x < 5; x++) //test
     {
        //var alien = aliens.create(x * 48, y * 50, 'invader'); //original
		var heart = hearts.create((x * 100) + 100, 500, 'heart'); //test
			
        heart.anchor.setTo(0.5, 0.5); 
        heart.body.moves = false;
    }

    hearts.x = 100;
    hearts.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    //var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true); //original

    //  When the tween loops it calls descend
    //tween.onLoop.add(descend, this); //original
}

//My code----Blue Plusses that give a power up that changes blaster type-----------------
function createBluePlusGroup() {

	//for (var x = 0; x < 4; x++) //original
	for (var x = 1; x < 2; x++) //test
     {
        //var alien = aliens.create(x * 48, y * 50, 'invader'); //original
		var blue_plus = blue_plus_group.create((x * 100) + 100, 400, 'blue_plus'); //test
			
        blue_plus.anchor.setTo(0.5, 0.5); 
        blue_plus.body.moves = false;
    }

    blue_plus_group.x = 100;
    blue_plus_group.y = 50;
}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function descend() {

    //aliens.y += 10; //original
	
	aliens.y += 1000; //test

}

function update() {

    //  Scroll the background
    starfield.tilePosition.y += 2;

    if (player.alive)
    {
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            //player.body.velocity.x = -200; //original
			player.body.velocity.x = -500; //test
        }
        else if (cursors.right.isDown) //original
		//if (cursors.right.isDown)
        {
            //player.body.velocity.x = 200; //original
			player.body.velocity.x = 500; //test
        }
		//else if (cursors.up.isDown) //test
		if (cursors.up.isDown) //test
        {
            //player.body.velocity.y = -200; //test
			player.body.velocity.y = -500; //test
        }
		else if (cursors.down.isDown) //test
		//if (cursors.down.isDown) //test
        {
            //player.body.velocity.y = 200; //test
			player.body.velocity.y = 500; //test
        }
		/*
		else if (cursors.up.isDown && cursors.left.isDown) //test
        {
			player.body.velocity.x = -500; //test
			player.body.velocity.y = -500; //test
        }
		else if (cursors.up.isDown && cursors.right.isDown) //test
        {
			player.body.velocity.x = 500; //test
			player.body.velocity.y = -500; //test
        }
		else if (cursors.down.isDown && cursors.left.isDown) //test
        {
			player.body.velocity.x = -500; //test
			player.body.velocity.y = 500; //test
        }
		else if (cursors.down.isDown && cursors.right.isDown) //test
        {
			player.body.velocity.x = 500; //test
			player.body.velocity.y = 500; //test
        }
		*/
		

        //  Firing?
		
		//fireBullet(); //original
		
        if (fireButton.isDown) //test
        {
			if (blaster_type == 0)
			{
				fireBullet();
			}
			else if (blaster_type == 1)
			{
				fireThreeBullet();
			}
        }

        if (game.time.now > firingTimer)
        {
            enemyFires();
        }

        //  Run collision
        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this); //original
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this); //original
		
		//My code---------
		game.physics.arcade.overlap(player, aliens, enemyBodyHitsPlayer, null, this); //test
		game.physics.arcade.overlap(player, hearts, heartHitsPlayer, null, this); //test
		game.physics.arcade.overlap(player, blue_plus_group, blueplusHitsPlayer, null, this); //test
    }

}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    //score += 20; //original
	score += 100;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0)
    {
        //score += 1000; //original
		score += 2000; //test
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        //stateText.text = " You Won, \n Click to restart"; //original
		stateText.text = " You Win! \n Click to play again"; //test
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
	//My extra code-----------------------------------------
	else{
		
		//My code --- play enemy death sound
		sound = game.add.audio("enemy_death_sound"); //test
		sound.play(); //test
	}

}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

	
    //live = lives.getFirstAlive(); //original

	/*
    if (live) //original
    {
        live.kill(); //original
    }
	*/
	
	//My code---------
	health -= 50; //test
	healthText.text = healthString + health; //test

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    //if (lives.countLiving() < 1) //original
	if (health < 1) //test
    {
        player.kill();
        enemyBullets.callAll('kill');

        //stateText.text=" GAME OVER \n Click to restart"; //original
		stateText.text=" You Lose \n Click to play again"; //test
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
	
	//My code --- play player death sound
	sound = game.add.audio("player_death_sound"); //test
	sound.play(); //test

}

//My code -Make a function that kills player when they touch the enemy.
//test
function enemyBodyHitsPlayer (player, invader) {
    
	
    //live = lives.getFirstAlive(); //original

	/*
    if (live) //original
    {
        live.kill(); //original
    }
	*/
	
	//My code---------
	invader.kill(); //test //Kill invader that was touched
	//My code -------- Decreasing score
	score -= 200; //test
    scoreText.text = scoreString + score; //test
	
	
	//My code---Made it so you die when you have lower than 1 HP but lose health if you have greater than or equal to 1 health------
	health -= 50; //test
	healthText.text = healthString + health; //test

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    //if (lives.countLiving() < 1) //original
	if (health < 1) //test
    {
        player.kill();
        enemyBullets.callAll('kill');

        //stateText.text=" GAME OVER \n Click to restart"; //original
		stateText.text=" You Lose \n Click to play again"; //test
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
	
	//My code --- play player death sound
	sound = game.add.audio("player_death_sound"); //test
	sound.play(); //test

}

//My code---Hearts hit player
function heartHitsPlayer (player, heart) {
    
    heart.kill();
	
	//My code---------
	health += 50; //test
	healthText.text = healthString + health; //test

	
	//My code --- play recovery sound
	//sound = game.add.audio("player_death_sound"); //test
	//sound.play(); //test

}

//My code---Hearts hit player
function blueplusHitsPlayer (player, blue_plus) {
    
    blue_plus.kill();
	
	//My code---------
	blaster_type = 1; //test

	
	//My code --- play recovery sound
	//sound = game.add.audio("player_death_sound"); //test
	//sound.play(); //test

}


function enemyFires () {

    //My code --- play enemy shoot sound
	sound = game.add.audio("enemy_shoot_sound"); //test
	sound.play(); //test
	
	//  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        //game.physics.arcade.moveToObject(enemyBullet,player,120); //original //API: moveToObject(gameObject, destination [, speed] [, maxTime])
        game.physics.arcade.moveToObject(enemyBullet,player, 400); //test
		
		firingTimer = game.time.now + 2000;
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
	//My code --- play player shoot sound
	sound = game.add.audio("player_shoot_sound"); //test
	sound.play(); //test

}

//--My code----------------------
function fireThreeBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8); //original
            bullet.body.velocity.y = -400; //original
            //bulletTime = game.time.now + 200; //original
			
			bullet = bullets.getFirstExists(false);
			bullet.reset(player.x + 20, player.y + 8); //test //Fire 2nd bullet
            bullet.body.velocity.y = -400; //test
			
			bullet = bullets.getFirstExists(false);
			bullet.reset(player.x - 20, player.y + 8); //test //Fire 3rd bullet
            bullet.body.velocity.y = -400; //test
			
			bulletTime = game.time.now + 200; //test
        }
    }
	//My code --- play player shoot sound
	sound = game.add.audio("player_shoot_sound"); //test
	sound.play(); //test

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {

    //  A new level starts
    
    //resets the life count
    //lives.callAll('revive'); //original
	/* -My code----------------
	*/
	health = 100; //test
	healthText.text = healthString + health; //test
	
	score = 0; //test //Reset the score to 0.
    scoreText.text = scoreString + score; //test
	
	//revives the player
    player.revive();
	
	//My code ---Reseting the player to default location when they revive
	//player.reset(x,y); //test
	player.reset(400, 500); //test
	
	
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens();
	
	//My code--- Deleting current items and adding new ones back in.
	hearts.removeAll(); //test
    createHearts(); //test
	
	blue_plus_group.removeAll();
    createBluePlusGroup();
	blaster_type = 0; //test //Reset blaster type back to the default which is 0.
	
	
	/*
    //revives the player
    player.revive();
	
	//My code ---Reseting the player to default location when they revive
	//player.reset(x,y); //test
	player.reset(400, 500); //test
	*/
	
    //hides the text
    stateText.visible = false;

}

};
