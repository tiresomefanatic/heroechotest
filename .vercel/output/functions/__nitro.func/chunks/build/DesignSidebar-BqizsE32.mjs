import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { ref, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { useRoute } from 'vue-router';
import 'unhead';
import '@unhead/shared';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';

const _imports_0 = publicAssetsURL("/lock-icon.svg");
const _sfc_main = {
  __name: "DesignSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isOpen = ref(false);
    const isCollapsed = ref({
      foundation: false,
      digital: true,
      product: true,
      sound: true,
      space: true
    });
    watch(
      () => route.path,
      (newPath) => {
        if (newPath.includes("/design/foundation/")) {
          isCollapsed.value.foundation = false;
        }
        if (newPath.includes("/design/product/")) {
          isCollapsed.value.product = false;
        }
        if (newPath.includes("/design/space/")) {
          isCollapsed.value.space = false;
        }
      },
      { immediate: true }
    );
    function closeMobileMenu() {
      isOpen.value = false;
      (undefined).body.style.overflow = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar-wrapper" }, _attrs))} data-v-f25ef3d1><button class="${ssrRenderClass([{ "is-open": isOpen.value }, "mobile-menu-btn"])}" aria-label="Toggle menu" data-v-f25ef3d1><div class="hamburger-lines" data-v-f25ef3d1><span class="hamburger-line" data-v-f25ef3d1></span><span class="hamburger-line" data-v-f25ef3d1></span><span class="hamburger-line" data-v-f25ef3d1></span></div></button><aside class="${ssrRenderClass([{ "is-mobile-open": isOpen.value }, "design-sidebar"])}" data-v-f25ef3d1><div class="mobile-header" data-v-f25ef3d1><span class="mobile-title" data-v-f25ef3d1>Menu</span><button class="close-btn" data-v-f25ef3d1><span class="close-icon" data-v-f25ef3d1>\xD7</span></button></div><nav class="design-nav" data-v-f25ef3d1><div class="nav-content" data-v-f25ef3d1><div class="nav-group" data-v-f25ef3d1><div class="nav-group-header main-item" data-v-f25ef3d1> Foundation <span class="${ssrRenderClass([{ rotated: !isCollapsed.value.foundation }, "chevron"])}" data-v-f25ef3d1>\u203A</span></div><div class="${ssrRenderClass([{ collapsed: isCollapsed.value.foundation }, "nav-group-content"])}" data-v-f25ef3d1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/foundation/logo",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Logo`);
          } else {
            return [
              createTextVNode("Logo")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/foundation/color",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Color`);
          } else {
            return [
              createTextVNode("Color")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/foundation/typography",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Typography`);
          } else {
            return [
              createTextVNode("Typography")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="nav-item sub-item locked" data-v-f25ef3d1> Illustration <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div><div class="nav-item sub-item locked" data-v-f25ef3d1> Icons <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div><div class="nav-item sub-item locked" data-v-f25ef3d1> Layout <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div><div class="nav-item sub-item locked" data-v-f25ef3d1> Imagery <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div><div class="nav-item sub-item locked" data-v-f25ef3d1> Animation <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div><div class="nav-item sub-item locked" data-v-f25ef3d1> Applications <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div></div></div><div class="nav-group" data-v-f25ef3d1><div class="nav-group-header main-item locked" data-v-f25ef3d1> Digital <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div></div><div class="nav-group" data-v-f25ef3d1><div class="nav-group-header main-item locked" data-v-f25ef3d1> Sound <img${ssrRenderAttr("src", _imports_0)} alt="Locked" class="lock-icon" data-v-f25ef3d1></div></div><div class="nav-group" data-v-f25ef3d1><div class="nav-group-header main-item" data-v-f25ef3d1> Product <span class="${ssrRenderClass([{ rotated: !isCollapsed.value.product }, "chevron"])}" data-v-f25ef3d1>\u203A</span></div><div class="${ssrRenderClass([{ collapsed: isCollapsed.value.product }, "nav-group-content"])}" data-v-f25ef3d1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/product/creative-spectrum",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Creative Spectrum`);
          } else {
            return [
              createTextVNode("Creative Spectrum")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/product/case-studies",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Case Studies`);
          } else {
            return [
              createTextVNode("Case Studies")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="nav-group" data-v-f25ef3d1><div class="nav-group-header main-item" data-v-f25ef3d1> Space <span class="${ssrRenderClass([{ rotated: !isCollapsed.value.space }, "chevron"])}" data-v-f25ef3d1>\u203A</span></div><div class="${ssrRenderClass([{ collapsed: isCollapsed.value.space }, "nav-group-content"])}" data-v-f25ef3d1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/space/introduction",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Introduction`);
          } else {
            return [
              createTextVNode("Introduction")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/space/mood",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mood`);
          } else {
            return [
              createTextVNode("Mood")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/design/space/form",
        class: "nav-item sub-item",
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Form`);
          } else {
            return [
              createTextVNode("Form")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav></aside><div class="${ssrRenderClass([{ "is-visible": isOpen.value }, "mobile-overlay"])}" data-v-f25ef3d1></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DesignSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const DesignSidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f25ef3d1"]]);

export { DesignSidebar as default };
//# sourceMappingURL=DesignSidebar-BqizsE32.mjs.map
