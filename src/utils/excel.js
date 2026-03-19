import * as XLSX from 'xlsx'

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
