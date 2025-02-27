<script lang="ts" setup>
import { Avatar } from '@element-plus/icons-vue'
import { AppSettings } from '.'
import { useUserStore } from '@/stores'
import { useGlobalDialog, useTheme } from '@/hooks'

defineProps<{
  mapMode?: boolean
}>()

const userStore = useUserStore()
const { isDark } = useTheme()
const { DialogService } = useGlobalDialog()

const openSettingDialog = () => DialogService
  .config({
    title: '系统设置',
    alignCenter: true,
    width: 'fit-content',
  })
  .open(AppSettings)

const handleCommand = (command: string) => ({
  userinfo: () => userStore.showUserInfo = true,
  themeschema: () => isDark.value = !isDark.value,
  setting: () => openSettingDialog(),
  logout: () => userStore.logout(),
} as Record<string, () => void>)[command]?.()
</script>

<template>
  <el-dropdown class="genshin-avatar" trigger="click" style="--el-border-radius-base: 8px" @command="handleCommand">
    <el-button v-bind="$attrs" text size="large" :style="{ padding: '4px 8px' }">
      <el-avatar v-if="userStore.info.logo?.trim()" class="rounded-full overflow-hidden" :size="30" :src="userStore.info.logo.trim()" />
      <el-icon v-else :size="30" class="rounded-full overflow-hidden" style="background: var(--el-color-info-light-3);" color="#FFF">
        <Avatar />
      </el-icon>
      <el-icon class="pl-1">
        <ArrowDown />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="userinfo">
          {{ userStore.info.nickname }}
        </el-dropdown-item>
        <el-dropdown-item v-if="userStore.isAdmin">
          <router-link to="/items">
            管理界面
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/map">
            地图V2
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item divided command="setting">
          系统设置
        </el-dropdown-item>
        <el-dropdown-item command="themeschema">
          {{ isDark ? '明亮' : '黑暗' }}模式
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <el-text type="danger">
            退出账户
          </el-text>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.genshin-avatar {
  transition: var(--el-transition-all);
}
</style>
