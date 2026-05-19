const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  backgroundColor: '#eeeeee',
  parent: 'game-container',

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },

  scene: {
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let player;
let obstacle;
let cursors;

function create() {
  // Create the square player.
  // rectangle(x position, y position, width, height, colour)
  player = this.add.rectangle(400, 250, 50, 50, 0x00aa00);

  // Add Arcade Physics so the square can move.
  this.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  // Challenge example: a second square obstacle.
  obstacle = this.add.rectangle(620, 250, 70, 70, 0xaa0000);
  this.physics.add.existing(obstacle, true);

  // Stop the player when it touches the obstacle.
  this.physics.add.collider(player, obstacle, function () {
    player.body.setVelocity(0);
  });

  // Create keyboard cursor controls.
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // update() runs again and again while the game is playing.
  // We reset velocity first, then check which key is pressed.
  player.body.setVelocity(0);

  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
  }

  if (cursors.right.isDown) {
    player.body.setVelocityX(200);
  }

  if (cursors.up.isDown) {
    player.body.setVelocityY(-200);
  }

  if (cursors.down.isDown) {
    player.body.setVelocityY(200);
  }
}
