import { useSSRContext, defineComponent, ref, computed, watch, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useGithub, a as useEditorStore } from './useGithub-nVl696qf.mjs';
import { _ as _export_sfc, b as useToast } from './server.mjs';
import CreatePullRequest from './CreatePullRequest-DabRUBwS.mjs';
import { u as useStore } from './index-CVfz7Ope.mjs';
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
import './cookie-CUnBGDd5.mjs';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CollaborationSidebar",
  __ssrInlineRender: true,
  props: {
    filePath: {}
  },
  emits: ["load-save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const open = ref(false);
    const activeTab = ref("history");
    const loading = ref(false);
    const commits = ref([]);
    const pullRequests = ref([]);
    const showNewBranchInput = ref(false);
    const newBranchName = ref("");
    const showCreatePR = ref(false);
    ref(false);
    ref("");
    const {
      isLoggedIn,
      currentBranch,
      branches,
      getCommits,
      getPullRequests,
      fetchBranches,
      switchBranch,
      createBranch,
      resolveConflict,
      fetchFileContent,
      saveFileContent,
      getRawContent
    } = useGithub();
    const { showToast } = useToast();
    useStore();
    const editorStore = useEditorStore();
    const localSaves = computed(() => {
      return editorStore.getSavedContents(props.filePath);
    });
    const availableTabs = computed(() => {
      var _a, _b, _c;
      return [
        { id: "history", label: "History", count: commits.value.length },
        { id: "branches", label: "Branches", count: ((_a = branches.value) == null ? undefined : _a.length) || 0 },
        { id: "prs", label: "Pull Requests", count: ((_b = pullRequests.value) == null ? undefined : _b.length) || 0 },
        { id: "saves", label: "Saves", count: ((_c = localSaves.value) == null ? undefined : _c.length) || 0 }
      ];
    });
    computed(() => false);
    const loadCommits = async () => {
      if (!isLoggedIn.value) return;
      loading.value = true;
      try {
        const result = await getCommits();
        if (result && Array.isArray(result)) {
          commits.value = result;
          console.log("Loaded commits:", commits.value);
        }
      } catch (error) {
        console.error("Error loading commits:", error);
        showToast({
          title: "Error",
          message: "Failed to load commit history",
          type: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const loadPullRequests = async () => {
      if (!isLoggedIn.value) return;
      loading.value = true;
      try {
        const result = await getPullRequests();
        if (result && Array.isArray(result)) {
          pullRequests.value = result;
          console.log("Loaded pull requests:", pullRequests.value);
        }
      } catch (error) {
        console.error("Error loading pull requests:", error);
        showToast({
          title: "Error",
          message: "Failed to load pull requests",
          type: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const getPRStatus = (pr) => {
      if (pr.mergeable === false) return "Has Conflicts";
      if (pr.mergeable === true) return "Ready to Merge";
      return "Checking";
    };
    const handlePRCreated = async () => {
      showCreatePR.value = false;
      await loadPullRequests();
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      if (days === 0) {
        return "Today";
      } else if (days === 1) {
        return "Yesterday";
      } else if (days < 7) {
        return `${days} days ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    };
    watch(isLoggedIn, async (newValue) => {
      if (newValue) {
        await fetchBranches();
        await loadCommits();
        await loadPullRequests();
      }
    });
    watch(activeTab, async (newTab) => {
      if (newTab === "prs") {
        await loadPullRequests();
      }
    });
    watch([activeTab, isLoggedIn], () => {
      if (activeTab.value === "prs" && isLoggedIn.value) {
        const interval = setInterval();
        return () => clearInterval(interval);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["collaboration-sidebar", { open: open.value }]
      }, _attrs))} data-v-b058184d><button class="toggle-button" data-v-b058184d>`);
      if (!open.value) {
        _push(`<span data-v-b058184d>\u2630</span>`);
      } else {
        _push(`<span data-v-b058184d>\xD7</span>`);
      }
      _push(`</button><div class="sidebar-content" data-v-b058184d><div class="tabs" data-v-b058184d><!--[-->`);
      ssrRenderList(availableTabs.value, (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "tab-button"])}" data-v-b058184d>${ssrInterpolate(tab.label)} `);
        if (tab.count) {
          _push(`<span class="count" data-v-b058184d>${ssrInterpolate(tab.count)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div><div class="tab-content" data-v-b058184d>`);
      if (activeTab.value === "history") {
        _push(`<div class="history-tab" data-v-b058184d>`);
        if (loading.value) {
          _push(`<div class="loading-state" data-v-b058184d><div class="spinner" data-v-b058184d></div> Loading commits... </div>`);
        } else if (commits.value.length === 0) {
          _push(`<div class="empty-state" data-v-b058184d> No commit history available </div>`);
        } else {
          _push(`<div class="commit-list" data-v-b058184d><!--[-->`);
          ssrRenderList(commits.value, (commit) => {
            var _a;
            _push(`<div class="commit-item"${ssrRenderAttr("title", "Click to view on GitHub")} data-v-b058184d><div class="commit-header" data-v-b058184d><div class="commit-message" data-v-b058184d>${ssrInterpolate(commit.commit.message)}</div></div><div class="commit-meta" data-v-b058184d><div class="commit-author" data-v-b058184d>`);
            if ((_a = commit.author) == null ? undefined : _a.avatar_url) {
              _push(`<img${ssrRenderAttr("src", commit.author.avatar_url)}${ssrRenderAttr("alt", commit.commit.author.name)} class="author-avatar" data-v-b058184d>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<span data-v-b058184d>${ssrInterpolate(commit.commit.author.name)}</span></div><div class="commit-sha" data-v-b058184d>${ssrInterpolate(commit.sha.substring(0, 7))}</div><div class="commit-date" data-v-b058184d>${ssrInterpolate(formatDate(commit.commit.author.date))}</div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "prs") {
        _push(`<div data-v-b058184d><div class="pr-actions-header" data-v-b058184d>`);
        if (!showCreatePR.value) {
          _push(`<button class="create-pr-button" data-v-b058184d> Create Pull Request </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (showCreatePR.value) {
          _push(ssrRenderComponent(CreatePullRequest, {
            branches: unref(branches),
            currentBranch: unref(currentBranch),
            onCreated: handlePRCreated,
            onCancel: ($event) => showCreatePR.value = false
          }, null, _parent));
        } else if (loading.value) {
          _push(`<div class="loading-state" data-v-b058184d> Loading pull requests... </div>`);
        } else if (pullRequests.value.length === 0) {
          _push(`<div class="empty-state" data-v-b058184d> No open pull requests </div>`);
        } else {
          _push(`<div class="pr-list" data-v-b058184d><!--[-->`);
          ssrRenderList(pullRequests.value, (pr) => {
            _push(`<div class="${ssrRenderClass([{ "has-conflicts": pr.mergeable === false }, "pr-item"])}" data-v-b058184d><div class="pr-header" data-v-b058184d><span class="pr-number" data-v-b058184d>#${ssrInterpolate(pr.number)}</span><span class="pr-title" data-v-b058184d>${ssrInterpolate(pr.title)}</span></div><div class="pr-meta" data-v-b058184d><span class="pr-author" data-v-b058184d><img${ssrRenderAttr("src", pr.user.avatar_url)}${ssrRenderAttr("alt", pr.user.login)} class="author-avatar" data-v-b058184d> ${ssrInterpolate(pr.user.login)}</span><span class="${ssrRenderClass([pr.mergeable_state, "pr-status"])}" data-v-b058184d>${ssrInterpolate(getPRStatus(pr))}</span></div><div class="pr-actions" data-v-b058184d><button class="action-button" data-v-b058184d> View on GitHub </button></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "branches") {
        _push(`<div data-v-b058184d>`);
        if (unref(isLoggedIn)) {
          _push(`<div class="branch-controls" data-v-b058184d><div class="branch-select-wrapper" data-v-b058184d><label data-v-b058184d>Current Branch:</label><select${ssrRenderAttr("value", unref(currentBranch))} class="branch-select" data-v-b058184d><!--[-->`);
          ssrRenderList(unref(branches), (branch) => {
            _push(`<option${ssrRenderAttr("value", branch)} data-v-b058184d>${ssrInterpolate(branch)}</option>`);
          });
          _push(`<!--]--></select></div>`);
          if (!showNewBranchInput.value) {
            _push(`<button class="create-branch-button" data-v-b058184d> Create New Branch </button>`);
          } else {
            _push(`<!---->`);
          }
          if (showNewBranchInput.value) {
            _push(`<div class="new-branch-form" data-v-b058184d><input${ssrRenderAttr("value", newBranchName.value)} placeholder="Enter branch name" class="branch-input" data-v-b058184d><div class="branch-actions" data-v-b058184d><button${ssrIncludeBooleanAttr(!newBranchName.value) ? " disabled" : ""} class="create-button" data-v-b058184d> Create </button><button class="cancel-button" data-v-b058184d> Cancel </button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="login-prompt" data-v-b058184d> Please log in to manage branches </div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "saves") {
        _push(`<div data-v-b058184d>`);
        if (localSaves.value.length === 0) {
          _push(`<div class="empty-state" data-v-b058184d> No saved changes available </div>`);
        } else {
          _push(`<div class="saves-list" data-v-b058184d><!--[-->`);
          ssrRenderList(localSaves.value, (save) => {
            _push(`<div class="save-item" data-v-b058184d><div class="save-info" data-v-b058184d><span class="save-timestamp" data-v-b058184d>${ssrInterpolate(formatDate(save.timestamp))}</span><span class="save-branch" data-v-b058184d>on branch ${ssrInterpolate(save.branch)}</span></div><div class="save-actions" data-v-b058184d><button class="action-button" data-v-b058184d> Load </button><button class="action-button delete" data-v-b058184d> Delete </button></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CollaborationSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const CollaborationSidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b058184d"]]);

export { CollaborationSidebar as default };
//# sourceMappingURL=CollaborationSidebar-D5sEHiGG.mjs.map
