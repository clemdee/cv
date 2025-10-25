import { asyncComputed } from '@vueuse/core';
import pictureFilenames from 'virtual:ls?path=/public/profiles';
import { computed, reactive, ref } from 'vue';
import { formatStorage } from './utils';

interface Picture {
  url: string
  filename: string
  blob: Blob | undefined
  size: string
  compressed?: {
    url: string
    blob: Blob | undefined
    size: string
  }
}

export const resolveCompressedPicture = async (pictureUrl: string) => {
  if (!pictureUrl) return;

  const dSize = 500;
  const canvas = new OffscreenCanvas(dSize, dSize);
  const context = canvas.getContext('2d', {
    alpha: false,
  });

  const image = new Image();
  image.src = pictureUrl;
  await new Promise(resolve => image.onload = resolve);
  const sWidth = image.naturalWidth;
  const sHeight = image.height;
  const sSize = Math.min(sWidth, sHeight);
  const sx = (sWidth - sSize) / 2;
  const sy = (sHeight - sSize) / 2;

  context?.drawImage(image, sx, sy, sSize, sSize, 0, 0, dSize, dSize);

  const blob = asyncComputed<Blob>(async () => {
    return await canvas.convertToBlob({
      type: 'image/jpeg',
      quality: 0.8,
    });
  });

  const size = computed(() => {
    const size = blob.value?.size;
    if (!size) return '';
    return formatStorage(size);
  });

  const url = computed(() => {
    if (!blob.value) return;
    return URL.createObjectURL(blob.value);
  });

  return reactive({
    url,
    blob,
    size,
  }) as Picture['compressed'];
};

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

  const compressed = asyncComputed<Picture['compressed']>(async () => {
    return await resolveCompressedPicture(url.value);
  }, undefined, {
    lazy: true,
  });

  return reactive({
    url,
    filename,
    blob,
    size,
    compressed,
  }) as Picture;
});

export const resolvePicture = (filename: string) => {
  return pictures.find(picture => picture.filename === filename);
};
