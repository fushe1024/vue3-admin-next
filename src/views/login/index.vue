<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import { User, Lock } from '@element-plus/icons-vue'
import { defaultSettings } from '@/settings'
import logo from '@/assets/logo.png'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const userStore = useUserStore()

// 是否记住密码
const isRemember = ref(false)

// 登录数据
const loginData = reactive({
  username: import.meta.env.MODE === 'development' ? 'super-admin' : '',
  password: import.meta.env.MODE === 'development' ? '123456' : ''
})

// 校验规则
const rules = {
  username: [
    { required: true, message: t('login.message.username.required'), trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: t('login.message.password.required'),
      trigger: 'blur'
    },
    { min: 6, message: t('login.message.password.min'), trigger: 'blur' }
  ]
}

// 表单引用
const formRef = ref(null)

// 登录提交
const submitForm = async () => {
  if (!formRef.value) return

  // 校验表单
  await formRef.value.validate(() => {
    userStore.login(loginData).then(() => {
      // 登录成功后，跳转到之前的页面，或者默认跳转到首页
      router.push(route.query.redirect || '/')
    })
  })
}

// 忘记密码
const handleForgetPassword = () => {
  console.log('待完善')
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <div class="head">
        <!-- logo -->
        <el-image :src="logo" class="logo" />

        <!-- 标题 -->
        <div class="info-container">
          <h1 class="title">{{ defaultSettings.title }}</h1>
          <div class="version">
            <span class="version-text">Version</span>
            <el-tag type="primary">v{{ defaultSettings.version }}</el-tag>
          </div>
        </div>
      </div>
      <el-form ref="formRef" :model="loginData" :rules="rules">
        <h1 class="form-title">{{ t('login.login') }}</h1>
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            size="large"
            :prefix-icon="User"
            :placeholder="t('login.username')"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            size="large"
            :prefix-icon="Lock"
            type="password"
            :placeholder="t('login.password')"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div class="remember-password">
            <el-checkbox
              v-model="isRemember"
              :label="$t('login.rememberMe')"
              size="large"
            />
            <el-text type="primary" class="text" @click="handleForgetPassword">
              {{ $t('login.forgetPassword') }}
            </el-text>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" size="large" @click="submitForm">
            {{ t('login.login') }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-text>{{ t('login.noAccount') }}</el-text>
          <el-link type="primary">{{ t('login.reg') }}</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/login-bg.svg');
  background-position: center center;
  background-size: cover;

  // 登录表单容器
  .login-form {
    width: 400px;
    padding: 40px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    // 头部区域
    .head {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      // 左侧 - logo
      .logo {
        padding: 5px;
        width: 52px;
        height: 52px;
        margin-right: 20px;
        background: radial-gradient(circle at 30% 20%, #fff, #e6efff);
        border-radius: 18px;
        box-shadow:
          0 8px 20px #165dff29,
          0 0 0 1px #fffc inset;
      }

      // 右侧 - 标题和版本信息
      .info-container {
        display: flex;
        flex-direction: column;
        align-items: start;

        .title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .version {
          display: flex;
          align-items: center;
          color: #999;
          font-size: 12px;

          .version-text {
            margin-right: 5px;
            text-transform: uppercase;
          }

          :deep(.el-tag) {
            border-radius: 999px;
          }
        }
      }
    }

    // 登录文字
    .form-title {
      margin: 0 0 0.75rem;
      font-weight: 600;
      font-size: 1.25rem;
      text-align: center;
    }

    // 记住密码
    .remember-password {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .text {
        cursor: pointer;
      }
    }

    // 登录按钮
    .login-btn {
      width: 100%;
    }
  }
}

// 暗黑模式下的登录容器样式
.dark {
  .login-container {
    background: url('@/assets/images/login-bg.svg');
    background-position: center center;
    background-size: cover;
  }

  .login-form {
    background: #1a2030e6;
    border-color: #568cff47;
    box-shadow:
      0 20px 60px #00000094,
      0 4px 16px #0000005c,
      0 0 0 1px #6e96ff29 inset;
  }
}
</style>
