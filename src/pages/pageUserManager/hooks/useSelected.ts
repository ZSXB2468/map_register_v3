import { ref } from 'vue'
import type { Ref } from 'vue'

interface SelectedHookOptions {
  userList: Ref<API.SysUserVo[]>
  paginationParams: {
    sortBy: string
    descending: boolean
    page: number
    rowsPerPage: number
    rowsNumber: number
  }
}

export const useSelected = (options: SelectedHookOptions) => {
  const { userList, paginationParams } = options

  const selected = ref<API.SysUserVo[]>([])

  const getSelectedString = () =>
    `已选择 ${selected.value.length} 个用户, 共有 ${paginationParams.rowsNumber} 个用户`

  const rowUpdate = (data: API.SysUserVo) => {
    selected.value = selected.value.map(row =>
      row.id === data.id ? data : row,
    )
    userList.value = userList.value.map(row =>
      row.id === data.id ? data : row,
    )
  }

  return { selected, getSelectedString, rowUpdate }
}
