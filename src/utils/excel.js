import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// 获取Excel表头行
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])

  const R = range.s.r

  for (let C = range.s.c; C <= range.e.c; C++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })]

    headers.push(cell ? XLSX.utils.format_cell(cell) : '')
  }

  return headers
}

/**
 * 将 JSON 数据导出为 Excel 文件
 * @param {Object} options 配置项
 * @param {Array[]} [options.multiHeader=[]] 多级表头（二维数组）
 * @param {Array|Object} options.header 表头：若为数组则直接使用；若为对象则取其所有键作为表头
 * @param {Array[]} options.data 数据体（二维数组）
 * @param {string} [options.fileName='excel-list'] 导出文件名（不含后缀）
 * @param {string[]} [options.merges=[]] 合并单元格区域，如 ['A1:A2', 'B1:D1']
 * @param {boolean} [options.autoWidth=true] 是否自动计算列宽
 * @param {string} [options.bookType='xlsx'] 导出类型：xlsx, csv, txt 等
 */
export const export_json_to_excel = ({
  multiHeader = [],
  header,
  data,
  fileName = 'excel-list',
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) => {
  // 1. 处理 header
  if (!Array.isArray(header)) {
    if (header && typeof header === 'object') {
      header = Object.keys(header)
    } else {
      console.error('header 必须是数组或对象')
      return
    }
  }

  // 2. 校验 data 是否为二维数组
  if (!Array.isArray(data) || !data.every((row) => Array.isArray(row))) {
    console.error('data 必须是二维数组（数组的数组）')
    return
  }

  // 3. 校验 multiHeader 是否为二维数组（或空数组）
  if (!Array.isArray(multiHeader) || !multiHeader.every((row) => Array.isArray(row))) {
    console.error('multiHeader 必须是二维数组（数组的数组）')
    return
  }

  try {
    // 1. 构建完整二维数组（多级表头 + 一级表头 + 数据）
    const sheetData = [...multiHeader, header, ...data]

    // 2. 使用 aoa_to_sheet 创建工作表（自动处理类型和日期）
    const ws = XLSX.utils.aoa_to_sheet(sheetData, { cellDates: true })

    // 3. 处理合并单元格
    if (merges.length > 0) {
      ws['!merges'] = merges.map((range) => XLSX.utils.decode_range(range))
    }

    // 4. 自动列宽计算
    if (autoWidth) {
      const colWidths = sheetData.map((row) =>
        row.map((cell) => {
          if (cell == null) return { wch: 8 }
          const str = String(cell)
          const isChinese = /[\u4e00-\u9fa5]/.test(str)
          return { wch: isChinese ? str.length * 2 : str.length + 2 }
        })
      )

      const result = colWidths[0].map((_, colIdx) => {
        const max = Math.max(...colWidths.map((row) => row[colIdx]?.wch || 0))
        return { wch: Math.min(max, 100) }
      })
      ws['!cols'] = result
    }

    // 5. 创建工作簿
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    // 6. 写入为二进制字符串
    const wbout = XLSX.write(wb, { bookType, bookSST: false, type: 'binary' })

    // 7. 转换为 Blob 并下载
    const buf = new ArrayBuffer(wbout.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff
    saveAs(
      new Blob([buf], { type: 'application/octet-stream' }),
      `${fileName}.${bookType}`
    )
  } catch (error) {
    console.error('导出 Excel 失败：', error)
  }
}
