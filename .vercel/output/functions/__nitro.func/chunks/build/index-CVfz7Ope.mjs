import { d as defineStore } from './server.mjs';
import { ref } from 'vue';
import { u as useCookie } from './cookie-CUnBGDd5.mjs';

const useStore = defineStore("store", () => {
  const docTitle = ref("Untitled Document.md");
  const currentTheme = ref("light");
  const rawText = ref("");
  const parsedText = ref("");
  const isPreviewActive = ref(false);
  const docs = ref([]);
  const currentDocId = ref("");
  const setTheme = (theme, mode) => {
    currentTheme.value = theme;
    (undefined).documentElement.setAttribute("data-theme", theme);
    if (mode) {
      const mediaTheme = useCookie("theme");
      mediaTheme.value = theme;
    }
  };
  const togglePreview = () => {
    isPreviewActive.value = !isPreviewActive.value;
  };
  const setCurrentDoc = (id) => {
    const doc = docs.value.find((doc2) => doc2.id === id);
    if (doc) {
      currentDocId.value = doc.id;
      docTitle.value = doc.title;
      rawText.value = doc.content;
    }
  };
  const updateRawText = (content) => {
    console.log("Updating raw text:", content);
    rawText.value = content;
  };
  return {
    rawText,
    parsedText,
    docTitle,
    currentTheme,
    isPreviewActive,
    currentDocId,
    docs,
    setTheme,
    setCurrentDoc,
    togglePreview,
    updateRawText
  };
});

export { useStore as u };
//# sourceMappingURL=index-CVfz7Ope.mjs.map
