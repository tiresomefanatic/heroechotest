import {
  g as K,
  M as H,
  r as c,
  i as k,
  j as p,
  ak as Q,
  o as m,
  c as h,
  b as s,
  n as E,
  p as v,
  e as _,
  t as T,
  m as C,
  d as B,
  q as y,
  O as I,
  y as W,
  P as X,
  aa as N,
  z as Y,
  a as Z,
} from "./DOh1AU71.js";
import ee from "./BzERAxPy.js";
import te from "./CI8OHxR3.js";
import ae from "./RqieeA3v.js";
import { u as se } from "./CJITND_o.js";
import { a as oe, u as le } from "./DuyO21MA.js";
import "./Cq0864AT.js";
import "./CjbS9Grt.js";
import "./DY7prswQ.js";
const ie = { class: "editor-container" },
  ne = { class: "editor-header" },
  re = { class: "header-actions" },
  ce = ["disabled"],
  ue = ["disabled"],
  de = { class: "editor-layout" },
  me = { class: "editor-content" },
  ve = { class: "editor-pane" },
  fe = ["value"],
  ge = { class: "preview-pane" },
  he = { key: 0, class: "commit-dialog" },
  pe = { class: "commit-dialog-content" },
  _e = { class: "commit-form" },
  Ce = { class: "commit-actions" },
  ye = ["disabled"],
  be = K({
    __name: "Editor",
    props: { content: {}, filePath: {} },
    emits: ["update:content", "save", "error"],
    setup(V, { emit: F }) {
      const o = V,
        L = F,
        b = se(),
        { rawText: M, isPreviewActive: i } = H(b),
        u = oe(),
        { fetchFileContent: Pe, currentBranch: P, saveFileContent: U } = le(),
        { showToast: n } = Y(),
        a = c(o.content || ""),
        f = c(!1),
        r = c(""),
        d = c(!1),
        A = k(() => o.filePath && P.value),
        S = k(() => {
          const e = u.getCurrentGitContent(o.filePath || "");
          return e ? a.value !== e.content : a.value !== "";
        }),
        D = async () => {
          if (!(!o.filePath || !r.value.trim())) {
            d.value = !0;
            try {
              await U(
                "tiresomefanatic",
                "heroechotest",
                o.filePath,
                a.value,
                r.value.trim(),
                P.value
              ),
                u.updateContent(o.filePath, a.value),
                n({
                  title: "Success",
                  message: "Changes committed successfully",
                  type: "success",
                }),
                (f.value = !1),
                (r.value = "");
            } catch (e) {
              console.error("Commit error:", e);
              const t =
                e.status === 409
                  ? "File was modified elsewhere. Please try committing again."
                  : e.message || "Failed to commit changes";
              n({ title: "Error", message: t, type: "error", duration: 5e3 });
            } finally {
              d.value = !1;
            }
          }
        },
        g = c(0),
        w = c(null),
        G = (e) => {
          const t = w.value;
          if (!t) return;
          const l = t.selectionStart,
            j = t.selectionEnd,
            q = t.value.substring(0, l),
            J = t.value.substring(j);
          (a.value = q + e + J),
            N(() => {
              t.focus();
              const x = l + e.length;
              t.setSelectionRange(x, x);
            });
        },
        R = (e) => {
          const t = `![Image](${e})`;
          G(t);
        };
      p(
        () => o.content,
        (e) => {
          e && e !== a.value && (a.value = e.toString());
        }
      ),
        Q(() => {
          a.value !== "" && L("update:content", a.value);
        }),
        p(
          () => M.value,
          (e) => {
            e &&
              e !== a.value &&
              (console.log("rawText changed, updating localContent:", e.length),
              (a.value = e),
              g.value++);
          }
        );
      const $ = () => {
          i.value = !i.value;
        },
        z = () => {
          o.filePath &&
            (console.log("Editor saving content - Length:", a.value.length),
            console.log("Preview:", a.value.substring(0, 100) + "..."),
            u.saveContent(o.filePath, a.value),
            b.updateRawText(a.value),
            localStorage.setItem("rawText", JSON.stringify(a.value)),
            n({
              title: "Changes Saved",
              message: "Successfully saved changes",
              type: "success",
            }));
        },
        O = async (e) => {
          if (
            (console.log(
              "Editor received content - Length:",
              e == null ? void 0 : e.length
            ),
            console.log(
              "Preview:",
              (e == null ? void 0 : e.substring(0, 100)) + "..."
            ),
            !e)
          ) {
            console.error("Empty content received"),
              n({
                title: "Error",
                message: "No content to load",
                type: "error",
              });
            return;
          }
          try {
            u.updateContent(o.filePath || "", e),
              (a.value = e),
              g.value++,
              await N(),
              n({
                title: "Save Loaded",
                message: "Successfully loaded saved version",
                type: "success",
              });
          } catch (t) {
            console.error("Error loading content:", t),
              n({
                title: "Error",
                message: "Failed to load content",
                type: "error",
              });
          }
        };
      return (
        p(
          () => {
            var e;
            return (e = u.getCurrentGitContent(o.filePath)) == null
              ? void 0
              : e.content;
          },
          (e) => {
            e &&
              (console.log(
                "Editor content updated from store:",
                e.substring(0, 100) + "..."
              ),
              (a.value = e),
              g.value++);
          }
        ),
        (e, t) => (
          m(),
          h("div", ie, [
            s("div", ne, [
              s("div", re, [
                s(
                  "button",
                  { class: E(["header-button", { active: v(i) }]), onClick: $ },
                  [
                    s(
                      "i",
                      { class: E(["fas", v(i) ? "fa-edit" : "fa-eye"]) },
                      null,
                      2
                    ),
                    _(" " + T(v(i) ? "Edit" : "Preview"), 1),
                  ],
                  2
                ),
                s(
                  "button",
                  {
                    class: "header-button",
                    onClick: z,
                    disabled: !S.value,
                    title: "Save Changes",
                  },
                  t[5] ||
                    (t[5] = [
                      s("i", { class: "fas fa-save" }, null, -1),
                      _(" Save "),
                    ]),
                  8,
                  ce
                ),
                A.value
                  ? (m(),
                    h(
                      "button",
                      {
                        key: 0,
                        class: "header-button",
                        onClick: t[0] || (t[0] = (l) => (f.value = !0)),
                        disabled: !S.value || d.value,
                        title: "Commit Changes",
                      },
                      t[6] ||
                        (t[6] = [
                          s("i", { class: "fas fa-code-commit" }, null, -1),
                          _(" Commit "),
                        ]),
                      8,
                      ue
                    ))
                  : C("", !0),
                B(ae, { onUploaded: R }),
              ]),
            ]),
            s("div", de, [
              s("div", me, [
                y(
                  s(
                    "div",
                    ve,
                    [
                      (m(),
                      h(
                        "textarea",
                        {
                          ref_key: "editorTextarea",
                          ref: w,
                          class: "editor__area",
                          value: a.value,
                          onInput:
                            t[1] || (t[1] = (l) => (a.value = l.target.value)),
                          key: g.value,
                        },
                        null,
                        40,
                        fe
                      )),
                    ],
                    512
                  ),
                  [[I, !v(i)]]
                ),
                y(
                  s(
                    "div",
                    ge,
                    [B(ee, { markdown: a.value }, null, 8, ["markdown"])],
                    512
                  ),
                  [[I, v(i)]]
                ),
              ]),
              o.filePath
                ? (m(),
                  W(
                    te,
                    {
                      key: 0,
                      filePath: o.filePath,
                      onLoadSave: t[2] || (t[2] = (l) => O(l)),
                    },
                    null,
                    8,
                    ["filePath"]
                  ))
                : C("", !0),
            ]),
            f.value
              ? (m(),
                h("div", he, [
                  s("div", pe, [
                    t[7] || (t[7] = s("h3", null, "Commit Changes", -1)),
                    s("div", _e, [
                      y(
                        s(
                          "textarea",
                          {
                            "onUpdate:modelValue":
                              t[3] || (t[3] = (l) => (r.value = l)),
                            placeholder: "Enter commit message...",
                            rows: "3",
                            class: "commit-message-input",
                          },
                          null,
                          512
                        ),
                        [[X, r.value]]
                      ),
                      s("div", Ce, [
                        s(
                          "button",
                          {
                            class: "cancel-button",
                            onClick: t[4] || (t[4] = (l) => (f.value = !1)),
                          },
                          " Cancel "
                        ),
                        s(
                          "button",
                          {
                            class: "commit-button",
                            onClick: D,
                            disabled: !r.value.trim() || d.value,
                          },
                          T(d.value ? "Committing..." : "Commit"),
                          9,
                          ye
                        ),
                      ]),
                    ]),
                  ]),
                ]))
              : C("", !0),
          ])
        )
      );
    },
  }),
  Ve = Z(be, [["__scopeId", "data-v-34b221aa"]]);
export { Ve as default };
