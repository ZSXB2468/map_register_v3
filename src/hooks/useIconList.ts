import { liveQuery } from 'dexie'
import { useSubscription } from '@vueuse/rxjs'
import type { FetchHookOptions } from '@/hooks'
import { useFetchHook } from '@/hooks'
import db from '@/database'

interface IconsHookOptions extends FetchHookOptions<API.RPageListVoIconVo> {
  params?: () => API.IconSearchVo
}

/** 图标 hook，在子组件中使用时如果不需要重复请求，可将 immediate 设置为 false */
export const useIconList = (options: IconsHookOptions = {}) => {
  const { immediate, loading } = options

  /** 共享的图标列表 */
  const iconList = ref<API.IconVo[]>([])
  /** 共享的图标映射表 */
  const iconMap = computed(() => iconList.value.reduce((seed, { name, url }) => {
    if (name && url)
      seed[name] = url
    return seed
  }, {} as Record<string, string>))

  const { refresh: updateIconList, onSuccess, ...rest } = useFetchHook({
    immediate,
    loading,
    onRequest: () => db.icon.toArray(),
  })

  useSubscription(liveQuery(() => db.icon.toCollection()).subscribe(updateIconList))

  onSuccess((record) => {
    iconList.value = record
  })

  return { iconList, iconMap, updateIconList, onSuccess, ...rest }
}
