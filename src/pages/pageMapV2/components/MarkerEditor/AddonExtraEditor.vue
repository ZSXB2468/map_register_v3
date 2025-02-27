<script lang="ts" setup>
import type { MarkerExtra } from '@/utils'
import { APPLE_2_8_OPTIONS, UNDERGROUND_OPTIONS_MAP } from '@/pages/pageMapV2/config'

const props = defineProps<{
  modelValue?: MarkerExtra
  areaCode?: string
}>()

const emits = defineEmits<{
  'update:modelValue': [v: MarkerExtra]
}>()

/** 多处理一下防止字段不存在，以便进行双绑 */
const initExtraObject = (extra: MarkerExtra): Required<MarkerExtra> => {
  const { underground = {}, caves = [], '2_8_island': island = {} } = extra
  const { region_name = '', region_levels = [], is_underground = false, model_id = '' } = underground
  const { island_name = '', island_state = [] } = island
  return {
    caves,
    'underground': { region_name, region_levels, is_underground, model_id },
    '2_8_island': { island_name, island_state },
  }
}

/** 判断是否为空字段，是则去除以缩减序列化后的体积 */
const withoutEmpty = <T = unknown>(v: T): T | undefined => {
  if (typeof v !== 'object')
    return v
  const isEmpty = Array.isArray(v)
    ? v.length === 0
    : Object.keys(v as object).length === 0
  return isEmpty ? undefined : v
}

/** 生成去除空白字段的 extra 对象 */
const compressExtraObject = (extra: Required<MarkerExtra>): MarkerExtra => ({
  '2_8_island': withoutEmpty(extra['2_8_island']),
  'underground': withoutEmpty(extra.underground),
  'caves': withoutEmpty(extra.caves),
})

/** 保证 extra 包含默认字段 */
const withDefaultExtra = ref<Required<MarkerExtra>>(initExtraObject(props.modelValue ?? {}))

/** 深度监听更新 */
watch(withDefaultExtra, extra => emits('update:modelValue', compressExtraObject(extra)), { deep: true })

// ==================== 海岛独有部分 ====================
/** 是否为 2.8 海岛 */
const is28AppleIsland = computed(() => props.areaCode === 'A:APPLE:2_8')

/** 岛屿名称 */
const isLandName = computed({
  get: () => withDefaultExtra.value['2_8_island'].island_name,
  set: (v) => {
    withDefaultExtra.value['2_8_island'].island_name = v
    withDefaultExtra.value['2_8_island'].island_state = []
  },
})

/** 海岛选项 */
const islandOptions = computed(() => APPLE_2_8_OPTIONS.map(({ label, value }) => ({ label, value })))

/** 海岛子区域选项 */
const islandChildrenOptions = computed(() => {
  return (APPLE_2_8_OPTIONS.find(opt => opt.value === isLandName.value)?.children ?? []) as { label: string; value: string }[]
})

// ==================== 地下部分 ====================
/** 地下配置 */
const undergroundConfig = computed(() => {
  const { modelId = 'basic', options = [] } = UNDERGROUND_OPTIONS_MAP[props.areaCode ?? ''] ?? {}
  return { modelId, options }
})

/** 地下区域 */
const undergroundRegion = computed({
  get: () => {
    const { region_name = '', region_levels: [region_level] = [] as string[] } = withDefaultExtra.value.underground
    return [region_name, region_level].filter(Boolean)
  },
  set: (v) => {
    const [region_name, region_level] = v
    withDefaultExtra.value.underground.region_name = region_name
    withDefaultExtra.value.underground.region_levels = region_level ? [region_level] : undefined
  },
})

/** 是否为地下 */
const isUnderground = computed({
  get: () => withDefaultExtra.value.underground.is_underground,
  set: (v) => {
    if (!v) {
      delete withDefaultExtra.value.underground.is_underground
      delete withDefaultExtra.value.underground.model_id
      delete withDefaultExtra.value.underground.region_name
      delete withDefaultExtra.value.underground.region_levels
      return
    }
    withDefaultExtra.value.underground.is_underground = true
    withDefaultExtra.value.underground.model_id = undergroundConfig.value.modelId
  },
})
</script>

<template>
  <div class="w-full flex gap-2">
    <template v-if="is28AppleIsland">
      <el-select-v2 v-model="isLandName" style="width:100px" :options="islandOptions" />
      <el-select-v2
        v-model="withDefaultExtra['2_8_island'].island_state"
        :disabled="!islandChildrenOptions.length"
        :options="islandChildrenOptions"
        class="flex-1"
        multiple
        collapse-tags
        collapse-tags-tooltip
      />
    </template>
    <template v-else>
      <el-switch v-model="isUnderground" inline-prompt active-text="地下" inactive-text="地上" />
      <el-cascader
        v-if="isUnderground && undergroundConfig.options.length"
        v-model="undergroundRegion"
        :options="undergroundConfig.options"
        class="flex-1"
      />
    </template>
  </div>
</template>
