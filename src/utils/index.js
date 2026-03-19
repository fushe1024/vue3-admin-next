/**
 * 判断数据是否为空
 */
export const isEmpty = (data) => {
  if (data == null) return true
  if (Array.isArray(data)) return data.length === 0
  if (typeof data === 'object') return Object.keys(data).length === 0
  return false
}

/**
 * 判断文件是否为 Excel 文件
 */
export const isExcelFile = (file) => {
  const reg = /\.(xlsx|xls|csv)$/.test(file.name)

  const type =
    file.type === 'application/vnd.ms-excel' ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  return reg && type
}
