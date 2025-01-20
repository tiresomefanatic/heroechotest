import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  __ssrInlineRender: true,
  props: {
    variant: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.variant === "open") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "30",
          height: "18",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><g fill="currentColor" fill-rule="evenodd"><path d="M0 0h30v2H0zM0 8h30v2H0zM0 16h30v2H0z"></path></g></svg>`);
      } else {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          width: "24",
          height: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }, _attrs))}><g fill="currentColor" fill-rule="evenodd"><path d="M2.1.686 23.315 21.9l-1.415 1.415L.686 2.1z"></path><path d="M.686 21.9 21.9.685l1.415 1.415L2.1 23.314z"></path></g></svg>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icons/Menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=Menu-fBGxsYaJ.mjs.map
