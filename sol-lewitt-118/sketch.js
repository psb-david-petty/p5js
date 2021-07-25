/* After Sol LeWitt Wall Drawing #118
 * "On a wall surface, any
 * continuous stretch of wall,
 * using a hard pencil, place
 * fifty points at random.
 * The points should be evenly
 * distributed over the area
 * of the wall. All of the
 * points should be connected
 * by straight lines."
 */
// 4567890123456785678901234567890123456789012345678901234567890
const
  number = 50,                /* points */
  percent = 90,               /* drawing area */
  width = 800, height = 400;  /* canvas dimensions */
let
  ms = 0, points = Array(),
  delta, slider;

function update(num=number) {
  /* Update ms to current time and points to new array of num random
   * coordinates.
   */
  ms = millis();
  points = Array();
  for (let i = 0; i < num; i++) {
    let rx = Math.floor(Math.random() * width * percent / 100);
    let ry = Math.floor(Math.random() * height * percent / 100);
    points.push([rx, ry, ]);
  }
}

function margin(dim, per=percent) {
  /* Return half of (100 - per) % of dim for a margin */
  return Math.round(dim * (100 - per) / 100 / 2);
}

function setup() {
  /* Setup canvas, slider, and update(). */
  // https://github.com/processing/p5.js/wiki/Positioning-your-canvas
  canvas = createCanvas(width, height);
  canvas.parent('sketch-canvas')
  canvas.style(`display: block;`)
  //console.log(canvas.position(0, 0));
  slider = createSlider(500, 5000, 5000, 500);
  slider.parent('sketch-slider');
  let sketchStyle = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;`;
  select('#sketch').style(sketchStyle);
  update();
}

function draw() {
  /* Draw one line between every point and every other point. */
  background('#fbffe8');
  stroke('#333');
  strokeWeight(0.25);
  let mx = margin(width), my = margin(height);
  for (let i = 0; i < points.length - 1; i++) {
    let [x1, y1] = points[i];
    for (let j = i + 1; j < points.length; j++) {
      let [x2,y2] = points[j];
      line(x1 + mx, y1 + my, x2 + mx, y2 + my);
      // console.log(`${i} ${j} ${x1} ${y1} ${x2} ${y2}`);
    }
  }
  // Update delta and #sketch-slider-label, check for update.
  delta = slider.value();
  select('#sketch-slider-label').html(`${delta} ms updates`);
  if (millis() > ms + delta) {
    update();
  }
}
