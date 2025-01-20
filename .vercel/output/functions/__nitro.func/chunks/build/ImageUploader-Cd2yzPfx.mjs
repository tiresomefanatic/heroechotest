import { useSSRContext, defineComponent, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useGithub } from './useGithub-nVl696qf.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@octokit/rest';
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
  __name: "ImageUploader",
  __ssrInlineRender: true,
  emits: ["uploaded"],
  setup(__props, { emit: __emit }) {
    useGithub();
    ref(null);
    const uploading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "image-uploader" }, _attrs))} data-v-4dde82fd><input type="file" accept="image/*" class="hidden" data-v-4dde82fd><button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""} data-v-4dde82fd>${ssrInterpolate(uploading.value ? "Uploading..." : "Upload Image")}</button>`);
      if (error.value) {
        _push(`<p class="text-red-500 mt-2" data-v-4dde82fd>${ssrInterpolate(error.value)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageUploader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const ImageUploader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4dde82fd"]]);

export { ImageUploader as default };
//# sourceMappingURL=ImageUploader-Cd2yzPfx.mjs.map
