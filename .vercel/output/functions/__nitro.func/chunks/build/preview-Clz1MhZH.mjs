import { u as useCookie } from './cookie-CUnBGDd5.mjs';
import { g as useRoute } from './server.mjs';

const useContentPreview = () => {
  const getPreviewToken = () => {
    return useCookie("previewToken").value || false || undefined;
  };
  const setPreviewToken = (token) => {
    useCookie("previewToken").value = token;
    useRoute().query.preview = token || "";
  };
  const isEnabled = () => {
    const query = useRoute().query;
    if (Object.prototype.hasOwnProperty.call(query, "preview") && !query.preview) {
      return false;
    }
    if (query.preview || useCookie("previewToken").value) {
      return true;
    }
    return false;
  };
  return {
    isEnabled,
    getPreviewToken,
    setPreviewToken
  };
};

export { useContentPreview as u };
//# sourceMappingURL=preview-Clz1MhZH.mjs.map
