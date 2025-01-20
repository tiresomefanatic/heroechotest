import { defineStore } from "pinia";
import { useToast } from "~/composables/useToast";

interface SavedContent {
  content: string;
  timestamp: string;
  branch: string;
  filePath: string;
}

interface GitContent {
  content: string;
  branch: string;
  sha: string;
  lastFetched: string;
}

interface EditorState {
  savedContents: Record<string, SavedContent[]>; // key is filePath-branch
  gitContents: Record<string, GitContent>; // key is filePath-branch
  currentBranch: string;
  collaborators: string[];
  isCollaborating: boolean;
}

export const useEditorStore = defineStore("editor", {
  state: (): EditorState => {
    const savedState = localStorage.getItem("editor-saves");
    const gitState = localStorage.getItem("editor-git-contents");
    return {
      savedContents: savedState ? JSON.parse(savedState) : {},
      gitContents: gitState ? JSON.parse(gitState) : {},
      currentBranch: "main",
      collaborators: [],
      isCollaborating: false,
    };
  },

  getters: {
    getSavedContents: (state) => (filePath: string) => {
      console.log(
        "Getting saved contents for key:",
        `${filePath}-${state.currentBranch}`
      );
      const saves =
        state.savedContents[`${filePath}-${state.currentBranch}`] || [];
      console.log("Found saves:", saves);
      return saves;
    },

    getGitContent: (state) => (filePath: string, branch: string) => {
      const key = `${filePath}-${branch}`;
      return state.gitContents[key];
    },

    getCurrentGitContent: (state) => (filePath: string) => {
      const key = `${filePath}-${state.currentBranch}`;
      return state.gitContents[key];
    },
  },

  actions: {
    saveContent(filePath: string, content: string) {
      console.log("Saving content - Length:", content.length);
      console.log("Preview:", {
        filePath,
        content: content.substring(0, 100) + "...",
      });

      const { showToast } = useToast();
      const key = `${filePath}-${this.currentBranch}`;
      const newSave = {
        content: content.toString(), // Ensure content is a string
        timestamp: new Date().toISOString(),
        branch: this.currentBranch,
        filePath,
      };

      // Initialize array if it doesn't exist
      if (!this.savedContents[key]) {
        this.savedContents[key] = [];
      }

      // Add new save to the beginning of the array
      this.savedContents[key].unshift(newSave);

      // Keep only the last 10 saves
      if (this.savedContents[key].length > 10) {
        this.savedContents[key] = this.savedContents[key].slice(0, 10);
      }

      console.log(
        "Saved content length:",
        this.savedContents[key][0].content.length
      );
      console.log("Updated saves count:", this.savedContents[key].length);

      // Persist to localStorage
      try {
        localStorage.setItem(
          "editor-saves",
          JSON.stringify(this.savedContents)
        );
        console.log("Saved to localStorage successfully");

        // Verify the save
        const savedData = localStorage.getItem("editor-saves");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          const savedContent = parsed[key][0].content;
          console.log(
            "Verified localStorage save - Content length:",
            savedContent.length
          );
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        showToast({
          title: "Error",
          description: "Failed to save changes locally",
          type: "error",
        });
        return;
      }

      showToast({
        title: "Changes Saved",
        description: `Changes saved locally on branch "${this.currentBranch}"`,
      });
    },

    saveGitContent(
      filePath: string,
      content: string,
      branch: string,
      sha: string
    ) {
      const key = `${filePath}-${branch}`;
      this.gitContents[key] = {
        content,
        branch,
        sha,
        lastFetched: new Date().toISOString(),
      };

      // Persist to localStorage
      localStorage.setItem(
        "editor-git-contents",
        JSON.stringify(this.gitContents)
      );
    },

    loadSaves() {
      const saved = localStorage.getItem("editor-saves");
      const gitContents = localStorage.getItem("editor-git-contents");
      if (saved) {
        this.savedContents = JSON.parse(saved);
      }
      if (gitContents) {
        this.gitContents = JSON.parse(gitContents);
      }
    },

    setBranch(branch: string) {
      this.currentBranch = branch;
      // When branch changes, we want to persist the current state
      localStorage.setItem("editor-saves", JSON.stringify(this.savedContents));
    },

    clearSaves(filePath: string) {
      const { showToast } = useToast();
      const key = `${filePath}-${this.currentBranch}`;
      if (this.savedContents[key]) {
        delete this.savedContents[key];
        localStorage.setItem(
          "editor-saves",
          JSON.stringify(this.savedContents)
        );

        showToast({
          title: "Saves Cleared",
          description: `All local saves cleared for "${filePath}" on branch "${this.currentBranch}"`,
        });
      }
    },

    clearGitContent(filePath: string, branch: string) {
      const key = `${filePath}-${branch}`;
      if (this.gitContents[key]) {
        delete this.gitContents[key];
        localStorage.setItem(
          "editor-git-contents",
          JSON.stringify(this.gitContents)
        );
      }
    },

    deleteSave(filePath: string, timestamp: string) {
      const { showToast } = useToast();
      const key = `${filePath}-${this.currentBranch}`;
      if (this.savedContents[key]) {
        this.savedContents[key] = this.savedContents[key].filter(
          (save) => save.timestamp !== timestamp
        );
        localStorage.setItem(
          "editor-saves",
          JSON.stringify(this.savedContents)
        );

        showToast({
          title: "Save Deleted",
          description: `Local save deleted from branch "${this.currentBranch}"`,
        });
      }
    },

    setCollaborators(collaborators: string[]) {
      this.collaborators = collaborators;
    },

    setIsCollaborating(value: boolean) {
      this.isCollaborating = value;
    },

    updateContent(filePath: string, content: string) {
      console.log("Updating content - Length:", content.length);

      // Update the git content for the current branch
      const gitKey = `${filePath}-${this.currentBranch}`;
      if (this.gitContents[gitKey]) {
        this.gitContents[gitKey].content = content;
        this.gitContents[gitKey].lastFetched = new Date().toISOString();
      }

      // Also save as a local save
      this.saveContent(filePath, content);
    },
  },
});
