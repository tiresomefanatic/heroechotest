import __nuxt_component_0 from './SideBar-CjwI6z2c.mjs';
import __nuxt_component_1 from './Header-BnuglAjO.mjs';
import __nuxt_component_2 from './Editor-E4wpPreR.mjs';
import __nuxt_component_3 from './Preview-DGgnMIV-.mjs';
import __nuxt_component_4 from './DeleteModal-sWsrIZhT.mjs';
import { useSSRContext, defineComponent, ref, unref } from 'vue';
import { ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, s as storeToRefs } from './server.mjs';
import { u as useCookie } from './cookie-CUnBGDd5.mjs';
import { u as useStore } from './index-CVfz7Ope.mjs';
import './Logo-UlDA551H.mjs';
import './NewDoc-BIIL6CA-.mjs';
import './Document-BdD5LQvx.mjs';
import './Toggle-DV70C_5A.mjs';
import './Theme-DrGsUpku.mjs';
import './Menu-fBGxsYaJ.mjs';
import './FileRename--612UsuK.mjs';
import './Delete-uoF1sSF_.mjs';
import './Save-DyC24tfS.mjs';
import './Save-Cli2SEzU.mjs';
import 'idb';
import './CollaborationSidebar-D5sEHiGG.mjs';
import './useGithub-nVl696qf.mjs';
import '@octokit/rest';
import './CreatePullRequest-DabRUBwS.mjs';
import './ImageUploader-Cd2yzPfx.mjs';
import 'remarkable';
import 'remarkable/linkify';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Markdown Playground",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        },
        {
          name: "description",
          content: "Home page of Markdown Playground"
        }
      ]
    });
    const { isPreviewActive, docs } = storeToRefs(useStore());
    useStore();
    const isMenuOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const toggleDeleteModal = (value) => isDeleteModalOpen.value = value;
    const toggleMenu = (value) => isMenuOpen.value = value;
    useCookie("theme");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseSideBar = __nuxt_component_0;
      const _component_BaseHeader = __nuxt_component_1;
      const _component_PlaygroundEditor = __nuxt_component_2;
      const _component_PlaygroundPreview = __nuxt_component_3;
      const _component_DeleteModal = __nuxt_component_4;
      _push(`<!--[--><div class="home d-flex" data-v-1fadfd27>`);
      _push(ssrRenderComponent(_component_BaseSideBar, {
        class: "sidebar",
        style: unref(isMenuOpen) ? null : { display: "none" }
      }, null, _parent));
      _push(`<div class="home__container" data-v-1fadfd27>`);
      _push(ssrRenderComponent(_component_BaseHeader, {
        onToggleMenu: toggleMenu,
        onToggleDeleteModal: ($event) => toggleDeleteModal(true)
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([{ main: !unref(isPreviewActive) }, "home__container-main d-grid"])}" data-v-1fadfd27>`);
      _push(ssrRenderComponent(_component_PlaygroundEditor, {
        style: !unref(isPreviewActive) ? null : { display: "none" }
      }, null, _parent));
      if (!unref(isPreviewActive)) {
        _push(`<hr data-v-1fadfd27>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_PlaygroundPreview, {
        class: unref(isPreviewActive) ? "preview-pane-active" : "preview-pane-inactive"
      }, null, _parent));
      _push(`</div></div></div>`);
      if (unref(isDeleteModalOpen)) {
        _push(ssrRenderComponent(_component_DeleteModal, { onToggleDeleteModal: toggleDeleteModal }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1fadfd27"]]);

export { index as default };
//# sourceMappingURL=index-DJ-p79M8.mjs.map
