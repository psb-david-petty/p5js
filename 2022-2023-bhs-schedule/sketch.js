/** Draw the BHS weekly schedule.
 */
// 4567890123456789012345678901234567890123456789012345678901234567890
const rev = "V.1C'",
  oX = 10,
  oY = 10,
  topTime = "7:30",
  bottomTime = "3:00",
  margin = 2,
  dots = 2;
var lunchNumber = 2,
  canvasWidth = 1080,
  fontSize = 16;
const schedule = {
  Monday: {
    Z1: { start: "7:30", stop: "8:14" },
    A1: { start: "8:20", stop: "9:15" },
    B1: { start: "9:22", stop: "10:17" },
    C1: { start: "10:24", stop: "11:19" },
    E1: {
      L1: { lunch: "11:22", class: "11:52", start: "11:56", stop: "12:51" },
      L2: { start: "11:26", stop: "12:21", lunch: "12:24", class: "12:54" },
    },
    F1: { start: "12:58", stop: "1:53" },
    G1: { start: "2:00", stop: "2:55" },
  },
  Tuesday: {
    Z2: { start: "7:30", stop: "8:14" },
    A2: { start: "8:20", stop: "9:15" },
    B2: { start: "9:22", stop: "10:17" },
    C2: { start: "10:24", stop: "11:19" },
    D1: {
      L1: { lunch: "11:22", class: "11:52", start: "11:56", stop: "12:51" },
      L2: { start: "11:26", stop: "12:21", lunch: "12:24", class: "12:54" },
    },
    F2: { start: "12:58", stop: "1:53" },
    G2: { start: "2:00", stop: "2:55" },
  },
  Wednesday: {
    Z3: { start: "7:30", stop: "8:14" },
    A3: { start: "8:20", stop: "9:15" },
    T: { start: "9:20", stop: "9:57" },
    C3: { start: "10:03", stop: "10:58" },
    X: { start: "11:05", stop: "11:42" },
    D2: {
      L1: { lunch: "11:45", class: "12:15", start: "12:19", stop: "1:14" },
      L2: { start: "11:49", stop: "12:44", lunch: "12:47", class: "1:17" },
    },
    E2: { start: "1:21", stop: "2:16" },
    TC: { start: "2:20", stop: "3:00" },
  },
  Thursday: {
    Z4: { start: "7:30", stop: "8:14" },
    A4: { start: "8:20", stop: "9:15" },
    B3: { start: "9:22", stop: "10:17" },
    D3: { start: "10:24", stop: "11:19" },
    G3: {
      L1: { lunch: "11:22", class: "11:52", start: "11:56", stop: "12:51" },
      L2: { start: "11:26", stop: "12:21", lunch: "12:24", class: "12:54" },
    },
    E3: { start: "12:58", stop: "1:53" },
    F3: { start: "2:00", stop: "2:55" },
  },
  Friday: {
    Z5: { start: "7:30", stop: "8:14" },
    B4: { start: "8:20", stop: "9:15" },
    C4: { start: "9:22", stop: "10:17" },
    D4: { start: "10:24", stop: "11:19" },
    E4: {
      L1: { lunch: "11:22", class: "11:52", start: "11:56", stop: "12:51" },
      L2: { start: "11:26", stop: "12:21", lunch: "12:24", class: "12:54" },
    },
    G4: { start: "12:58", stop: "1:53" },
    F4: { start: "2:00", stop: "2:55" },
  },
};

function getBlock(block, object, suffix, defaultValue) {
  let blockKey = block.toLowerCase().charAt(0) + suffix;
  if (typeof object[blockKey] == "undefined") return defaultValue;
  return object[blockKey];
}

