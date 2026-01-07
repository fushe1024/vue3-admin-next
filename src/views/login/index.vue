<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import { defaultSettings } from '@/settings'
import logo from '@/assets/logo.png'
import { useI18n } from 'vue-i18n'

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
const submitForm = () => {
  if (!formRef.value) return

  // 校验表单
  formRef.value.validate(async (valid) => {
    if (valid) {
      await userStore.login(loginData)
    }
  })
}

// 忘记密码
const handleForgetPassword = () => {
  ElMessage.success(t('login.resetPassword'))
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
          <div class="version-box">
            <span class="version">Version</span>
            <el-badge :value="`v${defaultSettings.version}`" type="primary" />
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
        align-items: space-between;

        .title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        // 版本信息容器
        .version-box {
          display: flex;
          align-items: center;

          .version {
            margin-top: 5px;
            margin-right: 5px;
            color: #999;
            font-size: 12px;
            text-transform: uppercase;
          }

          :deep(.el-badge .el-badge__content) {
            padding: 0.1rem 0.55rem;
            font-size: 14px;
            font-weight: 500;
            color: var(--el-color-primary);
            background: linear-gradient(135deg, #165dff1f, #4096ff2e);
            border: 1px solid rgba(22, 93, 255, 0.18);
            border-radius: 999px;
          }
        }
      }
    }

    // 登录表单标题
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
