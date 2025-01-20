<template>
  <div class="editor-container">
    <div class="editor-header">
      <div class="header-actions">
        <button
          class="header-button"
          @click="toggleView"
          :class="{ active: isPreviewActive }"
        >
          <i class="fas" :class="isPreviewActive ? 'fa-edit' : 'fa-eye'"></i>
          {{ isPreviewActive ? "Edit" : "Preview" }}
        </button>
        <button
          class="header-button"
          @click="handleSave"
          :disabled="!hasChanges"
          title="Save Changes"
        >
          <i class="fas fa-save"></i>
          Save
        </button>
        <button
          v-if="showCommitButton"
          class="header-button"
          @click="showCommitDialog = true"
          :disabled="!hasChanges || isCommitting"
          title="Commit Changes"
        >
          <i class="fas fa-code-commit"></i>
          Commit
        </button>
        <ImageUploader @uploaded="handleImageUploaded" />
      </div>
    </div>

    <div class="editor-layout">
      <div class="editor-content">
        <div v-show="!isPreviewActive" class="editor-pane">
          <textarea
            ref="editorTextarea"
            class="editor__area"
            :value="localContent"
            @input="e => localContent = (e.target as HTMLTextAreaElement).value"
            :key="editorKey"
          ></textarea>
        </div>
        <div v-show="isPreviewActive" class="preview-pane">
          <Preview :markdown="localContent" />
        </div>
      </div>

      <CollaborationSidebar
        v-if="props.filePath"
        :filePath="props.filePath"
        @load-save="(content) => handleLoadSave(content)"
      />
    </div>

    <!-- Commit Dialog -->
    <div v-if="showCommitDialog" class="commit-dialog">
      <div class="commit-dialog-content">
        <h3>Commit Changes</h3>
        <div class="commit-form">
          <textarea
            v-model="commitMessage"
            placeholder="Enter commit message..."
            rows="3"
            class="commit-message-input"
          ></textarea>
          <div class="commit-actions">
            <button class="cancel-button" @click="showCommitDialog = false">
              Cancel
            </button>
            <button
              class="commit-button"
              @click="handleCommit"
              :disabled="!commitMessage.trim() || isCommitting"
            >
              {{ isCommitting ? "Committing..." : "Commit" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Preview from "./Preview.vue";
import CollaborationSidebar from "../CollaborationSidebar.vue";
import ImageUploader from "../ImageUploader.vue";
import { ref, computed, watchEffect, watch, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "~/store";
import { useEditorStore } from "~/store/editor";
import { useGithub } from "~/composables/useGithub";
import { useToast } from "~/composables/useToast";

const props = defineProps<{
  content?: string;
  filePath?: string;
}>();

const emit = defineEmits<{
  "update:content": [content: string];
  save: [content: string];
  error: [error: Error];
}>();

const store = useStore();
const { rawText, isPreviewActive } = storeToRefs(store);
const editorStore = useEditorStore();
const { fetchFileContent, currentBranch, saveFileContent } = useGithub();
const { showToast } = useToast();

// Local content management
const localContent = ref(props.content || "");
const showCommitDialog = ref(false);
const commitMessage = ref("");
const isCommitting = ref(false);

// Computed properties
const showCommitButton = computed(() => {
  return props.filePath && currentBranch.value;
});

const hasChanges = computed(() => {
  const gitContent = editorStore.getCurrentGitContent(props.filePath || "");
  return gitContent
    ? localContent.value !== gitContent.content
    : localContent.value !== "";
});

// Handle commit
const handleCommit = async () => {
  if (!props.filePath || !commitMessage.value.trim()) return;

  isCommitting.value = true;
  try {
    await saveFileContent(
      "tiresomefanatic",
      "heroechotest",
      props.filePath,
      localContent.value,
      commitMessage.value.trim(),
      currentBranch.value
    );

    // Update git content in store
    editorStore.updateContent(props.filePath, localContent.value);

    showToast({
      title: "Success",
      message: "Changes committed successfully",
      type: "success",
    });

    showCommitDialog.value = false;
    commitMessage.value = "";
  } catch (error) {
    console.error("Commit error:", error);
    const errorMessage =
      error.status === 409
        ? "File was modified elsewhere. Please try committing again."
        : error.message || "Failed to commit changes";

    showToast({
      title: "Error",
      message: errorMessage,
      type: "error",
      duration: 5000,
    });
  } finally {
    isCommitting.value = false;
  }
};

const editorKey = ref(0); // Add key to force re-render

const editorTextarea = ref<HTMLTextAreaElement | null>(null);

// Function to insert text at cursor position
const insertAtCursor = (text: string) => {
  const textarea = editorTextarea.value;
  if (!textarea) return;

  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const textBefore = textarea.value.substring(0, startPos);
  const textAfter = textarea.value.substring(endPos);

  localContent.value = textBefore + text + textAfter;

  // Set cursor position after the inserted text
  nextTick(() => {
    textarea.focus();
    const newCursorPos = startPos + text.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  });
};

// Handle uploaded image
const handleImageUploaded = (imageUrl: string) => {
  const imageMarkdown = `![Image](${imageUrl})`;
  insertAtCursor(imageMarkdown);
};

// Watch for content prop changes
watch(
  () => props.content,
  (newContent) => {
    if (newContent && newContent !== localContent.value) {
      localContent.value = newContent.toString();
    }
  }
);

// Watch for content changes and emit updates
watchEffect(() => {
  if (localContent.value !== "") {
    emit("update:content", localContent.value);
  }
});

// Watch for rawText changes from store
watch(
  () => rawText.value,
  (newContent) => {
    if (newContent && newContent !== localContent.value) {
      console.log("rawText changed, updating localContent:", newContent.length);
      localContent.value = newContent;
      editorKey.value++; // Force textarea re-render
    }
  }
);

const toggleView = () => {
  isPreviewActive.value = !isPreviewActive.value;
};

const handleSave = () => {
  if (!props.filePath) return;

  console.log("Editor saving content - Length:", localContent.value.length);
  console.log("Preview:", localContent.value.substring(0, 100) + "...");

  // Save to Pinia store first
  editorStore.saveContent(props.filePath, localContent.value);

  // Update store's raw text
  store.updateRawText(localContent.value);

  // Also save current content to localStorage for recovery
  localStorage.setItem("rawText", JSON.stringify(localContent.value));

  showToast({
    title: "Changes Saved",
    message: "Successfully saved changes",
    type: "success",
  });
};

const handleLoadSave = async (content: string) => {
  console.log("Editor received content - Length:", content?.length);
  console.log("Preview:", content?.substring(0, 100) + "...");

  if (!content) {
    console.error("Empty content received");
    showToast({
      title: "Error",
      message: "No content to load",
      type: "error",
    });
    return;
  }

  try {
    // Update content in editor store
    editorStore.updateContent(props.filePath || "", content);

    // Update local content
    localContent.value = content;

    // Force re-render of editor
    editorKey.value++;

    await nextTick();

    showToast({
      title: "Save Loaded",
      message: "Successfully loaded saved version",
      type: "success",
    });
  } catch (error) {
    console.error("Error loading content:", error);
    showToast({
      title: "Error",
      message: "Failed to load content",
      type: "error",
    });
  }
};

// Watch for changes in editorStore content
watch(
  () => editorStore.getCurrentGitContent(props.filePath)?.content,
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

const loadContent = async () => {
  if (!props.filePath) return;

  try {
    const { content } = await fetchFileContent(
      "tiresomefanatic",
      "heroechotest",
      props.filePath,
      currentBranch.value
    );

    localContent.value = content;
  } catch (error) {
    console.error("Error loading content:", error);
    showToast({
      title: "Error",
      message: "Failed to load content",
      type: "error",
    });
  }
};

const defaultContent = `# Welcome to Markdown
Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.`;
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.commit-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.commit-dialog-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.commit-dialog h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.commit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.commit-message-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
}

.commit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.commit-button,
.cancel-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}

.commit-button {
  background: #4caf50;
  color: white;
}

.commit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-button {
  background: #f5f5f5;
  color: #333;
}

.cancel-button:hover {
  background: #e5e5e5;
}

.editor-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 24px;
  background-color: var(--deeper-bg-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
}

.header-button {
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sub-text-color);
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;

  &:hover {
    background-color: var(--hover-color);
  }

  &.active {
    color: var(--text-color);
    background-color: var(--hover-color);
  }

  i {
    font-size: 12px;
  }
}

.editor-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor-pane,
.preview-pane {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  overflow-y: auto;
}

.editor__area {
  width: 100%;
  height: 100%;
  border: none;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: "Monaco", monospace;
  font-size: 12px;
  line-height: 1.4;
  resize: none;
  outline: none;
}
</style>