var colors = {
  zc: "#ff6", // Z: 255, 255, 84 -> #ff5 / #ff6
  ac: "#c33", // A: 189, 75, 49 -> #b43 / #c33
  bc: "#009", // B: 0, 0, 147 -> #009 / #009
  cc: "#c69", // C: 185, 126, 158 -> #b79 / #c69
  dc: "#f90", // D: 219, 149, 75 -> #d94 / #c93
  ec: "#696", // E: 121, 166, 90 -> #7a5 / #696
  fc: "#69c", // F: 121, 157, 229 -> #79d / #69c
  gc: "#639", // G: 139, 125, 190 -> #87b / #96c
  lc: "#ccc",
  tc: "#ccc",
  xc: "#ccc",
  tcc: "#fff",
};

function getBackground(block) {
  // Handle special 'TC' block (because 'C' and T' blocks already exist).
  if (str(block).toLowerCase() == "tc") return colors["tcc"];
  // Handle numerical color.
  let bg = getBlock(block, colors, "c", "#ccc");
  // TODO: parseInt for some colors needs the +bg to return true
  return Number.isNaN(parseInt(+("0x" + bg), 16)) ? bg : "#" + bg;
}

var classes = {
  zt: "",
  at: "",
  bt: "",
  ct: "",
  dt: "",
  et: "",
  ft: "",
  gt: "",
  tt: "",
  xt: "",
};

function getClass(block) {
  return getBlock(block, classes, "t", "");
}

var rooms = {
  zr: "",
  ar: "",
  br: "",
  cr: "",
  dr: "",
  er: "",
  fr: "",
  gr: "",
  tr: "",
  xr: "",
};

function getRoom(block) {
  return getBlock(block, rooms, "r", "");
}

/** Return duration in minutes from start to stop.
 * @param {string} start - Start time in 12-hour format
 * @param {string} stop - Stop time in 12-hour format
 * @returns {number} Duration in minutes from start to stop
 */
function difference(start, stop) {
  const earliest = 7;
  let startHours, startMins, stopHours, stopMins;
  [startHours, startMins] = start.split(":").map((n) => int(n));
  [stopHours, stopMins] = stop.split(":").map((n) => int(n));
  startHours += startHours < earliest ? 12 : 0;
  stopHours += stopHours < earliest ? 12 : 0;
  //console.log(`${start} -> ${startHours} ${stop} -> ${stopHours} `)
  let startDate = new Date(0, 0, 0, startHours, startMins, 0);
  let stopDate = new Date(0, 0, 0, stopHours, stopMins, 0);
  let diff = stopDate.getTime() - startDate.getTime();
  let minutes = Math.floor(diff / 1000 / 60);
  return minutes;
}

function headerHeight() {
  return fontSize * 2;
}
function getHorizontal() {
  return width - oX * 2;
}
function getVertical() {
  return height - oY * 2 - headerHeight();
}

function drawHeader() {
  let dow = 0;
  const blockWidth = getHorizontal() / Object.keys(schedule).length;
  for (const day in schedule) {
    let textX = oX + dow * blockWidth + margin * dots * 1,
      textY = oY + margin * dots * 1,
      textWidth = blockWidth - margin * dots * 2,
      textHeight = headerHeight() * 2 /* small fonts */ - margin * dots * 2;
    // Wipe out text.
    noStroke();
    fill("#eee");
    rect(textX, textY, textWidth, textHeight);
    // Repaint text.
    fill("#000");
    textSize((fontSize * 9) / 8);
    textAlign(CENTER);
    text(day, textX, textY, textWidth, textHeight);
    dow += 1;
    if (dow == Object.keys(schedule).length) {
      textAlign(RIGHT);
      text(rev, textX, textY, textWidth, textHeight);
    }
  }
}

