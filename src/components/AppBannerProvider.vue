<script lang="ts" setup>
import { content, visible } from '@/hooks/useBanner/bannerContext'

const height = useCssVar('--gs-banner-height')
watch(visible, (isVisibile) => {
  height.value = isVisibile ? '32px' : '0px'
}, { immediate: true })
</script>

<template>
  <Transition name="draw-y" mode="out-in" appear>
    <div
      v-show="visible"
      class="genshin-text absolute w-full top-0 text-md p-1 h-8 px-2 text-center"
      :style="{
        background: '#E2DED5',
        color: '#4A4F50',
        zIndex: 3000,
      }"
    >
      {{ content }}
    </div>
  </Transition>
</template>
