import { useSSRContext, defineComponent, computed, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
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
  __name: "Preview",
  __ssrInlineRender: true,
  props: {
    markdown: {}
  },
  setup(__props) {
    const props = __props;
    const md = new Remarkable({
      html: true,
      xhtmlOut: true,
      breaks: true,
      typographer: true
    }).use(linkify);
    const previewContent = computed(() => {
      return md.render(props.markdown || "");
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "preview" }, _attrs))} data-v-22aa9daa><div class="preview-content" data-v-22aa9daa>${(_a = previewContent.value) != null ? _a : ""}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/playground/Preview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22aa9daa"]]);

export { __nuxt_component_3 as default };
//# sourceMappingURL=Preview-DGgnMIV-.mjs.map
