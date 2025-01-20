import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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
  __name: "NewDoc",
  __ssrInlineRender: true,
  setup(__props) {
    storeToRefs(useStore());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "weight-300 text-center",
        type: "button"
      }, _attrs))} data-v-73022baa>+ New Document</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/buttons/NewDoc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73022baa"]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=NewDoc-BIIL6CA-.mjs.map
