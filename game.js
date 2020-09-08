var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;

// ---------------ACTION FUNCTIONS--------------------

// plays noise
function playSound(colour){
  new Audio ("sounds/" + colour + ".mp3").play();
}

// animates picked button
function animatePress(colour){
  $("#" + colour).addClass("pressed");
  setTimeout(function(){
    $("#" + colour).removeClass("pressed");
  },100);
}


// ---------------GAME FUNCTIONS---------------

// ADD NEW COLOR + PLAY SEQUENCE
function nextSequence(){
      // reset varray to store new answer
  userClickPattern = [];
      // Increase level and show new
  level++;
  $("h1").text("Level " + level);
      // Chose random colour
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
      // add it to game pattern[]
  gamePattern.push(randomChosenColour);
      // show new colour on screen
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

// CHECK ANSWER
function checkAnswer(currentLevel){
  if (userClickPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
    console.log("wrong");
    playSound("wrong");

      // error animation
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
      // change title
    $("h1").text("Game Over, Press Any Key to Restart");
      // Restart Gamea
    startOver();
  }
}

// RESTART Game
function startOver(){
  level=0;
  gamePattern = [];
  started = false;
}

// -------------GAME SEQUENCE-----------------

// DETECT KEYBOARD PRESS + START GAME
$(document).keypress(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});

// DETECT BUTTON CLICK + CHECK ANSWER (al ser un listener se reproducirá cada vez que el usuario pulse un botón, por eso no hay que usar while loops para que se repita)
$(".btn").click(function(){
      // store user pick
  var userChosenColour = this.id;
  userClickPattern.push(userChosenColour);
    // show picked button on screen
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickPattern.length-1);
});
