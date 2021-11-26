// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

// https://thecodingtrain.com/CodingChallenges/059-steering-text-paths.html
// https://www.fontspace.com/edge-of-the-galaxy-font-f45748

/* This sketch is modified from http://codingtra.in/ coding challenge 59.
 * I have updated it in a few ways.
 */

// 4567890123456785678901234567890123456789012345678901234567890
const width = 600,
  height = 400; /* canvas dimensions */

var font;
var vehicles = [];
var bgColor = "#666";
var message = "NO MESSAGE";

/* Return fontData consisting of font size @ (x, y) for message
 * filling a rectangle of width x height (including half factor
 * margins) in font.
 */
function fontData(message, w = width, h = height, factor = 0.8125, pt = 100) {
  let xs = new Array(),
    ys = new Array(),
    points = font.textToPoints(message, 0, h, pt);
  for (const point of points) {
    xs.push(point.x);
    ys.push(point.y);
  }
  let x = max(...xs),
    y = h - min(...ys);
  let scale = min((w * factor) / x, (h * factor) / y);
  let fontData = {
    size: int(pt * scale),
    x: int((w - x * scale) / 2),
    y: int(h - (h - y * scale) / 2),
  };
  console.log(
    `'${message}' in ${pt}pt is ${int(x)} x ${int(y)} ` +
      `-> ${fontData.size}pt @ (${fontData.x}, ${fontData.y})`
  );
  return fontData;
}

/* Set styles for #sketch* ids. Log iframe style for parent
 * webpage.
 */
function style() {
  center = `
  display: flex;
  justify-content: center;
  align-items: center;`;
  let sketch = select("#sketch");
  sketch.style(`${center} flex-direction: column;`);

  // Calculate and log iframe style.
  let ifw = Math.max(canvas.width) + 20,
    ifh = canvas.height + 20,
    iframe = `  iframe { width: ${ifw}px; height: ${ifh}px; }`;
  console.log(`${iframe}`);
}

/* Add event listener for messages from other frames.
 * This will not work if sketch is hosted on p5.js. p5.js does not allow cross-origin postMessage:
 * "dispatcher.js:35 Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://preview.p5js.org') does not match the recipient window's origin ('https://editor.p5js.org')."
 */
window.addEventListener("message", (event) => {
  // console.log(event);
  console.log(`sketch: ${event.data}`);
  const data = JSON.parse(event.data);
  // NOTE: for when sketch is hosted somewhere other than https://p5js.org/.
  bgColor = `#${data.color}`;
  if (message != data.message) {
    vehicles = [];
    message = data.message;
    setup();
  }
});

function preload() {
  // https://www.fontspace.com/edge-of-the-galaxy-font-f45748
  font = loadFont("EdgeOfTheGalaxyRegular-OVEa6.otf");
  // Get color and message from URI.
  let uri = new URL(window.location.href);
  let bgc = uri.searchParams.get("c");
  let msg = uri.searchParams.get("m");
  // https://stackoverflow.com/a/70070854/17467335
  // NOTE: p5.js now makes it impossible for sketches to parse URI parameters.
  // https://preview.p5js.org/psb_david_petty/present URIs are redirected to
  // https://editor.p5js.org/psb_david_petty/full URIs.
  // Hence, this sketch must be hosted somewhere other than https://p5js.org/.
  let sketch = select("#sketch");
  // Set bgColor and message.
  bgColor = bgc ? `#${bgc}` : bgColor;
  message = msg ? msg.replace(/\+/g, " ") : sketch ? sketch.elt.title : message;
  console.log(`${bgc} ${msg} ${bgColor} '${message}' `);
}

function setup() {
  // Calculate message in font to fill canvas and declare 'vehicles.'
  let data = fontData(message);
  var points = font.textToPoints(message, data.x, data.y, data.size, {
    sampleFactor: 0.25,
  });
  for (const point of points) {
    var vehicle = new Vehicle(point.x, point.y);
    vehicles.push(vehicle);
  }

  /* Setup canvas and style(). */
  canvas = createCanvas(width, height);
  canvas.parent("sketch-canvas");
  canvas.style(`display: block;`);
  style();
}

function draw() {
  background(bgColor);
  for (const v of vehicles) {
    v.behaviors();
    v.update();
    v.show();
  }
}
