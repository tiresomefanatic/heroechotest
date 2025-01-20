import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useGithub } from './useGithub-nVl696qf.mjs';
import _sfc_main$1 from './Modal-DHt0FM9f.mjs';
import '@octokit/rest';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentCreator",
  __ssrInlineRender: true,
  setup(__props) {
    const github = useGithub();
    const showNewFileModal = ref(false);
    const showNewFolderModal = ref(false);
    const newFilePath = ref("");
    const newFileContent = ref("");
    const newFolderPath = ref("");
    const createFile = async () => {
      try {
        await github.createNewContent(newFilePath.value, newFileContent.value, false);
        showNewFileModal.value = false;
        newFilePath.value = "";
        newFileContent.value = "";
      } catch (error) {
        console.error("Error creating file:", error);
      }
    };
    const createFolder = async () => {
      try {
        await github.createNewContent(newFolderPath.value, "", true);
        showNewFolderModal.value = false;
        newFolderPath.value = "";
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-creator" }, _attrs))}><div class="flex items-center gap-4 mb-4"><button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> New File </button><button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"> New Folder </button></div>`);
      if (showNewFileModal.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          onClose: ($event) => showNewFileModal.value = false
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Create New File`);
            } else {
              return [
                createTextVNode("Create New File")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>File Path</label><input${ssrRenderAttr("value", newFilePath.value)} type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., docs/getting-started.md" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Content</label><textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="4"${_scopeId}>${ssrInterpolate(newFileContent.value)}</textarea></div><div class="flex justify-end gap-2"${_scopeId}><button type="button" class="px-4 py-2 border rounded"${_scopeId}> Cancel </button><button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"${_scopeId}> Create File </button></div></form>`);
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(createFile, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "File Path"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => newFilePath.value = $event,
                      type: "text",
                      class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      placeholder: "e.g., docs/getting-started.md",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, newFilePath.value]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Content"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => newFileContent.value = $event,
                      class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      rows: "4"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, newFileContent.value]
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode("button", {
                      type: "button",
                      class: "px-4 py-2 border rounded",
                      onClick: ($event) => showNewFileModal.value = false
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("button", {
                      type: "submit",
                      class: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    }, " Create File ")
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showNewFolderModal.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          onClose: ($event) => showNewFolderModal.value = false
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Create New Folder`);
            } else {
              return [
                createTextVNode("Create New Folder")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Folder Path</label><input${ssrRenderAttr("value", newFolderPath.value)} type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g., docs/advanced" required${_scopeId}></div><div class="flex justify-end gap-2"${_scopeId}><button type="button" class="px-4 py-2 border rounded"${_scopeId}> Cancel </button><button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"${_scopeId}> Create Folder </button></div></form>`);
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(createFolder, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Folder Path"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => newFolderPath.value = $event,
                      type: "text",
                      class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                      placeholder: "e.g., docs/advanced",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, newFolderPath.value]
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode("button", {
                      type: "button",
                      class: "px-4 py-2 border rounded",
                      onClick: ($event) => showNewFolderModal.value = false
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("button", {
                      type: "submit",
                      class: "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    }, " Create Folder ")
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentCreator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentCreator-DeHD8UEC.mjs.map
