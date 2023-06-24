/** Automatic creation of query string for 
 * https://github.com/psb-david-petty/p5js/tree/main/2023-2024-bhs-schedule. */
//345678901234567890123456789012345678901234567890123456789012345678901234567890

const URI = `https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/`

function input(event) {
  console.log(`id:${event.target.id} `
    + `checked:${event.target.checked} `
    + `value:"${event.target.value}" `
  );
  checkEnabled();
  update();
  //console.log(event);
}

function checkEnabled() {
  for (const box of document.querySelectorAll(`.checkbox`)) {
    //console.log(`.text[id^='${box.id}']`);  // wildcard selector
    for (const suffix of `trcl`) {
      for (const text of document.querySelectorAll(`#${box.id}${suffix}`)) {
        let
          not_lunch = !/l$/i.test(text.id), 
          valid_lunch_block = /^[deg]/i.test(text.id);
        text.disabled = !(box.checked 
          && (not_lunch || valid_lunch_block));
        if (text.disabled) text.value = ``;
      }
    }
  }
}

function keydown(event) {
  console.log(`keydown: ${event.key} ${event.code} ${event.keyCode}`);
  if (event.key === `Enter` || event.code === `Enter`) {
    console.log(`ENTER`);
    return schedule();
    //console.log(event);
  }
}

function keyup(event) {
  console.log(`keyup: ${event.key} ${event.code} ${event.keyCode}`);
  if (event.key === `Space` || event.code === `Space`) {
    console.log(`SPACE`);
    event.preventDefault();
    //console.log(event);
  }
}

function toggle(event) {
  //console.log(`toggle: ${event.key} ${event.code} ${event.keyCode}`);
  checkToggle();
  //console.log(event);
}

function checkToggle() {
  for (const details of document.querySelectorAll(`details`)) {
    //console.log(`class:${details.className} toggle:${details.open}`)
    let selector = `.checkbox[id^='${details.className}']`;  // wildcard selector
    for (const box of document.querySelectorAll(selector)) {
      let opened = details.open;
      if (box.id !== details.className) {
        //console.log(box.id);
        opened |= box.checked;
      }
      details.open = opened;
    }
  }
}

// https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript
const flip = (data) => Object.fromEntries(
  Object
    .entries(data)
    .map(([key, value]) => [value, key])
  );

function uri() {
  const valkey = new Object();
  for (const text of document.querySelectorAll(`.text`)) {
    if (text.value) {
      console.log(text.value);
      valkey[text.value] = (valkey[text.value] ?? ``) + `${text.id}=`;
    }
  }
  const keyval = flip(valkey), keys = Object.keys(keyval);
  //console.log(valkey, keyval, keys);
  let query = ``;
  for (const key of keys) {
    query = `${query}&${key}${
      keyval[key]
        .replace(/=/g, '\uFF1D')  // replace '='
        .replace(/\+/g, '\uFF0B') // replace '+'
        .replace(/ /g, '+')}`;    // replace ' '
  }
  let result = new DOMParser()
    .parseFromString(query, "text/html").documentElement.textContent;
  result = result 
    ? encodeURI(`${URI}${result.replace(/&/, '?')}`)
    : `${URI}`;
  console.log(`${result}`);
  return result;
}

function update() {
  document.querySelector(`#uri`).innerHTML = `${uri()}`;
}

function schedule() {
  let iframe = document.querySelector(`iframe`);
  for (const [key, value] of (new URLSearchParams(uri())).entries()) {
    console.log(`${key} ${value}`);
    if (key === `cw`) iframe.width = `${value}px`;
  }
  iframe.src = `${uri()}`;
  return false;
}

function initialize() {
  console.log(`INITIALIZING...`);
  for (const box of document.querySelectorAll(`.checkbox`)) {
    box.addEventListener(`change`, input);
  }
  for (const text of document.querySelectorAll(`.text`)) {
    text.addEventListener(`input`, input);
    text.addEventListener(`keydown`, keydown);
    text.addEventListener(`keyup`, keyup);
  }
  for (const details of document.querySelectorAll(`details`)) {
    details.addEventListener(`toggle`, toggle);
  }
  checkEnabled();
  update();
  return false;
}

// http://onwebdevelopment.blogspot.com/2008/07/chaining-functions-in-javascript.html
const chain = function(args) {
  return function() {
    for(var i = 0; i < args.length; i++) {
      args[i]();
    }
  }
};
window.addLoad = function(fn) {
  window.onload = typeof(window.onload) != 'function' 
    ? fn : window.onload.chain([fn]);
};

window.addLoad(initialize);
