// useGithub.ts
import { Octokit } from "@octokit/rest";
import { useRuntimeConfig, navigateTo, useState } from "#app";
import { ref, onMounted, computed } from "vue";

// Define interfaces for all GitHub-related data structures
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  id: number;
}

export interface PullRequest {
  number: number;
  title: string;
  user: GitHubUser;
  html_url: string;
  mergeable: boolean;
  mergeable_state: string;
  files?: Array<{
    filename: string;
    patch?: string;
  }>;
  base: {
    ref: string;
  };
  head: {
    ref: string;
  };
}

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author?: {
    avatar_url: string;
  };
}

// Main composable function for GitHub functionality
export const useGithub = () => {
  // Initialize runtime configuration and state
  const config = useRuntimeConfig();
  const user = ref<GitHubUser | null>(null);
  const loading = ref(false);
  // Make currentBranch persistent
  const currentBranch = useState<string>("github-current-branch", () => "main");
  const branches = ref<string[]>([]);

  // Initialize Octokit with stored token if available
  const octokit = new Octokit({
    auth: process.client ? localStorage.getItem("github_token") : undefined,
  });

  // Handle GitHub OAuth login
  const initiateLogin = () => {
    if (!process.client) return;

    const params = new URLSearchParams({
      client_id: config.public.githubClientId,
      redirect_uri: `${config.public.siteUrl}/auth/callback`,
      scope: "user repo",
      response_type: "code",
      allow_signup: "true",
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  // Handle user logout
  const handleLogout = () => {
    if (!process.client) return;
    localStorage.removeItem("github_token");
    user.value = null;
  };

  // Check if user is logged in
  const isLoggedIn = computed(() => {
    if (!process.client) return false;
    return !!localStorage.getItem("github_token");
  });

  // Fetch authenticated user data
  const fetchUserData = async (): Promise<GitHubUser | null> => {
    if (!process.client) return null;

    const token = localStorage.getItem("github_token");
    if (!token) return null;

    loading.value = true;
    try {
      const { data } = await octokit.rest.users.getAuthenticated();
      user.value = data as GitHubUser;
      return data as GitHubUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Track latest SHA and content for each file
  const latestSHA = new Map<string, string>();
  const latestContent = new Map<string, string>();

  // Helper functions for commit storage
  const COMMIT_STORAGE_PREFIX = "github_commit_";

  const getCommitStorageKey = (
    owner: string,
    repo: string,
    path: string,
    branch: string
  ) => `${COMMIT_STORAGE_PREFIX}${owner}_${repo}_${path}_${branch}`;

  const saveCommitContent = (
    owner: string,
    repo: string,
    path: string,
    branch: string,
    content: string,
    sha: string
  ) => {
    if (process.client) {
      const key = getCommitStorageKey(owner, repo, path, branch);
      const data = {
        content,
        sha,
      };
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const getCommitContent = (
    owner: string,
    repo: string,
    path: string,
    branch: string
  ) => {
    if (process.client) {
      const key = getCommitStorageKey(owner, repo, path, branch);
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return null;
  };

  const clearCommitContent = (
    owner: string,
    repo: string,
    path: string,
    branch: string
  ) => {
    if (process.client) {
      const key = getCommitStorageKey(owner, repo, path, branch);
      localStorage.removeItem(key);
    }
  };

  // Get file content from GitHub
  const getFileContent = async (
    owner: string,
    repo: string,
    path: string,
    branch?: string
  ) => {
    if (!isLoggedIn.value) {
      throw new Error("Authentication required to get content");
    }

    const targetBranch = branch || currentBranch.value;
    const fileKey = `${owner}/${repo}/${path}/${targetBranch}`;

    try {
      // If we have the latest content (after a commit), use that
      const latestSha = latestSHA.get(fileKey);
      const content = latestContent.get(fileKey);
      if (latestSha && content) {
        console.log(`Using latest cached content for ${path}`);
        return {
          content,
          sha: latestSha,
        };
      }

      // Otherwise fetch from GitHub
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

      // Store the content and SHA
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

  // Get raw content with improved caching and error handling
  const getRawContent = async (
    owner: string,
    repo: string,
    path: string,
    branch?: string
  ) => {
    try {
      const targetBranch = branch || currentBranch.value;

      // Check commit storage first
      const commitData = getCommitContent(owner, repo, path, targetBranch);

      // Get GitHub content to compare
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

      // If we have commit data, check if GitHub content matches
      if (commitData) {
        if (commitData.content === githubContent) {
          // GitHub has caught up, clear commit storage
          console.log(
            "GitHub content matches commit storage, clearing storage"
          );
          clearCommitContent(owner, repo, path, targetBranch);
          return githubContent;
        }
        // GitHub hasn't caught up, use commit storage
        console.log("Using commit storage content as GitHub hasn't caught up");
        return commitData.content;
      }

      return githubContent;
    } catch (error) {
      console.error("Error fetching content:", error);
      // If fetch fails and we have commit data, use it
      if (error && commitData) {
        console.log("Fetch failed, using commit storage content");
        return commitData.content;
      }
      throw error;
    }
  };

  // Save file content with improved error handling
  const saveFileContent = async (
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch?: string,
    force?: boolean,
    sha?: string | null
  ) => {
    if (!isLoggedIn.value) {
      throw new Error("Authentication required to save content");
    }

    const targetBranch = branch || currentBranch.value;
    const fileKey = `${owner}/${repo}/${path}/${targetBranch}`;

    try {
      // First verify branch exists
      await octokit.rest.repos.getBranch({
        owner,
        repo,
        branch: targetBranch,
      });

      // Use SHA from commit storage or parameter
      const commitData = getCommitContent(owner, repo, path, targetBranch);
      let fileSha = commitData?.sha || sha;

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
        sha: !force && fileSha ? fileSha : undefined,
      };

      const result = await octokit.rest.repos.createOrUpdateFileContents(
        updateParams
      );

      // Save to commit storage
      if (result.data.content?.sha) {
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
      if (error.status === 409) {
        // Clear commit storage on conflict
        clearCommitContent(owner, repo, path, targetBranch);
      }
      throw error;
    }
  };

  // Create a new file or folder
  const createNewContent = async (
    path: string,
    content: string = "",
    isFolder: boolean = false
  ) => {
    if (!isLoggedIn.value) return null;

    try {
      const owner = config.public.githubOwner;
      const repo = config.public.githubRepo;

      if (isFolder) {
        // GitHub doesn't have direct folder creation - we create a .gitkeep file
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
        // Create new file
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

  // Delete a file or folder
  const deleteContent = async (path: string) => {
    if (!isLoggedIn.value) return null;

    try {
      const owner = config.public.githubOwner;
      const repo = config.public.githubRepo;

      // Get the file's SHA
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: currentBranch.value,
      });

      if (Array.isArray(fileData)) {
        // It's a directory - delete all files recursively
        for (const file of fileData) {
          await deleteContent(file.path);
        }
      } else {
        // Delete single file
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

  // Handle branch change
  const changeBranch = async (branch: string) => {
    const editorStore = useEditorStore();
    currentBranch.value = branch;
    editorStore.setBranch(branch);
  };

  // Fetch branches
  const fetchBranches = async () => {
    if (!process.client) return;

    const token = localStorage.getItem("github_token");
    if (!token) return;

    loading.value = true;
    try {
      const { data } = await octokit.rest.repos.listBranches({
        owner: config.public.githubOwner,
        repo: config.public.githubRepo,
      });

      branches.value = data.map((branch) => branch.name);
      loading.value = false;
    } catch (error) {
      loading.value = false;
      console.error("Error fetching branches:", error);
      throw error;
    }
  };

  // Create a new branch
  const createBranch = async (branchName: string) => {
    if (!isLoggedIn.value) return null;

    try {
      console.log(
        `Creating new branch: ${branchName} from ${currentBranch.value}`
      );

      // Get current branch's latest commit
      const { data: currentRef } = await octokit.rest.git.getRef({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        ref: `heads/${currentBranch.value}`,
      });

      // Create new branch from current branch
      await octokit.rest.git.createRef({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        ref: `refs/heads/${branchName}`,
        sha: currentRef.object.sha,
      });

      console.log(`Created branch ${branchName}, fetching updated branch list`);
      await fetchBranches();

      // Switch to new branch
      console.log(`Switching to new branch: ${branchName}`);
      currentBranch.value = branchName;

      return true;
    } catch (error) {
      console.error("Error creating branch:", error);
      return null;
    }
  };

  // Get list of pull requests
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

      return detailedPRs as PullRequest[];
    } catch (error) {
      console.error("Error fetching pull requests:", error);
      return [];
    }
  };

  // Get list of commits
  const fetchCommits = async () => {
    if (!isLoggedIn.value) return [];

    try {
      const { data } = await octokit.rest.repos.listCommits({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        per_page: 10,
      });

      return data as Commit[];
    } catch (error) {
      console.error("Error fetching commits:", error);
      return [];
    }
  };

  // Create a new pull request
  const createNewPullRequest = async (
    base: string,
    head: string,
    title: string,
    body: string
  ) => {
    if (!isLoggedIn.value) return null;

    try {
      // Validate both branches exist
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

  // Resolve merge conflicts
  const resolveConflictInFile = async (
    prNumber: number,
    filePath: string,
    resolution: "ours" | "theirs"
  ) => {
    if (!isLoggedIn.value) return null;

    try {
      const { data: pr } = await octokit.rest.pulls.get({
        owner: "tiresomefanatic",
        repo: "heroechotest",
        pull_number: prNumber,
      });

      const resolutionBranch = `conflict-resolution-${prNumber}-${Date.now()}`;

      await createBranch(resolutionBranch);

      // Get content based on resolution choice
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

  // Upload an image to the public folder
  const uploadImage = async (
    file: File,
    subfolder: string = "images"
  ): Promise<string> => {
    if (!isLoggedIn.value) {
      throw new Error("Authentication required to upload images");
    }

    try {
      // Read file as base64
      const base64Content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Generate a unique filename using timestamp
      const timestamp = new Date().getTime();
      const filename = `${timestamp}-${file.name.replace(
        /[^a-zA-Z0-9.-]/g,
        "-"
      )}`;
      const path = `public/${subfolder}/${filename}`;

      // Upload to GitHub
      const result = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.public.githubOwner,
        repo: config.public.githubRepo,
        path,
        message: `Upload image: ${filename}`,
        content: base64Content,
        branch: currentBranch.value,
      });

      // Return the URL to the uploaded image
      return `https://raw.githubusercontent.com/${config.public.githubOwner}/${config.public.githubRepo}/${currentBranch.value}/${path}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Get repository information
  const getRepoInfo = () => {
    if (process.client) {
      const repoInfo = localStorage.getItem("github_repo_info");
      if (repoInfo) {
        return JSON.parse(repoInfo);
      }
    }
    return {
      owner: "tiresomefanatic",
      repo: "heroechotest",
    };
  };

  // Initial setup
  if (process.client) {
    // Fetch user data on initialization if logged in
    if (isLoggedIn.value) {
      fetchUserData();
      fetchBranches();
    }
  }

  // Return the composable API
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

function decodeBase64ToString(base64String: string): string {
  return decodeURIComponent(
    escape(window.atob(base64String.replace(/\n/g, "")))
  );
}
