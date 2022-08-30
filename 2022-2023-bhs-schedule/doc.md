# 2022-2023-bhs-schedule

This is a [p5.js](https://p5js.org/) sketch for the 2022-2021 Brookline High School Schedule ([v1C'](https://bhs.brookline.k12.ma.us/uploads/8/0/1/5/801512/22_23bhsweeklysched_v1c.pdf)). [p5.js](https://p5js.org/) '&hellip;is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone.'

Use the link [https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule](https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule) with suitable query properties to display your custom schedule. The query properties are described below.

## URI Query properties.

See [https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax) for a primer on the basic syntax of a URI. The properties of the schedule are set by the [name-value pair](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair)s in the query portion of the URI (after the first '`?`') separated by ampersands ('`&`').

There are valid query properties for **text**, **room**, and **color**, plus **other** properties of interest (lunch, canvas width, font size). For example:

The URI [https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule/?at=bt=et=ft=gt=APCS&#8203;&ar=br=er=fr=gr=UA-33&#8203;&ac=hotpink&#8203;&bc=navy&#8203;&cc=orchid&#8203;&dc=gold&ec=chartreuse&#8203;&fc=dodgerblue&#8203;&gc=rebeccapurple](https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule/?at=bt=et=ft=gt=APCS&ar=br=er=fr=gr=UA-33&ac=hotpink&bc=navy&cc=orchid&dc=gold&ec=chartreuse&fc=dodgerblue&gc=rebeccapurple) sets the text for all five classes in blocks A, B, E, F, &amp; G as *APCS*, all five rooms in blocks A, B, E, F, &amp; G as *UA-33*, and individual colors for the seven blocks.

Ordinarily, query property *values* (after the first '`=`') do not have additional semantics. To save space in the URI, this sketch allows multiple names followed by '`=`' to all refer to the same value, which follows the *last* '`=`.' That also implies that **'`=`' cannot appear in the value**.

Based on [RFC 1738](https://www.rfc-editor.org/rfc/rfc1738), the only valid URI characters are: alphanumeric, special characters `$-_.+!*'(),`, and reserved characters `;/?:@=&` (meaning that '` `' and <code>"#%<>[]\^{}|~&#96;</code> are unsafe and must *always* be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding)). However, based on [an interpretation of RCF 3986](https://www.456bereastreet.com/archive/201008/what_characters_are_allowed_unencoded_in_query_strings), reserved characters `;/?:@=&` can be included in query property `text` *without* percent encoding (though any query character *could* be percent encoded without problem).

It is typical in URIs to use '`+`' as a placeholder for '` `' in text, rather than the uglier percent-encoded space `%20`.

The complete documentation follows.

<hr>

### Text

| Name | Value | Type | Example |
| --- | --- | --- | --- |
| `zt` | Text description of Z-Block class | `text` | `zt=APCS-A+(Java)` |
| `at` | Text description of A-Block class | `text` | `at=APCS-A+(Java)` |
| `bt` | Text description of B-Block class | `text` | `bt=APCS-A+(Java)` |
| `ct` | Text description of C-Block class | `text` | `ct=APCS-A+(Java)` |
| `dt` | Text description of D-Block class | `text` | `dt=APCS-A+(Java)` |
| `et` | Text description of E-Block class | `text` | `et=APCS-A%20(Java)` |
| `ft` | Text description of F-Block class | `text` | `ft=APCS-A%20%28Java%29` |
| `gt` | Text description of G-Block class | `text` | `gt=%41%50%43%53%2D%41%20%28%4A%61%76%61%29` |
| `tt` | Text description of T-Block class | `text` | `tt=Advisory` |
| `xt` | Text description of X-Block class | `text` | `xt=Brookline+Robotics+Team` |

The default values are empty.

<hr>

### Room

| Name | Value | Type | Example |
| --- | --- | --- | --- |
| `zr` | Room for Z-Block class | `text` | `zr=UA-33` |
| `ar` | Room for A-Block class | `text` | `ar=UA-33` |
| `br` | Room for B-Block class | `text` | `br=UA-33` |
| `cr` | Room for C-Block class | `text` | `cr=UA-33` |
| `dr` | Room for D-Block class | `text` | `dr=UA-33` |
| `er` | Room for E-Block class | `text` | `er=UA-33` |
| `fr` | Room for F-Block class | `text` | `fr=UA-33` |
| `gr` | Room for G-Block class | `text` | `gr=UA-33` |
| `tr` | Room for T-Block class | `text` | `tr=UA-33` |
| `xr` | Room for X-Block class | `text` | `xr=UA-33` |

The default values are empty.

<hr>

### Colors

The block background colors default to the [OG](https://urbandictionary.com/define.php?term=OG) BHS schedule colors. You can change any of them, using [CSS color names](https://www.w3.org/TR/css-color-4/#named-colors) or 3- or 6-digit [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) (base 16) values. Because I'm slightly color blind, I typically use colors from the of 216 [web-safe colors](https://websafecolors.info/) on my websites. ([ColorHexa](https://www.colorhexa.com/663399) has an interesting *Color Blindness Simulator* as part of their color pages to help with [web accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/).) See [this reference](https://dev.to/alvaromontoro/the-ultimate-guide-to-css-colors-2020-edition-1bh1) for a complete description of CSS colors.

#### Named colors

The query property color values can be one of the case-insensitive [CSS color names](https://www.w3.org/TR/css-color-4/#named-colors). There are 148 named colors that come from 16 original VGA colors, 131 of the 504 [X11 colors](https://www.w3schools.com/colors/colors_x11.asp), and [`rebeccapurple`](https://medium.com/@valgaze/the-hidden-purple-memorial-in-your-web-browser-7d84813bb416). ([https://youtu.be/HmStJQzclHc](https://youtu.be/HmStJQzclHc) is a history of the names &mdash; who knew there was a [Crayola 72 pack](https://shop.crayola.com/color-and-draw/crayons/72-ct-crayon-kit-520031A000.html)?)

#### Hexadecimal colors

The query property color values can be a hexadecimal number. The standard way to specify a color in an RGB color space is to use three two-digit hexadecimal numbers, one for each color. That yields 256 levels (from `00` to `ff`) of red, green, and blue. The color numbers can be specified as either 3 or 6 hexadecimal digits, where the 3-digit number simply repeats each digit twice. For example, [`rebeccapurple`](https://www.color-hex.com/color/663399) can be specified as either `639` or `663399`.

| Name | Value | Type | Example | Color |
| --- | --- | --- | --- | --- |
| `zc` | Z-Block color | `color` | `zc=yellow` | `#FFFF00` |
| `ac` | A-Block color | `color` | `ac=f00` | `red` |
| `bc` | B-Block color | `color` | `bc=000080` | `navy` |
| `cc` | C-Block color | `color` | `cc=7fff00` | `chartreuse` |
| `dc` | D-Block color | `color` | `dc=Sienna` | `#a0522d` |
| `ec` | E-Block color | `color` | `ec=000` | `black` |
| `fc` | F-Block color | `color` | `fc=white` | `#FFF` |
| `gc` | G-Block color | `color` | `gc=639` | `rebeccapurple` |
| `lc` | Lunch Block color | `color` | `lc=PeachPuff` | `#FFDAB9` |
| `tc` | T-Block color | `color` | `tc=ccc` | a light shade of gray |
| `xc` | X-Block color | `color` | `xc=ccc` | a light shade of gray |

The code for the default values is:

```JavaScript
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
```

<hr>

### Other

| Name | Value | Type | Example | Description |
| --- | --- | --- | --- | --- |
| `ln` | Lunch Number | `number` | `ln=L2` | class 1 / lunch 2 |
| `fs` | Font Size | `number` | `fs=16` | in points |
| `cw` | Canvas Width | `number` | `cw=1080` | in pixels |

The query property `ln` has case-insensitive valid values `L1`, `1`, `L2`, or `2`. The examples show the default values.

## To embed in Google Sites

This HTML code sets the style and embeds an `iframe` for my 2022-2023 S1 schedule in my [PSB Google Site](http://j.mp/psb_david_petty).

```html
<style>
  iframe { width: 1080px; height: 952px; border: none; }
</style>
<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <iframe src="https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule/?at=Autonomous+Robotics+II&bt=gt=APCS-P+(Mobile)&ct=APCS-A+(Java)&et=Autonomous+Robotics+I&xt=Brookline+Robotics%20Team&ar=br=cr=er=gr=xr=UA-33"></iframe>
</div>
```

## TODO

- Add values to the `ln` query property for `C1` and `C2` *since they are not the same as `L1` and `L2`!*
- Add more *other* query properties for things like `dots` and `margin` and other user requests.
- Fix the code for when to use `black` text versus `white` text (or allow text color to be specified through query properties (!)).
- Allow for specification of the *Teacher Colaboration* color(s).
- Allow specification of the font (which requires knowing which are the default p5.js fonts). 
- Add an additional text field.
- Allow for clickable links.

<hr>

[&#128279; permalink](https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule/doc.html) and [&#128297; repository](https://github.com/psb-david-petty/p5js/tree/main/2022-2023-bhs-schedule) for [this](https://editor.p5js.org/psb_david_petty/sketches/iYdU0GAic) sketch.
