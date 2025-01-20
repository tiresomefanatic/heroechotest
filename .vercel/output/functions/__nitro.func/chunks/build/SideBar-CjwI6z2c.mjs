import __nuxt_component_1 from './Logo-UlDA551H.mjs';
import __nuxt_component_1$1 from './NewDoc-BIIL6CA-.mjs';
import __nuxt_component_0$1 from './Document-BdD5LQvx.mjs';
import __nuxt_component_3 from './Toggle-DV70C_5A.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, s as storeToRefs } from './server.mjs';
import { u as useStore } from './index-CVfz7Ope.mjs';
import './Theme-DrGsUpku.mjs';
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
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    const { docs } = storeToRefs(useStore());
    useStore();
    const convertDate = (date) => {
      const dateTime = new Date(date);
      const options = { day: "2-digit", month: "long", year: "numeric" };
      return dateTime.toLocaleDateString("en-US", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsLogo = __nuxt_component_1;
      const _component_ButtonsNewDoc = __nuxt_component_1$1;
      const _component_IconsDocument = __nuxt_component_0$1;
      const _component_Toggle = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar d-flex align-items-start flex-column" }, _attrs))} data-v-509eaa52><div class="up d-flex align-items-start flex-column" data-v-509eaa52>`);
      _push(ssrRenderComponent(_component_IconsLogo, { class: "logo" }, null, _parent));
      _push(`<span class="header weight-500" data-v-509eaa52>MY DOCUMENTS</span>`);
      _push(ssrRenderComponent(_component_ButtonsNewDoc, null, null, _parent));
      if (unref(docs) && unref(docs).length > 0) {
        _push(`<ul class="docs__list d-flex flex-column" data-v-509eaa52><!--[-->`);
        ssrRenderList(unref(docs), (doc) => {
          _push(`<li class="docs__list-doc d-flex align-items-center gap-6" data-v-509eaa52>`);
          _push(ssrRenderComponent(_component_IconsDocument, null, null, _parent));
          _push(`<div class="docs__list-doc-info d-flex flex-column gap-3" data-v-509eaa52><span class="docs__list-doc-info-date weight-300 text-overflow-ellipsis" data-v-509eaa52>${ssrInterpolate(convertDate(doc.created))}</span><span class="docs__list-doc-info-name weight-400 text-overflow-ellipsis" data-v-509eaa52>${ssrInterpolate(doc.title)}</span></div></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="down" data-v-509eaa52>`);
      _push(ssrRenderComponent(_component_Toggle, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/SideBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-509eaa52"]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=SideBar-CjwI6z2c.mjs.map
