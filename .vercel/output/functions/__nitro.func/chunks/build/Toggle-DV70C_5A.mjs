import _sfc_main$1 from './Theme-DrGsUpku.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "Toggle",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentTheme } = storeToRefs(useStore());
    useStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsTheme = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex align-items-center gap-5" }, _attrs))} data-v-3ed31c1d>`);
      _push(ssrRenderComponent(_component_IconsTheme, {
        variant: "dark",
        class: { active: unref(currentTheme) === "dark" }
      }, null, _parent));
      _push(`<div class="toggle position-relative" data-v-3ed31c1d><input id="switch" class="d-none" type="checkbox"${ssrIncludeBooleanAttr(unref(currentTheme) === "light") ? " checked" : ""} data-v-3ed31c1d><label for="switch" class="d-block position-relative" data-v-3ed31c1d></label></div>`);
      _push(ssrRenderComponent(_component_IconsTheme, {
        variant: "light",
        class: { active: unref(currentTheme) === "light" }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ed31c1d"]]);

export { __nuxt_component_3 as default };
//# sourceMappingURL=Toggle-DV70C_5A.mjs.map
