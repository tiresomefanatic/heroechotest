<!-- components/ImageUploader.vue -->
<template>
  <div class="image-uploader">
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      @change="handleFileSelect"
      class="hidden"
    />
    <button
      @click="triggerFileInput"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      :disabled="uploading"
    >
      {{ uploading ? 'Uploading...' : 'Upload Image' }}
    </button>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGithub } from '~/composables/useGithub';

const emit = defineEmits<{
  (e: 'uploaded', url: string): void
}>();

const { uploadImage } = useGithub();

const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);
const error = ref('');

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  
  if (!file) return;
  
  // Reset state
  error.value = '';
  uploading.value = true;
  
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file');
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB');
    }
    
    // Upload the image
    const imageUrl = await uploadImage(file);
    emit('uploaded', imageUrl);
    
    // Clear the input
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } catch (e) {
    error.value = e.message || 'Failed to upload image';
  } finally {
    uploading.value = false;
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
