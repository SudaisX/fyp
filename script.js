let handsfree;
let webcam;
let eyeBlinkHistory = [];
let x_position; // Defining x_position globally of webgazer
let y_position; // Defining y_position globally of webgazer
let isGazePaused = false;
let pausedPosition = { x: null, y: null };
let pauseDuration = 3000; // how long to "pause" the gaze dot, in milliseconds
const historyLen = 320;
let runningAvg = 0;
let blinkActivation = 0;
blink = false;

function setup() {
  eyeBlinkHistory = new Array(historyLen).fill(0.1); // Initialize with a guess

  handsfree = new Handsfree({
    showDebug: false, // Shows or hides the camera feed
    hands: false,
    pose: false,
    facemesh: true,
  });
  handsfree.start();
}

function pauseWebGazer() {
  webgazer.pause(); // This will pause the WebGazer tracking
  console.log("WebGazer tracking has been paused.");
}

function resumeWebGazer() {
  webgazer.resume(); // This will resume the WebGazer tracking
  console.log("WebGazer tracking has been resumed.");
}

const pointerBuffer = []; // Buffer to hold the last N gaze points
const bufferSize = 5; // Size of the buffer, more points for smoother movement

function addGazePoint(x, y) {
  // Add the new point to the buffer
  pointerBuffer.push({ x, y });

  // If we have exceeded the buffer size, remove the oldest point
  if (pointerBuffer.length > bufferSize) {
    pointerBuffer.shift();
  }
}

function getSmoothedGazePoint() {
  // Calculate the average of the points in the buffer
  const sum = pointerBuffer.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  const count = pointerBuffer.length;
  return {
    x: sum.x / count,
    y: sum.y / count,
  };
}

const smoothedPoint = getSmoothedGazePoint();
// Use smoothedPoint.x and smoothedPoint.y for gaze interaction

// webgazer.setGazeListener(function(data, elapsedTime) {
//     if (data) {
//         x_position=data.x;
//         y_position=data.y;
//     }

//   }).begin();

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".eye-select");

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    // Coordinates of the button's corners
    const topLeft = { x: rect.left, y: rect.top };
    const topRight = { x: rect.right, y: rect.top };
    const bottomLeft = { x: rect.left, y: rect.bottom };
    const bottomRight = { x: rect.right, y: rect.bottom };

    console.log(`Card ${index + 1} Corners:`);
    console.log("Top Left:", topLeft);
    console.log("Top Right:", topRight);
    console.log("Bottom Left:", bottomLeft);
    console.log("Bottom Right:", bottomRight);
  });
});

function checkGazeWithinButtons() {
  const cards = document.querySelectorAll(".eye-select");
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    // Check if the current gaze position is within this button's bounds
    if (x_position >= rect.left && x_position <= rect.right && y_position >= rect.top && y_position <= rect.bottom) {
      console.log(`Gaze is on Button ${index + 1} during blink`);
      isGazePaused = true;
      pauseWebGazer();
      // blink=true;
      blink = false;
      if ((blink = true)) {
        // pauseWebGazer();
        isGazePaused = true;
        card.click();
        blink = false;
        // resumeWebGazer();
        isGazePaused = false;
      }

      // pausedPosition = { x: rect.left, y: rect.top };

      // After a set duration, unpause the gaze
      setTimeout(() => {
        resumeWebGazer();
      }, pauseDuration);
      isGazePaused = false;
    }
  });
}

webgazer
  .setGazeListener(function (data, elapsedTime) {
    if (data) {
      if (!isGazePaused) {
        x_position = data.x;
        y_position = data.y;
      }
      //  else {
      //     // If the gaze is paused, set the position to the paused coordinates
      //     x_position = pausedPosition.x;
      //     y_position = pausedPosition.y;
      // }
    }
  })
  .begin();

// function draw() {
//     background('white');
//     // setup_handsfree();
//     // setup_webgazer();
//     detectBlinking();
// }

function draw() {
  // Assuming you're using p5.js to draw
  // First, clear the previous frame
  // clear(); // Or use background() if you want a background color

  // Draw the red dot at the gaze position
  // fill(255, 0, 0); // Red color
  // noStroke();
  // ellipse(x_position, y_position, 20, 20); // Draw the red dot
  detectBlinking();
}

function detectBlinking() {
  if (handsfree.data.facemesh && handsfree.data.facemesh.multiFaceLandmarks) {
    let faceLandmarks = handsfree.data.facemesh.multiFaceLandmarks[0]; // Assuming single face detection
    // blink=false
    // Measure the openness of the eyes using specific landmark distances
    let eyeBlinkMeasurementPairs = [
      [159, 145],
      [386, 374],
    ]; // Upper and lower eyelid pairs for both eyes
    let measurement = 0;
    eyeBlinkMeasurementPairs.forEach((pair) => {
      let pa = faceLandmarks[pair[0]];
      let pb = faceLandmarks[pair[1]];
      measurement += dist(pa.x, pa.y, pb.x, pb.y);
    });

    // Update blink history
    eyeBlinkHistory.push(measurement);
    eyeBlinkHistory.shift(); // Remove the oldest measurement

    // Update running average and standard deviation
    runningAvg = 0.95 * runningAvg + 0.05 * measurement;
    let stdDev = sqrt(eyeBlinkHistory.reduce((acc, val) => acc + (val - runningAvg) ** 2, 0) / historyLen);

    // Detect blink by checking if current measurement falls below a threshold
    let threshold = runningAvg - stdDev; // Adjust this threshold as needed
    if (eyeBlinkHistory[historyLen - 1] < threshold && eyeBlinkHistory[historyLen - 2] >= threshold) {
      blink = true;
      checkGazeWithinButtons();

      // blinkCount++; // Increment blink counter
      console.log("Blink detected!");
    }
  }
}
