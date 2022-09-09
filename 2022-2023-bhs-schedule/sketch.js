/** Draw the BHS weekly schedule.
 */
// 4567890123456789012345678901234567890123456789012345678901234567890

/* Global variables used in formatting schedule. */
var canvasWidth = 1080, // "CW" query key
  smallFontSize = 16,   // "FS" query key
  largeFontSize = 20,   // set w/ "FS" query
  fontFace = "Arial",   // "FF" query key
  footerLegend = "",    // "LG" query key
  padChar = "\u2007";   // "PD" query key
/* Global constants used in formatting schedule. */
const rev = "V.1C'",
  defaultColor = "#eee",
  oX = 10,
  oY = 10,
  topTime = "7:30",
  bottomTime = "3:00",
  margin = 2,
  dots = 2;
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

/** Return object value keyed by first 3- or 2-characters of block
 * concatenated w/ suffix or defaultValue if neither is defined. All 
 * object keys are 3- or 2-characters and end with suffix. 3-character
 * keys are checked first, then 2-character keys.
 * @param {string} block - block name
 * @param {object} object - object containing block + suffix key
 * @param {string} suffix - last character of all keys of object
 * @param {string} defaultValue - value to return if key undefined
 * @returns {string} object value keyed block + suffix or defaultValue
 */
function getBlock(block, object, suffix, defaultValue) {
  let value3 = object[block.substring(0, 2) + suffix.toUpperCase()];
  if (typeof value3 != "undefined") return value3;
  let value2 = object[block.substring(0, 1) + suffix.toUpperCase()];
  if (typeof value2 != "undefined") return value2;
  return defaultValue;
}

// All classes keys end in "T".
const classes = {
  ZT: "",
  AT: "",
  BT: "",
  CT: "",
  DT: "",
  ET: "",
  FT: "",
  GT: "",
  TT: "",
  XT: "",
  TCT: "",
};

/** Return class associated w/ block or "" if undefined.
 */
function getClass(block) {
  return getBlock(block, classes, "T", "");
}

// All rooms keys end in "R".
const rooms = {
  ZR: "",
  AR: "",
  BR: "",
  CR: "",
  DR: "",
  ER: "",
  FR: "",
  GR: "",
  TR: "",
  XR: "",
  TCR: "",
};

/** Return room associated w/ block or "" if undefined.
 */
function getRoom(block) {
  return getBlock(block, rooms, "R", "");
}

// All lunches keys end in "L".
const lunches = {
  DL: "L2",
  EL: "L2",
  GL: "L2",
};

/** Return lunch associated w/ block or "L2" if undefined.
 */
function getLunch(block) {
  return getBlock(block, lunches, "L", "L2");
}

// All colors keys end in "C".
const colors = {
  ZC: "#ff6", // Z: 255, 255,  84 -> #ff5 / #ff6
  AC: "#c33", // A: 189,  75,  49 -> #b43 / #c33
  BC: "#009", // B:   0,   0, 147 -> #009 / #009
  CC: "#c69", // C: 185, 126, 158 -> #b79 / #c69
  DC: "#f90", // D: 219, 149,  75 -> #d94 / #c93
  EC: "#696", // E: 121, 166,  90 -> #7a5 / #696
  FC: "#69c", // F: 121, 157, 229 -> #79d / #69c
  GC: "#639", // G: 139, 125, 190 -> #87b / #96c
  LC: "#ccc",
  TC: "#ccc",
  XC: "#ccc",
  TCC: "#fff",
};

/** Return color associated w/ block or "#ccc" if undefined. Colors
 * can be X-11 named colors or hexadecimal numbers prefixed by "#".
 */
