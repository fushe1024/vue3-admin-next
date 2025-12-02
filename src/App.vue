<script setup>
// import { ref } from 'vue'
// import { setTheme } from '@/utils/theme'

// const color = ref('#409eff')

// const changeTheme = (val) => {
//   setTheme(val)
//   localStorage.setItem('theme-color', val)
// }
</script>

<template>
  <!-- <div>
    <el-color-picker v-model="color" @change="changeTheme" />
  </div>

  <div class="button-row">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div> -->
  <router-view></router-view>
</template>

<style scoped></style>
