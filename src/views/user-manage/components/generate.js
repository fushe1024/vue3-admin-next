/**
 * 导入数据对应表
 */
const importDataMap = {
  用户名: 'username',
  手机号码: 'password',
  角色: 'role',
  创建时间: 'openTime'
}

/**
 * 格式化日期
 * @param {*} numb 日期数值
 * @returns 格式化后的日期字符串
 */
export const formatDate = (numb) => {
  const baseDate = new Date(1900, 0, 1)
  const time = new Date(baseDate.getTime() + (numb - 2) * 86400000)

  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()

  const m = month < 10 ? '0' + month : month
  const d = date < 10 ? '0' + date : date

  return `${year}/${m}/${d}`
}

/**
 * 生成导入数据
 * @param {*} excelData { headers: [],  jsonData: [] }
 * @returns 导入数据数组
 */
export function generateImportData(excelData) {
  const usersData = []

  // 遍历每行数据，生成用户对象
  excelData.jsonData.forEach((row) => {
    const user = {}

    // 方法1：使用 Object.entries 遍历对象键值对，将值赋值给用户对象
    Object.entries(importDataMap).forEach(([key, value]) => {
      user[value] = value === 'openTime' ? formatDate(row[key]) : row[key]
    })

    usersData.push(user)
  })

  return usersData
}
