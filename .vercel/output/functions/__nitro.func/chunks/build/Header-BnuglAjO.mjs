import _sfc_main$1 from './Menu-fBGxsYaJ.mjs';
import __nuxt_component_1$1 from './Logo-UlDA551H.mjs';
import __nuxt_component_2 from './FileRename--612UsuK.mjs';
import __nuxt_component_3 from './Delete-uoF1sSF_.mjs';
import __nuxt_component_4 from './Save-DyC24tfS.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, s as storeToRefs } from './server.mjs';
import { u as useStore } from './index-CVfz7Ope.mjs';
import { openDB } from 'idb';
import './Document-BdD5LQvx.mjs';
import './Save-Cli2SEzU.mjs';
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

const useMdDocs = () => {
  const dbPromise = openDB("mdDocs", 1, {
    upgrade(db) {
      db.createObjectStore("mdDocs", { keyPath: "id" });
    }
  });
  const getDocs = async () => {
    const db = await dbPromise;
    const tx = db.transaction("mdDocs", "readonly");
    const store = tx.objectStore("mdDocs");
    return await store.getAll();
  };
  const getDoc = async (id) => {
    const db = await dbPromise;
    const tx = db.transaction("mdDocs", "readonly");
    const store = tx.objectStore("mdDocs");
    return await store.get(id);
  };
  const saveDoc = async (doc) => {
    const db = await dbPromise;
    const tx = db.transaction("mdDocs", "readwrite");
    const store = tx.objectStore("mdDocs");
    await store.put(doc);
  };
  const addDoc = async (doc) => {
    const db = await dbPromise;
    const tx = db.transaction("mdDocs", "readwrite");
    const store = tx.objectStore("mdDocs");
    await store.add(doc);
  };
  const deleteDoc = async (id) => {
    const db = await dbPromise;
    const tx = db.transaction("mdDocs", "readwrite");
    const store = tx.objectStore("mdDocs");
    await store.delete(id);
  };
  return { getDocs, getDoc, saveDoc, addDoc, deleteDoc };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["toggle-menu", "toggle-delete-modal"],
  setup(__props, { emit: __emit }) {
    const { docTitle, rawText, docs, currentDocId } = storeToRefs(useStore());
    const isMenuOpen = ref(false);
    const save = async () => {
      if (!rawText.value) return;
      const { addDoc, saveDoc, getDocs } = useMdDocs();
      const doc = docs.value.find((doc2) => doc2.id === currentDocId.value);
      const docObj = { id: "", title: docTitle.value, content: rawText.value, created: (/* @__PURE__ */ new Date()).toISOString() };
      if (doc) {
        docObj.id = doc.id;
        docObj.created = doc.created;
        await saveDoc(docObj);
      } else {
        docObj.id = (undefined).crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
        await addDoc(docObj);
      }
      docs.value = await getDocs();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconsMenu = _sfc_main$1;
      const _component_IconsLogo = __nuxt_component_1$1;
      const _component_FileRename = __nuxt_component_2;
      const _component_IconsDelete = __nuxt_component_3;
      const _component_ButtonsSave = __nuxt_component_4;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-100 d-flex align-items-center" }, _attrs))} data-v-165eb911><div class="left d-flex align-items-center gap-5" data-v-165eb911><button class="menu" data-v-165eb911>`);
      _push(ssrRenderComponent(_component_IconsMenu, {
        variant: unref(isMenuOpen) ? "close" : "open"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_IconsLogo, { class: "logo w-100" }, null, _parent));
      _push(`<hr data-v-165eb911>`);
      _push(ssrRenderComponent(_component_FileRename, null, null, _parent));
      _push(`</div><div class="right d-flex align-items-center gap-9" data-v-165eb911><button class="delete" data-v-165eb911>`);
      _push(ssrRenderComponent(_component_IconsDelete, null, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_ButtonsSave, { onSaveChanges: save }, null, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-165eb911"]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=Header-BnuglAjO.mjs.map
