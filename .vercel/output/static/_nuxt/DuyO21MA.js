var Fe = Object.defineProperty;
var Ce = (e, r, s) =>
  r in e
    ? Fe(e, r, { enumerable: !0, configurable: !0, writable: !0, value: s })
    : (e[r] = s);
var y = (e, r, s) => Ce(e, typeof r != "symbol" ? r + "" : r, s);
import {
  ai as Ue,
  z as W,
  r as V,
  aj as De,
  i as Le,
  a6 as Ie,
} from "./DOh1AU71.js";
function B() {
  return typeof navigator == "object" && "userAgent" in navigator
    ? navigator.userAgent
    : typeof process == "object" && process.version !== void 0
    ? `Node.js/${process.version.substr(1)} (${process.platform}; ${
        process.arch
      })`
    : "<environment undetectable>";
}
function X(e, r, s, t) {
  if (typeof s != "function")
    throw new Error("method for before hook must be a function");
  return (
    t || (t = {}),
    Array.isArray(r)
      ? r.reverse().reduce((o, n) => X.bind(null, e, n, o, t), s)()
      : Promise.resolve().then(() =>
          e.registry[r]
            ? e.registry[r].reduce((o, n) => n.hook.bind(null, o, t), s)()
            : s(t)
        )
  );
}
function $e(e, r, s, t) {
  const o = t;
  e.registry[s] || (e.registry[s] = []),
    r === "before" &&
      (t = (n, i) =>
        Promise.resolve().then(o.bind(null, i)).then(n.bind(null, i))),
    r === "after" &&
      (t = (n, i) => {
        let a;
        return Promise.resolve()
          .then(n.bind(null, i))
          .then((l) => ((a = l), o(a, i)))
          .then(() => a);
      }),
    r === "error" &&
      (t = (n, i) =>
        Promise.resolve()
          .then(n.bind(null, i))
          .catch((a) => o(a, i))),
    e.registry[s].push({ hook: t, orig: o });
}
function je(e, r, s) {
  if (!e.registry[r]) return;
  const t = e.registry[r].map((o) => o.orig).indexOf(s);
  t !== -1 && e.registry[r].splice(t, 1);
}
const se = Function.bind,
  te = se.bind(se);
function ue(e, r, s) {
  const t = te(je, null).apply(null, s ? [r, s] : [r]);
  (e.api = { remove: t }),
    (e.remove = t),
    ["before", "error", "after", "wrap"].forEach((o) => {
      const n = s ? [r, o, s] : [r, o];
      e[o] = e.api[o] = te($e, null).apply(null, n);
    });
}
function qe() {
  const e = Symbol("Singular"),
    r = { registry: {} },
    s = X.bind(null, r, e);
  return ue(s, r, e), s;
}
function Be() {
  const e = { registry: {} },
    r = X.bind(null, e);
  return ue(r, e), r;
}
const He = { Singular: qe, Collection: Be };
var xe = "0.0.0-development",
  We = `octokit-endpoint.js/${xe} ${B()}`,
  Ve = {
    method: "GET",
    baseUrl: "https://api.github.com",
    headers: { accept: "application/vnd.github.v3+json", "user-agent": We },
    mediaType: { format: "" },
  };
function ze(e) {
  return e
    ? Object.keys(e).reduce((r, s) => ((r[s.toLowerCase()] = e[s]), r), {})
    : {};
}
function Ne(e) {
  if (
    typeof e != "object" ||
    e === null ||
    Object.prototype.toString.call(e) !== "[object Object]"
  )
    return !1;
  const r = Object.getPrototypeOf(e);
  if (r === null) return !0;
  const s =
    Object.prototype.hasOwnProperty.call(r, "constructor") && r.constructor;
  return (
    typeof s == "function" &&
    s instanceof s &&
    Function.prototype.call(s) === Function.prototype.call(e)
  );
}
function ge(e, r) {
  const s = Object.assign({}, e);
  return (
    Object.keys(r).forEach((t) => {
      Ne(r[t])
        ? t in e
          ? (s[t] = ge(e[t], r[t]))
          : Object.assign(s, { [t]: r[t] })
        : Object.assign(s, { [t]: r[t] });
    }),
    s
  );
}
function oe(e) {
  for (const r in e) e[r] === void 0 && delete e[r];
  return e;
}
function M(e, r, s) {
  var o;
  if (typeof r == "string") {
    let [n, i] = r.split(" ");
    s = Object.assign(i ? { method: n, url: i } : { url: n }, s);
  } else s = Object.assign({}, r);
  (s.headers = ze(s.headers)), oe(s), oe(s.headers);
  const t = ge(e || {}, s);
  return (
    s.url === "/graphql" &&
      (e &&
        (o = e.mediaType.previews) != null &&
        o.length &&
        (t.mediaType.previews = e.mediaType.previews
          .filter((n) => !t.mediaType.previews.includes(n))
          .concat(t.mediaType.previews)),
      (t.mediaType.previews = (t.mediaType.previews || []).map((n) =>
        n.replace(/-preview/, "")
      ))),
    t
  );
}
function Me(e, r) {
  const s = /\?/.test(e) ? "&" : "?",
    t = Object.keys(r);
  return t.length === 0
    ? e
    : e +
        s +
        t
          .map((o) =>
            o === "q"
              ? "q=" + r.q.split("+").map(encodeURIComponent).join("+")
              : `${o}=${encodeURIComponent(r[o])}`
          )
          .join("&");
}
var Ke = /\{[^}]+\}/g;
function Je(e) {
  return e.replace(/^\W+|\W+$/g, "").split(/,/);
}
function Xe(e) {
  const r = e.match(Ke);
  return r ? r.map(Je).reduce((s, t) => s.concat(t), []) : [];
}
function ne(e, r) {
  const s = { __proto__: null };
  for (const t of Object.keys(e)) r.indexOf(t) === -1 && (s[t] = e[t]);
  return s;
}
function de(e) {
  return e
    .split(/(%[0-9A-Fa-f]{2})/g)
    .map(function (r) {
      return (
        /%[0-9A-Fa-f]/.test(r) ||
          (r = encodeURI(r).replace(/%5B/g, "[").replace(/%5D/g, "]")),
        r
      );
    })
    .join("");
}
function C(e) {
  return encodeURIComponent(e).replace(/[!'()*]/g, function (r) {
    return "%" + r.charCodeAt(0).toString(16).toUpperCase();
  });
}
function L(e, r, s) {
  return (r = e === "+" || e === "#" ? de(r) : C(r)), s ? C(s) + "=" + r : r;
}
function R(e) {
  return e != null;
}
function z(e) {
  return e === ";" || e === "&" || e === "?";
}
function Ze(e, r, s, t) {
  var o = e[s],
    n = [];
  if (R(o) && o !== "")
    if (typeof o == "string" || typeof o == "number" || typeof o == "boolean")
      (o = o.toString()),
        t && t !== "*" && (o = o.substring(0, parseInt(t, 10))),
        n.push(L(r, o, z(r) ? s : ""));
    else if (t === "*")
      Array.isArray(o)
        ? o.filter(R).forEach(function (i) {
            n.push(L(r, i, z(r) ? s : ""));
          })
        : Object.keys(o).forEach(function (i) {
            R(o[i]) && n.push(L(r, o[i], i));
          });
    else {
      const i = [];
      Array.isArray(o)
        ? o.filter(R).forEach(function (a) {
            i.push(L(r, a));
          })
        : Object.keys(o).forEach(function (a) {
            R(o[a]) && (i.push(C(a)), i.push(L(r, o[a].toString())));
          }),
        z(r)
          ? n.push(C(s) + "=" + i.join(","))
          : i.length !== 0 && n.push(i.join(","));
    }
  else
    r === ";"
      ? R(o) && n.push(C(s))
      : o === "" && (r === "&" || r === "?")
      ? n.push(C(s) + "=")
      : o === "" && n.push("");
  return n;
}
function Ye(e) {
  return { expand: Qe.bind(null, e) };
}
function Qe(e, r) {
  var s = ["+", "#", ".", "/", ";", "?", "&"];
  return (
    (e = e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (t, o, n) {
      if (o) {
        let a = "";
        const l = [];
        if (
          (s.indexOf(o.charAt(0)) !== -1 &&
            ((a = o.charAt(0)), (o = o.substr(1))),
          o.split(/,/g).forEach(function (E) {
            var g = /([^:\*]*)(?::(\d+)|(\*))?/.exec(E);
            l.push(Ze(r, a, g[1], g[2] || g[3]));
          }),
          a && a !== "+")
        ) {
          var i = ",";
          return (
            a === "?" ? (i = "&") : a !== "#" && (i = a),
            (l.length !== 0 ? a : "") + l.join(i)
          );
        } else return l.join(",");
      } else return de(n);
    })),
    e === "/" ? e : e.replace(/\/$/, "")
  );
}
function me(e) {
  var g;
  let r = e.method.toUpperCase(),
    s = (e.url || "/").replace(/:([a-z]\w+)/g, "{$1}"),
    t = Object.assign({}, e.headers),
    o,
    n = ne(e, ["method", "baseUrl", "url", "headers", "request", "mediaType"]);
  const i = Xe(s);
  (s = Ye(s).expand(n)), /^http/.test(s) || (s = e.baseUrl + s);
  const a = Object.keys(e)
      .filter((w) => i.includes(w))
      .concat("baseUrl"),
    l = ne(n, a);
  if (
    !/application\/octet-stream/i.test(t.accept) &&
    (e.mediaType.format &&
      (t.accept = t.accept
        .split(/,/)
        .map((w) =>
          w.replace(
            /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
            `application/vnd$1$2.${e.mediaType.format}`
          )
        )
        .join(",")),
    s.endsWith("/graphql") && (g = e.mediaType.previews) != null && g.length)
  ) {
    const w = t.accept.match(/[\w-]+(?=-preview)/g) || [];
    t.accept = w
      .concat(e.mediaType.previews)
      .map((f) => {
        const T = e.mediaType.format ? `.${e.mediaType.format}` : "+json";
        return `application/vnd.github.${f}-preview${T}`;
      })
      .join(",");
  }
  return (
    ["GET", "HEAD"].includes(r)
      ? (s = Me(s, l))
      : "data" in l
      ? (o = l.data)
      : Object.keys(l).length && (o = l),
    !t["content-type"] &&
      typeof o < "u" &&
      (t["content-type"] = "application/json; charset=utf-8"),
    ["PATCH", "PUT"].includes(r) && typeof o > "u" && (o = ""),
    Object.assign(
      { method: r, url: s, headers: t },
      typeof o < "u" ? { body: o } : null,
      e.request ? { request: e.request } : null
    )
  );
}
function er(e, r, s) {
  return me(M(e, r, s));
}
function Ee(e, r) {
  const s = M(e, r),
    t = er.bind(null, s);
  return Object.assign(t, {
    DEFAULTS: s,
    defaults: Ee.bind(null, s),
    merge: M.bind(null, s),
    parse: me,
  });
}
var rr = Ee(null, Ve),
  F = {},
  ie;
