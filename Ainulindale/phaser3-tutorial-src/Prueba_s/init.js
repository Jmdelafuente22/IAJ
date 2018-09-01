var config = {
    type: Phaser.AUTO,
    width: 800, //
    height: 600,
    parent: "container", // Esto es por como esta creado el html
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};

var game = new Phaser.Game(config);
var player;
var stars;
var platforms;
var cursors;
var gameOver = false;





function preload ()
{
  console.log("iniciando preload")
    this.load.image('sky', '../assets/fondo2.png');
    this.load.image('ground', '../assets/platform.png');
    this.load.image('star', '../assets/nota.png');
    this.load.image('bomb', '../assets/bomb.png');
    this.load.spritesheet('dude', '../assets/playerAmarillo.png', { frameWidth: 51, frameHeight: 48 });
}

function create ()
{
console.log("iniciando create")
//background = this.add.image(400, 300,'sky');


//this.add.image(400, 300, 'sky');

    // platforms = this.physics.add.staticGroup();
    //
    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    //
    // platforms.create(500, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');
    // barras = this.physics.add.sprite();
    // barras.create(600,0,'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
//player.setScale(0.1);

// Lo nuevo
  barras = this.physics.add.sprite(600, 0, 'ground'); // Se agrega las barras
  barras.body.setGravityY(-100);





    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        //frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
        frameRate: 10,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });



    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(player, barras); // Colision
    this.physics.add.collider(stars, barras); // Colision
    this.physics.add.collider(player, barras, hitBarra, null, this); // Para la interseccion  entre barra y player

    this.physics.add.overlap(player, stars, collectStar, null, this);




}

function update ()
{
   // if (gameOver)
   // {
   //     return;
   // }
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
//	moverFondo();




}

function collectStar (player, star)
{
    star.disableBody(true, true);
}

// function moverFondo()
// {
// background.y +=2;
// if(background.y >= 1445){
// 	background.y = -845;
//   }
// }
function hitBarra (player, barras)
{
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}

function render () {

  //debug helper
  game.debug.spriteInfo(barra,32,32);

}
