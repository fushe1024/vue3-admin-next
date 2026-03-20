import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

/**
 * 格式化时间
 */
export const formatDate = (date, format = 'YYYY/MM/DD') => {
  if (!isNaN(date)) {
    date = parseInt(date)
  }
  return dayjs(date).format(format)
}

/**
 * 格式化 Excel 中的日期
 * @param {*} numb 日期数值
 * @returns 格式化后的日期字符串
 */
export const formatExcelDate = (numb) => {
  const baseDate = new Date(1900, 0, 1)
  const time = new Date(baseDate.getTime() + (numb - 2) * 86400000)

  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()

  const m = month < 10 ? '0' + month : month
  const d = date < 10 ? '0' + date : date

  return `${year}/${m}/${d}`
}
