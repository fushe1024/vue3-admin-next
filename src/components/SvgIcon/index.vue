<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})

/* 判断是否是内部 svg */
const isLocal = computed(() => {
  return !props.name.startsWith('http') && !props.name.includes('/')
})

/* 本地 symbol id */
const symbolId = computed(() => `#icon-${props.name}`)

/* class */
const svgClass = computed(() => ['svg-icon', props.className])

/* 统一 px 大小 */
const pxSize = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size
)

/* 本地 SVG 样式 */
const localStyle = computed(() => ({
  width: pxSize.value,
  height: pxSize.value,
  fill: props.color
}))

/* 外部 SVG：mask 样式（可变色） */
const externalStyle = computed(() => ({
  width: pxSize.value,
  height: pxSize.value,
  backgroundColor: props.color || 'currentColor',
  mask: `url(${props.name}) no-repeat 50% 50%`,
  WebkitMask: `url(${props.name}) no-repeat 50% 50%`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain'
}))
</script>

<template>
  <!-- 本地 SVG -->
  <svg v-if="isLocal" :class="svgClass" inert :focusable="false" :style="localStyle">
    <use :xlink:href="symbolId" :href="symbolId" />
  </svg>

  <!-- 外部 SVG（mask 可变色） -->
  <span v-else :class="svgClass" :style="externalStyle" />
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  outline: none;
}
</style>
