/** Automatic creation of query string for 
 * https://github.com/psb-david-petty/p5js/tree/main/2023-2024-bhs-schedule. */
//345678901234567890123456789012345678901234567890123456789012345678901234567890

const URI = `https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/`

/*
 * EventListeners
 */

/** EventListener for change. sheckEnabled() every time checkbox is
 * clicked.
 * @param {Event} event - change event
 */
function change(event) {
  console.log(`change: `
    + `id:${event.target.id} `
    + `checked:${event.target.checked} `
  );
  checkEnabled();
}

/** EventListener for toggle. checkToggle() every time a <details> 
 * disclosure widget is clicked. Toggling cannot be prevented, but open
 * property of <details> elements can be set to prevent toggling closed.
 * @param {Event} event - toggle event
 */
function toggle(event) {
  console.log(`toggle: `
    + `class:${event.target.className} `
    + `open:${event.target.open} `
    );
  checkToggle();
  //console.log(event);
}

/** EventListener for keydown. When key is 'Enter', update schedule.
 * @param {Event} event - keydown event
 * @returns false when schedule updated, otherwise undefined
 */
function keydown(event) {
  console.log(`keydown: ${event.key} ${event.code} ${event.keyCode}`);
  if (event.key === `Enter` || event.code === `Enter`) {
    console.log(`Enter`);
    //console.log(event);
    return schedule();
   }
}

/** EventListener for keyup. When key is 'Space', prevent default
 * behavior, which is similar to 'Enter'.
 * @param {Event} event - keyup event
 */
function keyup(event) {
  console.log(`keyup: ${event.key} ${event.code} ${event.keyCode}`);
  if (event.key === `Space` || event.code === `Space`) {
    console.log(`Space`);
    event.preventDefault();
    //console.log(event);
  }
}

/** EventListener for input. updateURI() whenever text is input.
 * @param {Event} event - input event
 */
function input(event) {
  console.log(`input: `
    + `id:${event.target.id} `
    + `value:"${event.target.value}" `
  );
  updateURI();       // Check text input
  //console.log(event);
}

/*
 * Utility functions.
 */

/** Check all class="checkbox" elements and, for all unchecked boxes,
 * clear and disable text input for any w/ matching ids and suffix 
 * 't', 'r', 'c', or 'l'. For all checked boxes, enable text input
 * for those same elements, except only enable text input for ids
 * w/ the suffix 'l' (*lunch*) whose ids have prefix 'd', 'e', or 'g'.
 */
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

/** Check <details> elements, setting open property to true if any
 * class="checkbox" elements w/ matching ids are checked, otherwise
 * keep its current state. 
 */
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
/** Returns data object w/ keys and values swapped.
 * @returns data object w/ keys and values swapped
 */
const flip = (data) => Object.fromEntries(
  Object
    .entries(data)
    .map(([key, value]) => [value, key])
  );

/** Returns URI updated to include query string w/ all data from form 
 * included as parameters as follows:
 * - Create valkey Object w/ text.value as key and concatenation of 
 *   text.id as value so every property w/ same value can be combined.
 * - Flip valkey to create keyval Object.
 * - Create query string by concatenating `&${key}${value}` in order
 *   w/ '=', '+', & ' ' replaced in value.
 * - Use parseFromString followed by encodeURI to create uri w/ first
 *   '&' replaced by '?' and return it.
 * - NOTE: fix '&gt' before and after encoding so it won't be '>'.
 * @returns URI updated to include query string
 */
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
  query = query.replace(/&gt=/g, `&gx=`); // TODO: fixes &gt parsing
  //console.log(`*   ${query}`);
  let result = new DOMParser()
    .parseFromString(query, "text/html").documentElement.textContent;
  result = result 
    ? encodeURI(`${URI}${result.replace(/&/, '?')}`)
    : `${URI}`;
  //console.log(`**  ${result}`);
  result = result.replace(/gx=/g, `gt=`); // TODO: fixes &gt parsing
  //console.log(`*** ${result}`);
  return result;
}

/** Update HTML of id="uri" element to show uri() w/ '&' replaced
 * by '&amp;'.
 */
function updateURI() {
  document.querySelector(`#uri`).innerHTML = `${uri().replace(/&/g, `&amp;`)}`;
}

/** Update src, width, and height properites of element w/ selector 
 * 'iframe' and return false so page does not reload. Update src to 
 * uri(). If searchParams of uri() contains 'cw' and it is an integer, 
 * calculate and update new width and height.
 * TODO: height is an approximate function of width such that there
 * are no scrollbars. The approximation is based on observations.
 */
function schedule() {
  let 
    iframe = document.querySelector(`iframe`),
    cw = (new URL(uri())).searchParams.get(`cw`);
  if (cw && !isNaN(+cw)) {
    width = parseInt(+cw);
    height = parseInt((width / 20 + 950) + 0.5);
    iframe.width = `${width}`;  
    iframe.height = `${height}`;
    console.log(`Dimension: ${width}x${height}`)
  }
  iframe.src = `${uri()}`;
  console.log(iframe.src);
  return false;
}

// https://freecodecamp.org/news/copy-text-to-clipboard-javascript/
/** Copy text to clipboard and log and alert message.
 */
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

/** Copy uri() to clipboard and alert a message showing it.
 * @return false
 */
function copyURI() {
  const text = uri(), message = `"${text}"`;
  copyToClipboard(text, message);
  return false;  
}

/** Copy uri() embedded in iframe code suitable for inclusion in a
 * Google site to clipboard and alert a message confirming.
 * @return false
 */
function copyCode() {
  let iframe = document.querySelector(`iframe`);
  //console.log(`Dimension: ${iframe.width}x${iframe.height}`)
  const text = `<style>
  /* The maximum width of an embedded Google site is ~1150px. */
  /* If scrollbars appear in the iframe, increase min-height value. */
  iframe { border: 0; min-width: ${iframe.width}px; min-height: ${iframe.height}px; }
</style>
<div style="overflow: hidden; display: flex; justify-content: center;">
  <iframe src="${uri()}"></iframe>
</div>`, message = `code`;
  copyToClipboard(text, message);
  return false;
}

/** addEventListeners for 'change', 'toggle', 'input', 'keydown', and 
 * 'keyup' and for 'click' on icons for copyURI and copyCode. Perform 
 * functionality of 'change' and 'input' events. Return false so page 
 * does not reload.
 */
function initialize() {
  console.log(`Initializing...`);
  // TODO: determine why permissions.query does not work
  // https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/
/*  navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      console.log(`Clipboard write access granted.`);
    }
  });
*/
  for (const box of document.querySelectorAll(`.checkbox`)) {
    box.addEventListener(`change`, change);
  }
  for (const details of document.querySelectorAll(`details`)) {
    details.addEventListener(`toggle`, toggle);
  }
  for (const text of document.querySelectorAll(`.text`)) {
    text.addEventListener(`input`, input);
    text.addEventListener(`keydown`, keydown);
    text.addEventListener(`keyup`, keyup);
  }
  document.querySelector(`#copyuri`).addEventListener("click", copyURI, false);
  document.querySelector(`#copycode`).addEventListener("click", copyCode, false);
  checkEnabled();
  updateURI();
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

// Sample copyCode output.
`
<style>
  iframe { width: 1080px; height: 996px; }
</style>
<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <iframe src="https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/"></iframe>
</div>`