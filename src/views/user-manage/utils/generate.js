import { formatExcelDate, formatDate } from '@/utils/format'

/**
 * 数据对应表
 */
export const User_Data_Map = {
  用户名: 'username',
  手机号码: 'mobile',
  角色: 'role',
  创建时间: 'openTime'
}

/**
 * 生成导入数据
 * @param {*} excelData Excel 数据对象 { headers: [], jsonData: [] }
 * @returns 格式化后的导入数据数组 [{ username, mobile, role, openTime }, ...]
 */
export function generateImportData(excelData) {
  const usersData = []

  // 遍历每行数据，生成用户对象
  excelData.jsonData.forEach((row) => {
    const user = {}

    // 遍历对象键值对, 将值赋值给用户对象
    Object.entries(User_Data_Map).forEach(([cnKey, enKey]) => {
      // 处理创建时间字段：格式化日期
      if (enKey === 'openTime') {
        user[enKey] = formatExcelDate(row[cnKey])
      } else {
        user[enKey] = row[cnKey]
      }
    })

    usersData.push(user)
  })

  return usersData
}

/**
 * 格式化导出数据
 * @param  usersData 用户数据数组：[{ username, mobile, role, openTime }, ...]
 * @returns  格式化后的数据数组 [['admin','13800000000',["管理员","员工"],'2023/01/01'],...]
 */
export const formatJsonData = (usersData) => {
  return usersData.map((item) => {
    // 按照 User_Data_Map 的值顺序提取值，生成数组: ['username','mobile','role','openTime']
    return Object.values(User_Data_Map).map((enKey) => {
      // 处理创建时间字段：格式化日期
      if (enKey === 'openTime') {
        return formatDate(item[enKey])
      }

      // 角色字段特殊处理：将角色数组转换为 JSON 字符串
      if (enKey === 'role') {
        const roles = item[enKey]
        if (Array.isArray(roles)) {
          const titles = roles.map((role) => role?.title).filter((t) => t != null)
          return JSON.stringify(titles)
        } else {
          return '' // 非数组则返回空字符串
        }
      } else {
        // 其他字段直接取值，缺失则赋空字符串
        return item[enKey] !== undefined ? item[enKey] : ''
      }
    })
  })
}
