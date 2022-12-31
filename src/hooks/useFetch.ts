import type { Ref } from 'vue'
import { messageFrom } from '@/utils'

interface BasicResponseBody {
  error?: boolean
  errorStatus?: number
  errorData?: Record<string, any>
  message?: string
  time?: string
}

export interface FetchHookOptions<T extends BasicResponseBody> {
  loading?: Ref<boolean>
  immediate?: boolean
  onRequest?: () => Promise<T>
}

export const useFetchHook = <T extends BasicResponseBody>(options: FetchHookOptions<T> = {}) => {
  const { immediate, loading = ref(false), onRequest } = options

  const onSuccessHook = createEventHook<T>()
  const onErrorHook = createEventHook<Error>()

  const refresh = async () => {
    try {
      loading.value = true
      if (onRequest) {
        const res = await onRequest()
        /** @TODO */
        if (res.error)
          throw new Error(`error in server \n ${res.errorData} \n ${res.message}`)
        onSuccessHook.trigger(res)
      }
    }
    catch (err) {
      onErrorHook.trigger(err instanceof Error ? err : new Error(messageFrom(err)))
    }
    finally {
      loading.value = false
    }
  }

  immediate && onMounted(refresh)

  return { loading, refresh, onSuccess: onSuccessHook.on, onError: onErrorHook.on }
}
