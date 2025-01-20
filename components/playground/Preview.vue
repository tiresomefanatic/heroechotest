<script lang="ts" setup>
import { computed } from "vue";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

const props = defineProps<{
  markdown: string;
}>();

// Initialize Remarkable with linkify plugin
const md = new Remarkable({
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
}).use(linkify);

const previewContent = computed(() => {
  return md.render(props.markdown || "");
});
</script>

<template>
  <div class="preview">
    <div class="preview-content" v-html="previewContent"></div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  overflow-y: auto;
}

.preview-content {
  height: 100%;
  padding: 2rem;
  color: var(--text-color);
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
  }

  p {
    margin: 1em 0;
  }

  ul,
  ol {
    margin: 1em 0;
    padding-left: 2em;
  }

  code {
    background-color: var(--deeper-bg-color);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: "Monaco", monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: var(--deeper-bg-color);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1em 0;

    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid var(--border-color);
    margin: 1em 0;
    padding-left: 1em;
    color: var(--sub-text-color);
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;

    th,
    td {
      border: 1px solid var(--border-color);
      padding: 0.5em;
      text-align: left;
    }

    th {
      background-color: var(--deeper-bg-color);
    }
  }
}
</style>
