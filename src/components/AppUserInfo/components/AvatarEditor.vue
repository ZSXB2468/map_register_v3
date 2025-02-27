<script lang="ts" setup>
import { Loading } from '@element-plus/icons-vue'
import { pick } from 'lodash'
import type { AvatarOption } from '../config'
import { avatarList } from '../config'
import { GSButton } from '@/components'
import { useUserStore } from '@/stores'
import { useFetchHook } from '@/hooks'
import Api from '@/api/api'

const userStore = useUserStore()

const selectedAvatar = ref(avatarList.find(avatar => avatar.icon === userStore.info.logo))

const previewLoading = ref(Boolean(selectedAvatar.value))
watch(selectedAvatar, () => {
  previewLoading.value = true
})
const onLoad = () => {
  previewLoading.value = false
}

const { loading, refresh: updateUserInfo, onSuccess } = useFetchHook({
  onRequest: () => Api.sysUserController.updateUser({}, {
    ...pick(userStore.info, 'nickname', 'qq', 'phone', 'roleId'),
    userId: userStore.info.id,
    logo: selectedAvatar.value?.icon,
  }),
})

const setSelectedIcon = (avatar?: AvatarOption) => {
  if (loading.value)
    return
  selectedAvatar.value = (avatar && avatar === selectedAvatar.value)
    ? undefined
    : avatar
}

onSuccess(() => {
  userStore.info.logo = selectedAvatar.value?.icon
})
</script>

<template>
  <div class="w-full flex-1 flex overflow-hidden select-none">
    <div class="avatar-list grid grid-cols-4 gap-2 pr-2">
      <div
        v-for="avatar in avatarList"
        :key="avatar.id"
        class="avatar-btn rounded overflow-hidden"
        :class="{
          actived: avatar.id === selectedAvatar?.id,
          used: avatar.icon === userStore.info.logo,
        }"
        @click="setSelectedIcon(avatar)"
      >
        <img
          class="avatar-icon w-full h-full rounded-full object-contain"
          :src="avatar.icon"
          crossorigin=""
          referrerpolicy="no-referrer"
          loading="lazy"
        >
      </div>
    </div>

    <div class="flex-1 px-4 flex flex-col gap-8 justify-center items-center pb-1">
      <div class="w-full flex-1 grid place-items-center">
        <img
          v-if="selectedAvatar"
          v-show="!previewLoading"
          class="avatar-preview"
          :src="selectedAvatar.icon"
          crossorigin=""
          referrerpolicy="no-referrer"
          @load="onLoad"
        >
        <div v-show="previewLoading" class="avatar-preview grid place-items-center">
          <el-icon :size="32" class="animate-spin">
            <Loading />
          </el-icon>
        </div>
      </div>
      <div class="avatar-name">
        {{ selectedAvatar?.name ?? '<???>' }}
      </div>
      <GSButton
        icon="submit"
        theme="dark"
        style="width: 100%;"
        :disabled="!selectedAvatar || userStore.info.logo === selectedAvatar.icon"
        :loading="loading"
        @click="updateUserInfo"
      >
        使用头像
      </GSButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar-list {
  overflow: auto;
  background: #e7e3db;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #9e9a94;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #FFFFFF;
    border-radius: 6px;
  }
}

.avatar-btn {
  --width: 84px;
  --btn-bg: transparent;
  --btn-padding: 8px;
  --btn-border-color: transparent;
  --icon-filter: drop-shadow(0 0 4px #00000060);
  --icon-outline-color: transparent;
  --icon-border-color: #00000060;

  content-visibility: auto;
  width: var(--width);
  height: var(--width);
  padding: var(--btn-padding);
  background-color: var(--btn-bg);
  border: 2px solid var(--btn-border-color);
  transition: padding 50ms linear;
  transition-delay: 25ms;
  position: relative;

  &:not(.actived):hover {
    --btn-border-color: #8F6D4C;
    --btn-padding: 4px;
  }

  &:not(.actived):active {
    --btn-border-color: #d1c1a7;
    --btn-padding: 8px;
    --btn-bg: #38404F20;
  }

  &.actived {
    --btn-border-color: #5d6a81;
    --btn-bg: #38404F;
    --icon-filter: none;
    --icon-border-color: #D5D7D9;
    --icon-outline-color: #FFFFFF20;
  }

  &.used {
    border-color: #5d6a81;
    &::before {
      content: '使用中';
      position: absolute;
      width: var(--width);
      height: 1.5em;
      bottom: 0;
      left: 0;
      background: #38404F;
      color: #FFF;
      font-size: 12px;
      text-align: center;
      z-index: 1;
    }
  }

  .avatar-icon {
    background-color: #C79575;
    border: 2px solid var(--icon-border-color);
    filter: var(--icon-filter);
    outline: 4px solid var(--icon-outline-color);
  }
}

.avatar-preview {
  width: 112px;
  height: 112px;
  background: #D19D78;
  border: 6px solid #5d6a81;
  border-radius: 50%;
  outline: 2px solid #D4BE92;
  object-fit: contain;
}

.avatar-name {
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding: 8px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(to bottom, #D4BE92 2px, #FFF 2px, #FFF calc(100% - 2px), #D4BE92 calc(100% - 2px));
    mask: linear-gradient(to right, transparent, #FFF, transparent);
    z-index: -1;
  }
}
</style>
