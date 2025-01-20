import __nuxt_component_0 from './Document-BdD5LQvx.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "FileRename",
  __ssrInlineRender: true,
  setup(__props) {
    const { docTitle } = storeToRefs(useStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsDocument = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "doc d-flex align-items-center w-100" }, _attrs))} data-v-4c1640ed>`);
      _push(ssrRenderComponent(_component_IconsDocument, { class: "docsvg" }, null, _parent));
      _push(`<div class="d-flex flex-column gap-1 w-100" data-v-4c1640ed><label for="docname" class="weight-300" data-v-4c1640ed>Document Name</label><input type="text" id="docname" class="w-100 weight-400" name="docname"${ssrRenderAttr("value", unref(docTitle))} data-v-4c1640ed></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FileRename.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c1640ed"]]);

export { __nuxt_component_2 as default };
//# sourceMappingURL=FileRename--612UsuK.mjs.map
