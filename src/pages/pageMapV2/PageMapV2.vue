<script lang="ts" setup>
import { useInteractionLayer, useMap, useMapState, useMarkerDrawer } from './hooks'
import { genshinMapCanvasKey, mapAffixLayerKey, mutuallyExclusiveLayerKey } from './shared'
import {
  CollapseButton,
  MapAffix,
  MapOverlay,
  MapSiderMenu,
  MarkerCollimator,
  MarkerDrawer,
  MarkerFocusIcon,
} from './components'
import { GSSwitch } from '@/components'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const mutuallyExclusiveLayerRef = ref<HTMLElement | null>(null)
const mapAffixLayerRef = ref<HTMLElement | null>(null)

const { map } = useMap(canvasRef)
const { focus } = useMarkerDrawer(canvasRef)
const { visible: interactionLayerVisible } = useInteractionLayer()
const { showTag, showOverlay, showBorder, showTooltip } = useMapState(true)

const collapse = ref(true)
useEventListener('keypress', (ev) => {
  if (ev.code === 'Backquote')
    collapse.value = !collapse.value
})

const covertPosition = (positionExpression?: string) => {
  if (!positionExpression)
    return
  try {
    const pos = positionExpression.split(',').map(Number).slice(0, 2)
    return pos as [number, number]
  }
  catch {
    return undefined
  }
}

provide(genshinMapCanvasKey, canvasRef)
provide(mutuallyExclusiveLayerKey, mutuallyExclusiveLayerRef)
provide(mapAffixLayerKey, mapAffixLayerRef)
</script>

<template>
  <div class="w-full h-full relative">
    <div class="map-mask absolute left-0 top-0 w-full h-full pointer-events-none" />

    <canvas ref="canvasRef" class="map-renderer w-full h-full bg-black" />

    <div class="map-interaction-layer absolute left-0 top-0 w-full h-full pointer-events-none transition-all">
      <div
        class="map-tiny-settings absolute bottom-0 p-2 flex flex-col gap-2 invisible sm:visible z-10 transition-all"
        :class="[
          interactionLayerVisible ? 'pointer-events-auto' : '-translate-x-full',
        ]"
        :style="{
          '--tw-translate-x': '-300%',
        }"
      >
        <GSSwitch v-model="showTag" label="显示地图标签" size="large" />
        <GSSwitch v-model="showOverlay" label="显示附加图层" size="large" />
        <GSSwitch v-model="showBorder" label="显示图层边界" size="large" />
        <GSSwitch v-model="showTooltip" label="显示调试信息" size="large" />
      </div>

      <div ref="mapAffixLayerRef" class="map-affix-provider">
        <MapAffix
          v-for="(group, key) in map?.baseLayer?.overlayManager?.overlayGroups"
          :key="key"
          :pos="[group.bounds[0], group.bounds[1]]"
          :visible="showOverlay"
          zoom-with-map
          pickable
        >
          <MapOverlay :option-group="group" />
        </MapAffix>

        <MapAffix v-if="focus" :pos="covertPosition(focus.position)">
          <MarkerFocusIcon :marker="focus" />
        </MapAffix>
      </div>

      <CollapseButton
        v-model:collapse="collapse"
        :class="[
          interactionLayerVisible ? 'pointer-events-auto' : '-translate-x-full',
        ]"
        :style="{
          '--tw-translate-x': '-300%',
        }"
      />
      <MapSiderMenu v-model:collapse="collapse" class="z-10 transition-all" :class="[interactionLayerVisible ? 'pointer-events-auto' : '-translate-x-full']" />
      <MarkerDrawer class="z-10" />
      <MarkerCollimator :class="[interactionLayerVisible ? 'pointer-events-auto' : 'translate-x-full']" />
    </div>

    <div
      ref="mutuallyExclusiveLayerRef"
      class="mutually-exclusive-layer absolute left-0 top-0 w-full h-full pointer-events-none"
      :class="{
        inactive: interactionLayerVisible,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.inactive {
  pointer-events: none;
}

.map-mask {
  background: radial-gradient(transparent 50%, #00000060);
  z-index: 1;
}
</style>
