var game;

// number of boids (bird-oid objects)
var boidsAmount = 50;
// speed of each boid, in pixels per second
var boidSpeed = 100;
// radius of sight of the boid
var boidRadius = 50;
// array which will contain all boids
var boids = [];

window.onload = function() {	
	game = new Phaser.Game(640, 640, Phaser.AUTO, "");
     game.state.add("Simulate", simulate);
     game.state.start("Simulate");
}

var simulate = function(game){};
simulate.prototype = {
     preload: function(){
          // preloading boid image
          game.load.image("boid", "boid.png");     
     },
     create: function(){
          for(var i = 0; i < boidsAmount; i++){
               // placing the boid at a random point within the canvas
               var randomPoint = new Phaser.Point(game.rnd.between(0, game.width - 1), game.rnd.between(0, game.height - 1));
               boids[i] = {
                    position: randomPoint,
                    asset: game.add.sprite(randomPoint.x, randomPoint.y, "boid")
               }
               boids[i].asset.anchor.set(0.5);
               // enabling boid physics
               game.physics.enable(boids[i].asset, Phaser.Physics.ARCADE);
               // allowing us to manually rotate the boid
               boids[i].asset.body.allowRotation = false;     
          }
     },
     update: function(){
          // temp array to calculate centroid 
          var centroidArray = [];
          // looping through each boid
          for(var i = 0; i < boidsAmount; i++){
               // for each boid, looping through each boid
               for(var j = 0; j < boidsAmount; j++){
                    // if the boid is not the current boid and the boid is within boid radius...
                    if(i != j && boids[i].position.distance(boids[j].position) < boidRadius){
                         // pushing the boid into centroid array
                         centroidArray.push(boids[j].position);     
                    }
               }
               // if centroidArray is populated, that is if there were boids nearby the current boid...
               if(centroidArray.length > 0){
                    // calculating the centroid
                    var centroid = Phaser.Point.centroid(centroidArray);
               }
               else{
                    // just tossing a random point
                    var centroid = new Phaser.Point(game.rnd.between(0, game.width - 1), game.rnd.between(0, game.height - 1));
               }
               // rotating the boid towards the centroid
               boids[i].asset.angle = boids[i].position.angle(centroid, true);
               // moving the boid towards the centroid
               game.physics.arcade.moveToXY(boids[i].asset, centroid.x, centroid.y, boidSpeed);
               // updating boid position
               boids[i].position.set(boids[i].asset.x, boids[i].asset.y);
          }                    
     }     
}