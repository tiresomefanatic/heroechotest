import { useSSRContext, defineComponent, ref, computed, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useGithub } from './useGithub-nVl696qf.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreatePullRequest",
  __ssrInlineRender: true,
  props: {
    branches: {},
    currentBranch: {}
  },
  emits: ["created", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { createNewPullRequest, user } = useGithub();
    const loading = ref(false);
    const baseBranch = ref("main");
    const headBranch = ref("");
    const title = ref("");
    const description = ref("");
    const showValidation = ref(false);
    const titlePlaceholder = computed(() => {
      var _a;
      if (headBranch.value && baseBranch.value) {
        return `${((_a = user.value) == null ? undefined : _a.login) || "user"} wants to merge from ${headBranch.value} into ${baseBranch.value}`;
      }
      return "Enter PR title";
    });
    const isValid = computed(() => {
      return baseBranch.value && headBranch.value && title.value.trim() && baseBranch.value !== headBranch.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "create-pr-form" }, _attrs))} data-v-a85e91b6><h3 class="form-title" data-v-a85e91b6>Create Pull Request</h3><div class="form-group" data-v-a85e91b6><label for="base" data-v-a85e91b6>Target Branch (merge into)</label><select id="base" class="form-select"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-a85e91b6><option value="" data-v-a85e91b6${ssrIncludeBooleanAttr(Array.isArray(baseBranch.value) ? ssrLooseContain(baseBranch.value, "") : ssrLooseEqual(baseBranch.value, "")) ? " selected" : ""}>Select target branch</option><!--[-->`);
      ssrRenderList(props.branches, (branch) => {
        _push(`<option${ssrRenderAttr("value", branch)} data-v-a85e91b6${ssrIncludeBooleanAttr(Array.isArray(baseBranch.value) ? ssrLooseContain(baseBranch.value, branch) : ssrLooseEqual(baseBranch.value, branch)) ? " selected" : ""}>${ssrInterpolate(branch)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (!baseBranch.value) {
        _push(`<span class="helper-text" data-v-a85e91b6>This is the branch where changes will be merged into</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-a85e91b6><label for="head" data-v-a85e91b6>Source Branch (merge from)</label><select id="head" class="form-select"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-a85e91b6><option value="" data-v-a85e91b6${ssrIncludeBooleanAttr(Array.isArray(headBranch.value) ? ssrLooseContain(headBranch.value, "") : ssrLooseEqual(headBranch.value, "")) ? " selected" : ""}>Select source branch</option><!--[-->`);
      ssrRenderList(props.branches, (branch) => {
        _push(`<option${ssrRenderAttr("value", branch)} data-v-a85e91b6${ssrIncludeBooleanAttr(Array.isArray(headBranch.value) ? ssrLooseContain(headBranch.value, branch) : ssrLooseEqual(headBranch.value, branch)) ? " selected" : ""}>${ssrInterpolate(branch)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (!headBranch.value) {
        _push(`<span class="helper-text" data-v-a85e91b6>This is the branch containing your changes</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-a85e91b6><label for="title" data-v-a85e91b6>Title</label><input id="title"${ssrRenderAttr("value", title.value)} type="text" class="form-input"${ssrRenderAttr("placeholder", titlePlaceholder.value)}${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-a85e91b6>`);
      if (showValidation.value && !title.value.trim()) {
        _push(`<span class="validation-error" data-v-a85e91b6> Title is required </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-a85e91b6><label for="description" data-v-a85e91b6>Description</label><textarea id="description" class="form-textarea" placeholder="Enter PR description" rows="4"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-a85e91b6>${ssrInterpolate(description.value)}</textarea></div>`);
      if (showValidation.value && !isValid.value) {
        _push(`<div class="validation-summary" data-v-a85e91b6><p data-v-a85e91b6>Please fix the following issues:</p><ul data-v-a85e91b6>`);
        if (!baseBranch.value) {
          _push(`<li data-v-a85e91b6>Select a target branch</li>`);
        } else {
          _push(`<!---->`);
        }
        if (!headBranch.value) {
          _push(`<li data-v-a85e91b6>Select a source branch</li>`);
        } else {
          _push(`<!---->`);
        }
        if (baseBranch.value === headBranch.value && baseBranch.value) {
          _push(`<li data-v-a85e91b6> Target and source branches must be different </li>`);
        } else {
          _push(`<!---->`);
        }
        if (!title.value.trim()) {
          _push(`<li data-v-a85e91b6>Enter a title for the pull request</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-a85e91b6><button class="cancel-button"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-a85e91b6> Cancel </button><button class="submit-button"${ssrIncludeBooleanAttr(!isValid.value || loading.value) ? " disabled" : ""} data-v-a85e91b6>${ssrInterpolate(loading.value ? "Creating..." : "Create Pull Request")}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreatePullRequest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const CreatePullRequest = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a85e91b6"]]);

export { CreatePullRequest as default };
//# sourceMappingURL=CreatePullRequest-DabRUBwS.mjs.map
