<script setup>
import { useRoute } from 'vue-router'
import { getUserInfoApi } from '@/api/user-manage'
import { ref, watch } from 'vue'
import { formatDate } from '@/utils/format'
// import printJS from 'print-js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { watchLanguageChange } from '@/utils/i18n'

const route = useRoute()

// 用户详情
const userInfo = ref({})

// 获取用户详情
const getUserInfo = async (id) => {
  const res = await getUserInfoApi(id)
  userInfo.value = res
}

// 监听路由参数变化，获取用户详情
watch(
  () => route.params.id,
  (id) => {
    getUserInfo(id)
  },
  {
    immediate: true
  }
)

watchLanguageChange(getUserInfo(route.params.id))

// 方式一: 使用print-js打印用户详情
// const handlePrint = () => {
//   printJS({
//     printable: 'user-info-box',
//     type: 'html',
//     targetStyles: ['*']
//   })
// }

//
const handlePrint = async () => {
  // 0 元素选择
  const element = document.getElementById('user-info-box')

  // 1 截图
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  })

  // 2 转图片
  const imgData = canvas.toDataURL('image/png')

  // 3 创建 PDF
  const pdf = new jsPDF('p', 'mm', 'a4')

  const imgWidth = 210
  const pageHeight = 295
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0

  // 4 写入图片
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)

  heightLeft -= pageHeight

  // 5 多页处理
  while (heightLeft > 0) {
    position = heightLeft - imgHeight

    pdf.addPage()

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)

    heightLeft -= pageHeight
  }

  // 6 下载PDF
  // pdf.save('用户详情.pdf')

  // 6 打开PDF
  window.open(pdf.output('bloburl'))
}
</script>

<template>
  <div class="user-info">
    <!-- 打印按钮 -->
    <div class="app-card print-btn">
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </div>
    <!-- 用户详情卡片 -->
    <el-card id="user-info-box">
      <div class="title">员工信息</div>
      <el-descriptions border>
        <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
          <el-image style="width: 100px; height: 100px" :src="userInfo.avatar" />
        </el-descriptions-item>
        <el-descriptions-item :width="200" label="姓名">
          {{ userInfo.nickname || userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号码">
          {{ userInfo.mobile }}
        </el-descriptions-item>
        <el-descriptions-item label="民族"
          >{{ userInfo.nationality }}族</el-descriptions-item
        >
        <el-descriptions-item label="性别">
          {{ userInfo.gender }}
        </el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <span v-for="item in userInfo.remark" :key="item" class="print-tag">
            {{ item || '无备注' }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="专业"> 计算机科学与技术 </el-descriptions-item>
        <el-descriptions-item label="联系地址" :span="3">
          {{ userInfo.address }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions border direction="vertical" :column="1">
        <el-descriptions-item label="经历">
          <div v-for="item in userInfo.experience" :key="item">
            <span>{{ formatDate(item.startTime) }}</span>
            -
            <span>{{ formatDate(item.endTime) }}</span>
            <span style="margin: 0 50px">{{ item.title }}</span>
            <span>{{ item.desc }}</span>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="荣誉">
          {{ userInfo.glory || '无荣誉' }}
        </el-descriptions-item>
        <el-descriptions-item label="自我评价">
          我是一个信息工程专业的学生，我在苏州大学学习了4年，我是一个有才华的人，我有一个好的家庭，我有一个好的朋友，我有一个好的工作。
        </el-descriptions-item>
      </el-descriptions>
      <div class="foot">签字:___________日期:___________</div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user-info {
  // 打印按钮
  .print-btn {
    display: flex;
    justify-content: end;
    padding-bottom: 10px;
  }

  // 用户详情卡片
  .el-card {
    padding: 20px;

    // 标题
    .title {
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    // 打印标签
    .print-tag {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      height: 20px;
      padding: 0 7px;
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary-light-8);
      border-radius: 4px;
      font-size: 12px;
      margin-right: 5px;
      color: var(--el-color-primary);
    }

    // 页脚
    .foot {
      font-size: 14px;
      font-weight: bold;
      text-align: end;
      margin-top: 30px;
    }
  }
}
</style>
