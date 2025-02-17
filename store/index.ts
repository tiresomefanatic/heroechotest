import { defineStore } from "pinia";
import { ref } from "vue";

interface Doc {
    id: string;
    title: string;
    content: string;
}

export const useStore = defineStore("store", () => {
    const docTitle = ref("Untitled Document.md");
    const currentTheme = ref("light");
    const rawText = ref("");
    const parsedText = ref("");
    const isPreviewActive = ref(false);
    const docs = ref<Doc[]>([]);
    const currentDocId = ref("");

    // set theme based on prefers-color-scheme media query
    const setTheme = (theme: string, mode?: string) => {
        currentTheme.value = theme;
        document.documentElement.setAttribute("data-theme", theme);
        // save theme to cookies if user selects a theme
        if (mode) {
            const mediaTheme = useCookie("theme");
            mediaTheme.value = theme;
        }
    };

    // Toggle preview mode
    const togglePreview = () => {
        isPreviewActive.value = !isPreviewActive.value;
    };

    // set current document to be edited
    const setCurrentDoc = (id: string) => {
        const doc = docs.value.find((doc) => doc.id === id);
        if (doc) {
            currentDocId.value = doc.id;
            docTitle.value = doc.title;
            rawText.value = doc.content;
        }
    };

    // Update raw text content
    const updateRawText = (content: string) => {
        console.log('Updating raw text:', content);
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
        updateRawText,
    };
});
