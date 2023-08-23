# 2023-2024-bhs-schedule

This is a [p5.js](https://p5js.org/) sketch for the 2023-2024 Brookline High School Schedule ([v1B](https://bhs.brookline.k12.ma.us/uploads/8/0/1/5/801512/23_24bhsweeklysched_v1b.pdf)). [p5.js](https://p5js.org/) '&hellip;is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone.'

Use the link [https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule](https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule) with suitable query properties to display your custom schedule. The query properties are described below.

<span style="color: red; font-size: x-large; font-variant: small-caps;"><em>New</em> URI configuration tool:</span> [https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/uri](https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/uri).

## URI Query properties &mdash; TMI

See [https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax) for a primer on the basic syntax of a URI. The properties of the schedule are set by the [name-value pair](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair)s in the query portion of the URI (after the first '`?`') separated by ampersands ('`&`').

There are valid query properties for **text**, **room**, **lunch**, and **color**, plus **other** properties of interest (canvas width, font size, font face, footer legend, pad character). For example:

The URI [https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/?at=bt=et=ft=gt=APCS&#8203;&ar=br=er=fr=gr=Room+373&#8203;&dl=1&#8203;&ac=hotpink&#8203;&bc=navy&#8203;&cc=orchid&#8203;&dc=gold&ec=chartreuse&#8203;&fc=dodgerblue&#8203;&gc=rebeccapurple](https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/?at=bt=et=ft=gt=APCS&ar=br=er=fr=gr=Room+373&dl=1&ac=hotpink&bc=navy&cc=orchid&dc=gold&ec=chartreuse&fc=dodgerblue&gc=rebeccapurple) sets the text for all five classes in blocks A, B, E, F, &amp; G as *APCS*, all five rooms in blocks A, B, E, F, &amp; G as *Room 373*, D lunch as *Lunch 1*, and individual colors for the seven blocks.

## Special characters

Ordinarily, query property *values* (after the first '`=`') do not have additional semantics. To save space in the URI, this sketch allows multiple names followed by '`=`' to all refer to the same value, which follows the *last* '`=`.' That also implies that **'`=`' cannot appear in the value** (unless it is the Unicode [full-width equals sign](https://unicode-table.com/en/FF1D/) percent encoded as `%EF%BC%9D`).

Based on [RFC 1738](https://www.rfc-editor.org/rfc/rfc1738), the only valid URI characters are: alphanumeric, special characters `$-_.+!*'(),`, and reserved characters `;/?:@=&` (meaning that '` `' and <code>"#%<>[]\^{}|~&#96;</code> are unsafe for use in a URI and must *always* be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding)). However, based on [an interpretation of RCF 3986](https://www.456bereastreet.com/archive/201008/what_characters_are_allowed_unencoded_in_query_strings), reserved characters `;/?:@=&` can be included in query property `text` *without* percent encoding (though every query character *could* be percent encoded without problem).

However, query properties are delimited by '`&`' (and parsed with the [`URLSearchParames`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) JavaScript function). That implies that **`&` cannot appear in the value** (unless it is the Unicode [full-width ampersand](https://unicode-table.com/en/FF1D/) percent encoded as `%EF%BC%86`).

It is typical in URIs to use '`+`' as a placeholder for '` `' in text, rather than the uglier percent-encoded space `%20`. That also implies that **'`+`' cannot appear in the value** (unless it is the Unicode [full-width plus sign](https://unicode-table.com/en/FF0B/) percent encoded as `%EF%BC%8B`).

The complete documentation for query properties follows.

<hr>

### Text

Query property names ending in '`T`' can be either two or three characters &mdash; depending on whether the property applies to all blocks or only a specific numbered block. To set all *all* A blocks to `APCS` use `at=APCS`. To set *only* block `A4` to `APCS Lab` use `a4t=APCS+Lab`. Using A block as an example, `at=` is equivalent to `a1t=a2t=a3t=a4t=`. Three-character query property names are more specific than their two-character counterparts, so their values override any associated with the less-specific query property names.

#### Properties

| Name | Value | Type | Default | Example |
| --- | --- | --- | --- | --- |
| `zt` | Text description of Z-Block class | `text` | `zt=` | `zt=APCS-A+(Java)` |
| `at` | Text description of A-Block class | `text` | `at=` | `at=APCS-A+(Java)` |
| `bt` | Text description of B-Block class | `text` | `bt=` | `bt=APCS-A+(Java)` |
| `ct` | Text description of C-Block class | `text` | `ct=` | `ct=APCS-A+(Java)` |
| `dt` | Text description of D-Block class | `text` | `dt=` | `dt=APCS-A+(Java)` |
| `et` | Text description of E-Block class | `text` | `et=` | `et=APCS-A%20(Java)` |
| `ft` | Text description of F-Block class | `text` | `ft=` | `ft=APCS-A%20%28Java%29` |
| `gt` | Text description of G-Block class | `text` | `gt=` | `gt=%41%50%43%53%2D%41%20%28%4A%61%76%61%29` |
| `tt` | Text description of T-Block class | `text` | `tt=` | `tt=Advisory` |
| `xt` | Text description of X-Block class | `text` | `xt=` | `xt=Brookline+Robotics+Team` |

The default values are empty.

<hr>

### Room

Query property names ending in '`R`' can be either two or three characters &mdash; depending on whether the property applies to all blocks or only a specific numbered block. To set all *all* A blocks to `UA-33` use `ar=UA-33`. To set *only* block `A4` to `STEM-105` use `a4r=STEM-105`. Using A block as an example, `ar=` is equivalent to `a1r=a2r=a3r=a4r=`. Three-character query property names are more specific than their two-character counterparts, so their values override any associated with the less-specific query property names.

#### Properties

| Name | Value | Type | Default | Example |
| --- | --- | --- | --- | --- |
| `zr` | Room for Z-Block class | `text` | `zr=` | `zr=UA-33` |
| `ar` | Room for A-Block class | `text` | `ar=` | `ar=UA-33` |
| `br` | Room for B-Block class | `text` | `br=` | `br=UA-33` |
| `cr` | Room for C-Block class | `text` | `cr=` | `cr=UA-33` |
| `dr` | Room for D-Block class | `text` | `dr=` | `dr=UA-33` |
| `er` | Room for E-Block class | `text` | `er=` | `er=UA-33` |
| `fr` | Room for F-Block class | `text` | `fr=` | `fr=UA-33` |
| `gr` | Room for G-Block class | `text` | `gr=` | `gr=UA-33` |
| `tr` | Room for T-Block class | `text` | `tr=` | `tr=UA-33` |
| `xr` | Room for X-Block class | `text` | `xr=` | `xr=UA-33` |

The default values are empty.

<hr>

### Lunch

Query property names ending in '`L`' can be either two or three characters &mdash; depending on whether the property applies to all blocks or only a specific numbered block. To set all *all* D blocks to `L1` use `dl=L1`. To set *only* block `D4` to `L2` use `d4l=L2`. Using D block as an example, `dl=` is equivalent to `d3l=d4l=`. Three-character query property names are more specific than their two-character counterparts, so their values override any associated with the less-specific query property names. Query property names ending in '`L`' have case-insensitive valid values `C1`, `L2`, `2`, `C2`, `L1`, or `1`.

#### Properties

| Name | Value | Type | Default | Example |
| --- | --- | --- | --- | --- |
| `dl` | Lunch for D-Block classes D3 &amp; D4 | `text` | `dl=L2` | `dl=L1` |
| `el` | Lunch for E-Block classes E1 &amp; E2 | `text` | `el=L2` | `el=L1` |
| `gl` | Lunch for G-Block class G3 | `text` | `gl=L2` | `gl=L1` |

The default values are `L2` (sorry humanities departments!).

<hr>

### Colors

The block background colors default to the [OG](https://urbandictionary.com/define.php?term=OG) BHS schedule colors. You can change any of them, using [CSS color names](https://www.w3.org/TR/css-color-4/#named-colors) or 3- or 6-digit [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) (base 16) values (or 4- or 8-digit hex values when including the optional alpha / opacity argument of RGBA). Because I'm slightly color blind, I typically use colors from the of 216 [web-safe colors](https://websafecolors.info/) on my websites. ([ColorHexa](https://www.colorhexa.com/663399) has an interesting *Color Blindness Simulator* as part of their color pages to help with [web accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/).) See [this reference](https://dev.to/alvaromontoro/the-ultimate-guide-to-css-colors-2020-edition-1bh1) for a complete description of CSS colors.

Query property names ending in '`C`' can be either two or three characters &mdash; depending on whether the property applies to all blocks or only a specific numbered block. To set all *all* A blocks to `red` use `ac=red`. To set *only* block `A4` to `navy` use `a4c=navy`. Using A block as an example, `ac=` is equivalent to `a1c=a2c=a3c=a4c=`. Three-character query property names are more specific than their two-character counterparts, so their values override any associated with the less-specific query property names.

#### Named colors

The query property color values can be one of the case-insensitive [CSS color names](https://www.w3.org/TR/css-color-4/#named-colors). There are 148 named colors that come from 16 original VGA colors, 131 of the 504 [X11 colors](https://www.w3schools.com/colors/colors_x11.asp), and [`rebeccapurple`](https://medium.com/@valgaze/the-hidden-purple-memorial-in-your-web-browser-7d84813bb416). ([https://youtu.be/HmStJQzclHc](https://youtu.be/HmStJQzclHc) is a history of the names &mdash; who knew there was a [Crayola 72 pack](https://shop.crayola.com/color-and-draw/crayons/72-ct-crayon-kit-520031A000.html)?)

#### Hexadecimal colors

The query property color values can be a hexadecimal number. The standard way to specify a color in an RGB color space is to use three two-digit hexadecimal numbers, one for each color. That yields 256 levels (from `00` to `ff`) of red, green, and blue. The color numbers can be specified as either 3 or 6 hexadecimal digits, where the 3-digit number simply repeats each digit twice. For example, [`rebeccapurple`](https://www.color-hex.com/color/663399) can be specified as either `639` or `663399`.

#### Properties

| Name | Value | Type | Default | Example | Example Alternate |
| --- | --- | --- | --- | --- | --- |
| `zc` | Z-Block color | `color` | `zc=FF6` | `zc=yellow` | `#FFFF00` |
| `ac` | A-Block color | `color` | `ac=C33` | `ac=f00` | `red` |
| `bc` | B-Block color | `color` | `bc=009` | `bc=000080` | `navy` |
| `cc` | C-Block color | `color` | `cc=C69` | `cc=7fff00` | `chartreuse` |
| `dc` | D-Block color | `color` | `dc=F93` | `dc=Sienna` | `#a0522d` |
| `ec` | E-Block color | `color` | `ec=696` | `ec=000` | `black` |
| `fc` | F-Block color | `color` | `fc=69F` | `fc=white` | `#FFF` |
| `gc` | G-Block color | `color` | `gc=96C` | `gc=639` | `rebeccapurple` |
| `lc` | Lunch Block color | `color` | `lc=CCC` | `lc=PeachPuff` | `#FFDAB9` |
| `tc` | T-Block color | `color` | `tc=CCC` | `tc=ccc` | a light shade of gray |
| `xc` | X-Block color | `color` | `xc=CCC` | `xc=ccc` | a light shade of gray |
| `tcc` | Teacher Collaboration color | `color` | `tcc=FFF` | `tcc=fff` | `white` |

The code for the default values is:

```JavaScript
// All colors keys end in "C".
const colors = {
  ZC: "#ff6", // Z: 255, 255,  84 -> #ffff54 -> #ff5 -> #ff6
  AC: "#c33", // A: 204,  65,  37 -> #cc4125 -> #c42 -> #c33
  BC: "#009", // B:   0,   0, 153 -> #000099 -> #009 -> #009
  CC: "#c69", // C: 194, 123, 160 -> #c27ba0 -> #b79 -> #c69
  DC: "#f93", // D: 230, 145,  56 -> #e69138 -> #e93 -> #f93
  EC: "#696", // E: 106, 168,  79 -> #6aa84f -> #6a5 -> #696
  FC: "#69f", // F: 109, 158, 235 -> #6d9eeb -> #69e -> #69f
  GC: "#96c", // G: 142, 124, 195 -> #8e7cc3 -> #87b -> #96c
  LC: "#ccc",
  TC: "#ccc",
  XC: "#ccc",
  TCC: "#fff",
};
```

<hr>

### Other

| Name | Value | Type | Default / Example | Description |
| --- | --- | --- | --- | --- |
| `cw` | Canvas Width | `number` | `cw=1080` | in pixels |
| `fs` | Font Size | `number` | `fs=16` | in points |
| `ff` | Font Face | `string` | `ff=Arial` | one of the [web-safe](https://www.cssfontstack.com/) fonts |
| `lg` | Footer Legend | `string` | `lg=` | additional text added to footer |
| `pd` | Pad Character | `string` | `pd=%E2%80%87` | Unicode [figure space](https://unicode-table.com/en/2007/) |
| `ln` | Lunch Number | `string` | `ln=L2` | class 1 / lunch 2 |
| `ts` | Timer Shown | `string` | `ts=0` | anything other than `0` shows timer |
| `to` | Time Offset | `number` | `to=0` | offset in seconds from [now](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) (debugging) |

The examples show the default values for these query properties.

The query property `pd` is a character used to pad out single-digit hours. To show, *e.g.*, two o'clock as `02:00` use `pd=0`. To remove any padding, use `pd=`.

The query property `ln` has case-insensitive valid values `C1`, `L2`, `2`, `C2`, `L1`, or `1`. It is maintained for backward compatibility, but it is preferable to use query property names ending in '`L`' where `ln=` is equivalent to `dl=el=gl=`.

## To embed in Google Sites

This HTML code sets the style and embeds an `iframe` for my 2022-2023 S1 schedule in my [PSB Google Site](http://j.mp/psb_david_petty). Use it as an example.

```html
<style>
  /* The maximum width of an embedded Google site is ~1150px. */
  /* If scrollbars appear in the iframe, increase min-height value. */
  iframe { border: 0; min-width: 1150px; min-height: 1008px; }
</style>
<div style="overflow: hidden; display: flex; justify-content: center;">
  <iframe src="https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/?cw=1150&ff=copperplate&fs=24&lg=%C2%A1I+have+no+more+classes!"></iframe>
</div>
```

The default `iFrame` height and width style is `iframe { width: 1080; height: 996; }`. If you change settings (as in my example schedule), the `iFrame` height and width for any *new* settings are echoed on the browser's [developer console](https://balsamiq.com/support/faqs/browserconsole/). Copy the echoed values between the `<style>` &amp; `</style>` tags in the above HTML code.

## TODO

- Add more *other* query properties for things like `dots` and `margin` and other user requests.
- Add more Google fonts to `index.html` in addition to [Inconsolata](https://fonts.google.com/specimen/Inconsolata) (which ones?).
- Enhance specification of the font to use knowledge of the default p5.js / browser fonts.
- Make the `iFrame` height have a fixed value (`1000px`?).
- Add an additional text field.
- Allow for clickable links.

<hr>

[&#128279; permalink](https://psb-david-petty.github.io/p5js/2023-2024-bhs-schedule/doc.html) and [&#128297; repository](https://github.com/psb-david-petty/p5js/tree/main/2023-2024-bhs-schedule) for [this](https://editor.p5js.org/psb_david_petty/sketches/zNwdkmVsA) sketch.
