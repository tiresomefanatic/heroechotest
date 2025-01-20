import { Octokit } from "@octokit/rest";
import {
  d as defineStore,
  c as useState,
  b as useToast,
  e as useRuntimeConfig,
} from "./server.mjs";
import { ref, computed } from "vue";

const useEditorStore = defineStore("editor", {
  state: () => {
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
    getSavedContents: (state) => (filePath) => {
      console.log(
        "Getting saved contents for key:",
        `${filePath}-${state.currentBranch}`
      );
      const saves =
        state.savedContents[`${filePath}-${state.currentBranch}`] || [];
      console.log("Found saves:", saves);
      return saves;
    },
    getGitContent: (state) => (filePath, branch) => {
      const key = `${filePath}-${branch}`;
      return state.gitContents[key];
    },
    getCurrentGitContent: (state) => (filePath) => {
      const key = `${filePath}-${state.currentBranch}`;
      return state.gitContents[key];
    },
  },
  actions: {
    saveContent(filePath, content) {
      console.log("Saving content - Length:", content.length);
      console.log("Preview:", {
        filePath,
        content: content.substring(0, 100) + "...",
      });
      const { showToast } = useToast();
      const key = `${filePath}-${this.currentBranch}`;
      const newSave = {
        content: content.toString(),
        // Ensure content is a string
        timestamp: /* @__PURE__ */ new Date().toISOString(),
        branch: this.currentBranch,
        filePath,
      };
      if (!this.savedContents[key]) {
        this.savedContents[key] = [];
      }
      this.savedContents[key].unshift(newSave);
      if (this.savedContents[key].length > 10) {
        this.savedContents[key] = this.savedContents[key].slice(0, 10);
      }
      console.log(
        "Saved content length:",
        this.savedContents[key][0].content.length
      );
      console.log("Updated saves count:", this.savedContents[key].length);
      try {
        localStorage.setItem(
          "editor-saves",
          JSON.stringify(this.savedContents)
        );
        console.log("Saved to localStorage successfully");
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
    saveGitContent(filePath, content, branch, sha) {
      const key = `${filePath}-${branch}`;
      this.gitContents[key] = {
        content,
        branch,
        sha,
        lastFetched: /* @__PURE__ */ new Date().toISOString(),
      };
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
    setBranch(branch) {
      this.currentBranch = branch;
      localStorage.setItem("editor-saves", JSON.stringify(this.savedContents));
    },
    clearSaves(filePath) {
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
    clearGitContent(filePath, branch) {
      const key = `${filePath}-${branch}`;
      if (this.gitContents[key]) {
        delete this.gitContents[key];
        localStorage.setItem(
          "editor-git-contents",
          JSON.stringify(this.gitContents)
        );
      }
    },
    deleteSave(filePath, timestamp) {
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
    setCollaborators(collaborators) {
      this.collaborators = collaborators;
    },
    setIsCollaborating(value) {
      this.isCollaborating = value;
    },
    updateContent(filePath, content) {
      console.log("Updating content - Length:", content.length);
      const gitKey = `${filePath}-${this.currentBranch}`;
      if (this.gitContents[gitKey]) {
        this.gitContents[gitKey].content = content;
        this.gitContents[gitKey].lastFetched =
          /* @__PURE__ */ new Date().toISOString();
      }
      this.saveContent(filePath, content);
    },
  },
});
const useGithub = () => {
  const config = useRuntimeConfig();
  const user = ref(null);
  const loading = ref(false);
  const currentBranch = useState("github-current-branch", () => "main");
  const branches = ref([]);
  const octokit = new Octokit({
    auth: undefined,
  });
  const initiateLogin = () => {
    return;
  };
  const handleLogout = () => {
    return;
  };
  const isLoggedIn = computed(() => {
    return false;
  });
  const latestSHA = /* @__PURE__ */ new Map();
  const latestContent = /* @__PURE__ */ new Map();
  const saveCommitContent = (owner, repo, path, branch, content, sha) => {};
  const getCommitContent = (owner, repo, path, branch) => {
    return null;
  };
  const clearCommitContent = (owner, repo, path, branch) => {};
  const getFileContent = async (owner, repo, path, branch) => {
    if (!isLoggedIn.value) {
      throw new Error("Authentication required to get content");
    }
    const targetBranch = branch || currentBranch.value;
    const fileKey = `${owner}/${repo}/${path}/${targetBranch}`;
    try {
      const latestSha = latestSHA.get(fileKey);
      const content = latestContent.get(fileKey);
      if (latestSha && content) {
        console.log(`Using latest cached content for ${path}`);
        return {
          content,
          sha: latestSha,
        };
      }
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: targetBranch,
      });
      if (!("content" in data)) {
        throw new Error("Not a file");
      }
      const decodedContent = decodeBase64ToString(data.content);
      if ("sha" in data) {
        latestSHA.set(fileKey, data.sha);
        latestContent.set(fileKey, decodedContent);
      }
      return {
        content: decodedContent,
        sha: "sha" in data ? data.sha : null,
      };
    } catch (error) {
      console.error("Error getting file content:", error);
      throw error;
    }
  };
  const getRawContent = async (owner, repo, path, branch) => {
    try {
      const targetBranch = branch || currentBranch.value;
      const commitData2 = getCommitContent(owner, repo, path, targetBranch);
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${targetBranch}/${path}?t=${Date.now()}`;
      console.log("Fetching content from URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          console.log("File not found, returning empty content");
          return "";
        }
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }
      const githubContent = await response.text();
      if (commitData2);
      return githubContent;
    } catch (error) {
      console.error("Error fetching content:", error);
      if (error && commitData) {
        console.log("Fetch failed, using commit storage content");
        return commitData.content;
      }
      throw error;
    }
  };
  const saveFileContent = async (
    owner,
    repo,
    path,
    content,
    message,
    branch,
    force,
    sha
  ) => {
    var _a;
    if (!isLoggedIn.value) {
      throw new Error("Authentication required to save content");
    }
    const targetBranch = branch || currentBranch.value;
    try {
      await octokit.rest.repos.getBranch({
        owner,
        repo,
        branch: targetBranch,
      });
      const commitData2 = getCommitContent(owner, repo, path, targetBranch);
      let fileSha = (commitData2 == null ? void 0 : commitData2.sha) || sha;
      if (!fileSha && !force) {
        try {
          const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref: targetBranch,
          });
          if ("sha" in data) {
            fileSha = data.sha;
          }
        } catch (error) {
          if (error.status !== 404) {
            throw error;
          }
        }
      }
      const updateParams = {
        owner,
        repo,
        path,
        message: `${message} [branch: ${targetBranch}]`,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: targetBranch,
        sha: !force && fileSha ? fileSha : void 0,
      };
      const result = await octokit.rest.repos.createOrUpdateFileContents(
        updateParams
      );
      if ((_a = result.data.content) == null ? void 0 : _a.sha) {
        saveCommitContent(
          owner,
          repo,
          path,
          targetBranch,
          content,
          result.data.content.sha
        );
      }
      return result.data;
    } catch (error) {
      if (error.status === 409);
      throw error;
    }
  };
  const createNewContent = async (path, content = "", isFolder = false) => {
    if (!isLoggedIn.value) return null;
    try {
      const owner = config.public.githubOwner;
      const repo = config.public.githubRepo;
      if (isFolder) {
        const folderPath = path.endsWith("/")
          ? `${path}.gitkeep`
          : `${path}/.gitkeep`;
        await octokit.rest.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: folderPath,
          message: `Create new folder: ${path}`,
          content: btoa(""),
          branch: currentBranch.value,
        });
      } else {
        await octokit.rest.repos.createOrUpdateFileContents({
          owner,
          repo,
          path,
          message: `Create new file: ${path}`,
          content: btoa(unescape(encodeURIComponent(content))),
          branch: currentBranch.value,
        });
      }
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      throw error;
    }
  };
  const deleteContent = async (path) => {
    if (!isLoggedIn.value) return null;
    try {
      const owner = config.public.githubOwner;
      const repo = config.public.githubRepo;
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: currentBranch.value,
      });
      if (Array.isArray(fileData)) {
        for (const file of fileData) {
          await deleteContent(file.path);
        }
      } else {
        await octokit.rest.repos.deleteFile({
          owner,
          repo,
          path,
          message: `Delete: ${path}`,
          sha: fileData.sha,
          branch: currentBranch.value,
        });
      }
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  };
  const changeBranch = async (branch) => {
    const editorStore = useEditorStore();
    currentBranch.value = branch;
    editorStore.setBranch(branch);
  };
  const fetchBranches = async () => {
    return;
  };
  const createBranch = async (branchName) => {
    if (!isLoggedIn.value) return null;
    try {
      console.log(
        `Creating new branch: ${branchName} from ${currentBranch.value}`
      );
      const { data: currentRef } = await octokit.rest.git.getRef({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        ref: `heads/${currentBranch.value}`,
      });
      await octokit.rest.git.createRef({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        ref: `refs/heads/${branchName}`,
        sha: currentRef.object.sha,
      });
      console.log(`Created branch ${branchName}, fetching updated branch list`);
      await fetchBranches();
      console.log(`Switching to new branch: ${branchName}`);
      currentBranch.value = branchName;
      return true;
    } catch (error) {
      console.error("Error creating branch:", error);
      return null;
    }
  };
  const fetchPullRequests = async () => {
    if (!isLoggedIn.value) return [];
    try {
      const { data } = await octokit.rest.pulls.list({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        state: "open",
      });
      const detailedPRs = await Promise.all(
        data.map(async (pr) => {
          const { data: prDetails } = await octokit.rest.pulls.get({
            owner: "tiresomefanatic",
            repo: "heroechotest",
            pull_number: pr.number,
          });
          return prDetails;
        })
      );
      return detailedPRs;
    } catch (error) {
      console.error("Error fetching pull requests:", error);
      return [];
    }
  };
  const fetchCommits = async () => {
    if (!isLoggedIn.value) return [];
    try {
      const { data } = await octokit.rest.repos.listCommits({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        per_page: 10,
      });
      return data;
    } catch (error) {
      console.error("Error fetching commits:", error);
      return [];
    }
  };
  const createNewPullRequest = async (base, head, title, body) => {
    if (!isLoggedIn.value) return null;
    try {
      try {
        await octokit.rest.repos.getBranch({
          owner: "tiresomefanatic",
          repo: "heroechotest",
          branch: base,
        });
        await octokit.rest.repos.getBranch({
          owner: "tiresomefanatic",
          repo: "heroechotest",
          branch: head,
        });
      } catch (error) {
        console.error("Branch validation failed:", error);
        throw new Error(`One or both branches (${base}, ${head}) do not exist`);
      }
      const { data } = await octokit.rest.pulls.create({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        base,
        head,
        title,
        body,
      });
      return data;
    } catch (error) {
      console.error("Error creating pull request:", error);
      throw error;
    }
  };
  const resolveConflictInFile = async (prNumber, filePath, resolution) => {
    if (!isLoggedIn.value) return null;
    try {
      const { data: pr } = await octokit.rest.pulls.get({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        pull_number: prNumber,
      });
      const resolutionBranch = `conflict-resolution-${prNumber}-${Date.now()}`;
      await createBranch(resolutionBranch);
      let content;
      if (resolution === "ours") {
        content = await getRawContent(
          "tiresomefanatic",
          "heroechotest",
          filePath,
          pr.base.ref
        );
      } else {
        content = await getRawContent(
          "tiresomefanatic",
          "heroechotest",
          filePath,
          pr.head.ref
        );
      }
      if (!content) {
        throw new Error("Could not get file content");
      }
      await saveFileContent(
        "tiresomefanatic",
        "heroechotest",
        filePath,
        content,
        `Resolve conflict in ${filePath} using ${resolution} changes`,
        resolutionBranch
      );
      return true;
    } catch (error) {
      console.error("Error resolving conflict:", error);
      return null;
    }
  };
  const uploadImage = async (file, subfolder = "images") => {
    if (!isLoggedIn.value) {
      throw new Error("Authentication required to upload images");
    }
    try {
      const base64Content = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const timestamp = /* @__PURE__ */ new Date().getTime();
      const filename = `${timestamp}-${file.name.replace(
        /[^a-zA-Z0-9.-]/g,
        "-"
      )}`;
      const path = `public/${subfolder}/${filename}`;
      const result = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.public.githubOwner,
        repo: config.public.githubRepo,
        path,
        message: `Upload image: ${filename}`,
        content: base64Content,
        branch: currentBranch.value,
      });
      return `https://raw.githubusercontent.com/${config.public.githubOwner}/${config.public.githubRepo}/${currentBranch.value}/${path}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const getRepoInfo = () => {
    return {
      owner: "tiresomefanatic",
      repo: "heroechotest",
    };
  };
  return {
    user,
    loading,
    currentBranch,
    branches,
    login: initiateLogin,
    logout: handleLogout,
    isLoggedIn,
    getRawContent,
    saveFileContent,
    getPullRequests: fetchPullRequests,
    getCommits: fetchCommits,
    resolveConflict: resolveConflictInFile,
    fetchBranches,
    createBranch,
    switchBranch: changeBranch,
    createNewPullRequest,
    getFileContent,
    createNewContent,
    deleteContent,
    uploadImage,
    getRepoInfo,
  };
};
function decodeBase64ToString(base64String) {
  return decodeURIComponent(
    escape(undefined.atob(base64String.replace(/\n/g, "")))
  );
}

export { useEditorStore as a, useGithub as u };
//# sourceMappingURL=useGithub-nVl696qf.mjs.map
