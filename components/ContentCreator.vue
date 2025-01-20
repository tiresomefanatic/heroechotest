<template>
  <div class="content-creator">
    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="showNewFileModal = true"
      >
        New File
      </button>
      <button
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        @click="showNewFolderModal = true"
      >
        New Folder
      </button>
    </div>

    <!-- New File Modal -->
    <Modal v-if="showNewFileModal" @close="showNewFileModal = false">
      <template #header>Create New File</template>
      <template #default>
        <form @submit.prevent="createFile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">File Path</label>
            <input
              v-model="newFilePath"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., docs/getting-started.md"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              v-model="newFileContent"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="4"
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 border rounded"
              @click="showNewFileModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create File
            </button>
          </div>
        </form>
      </template>
    </Modal>

    <!-- New Folder Modal -->
    <Modal v-if="showNewFolderModal" @close="showNewFolderModal = false">
      <template #header>Create New Folder</template>
      <template #default>
        <form @submit.prevent="createFolder" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Folder Path</label>
            <input
              v-model="newFolderPath"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., docs/advanced"
              required
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 border rounded"
              @click="showNewFolderModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Folder
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGithub } from '~/composables/useGithub'
import Modal from '~/components/Modal.vue'

const github = useGithub()

const showNewFileModal = ref(false)
const showNewFolderModal = ref(false)
const newFilePath = ref('')
const newFileContent = ref('')
const newFolderPath = ref('')

const createFile = async () => {
  try {
    await github.createNewContent(newFilePath.value, newFileContent.value, false)
    showNewFileModal.value = false
    newFilePath.value = ''
    newFileContent.value = ''
  } catch (error) {
    console.error('Error creating file:', error)
  }
}

const createFolder = async () => {
  try {
    await github.createNewContent(newFolderPath.value, '', true)
    showNewFolderModal.value = false
    newFolderPath.value = ''
  } catch (error) {
    console.error('Error creating folder:', error)
  }
}
</script>
