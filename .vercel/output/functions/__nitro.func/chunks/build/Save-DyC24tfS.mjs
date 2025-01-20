import __nuxt_component_0 from './Save-Cli2SEzU.mjs';
import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "Save",
  __ssrInlineRender: true,
  emits: ["save-changes"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsSave = __nuxt_component_0;
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "d-flex align-items-center gap-3 weight-300",
        type: "button"
      }, _attrs))} data-v-dbcf6939>`);
      _push(ssrRenderComponent(_component_IconsSave, { class: "icon" }, null, _parent));
      _push(`<span data-v-dbcf6939>Save Changes</span></button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/buttons/Save.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dbcf6939"]]);

export { __nuxt_component_4 as default };
//# sourceMappingURL=Save-DyC24tfS.mjs.map
