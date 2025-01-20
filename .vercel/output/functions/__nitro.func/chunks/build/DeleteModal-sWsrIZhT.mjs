import { useSSRContext, defineComponent, unref } from 'vue';
import { ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, s as storeToRefs } from './server.mjs';
import { u as useStore } from './index-CVfz7Ope.mjs';
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
import './cookie-CUnBGDd5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteModal",
  __ssrInlineRender: true,
  emits: ["toggle-delete-modal"],
  setup(__props, { emit: __emit }) {
    const { docTitle, rawText, docs, currentDocId } = storeToRefs(useStore());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="delete__modal d-flex flex-column w-100 h-100 position-absolute" data-v-bf27dbb7><h4 class="weight-700" data-v-bf27dbb7>Delete this document?</h4><p class="weight-400" data-v-bf27dbb7>Are you sure you want to delete the \u2018${ssrInterpolate(unref(docTitle))}\u2019 document and its contents? This action cannot be reversed.</p><button class="w-100 weight-400" data-v-bf27dbb7>Confirm &amp; Delete</button></div><div class="modal-overlay" data-v-bf27dbb7></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DeleteModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bf27dbb7"]]);

export { __nuxt_component_4 as default };
//# sourceMappingURL=DeleteModal-sWsrIZhT.mjs.map
