var qe = Object.defineProperty;
var De = (u, e, t) =>
  e in u
    ? qe(u, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (u[e] = t);
var m = (u, e, t) => De(u, typeof e != "symbol" ? e + "" : e, t);
import { _ as Ze } from "./p7j97DnR.js";
import Me from "./CmTHdqlw.js";
import {
  g as Ge,
  r as A,
  h as Ne,
  i as fe,
  j as se,
  k as He,
  l as Oe,
  o as y,
  c as _,
  d as L,
  w as M,
  b as E,
  H as je,
  n as de,
  m as G,
  p as P,
  q as Fe,
  v as Qe,
  s as Ue,
  F as Ve,
  x as Xe,
  y as re,
  t as ke,
  z as We,
  a as Ke,
} from "./DOh1AU71.js";
import { u as Je } from "./DuyO21MA.js";
import Ye from "./CkZ_EAQ7.js";
import et from "./CI8OHxR3.js";
import { _ as tt } from "./CJlOmnRX.js";
import me from "./BFQ5jAIt.js";
import "./DK5tfaOn.js";
import "./BOL_xOFH.js";
import "./Dym_awWQ.js";
import "./BmlbPuZL.js";
import "./mE--neDS.js";
import "./CjbS9Grt.js";
import "./DY7prswQ.js";
import "./CrytHqcH.js";
import "./CWrFH4lL.js";
import "./BzERAxPy.js";
import "./RqieeA3v.js";
import "./CJITND_o.js";
import "./Cq0864AT.js";
import "./C1RzGu7i.js";
function le() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
let B = le();
function $e(u) {
  B = u;
}
const O = { exec: () => null };
function k(u, e = "") {
  let t = typeof u == "string" ? u : u.source;
  const n = {
    replace: (r, s) => {
      let i = typeof s == "string" ? s : s.source;
      return (i = i.replace(S.caret, "$1")), (t = t.replace(r, i)), n;
    },
    getRegex: () => new RegExp(t, e),
  };
  return n;
}
const S = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (u) => new RegExp(`^( {0,3}${u})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (u) =>
      new RegExp(
        `^ {0,${Math.min(
          3,
          u - 1
        )}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
      ),
    hrRegex: (u) =>
      new RegExp(
        `^ {0,${Math.min(
          3,
          u - 1
        )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
      ),
    fencesBeginRegex: (u) =>
      new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}#`),
    htmlBeginRegex: (u) =>
      new RegExp(`^ {0,${Math.min(3, u - 1)}}<(?:[a-z].*>|!--)`, "i"),
  },
  nt = /^(?:[ \t]*(?:\n|$))+/,
  st = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
  rt =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  F = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  it = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  _e = /(?:[*+-]|\d{1,9}[.)])/,
  ve = k(
    /^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/
  )
    .replace(/bull/g, _e)
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .getRegex(),
  oe =
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  lt = /^[^\n]+/,
  ae = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  ot = k(
    /^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/
  )
    .replace("label", ae)
    .replace(
      "title",
      /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    )
    .getRegex(),
  at = k(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, _e)
    .getRegex(),
  Y =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
  ce = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  ct = k(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i"
  )
    .replace("comment", ce)
    .replace("tag", Y)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex(),
  Re = k(oe)
    .replace("hr", F)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", Y)
    .getRegex(),
  ut = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace("paragraph", Re)
    .getRegex(),
  ue = {
    blockquote: ut,
    code: st,
    def: ot,
    fences: rt,
    heading: it,
    hr: F,
    html: ct,
    lheading: ve,
    list: at,
    newline: nt,
    paragraph: Re,
    table: O,
    text: lt,
  },
  be = k(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  )
    .replace("hr", F)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("blockquote", " {0,3}>")
    .replace("code", "(?: {4}| {0,3}	)[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", Y)
    .getRegex(),
  ht = {
    ...ue,
    table: be,
    paragraph: k(oe)
      .replace("hr", F)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("table", be)
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
      )
      .replace("tag", Y)
      .getRegex(),
  },
  pt = {
    ...ue,
    html: k(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    )
      .replace("comment", ce)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: O,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: k(oe)
      .replace("hr", F)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`
      )
      .replace("lheading", ve)
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .replace("|tag", "")
      .getRegex(),
  },
  gt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  ft = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  Te = /^( {2,}|\\)\n(?!\s*$)/,
  dt =
    /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  ee = /[\p{P}\p{S}]/u,
  he = /[\s\p{P}\p{S}]/u,
  ze = /[^\s\p{P}\p{S}]/u,
  kt = k(/^((?![*_])punctSpace)/, "u")
    .replace(/punctSpace/g, he)
    .getRegex(),
  Ce = /(?!~)[\p{P}\p{S}]/u,
  mt = /(?!~)[\s\p{P}\p{S}]/u,
  bt = /(?:[^\s\p{P}\p{S}]|~)/u,
  xt =
    /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,
  Ae = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,
  wt = k(Ae, "u").replace(/punct/g, ee).getRegex(),
  yt = k(Ae, "u").replace(/punct/g, Ce).getRegex(),
  Le =
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",
  St = k(Le, "gu")
    .replace(/notPunctSpace/g, ze)
    .replace(/punctSpace/g, he)
    .replace(/punct/g, ee)
    .getRegex(),
  $t = k(Le, "gu")
    .replace(/notPunctSpace/g, bt)
    .replace(/punctSpace/g, mt)
    .replace(/punct/g, Ce)
    .getRegex(),
  _t = k(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu"
  )
    .replace(/notPunctSpace/g, ze)
    .replace(/punctSpace/g, he)
    .replace(/punct/g, ee)
    .getRegex(),
  vt = k(/\\(punct)/, "gu")
    .replace(/punct/g, ee)
    .getRegex(),
  Rt = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      "email",
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/
    )
    .getRegex(),
  Tt = k(ce).replace("(?:-->|$)", "-->").getRegex(),
  zt = k(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  )
    .replace("comment", Tt)
    .replace(
      "attribute",
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/
    )
    .getRegex(),
  W = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  Ct = k(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace("label", W)
    .replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace(
      "title",
      /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/
    )
    .getRegex(),
  Ee = k(/^!?\[(label)\]\[(ref)\]/)
    .replace("label", W)
    .replace("ref", ae)
    .getRegex(),
  Pe = k(/^!?\[(ref)\](?:\[\])?/)
    .replace("ref", ae)
    .getRegex(),
  At = k("reflink|nolink(?!\\()", "g")
    .replace("reflink", Ee)
    .replace("nolink", Pe)
    .getRegex(),
  pe = {
    _backpedal: O,
    anyPunctuation: vt,
    autolink: Rt,
    blockSkip: xt,
    br: Te,
    code: ft,
    del: O,
    emStrongLDelim: wt,
    emStrongRDelimAst: St,
    emStrongRDelimUnd: _t,
    escape: gt,
    link: Ct,
    nolink: Pe,
    punctuation: kt,
    reflink: Ee,
    reflinkSearch: At,
    tag: zt,
    text: dt,
    url: O,
  },
  Lt = {
    ...pe,
    link: k(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", W)
      .getRegex(),
    reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", W)
      .getRegex(),
  },
  ie = {
    ...pe,
    emStrongRDelimAst: $t,
    emStrongLDelim: yt,
    url: k(
      /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      "i"
    )
      .replace(
        "email",
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/
      )
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  },
  Et = {
    ...ie,
    br: k(Te).replace("{2,}", "*").getRegex(),
    text: k(ie.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  },
  X = { normal: ue, gfm: ht, pedantic: pt },
  N = { normal: pe, gfm: ie, breaks: Et, pedantic: Lt },
  Pt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  xe = (u) => Pt[u];
function T(u, e) {
  if (e) {
    if (S.escapeTest.test(u)) return u.replace(S.escapeReplace, xe);
  } else if (S.escapeTestNoEncode.test(u))
    return u.replace(S.escapeReplaceNoEncode, xe);
  return u;
}
function we(u) {
  try {
    u = encodeURI(u).replace(S.percentDecode, "%");
  } catch {
    return null;
  }
  return u;
}
function ye(u, e) {
  var s;
  const t = u.replace(S.findPipe, (i, l, c) => {
      let o = !1,
        a = l;
      for (; --a >= 0 && c[a] === "\\"; ) o = !o;
      return o ? "|" : " |";
    }),
    n = t.split(S.splitPipe);
  let r = 0;
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !((s = n.at(-1)) != null && s.trim()) && n.pop(),
    e)
  )
    if (n.length > e) n.splice(e);
    else for (; n.length < e; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(S.slashPipe, "|");
  return n;
}
function H(u, e, t) {
  const n = u.length;
  if (n === 0) return "";
  let r = 0;
  for (; r < n && u.charAt(n - r - 1) === e; ) r++;
  return u.slice(0, n - r);
}
function It(u, e) {
  if (u.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < u.length; n++)
    if (u[n] === "\\") n++;
    else if (u[n] === e[0]) t++;
    else if (u[n] === e[1] && (t--, t < 0)) return n;
  return -1;
}
function Se(u, e, t, n, r) {
  const s = e.href,
    i = e.title || null,
    l = u[1].replace(r.other.outputLinkReplace, "$1");
  if (u[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const c = {
      type: "link",
      raw: t,
      href: s,
      title: i,
      text: l,
      tokens: n.inlineTokens(l),
    };
    return (n.state.inLink = !1), c;
  }
  return { type: "image", raw: t, href: s, title: i, text: l };
}
function Bt(u, e, t) {
  const n = u.match(t.other.indentCodeCompensation);
  if (n === null) return e;
  const r = n[1];
  return e
    .split(
      `
`
    )
    .map((s) => {
      const i = s.match(t.other.beginningSpace);
      if (i === null) return s;
      const [l] = i;
      return l.length >= r.length ? s.slice(r.length) : s;
    }).join(`
`);
}
class K {
  constructor(e) {
    m(this, "options");
    m(this, "rules");
    m(this, "lexer");
    this.options = e || B;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic
          ? n
          : H(
              n,
              `
`
            ),
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0],
        r = Bt(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2]
          ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
          : t[2],
        text: r,
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const r = H(n, "#");
        (this.options.pedantic ||
          !r ||
          this.rules.other.endingSpaceChar.test(r)) &&
          (n = r.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n),
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: H(
          t[0],
          `
`
        ),
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = H(
          t[0],
          `
`
        ).split(`
`),
        r = "",
        s = "";
      const i = [];
      for (; n.length > 0; ) {
        let l = !1;
        const c = [];
        let o;
        for (o = 0; o < n.length; o++)
          if (this.rules.other.blockquoteStart.test(n[o]))
            c.push(n[o]), (l = !0);
          else if (!l) c.push(n[o]);
          else break;
        n = n.slice(o);
        const a = c.join(`
`),
          h = a
            .replace(
              this.rules.other.blockquoteSetextReplace,
              `
    $1`
            )
            .replace(this.rules.other.blockquoteSetextReplace2, "");
        (r = r
          ? `${r}
${a}`
          : a),
          (s = s
            ? `${s}
${h}`
            : h);
        const p = this.lexer.state.top;
        if (
          ((this.lexer.state.top = !0),
          this.lexer.blockTokens(h, i, !0),
          (this.lexer.state.top = p),
          n.length === 0)
        )
          break;
        const g = i.at(-1);
        if ((g == null ? void 0 : g.type) === "code") break;
        if ((g == null ? void 0 : g.type) === "blockquote") {
          const b = g,
            d =
              b.raw +
              `
` +
              n.join(`
`),
            w = this.blockquote(d);
          (i[i.length - 1] = w),
            (r = r.substring(0, r.length - b.raw.length) + w.raw),
            (s = s.substring(0, s.length - b.text.length) + w.text);
          break;
        } else if ((g == null ? void 0 : g.type) === "list") {
          const b = g,
            d =
              b.raw +
              `
` +
              n.join(`
`),
            w = this.list(d);
          (i[i.length - 1] = w),
            (r = r.substring(0, r.length - g.raw.length) + w.raw),
            (s = s.substring(0, s.length - b.raw.length) + w.raw),
            (n = d.substring(i.at(-1).raw.length).split(`
`));
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: i, text: s };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const r = n.length > 1,
        s = {
          type: "list",
          raw: "",
          ordered: r,
          start: r ? +n.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
        this.options.pedantic && (n = r ? n : "[*+-]");
      const i = this.rules.other.listItemRegex(n);
      let l = !1;
      for (; e; ) {
        let o = !1,
          a = "",
          h = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e)) break;
        (a = t[0]), (e = e.substring(a.length));
        let p = t[2]
            .split(
              `
`,
              1
            )[0]
            .replace(this.rules.other.listReplaceTabs, (q) =>
              " ".repeat(3 * q.length)
            ),
          g = e.split(
            `
`,
            1
          )[0],
          b = !p.trim(),
          d = 0;
        if (
          (this.options.pedantic
            ? ((d = 2), (h = p.trimStart()))
            : b
            ? (d = t[1].length + 1)
            : ((d = t[2].search(this.rules.other.nonSpaceChar)),
              (d = d > 4 ? 1 : d),
              (h = p.slice(d)),
              (d += t[1].length)),
          b &&
            this.rules.other.blankLine.test(g) &&
            ((a +=
              g +
              `
`),
            (e = e.substring(g.length + 1)),
            (o = !0)),
          !o)
        ) {
          const q = this.rules.other.nextBulletRegex(d),
            Q = this.rules.other.hrRegex(d),
            U = this.rules.other.fencesBeginRegex(d),
            V = this.rules.other.headingBeginRegex(d),
            te = this.rules.other.htmlBeginRegex(d);
          for (; e; ) {
            const D = e.split(
              `
`,
              1
            )[0];
            let C;
            if (
              ((g = D),
              this.options.pedantic
                ? ((g = g.replace(this.rules.other.listReplaceNesting, "  ")),
                  (C = g))
                : (C = g.replace(this.rules.other.tabCharGlobal, "    ")),
              U.test(g) || V.test(g) || te.test(g) || q.test(g) || Q.test(g))
            )
              break;
            if (C.search(this.rules.other.nonSpaceChar) >= d || !g.trim())
              h +=
                `
` + C.slice(d);
            else {
              if (
                b ||
                p
                  .replace(this.rules.other.tabCharGlobal, "    ")
                  .search(this.rules.other.nonSpaceChar) >= 4 ||
                U.test(p) ||
                V.test(p) ||
                Q.test(p)
              )
                break;
              h +=
                `
` + g;
            }
            !b && !g.trim() && (b = !0),
              (a +=
                D +
                `
`),
              (e = e.substring(D.length + 1)),
              (p = C.slice(d));
          }
        }
        s.loose ||
          (l
            ? (s.loose = !0)
            : this.rules.other.doubleBlankLine.test(a) && (l = !0));
        let w = null,
          $;
        this.options.gfm &&
          ((w = this.rules.other.listIsTask.exec(h)),
          w &&
            (($ = w[0] !== "[ ] "),
            (h = h.replace(this.rules.other.listReplaceTask, "")))),
          s.items.push({
            type: "list_item",
            raw: a,
            task: !!w,
            checked: $,
            loose: !1,
            text: h,
            tokens: [],
          }),
          (s.raw += a);
      }
      const c = s.items.at(-1);
      if (c) (c.raw = c.raw.trimEnd()), (c.text = c.text.trimEnd());
      else return;
      s.raw = s.raw.trimEnd();
      for (let o = 0; o < s.items.length; o++)
        if (
          ((this.lexer.state.top = !1),
          (s.items[o].tokens = this.lexer.blockTokens(s.items[o].text, [])),
          !s.loose)
        ) {
          const a = s.items[o].tokens.filter((p) => p.type === "space"),
            h =
              a.length > 0 &&
              a.some((p) => this.rules.other.anyLine.test(p.raw));
          s.loose = h;
        }
      if (s.loose)
        for (let o = 0; o < s.items.length; o++) s.items[o].loose = !0;
      return s;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0],
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1]
          .toLowerCase()
          .replace(this.rules.other.multipleSpaceGlobal, " "),
        r = t[2]
          ? t[2]
              .replace(this.rules.other.hrefBrackets, "$1")
              .replace(this.rules.inline.anyPunctuation, "$1")
          : "",
        s = t[3]
          ? t[3]
              .substring(1, t[3].length - 1)
              .replace(this.rules.inline.anyPunctuation, "$1")
          : t[3];
      return { type: "def", tag: n, raw: t[0], href: r, title: s };
    }
  }
  table(e) {
    var l;
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    const n = ye(t[1]),
      r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"),
      s =
        (l = t[3]) != null && l.trim()
          ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`)
          : [],
      i = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (const c of r)
        this.rules.other.tableAlignRight.test(c)
          ? i.align.push("right")
          : this.rules.other.tableAlignCenter.test(c)
          ? i.align.push("center")
          : this.rules.other.tableAlignLeft.test(c)
          ? i.align.push("left")
          : i.align.push(null);
      for (let c = 0; c < n.length; c++)
        i.header.push({
          text: n[c],
          tokens: this.lexer.inline(n[c]),
          header: !0,
          align: i.align[c],
        });
      for (const c of s)
        i.rows.push(
          ye(c, i.header.length).map((o, a) => ({
            text: o,
            tokens: this.lexer.inline(o),
            header: !1,
            align: i.align[a],
          }))
        );
      return i;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1]),
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n =
        t[1].charAt(t[1].length - 1) ===
        `
`
          ? t[1].slice(0, -1)
          : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n),
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0]),
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return (
        !this.lexer.state.inLink && this.rules.other.startATag.test(t[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            this.rules.other.endATag.test(t[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        this.rules.other.startPreScriptTag.test(t[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            this.rules.other.endPreScriptTag.test(t[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: "html",
          raw: t[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: t[0],
        }
      );
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (
        !this.options.pedantic &&
        this.rules.other.startAngleBracket.test(n)
      ) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        const i = H(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0) return;
      } else {
        const i = It(t[2], "()");
        if (i > -1) {
          const c = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          (t[2] = t[2].substring(0, i)),
            (t[0] = t[0].substring(0, c).trim()),
            (t[3] = "");
        }
      }
      let r = t[2],
        s = "";
      if (this.options.pedantic) {
        const i = this.rules.other.pedanticHrefTitle.exec(r);
        i && ((r = i[1]), (s = i[3]));
      } else s = t[3] ? t[3].slice(1, -1) : "";
      return (
        (r = r.trim()),
        this.rules.other.startAngleBracket.test(r) &&
          (this.options.pedantic && !this.rules.other.endAngleBracket.test(n)
            ? (r = r.slice(1))
            : (r = r.slice(1, -1))),
        Se(
          t,
          {
            href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
            title: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
          },
          t[0],
          this.lexer,
          this.rules
        )
      );
    }
  }
  reflink(e, t) {
    let n;
    if (
      (n = this.rules.inline.reflink.exec(e)) ||
      (n = this.rules.inline.nolink.exec(e))
    ) {
      const r = (n[2] || n[1]).replace(
          this.rules.other.multipleSpaceGlobal,
          " "
        ),
        s = t[r.toLowerCase()];
      if (!s) {
        const i = n[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return Se(n, s, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || (r[3] && n.match(this.rules.other.unicodeAlphaNumeric))) return;
    if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...r[0]].length - 1;
      let l,
        c,
        o = i,
        a = 0;
      const h =
        r[0][0] === "*"
          ? this.rules.inline.emStrongRDelimAst
          : this.rules.inline.emStrongRDelimUnd;
      for (
        h.lastIndex = 0, t = t.slice(-1 * e.length + i);
        (r = h.exec(t)) != null;

      ) {
        if (((l = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]), !l)) continue;
        if (((c = [...l].length), r[3] || r[4])) {
          o += c;
          continue;
        } else if ((r[5] || r[6]) && i % 3 && !((i + c) % 3)) {
          a += c;
          continue;
        }
        if (((o -= c), o > 0)) continue;
        c = Math.min(c, c + o + a);
        const p = [...r[0]][0].length,
          g = e.slice(0, i + r.index + p + c);
        if (Math.min(i, c) % 2) {
          const d = g.slice(1, -1);
          return {
            type: "em",
            raw: g,
            text: d,
            tokens: this.lexer.inlineTokens(d),
          };
        }
        const b = g.slice(2, -2);
        return {
          type: "strong",
          raw: g,
          text: b,
          tokens: this.lexer.inlineTokens(b),
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const r = this.rules.other.nonSpaceChar.test(n),
        s =
          this.rules.other.startingSpaceChar.test(n) &&
          this.rules.other.endingSpaceChar.test(n);
      return (
        r && s && (n = n.substring(1, n.length - 1)),
        { type: "codespan", raw: t[0], text: n }
      );
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2]),
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, r;
      return (
        t[2] === "@"
          ? ((n = t[1]), (r = "mailto:" + n))
          : ((n = t[1]), (r = n)),
        {
          type: "link",
          raw: t[0],
          text: n,
          href: r,
          tokens: [{ type: "text", raw: n, text: n }],
        }
      );
    }
  }
  url(e) {
    var n;
    let t;
    if ((t = this.rules.inline.url.exec(e))) {
      let r, s;
      if (t[2] === "@") (r = t[0]), (s = "mailto:" + r);
      else {
        let i;
        do
          (i = t[0]),
            (t[0] =
              ((n = this.rules.inline._backpedal.exec(t[0])) == null
                ? void 0
                : n[0]) ?? "");
        while (i !== t[0]);
        (r = t[0]), t[1] === "www." ? (s = "http://" + t[0]) : (s = t[0]);
      }
      return {
        type: "link",
        raw: t[0],
        text: r,
        href: s,
        tokens: [{ type: "text", raw: r, text: r }],
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: n };
    }
  }
}
class v {
  constructor(e) {
    m(this, "tokens");
    m(this, "options");
    m(this, "state");
    m(this, "tokenizer");
    m(this, "inlineQueue");
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || B),
      (this.options.tokenizer = this.options.tokenizer || new K()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
    const t = { other: S, block: X.normal, inline: N.normal };
    this.options.pedantic
      ? ((t.block = X.pedantic), (t.inline = N.pedantic))
      : this.options.gfm &&
        ((t.block = X.gfm),
        this.options.breaks ? (t.inline = N.breaks) : (t.inline = N.gfm)),
      (this.tokenizer.rules = t);
  }
  static get rules() {
    return { block: X, inline: N };
  }
  static lex(e, t) {
    return new v(t).lex(e);
  }
  static lexInline(e, t) {
    return new v(t).inlineTokens(e);
  }
  lex(e) {
    (e = e.replace(
      S.carriageReturn,
      `
`
    )),
      this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return (this.inlineQueue = []), this.tokens;
  }
  blockTokens(e, t = [], n = !1) {
    var r, s, i;
    for (
      this.options.pedantic &&
      (e = e.replace(S.tabCharGlobal, "    ").replace(S.spaceLine, ""));
      e;

    ) {
      let l;
      if (
        (s = (r = this.options.extensions) == null ? void 0 : r.block) !=
          null &&
        s.some((o) =>
          (l = o.call({ lexer: this }, e, t))
            ? ((e = e.substring(l.raw.length)), t.push(l), !0)
            : !1
        )
      )
        continue;
      if ((l = this.tokenizer.space(e))) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        l.raw.length === 1 && o !== void 0
          ? (o.raw += `
`)
          : t.push(l);
        continue;
      }
      if ((l = this.tokenizer.code(e))) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" ||
        (o == null ? void 0 : o.type) === "text"
          ? ((o.raw +=
              `
` + l.raw),
            (o.text +=
              `
` + l.text),
            (this.inlineQueue.at(-1).src = o.text))
          : t.push(l);
        continue;
      }
      if ((l = this.tokenizer.fences(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.heading(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.hr(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.blockquote(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.list(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.html(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.def(e))) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" ||
        (o == null ? void 0 : o.type) === "text"
          ? ((o.raw +=
              `
` + l.raw),
            (o.text +=
              `
` + l.raw),
            (this.inlineQueue.at(-1).src = o.text))
          : this.tokens.links[l.tag] ||
            (this.tokens.links[l.tag] = { href: l.href, title: l.title });
        continue;
      }
      if ((l = this.tokenizer.table(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      if ((l = this.tokenizer.lheading(e))) {
        (e = e.substring(l.raw.length)), t.push(l);
        continue;
      }
      let c = e;
      if ((i = this.options.extensions) != null && i.startBlock) {
        let o = 1 / 0;
        const a = e.slice(1);
        let h;
        this.options.extensions.startBlock.forEach((p) => {
          (h = p.call({ lexer: this }, a)),
            typeof h == "number" && h >= 0 && (o = Math.min(o, h));
        }),
          o < 1 / 0 && o >= 0 && (c = e.substring(0, o + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(c))) {
        const o = t.at(-1);
        n && (o == null ? void 0 : o.type) === "paragraph"
          ? ((o.raw +=
              `
` + l.raw),
            (o.text +=
              `
` + l.text),
            this.inlineQueue.pop(),
            (this.inlineQueue.at(-1).src = o.text))
          : t.push(l),
          (n = c.length !== e.length),
          (e = e.substring(l.raw.length));
        continue;
      }
      if ((l = this.tokenizer.text(e))) {
        e = e.substring(l.raw.length);
        const o = t.at(-1);
        (o == null ? void 0 : o.type) === "text"
          ? ((o.raw +=
              `
` + l.raw),
            (o.text +=
              `
` + l.text),
            this.inlineQueue.pop(),
            (this.inlineQueue.at(-1).src = o.text))
          : t.push(l);
        continue;
      }
      if (e) {
        const o = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(o);
          break;
        } else throw new Error(o);
      }
    }
    return (this.state.top = !0), t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    var l, c, o;
    let n = e,
      r = null;
    if (this.tokens.links) {
      const a = Object.keys(this.tokens.links);
      if (a.length > 0)
        for (
          ;
          (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null;

        )
          a.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) &&
            (n =
              n.slice(0, r.index) +
              "[" +
              "a".repeat(r[0].length - 2) +
              "]" +
              n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; )
      n =
        n.slice(0, r.index) +
        "[" +
        "a".repeat(r[0].length - 2) +
        "]" +
        n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; )
      n =
        n.slice(0, r.index) +
        "++" +
        n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let s = !1,
      i = "";
    for (; e; ) {
      s || (i = ""), (s = !1);
      let a;
      if (
        (c = (l = this.options.extensions) == null ? void 0 : l.inline) !=
          null &&
        c.some((p) =>
          (a = p.call({ lexer: this }, e, t))
            ? ((e = e.substring(a.raw.length)), t.push(a), !0)
            : !1
        )
      )
        continue;
      if ((a = this.tokenizer.escape(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.tag(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.link(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.reflink(e, this.tokens.links))) {
        e = e.substring(a.raw.length);
        const p = t.at(-1);
        a.type === "text" && (p == null ? void 0 : p.type) === "text"
          ? ((p.raw += a.raw), (p.text += a.text))
          : t.push(a);
        continue;
      }
      if ((a = this.tokenizer.emStrong(e, n, i))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.codespan(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.br(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.del(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if ((a = this.tokenizer.autolink(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      if (!this.state.inLink && (a = this.tokenizer.url(e))) {
        (e = e.substring(a.raw.length)), t.push(a);
        continue;
      }
      let h = e;
      if ((o = this.options.extensions) != null && o.startInline) {
        let p = 1 / 0;
        const g = e.slice(1);
        let b;
        this.options.extensions.startInline.forEach((d) => {
          (b = d.call({ lexer: this }, g)),
            typeof b == "number" && b >= 0 && (p = Math.min(p, b));
        }),
          p < 1 / 0 && p >= 0 && (h = e.substring(0, p + 1));
      }
      if ((a = this.tokenizer.inlineText(h))) {
        (e = e.substring(a.raw.length)),
          a.raw.slice(-1) !== "_" && (i = a.raw.slice(-1)),
          (s = !0);
        const p = t.at(-1);
        (p == null ? void 0 : p.type) === "text"
          ? ((p.raw += a.raw), (p.text += a.text))
          : t.push(a);
        continue;
      }
      if (e) {
        const p = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(p);
          break;
        } else throw new Error(p);
      }
    }
    return t;
  }
}
class J {
  constructor(e) {
    m(this, "options");
    m(this, "parser");
    this.options = e || B;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var i;
    const r = (i = (t || "").match(S.notSpaceStart)) == null ? void 0 : i[0],
      s =
        e.replace(S.endingNewline, "") +
        `
`;
    return r
      ? '<pre><code class="language-' +
          T(r) +
          '">' +
          (n ? s : T(s, !0)) +
          `</code></pre>
`
      : "<pre><code>" +
          (n ? s : T(s, !0)) +
          `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered,
      n = e.start;
    let r = "";
    for (let l = 0; l < e.items.length; l++) {
      const c = e.items[l];
      r += this.listitem(c);
    }
    const s = t ? "ol" : "ul",
      i = t && n !== 1 ? ' start="' + n + '"' : "";
    return (
      "<" +
      s +
      i +
      `>
` +
      r +
      "</" +
      s +
      `>
`
    );
  }
  listitem(e) {
    var n;
    let t = "";
    if (e.task) {
      const r = this.checkbox({ checked: !!e.checked });
      e.loose
        ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph"
          ? ((e.tokens[0].text = r + " " + e.tokens[0].text),
            e.tokens[0].tokens &&
              e.tokens[0].tokens.length > 0 &&
              e.tokens[0].tokens[0].type === "text" &&
              ((e.tokens[0].tokens[0].text =
                r + " " + T(e.tokens[0].tokens[0].text)),
              (e.tokens[0].tokens[0].escaped = !0)))
          : e.tokens.unshift({
              type: "text",
              raw: r + " ",
              text: r + " ",
              escaped: !0,
            })
        : (t += r + " ");
    }
    return (
      (t += this.parser.parse(e.tokens, !!e.loose)),
      `<li>${t}</li>
`
    );
  }
  checkbox({ checked: e }) {
    return (
      "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    );
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "",
      n = "";
    for (let s = 0; s < e.header.length; s++) n += this.tablecell(e.header[s]);
    t += this.tablerow({ text: n });
    let r = "";
    for (let s = 0; s < e.rows.length; s++) {
      const i = e.rows[s];
      n = "";
      for (let l = 0; l < i.length; l++) n += this.tablecell(i[l]);
      r += this.tablerow({ text: n });
    }
    return (
      r && (r = `<tbody>${r}</tbody>`),
      `<table>
<thead>
` +
        t +
        `</thead>
` +
        r +
        `</table>
`
    );
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens),
      n = e.header ? "th" : "td";
    return (
      (e.align ? `<${n} align="${e.align}">` : `<${n}>`) +
      t +
      `</${n}>
`
    );
  }
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${T(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const r = this.parser.parseInline(n),
      s = we(e);
    if (s === null) return r;
    e = s;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + T(t) + '"'), (i += ">" + r + "</a>"), i;
  }
  image({ href: e, title: t, text: n }) {
    const r = we(e);
    if (r === null) return T(n);
    e = r;
    let s = `<img src="${e}" alt="${n}"`;
    return t && (s += ` title="${T(t)}"`), (s += ">"), s;
  }
  text(e) {
    return "tokens" in e && e.tokens
      ? this.parser.parseInline(e.tokens)
      : "escaped" in e && e.escaped
      ? e.text
      : T(e.text);
  }
}
class ge {
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class R {
  constructor(e) {
    m(this, "options");
    m(this, "renderer");
    m(this, "textRenderer");
    (this.options = e || B),
      (this.options.renderer = this.options.renderer || new J()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.renderer.parser = this),
      (this.textRenderer = new ge());
  }
  static parse(e, t) {
    return new R(t).parse(e);
  }
  static parseInline(e, t) {
    return new R(t).parseInline(e);
  }
  parse(e, t = !0) {
    var r, s;
    let n = "";
    for (let i = 0; i < e.length; i++) {
      const l = e[i];
      if (
        (s = (r = this.options.extensions) == null ? void 0 : r.renderers) !=
          null &&
        s[l.type]
      ) {
        const o = l,
          a = this.options.extensions.renderers[o.type].call(
            { parser: this },
            o
          );
        if (
          a !== !1 ||
          ![
            "space",
            "hr",
            "heading",
            "code",
            "table",
            "blockquote",
            "list",
            "html",
            "paragraph",
            "text",
          ].includes(o.type)
        ) {
          n += a || "";
          continue;
        }
      }
      const c = l;
      switch (c.type) {
        case "space": {
          n += this.renderer.space(c);
          continue;
        }
        case "hr": {
          n += this.renderer.hr(c);
          continue;
        }
        case "heading": {
          n += this.renderer.heading(c);
          continue;
        }
        case "code": {
          n += this.renderer.code(c);
          continue;
        }
        case "table": {
          n += this.renderer.table(c);
          continue;
        }
        case "blockquote": {
          n += this.renderer.blockquote(c);
          continue;
        }
        case "list": {
          n += this.renderer.list(c);
          continue;
        }
        case "html": {
          n += this.renderer.html(c);
          continue;
        }
        case "paragraph": {
          n += this.renderer.paragraph(c);
          continue;
        }
        case "text": {
          let o = c,
            a = this.renderer.text(o);
          for (; i + 1 < e.length && e[i + 1].type === "text"; )
            (o = e[++i]),
              (a +=
                `
` + this.renderer.text(o));
          t
            ? (n += this.renderer.paragraph({
                type: "paragraph",
                raw: a,
                text: a,
                tokens: [{ type: "text", raw: a, text: a, escaped: !0 }],
              }))
            : (n += a);
          continue;
        }
        default: {
          const o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
  parseInline(e, t = this.renderer) {
    var r, s;
    let n = "";
    for (let i = 0; i < e.length; i++) {
      const l = e[i];
      if (
        (s = (r = this.options.extensions) == null ? void 0 : r.renderers) !=
          null &&
        s[l.type]
      ) {
        const o = this.options.extensions.renderers[l.type].call(
          { parser: this },
          l
        );
        if (
          o !== !1 ||
          ![
            "escape",
            "html",
            "link",
            "image",
            "strong",
            "em",
            "codespan",
            "br",
            "del",
            "text",
          ].includes(l.type)
        ) {
          n += o || "";
          continue;
        }
      }
      const c = l;
      switch (c.type) {
        case "escape": {
          n += t.text(c);
          break;
        }
        case "html": {
          n += t.html(c);
          break;
        }
        case "link": {
          n += t.link(c);
          break;
        }
        case "image": {
          n += t.image(c);
          break;
        }
        case "strong": {
          n += t.strong(c);
          break;
        }
        case "em": {
          n += t.em(c);
          break;
        }
        case "codespan": {
          n += t.codespan(c);
          break;
        }
        case "br": {
          n += t.br(c);
          break;
        }
        case "del": {
          n += t.del(c);
          break;
        }
        case "text": {
          n += t.text(c);
          break;
        }
        default: {
          const o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
}
class j {
  constructor(e) {
    m(this, "options");
    m(this, "block");
    this.options = e || B;
  }
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
  processAllTokens(e) {
    return e;
  }
  provideLexer() {
    return this.block ? v.lex : v.lexInline;
  }
  provideParser() {
    return this.block ? R.parse : R.parseInline;
  }
}
m(
  j,
  "passThroughHooks",
  new Set(["preprocess", "postprocess", "processAllTokens"])
);
class qt {
  constructor(...e) {
    m(this, "defaults", le());
    m(this, "options", this.setOptions);
    m(this, "parse", this.parseMarkdown(!0));
    m(this, "parseInline", this.parseMarkdown(!1));
    m(this, "Parser", R);
    m(this, "Renderer", J);
    m(this, "TextRenderer", ge);
    m(this, "Lexer", v);
    m(this, "Tokenizer", K);
    m(this, "Hooks", j);
    this.use(...e);
  }
  walkTokens(e, t) {
    var r, s;
    let n = [];
    for (const i of e)
      switch (((n = n.concat(t.call(this, i))), i.type)) {
        case "table": {
          const l = i;
          for (const c of l.header) n = n.concat(this.walkTokens(c.tokens, t));
          for (const c of l.rows)
            for (const o of c) n = n.concat(this.walkTokens(o.tokens, t));
          break;
        }
        case "list": {
          const l = i;
          n = n.concat(this.walkTokens(l.items, t));
          break;
        }
        default: {
          const l = i;
          (s =
            (r = this.defaults.extensions) == null ? void 0 : r.childTokens) !=
            null && s[l.type]
            ? this.defaults.extensions.childTokens[l.type].forEach((c) => {
                const o = l[c].flat(1 / 0);
                n = n.concat(this.walkTokens(o, t));
              })
            : l.tokens && (n = n.concat(this.walkTokens(l.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return (
      e.forEach((n) => {
        const r = { ...n };
        if (
          ((r.async = this.defaults.async || r.async || !1),
          n.extensions &&
            (n.extensions.forEach((s) => {
              if (!s.name) throw new Error("extension name required");
              if ("renderer" in s) {
                const i = t.renderers[s.name];
                i
                  ? (t.renderers[s.name] = function (...l) {
                      let c = s.renderer.apply(this, l);
                      return c === !1 && (c = i.apply(this, l)), c;
                    })
                  : (t.renderers[s.name] = s.renderer);
              }
              if ("tokenizer" in s) {
                if (!s.level || (s.level !== "block" && s.level !== "inline"))
                  throw new Error(
                    "extension level must be 'block' or 'inline'"
                  );
                const i = t[s.level];
                i ? i.unshift(s.tokenizer) : (t[s.level] = [s.tokenizer]),
                  s.start &&
                    (s.level === "block"
                      ? t.startBlock
                        ? t.startBlock.push(s.start)
                        : (t.startBlock = [s.start])
                      : s.level === "inline" &&
                        (t.startInline
                          ? t.startInline.push(s.start)
                          : (t.startInline = [s.start])));
              }
              "childTokens" in s &&
                s.childTokens &&
                (t.childTokens[s.name] = s.childTokens);
            }),
            (r.extensions = t)),
          n.renderer)
        ) {
          const s = this.defaults.renderer || new J(this.defaults);
          for (const i in n.renderer) {
            if (!(i in s)) throw new Error(`renderer '${i}' does not exist`);
            if (["options", "parser"].includes(i)) continue;
            const l = i,
              c = n.renderer[l],
              o = s[l];
            s[l] = (...a) => {
              let h = c.apply(s, a);
              return h === !1 && (h = o.apply(s, a)), h || "";
            };
          }
          r.renderer = s;
        }
        if (n.tokenizer) {
          const s = this.defaults.tokenizer || new K(this.defaults);
          for (const i in n.tokenizer) {
            if (!(i in s)) throw new Error(`tokenizer '${i}' does not exist`);
            if (["options", "rules", "lexer"].includes(i)) continue;
            const l = i,
              c = n.tokenizer[l],
              o = s[l];
            s[l] = (...a) => {
              let h = c.apply(s, a);
              return h === !1 && (h = o.apply(s, a)), h;
            };
          }
          r.tokenizer = s;
        }
        if (n.hooks) {
          const s = this.defaults.hooks || new j();
          for (const i in n.hooks) {
            if (!(i in s)) throw new Error(`hook '${i}' does not exist`);
            if (["options", "block"].includes(i)) continue;
            const l = i,
              c = n.hooks[l],
              o = s[l];
            j.passThroughHooks.has(i)
              ? (s[l] = (a) => {
                  if (this.defaults.async)
                    return Promise.resolve(c.call(s, a)).then((p) =>
                      o.call(s, p)
                    );
                  const h = c.call(s, a);
                  return o.call(s, h);
                })
              : (s[l] = (...a) => {
                  let h = c.apply(s, a);
                  return h === !1 && (h = o.apply(s, a)), h;
                });
          }
          r.hooks = s;
        }
        if (n.walkTokens) {
          const s = this.defaults.walkTokens,
            i = n.walkTokens;
          r.walkTokens = function (l) {
            let c = [];
            return (
              c.push(i.call(this, l)), s && (c = c.concat(s.call(this, l))), c
            );
          };
        }
        this.defaults = { ...this.defaults, ...r };
      }),
      this
    );
  }
  setOptions(e) {
    return (this.defaults = { ...this.defaults, ...e }), this;
  }
  lexer(e, t) {
    return v.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return R.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, r) => {
      const s = { ...r },
        i = { ...this.defaults, ...s },
        l = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && s.async === !1)
        return l(
          new Error(
            "marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."
          )
        );
      if (typeof n > "u" || n === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return l(
          new Error(
            "marked(): input parameter is of type " +
              Object.prototype.toString.call(n) +
              ", string expected"
          )
        );
      i.hooks && ((i.hooks.options = i), (i.hooks.block = e));
      const c = i.hooks ? i.hooks.provideLexer() : e ? v.lex : v.lexInline,
        o = i.hooks ? i.hooks.provideParser() : e ? R.parse : R.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n)
          .then((a) => c(a, i))
          .then((a) => (i.hooks ? i.hooks.processAllTokens(a) : a))
          .then((a) =>
            i.walkTokens
              ? Promise.all(this.walkTokens(a, i.walkTokens)).then(() => a)
              : a
          )
          .then((a) => o(a, i))
          .then((a) => (i.hooks ? i.hooks.postprocess(a) : a))
          .catch(l);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let a = c(n, i);
        i.hooks && (a = i.hooks.processAllTokens(a)),
          i.walkTokens && this.walkTokens(a, i.walkTokens);
        let h = o(a, i);
        return i.hooks && (h = i.hooks.postprocess(h)), h;
      } catch (a) {
        return l(a);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (
        ((n.message += `
Please report this to https://github.com/markedjs/marked.`),
        e)
      ) {
        const r =
          "<p>An error occurred:</p><pre>" + T(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
}
const I = new qt();
function f(u, e) {
  return I.parse(u, e);
}
f.options = f.setOptions = function (u) {
  return I.setOptions(u), (f.defaults = I.defaults), $e(f.defaults), f;
};
f.getDefaults = le;
f.defaults = B;
f.use = function (...u) {
  return I.use(...u), (f.defaults = I.defaults), $e(f.defaults), f;
};
f.walkTokens = function (u, e) {
  return I.walkTokens(u, e);
};
f.parseInline = I.parseInline;
f.Parser = R;
f.parser = R.parse;
f.Renderer = J;
f.TextRenderer = ge;
f.Lexer = v;
f.lexer = v.lex;
f.Tokenizer = K;
f.Hooks = j;
f.parse = f;
f.options;
f.setOptions;
f.use;
f.walkTokens;
f.parseInline;
R.parse;
v.lex;
const Dt = { class: "page-wrapper" },
  Zt = { class: "mobile-menu-wrapper md:hidden" },
  Mt = {
    key: 0,
    class:
      "sidebar hidden md:block fixed top-[60px] left-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto",
  },
  Gt = {
    key: 0,
    class:
      "content-header fixed top-[76px] right-6 z-10 flex items-center gap-3",
  },
  Nt = { key: 0, class: "branch-select-wrapper" },
  Ht = ["value"],
  Ot = { key: 0, class: "editor-container mt-4" },
  jt = { key: 1, class: "prose-content max-w-[960px] mx-auto px-6 py-8" },
  Ft = ["innerHTML"],
  Qt = Ge({
    __name: "[...slug]",
    setup(u) {
      const {
          getRawContent: e,
          saveFileContent: t,
          isLoggedIn: n,
          currentBranch: r,
          getBranches: s,
        } = Je(),
        { showToast: i } = We();
      A(!1);
      const l = A(!1),
        c = A(""),
        o = A(""),
        a = A(0);
      A(null);
      const h = A([]),
        p = Ne(),
        g = p.params.slug || [],
        b = Array.isArray(g) ? g.join("/") : g,
        d = fe(() => b !== ""),
        w = fe(() => (b ? `content/${b}.md` : "content/index.md")),
        $ = async () => {
          if (n.value)
            try {
              const x = await e(
                "tiresomefanatic",
                "heroechotest",
                w.value,
                r.value
              );
              (c.value = f(x)), (o.value = x), a.value++;
            } catch (x) {
              console.error("Error loading GitHub content:", x),
                i({
                  title: "Error",
                  message: "Failed to load content from GitHub",
                  type: "error",
                });
            }
        },
        q = async () => {
          document.visibilityState === "visible" &&
            !l.value &&
            n.value &&
            (await $());
        },
        Q = async () => {
          if (!n.value) {
            i({
              title: "Authentication Required",
              message: "Please sign in with GitHub to edit content",
              type: "warning",
            });
            return;
          }
          (l.value = !0), await $();
        },
        U = (x) => {
          o.value = x;
        },
        V = async (x) => {
          if (!x || !n.value) {
            i({
              title: "Error",
              message: "Please sign in to save changes",
              type: "error",
            });
            return;
          }
          try {
            if (
              await t(
                "tiresomefanatic",
                "heroechotest",
                w.value,
                x,
                `Update ${w.value}`,
                r.value
              )
            )
              (c.value = f(x)),
                (o.value = x),
                a.value++,
                i({
                  title: "Success",
                  message: `Content saved successfully to branch: ${r.value}`,
                  type: "success",
                }),
                (l.value = !1),
                await $();
            else throw new Error(`Failed to save to branch: ${r.value}`);
          } catch (z) {
            console.error("Error saving content:", z),
              i({
                title: "Error",
                message: `Failed to save to branch: ${r.value}`,
                type: "error",
              });
          }
        },
        te = (x) => {
          i({ title: "Editor Error", message: x.message, type: "error" });
        },
        D = async () => {
          await $(), (l.value = !1);
        },
        C = (x) => {
          (o.value = x), (c.value = f(x)), a.value++, (l.value = !0);
        },
        Ie = async () => {
          await $();
        };
      return (
        se(l, async (x, z) => {
          x && !z && (await $());
        }),
        se(
          () => p.path,
          async () => {
            n.value && !l.value && (await $());
          }
        ),
        se(n, async (x) => {
          x && !l.value && (await $());
        }),
        He(async () => {
          n.value && !l.value && (await $()),
            document.addEventListener("visibilitychange", q);
          const x = await s("tiresomefanatic", "heroechotest");
          h.value = x;
        }),
        Oe(() => {
          document.removeEventListener("visibilitychange", q);
        }),
        (x, z) => {
          const ne = Ze,
            Be = Me;
          return (
            y(),
            _("div", Dt, [
              L(ne, null, {
                default: M(() => [
                  E("div", null, [
                    L(je),
                    E(
                      "div",
                      {
                        class: de([
                          "content-area",
                          { "editing-mode": l.value },
                        ]),
                      },
                      [
                        E("div", Zt, [L(me)]),
                        !l.value && d.value
                          ? (y(), _("aside", Mt, [L(me)]))
                          : G("", !0),
                        E(
                          "div",
                          {
                            class: de([
                              "main-content flex-1",
                              { "md:ml-64": !l.value && d.value },
                            ]),
                          },
                          [
                            P(n)
                              ? (y(),
                                _("div", Gt, [
                                  L(ne, null, {
                                    default: M(() => [
                                      h.value.length > 0
                                        ? (y(),
                                          _("div", Nt, [
                                            Fe(
                                              E(
                                                "select",
                                                {
                                                  "onUpdate:modelValue":
                                                    z[0] ||
                                                    (z[0] = (Z) =>
                                                      Ue(r)
                                                        ? (r.value = Z)
                                                        : null),
                                                  onChange: Ie,
                                                  class:
                                                    "branch-select px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                },
                                                [
                                                  (y(!0),
                                                  _(
                                                    Ve,
                                                    null,
                                                    Xe(
                                                      h.value,
                                                      (Z) => (
                                                        y(),
                                                        _(
                                                          "option",
                                                          { key: Z, value: Z },
                                                          ke(Z),
                                                          9,
                                                          Ht
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ],
                                                544
                                              ),
                                              [[Qe, P(r)]]
                                            ),
                                          ]))
                                        : G("", !0),
                                      l.value
                                        ? (y(),
                                          _(
                                            "button",
                                            {
                                              key: 2,
                                              onClick: D,
                                              class:
                                                "edit-button px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors",
                                            },
                                            " Exit "
                                          ))
                                        : (y(),
                                          _(
                                            "button",
                                            {
                                              key: 1,
                                              onClick: Q,
                                              class:
                                                "edit-button px-4 py-2 bg-[#0969DA] text-white rounded-md hover:bg-blue-700 transition-colors",
                                            },
                                            " Edit "
                                          )),
                                      P(n)
                                        ? (y(), re(tt, { key: 3 }))
                                        : G("", !0),
                                    ]),
                                    _: 1,
                                  }),
                                ]))
                              : G("", !0),
                            L(ne, null, {
                              default: M(() => [
                                l.value
                                  ? (y(),
                                    _("div", Ot, [
                                      L(
                                        Ye,
                                        {
                                          content: o.value.toString(),
                                          filePath: w.value,
                                          "onUpdate:content": U,
                                          onSave: V,
                                          onError: te,
                                        },
                                        null,
                                        8,
                                        ["content", "filePath"]
                                      ),
                                      P(n)
                                        ? (y(),
                                          re(
                                            et,
                                            {
                                              key: 0,
                                              filePath: w.value,
                                              class: "collaboration-sidebar",
                                              onLoadSave: C,
                                            },
                                            null,
                                            8,
                                            ["filePath"]
                                          ))
                                        : G("", !0),
                                    ]))
                                  : (y(),
                                    _("div", jt, [
                                      (y(),
                                      _("div", { key: c.value }, [
                                        P(n)
                                          ? (y(),
                                            _(
                                              "div",
                                              {
                                                key: 1,
                                                innerHTML: c.value,
                                                class: "markdown-content",
                                              },
                                              null,
                                              8,
                                              Ft
                                            ))
                                          : (y(),
                                            re(
                                              Be,
                                              { key: 0, path: P(b), head: !1 },
                                              {
                                                empty: M(
                                                  () =>
                                                    z[1] ||
                                                    (z[1] = [
                                                      E(
                                                        "p",
                                                        null,
                                                        "No content found.",
                                                        -1
                                                      ),
                                                    ])
                                                ),
                                                "not-found": M(() => [
                                                  E(
                                                    "p",
                                                    null,
                                                    "Content not found. Path: " +
                                                      ke(P(b)),
                                                    1
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["path"]
                                            )),
                                      ])),
                                    ])),
                              ]),
                              _: 1,
                            }),
                          ],
                          2
                        ),
                      ],
                      2
                    ),
                  ]),
                ]),
                _: 1,
              }),
            ])
          );
        }
      );
    },
  }),
  mn = Ke(Qt, [["__scopeId", "data-v-4ae308e1"]]);
export { mn as default };
