import { asyncComputed } from '@vueuse/core';
import { computed, reactive, ref } from 'vue';
import { formatStorage } from './utils';
import pictureFilenames from 'virtual:ls?path=/public/profiles';

export const pictures = pictureFilenames.map((pictureFilename) => {
  const filename = ref(pictureFilename);
  const url = computed(() => `${import.meta.env.BASE_URL}profiles/${filename.value}`);

  const blob = asyncComputed<Blob>(async () => {
    const response = await fetch(url.value);
    return await response.blob();
  });

  const size = computed(() => {
    const size = blob.value?.size;
    if (!size) return '';
    return formatStorage(size);
  });

  return reactive({
    url,
    filename,
    blob,
    size,
  });
});

export const resolvePicture = (filename: string) => {
  return pictures.find(picture => picture.filename === filename);
}