function getColor(block) {
  let bg = getBlock(block, colors, "C", "#ccc");
  // parseInt for color-names starting w/ [A-F] needs the +("0x" + bg).
  return Number.isNaN(parseInt(+("0x" + bg), 16)) ? bg : "#" + bg;
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

/** Return height of header in pixels. */
function getHeaderHeight() {
  return largeFontSize * 2;
}
/** Return height of footer in pixels. */
function getFooterHeight() {
  return smallFontSize * 2;
}
/** Return width of working schedule in pixels. */
function getHorizontal() {
  return canvasWidth - oX * 2;  // cannot depend on width
}
/** Return height of working schedule in pixels. */
function getVertical() {
  return height - oY * 2 - getHeaderHeight() - getFooterHeight();
}

/** Draw header. Uses globals:
 * schedule, margin, dots, defaultColor, largeFontSize
 */
function drawHeader() {
  let dow = 0;
  const blockWidth = getHorizontal() / Object.keys(schedule).length;
  for (const day in schedule) {
    let textX = oX + dow * blockWidth + margin * dots * 1,
      textY = oY + getHeaderHeight() / 2 - largeFontSize / 2,
      textWidth = blockWidth - margin * dots * 2,
      textHeight = getHeaderHeight() * 2 /* small fonts */ - margin * dots * 2;
    //console.log(`${textX} ${textY} ${textWidth} ${textHeight}`)
    // Wipe out text.
    noStroke();
    fill(defaultColor);
    rect(textX, textY, textWidth, textHeight);
    // Repaint text.
    fill("black");
    textSize(largeFontSize);
    textStyle(BOLD);
    textAlign(CENTER);
    text(day, textX, textY, textWidth, textHeight);
    dow += 1;
  }
}

/** Draw footer. Uses globals:
 * margin, dots, footerLegend, rev, defaultColor, smallFontSize
 */
function drawFooter() {
  const textX = oX + margin * dots * 1,
    textY = oY + getHeaderHeight() + getVertical() + margin * dots * 1,
    textWidth = getHorizontal() + margin * dots * 1,
    textHeight = getFooterHeight(),
    legendLabel = [footerLegend, rev, ].filter(Boolean).join(" \u2014 ");
    //console.log(`${legendLabel} ${textX} ${textY} ${textWidth} ${textHeight} ${height}`)
    // Wipe out text.
    noStroke();
    fill(defaultColor);
    rect(textX, textY, textWidth, textHeight);
    // Repaint text.
    fill("black");
    textSize(smallFontSize);
    textStyle(BOLD);
  textAlign(RIGHT);
  text(legendLabel, textX, textY + (getFooterHeight() - smallFontSize) / 2, textWidth, textHeight);
}

/** Return true if b is a shorter (lunch) block, false otherwise.
 * TODO: did include L, T, or X, but now is only L
 * @returns {boolean} true if b is a shorter (lunch) block, false otherwise
 */
const isShortBlock = (b) => b.startsWith("L") /* || b.length == 1 */;

/** Draw rectangle associated w/ block w/ name and room at horizontal 
 * size and position of dow and vertical size and position of start 
 * and stop. Uses globals:
 * schedule, topTime, margin, dots, padChar, largeFontSize, smallFontSize
 */
function rectangle(block, dow, start, stop, name, room) {
  // Calculate block rectangle parameters and render it.
  let bg = getColor(block);
  stroke(0);
  fill(bg);
  let blockX = oX + (dow * getHorizontal()) / Object.keys(schedule).length,
    blockY = oY + getHeaderHeight() + difference(topTime, start) * dots,
    blockWidth = getHorizontal() / Object.keys(schedule).length,
    blockHeight = difference(start, stop) * dots;
  rect(blockX, blockY, blockWidth, blockHeight);

  // Calculate text parameters for UL & UR and render it.
  fill(fgColor(bg));
  let textX = blockX + margin * dots * 1,
    textY = blockY + margin * dots * 1,
    textWidth = blockWidth - margin * dots * 1, // TODO: shoud be 2
    textHeight = blockHeight - margin * dots * 2;
  let ulLabel = `${block.padEnd(2, " ")}: `,
    urLabel = `${start.padStart(5, padChar)} \u2014 ${stop.padStart(5, padChar)}`;
  textSize(largeFontSize);
  textAlign(LEFT);
  text(ulLabel, textX, textY, textWidth, textHeight);
  textAlign(RIGHT);
  text(urLabel, textX, textY, textWidth, textHeight);

  // Calculate text parameters for middle and render it.
  let middleLabel = isShortBlock(block) ? "" : `${name}`;
  textSize(smallFontSize);
  textAlign(LEFT);
  text(middleLabel, textX, textY + blockHeight / 2 - smallFontSize / 2, textWidth, textHeight);

  // Calculate text parameters for LL & LR and render it.
  let llLabel = isShortBlock(block) ? `${name}` : `${room}`,
    lrLabel = `[${difference(start, stop)}]`;
  textSize(smallFontSize);
  textAlign(LEFT);
  text(llLabel, textX, textY + textHeight - smallFontSize, textWidth, textHeight);
  textAlign(RIGHT);
  text(lrLabel, textX, textY + textHeight - smallFontSize, textWidth, textHeight);
}

/** Draw schedule rectangles for every (DoW) entry in schedule.
 * Uses globals:
 * schedule
 */
function week() {
  let dow = 0;
  for (const day in schedule) {
    const blocks = schedule[day];
    //console.log(`${day}: ${blocks}`);
    for (const block in blocks) {
      const times = blocks[block];
      //console.log(`${block}: ${times}`);
      for (const time in times) {
        //console.log(`${time}: ${times[time]}`);
      }
      let start = times.start,
        stop = times.stop;
      if (typeof start == "undefined" && typeof stop == "undefined") {
        // Render lunch block.
        lunch = getLunch(block);
        start = times[lunch].start;
        stop = times[lunch].stop;
        lunchStart = times[lunch].lunch;
        lunchStop = times[lunch].class;
        rectangle(lunch, dow, lunchStart, lunchStop, "Lunch", "");
      }
      // Render class block.
      //console.log(`${block} ${start} ${stop} [${difference(start, stop)}] `
      //  + `${dow} "${getClass(block)}" "${getRoom(block)}"`);
      rectangle(block, dow, start, stop, getClass(block), getRoom(block));
    }
    dow += 1;
  }
}

/** p5.js draw function renders sketch.
 */
function draw() {
  // Draw after 0.25s.
  if (frameCount > 5) {
    drawHeader();
    week();
    drawFooter();
  }
}

/** Update global variables based on name and property. Globals used:
 * classes, rooms, lunches, colors, canvasWidth, smallFontSize, fontFace,
 * footerLegend, padChar
 * @param {string} name - property name
 * @param {string} property - property value
 */
function update(name, property) {
  let n = name.toUpperCase(),
    nl = name.toUpperCase().length,
    p = property.replace(/[+]/g, " ");
  // Add to classes.
  if ((nl == 2 || nl == 3) && n.charAt(nl - 1) == "T") classes[n] = p;
  // Add to rooms.
  if ((nl == 2 || nl == 3) && n.charAt(nl - 1) == "R") rooms[n] = p;
  // Add to lunches.
  if ((nl == 2 || nl == 3) && n.charAt(nl - 1) == "L") lunches[n] = normalizeLunch(p);
  // Add to colors.
  if ((nl == 2 || nl == 3) && n.charAt(nl - 1) == "C") colors[n] = p;
  // Handle special search properties.
  if (n == "CW") canvasWidth = +p;
  if (n == "FS") smallFontSize = +p;
  if (n == "FF") fontFace = p;
  if (n == "LG") footerLegend = p;
  if (n == "PD") padChar = p;
  if (n == "LN") {                    // for backward compatibility
    lunch = normalizeLunch(p);
    for (const key of ["DL", "EL", "GL", ]) {
      lunches[key] = lunch;
    }
  }
}

/** Return font size based on width of a block.
 * @returns {number} font size based on width of a block
 */
function getLargeFontSize() {
  const fudge = 0.90,
    sample = `M1: 11:22 \u2014 12:34`,
    blockWidth = getHorizontal() / Object.keys(schedule).length,
    textWidth = getTextSize(sample, `${smallFontSize}px ${fontFace}`).width;
  //console.log(`${smallFontSize} -> ${Math.floor(smallFontSize * blockWidth / textWidth * fudge)}`);
  return Math.floor(smallFontSize * blockWidth / textWidth * fudge);
}

/** Return rectangle object w/ width and height of txt rendered in font.
 * https://stackoverflow.com/questions/31305071/measuring-text-width-height-without-rendering
 * @param {string} txt - text to measure
 * @param {string} font - font name in 'Arial 12px' format
 * @return {object} object w/ width and height of txt rendered in font
 */
function getTextSize(txt, font) {
    let element = document.createElement('canvas');
    let context = element.getContext('2d');
    context.font = font;
    let txtSize = {
      'width': context.measureText(txt).width, 
      'height': parseInt(context.font),
    };
    return txtSize;
}

/** Return l normalized to a valid schedule key: "L1" or "L2". 
 * The default value (if lunch is malformed) is "L2". 
 * @returns {string} normalized lunch to a valid schedule key.
 */
function normalizeLunch(l) {
  const lunches1 = [ "C2", "c2", "L1", "l1", "1", ]
    lunch1 = "L1",
    lunch2 = "L2";
    if (lunches1.includes(l)) return lunch1;
    else return lunch2;
}

/** Parse URI to set global variables. Multiple keys can be set with 
 * the same property. For example "ar=br=cr=dr=er=UA-33"
 */
function parseURI() {
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

  // Update largeFontSize and then smallFontSize to be no bigger.
  largeFontSize = getLargeFontSize();
  smallFontSize = Math.min(smallFontSize, largeFontSize);
  console.log(`smallFontSize=${smallFontSize}; largeFontSize=${largeFontSize}`);
}

// https://web.dev/local-fonts/
// TODO: not used
async function checkFonts() {
  if ('queryLocalFonts' in window) {
    // The Local Font Access API is supported
    // Query for all available fonts and log metadata.
    try {
      const availableFonts = await window.queryLocalFonts();
      for (const fontData of availableFonts) {
        console.log(fontData.postscriptName);
        console.log(fontData.fullName);
        console.log(fontData.family);
        console.log(fontData.style);
      }
    } catch (err) {
      console.error(err.name, err.message);
    }
  }
}

/** Return sRGB gamma-corrected value of one color component rgb.
 * @param {number} rgb - one color component on [0, 1]
 * @returns {number} gamma-corrected value of rgb color component
 */
function srgb(rgb) {
  // https://www.w3.org/Graphics/Color/sRGB.html
  const th = 0.03928, div = 12.92, eps = 0.055, exp = 2.4;
  return rgb <= th ? rgb / div : ((rgb + eps) / (1 + eps)) ** exp;
}

/** Return luminance value for color c.
 * @param {color} c - p5.js color for which to calculate luminance
 * @returns {number} luminance value for color c
 */
function luminance(c) {
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const rFactor = 0.2126, gFactor = 0.7152, bFactor = 0.0722;
  const r = red(c) / 255,
    g = green(c) / 255,
    b = blue(c) / 255;
  return rFactor * srgb(r) + gFactor * srgb(g) + bFactor * srgb(b);
}

/** Return contrast ratio between light and dark.
 * @param {color} light - p5.js lighter color
 * @param {color} dark - p5.js darker color
 * @returns {number} contrast ratio between light and dark
 */
function contrastRatio(light, dark) {
  // https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156
  const eps = 0.05;
  return (luminance(light) + eps) / (luminance(dark) + eps);
}

/** Return color('black') or color('white'), whichever has a larger
 * contrast ratio with p5.js color c.
 * @param {color} c - p5.js color to calculate contrast ratio
 * @returns {color} highest contrast-ratio p5.js color to c
 */
function fgColor(c) {
  const blackColor = color('black'), whiteColor = color('white');
  const ratio2Black = contrastRatio(c, blackColor),
    ratio2White = contrastRatio(whiteColor, c);
  return ratio2Black > ratio2White ? blackColor : whiteColor;
}

/** p5.js setup function initializes sketch.
 */
function setup() {
  parseURI();
  // Setup canvas.
  let horizontal = canvasWidth;
  let vertical =
    difference(topTime, bottomTime) * dots + oY * 2 
    + getHeaderHeight() + getFooterHeight();
  let dim = `iframe { width: ${horizontal}px; height: ${vertical}px; }`;
  console.log(dim);
  let canvas = createCanvas(horizontal, vertical);
  background(defaultColor);
  textFont(fontFace, smallFontSize);
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
