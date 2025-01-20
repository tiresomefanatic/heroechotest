import { defineComponent, ref, provide, createElementBlock, useSSRContext, computed, watch, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useGithub } from './useGithub-nVl696qf.mjs';
import { _ as _export_sfc, b as useToast } from './server.mjs';
import { marked } from 'marked';
import '@octokit/rest';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';
import 'unhead';
import '@unhead/shared';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? undefined : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      getRawContent,
      saveFileContent,
      isLoggedIn,
      currentBranch,
      getBranches
    } = useGithub();
    const { showToast } = useToast();
    ref(false);
    const isEditing = ref(false);
    const githubContent = ref("");
    const editorContent = ref("");
    const contentKey = ref(0);
    ref(null);
    ref([]);
    const route = useRoute();
    const slug = route.params.slug || [];
    const path = Array.isArray(slug) ? slug.join("/") : slug;
    computed(() => path !== "");
    const contentPath = computed(() => {
      if (!path) return "content/index.md";
      return `content/${path}.md`;
    });
    const loadGithubContent = async () => {
      if (!isLoggedIn.value) return;
      try {
        const content = await getRawContent(
          "tiresomefanatic",
          "test-nuxt",
          contentPath.value,
          currentBranch.value
        );
        githubContent.value = marked(content);
        editorContent.value = content;
        contentKey.value++;
      } catch (error) {
        console.error("Error loading GitHub content:", error);
        showToast({
          title: "Error",
          message: "Failed to load content from GitHub",
          type: "error"
        });
      }
    };
    watch(isEditing, async (newValue, oldValue) => {
      if (newValue && !oldValue) {
        await loadGithubContent();
      }
    });
    watch(
      () => route.path,
      async () => {
        if (isLoggedIn.value && !isEditing.value) {
          await loadGithubContent();
        }
      }
    );
    watch(isLoggedIn, async (newValue) => {
      if (newValue && !isEditing.value) {
        await loadGithubContent();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper" }, _attrs))} data-v-4ae308e1>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ae308e1"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-Dgu5tLYH.mjs.map