function sr() {
  if (ie) return F;
  ie = 1;
  const e = function () {};
  e.prototype = Object.create(null);
  const r =
      /; *([!#$%&'*+.^\w`|~-]+)=("(?:[\v\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\v\u0020-\u00ff])*"|[!#$%&'*+.^\w`|~-]+) */gu,
    s = /\\([\v\u0020-\u00ff])/gu,
    t = /^[!#$%&'*+.^\w|~-]+\/[!#$%&'*+.^\w|~-]+$/u,
    o = { type: "", parameters: new e() };
  Object.freeze(o.parameters), Object.freeze(o);
  function n(a) {
    if (typeof a != "string")
      throw new TypeError("argument header is required and must be a string");
    let l = a.indexOf(";");
    const E = l !== -1 ? a.slice(0, l).trim() : a.trim();
    if (t.test(E) === !1) throw new TypeError("invalid media type");
    const g = { type: E.toLowerCase(), parameters: new e() };
    if (l === -1) return g;
    let w, f, T;
    for (r.lastIndex = l; (f = r.exec(a)); ) {
      if (f.index !== l) throw new TypeError("invalid parameter format");
      (l += f[0].length),
        (w = f[1].toLowerCase()),
        (T = f[2]),
        T[0] === '"' &&
          ((T = T.slice(1, T.length - 1)),
          s.test(T) && (T = T.replace(s, "$1"))),
        (g.parameters[w] = T);
    }
    if (l !== a.length) throw new TypeError("invalid parameter format");
    return g;
  }
  function i(a) {
    if (typeof a != "string") return o;
    let l = a.indexOf(";");
    const E = l !== -1 ? a.slice(0, l).trim() : a.trim();
    if (t.test(E) === !1) return o;
    const g = { type: E.toLowerCase(), parameters: new e() };
    if (l === -1) return g;
    let w, f, T;
    for (r.lastIndex = l; (f = r.exec(a)); ) {
      if (f.index !== l) return o;
      (l += f[0].length),
        (w = f[1].toLowerCase()),
        (T = f[2]),
        T[0] === '"' &&
          ((T = T.slice(1, T.length - 1)),
          s.test(T) && (T = T.replace(s, "$1"))),
        (g.parameters[w] = T);
    }
    return l !== a.length ? o : g;
  }
  return (
    (F.default = { parse: n, safeParse: i }),
    (F.parse = n),
    (F.safeParse = i),
    (F.defaultContentType = o),
    F
  );
}
var tr = sr();
class j extends Error {
  constructor(s, t, o) {
    super(s);
    y(this, "name");
    y(this, "status");
    y(this, "request");
    y(this, "response");
    (this.name = "HttpError"),
      (this.status = Number.parseInt(t)),
      Number.isNaN(this.status) && (this.status = 0),
      "response" in o && (this.response = o.response);
    const n = Object.assign({}, o.request);
    o.request.headers.authorization &&
      (n.headers = Object.assign({}, o.request.headers, {
        authorization: o.request.headers.authorization.replace(
          / .*$/,
          " [REDACTED]"
        ),
      })),
      (n.url = n.url
        .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]")
        .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]")),
      (this.request = n);
  }
}
var or = "0.0.0-development",
  nr = { headers: { "user-agent": `octokit-request.js/${or} ${B()}` } };
function ir(e) {
  if (
    typeof e != "object" ||
    e === null ||
    Object.prototype.toString.call(e) !== "[object Object]"
  )
    return !1;
  const r = Object.getPrototypeOf(e);
  if (r === null) return !0;
  const s =
    Object.prototype.hasOwnProperty.call(r, "constructor") && r.constructor;
  return (
    typeof s == "function" &&
    s instanceof s &&
    Function.prototype.call(s) === Function.prototype.call(e)
  );
}
async function ae(e) {
  var w, f, T, I, U;
  const r = ((w = e.request) == null ? void 0 : w.fetch) || globalThis.fetch;
  if (!r)
    throw new Error(
      "fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing"
    );
  const s = ((f = e.request) == null ? void 0 : f.log) || console,
    t = ((T = e.request) == null ? void 0 : T.parseSuccessResponseBody) !== !1,
    o = ir(e.body) || Array.isArray(e.body) ? JSON.stringify(e.body) : e.body,
    n = Object.fromEntries(
      Object.entries(e.headers).map(([b, G]) => [b, String(G)])
    );
  let i;
  try {
    i = await r(e.url, {
      method: e.method,
      body: o,
      redirect: (I = e.request) == null ? void 0 : I.redirect,
      headers: n,
      signal: (U = e.request) == null ? void 0 : U.signal,
      ...(e.body && { duplex: "half" }),
    });
  } catch (b) {
    let G = "Unknown Error";
    if (b instanceof Error) {
      if (b.name === "AbortError") throw ((b.status = 500), b);
      (G = b.message),
        b.name === "TypeError" &&
          "cause" in b &&
          (b.cause instanceof Error
            ? (G = b.cause.message)
            : typeof b.cause == "string" && (G = b.cause));
    }
    const A = new j(G, 500, { request: e });
    throw ((A.cause = b), A);
  }
  const a = i.status,
    l = i.url,
    E = {};
  for (const [b, G] of i.headers) E[b] = G;
  const g = { url: l, status: a, headers: E, data: "" };
  if ("deprecation" in E) {
    const b = E.link && E.link.match(/<([^>]+)>; rel="deprecation"/),
      G = b && b.pop();
    s.warn(
      `[@octokit/request] "${e.method} ${
        e.url
      }" is deprecated. It is scheduled to be removed on ${E.sunset}${
        G ? `. See ${G}` : ""
      }`
    );
  }
  if (a === 204 || a === 205) return g;
  if (e.method === "HEAD") {
    if (a < 400) return g;
    throw new j(i.statusText, a, { response: g, request: e });
  }
  if (a === 304)
    throw (
      ((g.data = await N(i)),
      new j("Not modified", a, { response: g, request: e }))
    );
  if (a >= 400)
    throw (
      ((g.data = await N(i)), new j(cr(g.data), a, { response: g, request: e }))
    );
  return (g.data = t ? await N(i) : i.body), g;
}
async function N(e) {
  var t;
  const r = e.headers.get("content-type");
  if (!r) return e.text().catch(() => "");
  const s = tr.safeParse(r);
  if (ar(s)) {
    let o = "";
    try {
      return (o = await e.text()), JSON.parse(o);
    } catch {
      return o;
    }
  } else
    return s.type.startsWith("text/") ||
      ((t = s.parameters.charset) == null ? void 0 : t.toLowerCase()) ===
        "utf-8"
      ? e.text().catch(() => "")
      : e.arrayBuffer().catch(() => new ArrayBuffer(0));
}
function ar(e) {
  return e.type === "application/json" || e.type === "application/scim+json";
}
function cr(e) {
  if (typeof e == "string") return e;
  if (e instanceof ArrayBuffer) return "Unknown error";
  if ("message" in e) {
    const r = "documentation_url" in e ? ` - ${e.documentation_url}` : "";
    return Array.isArray(e.errors)
      ? `${e.message}: ${e.errors.map((s) => JSON.stringify(s)).join(", ")}${r}`
      : `${e.message}${r}`;
  }
  return `Unknown error: ${JSON.stringify(e)}`;
}
function K(e, r) {
  const s = e.defaults(r);
  return Object.assign(
    function (o, n) {
      const i = s.merge(o, n);
      if (!i.request || !i.request.hook) return ae(s.parse(i));
      const a = (l, E) => ae(s.parse(s.merge(l, E)));
      return (
        Object.assign(a, { endpoint: s, defaults: K.bind(null, s) }),
        i.request.hook(a, i)
      );
    },
    { endpoint: s, defaults: K.bind(null, s) }
  );
}
var J = K(rr, nr),
  lr = "0.0.0-development";
function pr(e) {
  return (
    `Request failed due to following response errors:
` +
    e.errors.map((r) => ` - ${r.message}`).join(`
`)
  );
}
var ur = class extends Error {
    constructor(r, s, t) {
      super(pr(t));
      y(this, "name", "GraphqlResponseError");
      y(this, "errors");
      y(this, "data");
      (this.request = r),
        (this.headers = s),
        (this.response = t),
        (this.errors = t.errors),
        (this.data = t.data),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, this.constructor);
    }
  },
  gr = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"],
  dr = ["query", "method", "url"],
  ce = /\/api\/v3\/?$/;
function mr(e, r, s) {
  if (s) {
    if (typeof r == "string" && "query" in s)
      return Promise.reject(
        new Error('[@octokit/graphql] "query" cannot be used as variable name')
      );
    for (const i in s)
      if (dr.includes(i))
        return Promise.reject(
          new Error(`[@octokit/graphql] "${i}" cannot be used as variable name`)
        );
  }
  const t = typeof r == "string" ? Object.assign({ query: r }, s) : r,
    o = Object.keys(t).reduce(
      (i, a) =>
        gr.includes(a)
          ? ((i[a] = t[a]), i)
          : (i.variables || (i.variables = {}), (i.variables[a] = t[a]), i),
      {}
    ),
    n = t.baseUrl || e.endpoint.DEFAULTS.baseUrl;
  return (
    ce.test(n) && (o.url = n.replace(ce, "/api/graphql")),
    e(o).then((i) => {
      if (i.data.errors) {
        const a = {};
        for (const l of Object.keys(i.headers)) a[l] = i.headers[l];
        throw new ur(o, a, i.data);
      }
      return i.data.data;
    })
  );
}
function Z(e, r) {
  const s = e.defaults(r);
  return Object.assign((o, n) => mr(s, o, n), {
    defaults: Z.bind(null, s),
    endpoint: s.endpoint,
  });
}
Z(J, {
  headers: { "user-agent": `octokit-graphql.js/${lr} ${B()}` },
  method: "POST",
  url: "/graphql",
});
function Er(e) {
  return Z(e, { method: "POST", url: "/graphql" });
}
var Tr = /^v1\./,
  hr = /^ghs_/,
  br = /^ghu_/;
async function wr(e) {
  const r = e.split(/\./).length === 3,
    s = Tr.test(e) || hr.test(e),
    t = br.test(e);
  return {
    type: "token",
    token: e,
    tokenType: r ? "app" : s ? "installation" : t ? "user-to-server" : "oauth",
  };
}
function _r(e) {
  return e.split(/\./).length === 3 ? `bearer ${e}` : `token ${e}`;
}
async function fr(e, r, s, t) {
  const o = r.endpoint.merge(s, t);
  return (o.headers.authorization = _r(e)), r(o);
}
var yr = function (r) {
  if (!r)
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  if (typeof r != "string")
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  return (
    (r = r.replace(/^(token|bearer) +/i, "")),
    Object.assign(wr.bind(null, r), { hook: fr.bind(null, r) })
  );
};
const Te = "6.1.3",
  le = () => {},
  vr = console.warn.bind(console),
  Gr = console.error.bind(console),
  pe = `octokit-core.js/${Te} ${B()}`;
var q;
let Pr =
  ((q = class {
    constructor(r = {}) {
      y(this, "request");
      y(this, "graphql");
      y(this, "log");
      y(this, "hook");
      y(this, "auth");
      const s = new He.Collection(),
        t = {
          baseUrl: J.endpoint.DEFAULTS.baseUrl,
          headers: {},
          request: Object.assign({}, r.request, {
            hook: s.bind(null, "request"),
          }),
          mediaType: { previews: [], format: "" },
        };
      if (
        ((t.headers["user-agent"] = r.userAgent ? `${r.userAgent} ${pe}` : pe),
        r.baseUrl && (t.baseUrl = r.baseUrl),
        r.previews && (t.mediaType.previews = r.previews),
        r.timeZone && (t.headers["time-zone"] = r.timeZone),
        (this.request = J.defaults(t)),
        (this.graphql = Er(this.request).defaults(t)),
        (this.log = Object.assign(
          { debug: le, info: le, warn: vr, error: Gr },
          r.log
        )),
        (this.hook = s),
        r.authStrategy)
      ) {
        const { authStrategy: n, ...i } = r,
          a = n(
            Object.assign(
              {
                request: this.request,
                log: this.log,
                octokit: this,
                octokitOptions: i,
              },
              r.auth
            )
          );
        s.wrap("request", a.hook), (this.auth = a);
      } else if (!r.auth) this.auth = async () => ({ type: "unauthenticated" });
      else {
        const n = yr(r.auth);
        s.wrap("request", n.hook), (this.auth = n);
      }
      const o = this.constructor;
      for (let n = 0; n < o.plugins.length; ++n)
        Object.assign(this, o.plugins[n](this, r));
    }
    static defaults(r) {
      return class extends this {
        constructor(...t) {
          const o = t[0] || {};
          if (typeof r == "function") {
            super(r(o));
            return;
          }
          super(
            Object.assign(
              {},
              r,
              o,
              o.userAgent && r.userAgent
                ? { userAgent: `${o.userAgent} ${r.userAgent}` }
                : null
            )
          );
        }
      };
    }
    static plugin(...r) {
      var o;
      const s = this.plugins;
      return (
        (o = class extends this {}),
        y(o, "plugins", s.concat(r.filter((n) => !s.includes(n)))),
        o
      );
    }
  }),
  y(q, "VERSION", Te),
  y(q, "plugins", []),
  q);
const kr = "5.3.1";
function he(e) {
  e.hook.wrap("request", (r, s) => {
    e.log.debug("request", s);
    const t = Date.now(),
      o = e.request.endpoint.parse(s),
      n = o.url.replace(s.baseUrl, "");
    return r(s)
      .then((i) => {
        const a = i.headers["x-github-request-id"];
        return (
          e.log.info(
            `${o.method} ${n} - ${i.status} with id ${a} in ${Date.now() - t}ms`
          ),
          i
        );
      })
      .catch((i) => {
        var l;
        const a =
          ((l = i.response) == null
            ? void 0
            : l.headers["x-github-request-id"]) || "UNKNOWN";
        throw (
          (e.log.error(
            `${o.method} ${n} - ${i.status} with id ${a} in ${Date.now() - t}ms`
          ),
          i)
        );
      });
  });
}
he.VERSION = kr;
var Sr = "0.0.0-development";
function Or(e) {
  if (!e.data) return { ...e, data: [] };
  if (!("total_count" in e.data && !("url" in e.data))) return e;
  const s = e.data.incomplete_results,
    t = e.data.repository_selection,
    o = e.data.total_count;
  delete e.data.incomplete_results,
    delete e.data.repository_selection,
    delete e.data.total_count;
  const n = Object.keys(e.data)[0],
    i = e.data[n];
  return (
    (e.data = i),
    typeof s < "u" && (e.data.incomplete_results = s),
    typeof t < "u" && (e.data.repository_selection = t),
    (e.data.total_count = o),
    e
  );
}
function Y(e, r, s) {
  const t = typeof r == "function" ? r.endpoint(s) : e.request.endpoint(r, s),
    o = typeof r == "function" ? r : e.request,
    n = t.method,
    i = t.headers;
  let a = t.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!a) return { done: !0 };
        try {
          const l = await o({ method: n, url: a, headers: i }),
            E = Or(l);
          return (
            (a = ((E.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) ||
              [])[1]),
            { value: E }
          );
        } catch (l) {
          if (l.status !== 409) throw l;
          return (a = ""), { value: { status: 200, headers: {}, data: [] } };
        }
      },
    }),
  };
}
function be(e, r, s, t) {
  return (
    typeof s == "function" && ((t = s), (s = void 0)),
    we(e, [], Y(e, r, s)[Symbol.asyncIterator](), t)
  );
}
function we(e, r, s, t) {
  return s.next().then((o) => {
    if (o.done) return r;
    let n = !1;
    function i() {
      n = !0;
    }
    return (
      (r = r.concat(t ? t(o.value, i) : o.value.data)), n ? r : we(e, r, s, t)
    );
  });
}
Object.assign(be, { iterator: Y });
function _e(e) {
  return {
    paginate: Object.assign(be.bind(null, e), { iterator: Y.bind(null, e) }),
  };
}
_e.VERSION = Sr;
const Ar = "13.3.0",
  Rr = {
    actions: {
      addCustomLabelsToSelfHostedRunnerForOrg: [
        "POST /orgs/{org}/actions/runners/{runner_id}/labels",
      ],
      addCustomLabelsToSelfHostedRunnerForRepo: [
        "POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels",
      ],
      addRepoAccessToSelfHostedRunnerGroupInOrg: [
        "PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}",
      ],
      addSelectedRepoToOrgSecret: [
        "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}",
      ],
      addSelectedRepoToOrgVariable: [
        "PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}",
      ],
      approveWorkflowRun: [
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve",
      ],
      cancelWorkflowRun: [
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel",
      ],
      createEnvironmentVariable: [
        "POST /repos/{owner}/{repo}/environments/{environment_name}/variables",
      ],
      createOrUpdateEnvironmentSecret: [
        "PUT /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}",
      ],
      createOrUpdateOrgSecret: [
        "PUT /orgs/{org}/actions/secrets/{secret_name}",
      ],
      createOrUpdateRepoSecret: [
        "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
      ],
      createOrgVariable: ["POST /orgs/{org}/actions/variables"],
      createRegistrationTokenForOrg: [
        "POST /orgs/{org}/actions/runners/registration-token",
      ],
      createRegistrationTokenForRepo: [
        "POST /repos/{owner}/{repo}/actions/runners/registration-token",
      ],
      createRemoveTokenForOrg: [
        "POST /orgs/{org}/actions/runners/remove-token",
      ],
      createRemoveTokenForRepo: [
        "POST /repos/{owner}/{repo}/actions/runners/remove-token",
      ],
      createRepoVariable: ["POST /repos/{owner}/{repo}/actions/variables"],
      createWorkflowDispatch: [
        "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
      ],
      deleteActionsCacheById: [
        "DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}",
      ],
      deleteActionsCacheByKey: [
        "DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}",
      ],
      deleteArtifact: [
        "DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
      ],
      deleteEnvironmentSecret: [
        "DELETE /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}",
      ],
      deleteEnvironmentVariable: [
        "DELETE /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}",
      ],
      deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
      deleteOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}"],
      deleteRepoSecret: [
        "DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}",
      ],
      deleteRepoVariable: [
        "DELETE /repos/{owner}/{repo}/actions/variables/{name}",
      ],
      deleteSelfHostedRunnerFromOrg: [
        "DELETE /orgs/{org}/actions/runners/{runner_id}",
      ],
      deleteSelfHostedRunnerFromRepo: [
        "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}",
      ],
      deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
      deleteWorkflowRunLogs: [
        "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs",
      ],
      disableSelectedRepositoryGithubActionsOrganization: [
        "DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}",
      ],
      disableWorkflow: [
        "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable",
      ],
      downloadArtifact: [
        "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}",
      ],
      downloadJobLogsForWorkflowRun: [
        "GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs",
      ],
      downloadWorkflowRunAttemptLogs: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs",
      ],
      downloadWorkflowRunLogs: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs",
      ],
      enableSelectedRepositoryGithubActionsOrganization: [
        "PUT /orgs/{org}/actions/permissions/repositories/{repository_id}",
      ],
      enableWorkflow: [
        "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable",
      ],
      forceCancelWorkflowRun: [
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel",
      ],
      generateRunnerJitconfigForOrg: [
        "POST /orgs/{org}/actions/runners/generate-jitconfig",
      ],
      generateRunnerJitconfigForRepo: [
        "POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig",
      ],
      getActionsCacheList: ["GET /repos/{owner}/{repo}/actions/caches"],
      getActionsCacheUsage: ["GET /repos/{owner}/{repo}/actions/cache/usage"],
      getActionsCacheUsageByRepoForOrg: [
        "GET /orgs/{org}/actions/cache/usage-by-repository",
      ],
      getActionsCacheUsageForOrg: ["GET /orgs/{org}/actions/cache/usage"],
      getAllowedActionsOrganization: [
        "GET /orgs/{org}/actions/permissions/selected-actions",
      ],
      getAllowedActionsRepository: [
        "GET /repos/{owner}/{repo}/actions/permissions/selected-actions",
      ],
      getArtifact: [
        "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
      ],
      getCustomOidcSubClaimForRepo: [
        "GET /repos/{owner}/{repo}/actions/oidc/customization/sub",
      ],
      getEnvironmentPublicKey: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key",
      ],
      getEnvironmentSecret: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}",
      ],
      getEnvironmentVariable: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}",
      ],
      getGithubActionsDefaultWorkflowPermissionsOrganization: [
        "GET /orgs/{org}/actions/permissions/workflow",
      ],
      getGithubActionsDefaultWorkflowPermissionsRepository: [
        "GET /repos/{owner}/{repo}/actions/permissions/workflow",
      ],
      getGithubActionsPermissionsOrganization: [
        "GET /orgs/{org}/actions/permissions",
      ],
      getGithubActionsPermissionsRepository: [
        "GET /repos/{owner}/{repo}/actions/permissions",
      ],
      getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
      getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
      getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
      getOrgVariable: ["GET /orgs/{org}/actions/variables/{name}"],
      getPendingDeploymentsForRun: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments",
      ],
      getRepoPermissions: [
        "GET /repos/{owner}/{repo}/actions/permissions",
        {},
        { renamed: ["actions", "getGithubActionsPermissionsRepository"] },
      ],
      getRepoPublicKey: [
        "GET /repos/{owner}/{repo}/actions/secrets/public-key",
      ],
      getRepoSecret: [
        "GET /repos/{owner}/{repo}/actions/secrets/{secret_name}",
      ],
      getRepoVariable: ["GET /repos/{owner}/{repo}/actions/variables/{name}"],
      getReviewsForRun: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals",
      ],
      getSelfHostedRunnerForOrg: [
        "GET /orgs/{org}/actions/runners/{runner_id}",
      ],
      getSelfHostedRunnerForRepo: [
        "GET /repos/{owner}/{repo}/actions/runners/{runner_id}",
      ],
      getWorkflow: [
        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}",
      ],
      getWorkflowAccessToRepository: [
        "GET /repos/{owner}/{repo}/actions/permissions/access",
      ],
      getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
      getWorkflowRunAttempt: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}",
      ],
      getWorkflowRunUsage: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing",
      ],
      getWorkflowUsage: [
        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing",
      ],
      listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
      listEnvironmentSecrets: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/secrets",
      ],
      listEnvironmentVariables: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/variables",
      ],
      listJobsForWorkflowRun: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
      ],
      listJobsForWorkflowRunAttempt: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs",
      ],
      listLabelsForSelfHostedRunnerForOrg: [
        "GET /orgs/{org}/actions/runners/{runner_id}/labels",
      ],
      listLabelsForSelfHostedRunnerForRepo: [
        "GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels",
      ],
      listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
      listOrgVariables: ["GET /orgs/{org}/actions/variables"],
      listRepoOrganizationSecrets: [
        "GET /repos/{owner}/{repo}/actions/organization-secrets",
      ],
      listRepoOrganizationVariables: [
        "GET /repos/{owner}/{repo}/actions/organization-variables",
      ],
      listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
      listRepoVariables: ["GET /repos/{owner}/{repo}/actions/variables"],
      listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
      listRunnerApplicationsForOrg: [
        "GET /orgs/{org}/actions/runners/downloads",
      ],
      listRunnerApplicationsForRepo: [
        "GET /repos/{owner}/{repo}/actions/runners/downloads",
      ],
      listSelectedReposForOrgSecret: [
        "GET /orgs/{org}/actions/secrets/{secret_name}/repositories",
      ],
      listSelectedReposForOrgVariable: [
        "GET /orgs/{org}/actions/variables/{name}/repositories",
      ],
      listSelectedRepositoriesEnabledGithubActionsOrganization: [
        "GET /orgs/{org}/actions/permissions/repositories",
      ],
      listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
      listSelfHostedRunnersForRepo: [
        "GET /repos/{owner}/{repo}/actions/runners",
      ],
      listWorkflowRunArtifacts: [
        "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
      ],
      listWorkflowRuns: [
        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
      ],
      listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
      reRunJobForWorkflowRun: [
        "POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun",
      ],
      reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
      reRunWorkflowFailedJobs: [
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs",
      ],
      removeAllCustomLabelsFromSelfHostedRunnerForOrg: [
        "DELETE /orgs/{org}/actions/runners/{runner_id}/labels",
      ],
      removeAllCustomLabelsFromSelfHostedRunnerForRepo: [
        "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels",
      ],
      removeCustomLabelFromSelfHostedRunnerForOrg: [
        "DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}",
      ],
      removeCustomLabelFromSelfHostedRunnerForRepo: [
        "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}",
      ],
      removeSelectedRepoFromOrgSecret: [
        "DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}",
      ],
      removeSelectedRepoFromOrgVariable: [
        "DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}",
      ],
      reviewCustomGatesForRun: [
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule",
      ],
      reviewPendingDeploymentsForRun: [
        "POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments",
      ],
      setAllowedActionsOrganization: [
        "PUT /orgs/{org}/actions/permissions/selected-actions",
      ],
      setAllowedActionsRepository: [
        "PUT /repos/{owner}/{repo}/actions/permissions/selected-actions",
      ],
      setCustomLabelsForSelfHostedRunnerForOrg: [
        "PUT /orgs/{org}/actions/runners/{runner_id}/labels",
      ],
      setCustomLabelsForSelfHostedRunnerForRepo: [
        "PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels",
      ],
      setCustomOidcSubClaimForRepo: [
        "PUT /repos/{owner}/{repo}/actions/oidc/customization/sub",
      ],
      setGithubActionsDefaultWorkflowPermissionsOrganization: [
        "PUT /orgs/{org}/actions/permissions/workflow",
      ],
      setGithubActionsDefaultWorkflowPermissionsRepository: [
        "PUT /repos/{owner}/{repo}/actions/permissions/workflow",
      ],
      setGithubActionsPermissionsOrganization: [
        "PUT /orgs/{org}/actions/permissions",
      ],
      setGithubActionsPermissionsRepository: [
        "PUT /repos/{owner}/{repo}/actions/permissions",
      ],
      setSelectedReposForOrgSecret: [
        "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories",
      ],
      setSelectedReposForOrgVariable: [
        "PUT /orgs/{org}/actions/variables/{name}/repositories",
      ],
      setSelectedRepositoriesEnabledGithubActionsOrganization: [
        "PUT /orgs/{org}/actions/permissions/repositories",
      ],
      setWorkflowAccessToRepository: [
        "PUT /repos/{owner}/{repo}/actions/permissions/access",
      ],
      updateEnvironmentVariable: [
        "PATCH /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}",
      ],
      updateOrgVariable: ["PATCH /orgs/{org}/actions/variables/{name}"],
      updateRepoVariable: [
        "PATCH /repos/{owner}/{repo}/actions/variables/{name}",
      ],
    },
    activity: {
      checkRepoIsStarredByAuthenticatedUser: [
        "GET /user/starred/{owner}/{repo}",
      ],
      deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
      deleteThreadSubscription: [
        "DELETE /notifications/threads/{thread_id}/subscription",
      ],
      getFeeds: ["GET /feeds"],
      getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
      getThread: ["GET /notifications/threads/{thread_id}"],
      getThreadSubscriptionForAuthenticatedUser: [
        "GET /notifications/threads/{thread_id}/subscription",
      ],
      listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
      listNotificationsForAuthenticatedUser: ["GET /notifications"],
      listOrgEventsForAuthenticatedUser: [
        "GET /users/{username}/events/orgs/{org}",
      ],
      listPublicEvents: ["GET /events"],
      listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
      listPublicEventsForUser: ["GET /users/{username}/events/public"],
      listPublicOrgEvents: ["GET /orgs/{org}/events"],
      listReceivedEventsForUser: ["GET /users/{username}/received_events"],
      listReceivedPublicEventsForUser: [
        "GET /users/{username}/received_events/public",
      ],
      listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
      listRepoNotificationsForAuthenticatedUser: [
        "GET /repos/{owner}/{repo}/notifications",
      ],
      listReposStarredByAuthenticatedUser: ["GET /user/starred"],
      listReposStarredByUser: ["GET /users/{username}/starred"],
      listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
      listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
      listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
      listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
      markNotificationsAsRead: ["PUT /notifications"],
      markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
      markThreadAsDone: ["DELETE /notifications/threads/{thread_id}"],
      markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
      setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
      setThreadSubscription: [
        "PUT /notifications/threads/{thread_id}/subscription",
      ],
      starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
      unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"],
    },
    apps: {
      addRepoToInstallation: [
        "PUT /user/installations/{installation_id}/repositories/{repository_id}",
        {},
        { renamed: ["apps", "addRepoToInstallationForAuthenticatedUser"] },
      ],
      addRepoToInstallationForAuthenticatedUser: [
        "PUT /user/installations/{installation_id}/repositories/{repository_id}",
      ],
      checkToken: ["POST /applications/{client_id}/token"],
      createFromManifest: ["POST /app-manifests/{code}/conversions"],
      createInstallationAccessToken: [
        "POST /app/installations/{installation_id}/access_tokens",
      ],
      deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
      deleteInstallation: ["DELETE /app/installations/{installation_id}"],
      deleteToken: ["DELETE /applications/{client_id}/token"],
      getAuthenticated: ["GET /app"],
      getBySlug: ["GET /apps/{app_slug}"],
      getInstallation: ["GET /app/installations/{installation_id}"],
      getOrgInstallation: ["GET /orgs/{org}/installation"],
      getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
      getSubscriptionPlanForAccount: [
        "GET /marketplace_listing/accounts/{account_id}",
      ],
      getSubscriptionPlanForAccountStubbed: [
        "GET /marketplace_listing/stubbed/accounts/{account_id}",
      ],
      getUserInstallation: ["GET /users/{username}/installation"],
      getWebhookConfigForApp: ["GET /app/hook/config"],
      getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
      listAccountsForPlan: [
        "GET /marketplace_listing/plans/{plan_id}/accounts",
      ],
      listAccountsForPlanStubbed: [
        "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts",
      ],
      listInstallationReposForAuthenticatedUser: [
        "GET /user/installations/{installation_id}/repositories",
      ],
      listInstallationRequestsForAuthenticatedApp: [
        "GET /app/installation-requests",
      ],
      listInstallations: ["GET /app/installations"],
      listInstallationsForAuthenticatedUser: ["GET /user/installations"],
      listPlans: ["GET /marketplace_listing/plans"],
      listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
      listReposAccessibleToInstallation: ["GET /installation/repositories"],
      listSubscriptionsForAuthenticatedUser: [
        "GET /user/marketplace_purchases",
      ],
      listSubscriptionsForAuthenticatedUserStubbed: [
        "GET /user/marketplace_purchases/stubbed",
      ],
      listWebhookDeliveries: ["GET /app/hook/deliveries"],
      redeliverWebhookDelivery: [
        "POST /app/hook/deliveries/{delivery_id}/attempts",
      ],
      removeRepoFromInstallation: [
        "DELETE /user/installations/{installation_id}/repositories/{repository_id}",
        {},
        { renamed: ["apps", "removeRepoFromInstallationForAuthenticatedUser"] },
      ],
      removeRepoFromInstallationForAuthenticatedUser: [
        "DELETE /user/installations/{installation_id}/repositories/{repository_id}",
      ],
      resetToken: ["PATCH /applications/{client_id}/token"],
      revokeInstallationAccessToken: ["DELETE /installation/token"],
      scopeToken: ["POST /applications/{client_id}/token/scoped"],
      suspendInstallation: [
        "PUT /app/installations/{installation_id}/suspended",
      ],
      unsuspendInstallation: [
        "DELETE /app/installations/{installation_id}/suspended",
      ],
      updateWebhookConfigForApp: ["PATCH /app/hook/config"],
    },
    billing: {
      getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
      getGithubActionsBillingUser: [
        "GET /users/{username}/settings/billing/actions",
      ],
      getGithubBillingUsageReportOrg: [
        "GET /organizations/{org}/settings/billing/usage",
      ],
      getGithubPackagesBillingOrg: [
        "GET /orgs/{org}/settings/billing/packages",
      ],
      getGithubPackagesBillingUser: [
        "GET /users/{username}/settings/billing/packages",
      ],
      getSharedStorageBillingOrg: [
        "GET /orgs/{org}/settings/billing/shared-storage",
      ],
      getSharedStorageBillingUser: [
        "GET /users/{username}/settings/billing/shared-storage",
      ],
    },
    checks: {
      create: ["POST /repos/{owner}/{repo}/check-runs"],
      createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
      get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
      getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
      listAnnotations: [
        "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations",
      ],
      listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
      listForSuite: [
        "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
      ],
      listSuitesForRef: [
        "GET /repos/{owner}/{repo}/commits/{ref}/check-suites",
      ],
      rerequestRun: [
        "POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest",
      ],
      rerequestSuite: [
        "POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest",
      ],
      setSuitesPreferences: [
        "PATCH /repos/{owner}/{repo}/check-suites/preferences",
      ],
      update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    },
    codeScanning: {
      commitAutofix: [
        "POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits",
      ],
      createAutofix: [
        "POST /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix",
      ],
      createVariantAnalysis: [
        "POST /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses",
      ],
      deleteAnalysis: [
        "DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}",
      ],
      deleteCodeqlDatabase: [
        "DELETE /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}",
      ],
      getAlert: [
        "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
        {},
        { renamedParameters: { alert_id: "alert_number" } },
      ],
      getAnalysis: [
        "GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}",
      ],
      getAutofix: [
        "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix",
      ],
      getCodeqlDatabase: [
        "GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}",
      ],
      getDefaultSetup: [
        "GET /repos/{owner}/{repo}/code-scanning/default-setup",
      ],
      getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
      getVariantAnalysis: [
        "GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}",
      ],
      getVariantAnalysisRepoTask: [
        "GET /repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}",
      ],
      listAlertInstances: [
        "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
      ],
      listAlertsForOrg: ["GET /orgs/{org}/code-scanning/alerts"],
      listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
      listAlertsInstances: [
        "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
        {},
        { renamed: ["codeScanning", "listAlertInstances"] },
      ],
      listCodeqlDatabases: [
        "GET /repos/{owner}/{repo}/code-scanning/codeql/databases",
      ],
      listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
      updateAlert: [
        "PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
      ],
      updateDefaultSetup: [
        "PATCH /repos/{owner}/{repo}/code-scanning/default-setup",
      ],
      uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"],
    },
    codeSecurity: {
      attachConfiguration: [
        "POST /orgs/{org}/code-security/configurations/{configuration_id}/attach",
      ],
      attachEnterpriseConfiguration: [
        "POST /enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach",
      ],
      createConfiguration: ["POST /orgs/{org}/code-security/configurations"],
      createConfigurationForEnterprise: [
        "POST /enterprises/{enterprise}/code-security/configurations",
      ],
      deleteConfiguration: [
        "DELETE /orgs/{org}/code-security/configurations/{configuration_id}",
      ],
      deleteConfigurationForEnterprise: [
        "DELETE /enterprises/{enterprise}/code-security/configurations/{configuration_id}",
      ],
      detachConfiguration: [
        "DELETE /orgs/{org}/code-security/configurations/detach",
      ],
      getConfiguration: [
        "GET /orgs/{org}/code-security/configurations/{configuration_id}",
      ],
      getConfigurationForRepository: [
        "GET /repos/{owner}/{repo}/code-security-configuration",
      ],
      getConfigurationsForEnterprise: [
        "GET /enterprises/{enterprise}/code-security/configurations",
      ],
      getConfigurationsForOrg: ["GET /orgs/{org}/code-security/configurations"],
      getDefaultConfigurations: [
        "GET /orgs/{org}/code-security/configurations/defaults",
      ],
      getDefaultConfigurationsForEnterprise: [
        "GET /enterprises/{enterprise}/code-security/configurations/defaults",
      ],
      getRepositoriesForConfiguration: [
        "GET /orgs/{org}/code-security/configurations/{configuration_id}/repositories",
      ],
      getRepositoriesForEnterpriseConfiguration: [
        "GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}/repositories",
      ],
      getSingleConfigurationForEnterprise: [
        "GET /enterprises/{enterprise}/code-security/configurations/{configuration_id}",
      ],
      setConfigurationAsDefault: [
        "PUT /orgs/{org}/code-security/configurations/{configuration_id}/defaults",
      ],
      setConfigurationAsDefaultForEnterprise: [
        "PUT /enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults",
      ],
      updateConfiguration: [
        "PATCH /orgs/{org}/code-security/configurations/{configuration_id}",
      ],
      updateEnterpriseConfiguration: [
        "PATCH /enterprises/{enterprise}/code-security/configurations/{configuration_id}",
      ],
    },
    codesOfConduct: {
      getAllCodesOfConduct: ["GET /codes_of_conduct"],
      getConductCode: ["GET /codes_of_conduct/{key}"],
    },
    codespaces: {
      addRepositoryForSecretForAuthenticatedUser: [
        "PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}",
      ],
      addSelectedRepoToOrgSecret: [
        "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}",
      ],
      checkPermissionsForDevcontainer: [
        "GET /repos/{owner}/{repo}/codespaces/permissions_check",
      ],
      codespaceMachinesForAuthenticatedUser: [
        "GET /user/codespaces/{codespace_name}/machines",
      ],
      createForAuthenticatedUser: ["POST /user/codespaces"],
      createOrUpdateOrgSecret: [
        "PUT /orgs/{org}/codespaces/secrets/{secret_name}",
      ],
      createOrUpdateRepoSecret: [
        "PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}",
      ],
      createOrUpdateSecretForAuthenticatedUser: [
        "PUT /user/codespaces/secrets/{secret_name}",
      ],
      createWithPrForAuthenticatedUser: [
        "POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces",
      ],
      createWithRepoForAuthenticatedUser: [
        "POST /repos/{owner}/{repo}/codespaces",
      ],
      deleteForAuthenticatedUser: ["DELETE /user/codespaces/{codespace_name}"],
      deleteFromOrganization: [
        "DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}",
      ],
      deleteOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}"],
      deleteRepoSecret: [
        "DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}",
      ],
      deleteSecretForAuthenticatedUser: [
        "DELETE /user/codespaces/secrets/{secret_name}",
      ],
      exportForAuthenticatedUser: [
        "POST /user/codespaces/{codespace_name}/exports",
      ],
      getCodespacesForUserInOrg: [
        "GET /orgs/{org}/members/{username}/codespaces",
      ],
      getExportDetailsForAuthenticatedUser: [
        "GET /user/codespaces/{codespace_name}/exports/{export_id}",
      ],
      getForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}"],
      getOrgPublicKey: ["GET /orgs/{org}/codespaces/secrets/public-key"],
      getOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}"],
      getPublicKeyForAuthenticatedUser: [
        "GET /user/codespaces/secrets/public-key",
      ],
      getRepoPublicKey: [
        "GET /repos/{owner}/{repo}/codespaces/secrets/public-key",
      ],
      getRepoSecret: [
        "GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}",
      ],
      getSecretForAuthenticatedUser: [
        "GET /user/codespaces/secrets/{secret_name}",
      ],
      listDevcontainersInRepositoryForAuthenticatedUser: [
        "GET /repos/{owner}/{repo}/codespaces/devcontainers",
      ],
      listForAuthenticatedUser: ["GET /user/codespaces"],
      listInOrganization: [
        "GET /orgs/{org}/codespaces",
        {},
        { renamedParameters: { org_id: "org" } },
      ],
      listInRepositoryForAuthenticatedUser: [
        "GET /repos/{owner}/{repo}/codespaces",
      ],
      listOrgSecrets: ["GET /orgs/{org}/codespaces/secrets"],
      listRepoSecrets: ["GET /repos/{owner}/{repo}/codespaces/secrets"],
      listRepositoriesForSecretForAuthenticatedUser: [
        "GET /user/codespaces/secrets/{secret_name}/repositories",
      ],
      listSecretsForAuthenticatedUser: ["GET /user/codespaces/secrets"],
      listSelectedReposForOrgSecret: [
        "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories",
      ],
      preFlightWithRepoForAuthenticatedUser: [
        "GET /repos/{owner}/{repo}/codespaces/new",
      ],
      publishForAuthenticatedUser: [
        "POST /user/codespaces/{codespace_name}/publish",
      ],
      removeRepositoryForSecretForAuthenticatedUser: [
        "DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}",
      ],
      removeSelectedRepoFromOrgSecret: [
        "DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}",
      ],
      repoMachinesForAuthenticatedUser: [
        "GET /repos/{owner}/{repo}/codespaces/machines",
      ],
      setRepositoriesForSecretForAuthenticatedUser: [
        "PUT /user/codespaces/secrets/{secret_name}/repositories",
      ],
      setSelectedReposForOrgSecret: [
        "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories",
      ],
      startForAuthenticatedUser: [
        "POST /user/codespaces/{codespace_name}/start",
      ],
      stopForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/stop"],
      stopInOrganization: [
        "POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop",
      ],
      updateForAuthenticatedUser: ["PATCH /user/codespaces/{codespace_name}"],
    },
    copilot: {
      addCopilotSeatsForTeams: [
        "POST /orgs/{org}/copilot/billing/selected_teams",
      ],
      addCopilotSeatsForUsers: [
        "POST /orgs/{org}/copilot/billing/selected_users",
      ],
      cancelCopilotSeatAssignmentForTeams: [
        "DELETE /orgs/{org}/copilot/billing/selected_teams",
      ],
      cancelCopilotSeatAssignmentForUsers: [
        "DELETE /orgs/{org}/copilot/billing/selected_users",
      ],
      copilotMetricsForOrganization: ["GET /orgs/{org}/copilot/metrics"],
      copilotMetricsForTeam: [
        "GET /orgs/{org}/team/{team_slug}/copilot/metrics",
      ],
      getCopilotOrganizationDetails: ["GET /orgs/{org}/copilot/billing"],
      getCopilotSeatDetailsForUser: [
        "GET /orgs/{org}/members/{username}/copilot",
      ],
      listCopilotSeats: ["GET /orgs/{org}/copilot/billing/seats"],
      usageMetricsForOrg: ["GET /orgs/{org}/copilot/usage"],
      usageMetricsForTeam: ["GET /orgs/{org}/team/{team_slug}/copilot/usage"],
    },
    dependabot: {
      addSelectedRepoToOrgSecret: [
        "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}",
      ],
      createOrUpdateOrgSecret: [
        "PUT /orgs/{org}/dependabot/secrets/{secret_name}",
      ],
      createOrUpdateRepoSecret: [
        "PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}",
      ],
      deleteOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}"],
      deleteRepoSecret: [
        "DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}",
      ],
      getAlert: ["GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
      getOrgPublicKey: ["GET /orgs/{org}/dependabot/secrets/public-key"],
      getOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}"],
      getRepoPublicKey: [
        "GET /repos/{owner}/{repo}/dependabot/secrets/public-key",
      ],
      getRepoSecret: [
        "GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}",
      ],
      listAlertsForEnterprise: [
        "GET /enterprises/{enterprise}/dependabot/alerts",
      ],
      listAlertsForOrg: ["GET /orgs/{org}/dependabot/alerts"],
      listAlertsForRepo: ["GET /repos/{owner}/{repo}/dependabot/alerts"],
      listOrgSecrets: ["GET /orgs/{org}/dependabot/secrets"],
      listRepoSecrets: ["GET /repos/{owner}/{repo}/dependabot/secrets"],
      listSelectedReposForOrgSecret: [
        "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories",
      ],
      removeSelectedRepoFromOrgSecret: [
        "DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}",
      ],
      setSelectedReposForOrgSecret: [
        "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories",
      ],
      updateAlert: [
        "PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}",
      ],
    },
    dependencyGraph: {
      createRepositorySnapshot: [
        "POST /repos/{owner}/{repo}/dependency-graph/snapshots",
      ],
      diffRange: [
        "GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}",
      ],
      exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"],
    },
    emojis: { get: ["GET /emojis"] },
    gists: {
      checkIsStarred: ["GET /gists/{gist_id}/star"],
      create: ["POST /gists"],
      createComment: ["POST /gists/{gist_id}/comments"],
      delete: ["DELETE /gists/{gist_id}"],
      deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
      fork: ["POST /gists/{gist_id}/forks"],
      get: ["GET /gists/{gist_id}"],
      getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
      getRevision: ["GET /gists/{gist_id}/{sha}"],
      list: ["GET /gists"],
      listComments: ["GET /gists/{gist_id}/comments"],
      listCommits: ["GET /gists/{gist_id}/commits"],
      listForUser: ["GET /users/{username}/gists"],
      listForks: ["GET /gists/{gist_id}/forks"],
      listPublic: ["GET /gists/public"],
      listStarred: ["GET /gists/starred"],
      star: ["PUT /gists/{gist_id}/star"],
      unstar: ["DELETE /gists/{gist_id}/star"],
      update: ["PATCH /gists/{gist_id}"],
      updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"],
    },
    git: {
      createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
      createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
      createRef: ["POST /repos/{owner}/{repo}/git/refs"],
      createTag: ["POST /repos/{owner}/{repo}/git/tags"],
      createTree: ["POST /repos/{owner}/{repo}/git/trees"],
      deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
      getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
      getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
      getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
      getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
      getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
      listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
      updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"],
    },
    gitignore: {
      getAllTemplates: ["GET /gitignore/templates"],
      getTemplate: ["GET /gitignore/templates/{name}"],
    },
    interactions: {
      getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
      getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
      getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
      getRestrictionsForYourPublicRepos: [
        "GET /user/interaction-limits",
        {},
        { renamed: ["interactions", "getRestrictionsForAuthenticatedUser"] },
      ],
      removeRestrictionsForAuthenticatedUser: [
        "DELETE /user/interaction-limits",
      ],
      removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
      removeRestrictionsForRepo: [
        "DELETE /repos/{owner}/{repo}/interaction-limits",
      ],
      removeRestrictionsForYourPublicRepos: [
        "DELETE /user/interaction-limits",
        {},
        { renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"] },
      ],
      setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
      setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
      setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
      setRestrictionsForYourPublicRepos: [
        "PUT /user/interaction-limits",
        {},
        { renamed: ["interactions", "setRestrictionsForAuthenticatedUser"] },
      ],
    },
    issues: {
      addAssignees: [
        "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
      ],
      addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
      addSubIssue: [
        "POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues",
      ],
      checkUserCanBeAssigned: [
        "GET /repos/{owner}/{repo}/assignees/{assignee}",
      ],
      checkUserCanBeAssignedToIssue: [
        "GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}",
      ],
      create: ["POST /repos/{owner}/{repo}/issues"],
      createComment: [
        "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      ],
      createLabel: ["POST /repos/{owner}/{repo}/labels"],
      createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
      deleteComment: [
        "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}",
      ],
      deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
      deleteMilestone: [
        "DELETE /repos/{owner}/{repo}/milestones/{milestone_number}",
      ],
      get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
      getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
      getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
      getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
      getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
      list: ["GET /issues"],
      listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
      listComments: [
        "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      ],
      listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
      listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
      listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
      listEventsForTimeline: [
        "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
      ],
      listForAuthenticatedUser: ["GET /user/issues"],
      listForOrg: ["GET /orgs/{org}/issues"],
      listForRepo: ["GET /repos/{owner}/{repo}/issues"],
      listLabelsForMilestone: [
        "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels",
      ],
      listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
      listLabelsOnIssue: [
        "GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
      ],
      listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
      listSubIssues: [
        "GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues",
      ],
      lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
      removeAllLabels: [
        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels",
      ],
      removeAssignees: [
        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees",
      ],
      removeLabel: [
        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}",
      ],
      removeSubIssue: [
        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/sub_issue",
      ],
      reprioritizeSubIssue: [
        "PATCH /repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority",
      ],
      setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
      unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
      update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
      updateComment: [
        "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}",
      ],
      updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
      updateMilestone: [
        "PATCH /repos/{owner}/{repo}/milestones/{milestone_number}",
      ],
    },
    licenses: {
      get: ["GET /licenses/{license}"],
      getAllCommonlyUsed: ["GET /licenses"],
      getForRepo: ["GET /repos/{owner}/{repo}/license"],
    },
    markdown: {
      render: ["POST /markdown"],
      renderRaw: [
        "POST /markdown/raw",
        { headers: { "content-type": "text/plain; charset=utf-8" } },
      ],
    },
    meta: {
      get: ["GET /meta"],
      getAllVersions: ["GET /versions"],
      getOctocat: ["GET /octocat"],
      getZen: ["GET /zen"],
      root: ["GET /"],
    },
    migrations: {
      deleteArchiveForAuthenticatedUser: [
        "DELETE /user/migrations/{migration_id}/archive",
      ],
      deleteArchiveForOrg: [
        "DELETE /orgs/{org}/migrations/{migration_id}/archive",
      ],
      downloadArchiveForOrg: [
        "GET /orgs/{org}/migrations/{migration_id}/archive",
      ],
      getArchiveForAuthenticatedUser: [
        "GET /user/migrations/{migration_id}/archive",
      ],
      getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}"],
      getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}"],
      listForAuthenticatedUser: ["GET /user/migrations"],
      listForOrg: ["GET /orgs/{org}/migrations"],
      listReposForAuthenticatedUser: [
        "GET /user/migrations/{migration_id}/repositories",
      ],
      listReposForOrg: [
        "GET /orgs/{org}/migrations/{migration_id}/repositories",
      ],
      listReposForUser: [
        "GET /user/migrations/{migration_id}/repositories",
        {},
        { renamed: ["migrations", "listReposForAuthenticatedUser"] },
      ],
      startForAuthenticatedUser: ["POST /user/migrations"],
      startForOrg: ["POST /orgs/{org}/migrations"],
      unlockRepoForAuthenticatedUser: [
        "DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock",
      ],
      unlockRepoForOrg: [
        "DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock",
      ],
    },
    oidc: {
      getOidcCustomSubTemplateForOrg: [
        "GET /orgs/{org}/actions/oidc/customization/sub",
      ],
      updateOidcCustomSubTemplateForOrg: [
        "PUT /orgs/{org}/actions/oidc/customization/sub",
      ],
    },
    orgs: {
      addSecurityManagerTeam: [
        "PUT /orgs/{org}/security-managers/teams/{team_slug}",
        {},
        {
          deprecated:
            "octokit.rest.orgs.addSecurityManagerTeam() is deprecated, see https://docs.github.com/rest/orgs/security-managers#add-a-security-manager-team",
        },
      ],
      assignTeamToOrgRole: [
        "PUT /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}",
      ],
      assignUserToOrgRole: [
        "PUT /orgs/{org}/organization-roles/users/{username}/{role_id}",
      ],
      blockUser: ["PUT /orgs/{org}/blocks/{username}"],
      cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
      checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
      checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
      checkPublicMembershipForUser: [
        "GET /orgs/{org}/public_members/{username}",
      ],
      convertMemberToOutsideCollaborator: [
        "PUT /orgs/{org}/outside_collaborators/{username}",
      ],
      createInvitation: ["POST /orgs/{org}/invitations"],
      createOrUpdateCustomProperties: ["PATCH /orgs/{org}/properties/schema"],
      createOrUpdateCustomPropertiesValuesForRepos: [
        "PATCH /orgs/{org}/properties/values",
      ],
      createOrUpdateCustomProperty: [
        "PUT /orgs/{org}/properties/schema/{custom_property_name}",
      ],
      createWebhook: ["POST /orgs/{org}/hooks"],
      delete: ["DELETE /orgs/{org}"],
      deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
      enableOrDisableSecurityProductOnAllOrgRepos: [
        "POST /orgs/{org}/{security_product}/{enablement}",
        {},
        {
          deprecated:
            "octokit.rest.orgs.enableOrDisableSecurityProductOnAllOrgRepos() is deprecated, see https://docs.github.com/rest/orgs/orgs#enable-or-disable-a-security-feature-for-an-organization",
        },
      ],
      get: ["GET /orgs/{org}"],
      getAllCustomProperties: ["GET /orgs/{org}/properties/schema"],
      getCustomProperty: [
        "GET /orgs/{org}/properties/schema/{custom_property_name}",
      ],
      getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
      getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
      getOrgRole: ["GET /orgs/{org}/organization-roles/{role_id}"],
      getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
      getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
      getWebhookDelivery: [
        "GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}",
      ],
      list: ["GET /organizations"],
      listAppInstallations: ["GET /orgs/{org}/installations"],
      listAttestations: ["GET /orgs/{org}/attestations/{subject_digest}"],
      listBlockedUsers: ["GET /orgs/{org}/blocks"],
      listCustomPropertiesValuesForRepos: ["GET /orgs/{org}/properties/values"],
      listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
      listForAuthenticatedUser: ["GET /user/orgs"],
      listForUser: ["GET /users/{username}/orgs"],
      listInvitationTeams: [
        "GET /orgs/{org}/invitations/{invitation_id}/teams",
      ],
      listMembers: ["GET /orgs/{org}/members"],
      listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
      listOrgRoleTeams: ["GET /orgs/{org}/organization-roles/{role_id}/teams"],
      listOrgRoleUsers: ["GET /orgs/{org}/organization-roles/{role_id}/users"],
      listOrgRoles: ["GET /orgs/{org}/organization-roles"],
      listOrganizationFineGrainedPermissions: [
        "GET /orgs/{org}/organization-fine-grained-permissions",
      ],
      listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
      listPatGrantRepositories: [
        "GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories",
      ],
      listPatGrantRequestRepositories: [
        "GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories",
      ],
      listPatGrantRequests: ["GET /orgs/{org}/personal-access-token-requests"],
      listPatGrants: ["GET /orgs/{org}/personal-access-tokens"],
      listPendingInvitations: ["GET /orgs/{org}/invitations"],
      listPublicMembers: ["GET /orgs/{org}/public_members"],
      listSecurityManagerTeams: [
        "GET /orgs/{org}/security-managers",
        {},
        {
          deprecated:
            "octokit.rest.orgs.listSecurityManagerTeams() is deprecated, see https://docs.github.com/rest/orgs/security-managers#list-security-manager-teams",
        },
      ],
      listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
      listWebhooks: ["GET /orgs/{org}/hooks"],
      pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
      redeliverWebhookDelivery: [
        "POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts",
      ],
      removeCustomProperty: [
        "DELETE /orgs/{org}/properties/schema/{custom_property_name}",
      ],
      removeMember: ["DELETE /orgs/{org}/members/{username}"],
      removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
      removeOutsideCollaborator: [
        "DELETE /orgs/{org}/outside_collaborators/{username}",
      ],
      removePublicMembershipForAuthenticatedUser: [
        "DELETE /orgs/{org}/public_members/{username}",
      ],
      removeSecurityManagerTeam: [
        "DELETE /orgs/{org}/security-managers/teams/{team_slug}",
        {},
        {
          deprecated:
            "octokit.rest.orgs.removeSecurityManagerTeam() is deprecated, see https://docs.github.com/rest/orgs/security-managers#remove-a-security-manager-team",
        },
      ],
      reviewPatGrantRequest: [
        "POST /orgs/{org}/personal-access-token-requests/{pat_request_id}",
      ],
      reviewPatGrantRequestsInBulk: [
        "POST /orgs/{org}/personal-access-token-requests",
      ],
      revokeAllOrgRolesTeam: [
        "DELETE /orgs/{org}/organization-roles/teams/{team_slug}",
      ],
      revokeAllOrgRolesUser: [
        "DELETE /orgs/{org}/organization-roles/users/{username}",
      ],
      revokeOrgRoleTeam: [
        "DELETE /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}",
      ],
      revokeOrgRoleUser: [
        "DELETE /orgs/{org}/organization-roles/users/{username}/{role_id}",
      ],
      setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
      setPublicMembershipForAuthenticatedUser: [
        "PUT /orgs/{org}/public_members/{username}",
      ],
      unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
      update: ["PATCH /orgs/{org}"],
      updateMembershipForAuthenticatedUser: [
        "PATCH /user/memberships/orgs/{org}",
      ],
      updatePatAccess: ["POST /orgs/{org}/personal-access-tokens/{pat_id}"],
      updatePatAccesses: ["POST /orgs/{org}/personal-access-tokens"],
      updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
      updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"],
    },
    packages: {
      deletePackageForAuthenticatedUser: [
        "DELETE /user/packages/{package_type}/{package_name}",
      ],
      deletePackageForOrg: [
        "DELETE /orgs/{org}/packages/{package_type}/{package_name}",
      ],
      deletePackageForUser: [
        "DELETE /users/{username}/packages/{package_type}/{package_name}",
      ],
      deletePackageVersionForAuthenticatedUser: [
        "DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}",
      ],
      deletePackageVersionForOrg: [
        "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}",
      ],
      deletePackageVersionForUser: [
        "DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}",
      ],
      getAllPackageVersionsForAPackageOwnedByAnOrg: [
        "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
        {},
        { renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"] },
      ],
      getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
        "GET /user/packages/{package_type}/{package_name}/versions",
        {},
        {
          renamed: [
            "packages",
            "getAllPackageVersionsForPackageOwnedByAuthenticatedUser",
          ],
        },
      ],
      getAllPackageVersionsForPackageOwnedByAuthenticatedUser: [
        "GET /user/packages/{package_type}/{package_name}/versions",
      ],
      getAllPackageVersionsForPackageOwnedByOrg: [
        "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
      ],
      getAllPackageVersionsForPackageOwnedByUser: [
        "GET /users/{username}/packages/{package_type}/{package_name}/versions",
      ],
      getPackageForAuthenticatedUser: [
        "GET /user/packages/{package_type}/{package_name}",
      ],
      getPackageForOrganization: [
        "GET /orgs/{org}/packages/{package_type}/{package_name}",
      ],
      getPackageForUser: [
        "GET /users/{username}/packages/{package_type}/{package_name}",
      ],
      getPackageVersionForAuthenticatedUser: [
        "GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}",
      ],
      getPackageVersionForOrganization: [
        "GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}",
      ],
      getPackageVersionForUser: [
        "GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}",
      ],
      listDockerMigrationConflictingPackagesForAuthenticatedUser: [
        "GET /user/docker/conflicts",
      ],
      listDockerMigrationConflictingPackagesForOrganization: [
        "GET /orgs/{org}/docker/conflicts",
      ],
      listDockerMigrationConflictingPackagesForUser: [
        "GET /users/{username}/docker/conflicts",
      ],
      listPackagesForAuthenticatedUser: ["GET /user/packages"],
      listPackagesForOrganization: ["GET /orgs/{org}/packages"],
      listPackagesForUser: ["GET /users/{username}/packages"],
      restorePackageForAuthenticatedUser: [
        "POST /user/packages/{package_type}/{package_name}/restore{?token}",
      ],
      restorePackageForOrg: [
        "POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}",
      ],
      restorePackageForUser: [
        "POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}",
      ],
      restorePackageVersionForAuthenticatedUser: [
        "POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore",
      ],
      restorePackageVersionForOrg: [
        "POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore",
      ],
      restorePackageVersionForUser: [
        "POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore",
      ],
    },
    privateRegistries: {
      createOrgPrivateRegistry: ["POST /orgs/{org}/private-registries"],
      deleteOrgPrivateRegistry: [
        "DELETE /orgs/{org}/private-registries/{secret_name}",
      ],
      getOrgPrivateRegistry: [
        "GET /orgs/{org}/private-registries/{secret_name}",
      ],
      getOrgPublicKey: ["GET /orgs/{org}/private-registries/public-key"],
      listOrgPrivateRegistries: ["GET /orgs/{org}/private-registries"],
      updateOrgPrivateRegistry: [
        "PATCH /orgs/{org}/private-registries/{secret_name}",
      ],
    },
    projects: {
      addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}"],
      createCard: ["POST /projects/columns/{column_id}/cards"],
      createColumn: ["POST /projects/{project_id}/columns"],
      createForAuthenticatedUser: ["POST /user/projects"],
      createForOrg: ["POST /orgs/{org}/projects"],
      createForRepo: ["POST /repos/{owner}/{repo}/projects"],
      delete: ["DELETE /projects/{project_id}"],
      deleteCard: ["DELETE /projects/columns/cards/{card_id}"],
      deleteColumn: ["DELETE /projects/columns/{column_id}"],
      get: ["GET /projects/{project_id}"],
      getCard: ["GET /projects/columns/cards/{card_id}"],
      getColumn: ["GET /projects/columns/{column_id}"],
      getPermissionForUser: [
        "GET /projects/{project_id}/collaborators/{username}/permission",
      ],
      listCards: ["GET /projects/columns/{column_id}/cards"],
      listCollaborators: ["GET /projects/{project_id}/collaborators"],
      listColumns: ["GET /projects/{project_id}/columns"],
      listForOrg: ["GET /orgs/{org}/projects"],
      listForRepo: ["GET /repos/{owner}/{repo}/projects"],
      listForUser: ["GET /users/{username}/projects"],
      moveCard: ["POST /projects/columns/cards/{card_id}/moves"],
      moveColumn: ["POST /projects/columns/{column_id}/moves"],
      removeCollaborator: [
        "DELETE /projects/{project_id}/collaborators/{username}",
      ],
      update: ["PATCH /projects/{project_id}"],
      updateCard: ["PATCH /projects/columns/cards/{card_id}"],
      updateColumn: ["PATCH /projects/columns/{column_id}"],
    },
    pulls: {
      checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
      create: ["POST /repos/{owner}/{repo}/pulls"],
      createReplyForReviewComment: [
        "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies",
      ],
      createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
      createReviewComment: [
        "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments",
      ],
      deletePendingReview: [
        "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
      ],
      deleteReviewComment: [
        "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}",
      ],
      dismissReview: [
        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals",
      ],
      get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
      getReview: [
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
      ],
      getReviewComment: [
        "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}",
      ],
      list: ["GET /repos/{owner}/{repo}/pulls"],
      listCommentsForReview: [
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
      ],
      listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
      listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
      listRequestedReviewers: [
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      ],
      listReviewComments: [
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments",
      ],
      listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
      listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
      merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
      removeRequestedReviewers: [
        "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      ],
      requestReviewers: [
        "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      ],
      submitReview: [
        "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events",
      ],
      update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
      updateBranch: [
        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch",
      ],
      updateReview: [
        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
      ],
      updateReviewComment: [
        "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}",
      ],
    },
    rateLimit: { get: ["GET /rate_limit"] },
    reactions: {
      createForCommitComment: [
        "POST /repos/{owner}/{repo}/comments/{comment_id}/reactions",
      ],
      createForIssue: [
        "POST /repos/{owner}/{repo}/issues/{issue_number}/reactions",
      ],
      createForIssueComment: [
        "POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
      ],
      createForPullRequestReviewComment: [
        "POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
      ],
      createForRelease: [
        "POST /repos/{owner}/{repo}/releases/{release_id}/reactions",
      ],
      createForTeamDiscussionCommentInOrg: [
        "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
      ],
      createForTeamDiscussionInOrg: [
        "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
      ],
      deleteForCommitComment: [
        "DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}",
      ],
      deleteForIssue: [
        "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}",
      ],
      deleteForIssueComment: [
        "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}",
      ],
      deleteForPullRequestComment: [
        "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}",
      ],
      deleteForRelease: [
        "DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}",
      ],
      deleteForTeamDiscussion: [
        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}",
      ],
      deleteForTeamDiscussionComment: [
        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}",
      ],
      listForCommitComment: [
        "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions",
      ],
      listForIssue: [
        "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions",
      ],
      listForIssueComment: [
        "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
      ],
      listForPullRequestReviewComment: [
        "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
      ],
      listForRelease: [
        "GET /repos/{owner}/{repo}/releases/{release_id}/reactions",
      ],
      listForTeamDiscussionCommentInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
      ],
      listForTeamDiscussionInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
      ],
    },
    repos: {
      acceptInvitation: [
        "PATCH /user/repository_invitations/{invitation_id}",
        {},
        { renamed: ["repos", "acceptInvitationForAuthenticatedUser"] },
      ],
      acceptInvitationForAuthenticatedUser: [
        "PATCH /user/repository_invitations/{invitation_id}",
      ],
      addAppAccessRestrictions: [
        "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
        {},
        { mapToData: "apps" },
      ],
      addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
      addStatusCheckContexts: [
        "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
        {},
        { mapToData: "contexts" },
      ],
      addTeamAccessRestrictions: [
        "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
        {},
        { mapToData: "teams" },
      ],
      addUserAccessRestrictions: [
        "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
        {},
        { mapToData: "users" },
      ],
      cancelPagesDeployment: [
        "POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel",
      ],
      checkAutomatedSecurityFixes: [
        "GET /repos/{owner}/{repo}/automated-security-fixes",
      ],
      checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
      checkPrivateVulnerabilityReporting: [
        "GET /repos/{owner}/{repo}/private-vulnerability-reporting",
      ],
      checkVulnerabilityAlerts: [
        "GET /repos/{owner}/{repo}/vulnerability-alerts",
      ],
      codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
      compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
      compareCommitsWithBasehead: [
        "GET /repos/{owner}/{repo}/compare/{basehead}",
      ],
      createAttestation: ["POST /repos/{owner}/{repo}/attestations"],
      createAutolink: ["POST /repos/{owner}/{repo}/autolinks"],
      createCommitComment: [
        "POST /repos/{owner}/{repo}/commits/{commit_sha}/comments",
      ],
      createCommitSignatureProtection: [
        "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
      ],
      createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
      createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
      createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
      createDeploymentBranchPolicy: [
        "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
      ],
      createDeploymentProtectionRule: [
        "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules",
      ],
      createDeploymentStatus: [
        "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
      ],
      createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
      createForAuthenticatedUser: ["POST /user/repos"],
      createFork: ["POST /repos/{owner}/{repo}/forks"],
      createInOrg: ["POST /orgs/{org}/repos"],
      createOrUpdateCustomPropertiesValues: [
        "PATCH /repos/{owner}/{repo}/properties/values",
      ],
      createOrUpdateEnvironment: [
        "PUT /repos/{owner}/{repo}/environments/{environment_name}",
      ],
      createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
      createOrgRuleset: ["POST /orgs/{org}/rulesets"],
      createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployments"],
      createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
      createRelease: ["POST /repos/{owner}/{repo}/releases"],
      createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
      createUsingTemplate: [
        "POST /repos/{template_owner}/{template_repo}/generate",
      ],
      createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
      declineInvitation: [
        "DELETE /user/repository_invitations/{invitation_id}",
        {},
        { renamed: ["repos", "declineInvitationForAuthenticatedUser"] },
      ],
      declineInvitationForAuthenticatedUser: [
        "DELETE /user/repository_invitations/{invitation_id}",
      ],
      delete: ["DELETE /repos/{owner}/{repo}"],
      deleteAccessRestrictions: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
      ],
      deleteAdminBranchProtection: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
      ],
      deleteAnEnvironment: [
        "DELETE /repos/{owner}/{repo}/environments/{environment_name}",
      ],
      deleteAutolink: ["DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}"],
      deleteBranchProtection: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
      ],
      deleteCommitComment: [
        "DELETE /repos/{owner}/{repo}/comments/{comment_id}",
      ],
      deleteCommitSignatureProtection: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
      ],
      deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
      deleteDeployment: [
        "DELETE /repos/{owner}/{repo}/deployments/{deployment_id}",
      ],
      deleteDeploymentBranchPolicy: [
        "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}",
      ],
      deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
      deleteInvitation: [
        "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}",
      ],
      deleteOrgRuleset: ["DELETE /orgs/{org}/rulesets/{ruleset_id}"],
      deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages"],
      deletePullRequestReviewProtection: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
      ],
      deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
      deleteReleaseAsset: [
        "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}",
      ],
      deleteRepoRuleset: ["DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
      deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
      disableAutomatedSecurityFixes: [
        "DELETE /repos/{owner}/{repo}/automated-security-fixes",
      ],
      disableDeploymentProtectionRule: [
        "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}",
      ],
      disablePrivateVulnerabilityReporting: [
        "DELETE /repos/{owner}/{repo}/private-vulnerability-reporting",
      ],
      disableVulnerabilityAlerts: [
        "DELETE /repos/{owner}/{repo}/vulnerability-alerts",
      ],
      downloadArchive: [
        "GET /repos/{owner}/{repo}/zipball/{ref}",
        {},
        { renamed: ["repos", "downloadZipballArchive"] },
      ],
      downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
      downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
      enableAutomatedSecurityFixes: [
        "PUT /repos/{owner}/{repo}/automated-security-fixes",
      ],
      enablePrivateVulnerabilityReporting: [
        "PUT /repos/{owner}/{repo}/private-vulnerability-reporting",
      ],
      enableVulnerabilityAlerts: [
        "PUT /repos/{owner}/{repo}/vulnerability-alerts",
      ],
      generateReleaseNotes: [
        "POST /repos/{owner}/{repo}/releases/generate-notes",
      ],
      get: ["GET /repos/{owner}/{repo}"],
      getAccessRestrictions: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
      ],
      getAdminBranchProtection: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
      ],
      getAllDeploymentProtectionRules: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules",
      ],
      getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
      getAllStatusCheckContexts: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      ],
      getAllTopics: ["GET /repos/{owner}/{repo}/topics"],
      getAppsWithAccessToProtectedBranch: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      ],
      getAutolink: ["GET /repos/{owner}/{repo}/autolinks/{autolink_id}"],
      getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
      getBranchProtection: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection",
      ],
      getBranchRules: ["GET /repos/{owner}/{repo}/rules/branches/{branch}"],
      getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
      getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
      getCollaboratorPermissionLevel: [
        "GET /repos/{owner}/{repo}/collaborators/{username}/permission",
      ],
      getCombinedStatusForRef: [
        "GET /repos/{owner}/{repo}/commits/{ref}/status",
      ],
      getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
      getCommitActivityStats: [
        "GET /repos/{owner}/{repo}/stats/commit_activity",
      ],
      getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
      getCommitSignatureProtection: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
      ],
      getCommunityProfileMetrics: [
        "GET /repos/{owner}/{repo}/community/profile",
      ],
      getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
      getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
      getCustomDeploymentProtectionRule: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}",
      ],
      getCustomPropertiesValues: [
        "GET /repos/{owner}/{repo}/properties/values",
      ],
      getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
      getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
      getDeploymentBranchPolicy: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}",
      ],
      getDeploymentStatus: [
        "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}",
      ],
      getEnvironment: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}",
      ],
      getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
      getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
      getOrgRuleSuite: ["GET /orgs/{org}/rulesets/rule-suites/{rule_suite_id}"],
      getOrgRuleSuites: ["GET /orgs/{org}/rulesets/rule-suites"],
      getOrgRuleset: ["GET /orgs/{org}/rulesets/{ruleset_id}"],
      getOrgRulesets: ["GET /orgs/{org}/rulesets"],
      getPages: ["GET /repos/{owner}/{repo}/pages"],
      getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
      getPagesDeployment: [
        "GET /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}",
      ],
      getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
      getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
      getPullRequestReviewProtection: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
      ],
      getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
      getReadme: ["GET /repos/{owner}/{repo}/readme"],
      getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
      getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
      getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
      getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
      getRepoRuleSuite: [
        "GET /repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}",
      ],
      getRepoRuleSuites: ["GET /repos/{owner}/{repo}/rulesets/rule-suites"],
      getRepoRuleset: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
      getRepoRulesets: ["GET /repos/{owner}/{repo}/rulesets"],
      getStatusChecksProtection: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      ],
      getTeamsWithAccessToProtectedBranch: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      ],
      getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
      getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
      getUsersWithAccessToProtectedBranch: [
        "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      ],
      getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
      getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
      getWebhookConfigForRepo: [
        "GET /repos/{owner}/{repo}/hooks/{hook_id}/config",
      ],
      getWebhookDelivery: [
        "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}",
      ],
      listActivities: ["GET /repos/{owner}/{repo}/activity"],
      listAttestations: [
        "GET /repos/{owner}/{repo}/attestations/{subject_digest}",
      ],
      listAutolinks: ["GET /repos/{owner}/{repo}/autolinks"],
      listBranches: ["GET /repos/{owner}/{repo}/branches"],
      listBranchesForHeadCommit: [
        "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head",
      ],
      listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
      listCommentsForCommit: [
        "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments",
      ],
      listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
      listCommitStatusesForRef: [
        "GET /repos/{owner}/{repo}/commits/{ref}/statuses",
      ],
      listCommits: ["GET /repos/{owner}/{repo}/commits"],
      listContributors: ["GET /repos/{owner}/{repo}/contributors"],
      listCustomDeploymentRuleIntegrations: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps",
      ],
      listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
      listDeploymentBranchPolicies: [
        "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
      ],
      listDeploymentStatuses: [
        "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
      ],
      listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
      listForAuthenticatedUser: ["GET /user/repos"],
      listForOrg: ["GET /orgs/{org}/repos"],
      listForUser: ["GET /users/{username}/repos"],
      listForks: ["GET /repos/{owner}/{repo}/forks"],
      listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
      listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
      listLanguages: ["GET /repos/{owner}/{repo}/languages"],
      listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
      listPublic: ["GET /repositories"],
      listPullRequestsAssociatedWithCommit: [
        "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls",
      ],
      listReleaseAssets: [
        "GET /repos/{owner}/{repo}/releases/{release_id}/assets",
      ],
      listReleases: ["GET /repos/{owner}/{repo}/releases"],
      listTags: ["GET /repos/{owner}/{repo}/tags"],
      listTeams: ["GET /repos/{owner}/{repo}/teams"],
      listWebhookDeliveries: [
        "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries",
      ],
      listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
      merge: ["POST /repos/{owner}/{repo}/merges"],
      mergeUpstream: ["POST /repos/{owner}/{repo}/merge-upstream"],
      pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
      redeliverWebhookDelivery: [
        "POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts",
      ],
      removeAppAccessRestrictions: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
        {},
        { mapToData: "apps" },
      ],
      removeCollaborator: [
        "DELETE /repos/{owner}/{repo}/collaborators/{username}",
      ],
      removeStatusCheckContexts: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
        {},
        { mapToData: "contexts" },
      ],
      removeStatusCheckProtection: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      ],
      removeTeamAccessRestrictions: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
        {},
        { mapToData: "teams" },
      ],
      removeUserAccessRestrictions: [
        "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
        {},
        { mapToData: "users" },
      ],
      renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
      replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics"],
      requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
      setAdminBranchProtection: [
        "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
      ],
      setAppAccessRestrictions: [
        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
        {},
        { mapToData: "apps" },
      ],
      setStatusCheckContexts: [
        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
        {},
        { mapToData: "contexts" },
      ],
      setTeamAccessRestrictions: [
        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
        {},
        { mapToData: "teams" },
      ],
      setUserAccessRestrictions: [
        "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
        {},
        { mapToData: "users" },
      ],
      testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
      transfer: ["POST /repos/{owner}/{repo}/transfer"],
      update: ["PATCH /repos/{owner}/{repo}"],
      updateBranchProtection: [
        "PUT /repos/{owner}/{repo}/branches/{branch}/protection",
      ],
      updateCommitComment: [
        "PATCH /repos/{owner}/{repo}/comments/{comment_id}",
      ],
      updateDeploymentBranchPolicy: [
        "PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}",
      ],
      updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
      updateInvitation: [
        "PATCH /repos/{owner}/{repo}/invitations/{invitation_id}",
      ],
      updateOrgRuleset: ["PUT /orgs/{org}/rulesets/{ruleset_id}"],
      updatePullRequestReviewProtection: [
        "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
      ],
      updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
      updateReleaseAsset: [
        "PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}",
      ],
      updateRepoRuleset: ["PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
      updateStatusCheckPotection: [
        "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
        {},
        { renamed: ["repos", "updateStatusCheckProtection"] },
      ],
      updateStatusCheckProtection: [
        "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      ],
      updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
      updateWebhookConfigForRepo: [
        "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config",
      ],
      uploadReleaseAsset: [
        "POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}",
        { baseUrl: "https://uploads.github.com" },
      ],
    },
    search: {
      code: ["GET /search/code"],
      commits: ["GET /search/commits"],
      issuesAndPullRequests: ["GET /search/issues"],
      labels: ["GET /search/labels"],
      repos: ["GET /search/repositories"],
      topics: ["GET /search/topics"],
      users: ["GET /search/users"],
    },
    secretScanning: {
      createPushProtectionBypass: [
        "POST /repos/{owner}/{repo}/secret-scanning/push-protection-bypasses",
      ],
      getAlert: [
        "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}",
      ],
      getScanHistory: [
        "GET /repos/{owner}/{repo}/secret-scanning/scan-history",
      ],
      listAlertsForEnterprise: [
        "GET /enterprises/{enterprise}/secret-scanning/alerts",
      ],
      listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
      listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
      listLocationsForAlert: [
        "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations",
      ],
      updateAlert: [
        "PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}",
      ],
    },
    securityAdvisories: {
      createFork: [
        "POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/forks",
      ],
      createPrivateVulnerabilityReport: [
        "POST /repos/{owner}/{repo}/security-advisories/reports",
      ],
      createRepositoryAdvisory: [
        "POST /repos/{owner}/{repo}/security-advisories",
      ],
      createRepositoryAdvisoryCveRequest: [
        "POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve",
      ],
      getGlobalAdvisory: ["GET /advisories/{ghsa_id}"],
      getRepositoryAdvisory: [
        "GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}",
      ],
      listGlobalAdvisories: ["GET /advisories"],
      listOrgRepositoryAdvisories: ["GET /orgs/{org}/security-advisories"],
      listRepositoryAdvisories: [
        "GET /repos/{owner}/{repo}/security-advisories",
      ],
      updateRepositoryAdvisory: [
        "PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}",
      ],
    },
    teams: {
      addOrUpdateMembershipForUserInOrg: [
        "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}",
      ],
      addOrUpdateProjectPermissionsInOrg: [
        "PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}",
      ],
      addOrUpdateRepoPermissionsInOrg: [
        "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
      ],
      checkPermissionsForProjectInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/projects/{project_id}",
      ],
      checkPermissionsForRepoInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
      ],
      create: ["POST /orgs/{org}/teams"],
      createDiscussionCommentInOrg: [
        "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
      ],
      createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
      deleteDiscussionCommentInOrg: [
        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
      ],
      deleteDiscussionInOrg: [
        "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
      ],
      deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
      getByName: ["GET /orgs/{org}/teams/{team_slug}"],
      getDiscussionCommentInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
      ],
      getDiscussionInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
      ],
      getMembershipForUserInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/memberships/{username}",
      ],
      list: ["GET /orgs/{org}/teams"],
      listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
      listDiscussionCommentsInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
      ],
      listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
      listForAuthenticatedUser: ["GET /user/teams"],
      listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
      listPendingInvitationsInOrg: [
        "GET /orgs/{org}/teams/{team_slug}/invitations",
      ],
      listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects"],
      listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
      removeMembershipForUserInOrg: [
        "DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}",
      ],
      removeProjectInOrg: [
        "DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}",
      ],
      removeRepoInOrg: [
        "DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
      ],
      updateDiscussionCommentInOrg: [
        "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
      ],
      updateDiscussionInOrg: [
        "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
      ],
      updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"],
    },
    users: {
      addEmailForAuthenticated: [
        "POST /user/emails",
        {},
        { renamed: ["users", "addEmailForAuthenticatedUser"] },
      ],
      addEmailForAuthenticatedUser: ["POST /user/emails"],
      addSocialAccountForAuthenticatedUser: ["POST /user/social_accounts"],
      block: ["PUT /user/blocks/{username}"],
      checkBlocked: ["GET /user/blocks/{username}"],
      checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
      checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
      createGpgKeyForAuthenticated: [
        "POST /user/gpg_keys",
        {},
        { renamed: ["users", "createGpgKeyForAuthenticatedUser"] },
      ],
      createGpgKeyForAuthenticatedUser: ["POST /user/gpg_keys"],
      createPublicSshKeyForAuthenticated: [
        "POST /user/keys",
        {},
        { renamed: ["users", "createPublicSshKeyForAuthenticatedUser"] },
      ],
      createPublicSshKeyForAuthenticatedUser: ["POST /user/keys"],
      createSshSigningKeyForAuthenticatedUser: ["POST /user/ssh_signing_keys"],
      deleteEmailForAuthenticated: [
        "DELETE /user/emails",
        {},
        { renamed: ["users", "deleteEmailForAuthenticatedUser"] },
      ],
      deleteEmailForAuthenticatedUser: ["DELETE /user/emails"],
      deleteGpgKeyForAuthenticated: [
        "DELETE /user/gpg_keys/{gpg_key_id}",
        {},
        { renamed: ["users", "deleteGpgKeyForAuthenticatedUser"] },
      ],
      deleteGpgKeyForAuthenticatedUser: ["DELETE /user/gpg_keys/{gpg_key_id}"],
      deletePublicSshKeyForAuthenticated: [
        "DELETE /user/keys/{key_id}",
        {},
        { renamed: ["users", "deletePublicSshKeyForAuthenticatedUser"] },
      ],
      deletePublicSshKeyForAuthenticatedUser: ["DELETE /user/keys/{key_id}"],
      deleteSocialAccountForAuthenticatedUser: ["DELETE /user/social_accounts"],
      deleteSshSigningKeyForAuthenticatedUser: [
        "DELETE /user/ssh_signing_keys/{ssh_signing_key_id}",
      ],
      follow: ["PUT /user/following/{username}"],
      getAuthenticated: ["GET /user"],
      getById: ["GET /user/{account_id}"],
      getByUsername: ["GET /users/{username}"],
      getContextForUser: ["GET /users/{username}/hovercard"],
      getGpgKeyForAuthenticated: [
        "GET /user/gpg_keys/{gpg_key_id}",
        {},
        { renamed: ["users", "getGpgKeyForAuthenticatedUser"] },
      ],
      getGpgKeyForAuthenticatedUser: ["GET /user/gpg_keys/{gpg_key_id}"],
      getPublicSshKeyForAuthenticated: [
        "GET /user/keys/{key_id}",
        {},
        { renamed: ["users", "getPublicSshKeyForAuthenticatedUser"] },
      ],
      getPublicSshKeyForAuthenticatedUser: ["GET /user/keys/{key_id}"],
      getSshSigningKeyForAuthenticatedUser: [
        "GET /user/ssh_signing_keys/{ssh_signing_key_id}",
      ],
      list: ["GET /users"],
      listAttestations: ["GET /users/{username}/attestations/{subject_digest}"],
      listBlockedByAuthenticated: [
        "GET /user/blocks",
        {},
        { renamed: ["users", "listBlockedByAuthenticatedUser"] },
      ],
      listBlockedByAuthenticatedUser: ["GET /user/blocks"],
      listEmailsForAuthenticated: [
        "GET /user/emails",
        {},
        { renamed: ["users", "listEmailsForAuthenticatedUser"] },
      ],
      listEmailsForAuthenticatedUser: ["GET /user/emails"],
      listFollowedByAuthenticated: [
        "GET /user/following",
        {},
        { renamed: ["users", "listFollowedByAuthenticatedUser"] },
      ],
      listFollowedByAuthenticatedUser: ["GET /user/following"],
      listFollowersForAuthenticatedUser: ["GET /user/followers"],
      listFollowersForUser: ["GET /users/{username}/followers"],
      listFollowingForUser: ["GET /users/{username}/following"],
      listGpgKeysForAuthenticated: [
        "GET /user/gpg_keys",
        {},
        { renamed: ["users", "listGpgKeysForAuthenticatedUser"] },
      ],
      listGpgKeysForAuthenticatedUser: ["GET /user/gpg_keys"],
      listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
      listPublicEmailsForAuthenticated: [
        "GET /user/public_emails",
        {},
        { renamed: ["users", "listPublicEmailsForAuthenticatedUser"] },
      ],
      listPublicEmailsForAuthenticatedUser: ["GET /user/public_emails"],
      listPublicKeysForUser: ["GET /users/{username}/keys"],
      listPublicSshKeysForAuthenticated: [
        "GET /user/keys",
        {},
        { renamed: ["users", "listPublicSshKeysForAuthenticatedUser"] },
      ],
      listPublicSshKeysForAuthenticatedUser: ["GET /user/keys"],
      listSocialAccountsForAuthenticatedUser: ["GET /user/social_accounts"],
      listSocialAccountsForUser: ["GET /users/{username}/social_accounts"],
      listSshSigningKeysForAuthenticatedUser: ["GET /user/ssh_signing_keys"],
      listSshSigningKeysForUser: ["GET /users/{username}/ssh_signing_keys"],
      setPrimaryEmailVisibilityForAuthenticated: [
        "PATCH /user/email/visibility",
        {},
        { renamed: ["users", "setPrimaryEmailVisibilityForAuthenticatedUser"] },
      ],
      setPrimaryEmailVisibilityForAuthenticatedUser: [
        "PATCH /user/email/visibility",
      ],
      unblock: ["DELETE /user/blocks/{username}"],
      unfollow: ["DELETE /user/following/{username}"],
      updateAuthenticated: ["PATCH /user"],
    },
  };
