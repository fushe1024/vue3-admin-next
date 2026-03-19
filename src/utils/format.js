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
