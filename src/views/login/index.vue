<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

// 是否记住密码
const isRemember = ref(false)

// 登录数据
const loginData = reactive({
  username: import.meta.env.MODE === 'development' ? 'admin' : '',
  password: import.meta.env.MODE === 'development' ? '123456' : ''
})

// 校验规则
const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 表单引用
const formRef = ref(null)

// 提交表单
const submitForm = () => {
  if (!formRef.value) return

  formRef.value.validate((valid) => {
    if (valid) {
      userStore.login(loginData)
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <div class="head">
        <h1 class="title">欢迎回来</h1>
        <p class="info">输入您的账号和密码登录</p>
      </div>
      <el-form ref="formRef" :model="loginData" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            size="large"
            :prefix-icon="User"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            size="large"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div class="remember-password">
            <el-checkbox v-model="isRemember" label="记住密码" size="large" />
            <el-text type="primary" class="text">忘记密码</el-text>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" size="large" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-text>还没有账号？</el-text><el-link type="primary">注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(242, 243, 245);

  .login-form {
    width: 400px;
    padding: 40px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    // 头部
    .head {
      .title {
        margin-bottom: 10px;
      }

      .info {
        margin-bottom: 20px;
        color: #999;
        font-size: 14px;
      }
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
</style>
