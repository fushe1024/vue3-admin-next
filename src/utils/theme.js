export function setTheme(color) {
  const el = document.documentElement

  setProperty('--el-color-primary', color)

  for (let i = 1; i <= 9; i++) {
    setProperty(`--el-color-primary-light-${i}`, mix(color, '#ffffff', i * 0.1))
  }

  setProperty('--el-color-primary-dark-2', mix(color, '#000000', 0.2))

  function setProperty(key, val) {
    el.style.setProperty(key, val)
  }
}

function mix(color1, color2, weight) {
  function hexToRgb(hex) {
    hex = hex.replace('#', '')
    const bigint = parseInt(hex, 16)
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    }
  }

  const c1 = hexToRgb(color1)
  const c2 = hexToRgb(color2)

  const r = Math.round(c1.r * (1 - weight) + c2.r * weight)
  const g = Math.round(c1.g * (1 - weight) + c2.g * weight)
  const b = Math.round(c1.b * (1 - weight) + c2.b * weight)

  return `rgb(${r}, ${g}, ${b})`
}
