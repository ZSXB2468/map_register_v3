<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { AvatarEditor } from './components'
import { GSButton, GSDivider, GSInput } from '@/components'
import { useFetchHook } from '@/hooks'
import type { ElFormType } from '@/shared'
import { useUserStore } from '@/stores'
import Api from '@/api/api'

const userStore = useUserStore()

const form = ref<API.SysUserUpdateVo>({
  userId: userStore.info.id,
  nickname: userStore.info.nickname,
  qq: userStore.info.qq,
  phone: userStore.info.phone,
  logo: userStore.info.logo,
})

const isDifference = computed(() => {
  const { nickname, qq, phone } = form.value
  const { nickname: rawNickname, qq: rawQQ, phone: rawPhone } = userStore.info
  return [
    [nickname, rawNickname],
    [qq, rawQQ],
    [phone, rawPhone],
  ].find(([a, b]) => {
    a ||= ''
    b ||= ''
    return a !== b
  })
})

const formRef = ref<ElFormType | null>(null)

const rules: FormRules = {
  nickname: [{ required: true, message: '昵称不能为空' }],
  qq: [{ required: true, message: '不是合法的Q号格式', validator: (_, v: string) => /[1-9][0-9][4,9]/.test(v) }],
  phone: [{ message: '不是合法的手机号格式', validator: (_, v: string) => !v || /^1[3-9]\d{9}$/.test(v) }],
}

const { refresh: updateUserInfo, loading } = useFetchHook({
  onRequest: async () => {
    if (!isDifference.value)
      throw new Error('校验失败')
    const isValid = await formRef.value?.validate().catch(() => false)
    if (!isValid)
      return
    await Api.sysUserController.updateUser({}, form.value)
    await userStore.updateUserInfo()
    document.documentElement.style.setProperty('--user-icon', `url("${userStore.info.logo}")`)
  },
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center overflow-hidden">
    <el-form
      ref="formRef"
      style="--el-form-label-font-size: 18px; width: 370px"
      label-width="100px"
      label-position="left"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="昵称" prop="nickname">
        <GSInput v-model="form.nickname" :disabled="loading" style="width: 100%" />
      </el-form-item>

      <el-form-item label="QQ" prop="qq">
        <GSInput v-model="form.qq" :disabled="loading" style="width: 100%" />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <GSInput v-model="form.phone" :disabled="loading" style="width: 100%" />
      </el-form-item>
    </el-form>

    <GSButton
      :loading="loading"
      :disabled="!isDifference"
      theme="dark"
      icon="submit"
      style="width: 370px"
      @click="updateUserInfo"
    >
      保存
    </GSButton>

    <GSDivider />

    <AvatarEditor v-model="form.logo" />
  </div>
</template>
