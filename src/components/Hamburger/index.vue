<script setup>
defineProps({
  isActive: { type: Boolean, required: true }
})

const emit = defineEmits(['toggleClick'])

const handleClick = () => {
  emit('toggleClick')
}
</script>

<template>
  <div class="hamburger-wrapper" id="guide-hamburger">
    <svg-icon
      class="hamburger-icon"
      :name="isActive ? 'hamburger-opened' : 'hamburger-closed'"
      @click="handleClick"
    />
  </div>
</template>

<style scoped lang="scss">
.hamburger-wrapper {
  cursor: pointer;
  margin-right: 15px;

  .hamburger-icon {
    fill: var(--el-text-color-primary);
  }
}
</style>
