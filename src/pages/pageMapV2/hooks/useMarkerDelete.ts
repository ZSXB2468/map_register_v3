import { pick } from 'lodash'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useFetchHook } from '@/hooks'
import { useUserStore } from '@/stores'
import Api from '@/api/api'

export const useMarkerDelete = () => {
  const userStore = useUserStore()

  const buildModifyMarkerForm = (marker: API.MarkerVo): API.MarkerPunctuateVo => {
    return {
      ...pick(marker, Object.keys(marker)) as API.MarkerPunctuateVo,
      methodType: 3,
    }
  }

  const request = async (marker: API.MarkerVo) => {
    if (userStore.isAdmin)
      return await Api.marker.deleteMarker({ markerId: marker.id! })

    const form = buildModifyMarkerForm(marker)
    await Api.punctuate.addPunctuate({}, form)
  }

  const { refresh: submit, onSuccess, onError, ...rest } = useFetchHook({ onRequest: request })

  const deleteMarker = async (marker: API.MarkerVo | null) => {
    if (!marker)
      return
    const isConfirm = await ElMessageBox.confirm(
      `确认删除点位（${marker.markerTitle} id:${marker.id}）？该操作不可逆。`,
      {
        title: '警告',
        confirmButtonClass: 'el-button--danger',
      },
    ).catch(() => false)
    isConfirm && await submit(marker)
  }

  onSuccess(() => ElMessage.success('删除成功'))
  onError(err => ElMessage.error(`删除失败。${err.message}`))

  return { deleteMarker, onSuccess, onError, ...rest }
}