function rectangle(block, start, stop, dow, name, room) {
  // Calculate block rectangle parameters.
  let bg = getBackground(block);
  stroke(0);
  fill(bg);
  let blockX = oX + (dow * getHorizontal()) / Object.keys(schedule).length,
    blockY = oY + headerHeight() + difference(topTime, start) * dots,
    blockWidth = getHorizontal() / Object.keys(schedule).length,
    blockHeight = difference(start, stop) * dots;
  rect(blockX, blockY, blockWidth, blockHeight);
  // Calcualte text block parameters.
  const at = 105,
    bt = 204; // thresholds for colors
  let average = (red(bg) + green(bg) + blue(bg)) / 3;
  let bright = red(bg) > bt || green(bg) > bt || blue(bg) > bt;
  let fg = average < at ? "#fff" : "#000";
  fill(fg);
  let leftLabel =
      `${block.padEnd(2, " ")}: ` +
      `${start.padStart(5, " ")}-${stop.padStart(5, " ")}` +
      `\n\n${name}`,
    rightLabel = `[${difference(start, stop)}]` + `\n${room}`;
  let textX = blockX + margin * dots * 1,
    textY = blockY + margin * dots * 1,
    textWidth = blockWidth - margin * dots * 2,
    textHeight = blockHeight - margin * dots * 2;
  textSize(fontSize);
  textAlign(LEFT);
  text(leftLabel, textX, textY, textWidth, textHeight);
  textAlign(RIGHT);
  text(rightLabel, textX, textY, textWidth, textHeight);
}

function week(lunch) {
  let dow = 0;
  for (const day in schedule) {
    let blocks = schedule[day];
    //console.log(`${day}: ${blocks}`);
    for (const block in blocks) {
      let times = blocks[block];
      //console.log(`${block}: ${times}`);
      for (const time in times) {
        //console.log(`${time}: ${times[time]}`);
      }
      let start = times.start,
        stop = times.stop;
      if (typeof start == "undefined" && typeof stop == "undefined") {
        start = times[lunch].start;
        stop = times[lunch].stop;
        lunchStart = times[lunch].lunch;
        lunchStop = times[lunch]["class"];
        rectangle(lunch, lunchStart, lunchStop, dow, "LUNCH", "");
      }
      //console.log(`${start} ${stop} ${difference(start, stop)}`);
      rectangle(block, start, stop, dow, getClass(block), getRoom(block));
    }
    dow += 1;
  }
}

function update(name, property) {
  let n = name.toLowerCase(),
    p = property.replace(/[+]/g, " ");
  // Add to colors.
  if (n.length == 2 && n.charAt(1) == "c") colors[n] = p;
  // Add to classes.
  if (n.length == 2 && n.charAt(1) == "t") classes[n] = p;
  // Add to rooms.
  if (n.length == 2 && n.charAt(1) == "r") rooms[n] = p;
  // Handle special search properties.
  if (n == "ln") lunchNumber = p;
  if (n == "fs") fontSize = +p;
  if (n == "cw") canvasWidth = +p;
}

function setup() {
  // Parse URI search parameters.
  const uri = new URL(window.location.href);
  const params = new URLSearchParams(uri.search);
  for (let [key, value] of params.entries()) {
    console.log(`P:${key} : ${value}`);
    let values = value.split("=");
    let prop = values[values.length - 1];
    console.log(`O:${key} : ${prop}`);
    update(key, prop);
    for (key of values.slice(0, -1)) {
      console.log(`M:${key} : ${prop}`);
      update(key, prop);
    }
  }

  // Setup canvas.
  let horizontal = canvasWidth;
  let vertical =
    difference(topTime, bottomTime) * dots + oY * 2 + headerHeight();
  let dim = `iframe { width: ${horizontal}px; height: ${vertical}px; border: none; }`;
  console.log(dim);
  let canvas = createCanvas(horizontal, vertical);
  background("#eee");
  textFont("Inconsolata", fontSize);
  frameRate(20);

  // Setup styles.
  canvas.parent("sketch-canvas");
  canvas.style(`display: block;`);
  let center = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`;
  let sketch = select("#sketch");
  sketch.style(`${center}`);
}

function draw() {
  // Draw after 0.25s.
  if (frameCount > 5) {
    drawHeader();
    let lunch = "L" + lunchNumber;
    if (isNaN(+lunchNumber)) lunch = lunchNumber.toUpperCase();
    week(lunch);
  }
}
