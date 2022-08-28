# 2022-2023-bhs-schedule

This is a [p5.js](https://p5js.org/) sketch for the 2022-2021 Brookline High School Schedule (v1C). [p5.js](https://p5js.org/) '&hellip;is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone.'

Use the link [https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule](https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule) with suitable query properties to display your custom schedule. The query properties are described below.

## URI Query properties.

Please see [https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax) for a primer on the basic syntax of a URI. The properties of the schedule are set by the [name-value pair](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair)s in the query portion of the URI separated by ampersands (`&amp;`).

There are valid query properties for text, room, and color, plus other properties of interest (lunch, canvas width, font size). As an example:

[https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule/?at=bt=et=ft=gt=APCS&#8203;&ar=br=er=fr=gr=UA-33&#8203;&ac=pink&#8203;&bc=navy&#8203;&cc=orchid&#8203;&dc=gold&ec=olive&#8203;&fc=dodgerblue&#8203;&gc=rebeccapurple](https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule/?at=bt=et=ft=gt=APCS&ar=br=er=fr=gr=UA-33&ac=pink&bc=navy&cc=orchid&dc=gold&ec=olive&fc=dodgerblue&gc=rebeccapurple) sets the text for all five classes in blocks A, B, E, F, &amp; G as *APCS*, all five rooms in blocks A, B, E, F, &amp; G as *UA-33*, and individual colors for the seven blocks.

Ordinarily, query property *values* (after the first '`=`') do not have additional semantics. To save space in the URI, this sketch allows multiple names followed by '`=`' to all refer to the same value, which follows the *last* '`=`.' That means '`=`' cannot appear in the value.

The complete document follows.

### Text

| Name | Value | Type | Example |
| --- | --- | --- | --- |
| `at` | Text description of A-Block class | `text` | `at=APCS-A+(Java) |

Based on [an interpretation of RCF 3986](https://www.456bereastreet.com/archive/201008/what_characters_are_allowed_unencoded_in_query_strings), all valid URI characters are valid for a URI query without being [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding) *except* "%" / "#" / "[" / "]" (*i.e.* valid URI query characters are: ALPHA / DIGIT / "-" / "." / "_" / "~" / "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "=" / ":" / "@" / "/" / "?"). Any valid URI query characters *could* be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding) 

Based on [RFC 1738](https://www.rfc-editor.org/rfc/rfc1738), the only valid URI characters are: alphanumeric, special characters `$-_.+!'(),`, reserved characters `;/?:@=&` (meaning that `~` are unsafe and must be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding)).

It is typical in URIs to use '`+`' as a placeholder for '` `' in text.

### Room

YYY

### Colors

The block background colors default to the OG BHS schedule colors. You can change any of them

<hr>

[&#128279; permalink](https://psb-david-petty.github.io/p5js/2022-2023-bhs-schedule) and [&#128297; repository](https://github.com/psb-david-petty/p5js/tree/main/2022-2023-bhs-schedule) for [this](https://editor.p5js.org/psb_david_petty/sketches/iYdU0GAic) page.
