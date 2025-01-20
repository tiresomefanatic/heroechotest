import { useSSRContext, defineComponent, ref, computed, watch, watchEffect, mergeProps, unref, nextTick } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import __nuxt_component_3 from './Preview-DGgnMIV-.mjs';
import CollaborationSidebar from './CollaborationSidebar-D5sEHiGG.mjs';
import ImageUploader from './ImageUploader-Cd2yzPfx.mjs';
import { _ as _export_sfc, s as storeToRefs, b as useToast } from './server.mjs';
import { u as useStore } from './index-CVfz7Ope.mjs';
import { a as useEditorStore, u as useGithub } from './useGithub-nVl696qf.mjs';
import 'remarkable';
import 'remarkable/linkify';
import './CreatePullRequest-DabRUBwS.mjs';
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
import '@octokit/rest';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Editor",
  __ssrInlineRender: true,
  props: {
    content: {},
    filePath: {}
  },
  emits: ["update:content", "save", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const store = useStore();
    const { rawText, isPreviewActive } = storeToRefs(store);
    const editorStore = useEditorStore();
    const { fetchFileContent, currentBranch, saveFileContent } = useGithub();
    const { showToast } = useToast();
    const localContent = ref(props.content || "");
    const showCommitDialog = ref(false);
    const commitMessage = ref("");
    const isCommitting = ref(false);
    const showCommitButton = computed(() => {
      return props.filePath && currentBranch.value;
    });
    const hasChanges = computed(() => {
      const gitContent = editorStore.getCurrentGitContent(props.filePath || "");
      return gitContent ? localContent.value !== gitContent.content : localContent.value !== "";
    });
    const editorKey = ref(0);
    const editorTextarea = ref(null);
    const insertAtCursor = (text) => {
      const textarea = editorTextarea.value;
      if (!textarea) return;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const textBefore = textarea.value.substring(0, startPos);
      const textAfter = textarea.value.substring(endPos);
      localContent.value = textBefore + text + textAfter;
      nextTick(() => {
        textarea.focus();
        const newCursorPos = startPos + text.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      });
    };
    const handleImageUploaded = (imageUrl) => {
      const imageMarkdown = `![Image](${imageUrl})`;
      insertAtCursor(imageMarkdown);
    };
    watch(
      () => props.content,
      (newContent) => {
        if (newContent && newContent !== localContent.value) {
          localContent.value = newContent.toString();
        }
      }
    );
    watchEffect(() => {
      if (localContent.value !== "") {
        emit("update:content", localContent.value);
      }
    });
    watch(
      () => rawText.value,
      (newContent) => {
        if (newContent && newContent !== localContent.value) {
          console.log("rawText changed, updating localContent:", newContent.length);
          localContent.value = newContent;
          editorKey.value++;
        }
      }
    );
    const handleLoadSave = async (content) => {
      console.log("Editor received content - Length:", content == null ? undefined : content.length);
      console.log("Preview:", (content == null ? undefined : content.substring(0, 100)) + "...");
      if (!content) {
        console.error("Empty content received");
        showToast({
          title: "Error",
          message: "No content to load",
          type: "error"
        });
        return;
      }
      try {
        editorStore.updateContent(props.filePath || "", content);
        localContent.value = content;
        editorKey.value++;
        await nextTick();
        showToast({
          title: "Save Loaded",
          message: "Successfully loaded saved version",
          type: "success"
        });
      } catch (error) {
        console.error("Error loading content:", error);
        showToast({
          title: "Error",
          message: "Failed to load content",
          type: "error"
        });
      }
    };
    watch(
      () => {
        var _a;
        return (_a = editorStore.getCurrentGitContent(props.filePath)) == null ? undefined : _a.content;
      },
      (newContent) => {
        if (newContent) {
          console.log(
            "Editor content updated from store:",
            newContent.substring(0, 100) + "..."
          );
          localContent.value = newContent;
          editorKey.value++;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "editor-container" }, _attrs))} data-v-34b221aa><div class="editor-header" data-v-34b221aa><div class="header-actions" data-v-34b221aa><button class="${ssrRenderClass([{ active: unref(isPreviewActive) }, "header-button"])}" data-v-34b221aa><i class="${ssrRenderClass([unref(isPreviewActive) ? "fa-edit" : "fa-eye", "fas"])}" data-v-34b221aa></i> ${ssrInterpolate(unref(isPreviewActive) ? "Edit" : "Preview")}</button><button class="header-button"${ssrIncludeBooleanAttr(!hasChanges.value) ? " disabled" : ""} title="Save Changes" data-v-34b221aa><i class="fas fa-save" data-v-34b221aa></i> Save </button>`);
      if (showCommitButton.value) {
        _push(`<button class="header-button"${ssrIncludeBooleanAttr(!hasChanges.value || isCommitting.value) ? " disabled" : ""} title="Commit Changes" data-v-34b221aa><i class="fas fa-code-commit" data-v-34b221aa></i> Commit </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ImageUploader, { onUploaded: handleImageUploaded }, null, _parent));
      _push(`</div></div><div class="editor-layout" data-v-34b221aa><div class="editor-content" data-v-34b221aa><div style="${ssrRenderStyle(!unref(isPreviewActive) ? null : { display: "none" })}" class="editor-pane" data-v-34b221aa><textarea class="editor__area" data-v-34b221aa>${ssrInterpolate(localContent.value)}</textarea></div><div style="${ssrRenderStyle(unref(isPreviewActive) ? null : { display: "none" })}" class="preview-pane" data-v-34b221aa>`);
      _push(ssrRenderComponent(__nuxt_component_3, { markdown: localContent.value }, null, _parent));
      _push(`</div></div>`);
      if (props.filePath) {
        _push(ssrRenderComponent(CollaborationSidebar, {
          filePath: props.filePath,
          onLoadSave: (content) => handleLoadSave(content)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showCommitDialog.value) {
        _push(`<div class="commit-dialog" data-v-34b221aa><div class="commit-dialog-content" data-v-34b221aa><h3 data-v-34b221aa>Commit Changes</h3><div class="commit-form" data-v-34b221aa><textarea placeholder="Enter commit message..." rows="3" class="commit-message-input" data-v-34b221aa>${ssrInterpolate(commitMessage.value)}</textarea><div class="commit-actions" data-v-34b221aa><button class="cancel-button" data-v-34b221aa> Cancel </button><button class="commit-button"${ssrIncludeBooleanAttr(!commitMessage.value.trim() || isCommitting.value) ? " disabled" : ""} data-v-34b221aa>${ssrInterpolate(isCommitting.value ? "Committing..." : "Commit")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/playground/Editor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34b221aa"]]);

export { __nuxt_component_2 as default };
//# sourceMappingURL=Editor-E4wpPreR.mjs.map
