/** Automatic creation of query string for 
 * https://github.com/psb-david-petty/p5js/tree/main/2023-2024-bhs-schedule. */
//345678901234567890123456789012345678901234567890123456789012345678901234567890

const URI = `https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/`

function keydown(event) {
  console.log(`keydown: ${event.key} ${event.code} ${event.keyCode}`);
  if (event.key === `Enter` || event.code === `Enter`) {
    console.log(`Enter`);
    return schedule();
    //console.log(event);
  }
}

function keyup(event) {
  console.log(`keyup: ${event.key} ${event.code} ${event.keyCode}`);
  if (event.key === `Space` || event.code === `Space`) {
    console.log(`Space`);
    event.preventDefault();
    //console.log(event);
  }
}

function toggle(event) {
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

function input(event) {
  console.log(`id:${event.target.id} `
    + `checked:${event.target.checked} `
    + `value:"${event.target.value}" `
  );
  checkEnabled(); // Check checkbox input
  update();       // Check text input
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
      //console.log(text.value);
      valkey[text.value] = (valkey[text.value] ?? ``) + `${text.id}=`;
    }
  }
  const keyval = flip(valkey), keys = Object.keys(keyval).sort();
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

function copyURI() {
  const text = uri(), message = `"${text}"`;
  copyToClipboard(text, message);
  return false;  
}

function copyCode() {
  // TODO: figure a way to get the correct width & height
  const text = `<style>
  iframe { width: 1080; height: 1000; }
</style>
<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <iframe src="${uri()}"></iframe>
</div>`, message = `code`;
  copyToClipboard(text, message);
  return false;
}

function update() {
  document.querySelector(`#uri`).innerHTML = `${uri()}`;
}

function schedule() {
  let 
    iframe = document.querySelector(`iframe`),
    cw = (new URL(uri())).searchParams.get(`cw`);
  if (cw) iframe.width = `${cw}`;
  iframe.src = `${uri()}`;
  return false;
}

function initialize() {
  console.log(`Initializing...`);
  // TODO: find out why permissions.query does not work
  // https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/
/*  navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      console.log(`Clipboard write access granted.`);
    }
  });
*/
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
  document.querySelector(`#copyuri`).addEventListener("click", copyURI, false);
  document.querySelector(`#copycode`).addEventListener("click", copyCode, false);
  checkEnabled();
  update();
  return false;
}

function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    /* Resolved - text copied to clipboard successfully */
    console.log(`Copied ${message} to clipboard.`);
    window.alert(`Copied ${message} to clipboard.`);
  },() => {
    console.error('Failed to copy');
    /* Rejected - text failed to copy to the clipboard */
  });
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

// Sample copyCode output.
`
<style>
  iframe { width: 1080; height: 1000; }
</style>
<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <iframe src="https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/"></iframe>
</div>
`