var steps = [];
var strict = false;
var next = true;
var currStep = 0;
var player = false;
var loopNum = 0;
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

function wrong() {
  /*
  WRITE WRONG ANIMATION HERE
  */
  console.log("wrong");
  document.getElementById("wrongBeep").play();
  if (strict) {
    setTimeout(reset, 1000);
  } else {
    next = false;
    setTimeout(simonSays, 1000);
  }
}

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

function win() {
  document.getElementById("winBeep").play();
  winLoop1();
  loopNum = 0;
  setTimeout(reset, 4000);
}

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