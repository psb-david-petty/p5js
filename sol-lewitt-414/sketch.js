/* After Sol LeWitt Wall Drawing #414
 */
// 4567890123456785678901234567890123456789012345678901234567890
const
  width = 960, height = 210; /* canvas dimensions */
let
  ms = 0, perms = permute([7 * 17, 9 * 17, 11 * 17, 13 * 17]);

// https://stackoverflow.com/a/37580979
function permute(permutation) {
  /* Return all permutations of permutation. */
  var
    length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  /* Shuffle array in place. */
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function block(r, c, colors, tpc=0.5, n = width / 320) {
  /* Draw block at (r, c) position w/ colors. */
  // TODO: lots of assumptions build into this function
  let n2 = n * 2, n10 = n * 10;
  let m = n10, s = n2 + n10 + n + n10 + n2;
  let rs = r * s, cs = c * s;
  let
    [xNW, yNW] = [m + cs + n2, m + rs + n2],
    [xNE, yNE] = [m + cs + n2 + n10 + n, m + rs + n2],
    [xSW, ySW] = [m + cs + n2, m + rs + n2 + n10 + n],
    [xSE, ySE] = [m + cs + n2 + n10 + n, m + rs + n2 + n10 + n];

  strokeWeight(0);
  fill(`rgba(${colors[0]},${colors[0]},${colors[0]},${tpc})`);
  rect(xNW, yNW, n10, n10);
  fill(`rgba(${colors[1]},${colors[1]},${colors[1]},${tpc})`);
  rect(xNE, yNE, n10, n10);
  fill(`rgba(${colors[2]},${colors[2]},${colors[2]},${tpc})`);
  rect(xSW, ySW, n10, n10);
  fill(`rgba(${colors[3]},${colors[3]},${colors[3]},${tpc})`);
  rect(xSE, ySE, n10, n10);
}
function update(permutations=perms) {
  /* Update ms to current time and shuffle perms array.
   */
  ms = millis();
  shuffleArray(permutations);
}

function setup() {
  /* Setup canvas, slider, and update(). */
  select("html").style(`background-color: #fafafa;`);
  canvas = createCanvas(width, height);
  canvas.parent("sketch-canvas");
  canvas.style(`display: block;`);
  slider = createSlider(500, 5000, 5000, 500);
  slider.parent("sketch-slider");
  let sketchStyle = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;`;
  select("#sketch").style(sketchStyle);
  update();
}

function draw() {
  /* Draw block for every permuation of perms. */
  background("#fff");
  let length = perms.length, half = perms.length / 2;
  for (let i = 0; i < length; i++) {
    block(Math.floor(i / half), Math.floor(i % half), perms[i]);
  }
  // Update delta and #sketch-slider-label, check for update.
  delta = slider.value();
  select("#sketch-slider-label").html(`${delta} ms updates`);
  if (millis() > ms + delta) {
    update();
  }
}
