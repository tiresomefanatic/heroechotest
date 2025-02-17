import {
  g as ne,
  r as u,
  i as T,
  j as L,
  k as le,
  o as a,
  c as o,
  b as s,
  F as C,
  x as S,
  e as x,
  m as h,
  y as re,
  p as f,
  q as ce,
  P as ie,
  n as E,
  t as r,
  z as ue,
  a as de,
} from "./DOh1AU71.js";
import { u as he, a as A } from "./DuyO21MA.js";
import ve from "./Cq0864AT.js";
import { u as me } from "./CJITND_o.js";
import "./CjbS9Grt.js";
import "./DY7prswQ.js";
const _e = window.setInterval,
  ye = { key: 0 },
  pe = { key: 1 },
  fe = { class: "sidebar-content" },
  be = { class: "tabs" },
  ge = ["onClick"],
  ke = { key: 0, class: "count" },
  we = { class: "tab-content" },
  Ce = { key: 0, class: "history-tab" },
  Se = { key: 0, class: "loading-state" },
  Be = { key: 1, class: "empty-state" },
  Pe = { key: 2, class: "commit-list" },
  Ee = ["onClick"],
  $e = { class: "commit-header" },
  qe = { class: "commit-message" },
  Re = { class: "commit-meta" },
  Te = { class: "commit-author" },
  Le = ["src", "alt"],
  xe = { class: "commit-sha" },
  Ne = { class: "commit-date" },
  Fe = { key: 1 },
  De = { class: "pr-actions-header" },
  Ie = { key: 1, class: "loading-state" },
  Ve = { key: 2, class: "empty-state" },
  Ae = { key: 3, class: "pr-list" },
  Ge = { class: "pr-header" },
  He = { class: "pr-number" },
  Me = { class: "pr-title" },
  ze = { class: "pr-meta" },
  Ue = { class: "pr-author" },
  je = ["src", "alt"],
  Ye = { class: "pr-actions" },
  Je = ["onClick"],
  Ke = { key: 2 },
  Oe = { key: 0, class: "branch-controls" },
  Qe = { class: "branch-select-wrapper" },
  We = ["value"],
  Xe = ["value"],
  Ze = { key: 1, class: "new-branch-form" },
  et = { class: "branch-actions" },
  tt = ["disabled"],
  st = { key: 1, class: "login-prompt" },
  at = { key: 3 },
  ot = { key: 0, class: "empty-state" },
  nt = { key: 1, class: "saves-list" },
  lt = { class: "save-info" },
  rt = { class: "save-timestamp" },
  ct = { class: "save-branch" },
  it = { class: "save-actions" },
  ut = ["onClick"],
  dt = ["onClick"],
  ht = ne({
    __name: "CollaborationSidebar",
    props: { filePath: {} },
    emits: ["load-save"],
    setup(G, { emit: H }) {
      const m = G,
        N = H,
        B = u(!1),
        i = u("history"),
        v = u(!1),
        b = u([]),
        g = u([]),
        k = u(!1),
        _ = u(""),
        w = u(!1);
      u(!1), u("");
      const {
          isLoggedIn: y,
          currentBranch: $,
          branches: q,
          getCommits: M,
          getPullRequests: z,
          fetchBranches: F,
          switchBranch: U,
          createBranch: j,
          resolveConflict: vt,
          fetchFileContent: Y,
          saveFileContent: mt,
          getRawContent: J,
        } = he(),
        { showToast: d } = ue(),
        D = me(),
        I = A(),
        R = T(() => I.getSavedContents(m.filePath)),
        K = T(() => {
          var t, n, e;
          return [
            { id: "history", label: "History", count: b.value.length },
            {
              id: "branches",
              label: "Branches",
              count: ((t = q.value) == null ? void 0 : t.length) || 0,
            },
            {
              id: "prs",
              label: "Pull Requests",
              count: ((n = g.value) == null ? void 0 : n.length) || 0,
            },
            {
              id: "saves",
              label: "Saves",
              count: ((e = R.value) == null ? void 0 : e.length) || 0,
            },
          ];
        });
      T(() => !1);
      const O = () => {
          B.value = !B.value;
        },
        Q = async (t) => {
          (i.value = t),
            t === "history" ? await P() : t === "prs" && (await p());
        },
        P = async () => {
          if (y.value) {
            v.value = !0;
            try {
              const t = await M();
              t &&
                Array.isArray(t) &&
                ((b.value = t), console.log("Loaded commits:", b.value));
            } catch (t) {
              console.error("Error loading commits:", t),
                d({
                  title: "Error",
                  message: "Failed to load commit history",
                  type: "error",
                });
            } finally {
              v.value = !1;
            }
          }
        },
        W = async (t) => {
          try {
            if (t.html_url) window.open(t.html_url, "_blank");
            else {
              const e = `https://github.com/tiresomefanatic/heroechotest/commit/${t.sha}`;
              window.open(e, "_blank");
            }
            const n = await J(
              "tiresomefanatic",
              "heroechotest",
              m.filePath,
              t.sha
            );
            n &&
              (N("load-save", n),
              d({
                title: "Success",
                message: "Loaded content from commit",
                type: "success",
              }));
          } catch (n) {
            console.error("Error loading commit content:", n),
              d({
                title: "Error",
                message: "Failed to load commit content",
                type: "error",
              });
          }
        },
        p = async () => {
          if (y.value) {
            v.value = !0;
            try {
              const t = await z();
              t &&
                Array.isArray(t) &&
                ((g.value = t), console.log("Loaded pull requests:", g.value));
            } catch (t) {
              console.error("Error loading pull requests:", t),
                d({
                  title: "Error",
                  message: "Failed to load pull requests",
                  type: "error",
                });
            } finally {
              v.value = !1;
            }
          }
        },
        X = async (t) => {
          const e = t.target.value;
          if (e !== $.value) {
            const c = A();
            if (m.filePath) {
              const l = D.rawText;
              c.saveContent(m.filePath, l);
            }
            await U(e);
            try {
              const { content: l, sha: oe } = await Y(m.filePath, e);
              l &&
                (c.saveGitContent(m.filePath, l, e, oe),
                (D.rawText = l),
                d({
                  title: "Branch Switched",
                  message: `Successfully switched to branch "${e}"`,
                  type: "success",
                }));
            } catch (l) {
              console.error("Error loading content for new branch:", l),
                d({
                  title: "Error",
                  message: `Failed to load content for branch "${e}"`,
                  type: "error",
                });
            }
          }
        },
        Z = async () => {
          if (_.value) {
            v.value = !0;
            try {
              (await j(_.value)) &&
                (d({
                  title: "Success",
                  message: `Created branch: ${_.value}`,
                  type: "success",
                }),
                (_.value = ""),
                (k.value = !1),
                await P());
            } catch (t) {
              console.error("Error creating branch:", t),
                d({
                  title: "Error",
                  message: "Failed to create branch",
                  type: "error",
                });
            } finally {
              v.value = !1;
            }
          }
        },
        ee = (t) =>
          t.mergeable === !1
            ? "Has Conflicts"
            : t.mergeable === !0
            ? "Ready to Merge"
            : "Checking",
        te = (t) => {
          window.open(t, "_blank");
        },
        se = async () => {
          (w.value = !1), await p();
        },
        ae = (t) => {
          if ((console.log("Loading save:", t), !t || !t.content)) {
            console.error("Invalid save:", t),
              d({
                title: "Error",
                message: "Invalid save content",
                type: "error",
              });
            return;
          }
          N("load-save", t.content);
        },
        V = (t) => {
          const n = new Date(t),
            c = new Date().getTime() - n.getTime(),
            l = Math.floor(c / (1e3 * 60 * 60 * 24));
          return l === 0
            ? "Today"
            : l === 1
            ? "Yesterday"
            : l < 7
            ? `${l} days ago`
            : n.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
        };
      return (
        L(y, async (t) => {
          t && (await F(), await P(), await p());
        }),
        L(i, async (t) => {
          t === "prs" && (await p());
        }),
        L([i, y], () => {
          if (i.value === "prs" && y.value) {
            const t = _e(async () => {
              i.value === "prs" && (await p());
            }, 3e4);
            return () => clearInterval(t);
          }
        }),
        le(async () => {
          y.value && (await F(), await P(), await p());
        }),
        (t, n) => (
          a(),
          o(
            "div",
            { class: E(["collaboration-sidebar", { open: B.value }]) },
            [
              s("button", { class: "toggle-button", onClick: O }, [
                B.value ? (a(), o("span", pe, "×")) : (a(), o("span", ye, "☰")),
              ]),
              s("div", fe, [
                s("div", be, [
                  (a(!0),
                  o(
                    C,
                    null,
                    S(
                      K.value,
                      (e) => (
                        a(),
                        o(
                          "button",
                          {
                            key: e.id,
                            class: E([
                              "tab-button",
                              { active: i.value === e.id },
                            ]),
                            onClick: (c) => Q(e.id),
                          },
                          [
                            x(r(e.label) + " ", 1),
                            e.count
                              ? (a(), o("span", ke, r(e.count), 1))
                              : h("", !0),
                          ],
                          10,
                          ge
                        )
                      )
                    ),
                    128
                  )),
                ]),
                s("div", we, [
                  i.value === "history"
                    ? (a(),
                      o("div", Ce, [
                        v.value
                          ? (a(),
                            o(
                              "div",
                              Se,
                              n[5] ||
                                (n[5] = [
                                  s("div", { class: "spinner" }, null, -1),
                                  x(" Loading commits... "),
                                ])
                            ))
                          : b.value.length === 0
                          ? (a(), o("div", Be, " No commit history available "))
                          : (a(),
                            o("div", Pe, [
                              (a(!0),
                              o(
                                C,
                                null,
                                S(b.value, (e) => {
                                  var c;
                                  return (
                                    a(),
                                    o(
                                      "div",
                                      {
                                        key: e.sha,
                                        class: "commit-item",
                                        onClick: (l) => W(e),
                                        title: "Click to view on GitHub",
                                      },
                                      [
                                        s("div", $e, [
                                          s("div", qe, r(e.commit.message), 1),
                                        ]),
                                        s("div", Re, [
                                          s("div", Te, [
                                            (c = e.author) != null &&
                                            c.avatar_url
                                              ? (a(),
                                                o(
                                                  "img",
                                                  {
                                                    key: 0,
                                                    src: e.author.avatar_url,
                                                    alt: e.commit.author.name,
                                                    class: "author-avatar",
                                                  },
                                                  null,
                                                  8,
                                                  Le
                                                ))
                                              : h("", !0),
                                            s(
                                              "span",
                                              null,
                                              r(e.commit.author.name),
                                              1
                                            ),
                                          ]),
                                          s(
                                            "div",
                                            xe,
                                            r(e.sha.substring(0, 7)),
                                            1
                                          ),
                                          s(
                                            "div",
                                            Ne,
                                            r(V(e.commit.author.date)),
                                            1
                                          ),
                                        ]),
                                      ],
                                      8,
                                      Ee
                                    )
                                  );
                                }),
                                128
                              )),
                            ])),
                      ]))
                    : h("", !0),
                  i.value === "prs"
                    ? (a(),
                      o("div", Fe, [
                        s("div", De, [
                          w.value
                            ? h("", !0)
                            : (a(),
                              o(
                                "button",
                                {
                                  key: 0,
                                  class: "create-pr-button",
                                  onClick:
                                    n[0] || (n[0] = (e) => (w.value = !0)),
                                },
                                " Create Pull Request "
                              )),
                        ]),
                        w.value
                          ? (a(),
                            re(
                              ve,
                              {
                                key: 0,
                                branches: f(q),
                                currentBranch: f($),
                                onCreated: se,
                                onCancel:
                                  n[1] || (n[1] = (e) => (w.value = !1)),
                              },
                              null,
                              8,
                              ["branches", "currentBranch"]
                            ))
                          : v.value
                          ? (a(), o("div", Ie, " Loading pull requests... "))
                          : g.value.length === 0
                          ? (a(), o("div", Ve, " No open pull requests "))
                          : (a(),
                            o("div", Ae, [
                              (a(!0),
                              o(
                                C,
                                null,
                                S(
                                  g.value,
                                  (e) => (
                                    a(),
                                    o(
                                      "div",
                                      {
                                        key: e.number,
                                        class: E([
                                          "pr-item",
                                          {
                                            "has-conflicts": e.mergeable === !1,
                                          },
                                        ]),
                                      },
                                      [
                                        s("div", Ge, [
                                          s("span", He, "#" + r(e.number), 1),
                                          s("span", Me, r(e.title), 1),
                                        ]),
                                        s("div", ze, [
                                          s("span", Ue, [
                                            s(
                                              "img",
                                              {
                                                src: e.user.avatar_url,
                                                alt: e.user.login,
                                                class: "author-avatar",
                                              },
                                              null,
                                              8,
                                              je
                                            ),
                                            x(" " + r(e.user.login), 1),
                                          ]),
                                          s(
                                            "span",
                                            {
                                              class: E([
                                                "pr-status",
                                                e.mergeable_state,
                                              ]),
                                            },
                                            r(ee(e)),
                                            3
                                          ),
                                        ]),
                                        s("div", Ye, [
                                          s(
                                            "button",
                                            {
                                              class: "action-button",
                                              onClick: (c) => te(e.html_url),
                                            },
                                            " View on GitHub ",
                                            8,
                                            Je
                                          ),
                                        ]),
                                      ],
                                      2
                                    )
                                  )
                                ),
                                128
                              )),
                            ])),
                      ]))
                    : h("", !0),
                  i.value === "branches"
                    ? (a(),
                      o("div", Ke, [
                        f(y)
                          ? (a(),
                            o("div", Oe, [
                              s("div", Qe, [
                                n[6] ||
                                  (n[6] = s(
                                    "label",
                                    null,
                                    "Current Branch:",
                                    -1
                                  )),
                                s(
                                  "select",
                                  {
                                    value: f($),
                                    onChange: X,
                                    class: "branch-select",
                                  },
                                  [
                                    (a(!0),
                                    o(
                                      C,
                                      null,
                                      S(
                                        f(q),
                                        (e) => (
                                          a(),
                                          o(
                                            "option",
                                            { key: e, value: e },
                                            r(e),
                                            9,
                                            Xe
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  40,
                                  We
                                ),
                              ]),
                              k.value
                                ? h("", !0)
                                : (a(),
                                  o(
                                    "button",
                                    {
                                      key: 0,
                                      onClick:
                                        n[2] || (n[2] = (e) => (k.value = !0)),
                                      class: "create-branch-button",
                                    },
                                    " Create New Branch "
                                  )),
                              k.value
                                ? (a(),
                                  o("div", Ze, [
                                    ce(
                                      s(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            n[3] ||
                                            (n[3] = (e) => (_.value = e)),
                                          placeholder: "Enter branch name",
                                          class: "branch-input",
                                        },
                                        null,
                                        512
                                      ),
                                      [[ie, _.value]]
                                    ),
                                    s("div", et, [
                                      s(
                                        "button",
                                        {
                                          onClick: Z,
                                          disabled: !_.value,
                                          class: "create-button",
                                        },
                                        " Create ",
                                        8,
                                        tt
                                      ),
                                      s(
                                        "button",
                                        {
                                          onClick:
                                            n[4] ||
                                            (n[4] = (e) => (k.value = !1)),
                                          class: "cancel-button",
                                        },
                                        " Cancel "
                                      ),
                                    ]),
                                  ]))
                                : h("", !0),
                            ]))
                          : (a(),
                            o("div", st, " Please log in to manage branches ")),
                      ]))
                    : h("", !0),
                  i.value === "saves"
                    ? (a(),
                      o("div", at, [
                        R.value.length === 0
                          ? (a(), o("div", ot, " No saved changes available "))
                          : (a(),
                            o("div", nt, [
                              (a(!0),
                              o(
                                C,
                                null,
                                S(
                                  R.value,
                                  (e) => (
                                    a(),
                                    o(
                                      "div",
                                      { key: e.timestamp, class: "save-item" },
                                      [
                                        s("div", lt, [
                                          s("span", rt, r(V(e.timestamp)), 1),
                                          s(
                                            "span",
                                            ct,
                                            "on branch " + r(e.branch),
                                            1
                                          ),
                                        ]),
                                        s("div", it, [
                                          s(
                                            "button",
                                            {
                                              onClick: (c) => ae(e),
                                              class: "action-button",
                                            },
                                            " Load ",
                                            8,
                                            ut
                                          ),
                                          s(
                                            "button",
                                            {
                                              onClick: (c) =>
                                                f(I).deleteSave(
                                                  m.filePath,
                                                  e.timestamp
                                                ),
                                              class: "action-button delete",
                                            },
                                            " Delete ",
                                            8,
                                            dt
                                          ),
                                        ]),
                                      ]
                                    )
                                  )
                                ),
                                128
                              )),
                            ])),
                      ]))
                    : h("", !0),
                ]),
              ]),
            ],
            2
          )
        )
      );
    },
  }),
  kt = de(ht, [["__scopeId", "data-v-b058184d"]]);
export { kt as default };