var Fr = Rr;
const O = new Map();
for (const [e, r] of Object.entries(Fr))
  for (const [s, t] of Object.entries(r)) {
    const [o, n, i] = t,
      [a, l] = o.split(/ /),
      E = Object.assign({ method: a, url: l }, n);
    O.has(e) || O.set(e, new Map()),
      O.get(e).set(s, {
        scope: e,
        methodName: s,
        endpointDefaults: E,
        decorations: i,
      });
  }
const Cr = {
  has({ scope: e }, r) {
    return O.get(e).has(r);
  },
  getOwnPropertyDescriptor(e, r) {
    return {
      value: this.get(e, r),
      configurable: !0,
      writable: !0,
      enumerable: !0,
    };
  },
  defineProperty(e, r, s) {
    return Object.defineProperty(e.cache, r, s), !0;
  },
  deleteProperty(e, r) {
    return delete e.cache[r], !0;
  },
  ownKeys({ scope: e }) {
    return [...O.get(e).keys()];
  },
  set(e, r, s) {
    return (e.cache[r] = s);
  },
  get({ octokit: e, scope: r, cache: s }, t) {
    if (s[t]) return s[t];
    const o = O.get(r).get(t);
    if (!o) return;
    const { endpointDefaults: n, decorations: i } = o;
    return (
      i ? (s[t] = Dr(e, r, t, n, i)) : (s[t] = e.request.defaults(n)), s[t]
    );
  },
};
function Ur(e) {
  const r = {};
  for (const s of O.keys())
    r[s] = new Proxy({ octokit: e, scope: s, cache: {} }, Cr);
  return r;
}
function Dr(e, r, s, t, o) {
  const n = e.request.defaults(t);
  function i(...a) {
    let l = n.endpoint.merge(...a);
    if (o.mapToData)
      return (
        (l = Object.assign({}, l, {
          data: l[o.mapToData],
          [o.mapToData]: void 0,
        })),
        n(l)
      );
    if (o.renamed) {
      const [E, g] = o.renamed;
      e.log.warn(`octokit.${r}.${s}() has been renamed to octokit.${E}.${g}()`);
    }
    if ((o.deprecated && e.log.warn(o.deprecated), o.renamedParameters)) {
      const E = n.endpoint.merge(...a);
      for (const [g, w] of Object.entries(o.renamedParameters))
        g in E &&
          (e.log.warn(
            `"${g}" parameter is deprecated for "octokit.${r}.${s}()". Use "${w}" instead`
          ),
          w in E || (E[w] = E[g]),
          delete E[g]);
      return n(E);
    }
    return n(...a);
  }
  return Object.assign(i, n);
}
function fe(e) {
  const r = Ur(e);
  return { ...r, rest: r };
}
fe.VERSION = Ar;
const Lr = "21.1.0",
  Ir = Pr.plugin(he, fe, _e).defaults({ userAgent: `octokit-rest.js/${Lr}` }),
  $r = Ue("editor", {
    state: () => {
      const e = localStorage.getItem("editor-saves"),
        r = localStorage.getItem("editor-git-contents");
      return {
        savedContents: e ? JSON.parse(e) : {},
        gitContents: r ? JSON.parse(r) : {},
        currentBranch: "main",
        collaborators: [],
        isCollaborating: !1,
      };
    },
    getters: {
      getSavedContents: (e) => (r) => {
        console.log(
          "Getting saved contents for key:",
          `${r}-${e.currentBranch}`
        );
        const s = e.savedContents[`${r}-${e.currentBranch}`] || [];
        return console.log("Found saves:", s), s;
      },
      getGitContent: (e) => (r, s) => {
        const t = `${r}-${s}`;
        return e.gitContents[t];
      },
      getCurrentGitContent: (e) => (r) => {
        const s = `${r}-${e.currentBranch}`;
        return e.gitContents[s];
      },
    },
    actions: {
      saveContent(e, r) {
        console.log("Saving content - Length:", r.length),
          console.log("Preview:", {
            filePath: e,
            content: r.substring(0, 100) + "...",
          });
        const { showToast: s } = W(),
          t = `${e}-${this.currentBranch}`,
          o = {
            content: r.toString(),
            timestamp: new Date().toISOString(),
            branch: this.currentBranch,
            filePath: e,
          };
        this.savedContents[t] || (this.savedContents[t] = []),
          this.savedContents[t].unshift(o),
          this.savedContents[t].length > 10 &&
            (this.savedContents[t] = this.savedContents[t].slice(0, 10)),
          console.log(
            "Saved content length:",
            this.savedContents[t][0].content.length
          ),
          console.log("Updated saves count:", this.savedContents[t].length);
        try {
          localStorage.setItem(
            "editor-saves",
            JSON.stringify(this.savedContents)
          ),
            console.log("Saved to localStorage successfully");
          const n = localStorage.getItem("editor-saves");
          if (n) {
            const a = JSON.parse(n)[t][0].content;
            console.log(
              "Verified localStorage save - Content length:",
              a.length
            );
          }
        } catch (n) {
          console.error("Error saving to localStorage:", n),
            s({
              title: "Error",
              description: "Failed to save changes locally",
              type: "error",
            });
          return;
        }
        s({
          title: "Changes Saved",
          description: `Changes saved locally on branch "${this.currentBranch}"`,
        });
      },
      saveGitContent(e, r, s, t) {
        const o = `${e}-${s}`;
        (this.gitContents[o] = {
          content: r,
          branch: s,
          sha: t,
          lastFetched: new Date().toISOString(),
        }),
          localStorage.setItem(
            "editor-git-contents",
            JSON.stringify(this.gitContents)
          );
      },
      loadSaves() {
        const e = localStorage.getItem("editor-saves"),
          r = localStorage.getItem("editor-git-contents");
        e && (this.savedContents = JSON.parse(e)),
          r && (this.gitContents = JSON.parse(r));
      },
      setBranch(e) {
        (this.currentBranch = e),
          localStorage.setItem(
            "editor-saves",
            JSON.stringify(this.savedContents)
          );
      },
      clearSaves(e) {
        const { showToast: r } = W(),
          s = `${e}-${this.currentBranch}`;
        this.savedContents[s] &&
          (delete this.savedContents[s],
          localStorage.setItem(
            "editor-saves",
            JSON.stringify(this.savedContents)
          ),
          r({
            title: "Saves Cleared",
            description: `All local saves cleared for "${e}" on branch "${this.currentBranch}"`,
          }));
      },
      clearGitContent(e, r) {
        const s = `${e}-${r}`;
        this.gitContents[s] &&
          (delete this.gitContents[s],
          localStorage.setItem(
            "editor-git-contents",
            JSON.stringify(this.gitContents)
          ));
      },
      deleteSave(e, r) {
        const { showToast: s } = W(),
          t = `${e}-${this.currentBranch}`;
        this.savedContents[t] &&
          ((this.savedContents[t] = this.savedContents[t].filter(
            (o) => o.timestamp !== r
          )),
          localStorage.setItem(
            "editor-saves",
            JSON.stringify(this.savedContents)
          ),
          s({
            title: "Save Deleted",
            description: `Local save deleted from branch "${this.currentBranch}"`,
          }));
      },
      setCollaborators(e) {
        this.collaborators = e;
      },
      setIsCollaborating(e) {
        this.isCollaborating = e;
      },
      updateContent(e, r) {
        console.log("Updating content - Length:", r.length);
        const s = `${e}-${this.currentBranch}`;
        this.gitContents[s] &&
          ((this.gitContents[s].content = r),
          (this.gitContents[s].lastFetched = new Date().toISOString())),
          this.saveContent(e, r);
      },
    },
  }),
  xr = () => {
    const e = Ie(),
      r = V(null),
      s = V(!1),
      t = De("github-current-branch", () => "main"),
      o = V([]),
      n = new Ir({ auth: localStorage.getItem("github_token") }),
      i = () => {
        const c = new URLSearchParams({
          client_id: e.public.githubClientId,
          redirect_uri: `${e.public.siteUrl}/auth/callback`,
          scope: "user repo",
          response_type: "code",
          allow_signup: "true",
        });
        window.location.href = `https://github.com/login/oauth/authorize?${c}`;
      },
      a = () => {
        localStorage.removeItem("github_token"), (r.value = null);
      },
      l = Le(() => !!localStorage.getItem("github_token")),
      E = async () => {
        if (!localStorage.getItem("github_token")) return null;
        s.value = !0;
        try {
          const { data: p } = await n.rest.users.getAuthenticated();
          return (r.value = p), p;
        } catch (p) {
          return console.error("Error fetching user:", p), null;
        } finally {
          s.value = !1;
        }
      },
      g = new Map(),
      w = new Map(),
      f = "github_commit_",
      T = (c, p, u, d) => `${f}${c}_${p}_${u}_${d}`,
      I = (c, p, u, d, m, h) => {
        {
          const v = T(c, p, u, d),
            P = { content: m, sha: h };
          localStorage.setItem(v, JSON.stringify(P));
        }
      },
      U = (c, p, u, d) => {
        {
          const m = T(c, p, u, d),
            h = localStorage.getItem(m);
          if (h) return JSON.parse(h);
        }
        return null;
      },
      b = (c, p, u, d) => {
        {
          const m = T(c, p, u, d);
          localStorage.removeItem(m);
        }
      },
      G = async (c, p, u, d) => {
        if (!l.value) throw new Error("Authentication required to get content");
        const m = d || t.value,
          h = `${c}/${p}/${u}/${m}`;
        try {
          const v = g.get(h),
            P = w.get(h);
          if (v && P)
            return (
              console.log(`Using latest cached content for ${u}`),
              { content: P, sha: v }
            );
          const { data: _ } = await n.rest.repos.getContent({
            owner: c,
            repo: p,
            path: u,
            ref: m,
          });
          if (!("content" in _)) throw new Error("Not a file");
          const k = jr(_.content);
          return (
            "sha" in _ && (g.set(h, _.sha), w.set(h, k)),
            { content: k, sha: "sha" in _ ? _.sha : null }
          );
        } catch (v) {
          throw (console.error("Error getting file content:", v), v);
        }
      },
      A = async (c, p, u, d) => {
        try {
          const m = d || t.value,
            h = U(c, p, u, m),
            v = `https://raw.githubusercontent.com/${c}/${p}/${m}/${u}?t=${Date.now()}`;
          console.log("Fetching content from URL:", v);
          const P = await fetch(v);
          if (!P.ok) {
            if (P.status === 404)
              return console.log("File not found, returning empty content"), "";
            throw new Error(`Failed to fetch content: ${P.statusText}`);
          }
          const _ = await P.text();
          return h
            ? h.content === _
              ? (console.log(
                  "GitHub content matches commit storage, clearing storage"
                ),
                b(c, p, u, m),
                _)
              : (console.log(
                  "Using commit storage content as GitHub hasn't caught up"
                ),
                h.content)
            : _;
        } catch (m) {
          if ((console.error("Error fetching content:", m), m && commitData))
            return (
              console.log("Fetch failed, using commit storage content"),
              commitData.content
            );
          throw m;
        }
      },
      Q = async (c, p, u, d, m, h, v, P) => {
        var k;
        if (!l.value)
          throw new Error("Authentication required to save content");
        const _ = h || t.value;
        try {
          await n.rest.repos.getBranch({ owner: c, repo: p, branch: _ });
          const S = U(c, p, u, _);
          let $ = (S == null ? void 0 : S.sha) || P;
          if (!$ && !v)
            try {
              const { data: D } = await n.rest.repos.getContent({
                owner: c,
                repo: p,
                path: u,
                ref: _,
              });
              "sha" in D && ($ = D.sha);
            } catch (D) {
              if (D.status !== 404) throw D;
            }
          const Re = {
              owner: c,
              repo: p,
              path: u,
              message: `${m} [branch: ${_}]`,
              content: btoa(unescape(encodeURIComponent(d))),
              branch: _,
              sha: !v && $ ? $ : void 0,
            },
            x = await n.rest.repos.createOrUpdateFileContents(Re);
          return (
            (k = x.data.content) != null &&
              k.sha &&
              I(c, p, u, _, d, x.data.content.sha),
            x.data
          );
        } catch (S) {
          throw (S.status === 409 && b(c, p, u, _), S);
        }
      },
      ye = async (c, p = "", u = !1) => {
        if (!l.value) return null;
        try {
          const d = e.public.githubOwner,
            m = e.public.githubRepo;
          if (u) {
            const h = c.endsWith("/") ? `${c}.gitkeep` : `${c}/.gitkeep`;
            await n.rest.repos.createOrUpdateFileContents({
              owner: d,
              repo: m,
              path: h,
              message: `Create new folder: ${c}`,
              content: btoa(""),
              branch: t.value,
            });
          } else
            await n.rest.repos.createOrUpdateFileContents({
              owner: d,
              repo: m,
              path: c,
              message: `Create new file: ${c}`,
              content: btoa(unescape(encodeURIComponent(p))),
              branch: t.value,
            });
          return !0;
        } catch (d) {
          throw (console.error("Error creating content:", d), d);
        }
      },
      ee = async (c) => {
        if (!l.value) return null;
        try {
          const p = e.public.githubOwner,
            u = e.public.githubRepo,
            { data: d } = await n.rest.repos.getContent({
              owner: p,
              repo: u,
              path: c,
              ref: t.value,
            });
          if (Array.isArray(d)) for (const m of d) await ee(m.path);
          else
            await n.rest.repos.deleteFile({
              owner: p,
              repo: u,
              path: c,
              message: `Delete: ${c}`,
              sha: d.sha,
              branch: t.value,
            });
          return !0;
        } catch (p) {
          throw (console.error("Error deleting content:", p), p);
        }
      },
      ve = async (c) => {
        const p = $r();
        (t.value = c), p.setBranch(c);
      },
      H = async () => {
        if (localStorage.getItem("github_token")) {
          s.value = !0;
          try {
            const { data: p } = await n.rest.repos.listBranches({
              owner: e.public.githubOwner,
              repo: e.public.githubRepo,
            });
            (o.value = p.map((u) => u.name)), (s.value = !1);
          } catch (p) {
            throw (
              ((s.value = !1), console.error("Error fetching branches:", p), p)
            );
          }
        }
      },
      re = async (c) => {
        if (!l.value) return null;
        try {
          console.log(`Creating new branch: ${c} from ${t.value}`);
          const { data: p } = await n.rest.git.getRef({
            owner: "tiresomefanatic",
            repo: "heroechotest",
            ref: `heads/${t.value}`,
          });
          return (
            await n.rest.git.createRef({
              owner: "tiresomefanatic",
              repo: "heroechotest",
              ref: `refs/heads/${c}`,
              sha: p.object.sha,
            }),
            console.log(`Created branch ${c}, fetching updated branch list`),
            await H(),
            console.log(`Switching to new branch: ${c}`),
            (t.value = c),
            !0
          );
        } catch (p) {
          return console.error("Error creating branch:", p), null;
        }
      },
      Ge = async () => {
        if (!l.value) return [];
        try {
          const { data: c } = await n.rest.pulls.list({
            owner: "tiresomefanatic",
            repo: "heroechotest",
            state: "open",
          });
          return await Promise.all(
            c.map(async (u) => {
              const { data: d } = await n.rest.pulls.get({
                owner: "tiresomefanatic",
                repo: "heroechotest",
                pull_number: u.number,
              });
              return d;
            })
          );
        } catch (c) {
          return console.error("Error fetching pull requests:", c), [];
        }
      },
      Pe = async () => {
        if (!l.value) return [];
        try {
          const { data: c } = await n.rest.repos.listCommits({
            owner: "tiresomefanatic",
            repo: "heroechotest",
            per_page: 10,
          });
          return c;
        } catch (c) {
          return console.error("Error fetching commits:", c), [];
        }
      },
      ke = async (c, p, u, d) => {
        if (!l.value) return null;
        try {
          try {
            await n.rest.repos.getBranch({
              owner: "tiresomefanatic",
              repo: "heroechotest",
              branch: c,
            }),
              await n.rest.repos.getBranch({
                owner: "tiresomefanatic",
                repo: "heroechotest",
                branch: p,
              });
          } catch (h) {
            throw (
              (console.error("Branch validation failed:", h),
              new Error(`One or both branches (${c}, ${p}) do not exist`))
            );
          }
          const { data: m } = await n.rest.pulls.create({
            owner: "tiresomefanatic",
            repo: "heroechotest",
            base: c,
            head: p,
            title: u,
            body: d,
          });
          return m;
        } catch (m) {
          throw (console.error("Error creating pull request:", m), m);
        }
      },
      Se = async (c, p, u) => {
        if (!l.value) return null;
        try {
          const { data: d } = await n.rest.pulls.get({
              owner: "tiresomefanatic",
              repo: "heroechotest",
              pull_number: c,
            }),
            m = `conflict-resolution-${c}-${Date.now()}`;
          await re(m);
          let h;
          if (
            (u === "ours"
              ? (h = await A("tiresomefanatic", "heroechotest", p, d.base.ref))
              : (h = await A("tiresomefanatic", "heroechotest", p, d.head.ref)),
            !h)
          )
            throw new Error("Could not get file content");
          return (
            await Q(
              "tiresomefanatic",
              "heroechotest",
              p,
              h,
              `Resolve conflict in ${p} using ${u} changes`,
              m
            ),
            !0
          );
        } catch (d) {
          return console.error("Error resolving conflict:", d), null;
        }
      },
      Oe = async (c, p = "images") => {
        if (!l.value)
          throw new Error("Authentication required to upload images");
        try {
          const u = await new Promise((P, _) => {
              const k = new FileReader();
              (k.onload = () => {
                const S = k.result.split(",")[1];
                P(S);
              }),
                (k.onerror = _),
                k.readAsDataURL(c);
            }),
            m = `${new Date().getTime()}-${c.name.replace(
              /[^a-zA-Z0-9.-]/g,
              "-"
            )}`,
            h = `public/${p}/${m}`,
            v = await n.rest.repos.createOrUpdateFileContents({
              owner: e.public.githubOwner,
              repo: e.public.githubRepo,
              path: h,
              message: `Upload image: ${m}`,
              content: u,
              branch: t.value,
            });
          return `https://raw.githubusercontent.com/${e.public.githubOwner}/${e.public.githubRepo}/${t.value}/${h}`;
        } catch (u) {
          throw (console.error("Error uploading image:", u), u);
        }
      },
      Ae = () => {
        {
          const c = localStorage.getItem("github_repo_info");
          if (c) return JSON.parse(c);
        }
        return { owner: "tiresomefanatic", repo: "heroechotest" };
      };
    return (
      l.value && (E(), H()),
      {
        user: r,
        loading: s,
        currentBranch: t,
        branches: o,
        login: i,
        logout: a,
        isLoggedIn: l,
        getRawContent: A,
        saveFileContent: Q,
        getPullRequests: Ge,
        getCommits: Pe,
        resolveConflict: Se,
        fetchBranches: H,
        createBranch: re,
        switchBranch: ve,
        createNewPullRequest: ke,
        getFileContent: G,
        createNewContent: ye,
        deleteContent: ee,
        uploadImage: Oe,
        getRepoInfo: Ae,
      }
    );
  };
function jr(e) {
  return decodeURIComponent(escape(window.atob(e.replace(/\n/g, ""))));
}
export { $r as a, xr as u };
