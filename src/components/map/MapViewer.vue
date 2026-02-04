<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMapInit } from '@/composables/useMapInit'

const emit = defineEmits(['map-ready'])
const mapContainer = ref<HTMLDivElement | null>(null)
const { initMap } = useMapInit()

onMounted(async () => {
  if (mapContainer.value) {
    await initMap(mapContainer.value)
    emit('map-ready') // 通知父组件：引擎已启动，可以加火药（数据）了
  }
})
</script>

<style scoped>
.map-container {
  position: absolute; /* 必须是绝对定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #bcd3f1;
}

/* 深度选择器：确保 ArcGIS 内部生成的 div 也是满屏 */
:deep(.esri-view) {
  height: 100%;
  width: 100%;
}
</style>
