
// Global Variables

var steps = [];
var strict = false;
var next = true;
var currStep = 0;
var player = false;
var loopNum = 0;


/**
 * When HTML document is ready, establish button behavior
 */
$(document).ready(function() {
  $("#reset").click(function() {
    $("#reset").html("Reset");
    reset();
  });

  $("#strict").click(function() {
    if (strict) {
      $("#strict").html("Strict Mode: Off");
      strict = false;
    } else {
      $("#strict").html("Strict Mode: On");
      strict = true;
    }
  });
});


/*
 * Loop that goes through Simon's steps in game
 */
function myLoop() {
  setTimeout(function() {
    playButton(steps[currStep]);
    currStep++;
    if (currStep < steps.length) {
      myLoop();
    } else {
      currStep = 0;
    }
  }, 1000);
}


/*
 * Start round of game
 */
function simonSays() {
  player = false;
  currStep = 0;
  if (next) {
    var newStep = Math.floor(Math.random() * 4) + 1;
    steps.push(newStep);
    $("#counter").html("Steps: " + steps.length);
  }

  myLoop();
  console.log(steps);
  playTurn();
}


/**
 * Fuction that prepares game for user's input
 */
function playTurn() {
  player = true;
  currStep = 0;
  $(".btn").prop("disabled", false);
  $(".btn").off().on("click", function() {
    if (this.value != steps[currStep]) {
      $(".btn").prop("disabled", true);
      wrong();
    } else {
      console.log(this.value);
      playButton(parseInt(this.value));

      next = true;
      currStep++;
      if (currStep === steps.length) {
        if (steps.length === 20) {
          //$(".btn").prop("disabled", true);
          setTimeout(win, 1000);
        } else {
          currStep = 0;
          setTimeout(simonSays, 1000);
        }
      }
    }
  });
}

/**
 * Sets audible feedback for wrong step
 */
function wrong() {
  console.log("wrong");
  document.getElementById("wrongBeep").play();
  if (strict) {
    setTimeout(reset, 1000);
  } else {
    next = false;
    setTimeout(simonSays, 1000);
  }
}


/**
 * First part of animation for win
 */
function winLoop1() {
  setTimeout(function() {
    $("#green").css("box-shadow", "0 0 20px");
    $("#green").css("background-color", "#adffb0");
    $("#red").css("box-shadow", "0 0 20px");
    $("#red").css("background-color", "#ffa5a5");
    $("#yellow").css("box-shadow", "0 0 20px");
    $("#yellow").css("background-color", "#fbffa4");
    $("#blue").css("box-shadow", "0 0 20px");
    $("#blue").css("background-color", "#919aff");
    loopNum++;
    if (loopNum < 6) {
      winLoop2();
    }
  }, 500);
}

/**
 * Second part of animation for win
 */
function winLoop2() {
  setTimeout(function() {
    $("#green").css("box-shadow", "none");
    $("#green").css("background-color", "green");
    $("#red").css("box-shadow", "none");
    $("#red").css("background-color", "red");
    $("#yellow").css("box-shadow", "none");
    $("#yellow").css("background-color", "yellow");
    $("#blue").css("box-shadow", "none");
    $("#blue").css("background-color", "blue");
    loopNum++;
    if (loopNum < 6) {
      winLoop1();
    }
  }, 500);
}


/**
 * Win animation
 */
function win() {
  document.getElementById("winBeep").play();
  winLoop1();
  loopNum = 0;
  setTimeout(reset, 4000);
}


/**
 * Resets game to step 0
 */
function reset() {
  $("#green").css("box-shadow", "none");
  $("#green").css("background-color", "green");
  $("#red").css("box-shadow", "none");
  $("#red").css("background-color", "red");
  $("#yellow").css("box-shadow", "none");
  $("#yellow").css("background-color", "yellow");
  $("#blue").css("box-shadow", "none");
  $("#blue").css("background-color", "blue");
  steps = [];
  currStep = 0;
  next = true;
  $("#counter").html("Steps: 0");
  simonSays();
}


/**
 * Behavior for pressing button in-game
 */
function playButton(num) {
  switch (num) {
    case 1:
      $("#green").css("box-shadow", "0 0 20px");
      $("#green").css("background-color", "#adffb0");
      document.getElementById("greenBeep").play();
      setTimeout(function() {
        $("#green").css("box-shadow", "none");
        $("#green").css("background-color", "green");
      }, 500);

      break;
    case 2:
      $("#red").css("box-shadow", "0 0 20px");
      $("#red").css("background-color", "#ffa5a5");
      document.getElementById("redBeep").play();
      setTimeout(function() {
        $("#red").css("box-shadow", "none");
        $("#red").css("background-color", "red");
      }, 500);

      break;
    case 3:
      $("#yellow").css("box-shadow", "0 0 20px");
      $("#yellow").css("background-color", "#fbffa4");
      document.getElementById("yellowBeep").play();
      setTimeout(function() {
        $("#yellow").css("box-shadow", "none");
        $("#yellow").css("background-color", "yellow");
      }, 500);

      break;
    case 4:
      $("#blue").css("box-shadow", "0 0 20px");
      $("#blue").css("background-color", "#919aff");
      document.getElementById("blueBeep").play();
      setTimeout(function() {
        $("#blue").css("box-shadow", "none");
        $("#blue").css("background-color", "blue");
      }, 500);

      break;
  }
}